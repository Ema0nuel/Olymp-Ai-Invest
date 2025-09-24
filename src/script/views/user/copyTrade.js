import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import Modal from '../../components/Modal'
import toastify from '../../components/toastify'
import { formatMoney } from '../../utils/formatters'
import supabase from '../../utils/supabaseClients'
import { handleTradeSession } from './components/handleTrade'
import { trackPageVisit } from '../../utils/analtics'


// Import asset images
import btcLogo from '../../../images/welcome/btc.png'
import ethLogo from '../../../images/welcome/eth.png'
import bnbLogo from '../../../images/welcome/bnb.png'
import solLogo from '../../../images/welcome/sol.png'

const ASSET_LOGOS = {
    'BTC/USDT': btcLogo,
    'ETH/USDT': ethLogo,
    'BNB/USDT': bnbLogo,
    'SOL/USDT': solLogo
}
// In the renderTradeViewStyles function
function renderTradeViewStyles() {
    return /* css */ `
        .modal-content {
            min-width: 320px;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
        }

        #tradingview_widget {
            background: #131722;
            min-height: 400px;
            position: relative;
            z-index: 1;
        }

        .trading-view-container {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: hidden;
        }
    `
}

// Update the loadTradingViewScript function
function loadTradingViewScript() {
    return new Promise((resolve) => {
        if (window.TradingView) {
            resolve(window.TradingView);
            return;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;

        script.onload = () => {
            resolve(window.TradingView);
        };

        script.onerror = (err) => {
            console.error('Failed to load TradingView:', err);
            resolve(null);
        };

        document.head.appendChild(script);
    });
}

const copyTrade = async () => {
    const authCheck = await auth.check('copyTrade')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Copy Trading')
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // Get user's trading account info
    const { data: { user } } = await supabase.auth.getUser()
    const { data: tradingAccount } = await supabase
        .from('trading_accounts')
        .select('balance')
        .eq('user_id', user.id)
        .eq('account_type', 'live')
        .single()

    // Fetch trading bots with their latest trades
    const { data: bots, error: botsError } = await supabase
        .from('trading_bots')
        .select(`
            *,
            creator:profiles(full_name),
            bot_trades(
                pair,
                pnl,
                created_at,
                status
            )
        `)
        .eq('status', 'active')
        .order('total_profit', { ascending: false })

    if (botsError) {
        toastify({
            text: 'Error loading trading bots',
            background: 'bg-red-500/10',
            icon: 'fas fa-exclamation-circle'
        })
        return { html: '', pageEvents: () => { } }
    }

    // Format bot data
    const formattedBots = bots.map(bot => ({
        ...bot,
        lastTrades: bot.bot_trades
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3)
            .map(trade => ({
                pair: trade.pair,
                pnl: trade.pnl,
                status: trade.status,
                time: new Intl.RelativeTimeFormat('en').format(
                    Math.round((new Date(trade.created_at) - new Date()) / (1000 * 60)),
                    'minutes'
                )
            }))
    }))

    function showCopyTradeModal(bot) {
        loadTradingViewScript().then(() => {
            const symbol = bot.lastTrades[0]?.pair?.replace('/', '') || 'BTCUSDT';
            const modal = new Modal({
                title: `Copy Trade ${bot.name}`,
                content: /* html */`
                <div class="space-y-6">
                    <div class="w-full h-[400px] bg-[#131722] rounded-xl overflow-hidden" 
                         style="position:relative;">
                        <div id="tradingview_widget" 
                            style="width:100%; height:100%; position:absolute; top:0; left:0;">
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-brand-primary/10 rounded-xl">
                        <div class="flex items-center gap-3">
                            <img src="${ASSET_LOGOS[bot.lastTrades[0]?.pair] || btcLogo}" 
                                 class="w-10 h-10 rounded-full" alt="${bot.name}">
                            <div>
                                <h4 class="text-white font-medium">${bot.name}</h4>
                                <p class="text-sm text-gray-400">Win Rate: ${bot.win_rate}%</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-${bot.total_profit >= 0 ? 'green' : 'red'}-500 font-medium">
                                ${formatMoney(bot.total_profit)}
                            </p>
                            <p class="text-sm text-gray-400">${bot.total_trades} trades</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm text-gray-400 mb-2 block">Allocation Amount (USDT)</label>
                            <input type="number" id="allocation" min="${bot.min_allocation || 10}" max="${Math.min(bot.max_allocation || 10000, tradingAccount?.balance || 0)}"
                                   class="w-full bg-brand-black/50 border border-brand-primary/20 rounded-xl px-4 py-3
                                          text-white focus:border-brand-primary transition-colors"
                                   placeholder="Enter amount...">
                            <p class="text-xs text-gray-400 mt-1">Available: ${formatMoney(tradingAccount?.balance || 0)}</p>
                        </div>

                        <div>
                            <label class="text-sm text-gray-400 mb-2 block">Stop Loss (%)</label>
                            <input type="number" id="stopLoss" min="1" max="100"
                                   class="w-full bg-brand-black/50 border border-brand-primary/20 rounded-xl px-4 py-3
                                          text-white focus:border-brand-primary transition-colors"
                                   placeholder="Enter stop loss...">
                        </div>
                    </div>

                    <div class="p-4 bg-yellow-500/10 rounded-xl">
                        <h4 class="text-yellow-500 font-medium mb-2">Risk Summary</h4>
                        <ul class="text-sm text-gray-400 space-y-2">
                            <li>• Maximum possible loss: <span id="maxLoss">-</span></li>
                            <li>• Estimated monthly return: <span id="estReturn">-</span></li>
                            <li>• Trading fee: 2% of profits</li>
                        </ul>
                    </div>

                    <div id="tradeInfo"></div>
                </div>
            `,
                size: 'lg',
                actions: [
                    {
                        text: 'Start Copy Trading',
                        primary: true,
                        onClick: (close) => handleCopyTradeSubmit(bot, close)
                    }
                ],
            })

            modal.show()

            // Initialize TradingView after modal is shown
            requestAnimationFrame(() => {
                try {
                    initializeTradingView(symbol);
                    setupCopyTradeCalculations(bot);
                } catch (err) {
                    console.error('Failed to initialize trading view:', err);
                    const container = document.getElementById('tradingview_widget');
                    if (container) {
                        container.innerHTML = '<div class="p-4 text-center text-red-500">Failed to load chart</div>';
                    }
                }
            });

        })
    }
    // Update the initializeTradingView function
    function initializeTradingView(symbol = 'BTCUSDT') {

        const container = document.getElementById('tradingview_widget');
        if (!container) {
            console.error('Container not found');
            return;
        }

        // Clear existing content
        container.innerHTML = '';

        try {
            const widget = new window.TradingView.widget({
                container_id: "tradingview_widget",
                autosize: false, // Changed to false
                width: container.offsetWidth,
                height: container.offsetHeight,
                symbol: `BINANCE:${symbol}`,
                interval: "15",
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "en",
                toolbar_bg: "#131722",
                enable_publishing: false,
                hide_side_toolbar: false,
                allow_symbol_change: true,
                save_image: false,
                hideideas: true
            });

            return widget;
        } catch (error) {
            console.error('Widget creation error:', error);
            container.innerHTML = '<div class="p-4 text-center text-red-500">Failed to initialize chart</div>';
        }
    }

    function setupCopyTradeCalculations(bot) {
        const allocation = document.getElementById('allocation')
        const stopLoss = document.getElementById('stopLoss')
        const maxLoss = document.getElementById('maxLoss')
        const estReturn = document.getElementById('estReturn')

        function updateCalculations() {
            const amount = parseFloat(allocation.value) || 0
            const stop = parseFloat(stopLoss.value) || 0
            maxLoss.textContent = formatMoney(-(amount * (stop / 100)))
            estReturn.textContent = formatMoney(amount * 0.15) // 15% monthly estimate
        }

        allocation?.addEventListener('input', updateCalculations)
        stopLoss?.addEventListener('input', updateCalculations)
    }

    // Modify handleCopyTradeSubmit to use confirmation
    async function handleCopyTradeSubmit(bot, close) {
        const allocation = document.getElementById('allocation')?.value
        const stopLoss = document.getElementById('stopLoss')?.value

        if (!allocation || !stopLoss) {
            toastify({
                text: 'Please fill in all fields',
                background: 'bg-red-500/10',
                icon: 'fas fa-exclamation-circle'
            })
            return
        }

        // Show confirmation modal
        const confirmed = await showConfirmationModal(bot, parseFloat(allocation), parseFloat(stopLoss))
        if (!confirmed) return

        const { data: { user } } = await supabase.auth.getUser()

        // Create subscription
        const { error: subError } = await supabase
            .from('copy_trade_subscriptions')
            .insert({
                user_id: user.id,
                bot_id: bot.id,
                allocation_amount: parseFloat(allocation),
                stop_loss: parseFloat(stopLoss),
                status: 'active',
                created_at: new Date().toISOString()
            })

        if (subError) {
            toastify({
                text: 'Failed to start copy trading',
                background: 'bg-red-500/10',
                icon: 'fas fa-exclamation-circle'
            })
            return
        }

        toastify({
            text: `Successfully started copy trading ${bot.name}`,
            background: 'bg-green-500/10',
            icon: 'fas fa-check-circle'
        })

        // Show success modal with next steps
        const successModal = new Modal({
            title: 'Copy Trade Started',
            content: /* html */`
            <div class="space-y-6 text-center">
                <div class="text-green-500">
                    <svg class="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-medium text-white">Successfully Started Copy Trading</h3>
                <p class="text-gray-400">
                    Your copy trade has been set up successfully. You can monitor your positions
                    and performance in the Copy Trading dashboard.
                </p>
                <button onclick="window.location.href='/copy-trade'"
                        class="px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-opacity-90">
                    View Copy Trading Dashboard
                </button>
            </div>
        `
        })

        close()
        successModal.show()
    }

    async function showConfirmationModal(bot, allocation, stopLoss) {
        return new Promise((resolve) => {
            const modal = new Modal({
                title: 'Confirm Copy Trade',
                content: /* html */`
                <div class="space-y-6">
                    <div class="p-4 bg-brand-primary/10 rounded-xl">
                        <h4 class="text-lg font-medium text-white mb-2">Summary</h4>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li class="flex justify-between">
                                <span>Bot:</span>
                                <span class="text-white">${bot.name}</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Allocation:</span>
                                <span class="text-white">${formatMoney(allocation)}</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Stop Loss:</span>
                                <span class="text-white">${stopLoss}%</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Max Loss:</span>
                                <span class="text-red-500">${formatMoney(-(allocation * (stopLoss / 100)))}</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bg-yellow-500/10 p-4 rounded-xl">
                        <h4 class="text-yellow-500 font-medium mb-2">Important Notice</h4>
                        <p class="text-sm text-gray-400">
                            By confirming, you agree to allocate funds to copy this trader's positions.
                            The stop loss will automatically close positions if losses exceed ${stopLoss}%.
                        </p>
                    </div>
                </div>
            `,
                actions: [
                    {
                        text: 'Cancel',
                        onClick: (close) => {
                            close()
                            resolve(false)
                        }
                    },
                    {
                        text: 'Confirm Copy Trade',
                        primary: true,
                        onClick: async (close) => {
                            close()
                            resolve(true)
                        }
                    }
                ]
            })
            modal.show()
        })
    }

    function renderBotCard(bot) {
        return /* html */`
            <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl border border-brand-primary/10
                        hover:border-brand-primary/30 transition-all duration-300">
                <div class="p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img src="${ASSET_LOGOS[bot.lastTrades[0]?.pair] || btcLogo}" 
                                 class="w-10 h-10 rounded-full" alt="${bot.name}">
                            <div>
                                <h3 class="text-lg font-medium text-white">${bot.name}</h3>
                                <p class="text-sm text-gray-400">Created by ${bot.creator?.full_name || 'N/A'}</p>
                            </div>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            ${bot.status}
                        </span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <p class="text-gray-400 text-sm">Profit</p>
                            <p class="text-${bot.total_profit >= 0 ? 'green' : 'red'}-500 font-medium">
                                ${formatMoney(bot.total_profit)}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Win Rate</p>
                            <p class="text-white font-medium">${bot.win_rate}%</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Trades</p>
                            <p class="text-white font-medium">${bot.total_trades}</p>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <p class="text-sm text-gray-400">Recent Trades</p>
                        ${bot.lastTrades.map(trade => `
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-white">${trade.pair}</span>
                                <span class="text-${trade.pnl >= 0 ? 'green' : 'red'}-500">
                                    ${formatMoney(trade.pnl)}
                                </span>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="window.showCopyTradeModal('${bot.id}')"
                            class="w-full px-4 py-3 rounded-xl bg-brand-primary text-white font-medium
                                   hover:bg-opacity-90 transition-colors">
                        Copy Trade
                    </button>
                </div>
            </div>
        `
    }

    function pageEvents() {
        navEvents();
        loadTradingViewScript(); // Preload the script
        window.showCopyTradeModal = (botId) => {
            const bot = formattedBots.find(b => b.id === botId);
            if (bot) showCopyTradeModal(bot);
        };
    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view">
                <div class="p-4 md:p-8 max-w-7xl mx-auto">
                    <div class="mb-8">
                        <h1 class="text-2xl font-bold text-white mb-2">Copy Trading</h1>
                        <p class="text-gray-400">Follow and copy successful traders automatically</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <style>
                            ${renderTradeViewStyles()}
                        </style>
                        ${formattedBots.map(renderBotCard).join('')}
                    </div>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default copyTrade