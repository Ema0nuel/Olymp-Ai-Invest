import auth from '../../../utils/auth'
import supabase from '../../../utils/supabaseClients'
import { formatMoney } from '../../../utils/formatters'
import BTC from '../../../../images/welcome/btc.png'
import ETH from '../../../../images/welcome/eth.png'
import BNB from '../../../../images/welcome/bnb.png'
import SOL from '../../../../images/welcome/sol.png'

const cryptoImages = { BTC, ETH, BNB, SOL }

const Cards = async () => {
    let isBalanceVisible = true
    let balanceData = []
    let cryptoPrices = []
    let chart = null;
    let currentBalance = 0

    async function initializeChart() {
        const ctx = document.getElementById('balanceChart').getContext('2d')
        const gradient = ctx.createLinearGradient(0, 0, 0, 200)
        gradient.addColorStop(0, 'rgba(41, 98, 255, 0.2)')
        gradient.addColorStop(1, 'rgba(41, 98, 255, 0)')

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: balanceData.map(d => new Date(d.created_at).toLocaleDateString()),
                datasets: [{
                    label: 'Balance History',
                    data: balanceData.map(d => d.amount),
                    borderColor: '#2962ff',
                    backgroundColor: gradient,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false, drawBorder: false },
                        ticks: { color: '#6b7280' }
                    },
                    y: {
                        grid: { color: 'rgba(107, 114, 128, 0.1)', drawBorder: false },
                        ticks: {
                            color: '#6b7280',
                            callback: value => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        })
    }

    async function fetchBalanceData() {
        try {
            const profile = auth.getProfile()
            if (!profile?.id) return 0

            const { data: accounts, error: accountError } = await supabase
                .from('trading_accounts')
                .select('balance, created_at')
                .eq('user_id', profile.id)
                .eq('account_type', 'live')

            if (accountError) return 0
            if (!accounts || accounts.length === 0) return 0

            const account = accounts[0]

            const { data: transactions, error: txError } = await supabase
                .from('transactions')
                .select('amount, created_at, type')
                .eq('user_id', profile.id)
                .order('created_at', { ascending: false })
                .limit(7)

            if (txError) {
                balanceData = []
                return account?.balance || 0
            }

            balanceData = transactions || []
            return account?.balance || 0
        } catch (err) {
            return 0
        }
    }

    async function fetchCryptoPrices() {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd"
            );
            const data = await res.json();

            cryptoPrices = [
                { symbol: "BTC", price: data.bitcoin?.usd ?? 0, change: 0 },
                { symbol: "ETH", price: data.ethereum?.usd ?? 0, change: 0 },
                { symbol: "BNB", price: data.binancecoin?.usd ?? 0, change: 0 },
                { symbol: "SOL", price: data.solana?.usd ?? 0, change: 0 }
            ];

            return cryptoPrices;
        } catch (err) {
            if (typeof toastify === "function") {
                toastify({
                    text: 'Failed to fetch current prices',
                    background: 'bg-red-500'
                });
            }
            cryptoPrices = [
                { symbol: "BTC", price: 0, change: 0 },
                { symbol: "ETH", price: 0, change: 0 },
                { symbol: "BNB", price: 0, change: 0 },
                { symbol: "SOL", price: 0, change: 0 }
            ];
            return cryptoPrices;
        }
    }

    async function initializeBalance() {
        currentBalance = await fetchBalanceData()
        updateBalanceDisplay()
    }

    function updateBalanceDisplay() {
        const balanceElement = document.querySelector('#balanceAmount')
        if (balanceElement) {
            balanceElement.textContent = isBalanceVisible ?
                formatMoney(Number(currentBalance)) :
                '******'
        }
    }

    function toggleBalance() {
        isBalanceVisible = !isBalanceVisible
        const balanceElement = document.querySelector('#balanceAmount')
        const toggleIcon = document.querySelector('#toggleIcon')
        if (balanceElement && toggleIcon) {
            updateBalanceDisplay()
            toggleIcon.className = `fas ${isBalanceVisible ? 'fa-eye' : 'fa-eye-slash'} text-white`
        }
    }

    async function pageEvents() {
        document.querySelector('#toggleBalance')?.addEventListener('click', toggleBalance)
        await initializeChart()
        await initializeBalance()
    }

    return {
        html: /* html */`
    <div class="space-y-6">
        <div class="bg-gradient-to-br from-brand-black/80 to-brand-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-brand-primary/10 overflow-hidden relative">
            <div class="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>
            <div class="relative z-10">
                <div class="flex flex-col items-center sm:items-start text-center sm:text-left mb-8">
                    <span class="text-xs font-medium text-brand-primary mb-2">Live Account</span>
                    <h2 class="text-sm text-gray-400 mb-3">Total Balance</h2>
                    <div class="flex items-center gap-3">
                        <h3 id="balanceAmount" class="text-4xl md:text-3xl font-bold text-white tracking-tight">
                            ${formatMoney(Number(await fetchBalanceData()))}
                        </h3>
                        <button id="toggleBalance" 
                                class="p-2 hover:bg-white/5 rounded-xl transition-colors"
                                aria-label="${isBalanceVisible ? 'Hide' : 'Show'} balance">
                            <i id="toggleIcon" class="fas fa-eye text-gray-400 hover:text-white transition-colors"></i>
                        </button>
                    </div>
                </div>
                <div class="my-4">
                    <div class="relative inline-block w-full">
                        <div class="w-full absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#ce6706] via-[#f1d416] to-[#ce6706] 
                                    animate-gradient opacity-75 blur-[2px]"></div>
                        <a data-nav href="/copy-trade" 
                        class="w-full relative inline-flex justify-center items-center gap-4 px-10 py-3  
                                bg-[#242424]/90 backdrop-blur-sm
                                rounded-2xl hover:scale-[1.02] transition-all duration-300 
                                group border border-white/5">
                        <div class="p-2 bg-[#f1d416]/10 rounded-xl 
                                    group-hover:bg-[#f1d416]/20 transition-all duration-300 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-5 h-5 text-[#f1d416] group-hover:translate-x-1 
                                        transition-transform duration-300" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor">
                            <path stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                            </svg>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-xs text-[#f1d416]/70">Ready to automate?</span>
                            <span class="text-lg font-medium text-white">Start Copy Trading</span>
                        </div>
                        <div class="flex items-center gap-1 ml-4">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#f1d416]/50 animate-pulse"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-[#f1d416]/50 animate-pulse delay-150"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-[#f1d416]/50 animate-pulse delay-300"></div>
                        </div>
                        </a>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-8">
                    <a href="/deposit" data-nav
                       class="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-white">Deposit</span>
                    </a>
                    <a href="/withdraw" data-nav
                       class="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-2 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16M4 12h16" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-white">Withdraw</span>
                    </a>
                    <a href="/swap" data-nav
                       class="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 mb-2 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-white">Swap</span>
                    </a>
                </div>
                <div class="h-32 sm:h-48">
                    <canvas id="balanceChart" class="w-full"></canvas>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${(await fetchCryptoPrices(), cryptoPrices).map(coin => `
                <div class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-4 border border-brand-primary/10">
                    <div class="flex items-center gap-3 mb-2">
                        <img src="${cryptoImages[coin.symbol]}" 
                             alt="${coin.symbol}" 
                             class="w-6 h-6 sm:w-8 sm:h-8">
                        <div>
                            <h3 class="text-sm sm:font-medium text-white">${coin.symbol}/USD</h3>
                            <p class="text-xs text-gray-400">Live Rate</p>
                        </div>
                    </div>
                    <div class="mt-2 sm:mt-3">
                        <div class="text-base sm:text-lg font-bold text-white">
                            ${formatMoney(coin.price)}
                        </div>
                        <div class="text-xs sm:text-sm ${coin.change > 0 ? 'text-green-500' : 'text-red-500'}">
                            ${coin.change > 0 ? '+' : ''}${coin.change.toFixed(2)}%
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    `,
        pageEvents
    }
}

export default Cards