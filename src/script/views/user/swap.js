import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import supabase from '../../utils/supabaseClients'
import { createNotification } from '../../utils/notifications'
import toastify from '../../components/toastify'
import spinner from '../../utils/spinner'
import Modal from '../../components/Modal'
import { loadPage } from '../../routes/router'
import { trackPageVisit } from '../../utils/analtics'

const swap = async () => {
    const authCheck = await auth.check('swap')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Swap Assets')
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // State
    let userAssets = []
    let allAssets = []
    let userMainBalance = 0
    let selectedFromAsset = null
    let selectedToAsset = null
    let cryptoPrices = {}
    let swapAmount = 0
    let isProcessing = false

    // Fetch crypto prices
    async function fetchCryptoPrices() {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd"
            )
            const data = await res.json()

            cryptoPrices = {
                BTC: data.bitcoin.usd,
                ETH: data.ethereum.usd,
                USDT: data.tether.usd,
                BNB: data.binancecoin.usd,
            }

            return cryptoPrices
        } catch (err) {
            toastify({
                text: 'Failed to fetch current prices',
                background: 'bg-red-500'
            })
        }
    }

    // Initialize data
    async function initializeData() {
        try {
            spinner.start()
            await Promise.all([
                fetchCryptoPrices(),
                fetchUserAssets()
            ])
        } catch (error) {
            console.error('Initialization error:', error)
        } finally {
            spinner.stop()
        }
    }

    // Fetch user assets and balance
    async function fetchUserAssets() {
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error('Not authenticated')

            const [userAssetsResult, allAssetsResult, balanceResult] = await Promise.all([
                supabase
                    .from('user_assets')
                    .select(`
                        *,
                        assets:asset_id (
                            id,
                            symbol,
                            name,
                            network,
                            logo_url
                        )
                    `)
                    .eq('user_id', session.user.id),
                supabase
                    .from('assets')
                    .select('*'),
                supabase
                    .from('trading_accounts')
                    .select('balance')
                    .eq('user_id', session.user.id)
                    .eq('account_type', 'live')
                    .single()
            ])

            if (userAssetsResult.error) throw userAssetsResult.error
            if (allAssetsResult.error) throw allAssetsResult.error
            if (balanceResult.error) throw balanceResult.error

            userAssets = userAssetsResult.data || []
            allAssets = allAssetsResult.data || []
            userMainBalance = balanceResult.data?.balance || 0

            renderAssetSelectors()
        } catch (error) {
            console.error('Fetch assets error:', error)
            toastify({
                text: 'Failed to load assets',
                background: 'bg-red-500'
            })
        }
    }

    // Calculate exchange rate
    function calculateExchangeRate() {
        if (!selectedFromAsset || !selectedToAsset || !cryptoPrices) return 0

        // If swapping from main balance (USD) to asset
        if (selectedFromAsset === 'balance') {
            return 1 / cryptoPrices[selectedToAsset.symbol]
        }

        // If swapping from asset to main balance (USD)
        if (selectedToAsset === 'balance') {
            return cryptoPrices[selectedFromAsset.assets.symbol]
        }

        // Asset to asset swap
        const fromPrice = cryptoPrices[selectedFromAsset.assets.symbol]
        const toPrice = cryptoPrices[selectedToAsset.symbol]
        return toPrice ? fromPrice / toPrice : 0
    }

    // Update swap preview
    function updateSwapPreview() {
        const previewElement = document.getElementById('swapPreview')
        const amount = document.getElementById('swapAmount')?.value || 0
        swapAmount = parseFloat(amount)

        if (!selectedFromAsset || !selectedToAsset || !amount) {
            previewElement.innerHTML = ''
            return
        }

        const rate = calculateExchangeRate()
        const receivedAmount = amount * rate
        const fee = amount * 0.01 // 1% fee

        const fromSymbol = selectedFromAsset === 'balance' ? 'USD' : selectedFromAsset.assets.symbol
        const toSymbol = selectedToAsset === 'balance' ? 'USD' : selectedToAsset.symbol

        previewElement.innerHTML = `
            <div class="space-y-4 p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Exchange Rate</span>
                    <span class="text-white">
                        1 ${fromSymbol} = ${rate.toFixed(8)} ${toSymbol}
                    </span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Fee (1%)</span>
                    <span class="text-white">
                        ${fee.toFixed(8)} ${fromSymbol}
                    </span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">You'll Receive</span>
                    <span class="text-green-500">
                        ${receivedAmount.toFixed(8)} ${toSymbol}
                    </span>
                </div>
            </div>
        `
    }

    // Handle asset selections
    function handleFromAssetSelect(e) {
        const value = e.target.value
        selectedFromAsset = value === 'balance' ? 'balance' :
            userAssets.find(a => a.assets.id === value)
        updateSwapPreview()

        // Disable selecting same asset in "To" dropdown
        const toSelect = document.getElementById('toAsset')
        Array.from(toSelect.options).forEach(option => {
            option.disabled = option.value === value
        })
    }

    function handleToAssetSelect(e) {
        const value = e.target.value
        selectedToAsset = value === 'balance' ? 'balance' :
            allAssets.find(a => a.id === value)
        updateSwapPreview()
    }

    // Render asset selectors
    function renderAssetSelectors() {
        const fromSelect = document.getElementById('fromAsset')
        const toSelect = document.getElementById('toAsset')

        if (!fromSelect || !toSelect) return

        fromSelect.innerHTML = `
            <option value="" disabled selected>Select Source</option>
            <option value="balance">Main Balance - $${userMainBalance.toFixed(2)} USD</option>
            ${userAssets.map(a => `
                <option value="${a.assets.id}">
                    ${a.assets.symbol} - Balance: ${parseFloat(a.balance).toFixed(8)}
                </option>
            `).join('')}
        `

        toSelect.innerHTML = `
            <option value="" disabled selected>Select Destination</option>
            <option value="balance">Main Balance (USD)</option>
            ${allAssets.map(a => `
                <option value="${a.id}">${a.symbol}</option>
            `).join('')}
        `
    }

    // Process swap
    async function processSwap(e) {
        e.preventDefault()

        if (isProcessing) return

        try {
            isProcessing = true
            spinner.start()
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error('Not authenticated')

            if (!selectedFromAsset || !selectedToAsset || !swapAmount) {
                throw new Error('Please fill all fields')
            }

            // Check balance
            if (selectedFromAsset === 'balance') {
                if (userMainBalance < swapAmount) {
                    throw new Error('Insufficient main balance')
                }
            } else {
                if (selectedFromAsset.balance < swapAmount) {
                    throw new Error('Insufficient asset balance')
                }
            }

            spinner.stop()
            isProcessing = false
            // Verify PIN
            const pin = await new Promise((resolve) => {
                const modal = new Modal({
                    title: 'Confirm Swap',
                    content: `
                        <div class="space-y-4 text-center">
                            <i class="fas fa-lock text-4xl text-brand-primary"></i>
                            <input type="password" 
                                   id="txPin"
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter 6-digit PIN"
                                   maxlength="6"
                                   pattern="[0-9]*">
                        </div>
                    `,
                    actions: [{
                        text: 'Confirm',
                        primary: true,
                        onClick: (close) => {
                            resolve(document.getElementById('txPin').value)
                            close()
                        }
                    }]
                })
                modal.show()
            })

            if (!pin || pin.length !== 6) throw new Error('Invalid PIN')

            const rate = calculateExchangeRate()
            const receivedAmount = swapAmount * rate
            const fee = swapAmount * 0.01

            // Create transaction record
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: session.user.id,
                    type: 'swap',
                    status: 'completed',
                    from_asset: selectedFromAsset === 'balance' ? null : selectedFromAsset.assets.id,
                    to_asset: selectedToAsset === 'balance' ? null : selectedToAsset.id,
                    amount: swapAmount,
                    fee: fee,
                    fee_percentage: 1
                })

            if (txError) throw txError

            // Update balances based on swap direction
            if (selectedFromAsset === 'balance') {
                // From main balance to asset
                await Promise.all([
                    supabase
                        .from('trading_accounts')
                        .update({ balance: userMainBalance - swapAmount })
                        .eq('user_id', session.user.id)
                        .eq('account_type', 'live'),
                    supabase.rpc('create_or_update_user_asset', {
                        p_user_id: session.user.id,
                        p_asset_id: selectedToAsset.id,
                        p_amount: receivedAmount
                    })
                ])
            } else if (selectedToAsset === 'balance') {
                // From asset to main balance
                await Promise.all([
                    supabase.rpc('create_or_update_user_asset', {
                        p_user_id: session.user.id,
                        p_asset_id: selectedFromAsset.assets.id,
                        p_amount: -swapAmount
                    }),
                    supabase
                        .from('trading_accounts')
                        .update({ balance: userMainBalance + receivedAmount })
                        .eq('user_id', session.user.id)
                        .eq('account_type', 'live')
                ])
            } else {
                // Asset to asset swap
                await Promise.all([
                    supabase.rpc('create_or_update_user_asset', {
                        p_user_id: session.user.id,
                        p_asset_id: selectedFromAsset.assets.id,
                        p_amount: -swapAmount
                    }),
                    supabase.rpc('create_or_update_user_asset', {
                        p_user_id: session.user.id,
                        p_asset_id: selectedToAsset.id,
                        p_amount: receivedAmount
                    })
                ])
            }

            // Create notification
            const fromText = selectedFromAsset === 'balance' ? 'USD' : selectedFromAsset.assets.symbol
            const toText = selectedToAsset === 'balance' ? 'USD' : selectedToAsset.symbol

            await createNotification(
                session.user.id,
                'swap',
                'Swap Successful',
                `Swapped ${swapAmount} ${fromText} to ${receivedAmount.toFixed(8)} ${toText}`
            )

            // Show success
            const successModal = new Modal({
                content: `
                    <div class="text-center space-y-4">
                        <div class="text-6xl text-green-500">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white">Swap Successful</h3>
                        <p class="text-gray-400">Your assets have been swapped</p>
                    </div>
                `
            })
            successModal.show()

            setTimeout(async () => {
                successModal.hide()
                await loadPage("dashboard")
            }, 3000)

        } catch (error) {
            console.error('Swap error:', error)
            toastify({
                text: error.message || 'Failed to process swap',
                background: 'bg-red-500'
            })
        } finally {
            isProcessing = false
            spinner.stop()
        }
    }

    // Attach global handlers
    window.handleFromAssetSelect = handleFromAssetSelect
    window.handleToAssetSelect = handleToAssetSelect
    window.processSwap = processSwap
    window.updateSwapPreview = updateSwapPreview

    function pageEvents() {
        navEvents()
        initializeData()
    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
                    <h1 class="text-2xl font-bold text-white">Swap Assets</h1>
                    
                    <form class="space-y-6" onsubmit="window.processSwap(event)">
                        <!-- From Asset -->
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">From</label>
                            <select id="fromAsset" 
                                    class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                    onchange="window.handleFromAssetSelect(event)"
                                    required>
                                <option value="" disabled selected>Select Asset</option>
                            </select>
                        </div>

                        <!-- Swap Icon -->
                        <div class="flex justify-center">
                            <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <i class="fas fa-arrow-down text-brand-primary"></i>
                            </div>
                        </div>

                        <!-- To Asset -->
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">To</label>
                            <select id="toAsset" 
                                    class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                    onchange="window.handleToAssetSelect(event)"
                                    required>
                                <option value="" disabled selected>Select Asset</option>
                            </select>
                        </div>

                        <!-- Amount -->
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Amount</label>
                            <input type="number" 
                                   id="swapAmount"
                                   step="any"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter amount"
                                   oninput="window.updateSwapPreview()">
                        </div>

                        <!-- Swap Preview -->
                        <div id="swapPreview" class="space-y-4"></div>

                        <button type="submit"
                                class="w-full p-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90
                                       transition-colors duration-300 flex items-center justify-center gap-2">
                            <i class="fas fa-exchange-alt"></i>
                            Swap Assets
                        </button>
                    </form>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default swap