import reset, { cleanupAll } from '../../utils/reset';
import AdminNavbar from './components/Navbar';
import StyleAdminPage from './components/style';
import { checkAdminAuth, logoutAdmin } from './functions/adminLoginHandler';
import { loadPage } from '../../routes/router';
import { TransactionManager } from './components/Management';
import Modal from '../../components/Modal';
import toastify from '../../components/toastify';
import supabase from '../../utils/supabaseClients';

const transactions = async () => {

    reset('Olymp AI Transactions Panel Management');
    cleanupAll();

    async function fetchTransactions(filters = {}) {
        try {
            const container = document.getElementById('transactionsTable');
            if (!container) return;

            let query = supabase
                .from('transactions')
                .select(`
                *,
                profiles!transactions_user_id_fkey (
                    full_name, 
                    email
                ),
                trading_accounts!transactions_account_id_fkey (
                    balance,
                    account_type
                )
            `)
                .order('created_at', { ascending: false });

            // Apply filters
            if (filters.type) {
                query = query.eq('type', filters.type);
            }
            if (filters.status) {
                query = query.eq('status', filters.status);
            }

            const { data, error } = await query;

            if (error) throw error;

            renderTransactions(data || []);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toastify({
                text: 'Failed to load transactions',
                icon: 'fas fa-exclamation-circle',
                background: 'bg-red-500/10'
            });
        }
    }

    function renderTransactions(transactions) {
        const container = document.getElementById('transactionsTable');
        if (!container) return;

        container.innerHTML = transactions.length ? transactions.map(tx => /* html */`
        <tr class="border-b border-brand-primary/10 hover:bg-brand-black/20">
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' : 'arrow-up'} 
                           ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}"></i>
                    </div>
                    <div>
                        <div class="font-medium text-white">
                            ${tx.profiles?.full_name || 'Deleted User'}
                        </div>
                        <div class="text-sm text-gray-400">
                            ${tx.profiles?.email || 'No email'}
                        </div>
                    </div>
                </div>
            </td>
            <td class="p-4">
                <span class="capitalize">${tx.type || 'Unknown'}</span>
            </td>
            <td class="p-4">$${(tx.amount || 0).toLocaleString()}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded-full text-sm
                    ${tx.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'}">
                    ${tx.status || 'Unknown'}
                </span>
            </td>
            <td class="p-4 text-gray-400">
                ${tx.created_at ? new Date(tx.created_at).toLocaleString() : 'No date'}
            </td>
            <td class="p-4">
                <div class="flex gap-2">
                    <button onclick="window.viewTxDetails('${tx.id}')"
                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary
                                   hover:bg-brand-primary/20 transition-colors">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${tx.status === 'pending' ? `
                        <button onclick="window.handleTransaction('${tx.id}', 'approve')"
                                class="p-2 rounded-lg bg-green-500/10 text-green-500
                                       hover:bg-green-500/20 transition-colors">
                            <i class="fas fa-check"></i>
                        </button>
                        <button onclick="window.handleTransaction('${tx.id}', 'reject')"
                                class="p-2 rounded-lg bg-red-500/10 text-red-500
                                       hover:bg-red-500/20 transition-colors">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    <button onclick="window.deleteTx('${tx.id}')"
                            class="p-2 rounded-lg bg-red-500/10 text-red-500
                                   hover:bg-red-500/20 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('') : `
        <tr>
            <td colspan="6" class="p-8 text-center text-gray-400">
                No transactions found
            </td>
        </tr>
    `;
    }

    function pageEvents() {
        StyleAdminPage();

        // Initialize transaction manager
        const spinner = { show: () => { }, hide: () => { } }; // Replace with your spinner
        const transactionManager = new TransactionManager(supabase, spinner);

        // Initialize filters
        const typeFilter = document.getElementById('typeFilter');
        const statusFilter = document.getElementById('statusFilter');

        // Handle filter changes
        function handleFilters() {
            const filters = {
                type: typeFilter.value,
                status: statusFilter.value
            };
            fetchTransactions(filters);
        }

        // Add event listeners to filters
        typeFilter.addEventListener('change', handleFilters);
        statusFilter.addEventListener('change', handleFilters);

        // Fetch initial transactions
        fetchTransactions();

        // Handle navigation
        document.querySelectorAll('[data-nav]').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const route = button.dataset.route;
                if (route) {
                    await loadPage(`admin${route.charAt(0).toUpperCase() + route.slice(1)}`);
                }
            });
        });

        // Handle logout
        document.getElementById('admin-logout')?.addEventListener('click', async () => {
            await logoutAdmin();
        });


        // Global handlers
        // In the same file, update the viewTxDetails handler
        window.viewTxDetails = async (txId) => {
            try {
                const { data: tx, error } = await supabase
                    .from('transactions')
                    .select(`
                *,
                profiles!transactions_user_id_fkey (
                    full_name, 
                    email
                ),
                trading_accounts!transactions_account_id_fkey (
                    balance,
                    account_type
                )
            `)
                    .eq('id', txId)
                    .single();

                if (error) throw error;

                new Modal({
                    title: 'Transaction Details',
                    content: /* html */`
                <div class="space-y-6">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 rounded-full bg-brand-primary/10 
                                    flex items-center justify-center">
                            <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' : 'arrow-up'} text-2xl 
                               ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}"></i>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-400">Type</p>
                            <p class="text-white font-medium capitalize">${tx.type || 'Unknown'}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Amount</p>
                            <p class="text-white font-medium">$${(tx.amount || 0).toLocaleString()}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Status</p>
                            <p class="text-white font-medium">${tx.status || 'Unknown'}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Date</p>
                            <p class="text-white font-medium">
                                ${tx.created_at ? new Date(tx.created_at).toLocaleString() : 'No date'}
                            </p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm text-gray-400">User</p>
                            <p class="text-white font-medium">${tx.profiles?.full_name || 'Deleted User'}</p>
                            <p class="text-sm text-gray-400">${tx.profiles?.email || 'No email'}</p>
                        </div>
                        ${tx.wallet_address ? `
                            <div class="col-span-2">
                                <p class="text-sm text-gray-400">Wallet Address</p>
                                <p class="text-white font-medium break-all">
                                    ${tx.wallet_address}
                                </p>
                            </div>
                        ` : ''}
                        ${tx.screenshot_url ? `
                            <div class="col-span-2">
                                <p class="text-sm text-gray-400">Screenshot</p>
                                <img src="${tx.screenshot_url}" 
                                     alt="Transaction Screenshot"
                                     class="mt-2 rounded-lg max-w-full h-auto">
                            </div>
                        ` : ''}
                    </div>
                </div>
            `
                }).show();
            } catch (error) {
                console.error('Error fetching transaction details:', error);
                toastify({
                    text: 'Failed to load transaction details',
                    icon: 'fas fa-exclamation-circle',
                    background: 'bg-red-500/10'
                });
            }
        };

        window.handleTransaction = async (txId, action) => {
            try {
                await transactionManager.handleTransaction(txId, action);
                toastify({
                    text: `Transaction ${action}ed successfully`,
                    icon: 'fas fa-check-circle',
                    background: 'bg-green-500/10'
                });
                fetchTransactions(); // Refresh the list
            } catch (error) {
                console.error('Transaction handling failed:', error);
                toastify({
                    text: error.message || `Failed to ${action} transaction`,
                    icon: 'fas fa-exclamation-circle',
                    background: 'bg-red-500/10'
                });
            }
        };

        window.deleteTx = async (txId) => {
            new Modal({
                title: 'Delete Transaction',
                content: `
                    <p class="text-gray-400">
                        Are you sure you want to delete this transaction? 
                        This action cannot be undone.
                    </p>
                `,
                actions: [{
                    text: 'Delete',
                    class: 'bg-red-500 hover:bg-red-600',
                    onClick: async (close) => {
                        try {
                            const { error } = await supabase
                                .from('transactions')
                                .delete()
                                .eq('id', txId);

                            if (error) throw error;

                            close();
                            toastify({
                                text: 'Transaction deleted successfully',
                                icon: 'fas fa-check-circle',
                                background: 'bg-green-500/10'
                            });
                            fetchTransactions(); // Refresh the list
                        } catch (error) {
                            console.error('Error deleting transaction:', error);
                            toastify({
                                text: 'Failed to delete transaction',
                                icon: 'fas fa-exclamation-circle',
                                background: 'bg-red-500/10'
                            });
                        }
                    }
                }, {
                    text: 'Cancel',
                    onClick: (close) => close()
                }]
            }).show();
        };
    }

    return {
        html: /* html */`
            <div class="flex min-h-screen bg-brand-dark mobile-container">
                ${AdminNavbar().html}
                <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                    <div class="max-w-7xl mx-auto space-y-6">
                        <div class="flex justify-between items-center">
                            <h1 class="text-2xl font-bold text-white">Transactions</h1>
                            <div class="flex gap-4">
                                <select id="typeFilter" 
                                        class="px-4 py-2 rounded-xl bg-brand-black/50 text-white border
                                            border-brand-primary/30 focus:border-brand-primary outline-none">
                                    <option value="">All Types</option>
                                    <option value="deposit">Deposits</option>
                                    <option value="withdrawal">Withdrawals</option>
                                </select>
                                <select id="statusFilter"
                                        class="px-4 py-2 rounded-xl bg-brand-black/50 text-white border
                                            border-brand-primary/30 focus:border-brand-primary outline-none">
                                    <option value="">All Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 
                                  rounded-2xl overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="text-left border-b border-brand-primary/10">
                                            <th class="p-4 text-gray-400 font-medium">User</th>
                                            <th class="p-4 text-gray-400 font-medium">Type</th>
                                            <th class="p-4 text-gray-400 font-medium">Amount</th>
                                            <th class="p-4 text-gray-400 font-medium">Status</th>
                                            <th class="p-4 text-gray-400 font-medium">Date</th>
                                            <th class="p-4 text-gray-400 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="transactionsTable">
                                        <!-- Transactions will be rendered here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `,
        pageEvents
    };
};

export default transactions;