import supabase from '../../../utils/supabaseClients';
import Modal from '../../../components/Modal';

const RecentTransactions = () => {
    async function fetchTransactions() {
        try {
            const container = document.getElementById('recentTransactions');
            if (!container) return;

            // Clear existing content first
            container.innerHTML = ''

            const { data, error } = await supabase
                .from('transactions')
                .select(`
                    *,
                    profiles!transactions_user_id_fkey (full_name, email)
                `)
                .order('created_at', { ascending: false })
                .limit(4);

            if (error) throw error;
            if (!data) return;

            data.forEach(tx => {
                const element = document.createElement('div');
                element.className = 'flex items-center justify-between p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10 cursor-pointer hover:bg-brand-primary/5 transition-colors';
                element.onclick = () => showTransactionDetails(tx);

                const statusColor = {
                    completed: 'text-green-500',
                    pending: 'text-yellow-500',
                    failed: 'text-red-500'
                }[tx.status];

                element.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                            <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' : 'arrow-up'} 
                                   ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-white">${tx.profiles.full_name}</h3>
                            <p class="text-sm text-gray-400">${tx.type} - $${tx.amount}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${statusColor}">${tx.status}</span>
                        <p class="text-sm text-gray-400">${new Date(tx.created_at).toLocaleDateString()}</p>
                    </div>
                `;
                container.appendChild(element);
            });
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    function showTransactionDetails(tx) {
        new Modal({
            title: 'Transaction Details',
            content: /* html */`
                <div class="space-y-4">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                            <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' : 'arrow-up'} text-2xl 
                                   ${tx.type === 'deposit' ? 'text-green-500' : 'text-red-500'}"></i>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-400">Type</p>
                            <p class="text-white font-medium">${tx.type}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Amount</p>
                            <p class="text-white font-medium">$${tx.amount}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Status</p>
                            <p class="text-white font-medium">${tx.status}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Date</p>
                            <p class="text-white font-medium">${new Date(tx.created_at).toLocaleString()}</p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm text-gray-400">User</p>
                            <p class="text-white font-medium">${tx.profiles.full_name}</p>
                            <p class="text-sm text-gray-400">${tx.profiles.email}</p>
                        </div>
                    </div>
                </div>
            `
        }).show();
    }

    return {
        html: /* html */`
            <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                <h2 class="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
                <div id="recentTransactions" class="space-y-4"></div>
            </div>
        `,
        init: fetchTransactions
    };
};

export default RecentTransactions;