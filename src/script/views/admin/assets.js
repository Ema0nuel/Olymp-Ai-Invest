import reset, { cleanupAll } from '../../utils/reset';
import AdminNavbar from './components/Navbar';
import StyleAdminPage from './components/style';
import { checkAdminAuth, logoutAdmin } from './functions/adminLoginHandler';
import { loadPage } from '../../routes/router';
import { AssetManager } from './components/Management';
import Modal from '../../components/Modal';
import toastify from '../../components/toastify';
import supabase from '../../utils/supabaseClients';
import BTC from '../../../images/welcome/btc.png';
import ETH from '../../../images/welcome/eth.png';
import SOL from '../../../images/welcome/sol.png';
import BNB from '../../../images/welcome/bnb.png';

const assetsIcons = {
    BTC,
    BNB,
    USDT: BNB,
    SOL,
    ETH
};

const assets = async () => {

    reset('Olymp AI Assets Panel Management');
    cleanupAll();

    async function fetchAssets() {
        try {
            const container = document.getElementById('assetsGrid');
            if (!container) return;

            const { data: assets, error } = await supabase
                .from('assets')
                .select(`
                    *,
                    user_assets (
                        id, balance,
                        profiles:user_id (
                            full_name, email
                        )
                    )
                `)
                .order('symbol');

            if (error) throw error;

            renderAssets(assets || []);
        } catch (error) {
            console.error('Error fetching assets:', error);
            toastify({
                text: 'Failed to load assets',
                icon: 'fas fa-exclamation-circle',
                background: 'bg-red-500/10'
            });
        }
    }

    function renderAssetLogo(asset) {
        if (assetsIcons[asset.symbol]) {
            return `<img src="${assetsIcons[asset.symbol]}" alt="${asset.symbol}" class="w-8 h-8">`;
        } else if (asset.logo_url) {
            return `<img src="${asset.logo_url}" alt="${asset.symbol}" class="w-8 h-8">`;
        }
        return `<span class="text-xl text-brand-primary">${asset.symbol.charAt(0)}</span>`;
    }

    function renderAssets(assets) {
        const container = document.getElementById('assetsGrid');
        if (!container) return;

        container.innerHTML = assets.length ? assets.map(asset => /* html */`
            <div class="bg-brand-black/30 rounded-xl p-6">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                            ${renderAssetLogo(asset)}
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-white">${asset.symbol}</h3>
                            <p class="text-gray-400">${asset.name}</p>
                        </div>
                    </div>
                    <button onclick="window.editAsset('${asset.id}')"
                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>

                <div class="space-y-4">
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Total Users</span>
                        <span class="text-white font-medium">${asset.user_assets?.length || 0}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Network</span>
                        <span class="text-white font-medium">${Array.isArray(asset.network) ? asset.network.join(', ') : asset.network || 'Not set'}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Status</span>
                        <span class="px-2 py-1 rounded-full text-sm 
                            ${asset.is_active ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}">
                            ${asset.is_active ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Wallet Addresses</span>
                        <span class="text-white font-medium text-right">
                            ${typeof asset.wallet_addresses === 'object' ?
                Object.keys(asset.wallet_addresses).length + ' networks' :
                'No addresses'}
                        </span>
                    </div>
                </div>

                ${asset.user_assets?.length ? /* html */`
                    <div class="mt-6">
                        <h4 class="text-sm font-medium text-gray-400 mb-3">Recent Users</h4>
                        <div class="space-y-3">
                            ${asset.user_assets.slice(0, 3).map(ua => /* html */`
                                <div class="flex justify-between items-center p-3 bg-brand-black/20 rounded-lg">
                                    <div>
                                        <div class="text-white">${ua.profiles?.full_name || 'Unknown User'}</div>
                                        <div class="text-sm text-gray-400">${ua.profiles?.email || 'No email'}</div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-white font-medium">${ua.balance} ${asset.symbol}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `).join('') : `
            <div class="col-span-full text-center text-gray-400 py-8">
                No assets found
            </div>
        `;
    }

    function pageEvents() {
        StyleAdminPage();

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


        // Initialize asset manager
        const spinner = { show: () => { }, hide: () => { } }; // Replace with your spinner
        const assetManager = new AssetManager(supabase, spinner);

        // Fetch initial assets
        fetchAssets();

        // Add Asset Handler
        window.addAsset = () => {
            const modal = new Modal({
                title: 'Add New Asset',
                content: /* html */`
                    <form id="addAssetForm" class="space-y-6">
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                            <input type="text" name="symbol" required
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none"
                                   placeholder="e.g., BTC">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input type="text" name="name" required
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none"
                                   placeholder="e.g., Bitcoin">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Network</label>
                            <input type="text" name="network" required
                                class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                        border border-brand-primary/30 focus:border-brand-primary outline-none"
                                placeholder="e.g., BTC Network, ERC20, BEP20 (comma-separated)">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                            <input type="url" name="logo_url"
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none"
                                   placeholder="https://example.com/logo.png">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Wallet Addresses</label>
                            <textarea name="wallet_addresses" required
                                        class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white 
                                                border border-brand-primary/30 focus:border-brand-primary outline-none"
                                        placeholder="Enter wallet addresses (format: NETWORK: ADDRESS)
                                    Example:
                                    BTC: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                    ETH: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"></textarea>
                        </div>
                        <button type="submit"
                                class="w-full h-12 rounded-xl bg-brand-primary text-white 
                                       hover:bg-brand-primary/90 transition-colors">
                            Add Asset
                        </button>
                    </form>
                `
            });

            modal.show();

            // Update the addAsset form submission handler
            document.getElementById('addAssetForm').onsubmit = async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                // Format network as an array if multiple networks are provided
                const networkInput = formData.get('network');
                const networks = networkInput.split(',')
                    .map(n => n.trim())
                    .filter(n => n); // Remove empty strings

                // Format wallet addresses as a JSON object
                const walletAddressesInput = formData.get('wallet_addresses');
                const walletAddresses = {};
                walletAddressesInput.split('\n')
                    .map(line => line.trim())
                    .filter(line => line)
                    .forEach(line => {
                        const [network, address] = line.split(':').map(s => s.trim());
                        if (network && address) {
                            walletAddresses[network] = address;
                        }
                    });

                try {
                    const { error } = await supabase
                        .from('assets')
                        .insert({
                            symbol: formData.get('symbol').toUpperCase(),
                            name: formData.get('name'),
                            network: networks,
                            logo_url: formData.get('logo_url') || null,
                            is_active: true,
                            wallet_addresses: walletAddresses
                        });

                    if (error) throw error;

                    modal.hide();
                    toastify({
                        text: 'Asset added successfully',
                        icon: 'fas fa-check-circle',
                        background: 'bg-green-500/10'
                    });
                    fetchAssets();
                } catch (error) {
                    console.error('Error adding asset:', error);
                    toastify({
                        text: error.message || 'Failed to add asset',
                        icon: 'fas fa-exclamation-circle',
                        background: 'bg-red-500/10'
                    });
                }
            };
        };

        // Edit Asset Handler
        window.editAsset = async (assetId) => {
            const { data: asset, error } = await supabase
                .from('assets')
                .select('*')
                .eq('id', assetId)
                .single();

            if (error) {
                toastify({
                    text: 'Failed to load asset details',
                    icon: 'fas fa-exclamation-circle',
                    background: 'bg-red-500/10'
                });
                return;
            }

            const modal = new Modal({
                title: `Edit ${asset.symbol}`,
                content: /* html */`
                    <form id="editAssetForm" class="space-y-6">
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input type="text" name="name" value="${asset.name}" required
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Network</label>
                            <input type="text" name="network" value="${asset.network || ''}"
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                            <input type="url" name="logo_url" value="${asset.logo_url || ''}"
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none">
                        </div>
                        <div class="form-group">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="is_active" ${asset.is_active ? 'checked' : ''}
                                       class="rounded border-gray-300 text-brand-primary 
                                              focus:border-brand-primary focus:ring-brand-primary">
                                <span class="text-gray-300">Active</span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Wallet Addresses</label>
                            <textarea name="wallet_addresses" required
                                        class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white 
                                                border border-brand-primary/30 focus:border-brand-primary outline-none"
                                        placeholder="Enter wallet addresses (format: NETWORK: ADDRESS)">${typeof asset.wallet_addresses === 'object' ?
                        Object.entries(asset.wallet_addresses)
                            .map(([network, address]) => `${network}: ${address}`)
                            .join('\n')
                        : ''
                    }</textarea>
                        </div>
                        <button type="submit"
                                class="w-full h-12 rounded-xl bg-brand-primary text-white 
                                       hover:bg-brand-primary/90 transition-colors">
                            Update Asset
                        </button>
                    </form>
                `
            });

            modal.show();

            // Update the editAsset form submission handler
            document.getElementById('editAssetForm').onsubmit = async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);

                // Format network as an array if multiple networks are provided
                const networkInput = formData.get('network');
                const networks = networkInput.split(',')
                    .map(n => n.trim())
                    .filter(n => n); // Remove empty strings

                // Format wallet addresses as a JSON object
                const walletAddressesInput = formData.get('wallet_addresses');
                const walletAddresses = {};
                walletAddressesInput.split('\n')
                    .map(line => line.trim())
                    .filter(line => line)
                    .forEach(line => {
                        const [network, address] = line.split(':').map(s => s.trim());
                        if (network && address) {
                            walletAddresses[network] = address;
                        }
                    });

                try {
                    const { error } = await supabase
                        .from('assets')
                        .update({
                            name: formData.get('name'),
                            network: networks,
                            logo_url: formData.get('logo_url') || null,
                            is_active: formData.get('status') === 'on',
                            wallet_addresses: walletAddresses  // Use status instead of is_active
                        })
                        .eq('id', assetId);

                    if (error) throw error;

                    modal.hide();
                    toastify({
                        text: 'Asset updated successfully',
                        icon: 'fas fa-check-circle',
                        background: 'bg-green-500/10'
                    });
                    fetchAssets();
                } catch (error) {
                    console.error('Error updating asset:', error);
                    toastify({
                        text: error.message,
                        icon: 'fas fa-exclamation-circle',
                        background: 'bg-red-500/10'
                    });
                }
            };
        };
    }

    return {
        html: /* html */`
            <div class="flex min-h-screen bg-brand-dark mobile-container">
                ${AdminNavbar().html}
                <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                    <div class="max-w-7xl mx-auto space-y-6">
                        <div class="flex justify-between items-center">
                            <h1 class="text-2xl font-bold text-white">Assets</h1>
                            <button onclick="window.addAsset()"
                                    class="px-4 py-2 rounded-xl bg-brand-primary text-white 
                                           hover:bg-brand-primary/90 transition-colors">
                                <i class="fas fa-plus"></i>
                                <span class="ml-2">Add Asset</span>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="assetsGrid">
                            <!-- Assets will be rendered here -->
                        </div>
                    </div>
                </main>
            </div>
        `,
        pageEvents
    };
};

export default assets;