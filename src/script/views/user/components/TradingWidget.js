const TradingWidget = () => {
    function loadTradingViewWidget() {
        // Check if widget already exists
        if (document.querySelector('#tradingViewScript')) {
            return;
        }

        const script = document.createElement('script');
        script.id = 'tradingViewScript'; // Add ID to track script
        script.type = 'text/javascript';
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "colorTheme": "dark",
            "dateRange": "12M",
            "locale": "en",
            "largeChartUrl": "",
            "isTransparent": false,
            "showFloatingTooltip": false,
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "#DBDBDB",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
            "backgroundColor": "#0f0f0f",
            "width": "100%",
            "height": "100%",
            "showSymbolLogo": true,
            "showChart": true
        });

        // Clear existing widget if any
        const container = document.querySelector('#tradingViewWidget');
        if (container) {
            container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
            container.appendChild(script);
        }
    }

    function pageEvents() {
        // Delay widget loading slightly to ensure DOM is ready
        setTimeout(loadTradingViewWidget, 100);
    }

    return {
        html: /* html */`
        <div class="mt-6">
            <div class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-2 h-[500px] border border-brand-primary/10">
                <div id="tradingViewWidget" class="tradingview-widget-container" style="height:600px">
                    <div class="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </div>
        `,
        pageEvents
    }
}

export default TradingWidget