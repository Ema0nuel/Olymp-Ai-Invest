import supabase from '../../../utils/supabaseClients'
import spinner from '../../../utils/spinner'

const TransactionList = async () => {
    // State
    let showAll = false

    // Fetch transactions
    async function fetchTransactions() {
        try {
            spinner.start()
            const { data: { session }, error: sessionError } = await supabase.auth.getSession()
            if (sessionError || !session) throw new Error('Not authenticated')

            const { data, error } = await supabase
                .from('transactions')
                .select(`
                    id,
                    type,
                    amount,
                    status,
                    created_at,
                    from_asset,
                    to_asset
                `)
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            return data || []
        } catch (error) {
            console.error('Fetch transactions error:', error)
            return []
        } finally {
            spinner.stop()
        }
    }

    // Generate transaction row HTML
    function generateTransactionRow(tx) {
        return `
            <tr class="border-b border-brand-primary/5 text-sm hover:bg-brand-primary/5 transition-colors">
                <td class="py-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg 
                            ${tx.type === 'deposit' ? 'bg-green-500/10 text-green-500' :
                tx.type === 'withdrawal' ? 'bg-red-500/10 text-red-500' :
                    'bg-brand-primary/10 text-brand-primary'} 
                            flex items-center justify-center">
                            <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' :
                tx.type === 'withdrawal' ? 'arrow-up' :
                    'exchange-alt'
            }"></i>
                        </div>
                        <span class="text-white capitalize">${tx.type}</span>
                    </div>
                </td>
                <td class="py-4">
                    <span class="${tx.type === 'deposit' ? 'text-green-500' :
                tx.type === 'withdrawal' ? 'text-red-500' :
                    'text-white'
            }">
                        ${tx.type === 'withdrawal' ? '-' : '+'}$${tx.amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
            })}
                    </span>
                </td>
                <td class="py-4">
                    <span class="px-2 py-1 rounded-lg text-xs ${tx.status === 'completed' ? 'bg-green-500/10 text-green-500' :
                tx.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-red-500/10 text-red-500'
            }">
                        ${tx.status}
                    </span>
                </td>
                <td class="py-4 text-gray-400">
                    ${new Date(tx.created_at).toLocaleString()}
                </td>
            </tr>
        `
    }

    // Toggle transactions visibility
    async function toggleTransactions() {
        showAll = !showAll
        const tbody = document.getElementById('transactionsBody')
        const viewMoreBtn = document.getElementById('viewMoreBtn')

        if (!tbody || !viewMoreBtn) return

        // Update button text and icon
        viewMoreBtn.innerHTML = showAll ?
            '<i class="fas fa-chevron-up mr-2"></i>View Less' :
            '<i class="fas fa-chevron-down mr-2"></i>View More'

        // Fetch fresh data
        const transactions = await fetchTransactions()

        // Render appropriate number of transactions
        const displayedTransactions = showAll ? transactions : transactions.slice(0, 5)

        tbody.innerHTML = displayedTransactions.length ?
            displayedTransactions.map(generateTransactionRow).join('') :
            `<tr>
                <td colspan="4" class="py-8 text-center text-gray-400">
                    <i class="fas fa-history text-4xl mb-2 block"></i>
                    <p>No transactions found</p>
                </td>
            </tr>`
    }

    // Fetch initial transactions
    const transactions = await fetchTransactions()
    const initialTransactions = transactions.slice(0, 5)

    // Attach global handler
    window.toggleTransactions = toggleTransactions

    return {
        html: /* html */`
        <div class="mt-6 mb-16 lg:mb-2">
            <div class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/10">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-medium text-white">
                        <i class="fas fa-history mr-2"></i>Recent Transactions
                    </h2>
                    ${transactions.length > 5 ? `
                        <button id="viewMoreBtn"
                                onclick="window.toggleTransactions()"
                                class="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors inline-flex items-center">
                            <i class="fas fa-chevron-down mr-2"></i>View More
                        </button>
                    ` : ''}
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm text-gray-400 border-b border-brand-primary/10">
                                <th class="pb-4 font-medium">Type</th>
                                <th class="pb-4 font-medium">Amount</th>
                                <th class="pb-4 font-medium">Status</th>
                                <th class="pb-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody id="transactionsBody">
                            ${initialTransactions.length ?
                initialTransactions.map(generateTransactionRow).join('') :
                `<tr>
                                    <td colspan="4" class="py-8 text-center text-gray-400">
                                        <i class="fas fa-history text-4xl mb-2 block"></i>
                                        <p>No transactions found</p>
                                    </td>
                                </tr>`
            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `
    }
}

export default TransactionList