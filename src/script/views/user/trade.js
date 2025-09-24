import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import supabase from '../../utils/supabaseClients'
import Modal from '../../components/Modal'
import toastify from '../../components/toastify'
import spinner from '../../utils/spinner'
import { handleTradeSession } from './components/handleTrade'
import { loadPage } from '../../routes/router'
import { trackPageVisit } from '../../utils/analtics'

let isInitialized = false
let tradingSession = null

// At the top of file, add TradingView widget script
const loadTradingViewScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
        script.async = true
        script.onload = () => resolve()
        document.head.appendChild(script)
    })
}

const trade = async () => {
    spinner.start()
    try {
        const authCheck = await auth.check('trade')
        if (!authCheck) return { html: '', pageEvents: () => { } }

        reset('Olymp AI | Trade')
        await trackPageVisit()
        const { html: navbar, pageEvents: navEvents } = Navbar()

        // State management
        const state = {
            userAssets: [],
            userBalance: 0,
            isProcessing: false,
            userId: null
        }

        async function initializeData() {
            try {
                spinner.start()

                // Get user session
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) throw new Error('Authentication required')

                state.userId = user.id

                // Fetch trading account and assets
                const [accountResult, assetsResult] = await Promise.all([
                    supabase
                        .from('trading_accounts')
                        .select('balance')
                        .eq('user_id', user.id)
                        .eq('account_type', 'live')
                        .single(),

                    supabase
                        .from('user_assets')
                        .select(`
                        id,
                        balance,
                        assets:asset_id (
                            id,
                            symbol,
                            name,
                            logo_url
                        )
                    `)
                        .eq('user_id', user.id)
                ])

                if (accountResult.error) throw accountResult.error
                if (assetsResult.error) throw assetsResult.error

                // Update state and localStorage
                state.userBalance = accountResult.data?.balance || 0
                localStorage.setItem('userBalance', state.userBalance.toString())

                state.userAssets = assetsResult.data || []

                // Check for active session
                const savedSession = localStorage.getItem('activeTradeSession')
                if (savedSession) {
                    tradingSession = JSON.parse(savedSession)
                    handleTradeSession.restoreSession(tradingSession)
                    renderActiveSession()
                } else {
                    renderTradeForm()
                }

            } catch (error) {
                console.error('Initialization error:', error)
                toastify({
                    text: 'Failed to load trading data',
                    background: 'bg-red-500'
                })
            } finally {
                spinner.stop()
            }
        }

        function renderTradeForm() {
            const container = document.getElementById('tradePanel')
            if (!container) return

            container.innerHTML = /* html */`
            <div class="h-full p-6 space-y-6">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-white">Start Trading</h2>
                    <div class="text-right">
                        <div class="text-sm text-gray-400">Available Balance</div>
                        <div class="text-xl font-bold text-white">$${state.userBalance.toFixed(2)}</div>
                    </div>
                </div>

                <form id="tradeForm" class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">Select Asset</label>
                        <select id="tradeAsset" required
                                class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            <option value="USD">Trade with USD Balance ($${state.userBalance.toFixed(2)})</option>
                            ${state.userAssets.map(a => /* html */`
                                        <option value="${a.assets.id}" 
                                                data-symbol="${a.assets.symbol}"
                                                data-balance="${a.balance}">
                                            ${a.assets.symbol} - Balance: ${a.balance.toFixed(8)}
                                        </option>
                                    `).join('')}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">Trade Amount</label>
                        <div class="relative">
                            <input type="number" id="tradeAmount" required
                                   min="1" step="0.00000001"
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white pr-20"
                                   placeholder="Enter amount">
                            <button type="button" onclick="window.setMaxAmount()"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs
                                           bg-brand-primary/20 text-brand-primary rounded-lg hover:bg-brand-primary/30">
                                MAX
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">Session Duration</label>
                        <select id="tradeDuration" required
                                class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            <option value="300">5 Minutes</option>
                            <option value="600">10 Minutes</option>
                            <option value="900">15 Minutes</option>
                            <option value="1200">20 Minutes</option>
                            <option value="1800">30 Minutes</option>
                            <option value="2700">45 Minutes</option>
                            <option value="3600">1 Hour</option>
                        </select>
                    </div>

                    <button type="submit" 
                            class="w-full p-4 bg-brand-primary text-white rounded-xl
                                   hover:bg-brand-primary/90 transition-colors">
                        <i class="fas fa-play-circle mr-2"></i>
                        Start Trading Session
                    </button>
                </form>
            </div>
        `

            // Add form submit handler
            document.getElementById('tradeForm')?.addEventListener('submit', handleTradeSubmit)

            // Initialize TradingView for default symbol
            handleTradeSession.initializeTradingView()

            // Update chart on asset change
            document.getElementById('tradeAsset')?.addEventListener('change', (e) => {
                const symbol = e.target.selectedOptions[0].dataset.symbol
                if (symbol && symbol !== 'USD') {
                    handleTradeSession.initializeTradingView(symbol)
                }
            })
        }

        function renderActiveSession() {
            const container = document.getElementById('tradePanel')
            if (!container) return

            container.innerHTML = /* html */`
            <div class="h-full p-6 space-y-6">
                <h2 class="text-2xl font-bold text-white">Active Trading Session</h2>
                
                <!-- Live Trade Info -->
                <div id="tradeInfo" class="space-y-4"></div>

                <!-- Take Profit / Stop Loss Controls -->
                <div class="space-y-4">
                    <div class="flex gap-4">
                        <input type="number" id="takeProfitAmount"
                               class="flex-1 p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                               placeholder="Take Profit Amount">
                        <button onclick="window.setTakeProfitTarget()"
                                class="px-6 py-4 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500/30">
                            <i class="fas fa-check mr-2"></i>Set TP
                        </button>
                    </div>
                    <div class="flex gap-4">
                        <input type="number" id="stopLossAmount"
                               class="flex-1 p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                               placeholder="Stop Loss Amount">
                        <button onclick="window.setStopLossTarget()"
                                class="px-6 py-4 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30">
                            <i class="fas fa-shield-alt mr-2"></i>Set SL
                        </button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="window.endTrade()"
                            class="p-4 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30">
                        <i class="fas fa-stop-circle mr-2"></i>End Session
                    </button>
                    <button onclick="window.takeProfitNow()"
                            class="p-4 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500/30">
                        <i class="fas fa-check-circle mr-2"></i>Take Profit
                    </button>
                </div>
            </div>
        `

            handleTradeSession.updateUI()
        }

        async function verifyTradingPin() {
            return new Promise((resolve) => {
                const modal = new Modal({
                    title: 'Verify Trading PIN',
                    content: /* html */`
                    <div class="space-y-4 text-center">
                        <i class="fas fa-lock text-4xl text-brand-primary"></i>
                        <p class="mt-2 text-gray-400">Enter your PIN to start trading</p>
                        <input type="password" id="tradePin"
                               class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white text-center"
                               placeholder="Enter 6-digit PIN" maxlength="6" pattern="[0-9]*">
                    </div>
                `,
                    actions: [{
                        text: 'Confirm',
                        primary: true,
                        onClick: async (close) => {
                            try {
                                const pin = document.getElementById('tradePin').value
                                if (!pin || pin.length !== 6) {
                                    throw new Error('Invalid PIN format')
                                }

                                // Verify PIN against database
                                const { data: profile } = await supabase
                                    .from('profiles')
                                    .select('pin')
                                    .eq('id', state.userId)
                                    .single()

                                if (!profile?.pin || profile.pin !== pin) {
                                    throw new Error('Invalid PIN')
                                }

                                close()
                                resolve(true)

                            } catch (error) {
                                toastify({
                                    text: error.message,
                                    background: 'bg-red-500'
                                })
                            }
                        }
                    }]
                })
                modal.show()
            })
        }

        // Global window handlers
        window.setMaxAmount = () => {
            const assetSelect = document.getElementById('tradeAsset')
            const amountInput = document.getElementById('tradeAmount')
            if (!assetSelect || !amountInput) return

            const selectedAssetId = assetSelect.value
            const maxAmount = selectedAssetId === 'USD'
                ? state.userBalance
                : state.userAssets.find(a => a.assets.id === selectedAssetId)?.balance || 0

            amountInput.value = maxAmount.toString()
        }

        window.handleTradeSubmit = async (e) => {
            e.preventDefault()
            if (state.isProcessing) return

            try {
                state.isProcessing = true
                spinner.start()

                const assetSelect = document.getElementById('tradeAsset')
                const selectedOption = assetSelect.options[assetSelect.selectedIndex]
                const assetId = assetSelect.value
                const amount = parseFloat(document.getElementById('tradeAmount').value)
                const duration = parseInt(document.getElementById('tradeDuration').value)

                // Get the asset symbol and determine if using main balance
                const isFromBalance = assetId === 'USD'
                const symbol = selectedOption.dataset.symbol || 'BTCUSDT'
                const tradeAsset = isFromBalance ? 'USD' : selectedOption.dataset.symbol

                spinner.stop()
                if (!assetId || !amount || !duration) {
                    throw new Error('Please fill all fields')
                }

                // Check correct balance based on selected asset
                const availableBalance = isFromBalance
                    ? state.userBalance
                    : state.userAssets.find(a => a.assets.id === assetId)?.balance || 0

                if (amount > availableBalance) {
                    throw new Error(`Insufficient ${tradeAsset} balance`)
                }

                // Verify PIN before starting trade
                const verified = await verifyTradingPin()
                if (!verified) {
                    throw new Error('PIN verification failed')
                }

                // Initialize trading session with correct asset info
                tradingSession = await handleTradeSession.initializeSession({
                    amount,
                    duration,
                    symbol,
                    tradeAsset, // Pass the correct asset type
                    isFromBalance
                })

                renderActiveSession()

            } catch (error) {
                console.error('Trade error:', error)
                toastify({
                    text: error.message || 'Failed to start trade',
                    background: 'bg-red-500'
                })
            } finally {
                state.isProcessing = false
                spinner.stop()
            }
        }

        window.setTakeProfitTarget = () => {
            const amount = parseFloat(document.getElementById('takeProfitAmount').value)
            if (!amount || isNaN(amount)) {
                toastify({
                    text: 'Please enter a valid take profit amount',
                    background: 'bg-red-500'
                })
                return
            }
            handleTradeSession.setTakeProfit(amount)
        }

        window.setStopLossTarget = () => {
            const amount = parseFloat(document.getElementById('stopLossAmount').value)
            if (!amount || isNaN(amount)) {
                toastify({
                    text: 'Please enter a valid stop loss amount',
                    background: 'bg-red-500'
                })
                return
            }
            handleTradeSession.setStopLoss(amount)
        }

        window.endTrade = async () => {
            if (!tradingSession) return

            try {
                spinner.start()
                await handleTradeSession.endSession()
                await loadPage('trade')
            } catch (error) {
                console.error('End trade error:', error)
                toastify({
                    text: 'Failed to end session',
                    background: 'bg-red-500'
                })
            } finally {
                spinner.stop()
            }
        }

        window.takeProfitNow = async () => {
            if (!tradingSession || tradingSession.currentProfit <= 0) {
                toastify({
                    text: 'No profit to take',
                    background: 'bg-red-500'
                })
                return
            }

            try {
                spinner.start()
                await handleTradeSession.endSession('take_profit')
                await loadPage('trade')
            } catch (error) {
                console.error('Take profit error:', error)
                toastify({
                    text: 'Failed to take profit',
                    background: 'bg-red-500'
                })
            } finally {
                spinner.stop()
            }
        }

        return {
            html: /* html */`
            ${navbar}
            <main class="main-scroll-view flex flex-col lg:flex-row h-full">
                <!-- TradingView Chart -->
                <div class="w-full lg:w-2/3 h-[50vh] lg:h-full overflow-y-auto">
                    <div id="tradingview_widget" class="w-full h-full"></div>
                </div>

                <!-- Trading Panel -->
                <div class="w-full lg:w-1/3 h-[55vh] lg:h-full overflow-y-auto pb-10 lg:pb-0">
                    <div id="tradePanel"></div>
                </div>
            </main>
        `,
            pageEvents: async () => {
                try {
                    // Load TradingView script first
                    await loadTradingViewScript()

                    // Initialize nav events
                    await navEvents()

                    // Delay initialization slightly to ensure DOM is ready
                    setTimeout(async () => {
                        try {
                            await initializeData()

                            // Handle visibility changes
                            document.addEventListener('visibilitychange', () => {
                                if (tradingSession) {
                                    handleTradeSession.handleVisibilityChange(document.hidden)
                                }
                            })

                            // Request notification permission
                            if (Notification.permission === 'default') {
                                await Notification.requestPermission()
                            }
                        } catch (error) {
                            console.error('Initialization error:', error)
                            toastify({
                                text: 'Failed to load trading data',
                                background: 'bg-red-500'
                            })
                        } finally {
                            if (spinner && spinner.stop) {
                                spinner.stop()
                            }
                        }
                    }, 100)
                } catch (error) {
                    console.error('Page initialization error:', error)
                    toastify({
                        text: 'Failed to initialize page',
                        background: 'bg-red-500'
                    })
                    if (spinner && spinner.stop) {
                        spinner.stop()
                    }
                }
            }
        }
    } catch (error) {
        console.error('Trade page error:', error)
        spinner.stop()
        return {
            html: `<div class="text-red-500">Error loading trade page</div>`,
            pageEvents: () => { }
        }
    }
}

export default trade