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


const withdraw = async () => {
    const authCheck = await auth.check('withdraw')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Withdraw Assets')
    await trackPageVisit()

    const { html: navbar, pageEvents: navEvents } = Navbar()

    // State
    let userAssets = []
    let selectedAsset = null
    let withdrawAmount = 0
    let destinationWallet = ''
    let selectedNetwork = ''
    let isProcessing = false

    // Fetch user assets
    async function fetchUserAssets() {
        try {
            spinner.start()
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()

            if (sessionError || !session) {
                throw new Error('Authentication failed. Please login again.')
            }

            const { data, error } = await supabase
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
                .eq('user_id', session.user.id)

            if (error) throw error

            if (!data || data.length === 0) {
                document.getElementById('assetSelect').innerHTML = `
                <option value="" disabled selected>No assets found</option>
            `
                return
            }

            userAssets = data
            renderAssetList()
        } catch (error) {
            console.error('Fetch assets error:', error)
            toastify({
                text: error.message || 'Failed to load assets',
                icon: 'fas fa-times',
                background: 'bg-red-500',
                duration: 5000
            })

            // Redirect to login if authentication failed
            if (error.message.includes('authentication')) {
                setTimeout(async () => await loadPage("login"), 2000)
            }
        } finally {
            spinner.stop()
        }
    }

    // Handle asset selection
    async function handleAssetSelect(e) {
        const assetId = e.target.value
        selectedAsset = userAssets.find(a => a.assets.id === assetId)?.assets

        if (!selectedAsset) return

        document.getElementById('networkSelect').innerHTML = `
            <label class="block text-sm font-medium text-gray-400 mb-2">Select Network</label>
            <select class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                    onchange="window.handleNetworkSelect(event)">
                <option value="" disabled selected>Select Network</option>
                ${selectedAsset.network.map(n => `
                    <option value="${n}">${n}</option>
                `).join('')}
            </select>
        `
    }

    // Handle network selection
    function handleNetworkSelect(e) {
        selectedNetwork = e.target.value
        document.getElementById('withdrawForm').classList.remove('hidden')
    }

    // Process withdrawal
    async function processWithdraw(e) {
        e.preventDefault()

        if (isProcessing) return

        try {
            isProcessing = true
            spinner.start()
            // Validate all required fields first
            if (!selectedAsset) {
                throw new Error('Please select an asset')
            }
            if (!selectedNetwork) {
                throw new Error('Please select a network')
            }

            const { data: { session } } = await supabase.auth.getSession()
            if (!session) throw new Error('Not authenticated')

            withdrawAmount = parseFloat(e.target.amount.value)
            if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
                throw new Error('Please enter a valid amount')
            }

            destinationWallet = e.target.wallet.value
            if (!destinationWallet) {
                throw new Error('Please enter a destination wallet')
            }

            const userAsset = userAssets.find(a => a.assets.id === selectedAsset.id)
            if (!userAsset) {
                throw new Error('Selected asset not found')
            }
            if (userAsset.balance < withdrawAmount) {
                throw new Error(`Insufficient balance. Available: ${userAsset.balance} ${selectedAsset.symbol}`)
            }

            isProcessing = false
            spinner.stop()

            // Get transaction PIN
            const pin = await new Promise((resolve) => {
                const modal = new Modal({
                    title: 'Confirm Withdrawal',
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

            // Create withdrawal transaction
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: session.user.id,
                    type: 'withdrawal',
                    status: 'pending',
                    from_asset: selectedAsset.id,
                    amount: withdrawAmount,
                    fee: withdrawAmount * 0.01, // 1% fee
                    fee_percentage: 1,
                    wallet_address: destinationWallet,
                    network: selectedNetwork
                })

            if (txError) throw txError

            // Create notification
            await createNotification(
                session.user.id,
                'withdrawal',
                'Withdrawal Initiated',
                `Your withdrawal of ${withdrawAmount} ${selectedAsset.symbol} is being processed`
            )

            // Show success
            const successModal = new Modal({
                content: `
                    <div class="text-center space-y-4">
                        <div class="text-6xl text-green-500">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white">Withdrawal Initiated</h3>
                        <p class="text-gray-400">Your withdrawal will be processed within 24 hours</p>
                    </div>
                `
            })
            successModal.show()

            setTimeout(async () => {
                successModal.hide()
                await loadPage("dashboard")
            }, 3000)

        } catch (error) {
            console.error('Withdrawal error:', error)
            toastify({
                text: error.message || 'Failed to process withdrawal',
                background: 'bg-red-500'
            })
        } finally {
            isProcessing = false
            spinner.stop()
        }
    }

    // Render asset list
    function renderAssetList() {
        const assetSelect = document.getElementById('assetSelect')
        if (!assetSelect) return

        assetSelect.innerHTML = userAssets.map(a => `
            <option value="${a.assets.id}">
                ${a.assets.symbol} - Balance: ${a.balance}
            </option>
        `).join('')
    }

    // Attach global handlers
    window.handleAssetSelect = handleAssetSelect
    window.handleNetworkSelect = handleNetworkSelect
    window.processWithdraw = processWithdraw

    function pageEvents() {
        navEvents()
        // Add error boundary
        window.onerror = function (msg, url, lineNo, columnNo, error) {
            console.error('Global error:', error)
            toastify({
                text: 'Something went wrong. Please refresh the page.',
                background: 'bg-red-500'
            })
            return false
        }

        // Initialize page
        const init = async () => {
            try {
                await fetchUserAssets()

                // Add event listeners for form elements
                const form = document.getElementById('withdrawForm')
                if (form) {
                    form.addEventListener('submit', processWithdraw)
                }
            } catch (error) {
                console.error('Initialization error:', error)
            }
        }

        init()
    }

    // Update the renderAssetList function
    function renderAssetList() {
        const assetSelect = document.getElementById('assetSelect')
        if (!assetSelect) return

        try {
            const options = userAssets
                .filter(a => a.balance > 0) // Only show assets with balance
                .map(a => `
                <option value="${a.assets.id}">
                    ${a.assets.symbol} - Balance: ${parseFloat(a.balance).toFixed(8)}
                </option>
            `)

            assetSelect.innerHTML = options.length ?
                `<option value="" disabled selected>Select Asset</option>${options.join('')}` :
                '<option value="" disabled selected>No available assets</option>'
        } catch (error) {
            console.error('Render assets error:', error)
            assetSelect.innerHTML = '<option value="" disabled selected>Error loading assets</option>'
        }

    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
                    <h1 class="text-2xl font-bold text-white">Withdraw Assets</h1>
                    
                    <!-- Asset Selection -->
                    <div class="space-y-4">
                        <label class="block text-sm font-medium text-gray-400">Select Asset</label>
                        <select id="assetSelect" 
                                class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                onchange="window.handleAssetSelect(event)">
                            <option value="" disabled selected>Select Asset</option>
                        </select>
                    </div>

                    <!-- Network Selection -->
                    <div id="networkSelect" class="space-y-4"></div>

                    <!-- Withdrawal Form -->
                    <form id="withdrawForm" 
                          class="hidden space-y-6" 
                          onsubmit="window.processWithdraw(event)">
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Amount</label>
                            <input type="number" 
                                   name="amount"
                                   step="any"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter amount">
                        </div>

                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Destination Wallet</label>
                            <input type="text" 
                                   name="wallet"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter destination wallet address">
                        </div>

                        <button type="submit"
                                class="w-full p-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90
                                       transition-colors duration-300 flex items-center justify-center gap-2">
                            <i class="fas fa-arrow-right"></i>
                            Proceed with Withdrawal
                        </button>
                    </form>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default withdraw