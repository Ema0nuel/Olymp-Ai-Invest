import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import supabase from '../../utils/supabaseClients'
import toastify from '../../components/toastify'
import Modal from '../../components/Modal'
import spinner from '../../utils/spinner'
import { loadPage } from '../../routes/router'

// Import asset images
import btcLogo from '../../../images/welcome/btc.png'
import ethLogo from '../../../images/welcome/eth.png'
import bnbLogo from '../../../images/welcome/bnb.png'
import solLogo from '../../../images/welcome/sol.png'
import { trackPageVisit } from '../../utils/analtics'

const assetLogos = {
    BTC: btcLogo,
    ETH: ethLogo,
    BNB: bnbLogo,
    SOL: solLogo,
    USDT: bnbLogo,
}

const wallet = async () => {
    const authCheck = await auth.check('wallet')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Manage Wallet')
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // Fetch user data
    const { data: { user } } = await supabase.auth.getUser()

    // Fetch balance, assets, notifications and transactions
    const [balanceResult, assetsResult, notificationsResult, transactionsResult] = await Promise.all([
        supabase
            .from('trading_accounts')
            .select('balance')
            .eq('user_id', user.id)
            .eq('account_type', 'live')
            .single(),
        supabase
            .from('user_assets')
            .select(`
                balance,
                assets (
                    symbol,
                    name,
                    logo_url
                )
            `)
            .eq('user_id', user.id),
        supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5),
        supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5)
    ])

    const balance = balanceResult.data?.balance || 0
    const assets = assetsResult.data || []
    const notifications = notificationsResult.data || []
    const transactions = transactionsResult.data || []

    async function showAllNotifications() {
        spinner.start()
        const { data: allNotifications } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        document.querySelector('main').innerHTML = `
            <div class="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-16 lg:pb-0">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-medium text-white">All Notifications</h2>
                    <button onclick="backToWallet()" 
                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
                ${renderNotifications(allNotifications)}
            </div>
        `
        spinner.stop()
    }

    async function showAllTransactions() {
        spinner.start()
        const { data: allTransactions } = await supabase
            .from('transactions')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        document.querySelector('main').innerHTML = `
            <div class="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-16 lg:pb-0">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-medium text-white">Transaction History</h2>
                    <button onclick="backToWallet()" 
                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
                ${renderTransactions(allTransactions)}
            </div>
        `
        spinner.stop()
    }

    async function backToWallet() {
        await loadPage('wallet')
    }
    // Add this function before renderTransactions
    function renderNotifications(notifications) {
        return notifications.length ? notifications.map(notification => `
        <div onclick="showNotificationDetails('${notification.id}')"
             class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-4 border border-brand-primary/10 
                    hover:bg-brand-primary/5 transition-colors cursor-pointer">
            <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg ${notification.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
                notification.type === 'withdrawal' ? 'bg-red-500/10 text-red-500' :
                    'bg-brand-primary/10 text-brand-primary'
            } flex items-center justify-center">
                    <i class="fas fa-${notification.type === 'deposit' ? 'arrow-down' :
                notification.type === 'withdrawal' ? 'arrow-up' :
                    notification.type === 'system' ? 'bell' :
                        'exchange-alt'
            }"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-medium truncate">${notification.title}</h4>
                    <p class="text-gray-400 text-sm truncate">${notification.message}</p>
                    <span class="text-xs text-gray-500">
                        ${new Date(notification.created_at).toLocaleString()}
                    </span>
                </div>
                ${!notification.is_read ? `
                    <div class="w-2 h-2 rounded-full bg-brand-primary"></div>
                ` : ''}
            </div>
        </div>
    `).join('') : `
        <div class="text-center text-gray-400 py-8">
            <i class="fas fa-bell-slash text-4xl mb-4"></i>
            <p>No notifications yet</p>
        </div>
    `
    }

    // Also add the showNotificationDetails function
    async function showNotificationDetails(id) {
        try {
            spinner.start()
            const { data: notification, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error

            const modal = new Modal({
                title: notification.title,
                content: `
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg ${notification.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
                        notification.type === 'withdrawal' ? 'bg-red-500/10 text-red-500' :
                            'bg-brand-primary/10 text-brand-primary'
                    } flex items-center justify-center">
                            <i class="fas fa-${notification.type === 'deposit' ? 'arrow-down' :
                        notification.type === 'withdrawal' ? 'arrow-up' :
                            notification.type === 'system' ? 'bell' :
                                'exchange-alt'
                    } text-xl"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-400">${notification.message}</p>
                            <span class="text-xs text-gray-500">
                                ${new Date(notification.created_at).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            `
            })
            modal.show()

            // Mark as read
            await supabase
                .from('notifications')
                .update({ is_read: true })
                .eq('id', id)

        } catch (error) {
            console.error('Error showing notification:', error)
            toastify({
                text: 'Error showing notification details',
                background: 'bg-red-500'
            })
        } finally {
            spinner.stop()
        }
    }

    // Add to global handlers
    window.showNotificationDetails = showNotificationDetails

    // Add this after showNotificationDetails function
    async function showTransactionDetails(id) {
        try {
            spinner.start()
            const { data: transaction, error } = await supabase
                .from('transactions')
                .select(`
                *,
                from_asset ( symbol, name ),
                to_asset ( symbol, name )
            `)
                .eq('id', id)
                .single()

            if (error) throw error

            const modal = new Modal({
                title: 'Transaction Details',
                content: `
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg ${transaction.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
                        transaction.type === 'withdrawal' ? 'bg-red-500/10 text-red-500' :
                            'bg-brand-primary/10 text-brand-primary'
                    } flex items-center justify-center">
                            <i class="fas fa-${transaction.type === 'deposit' ? 'arrow-down' :
                        transaction.type === 'withdrawal' ? 'arrow-up' :
                            'exchange-alt'
                    } text-xl"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-medium text-white capitalize mb-1">${transaction.type}</h4>
                            <div class="space-y-2">
                                <p class="text-gray-400">
                                    <span class="text-gray-500">Amount:</span> 
                                    <span class="${transaction.type === 'deposit' ? 'text-green-500' : 'text-red-500'
                    }">
                                        ${transaction.type === 'withdrawal' ? '-' : '+'}$${transaction.amount.toLocaleString()}
                                    </span>
                                </p>
                                <p class="text-gray-400">
                                    <span class="text-gray-500">Status:</span>
                                    <span class="px-2 py-1 rounded-lg text-xs ${transaction.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                        transaction.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                            'bg-red-500/10 text-red-500'
                    }">${transaction.status}</span>
                                </p>
                                ${transaction.wallet_address ? `
                                    <p class="text-gray-400">
                                        <span class="text-gray-500">Wallet:</span> 
                                        <span class="font-mono text-sm">${transaction.wallet_address}</span>
                                    </p>
                                ` : ''}
                                ${transaction.network ? `
                                    <p class="text-gray-400">
                                        <span class="text-gray-500">Network:</span> 
                                        <span>${transaction.network}</span>
                                    </p>
                                ` : ''}
                                <p class="text-gray-400">
                                    <span class="text-gray-500">Date:</span>
                                    <span>${new Date(transaction.created_at).toLocaleString()}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    ${transaction.screenshot_url ? `
                        <div class="mt-4">
                            <p class="text-gray-500 mb-2">Payment Screenshot:</p>
                            <img src="${transaction.screenshot_url}" 
                                 alt="Payment Screenshot"
                                 class="w-full rounded-xl">
                        </div>
                    ` : ''}
                </div>
            `
            })
            modal.show()

        } catch (error) {
            console.error('Error showing transaction:', error)
            toastify({
                text: 'Error showing transaction details',
                background: 'bg-red-500'
            })
        } finally {
            spinner.stop()
        }
    }

    function renderTransactions(transactions) {
        return transactions.length ? transactions.map(tx => /* html */`
            <div onclick="showTransactionDetails('${tx.id}')"
                 class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-4 border border-brand-primary/10 
                        hover:bg-brand-primary/5 transition-colors cursor-pointer">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
                tx.type === 'withdrawal' ? 'bg-red-500/10 text-red-500' :
                    'bg-brand-primary/10 text-brand-primary'
            } flex items-center justify-center">
                        <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' :
                tx.type === 'withdrawal' ? 'arrow-up' :
                    'exchange-alt'
            } text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-white font-medium capitalize">${tx.type}</h4>
                        <p class="text-gray-400 text-sm">
                            ${new Date(tx.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-${tx.type === 'deposit' ? 'green' : 'red'}-500 font-medium">
                            ${tx.type === 'withdrawal' ? '-' : '+'}$${tx.amount.toLocaleString()}
                        </p>
                        <span class="px-2 py-1 rounded-lg text-xs ${tx.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
            }">${tx.status}</span>
                    </div>
                </div>
            </div>
        `).join('') : `
            <div class="text-center text-gray-400 py-8">
                <i class="fas fa-history text-4xl mb-4"></i>
                <p>No transactions found</p>
            </div>
        `
    }

    // Update your global handlers section
    window.showAllNotifications = showAllNotifications
    window.showAllTransactions = showAllTransactions
    window.backToWallet = backToWallet
    window.showNotificationDetails = showNotificationDetails
    window.showTransactionDetails = showTransactionDetails // Add this line

    function pageEvents() {
        navEvents()
    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="p-4 md:p-8 max-w-6xl mx-auto">
                    <!-- Balance Card -->
                    <div class="bg-gradient-to-br from-brand-primary to-brand-primary/50 rounded-3xl p-8 mb-8">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-white/60 mb-2">Total Balance</h2>
                                <p class="text-4xl font-bold text-white">
                                    $${balance.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}
                                </p>
                            </div>
                            <svg class="w-24 h-24 text-white/20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                            </svg>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Assets List -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-medium text-white mb-4">Your Assets</h3>
                            ${assets.length ? assets.map(asset => `
                                <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-4 border border-brand-primary/10">
                                    <div class="flex items-center gap-4">
                                        <img src="${assetLogos[asset.assets.symbol] || asset.assets.logo_url}" 
                                             alt="${asset.assets.symbol}"
                                             class="w-10 h-10 rounded-lg">
                                        <div class="flex-1">
                                            <h4 class="text-white font-medium">${asset.assets.name}</h4>
                                            <p class="text-gray-400 text-sm">${asset.assets.symbol}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-white font-medium">
                                                ${asset.balance.toLocaleString('en-US', {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8
        })}
                                            </p>
                                            <p class="text-gray-400 text-sm">
                                                ${asset.assets.symbol}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `).join('') : `
                                <div class="text-center text-gray-400 py-8">
                                    <i class="fas fa-coins text-4xl mb-4"></i>
                                    <p>No assets yet</p>
                                </div>
                            `}
                        </div>

                        <!-- Recent Activity -->
                        <div class="space-y-8 pb-16 lg:pb-0">
                            <!-- Notifications -->
                            <div class="space-y-4">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-medium text-white">Recent Notifications</h3>
                                    <button onclick="showAllNotifications()"
                                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        View All
                                    </button>
                                </div>
                                ${renderNotifications(notifications)}
                            </div>

                            <!-- Transactions -->
                            <div class="space-y-4">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-medium text-white">Recent Transactions</h3>
                                    <button onclick="showAllTransactions()"
                                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        View All
                                    </button>
                                </div>
                                ${renderTransactions(transactions)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default wallet