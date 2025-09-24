import auth from "../../utils/auth";
import reset from "../../utils/reset";
import Navbar from "./components/Navbar";
import { trackPageVisit } from '../../utils/analtics'


let isInitialized = false;
let loadAttempts = 0;
const MAX_ATTEMPTS = 3;

const widgetConfigs = {
    advancedChart: {
        autosize: true,
        symbol: "BITSTAMP:BTCUSD",
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        enable_publishing: false,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        studies: ["MACD@tv-basicstudies"],
        container_id: "tradingview_chart",
        backgroundColor: "#1E222D",
        onReady: () => console.log("Main chart loaded successfully"),
    },
    technicalAnalysis: {
        symbol: "BITSTAMP:BTCUSD",
        showIntervalTabs: true,
        interval: "1D",
        width: "100%",
        height: "400",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        backgroundColor: "#1E222D",
        displayMode: "single",
    },
    cryptoMarket: {
        dataSource: "Crypto",
        width: "100%",
        height: "400",
        defaultColumn: "overview",
        screener_type: "crypto_mkt",
        displayCurrency: "USD",
        colorTheme: "dark",
        locale: "en",
        backgroundColor: "#1E222D",
    },
};

function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Check if script already exists
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load: ${src}`));
        document.head.appendChild(script);
    });
}

async function createWidget(containerId, config, type) {
    await new Promise((resolve) => {
        const checkContainer = () => {
            const container = document.getElementById(containerId);
            if (container) {
                resolve(container);
            } else {
                setTimeout(checkContainer, 100);
            }
        };
        checkContainer();
    });

    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear previous content

    try {
        if (type === "main") {
            await loadScript("https://s3.tradingview.com/tv.js");
            // Ensure TradingView is loaded
            await new Promise((resolve) => {
                const checkTradingView = () => {
                    if (window.TradingView) {
                        resolve();
                    } else {
                        setTimeout(checkTradingView, 100);
                    }
                };
                checkTradingView();
            });

            new TradingView.widget({
                ...config,
                container_id: containerId,
            });
        } else {
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${type}.js`;
            script.innerHTML = JSON.stringify(config);
            container.appendChild(script);
        }
    } catch (error) {
        console.error(`Failed to create widget ${containerId}:`, error);
    }
}

async function initializeWidgets() {
    if (isInitialized || loadAttempts >= MAX_ATTEMPTS) return;

    try {
        loadAttempts++;

        // Wait for DOM
        if (document.readyState !== "complete") {
            await new Promise((resolve) => window.addEventListener("load", resolve));
        }

        // Initialize widgets
        await createWidget(
            "tradingview_chart",
            widgetConfigs.advancedChart,
            "main"
        );

        const otherWidgets = [
            {
                type: "technical-analysis",
                id: "technical_analysis_container",
                config: widgetConfigs.technicalAnalysis,
            },
            {
                type: "screener",
                id: "crypto_market_container",
                config: widgetConfigs.cryptoMarket,
            },
        ];

        await Promise.all(
            otherWidgets.map((w) => createWidget(w.id, w.config, w.type))
        );

        isInitialized = true;
        console.log("All widgets initialized successfully");
    } catch (error) {
        console.error("Widget initialization failed:", error);
        if (loadAttempts < MAX_ATTEMPTS) {
            setTimeout(() => initializeWidgets(), 1000);
        }
    }
}

const charts = async () => {
    const authCheck = await auth.check("charts");
    if (!authCheck) return { html: "", pageEvents: () => { } };

    reset("Olymp AI | Charts");
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar();

    return {
        html: /* html */ `
            ${navbar}
            <main class="main-scroll-view flex-1">
                <!-- Header Section -->
                <div class="p-4">
                    <h1 class="text-2xl font-bold text-white">Market Charts</h1>
                </div>

                <div class="h-full p-4 space-y-6">
                    <!-- Main Chart -->
                    <section class="rounded-lg overflow-hidden bg-[#1E222D]">
                        <div id="tradingview_chart" class="h-[600px] w-full"></div>
                    </section>

                    <!-- Technical Analysis & Market Data -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-16 lg:pb-0">
                        <section class="rounded-lg overflow-hidden p-4">
                            <h2 class="text-xl font-semibold text-white mb-4">Technical Analysis</h2>
                            <div id="technical_analysis_container" class="h-[400px]"></div>
                        </section>
                        
                        <section class="rounded-lg overflow-hidden p-4">
                            <h2 class="text-xl font-semibold text-white mb-4">Crypto Market</h2>
                            <div id="crypto_market_container" class="h-[400px]"></div>
                        </section>
                    </div>
                </div>
            </main>
        `,
        pageEvents: async () => {
            navEvents();
            if (!isInitialized) {
                await initializeWidgets();
            }
        },
    };
};

export default charts;
