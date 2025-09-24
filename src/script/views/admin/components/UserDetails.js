import { Spinner } from "./spinner";
import { handleError } from "../../../utils/errorHandler";
import supabase from "../../../utils/supabaseClients";
import Modal from "../../../components/Modal";
import toastify from "../../../components/toastify";
import { formatDistance } from "date-fns";
import BTC from '../../../../images/welcome/btc.png'
import ETH from '../../../../images/welcome/eth.png'
import SOL from '../../../../images/welcome/sol.png'
import BNB from '../../../../images/welcome/bnb.png'
import { sendEmail } from '../../../utils/send-email';


const assetsIcons = {
    BTC,
    BNB,
    USDT: BNB,
    SOL,
    ETH
}

// Types and interfaces
/**
 * @typedef {Object} UserState
 * @property {boolean} isLoading
 * @property {string} currentTab
 * @property {Object} filters
 * @property {string} filters.transactionType
 * @property {string} filters.transactionStatus
 */

// Update the asset logo rendering
function renderAssetLogo(asset) {
    if (assetsIcons[asset.symbol]) {
        return `<img src="${assetsIcons[asset.symbol]}" alt="${asset.symbol}" class="w-6 h-6">`;
    } else if (asset.logo_url) {
        return `<img src="${asset.logo_url}" alt="${asset.symbol}" class="w-6 h-6">`;
    }
    return `<span class="text-lg text-brand-primary">${asset.symbol.charAt(0)}</span>`;
}


export class UserDetailsView {
    /**
     * @param {string} userId - The ID of the user to display
     */
    constructor(userId) {
        if (!userId) throw new Error('UserId is required');

        this.userId = userId;
        this.spinner = new Spinner();
        this.activeModals = new Set();
        this.refreshInterval = null;

        // State management
        this.state = {
            isLoading: false,
            currentTab: 'overview',
            filters: {
                transactionType: '',
                transactionStatus: ''
            }
        };

        // Initialize managers first
        this.initializeManagers();

        // Bind methods after they're defined
        this.handleTabClick = (tab) => {
            this.currentTab = tab;
            this.render();
        };

        // Use arrow functions instead of bind
        this.render = this.debounce((data) => {
            const container = document.getElementById("userDetailsContent");
            if (!container || !this.userData) return;

            container.innerHTML = `
                <div class="space-y-6">
                    ${this.renderBackButton()}
                    ${this.renderUserHeader()}
                    ${this.renderTabs()}
                    <div id="tabContent">
                        ${this.renderTabContent()}
                    </div>
                </div>
            `;
            this.initializeTabEvents();
        }, 100);

        // Bind methods that will be used as event listeners
        this.handleTabClick = this.handleTabClick.bind(this);
        this.handleAction = this.handleAction.bind(this)
    }

    // Add stopAutoRefresh method
    stopAutoRefresh() {
        if (this.refreshInterval) {
            clearInterval(this.refreshInterval);
            this.refreshInterval = null;
        }
    }

    /**
     * Initialize all required managers
     * @private
     */
    initializeManagers() {
        import('./Management.js').then(({ KycManager, TransactionManager, BalanceManager, AssetManager, EmailNotifier }) => {
            // Create EmailNotifier instance with sendEmail function
            this.emailNotifier = new EmailNotifier(sendEmail, this.spinner);
            this.kycManager = new KycManager(supabase, this.spinner);
            this.transactionManager = new TransactionManager(supabase, this.spinner, this.emailNotifier);
            this.balanceManager = new BalanceManager(supabase, this.spinner, this.emailNotifier);
            this.assetManager = new AssetManager(supabase, this.spinner, this.emailNotifier);
        });
    }

    /**
     * Initialize the view and start data refresh
     */
    // Remove the bind in initialize()
    async initialize() {
        try {
            await this.fetchUserData();
            this.render();
            // Initialize all event handlers right after render
            this.initializeEventListeners();
            this.initializeTabEvents();
            this.startAutoRefresh();
        } catch (error) {
            handleError(error, 'Failed to initialize user view');
        }
    }

    async fetchUserData() {
        this.spinner.show("Loading user details...");
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select(this.getFullUserQuery())
                .eq("id", this.userId)
                .single();

            if (error) throw error;
            this.userData = data;
        } catch (error) {
            handleError(error, "Failed to load user details");
        } finally {
            this.spinner.hide();
        }
    }

    /**
     * Set up event delegation for the entire view
     * @private
     */
    initializeEventDelegation() {
        const container = document.getElementById('userDetailsContent');
        if (!container) return;

        container.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const { action, id, type } = target.dataset;
            this.handleAction(action, id, type);
        });
    }

    /**
     * Handle delegated actions
     * @private
     */
    async handleAction(action, id, type) {
        try {
            switch (action) {
                case 'editBalance':
                    await this.handleEditBalance(id, type);
                    break;
                case 'handleTransaction':
                    await this.handleTransaction(id, type);
                    break;
                case 'editAsset':
                    await this.handleEditUserAsset(id);
                    break;
                // Add more cases as needed
            }
        } catch (error) {
            handleError(error, `Failed to handle ${action}`);
        }
    }

    /**
     * Update state and trigger re-render
     * @param {Partial<UserState>} newState 
     */
    updateState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    /**
     * Show modal and track it
     * @param {Modal} modal 
     */
    showModal(modal) {
        this.activeModals.add(modal);
        modal.show();
    }

    /**
     * Clean up modal instances
     * @private
     */
    clearModals() {
        this.activeModals.forEach(modal => modal.hide());
        this.activeModals.clear();
    }

    /**
     * Start auto-refresh of user data
     * @private
     */
    startAutoRefresh() {
        this.refreshInterval = setInterval(() => {
            if (!document.hidden) {
                this.fetchUserData();
            }
        }, 30000);
    }

    /**
     * Clean up all resources
     */
    // Update destroy method with proper cleanup
    destroy() {
        try {
            // Stop auto refresh
            this.stopAutoRefresh();

            // Clear modals
            this.clearModals();

            // Remove tab event listeners properly
            document.querySelectorAll('[data-tab]').forEach(tab => {
                tab.removeEventListener('click', this.handleTabClick);
            });

            // Remove event delegation listener
            const container = document.getElementById('userDetailsContent');
            if (container) {
                container.removeEventListener('click', this.handleAction);
                container.innerHTML = '';
            }

            // Clear global window handlers
            const windowHandlers = [
                'handleTransaction',
                'editBalance',
                'addUserAsset',
                'editUserAsset',
                'removeUserAsset',
                'handleKycDocument',
                'sendNotification',
                'markNotificationRead',
                'deleteNotification',
                'editUserProfile',
                'sendCustomEmail',
                'manageUserAssets',
                'viewTransaction',
                'openImage'
            ];

            windowHandlers.forEach(handler => {
                if (window[handler]) {
                    window[handler] = null;
                }
            });

            // Clear data
            this.userData = null;

        } catch (error) {
            console.error('Error during cleanup:', error);
        }
    }

    render() {
        const container = document.getElementById("userDetailsContent");
        if (!container || !this.userData) return;

        container.innerHTML = `
            <div class="space-y-6">
                ${this.renderBackButton()}
                ${this.renderUserHeader()}
                ${this.renderTabs()}
                <div id="tabContent">
                    ${this.renderTabContent()}
                </div>
            </div>
        `;

        // Initialize tab events after rendering
        this.initializeTabEvents();
    }

    renderBackButton() {
        return `
            <button onclick="window.backToUsersList()"
                class="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <i class="fas fa-arrow-left"></i>
                <span>Back to Users</span>
            </button>
        `;
    }

    renderUserHeader() {
        const { full_name, email, avatar_url, is_verified, created_at } = this.userData;
        const liveAccount = this.userData.trading_accounts?.find(acc => acc.account_type === "live");

        return /* html */`
        <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                        ${avatar_url
                ? `<img src="${avatar_url}" alt="${full_name}" class="w-full h-full object-cover">`
                : `<span class="text-2xl text-brand-primary">${full_name.charAt(0).toUpperCase()}</span>`
            }
                    </div>
                    <div>
                        <h2 class="text-xl font-semibold text-white">${full_name}</h2>
                        <div class="text-gray-400 mt-1">${email}</div>
                        <div class="flex items-center gap-3 mt-2">
                            <span class="px-2 py-1 rounded-full text-sm
                                ${is_verified ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}">
                                ${is_verified ? "Verified" : "Pending Verification"}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm text-gray-400">Live Balance</div>
                    <div class="text-2xl font-bold text-white mt-1">
                        $${liveAccount?.balance?.toLocaleString() || "0.00"}
                    </div>
                    <div class="text-sm text-gray-400 mt-2">
                        Joined ${formatDistance(new Date(created_at), new Date(), { addSuffix: true })}
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap gap-2 mt-6 pt-6 border-t border-brand-primary/10">
                <button onclick="window.editUserProfile('${this.userData.id}')"
                        class="px-3 py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                    <i class="fas fa-edit"></i>
                    <span class="ml-2">Edit Profile</span>
                </button>
                <button onclick="window.sendCustomEmail('${this.userData.id}')"
                        class="px-3 py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                    <i class="fas fa-envelope"></i>
                    <span class="ml-2">Send Email</span>
                </button>
                <button onclick="window.manageUserAssets('${this.userData.id}')"
                        class="px-3 py-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                    <i class="fas fa-coins"></i>
                    <span class="ml-2">Manage Assets</span>
                </button>
            </div>
        </div>
        `;
    }

    renderTabs() {
        const tabs = [
            { id: "overview", label: "Overview", icon: "chart-pie" },
            { id: "assets", label: "Assets", icon: "coins" },
            { id: "transactions", label: "Transactions", icon: "exchange-alt" },
            { id: "kyc", label: "KYC Documents", icon: "id-card" },
            { id: "notifications", label: "Notifications", icon: "bell" },
        ];
        return `
            <div class="flex overflow-x-auto hide-scrollbar gap-2">
                ${tabs.map(tab => `
                    <button data-tab="${tab.id}"
                        class="flex items-center gap-2 px-4 py-2 rounded-xl
                        ${tab.id === this.currentTab ? "bg-brand-primary text-white" : "text-gray-400 hover:text-white"}
                        transition-colors">
                        <i class="fas fa-${tab.icon}"></i>
                        <span>${tab.label}</span>
                    </button>
                `).join("")}
            </div>
        `;
    }

    renderTabContent() {
        if (!this.userData) return '<div>Loading...</div>';

        switch (this.currentTab) {
            case "overview":
                return this.renderOverviewTab();
            case "assets":
                return this.renderAssetsTab();
            case "transactions":
                return this.renderTransactionsTab();
            case "kyc":
                return this.renderKycTab();
            case "notifications":
                return this.renderNotificationsTab();
            default:
                return this.renderOverviewTab();
        }
    }

    renderOverviewTab() {
        const liveAccount = this.userData.trading_accounts?.find(acc => acc.account_type === "live");
        const demoAccount = this.userData.trading_accounts?.find(acc => acc.account_type === "demo");
        const pendingTransactions = this.userData.transactions?.filter(tx => tx.status === "pending") || [];

        return /* html */`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="bg-brand-black/30 rounded-xl p-6 space-y-4">
                <h3 class="text-lg font-semibold text-white">Account Summary</h3>
                <div class="p-4 bg-brand-primary/10 rounded-xl">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400">Live Balance</span>
                        <button onclick="window.editBalance('${liveAccount?.id}', 'live')"
                                class="text-sm text-brand-primary hover:text-brand-primary/80">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                    <div class="text-2xl font-bold text-white mt-1">
                        $${liveAccount?.balance?.toLocaleString() || "0.00"}
                    </div>
                    <div class="text-sm text-gray-400 mt-2">
                        Leverage: ${liveAccount?.leverage || 100}x
                    </div>
                </div>
                <div class="p-4 bg-brand-primary/5 rounded-xl">
                    <div class="flex justify-between items-center">
                        <span class="text-gray-400">Demo Balance</span>
                        <button onclick="window.editBalance('${demoAccount?.id}', 'demo')"
                                class="text-sm text-brand-primary hover:text-brand-primary/80">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                    <div class="text-xl text-gray-300 mt-1">
                        $${demoAccount?.balance?.toLocaleString() || "0.00"}
                    </div>
                </div>
            </div>
            <div class="bg-brand-black/30 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Pending Transactions</h3>
                ${pendingTransactions.length
                ? `<div class="space-y-3">
                        ${pendingTransactions.map(tx => `
                            <div class="p-4 bg-brand-black/20 rounded-xl">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="text-white capitalize">${tx.type}</div>
                                        <div class="text-sm text-gray-400">
                                            $${tx.amount.toLocaleString()} ${tx.currency || ""}
                                        </div>
                                        <div class="text-xs text-gray-500 mt-1">
                                            ${formatDistance(new Date(tx.created_at), new Date(), { addSuffix: true })}
                                        </div>
                                    </div>
                                    <div class="flex gap-2">
                                        <button onclick="window.handleTransaction('${tx.id}', 'approve')"
                                                class="px-3 py-1 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                                            Approve
                                        </button>
                                        <button onclick="window.handleTransaction('${tx.id}', 'reject')"
                                                class="px-3 py-1 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `).join("")}
                    </div>`
                : `<div class="text-center text-gray-400 py-6">No pending transactions</div>`
            }
            </div>
        </div>
        `;
    }

    renderAssetsTab() {
        const userAssets = this.userData.user_assets || [];
        return /* html */`
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">User Assets</h3>
                <button onclick="window.addUserAsset('${this.userData.id}')"
                        class="px-4 py-2 rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                    <i class="fas fa-plus"></i>
                    <span class="ml-2">Add Asset</span>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${userAssets.length
                ? userAssets.map(asset => /* html */`
                        <div class="bg-brand-black/30 rounded-xl p-4">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                                        ${renderAssetLogo(asset.assets)}
                                    </div>
                                    <div>
                                        <div class="font-medium text-white">${asset.assets.symbol}</div>
                                        <div class="text-sm text-gray-400">${asset.assets.name}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <button onclick="window.editUserAsset('${asset.id}')"
                                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                                        <i class="fas fa-edit"></i>
                                    </button>
                                    <button onclick="window.removeUserAsset('${asset.id}')"
                                            class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mt-4 pt-4 border-t border-brand-primary/10">
                                <div class="flex justify-between items-center">
                                    <span class="text-gray-400">Balance</span>
                                    <span class="text-white font-medium">${asset.balance} ${asset.assets.symbol}</span>
                                </div>
                            </div>
                        </div>
                    `).join("")
                : `<div class="col-span-full p-8 text-center text-gray-400 bg-brand-black/30 rounded-xl">No assets found for this user</div>`
            }
            </div>
        </div>
        `;
    }

    renderTransactionsTab() {
        const transactions = this.userData.transactions || [];
        const pendingCount = transactions.filter(tx => tx.status === "pending").length;
        return /* html */`
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">
                    Transactions 
                    ${pendingCount
                ? `<span class="ml-2 px-2 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-500">${pendingCount} pending</span>`
                : ""
            }
                </h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="text-left border-b border-brand-primary/10">
                            <th class="p-4 text-gray-400 font-medium">Type</th>
                            <th class="p-4 text-gray-400 font-medium">Amount</th>
                            <th class="p-4 text-gray-400 font-medium">Status</th>
                            <th class="p-4 text-gray-400 font-medium">Date</th>
                            <th class="p-4 text-gray-400 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactions.length
                ? transactions.map(tx => /* html */`
                                <tr class="border-b border-brand-primary/10">
                                    <td class="p-4">
                                        <div class="flex items-center gap-3">
                                            <span class="capitalize">${tx.type}</span>
                                        </div>
                                    </td>
                                    <td class="p-4">
                                        <div class="text-white">$${tx.amount.toLocaleString()}</div>
                                        ${tx.fee
                        ? `<div class="text-sm text-gray-400">Fee: $${tx.fee.toLocaleString()}</div>`
                        : ""
                    }
                                    </td>
                                    <td class="p-4">
                                        <span class="px-2 py-1 rounded-full text-sm
                                            ${tx.status === "completed"
                        ? "bg-green-500/10 text-green-500"
                        : tx.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                    }">
                                            ${tx.status}
                                        </span>
                                    </td>
                                    <td class="p-4 text-gray-400">
                                        ${formatDistance(new Date(tx.created_at), new Date(), { addSuffix: true })}
                                    </td>
                                    <td class="p-4">
                                        <div class="flex items-center gap-2">
                                            <button onclick="window.viewTransaction('${tx.id}')"
                                                    class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            ${tx.status === "pending"
                        ? `
                                                    <button onclick="window.handleTransaction('${tx.id}', 'approve')"
                                                            class="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                                                        <i class="fas fa-check"></i>
                                                    </button>
                                                    <button onclick="window.handleTransaction('${tx.id}', 'reject')"
                                                            class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                                        <i class="fas fa-times"></i>
                                                    </button>
                                                `
                        : ""
                    }
                                        </div>
                                    </td>
                                </tr>
                            `).join("")
                : `<tr><td colspan="5" class="p-8 text-center text-gray-400">No transactions found</td></tr>`
            }
                    </tbody>
                </table>
            </div>
        </div>
        `;
    }

    renderKycTab() {
        const { kyc_documents = [], kyc_status, kyc_submitted_at } = this.userData;
        return /* html */`
        <div class="space-y-6">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-white">KYC Documents</h3>
                <span class="px-3 py-1 rounded-full text-sm
                    ${kyc_status === "approved"
                ? "bg-green-500/10 text-green-500"
                : kyc_status === "pending"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : kyc_status === "rejected"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-gray-500/10 text-gray-500"
            }">
                    ${kyc_status?.replace("_", " ").toUpperCase() || "NOT STARTED"}
                </span>
            </div>
            ${kyc_submitted_at
                ? `<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    ${kyc_documents.map(doc => `
                        <div class="bg-brand-black/30 rounded-xl p-4">
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h4 class="text-white capitalize">${doc.document_type.replace(/_/g, " ")}</h4>
                                    <div class="text-sm text-gray-400 mt-1">
                                        Submitted ${formatDistance(new Date(doc.created_at), new Date(), { addSuffix: true })}
                                    </div>
                                </div>
                                <span class="px-2 py-1 rounded-full text-sm
                                    ${doc.status === "approved"
                        ? "bg-green-500/10 text-green-500"
                        : doc.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                    }">
                                    ${doc.status}
                                </span>
                            </div>
                            <div class="aspect-video bg-brand-black/20 rounded-lg overflow-hidden mb-4">
                                <img src="${doc.document_url}" alt="${doc.document_type}" class="w-full h-full object-contain cursor-pointer" onclick="window.openImage('${doc.document_url}')">
                            </div>
                            ${doc.status === "pending"
                        ? `<div class="flex gap-2">
                                    <button onclick="window.handleKycDocument('${doc.id}', 'approve')"
                                            class="flex-1 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
                                        Approve
                                    </button>
                                    <button onclick="window.handleKycDocument('${doc.id}', 'reject')"
                                            class="flex-1 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors">
                                        Reject
                                    </button>
                                </div>`
                        : ""
                    }
                        </div>
                    `).join("")}
                </div>`
                : `<div class="text-center text-gray-400 py-8">User has not submitted KYC documents yet</div>`
            }
        </div>
        `;
    }

    renderNotificationsTab() {
        const notifications = this.userData.notifications || [];
        return /* html */`
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Notifications</h3>
                <button onclick="window.sendNotification('${this.userData.id}')"
                        class="px-4 py-2 rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                    <i class="fas fa-plus"></i>
                    <span class="ml-2">Send Notification</span>
                </button>
            </div>
            <div class="space-y-4">
                ${notifications.length
                ? notifications.map(notif => `
                        <div class="bg-brand-black/30 rounded-xl p-4 flex items-start justify-between ${!notif.is_read ? "border-l-4 border-brand-primary" : ""}">
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <h4 class="text-white font-medium">${notif.title}</h4>
                                    <span class="px-2 py-0.5 rounded-full text-xs capitalize bg-brand-primary/10 text-brand-primary">${notif.type}</span>
                                </div>
                                <p class="text-gray-400 mt-1">${notif.message}</p>
                                <div class="text-sm text-gray-500 mt-2">
                                    ${formatDistance(new Date(notif.created_at), new Date(), { addSuffix: true })}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 ml-4">
                                ${!notif.is_read
                        ? `<button onclick="window.markNotificationRead('${notif.id}')" class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors"><i class="fas fa-check"></i></button>`
                        : ""
                    }
                                <button onclick="window.deleteNotification('${notif.id}')" class="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    `).join("")
                : `<div class="text-center text-gray-400 py-8">No notifications found</div>`
            }
            </div>
        </div>
        `;
    }

    initializeTabEvents() {
        document.querySelectorAll('[data-tab]').forEach(tab => {
            // Remove old listener first to prevent duplicates
            tab.removeEventListener('click', this.handleTabClick);
            // Add new listener
            tab.addEventListener('click', (e) => {
                const tabId = e.currentTarget.dataset.tab;
                this.currentTab = tabId;
                const tabContent = document.getElementById("tabContent");
                if (tabContent) {
                    tabContent.innerHTML = this.renderTabContent();
                }
            });
        });
    }

    handleTabClick(event) {
        const tab = event.currentTarget;
        this.currentTab = tab.dataset.tab;
        document.getElementById("tabContent").innerHTML = this.renderTabContent();
    }

    initializeEventListeners() {
        // Set up all window handlers
        const handlers = {
            handleTransaction: async (txId, action) => {
                await this.transactionManager.handleTransaction(txId, action);
                await this.fetchUserData();
                this.render();
            },
            editBalance: (accountId, accountType) => this.handleEditBalance(accountId, accountType),
            addUserAsset: (userId) => this.handleAddUserAsset(userId),
            editUserAsset: (assetId) => this.handleEditUserAsset(assetId),
            removeUserAsset: (assetId) => this.handleRemoveUserAsset(assetId),
            handleKycDocument: (docId, action) => this.handleKycDocument(docId, action),
            sendNotification: (userId) => this.handleSendNotification(userId),
            markNotificationRead: (notifId) => this.handleMarkNotificationRead(notifId),
            deleteNotification: (notifId) => this.handleDeleteNotification(notifId),
            editUserProfile: (userId) => this.handleEditUserProfile(userId),
            sendCustomEmail: (userId) => this.handleSendCustomEmail(userId),
            manageUserAssets: (userId) => this.handleManageUserAssets(userId),
            viewTransaction: (txId) => this.handleViewTransaction(txId),
            openImage: (url) => window.open(url, "_blank")
        };

        // Attach all handlers to window
        Object.entries(handlers).forEach(([key, handler]) => {
            window[key] = handler.bind(this);
        });
    }

    getFullUserQuery() {
        return `
        *,
        trading_accounts (
            id, account_type, balance, leverage, asset_type
        ),
        user_assets (
            id, balance,
            assets:asset_id (
                id, symbol, name, logo_url
            )
        ),
        transactions!transactions_user_id_fkey (
            id, 
            type,
            status,
            amount,
            fee,
            fee_percentage,
            wallet_address,
            network,
            screenshot_url,
            created_at,
            completed_at,
            notes,
            metadata,
            currency,
            user_id,
            account_id
        ),
        notifications (
            id, title, message, type, is_read, created_at
        ),
        kyc_documents (
            id,
            document_type,
            document_url,
            status,
            verification_number,
            expiry_date,
            created_at,
            rejection_reason
        )
    `;
    }

    async handleEditBalance(accountId, accountType) {
        const account = this.userData.trading_accounts.find(acc => acc.id === accountId);
        if (!account) return;

        const modal = new Modal({
            title: `Edit ${accountType.toUpperCase()} Balance`,
            content: `
                <form id="editBalanceForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Current Balance</label>
                        <div class="text-xl font-bold text-white mt-1">
                            $${account.balance.toLocaleString()}
                        </div>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Action</label>
                        <select name="action" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="set">Set exact amount</option>
                            <option value="add">Add to balance</option>
                            <option value="subtract">Subtract from balance</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Amount</label>
                        <input type="number" name="amount" required min="0" step="any"
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Reason</label>
                        <textarea name="reason" required rows="3"
                                  class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                         border border-brand-primary/20 text-white 
                                         focus:border-brand-primary outline-none"
                                  placeholder="Explain why you're modifying the balance..."></textarea>
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Update Balance
                    </button>
                </form>
            `
        });

        modal.show();

        document.getElementById('editBalanceForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const action = formData.get('action');
            const amount = parseFloat(formData.get('amount'));
            const reason = formData.get('reason');
            try {
                await this.balanceManager.updateBalance(accountId, action, amount, reason);
                modal.hide();
                await this.fetchUserData();
                this.render();
            } catch (error) {
                handleError(error, 'Failed to update balance');
            }
        };
    }

    async handleAddUserAsset(userId) {
        const { data: availableAssets, error } = await supabase
            .from('assets')
            .select('*')
            .order('symbol');
        if (error) return handleError(error, 'Failed to load assets');

        const modal = new Modal({
            title: 'Add User Asset',
            content: `
                <form id="addAssetForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Select Asset</label>
                        <select name="asset_id" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="">Choose an asset</option>
                            ${availableAssets.map(asset => `
                                <option value="${asset.id}">
                                    ${asset.symbol} - ${asset.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Initial Balance</label>
                        <input type="number" name="balance" required min="0" step="any"
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Add Asset
                    </button>
                </form>
            `
        });
        modal.show();

        document.getElementById('addAssetForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
                await this.assetManager.updateUserAsset(
                    userId,
                    formData.get('asset_id'),
                    parseFloat(formData.get('balance')),
                    'set'
                );
                modal.hide();
                await this.fetchUserData();
                this.render();
            } catch (error) {
                handleError(error, 'Failed to add asset');
            }
        };
    }

    async handleEditUserAsset(assetId) {
        const userAsset = this.userData.user_assets.find(a => a.id === assetId);
        if (!userAsset) return;

        const modal = new Modal({
            title: `Edit ${userAsset.assets.symbol} Balance`,
            content: `
                <form id="editAssetForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Current Balance</label>
                        <div class="text-xl font-bold text-white mt-1">
                            ${userAsset.balance} ${userAsset.assets.symbol}
                        </div>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Action</label>
                        <select name="action" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="set">Set exact amount</option>
                            <option value="add">Add to balance</option>
                            <option value="subtract">Subtract from balance</option>
                        </select>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Amount</label>
                        <input type="number" name="amount" required min="0" step="any"
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Update Asset
                    </button>
                </form>
            `
        });
        modal.show();

        document.getElementById('editAssetForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
                await this.assetManager.updateUserAsset(
                    this.userId,
                    userAsset.assets.id,
                    parseFloat(formData.get('amount')),
                    formData.get('action')
                );
                modal.hide();
                await this.fetchUserData();
                this.render();
            } catch (error) {
                handleError(error, 'Failed to update asset');
            }
        };
    }

    async handleRemoveUserAsset(assetId) {
        const confirm = window.confirm('Are you sure you want to remove this asset from the user?');
        if (!confirm) return;
        try {
            await supabase.from('user_assets').delete().eq('id', assetId);
            toastify({ text: 'Asset removed', background: 'bg-green-500' });
            await this.fetchUserData();
            this.render();
        } catch (error) {
            handleError(error, 'Failed to remove asset');
        }
    }

    async handleKycDocument(docId, action) {
        try {
            let reason = null;
            if (action === 'reject') {
                reason = prompt('Enter rejection reason:');
                if (!reason) return;
            }
            await this.kycManager.handleDocumentReview(docId, action, reason);
            toastify({ text: `Document ${action}d`, background: 'bg-green-500' });
            await this.fetchUserData();
            this.render();
        } catch (error) {
            handleError(error, `Failed to ${action} document`);
        }
    }

    async handleSendNotification(userId) {
        const modal = new Modal({
            title: 'Send Notification',
            content: `
                <form id="notificationForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Title</label>
                        <input type="text" name="title" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                      border border-brand-primary/20 text-white 
                                      focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Message</label>
                        <textarea name="message" required rows="4"
                                  class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                         border border-brand-primary/20 text-white 
                                         focus:border-brand-primary outline-none"></textarea>
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Type</label>
                        <select name="type" required
                                class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 
                                       border border-brand-primary/20 text-white 
                                       focus:border-brand-primary outline-none">
                            <option value="system">System</option>
                            <option value="deposit">Deposit</option>
                            <option value="withdrawal">Withdrawal</option>
                            <option value="swap">Swap</option>
                        </select>
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white 
                                   hover:bg-brand-primary/90 transition-colors">
                        Send Notification
                    </button>
                </form>
            `
        });
        modal.show();

        document.getElementById('notificationForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
                await supabase.from('notifications').insert({
                    user_id: userId,
                    title: formData.get('title'),
                    message: formData.get('message'),
                    type: formData.get('type'),
                    created_at: new Date().toISOString()
                });
                modal.hide();
                toastify({ text: 'Notification sent', background: 'bg-green-500' });
                await this.fetchUserData();
                this.render();
            } catch (error) {
                handleError(error, 'Failed to send notification');
            }
        };
    }

    async handleMarkNotificationRead(notifId) {
        try {
            await supabase.from('notifications').update({ is_read: true }).eq('id', notifId);
            await this.fetchUserData();
            this.render();
        } catch (error) {
            handleError(error, 'Failed to mark notification as read');
        }
    }

    async handleDeleteNotification(notifId) {
        const confirm = window.confirm('Delete this notification?');
        if (!confirm) return;
        try {
            await supabase.from('notifications').delete().eq('id', notifId);
            await this.fetchUserData();
            this.render();
        } catch (error) {
            handleError(error, 'Failed to delete notification');
        }
    }

    async handleEditUserProfile(userId) {
        // Example: Show a modal with editable fields
        const modal = new Modal({
            title: 'Edit User Profile',
            content: `
                <form id="editProfileForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Full Name</label>
                        <input type="text" name="full_name" value="${this.userData.full_name || ''}" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Email</label>
                        <input type="email" name="email" value="${this.userData.email || ''}" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none">
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                        Save Changes
                    </button>
                </form>
            `
        });
        modal.show();

        document.getElementById('editProfileForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
                await supabase.from('profiles').update({
                    full_name: formData.get('full_name'),
                    email: formData.get('email')
                }).eq('id', userId);
                modal.hide();
                toastify({ text: 'Profile updated', background: 'bg-green-500' });
                await this.fetchUserData();
                this.render();
            } catch (error) {
                handleError(error, 'Failed to update profile');
            }
        };
    }

    async handleSendCustomEmail(userId) {
        const modal = new Modal({
            title: 'Send Email',
            content: `
                <form id="sendEmailForm" class="space-y-6">
                    <div>
                        <label class="text-sm text-gray-400">Subject</label>
                        <input type="text" name="subject" required
                               class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none">
                    </div>
                    <div>
                        <label class="text-sm text-gray-400">Message</label>
                        <textarea name="message" required rows="6"
                                  class="w-full mt-1 p-3 rounded-lg bg-brand-black/50 border border-brand-primary/20 text-white focus:border-brand-primary outline-none"></textarea>
                    </div>
                    <button type="submit"
                            class="w-full py-3 rounded-lg bg-brand-primary text-white hover:bg-brand-primary/90 transition-colors">
                        Send Email
                    </button>
                </form>
            `
        });
        modal.show();

        document.getElementById('sendEmailForm').onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            try {
                await supabase.rpc('send_custom_email', {
                    user_id: userId,
                    subject: formData.get('subject'),
                    message: formData.get('message')
                });
                modal.hide();
                toastify({ text: 'Email sent', background: 'bg-green-500' });
            } catch (error) {
                handleError(error, 'Failed to send email');
            }
        };
    }

    async handleManageUserAssets(userId) {
        // Optionally, you can open a modal or navigate to a dedicated asset management view
        this.handleAddUserAsset(userId);
    }

    async handleViewTransaction(txId) {
        const { data: tx, error } = await supabase
            .from('transactions')
            .select('*')
            .eq('id', txId)
            .single();
        if (error) return handleError(error, 'Failed to load transaction');

        const modal = new Modal({
            title: `Transaction Details`,
            content: `
                <div class="space-y-4">
                    <div><b>Type:</b> ${tx.type}</div>
                    <div><b>Status:</b> ${tx.status}</div>
                    <div><b>Amount:</b> $${tx.amount.toLocaleString()}</div>
                    <div><b>Fee:</b> $${tx.fee?.toLocaleString() || '0'}</div>
                    <div><b>Date:</b> ${new Date(tx.created_at).toLocaleString()}</div>
                    <div><b>Notes:</b> ${tx.notes || '-'}</div>
                    <div><b>Wallet Address:</b> ${tx.wallet_address || '-'}</div>
                    <div><b>Network:</b> ${tx.network || '-'}</div>
                    ${tx.screenshot_url ? `<div><b>Screenshot:</b><br><img src="${tx.screenshot_url}" class="max-w-full rounded-lg mt-2"></div>` : ''}
                </div>
            `
        });
        modal.show();
    }

    /**
     * Debounce helper
     * @private
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

export default UserDetailsView;