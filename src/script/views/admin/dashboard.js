import reset, { cleanupAll } from '../../utils/reset';
import AdminNavbar from './components/Navbar';
import StyleAdminPage from './components/style';
import { checkAdminAuth, logoutAdmin } from './functions/adminLoginHandler';
import { loadPage } from '../../routes/router';
import CryptoPrices from './components/CryptoPrices';
import RecentTransactions from './components/RecentTransactions';
import Analytics from './components/Analytics';
import supabase from '../../utils/supabaseClients';

const dashboard = async () => {

    reset('Olymp AI Admin Dashboard');
    cleanupAll();

    // Fetch total balance
    const { data: totalBalance } = await supabase
        .from('trading_accounts')
        .select('balance')
        .eq('account_type', 'live');

    const totalValue = totalBalance?.reduce((sum, acc) => sum + acc.balance, 0) || 0;

    const cryptoPrices = CryptoPrices();
    const recentTx = RecentTransactions();
    const analytics = Analytics();

    function pageEvents() {
        StyleAdminPage();
        cryptoPrices.init();
        recentTx.init();
        analytics.init();

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
    }

    return {
        html: /* html */`
        <div class="flex min-h-screen bg-brand-dark">
            ${AdminNavbar().html}
            
            <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                <div class="max-w-7xl mx-auto space-y-6">
                    <!-- Header with Total Balance -->
                    <header class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                        <h1 class="text-2xl lg:text-3xl font-bold text-white">Admin Dashboard</h1>
                        <p class="text-gray-400 mt-2">Platform Overview</p>
                        <div class="mt-4 p-4 bg-brand-primary/10 rounded-xl">
                            <p class="text-sm text-gray-400">Total User Balance</p>
                            <p class="text-4xl font-bold text-white">$${totalValue.toLocaleString()}</p>
                        </div>
                    </header>

                    <!-- Analytics Charts -->
                    ${analytics.html}

                    <!-- Crypto Prices and Recent Transactions -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        ${cryptoPrices.html}
                        ${recentTx.html}
                    </div>
                </div>
            </main>
        </div>
        `,
        pageEvents
    };
};

export default dashboard;