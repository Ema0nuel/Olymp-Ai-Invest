import toastify from '../../../components/toastify';

const CryptoPrices = () => {
    // Add the missing function
    async function fetchCryptoPrices() {
        try {
            const res = await fetch(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd"
            );
            const data = await res.json();

            return {
                BTC: data.bitcoin.usd,
                ETH: data.ethereum.usd,
                USDT: data.tether.usd,
                BNB: data.binancecoin.usd,
            };
        } catch (err) {
            toastify({
                text: 'Failed to fetch current prices',
                background: 'bg-red-500'
            });
            return {};
        }
    }

    async function fetchAndDisplayPrices() {
        try {
            const prices = await fetchCryptoPrices();
            const pricesContainer = document.getElementById('cryptoPrices');
            if (!pricesContainer) return;

            // Clear existing content first
            pricesContainer.innerHTML = '';

            Object.entries(prices).forEach(([symbol, price]) => {
                const priceChange = Math.random() * 5 - 2.5; // Mock price change
                const element = document.createElement('div');
                element.className = 'flex items-center justify-between p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10';
                element.innerHTML = `
                    <div class="flex items-center gap-3">
                        ${cryptoIcons[symbol]}
                        <div>
                            <h3 class="font-medium text-white">${symbol}</h3>
                            <p class="text-sm text-gray-400">$${price.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}">
                            ${priceChange >= 0 ? '↑' : '↓'} ${Math.abs(priceChange).toFixed(2)}%
                        </span>
                    </div>
                `;
                pricesContainer.appendChild(element);
            });
        } catch (error) {
            console.error('Error fetching prices:', error);
        }
    }

    const cryptoIcons = {
        BTC: '<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#F7931A" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/></svg>',
        ETH: '<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#627EEA" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" fill-opacity="0.602" d="M16.498 4v8.87l7.497 3.35z"/><path fill="white" d="M16.498 4L9 16.22l7.498-3.35z"/><path fill="white" fill-opacity="0.602" d="M16.498 21.968v6.027L24 17.616z"/><path fill="white" d="M16.498 27.995v-6.028L9 17.616z"/><path fill="white" fill-opacity="0.2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill="white" fill-opacity="0.602" d="M9 16.22l7.498 4.353v-7.701z"/></svg>',
        USDT: '<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#26A17B" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"/></svg>',
        BNB: '<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#F3BA2F" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"/></svg>'
    };

    return {
        html: /* html */`
        <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-white">Crypto Assets</h2>
                <button id="refreshPrices" 
                        class="text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
            <div id="cryptoPrices" class="space-y-4"></div>
        </div>
    `,
        init: () => {
            fetchAndDisplayPrices();
            document.getElementById('refreshPrices')?.addEventListener('click', (e) => {
                const icon = e.currentTarget.querySelector('i');
                icon?.classList.add('animate-spin');
                fetchAndDisplayPrices().finally(() => {
                    setTimeout(() => icon?.classList.remove('animate-spin'), 1000);
                });
            });
        }
    }
};

export default CryptoPrices;