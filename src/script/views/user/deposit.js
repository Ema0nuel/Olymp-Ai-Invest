import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import Modal from '../../components/Modal'
import supabase from '../../utils/supabaseClients'
import toastify from '../../components/toastify'
import spinner from '../../utils/spinner'
import { loadPage } from '../../routes/router'
import BTC from '../../../images/welcome/btc.png'
import ETH from '../../../images/welcome/eth.png'
import BNB from '../../../images/welcome/bnb.png'
import { trackPageVisit } from '../../utils/analtics'


// Demo assets with real crypto logos
const DEMO_ASSETS = [
    {
        id: '123e4567-e89b-12d3-a456-426614174000',
        symbol: 'BTC',
        name: 'Bitcoin',
        networks: ['BTC'],
        addresses: {
            BTC: 'bc1qt4g28u88szcrq2qc53th4wtlkk6w8e25tmf0hu'
        },
        logo_url: BTC,
        min_deposit: 0.001
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174001',
        symbol: 'ETH',
        name: 'Ethereum',
        networks: ['ERC20', 'XRP'],
        addresses: {
            ERC20: '0x68E7e7E237b69747e0c7a03A272348fC696Ee105',
            XRP: 'rfKVBsDAnpYGHsBDXQqqAarMjFA86nk4xo'
        },
        logo_url: ETH,
        min_deposit: 0.01
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174002',
        symbol: 'USDT',
        name: 'Tether USD',
        networks: ['ERC20', 'XRP', 'BSC'],
        addresses: {
            ERC20: '0x68E7e7E237b69747e0c7a03A272348fC696Ee105',
            XRP: 'rfKVBsDAnpYGHsBDXQqqAarMjFA86nk4xo',
            BSC: '0x68E7e7E237b69747e0c7a03A272348fC696Ee105'
        },
        logo_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/USDT_Logo.png/2048px-USDT_Logo.png',
        min_deposit: 20
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174003',
        symbol: 'XRP',
        name: 'XRP USD',
        networks: ['XRP'],
        addresses: {
            XRP: 'rfKVBsDAnpYGHsBDXQqqAarMjFA86nk4xo'
        },
        logo_url: 'https://img.freepik.com/premium-vector/xrp-crypto-coin-cryptocurrency-isometric-illustration_641602-249.jpg?semt=ais_hybrid&w=740&q=80',
        min_deposit: 1
    },
]

const deposit = async () => {
    // Check authentication
    const authCheck = await auth.check('deposit')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Deposit Assets')
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // State variables
    let selectedAsset = null
    let selectedNetwork = null
    let depositAmount = 0
    let screenshot = null
    let transactionPin = ''

    // Copy to clipboard utility
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            toastify({
                text: "Address copied!",
                icon: "fas fa-check",
                background: "bg-green-500",
                duration: 2000
            })
        }).catch(() => {
            toastify({
                text: "Failed to copy",
                icon: "fas fa-times",
                background: "bg-red-500",
                duration: 2000
            })
        })
    }

    // Asset selection handler
    async function handleAssetSelect(e) {
        const assetId = e.target.value
        selectedAsset = DEMO_ASSETS.find(a => a.id === assetId)

        const networkSelect = document.querySelector('#networkSelect')
        const addressDisplay = document.querySelector('#addressDisplay')
        const depositForm = document.querySelector('#depositForm')

        if (selectedAsset) {
            networkSelect.classList.remove('opacity-0')
            setTimeout(() => {
                networkSelect.innerHTML = `
                    <label class="block text-sm font-medium text-gray-400 mb-2">Select Network</label>
                    <select class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                            onchange="window.handleNetworkSelect(event)">
                        <option value="" disabled selected>Select Network</option>
                        ${selectedAsset.networks.map(n => `
                            <option value="${n}">${n}</option>
                        `).join('')}
                    </select>
                `
            }, 300)
        }
        addressDisplay.classList.add('opacity-0')
        depositForm.classList.add('opacity-0')
    }

    // Network selection handler  
    async function handleNetworkSelect(e) {
        selectedNetwork = e.target.value
        const address = selectedAsset.addresses[selectedNetwork]
        const addressDisplay = document.querySelector('#addressDisplay')
        const depositForm = document.querySelector('#depositForm')

        addressDisplay.classList.remove('opacity-0')
        setTimeout(() => {
            addressDisplay.innerHTML = `
                <div class="space-y-4 animate-fade-in">
                    <label class="block text-sm font-medium text-gray-400">Deposit Address</label>
                    <div class="p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl space-y-4">
                        <div class="flex items-center gap-3">
                            <img src="${selectedAsset.logo_url}" alt="${selectedAsset.symbol}" 
                                 class="w-8 h-8 rounded-full">
                            <div>
                                <h3 class="font-medium text-white">${selectedAsset.name}</h3>
                                <p class="text-sm text-gray-400">${selectedNetwork} Network</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                            <code class="text-brand-primary flex-1 break-all text-sm">${address}</code>
                            <button type="button"
                                    class="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                                    id="copyAddressBtn">
                                <i class="fas fa-copy text-gray-400 group-hover:text-white 
                                          transition-colors"></i>
                            </button>
                        </div>
                        <div class="text-xs text-yellow-500/80 flex items-center gap-2">
                            <i class="fas fa-triangle-exclamation"></i>
                            <span>Send only ${selectedAsset.symbol} to this deposit address</span>
                        </div>
                    </div>
                </div>
            `
            // Attach copy event
            document.getElementById('copyAddressBtn').onclick = () => copyToClipboard(address)
            depositForm.classList.remove('opacity-0')
        }, 300)
    }
    // Screenshot handling
    async function handleScreenshot(e) {
        const file = e.target.files[0]
        const maxSize = 5 * 1024 * 1024 // 5MB

        if (!file.type.startsWith('image/')) {
            toastify({
                text: "Please upload an image file",
                icon: "fas fa-times",
                background: "bg-red-500"
            })
            e.target.value = ''
            return
        }

        if (file.size > maxSize) {
            toastify({
                text: "Image must be less than 5MB",
                icon: "fas fa-times",
                background: "bg-red-500"
            })
            e.target.value = ''
            return
        }

        screenshot = file
        document.getElementById('screenshotPreview').src = URL.createObjectURL(file)
        document.getElementById('screenshotPreview').classList.remove('hidden')
    }

    // Process deposit
    async function processDeposit(e) {
        e.preventDefault()

        // Get user session first
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session?.user?.id) {
            toastify({
                text: "Authentication error. Please login again.",
                icon: "fas fa-times",
                background: "bg-red-500"
            })
            return
        }

        const userId = session.user.id

        // Verify asset exists in database
        const { data: assetExists, error: assetError } = await supabase
            .from('assets')
            .select('id')
            .eq('id', selectedAsset.id)
            .single()

        if (assetError || !assetExists) {
            toastify({
                text: "Selected asset not found in database",
                icon: "fas fa-times",
                background: "bg-red-500"
            })
            return
        }

        if (!selectedAsset || !selectedNetwork || !screenshot) {
            toastify({
                text: "Please fill all required fields",
                icon: "fas fa-times",
                background: "bg-red-500"
            })
            return
        }

        const form = e.target
        const amount = parseFloat(form.amount.value)
        const sourceWallet = form.sourceWallet.value

        if (amount < selectedAsset.min_deposit) {
            toastify({
                text: `Minimum deposit is ${selectedAsset.min_deposit} ${selectedAsset.symbol}`,
                background: "bg-red-500"
            })
            return
        }

        // Create a promise to handle PIN input
        const pinPromise = new Promise((resolve) => {
            const modal = new Modal({
                title: 'Enter Transaction PIN',
                content: `
                <div class="space-y-4">
                    <i class="fas fa-lock text-4xl text-brand-primary"></i>
                    <p class="text-sm text-gray-400">Enter your 6-digit transaction PIN to confirm deposit</p>
                    <input type="password" 
                           id="pinInput"
                           pattern="[0-9]*"
                           inputmode="numeric"
                           maxlength="6"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                  focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-center"
                           placeholder="******">
                </div>
            `,
                actions: [
                    {
                        text: 'Confirm',
                        primary: true,
                        onClick: (close) => {
                            const pin = document.getElementById('pinInput').value
                            if (pin.length === 6) {
                                resolve(pin)
                                close()
                            } else {
                                toastify({
                                    text: "Please enter a 6-digit PIN",
                                    background: "bg-red-500"
                                })
                            }
                        }
                    },
                    {
                        text: 'Cancel',
                        onClick: (close) => {
                            resolve(null)
                            close()
                        }
                    }
                ]
            })
            modal.show()
        })

        const pin = await pinPromise
        if (!pin) return

        // Show loading
        spinner.start()

        // Rest of your existing deposit processing code...
        try {
            // Upload screenshot with user ID as folder name
            const filePath = `${userId}/${Date.now()}_${screenshot.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
            const { data: imageData, error: imageError } = await supabase.storage
                .from('deposit-screenshots')
                .upload(filePath, screenshot, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: screenshot.type // Add content type
                })

            if (imageError) {
                console.error('Upload error:', imageError)
                throw new Error('Failed to upload screenshot')
            }

            // Get public URL for the uploaded file
            const { data: publicUrlData } = supabase.storage
                .from('deposit-screenshots')
                .getPublicUrl(filePath)

            const publicUrl = publicUrlData.publicUrl

            // In the processDeposit function
            const { data: transaction, error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: userId,
                    type: 'deposit',
                    status: 'pending',
                    from_asset: selectedAsset.id, // Now using valid UUID
                    to_asset: selectedAsset.id, // Now using valid UUID
                    amount: amount,
                    fee: amount * 0.01,
                    fee_percentage: 1,
                    wallet_address: sourceWallet,
                    network: selectedNetwork,
                    screenshot_url: publicUrl
                })
                .select()
                .single()

            if (txError) throw txError

            // Create notification with user ID
            await supabase
                .from('notifications')
                .insert({
                    user_id: userId,
                    title: 'Deposit Initiated',
                    message: `Your deposit of ${amount} ${selectedAsset.symbol} is being processed`,
                    type: 'deposit'
                })

            // Show success modal using the Modal class
            const successModal = new Modal({
                title: 'Deposit Initiated',
                content: `
                <div class="space-y-4">
                    <div class="text-6xl text-green-500">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p>Your deposit has been initiated successfully</p>
                    <p class="text-sm text-gray-400">Your balance will be updated within 24 hours</p>
                </div>
            `,
                actions: [{
                    text: 'Go to Dashboard',
                    primary: true,
                    onClick: () => {
                        successModal.hide();
                        loadPage('dashboard')
                    }
                }]
            })
            successModal.show()

        } catch (error) {
            toastify({
                text: error.message || "Failed to process deposit",
                icon: "fas fa-times",
                background: "bg-red-500"
            })
        } finally {
            spinner.stop()
        }
    }

    // Attach global handlers
    window.handleAssetSelect = handleAssetSelect
    window.handleNetworkSelect = handleNetworkSelect
    window.handleScreenshot = handleScreenshot
    window.processDeposit = processDeposit

    function pageEvents() {
        navEvents()
    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
                    <h1 class="text-2xl font-bold text-white">Deposit Crypto</h1>
                    
                    <!-- Asset Selection -->
                    <div class="space-y-4">
                        <label class="block text-sm font-medium text-gray-400">Select Asset</label>
                        <select class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                     focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                                onchange="window.handleAssetSelect(event)">
                            <option value="" disabled selected>Select Asset</option>
                            ${DEMO_ASSETS.map(asset => `
                                <option value="${asset.id}">${asset.name} (${asset.symbol})</option>
                            `).join('')}
                        </select>
                    </div>

                    <!-- Network Selection -->
                    <div id="networkSelect" class="space-y-4 opacity-0 transition-opacity duration-300"></div>

                    <!-- Address Display -->
                    <div id="addressDisplay" class="opacity-0 transition-opacity duration-300"></div>

                    <!-- Deposit Form -->
                    <form id="depositForm" class="space-y-6 opacity-0 transition-opacity duration-300"
                          onsubmit="window.processDeposit(event)">
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Amount</label>
                            <input type="number" 
                                   name="amount"
                                   step="any"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                                   placeholder="Enter amount">
                        </div>

                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Your Wallet Address</label>
                            <input type="text" 
                                   name="sourceWallet"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                                   placeholder="Enter your wallet address">
                        </div>

                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Payment Screenshot</label>
                            <input type="file" 
                                   accept="image/*"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                                   onchange="window.handleScreenshot(event)">
                            <img id="screenshotPreview" class="hidden max-w-full h-auto rounded-xl" alt="Screenshot preview">
                        </div>

                        <button type="submit"
                                class="w-full p-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90
                                       transition-colors duration-300 flex items-center justify-center gap-2">
                            <i class="fas fa-arrow-right"></i>
                            Proceed with Deposit
                        </button>
                    </form>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default deposit