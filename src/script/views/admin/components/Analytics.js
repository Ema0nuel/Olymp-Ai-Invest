import supabase from '../../../utils/supabaseClients';

const Analytics = () => {
    // Store chart instances
    let charts = {
        transaction: null,
        userGrowth: null
    };

    // Cleanup function
    function destroyCharts() {
        if (charts.transaction) {
            charts.transaction.destroy();
            charts.transaction = null;
        }
        if (charts.userGrowth) {
            charts.userGrowth.destroy();
            charts.userGrowth = null;
        }
    }

    async function initializeCharts() {
        try {
            // Destroy existing charts first
            destroyCharts();

            // Load Chart.js if not already loaded
            if (!window.Chart) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            // Wait for both charts to be created
            await Promise.all([
                createTransactionChart(),
                createUserGrowthChart()
            ]);

        } catch (error) {
            console.error('Chart initialization error:', error);
        }
    }

    async function createTransactionChart() {
        try {
            const ctx = document.getElementById('transactionChart');
            if (!ctx) return;

            // Get fresh canvas context
            ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);

            const { data, error } = await supabase
                .from('transactions')
                .select('amount, created_at, type')
                .order('created_at', { ascending: true });

            if (error) throw error;

            const groupedData = data.reduce((acc, tx) => {
                const date = new Date(tx.created_at).toLocaleDateString();
                if (!acc[date]) acc[date] = { deposits: 0, withdrawals: 0 };
                if (tx.type === 'deposit') acc[date].deposits += tx.amount;
                if (tx.type === 'withdrawal') acc[date].withdrawals += tx.amount;
                return acc;
            }, {});

            charts.transaction = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Object.keys(groupedData),
                    datasets: [
                        {
                            label: 'Deposits',
                            data: Object.values(groupedData).map(d => d.deposits),
                            borderColor: '#10B981',
                            tension: 0.4
                        },
                        {
                            label: 'Withdrawals',
                            data: Object.values(groupedData).map(d => d.withdrawals),
                            borderColor: '#EF4444',
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#9CA3AF' }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#9CA3AF' }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: '#9CA3AF' } }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating transaction chart:', error);
        }
    }

    async function createUserGrowthChart() {
        try {
            const ctx = document.getElementById('userGrowthChart');
            if (!ctx) return;

            // Get fresh canvas context
            ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height);

            const { data, error } = await supabase
                .from('profiles')
                .select('created_at')
                .order('created_at', { ascending: true });

            if (error) throw error;

            const groupedData = data.reduce((acc, user) => {
                const date = new Date(user.created_at).toLocaleDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});

            // Calculate cumulative users
            let cumulative = 0;
            const userCount = Object.entries(groupedData).map(([date, count]) => {
                cumulative += count;
                return { date, total: cumulative };
            });

            charts.userGrowth = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: userCount.map(d => d.date),
                    datasets: [{
                        label: 'Total Users',
                        data: userCount.map(d => d.total),
                        borderColor: '#8B5CF6',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#9CA3AF' }
                        },
                        x: {
                            grid: { color: 'rgba(255, 255, 255, 0.1)' },
                            ticks: { color: '#9CA3AF' }
                        }
                    },
                    plugins: {
                        legend: { labels: { color: '#9CA3AF' } }
                    }
                }
            });
        } catch (error) {
            console.error('Error creating user growth chart:', error);
        }
    }

    return {
        html: /* html */`
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">Transaction Flow</h2>
                    <div class="h-[300px] relative">
                        <canvas id="transactionChart"></canvas>
                    </div>
                </div>
                
                <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">User Growth</h2>
                    <div class="h-[300px] relative">
                        <canvas id="userGrowthChart"></canvas>
                    </div>
                </div>
            </div>
        `,
        init: initializeCharts,
        cleanup: destroyCharts
    };
};

export default Analytics;