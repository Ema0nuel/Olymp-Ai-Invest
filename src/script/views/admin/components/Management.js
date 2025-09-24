import toastify from "../../../components/toastify";
import { sendEmail } from "../../../utils/send-email";

class KycManager {
    constructor(supabase, spinner) {
        this.supabase = supabase;
        this.spinner = spinner;
    }

    async updateKycStatus(userId, status, reason = null) {
        this.spinner.show('Updating KYC status...');
        try {
            const { error } = await this.supabase
                .from('profiles')
                .update({
                    kyc_status: status,
                    kyc_rejection_reason: reason,
                    kyc_approved_at: status === 'approved' ? new Date().toISOString() : null
                })
                .eq('id', userId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('KYC status update failed:', error);
            return false;
        } finally {
            this.spinner.hide();
        }
    }

    async handleDocumentReview(docId, action, reason = null) {
        this.spinner.show(`${action === 'approve' ? 'Approving' : 'Rejecting'} document...`);
        try {
            const { data: doc, error: docError } = await this.supabase
                .from('kyc_documents')
                .update({
                    status: action === 'approve' ? 'approved' : 'rejected',
                    rejection_reason: reason,
                    reviewed_at: new Date().toISOString(),
                    verified_at: action === 'approve' ? new Date().toISOString() : null
                })
                .eq('id', docId)
                .select('*, user:user_id(*)')
                .single();

            if (docError) throw docError;

            // Check if all documents are approved/rejected
            const { data: docs } = await this.supabase
                .from('kyc_documents')
                .select('status')
                .eq('user_id', doc.user_id);

            const allApproved = docs.every(d => d.status === 'approved');
            const anyRejected = docs.some(d => d.status === 'rejected');

            // Update overall KYC status
            await this.updateKycStatus(
                doc.user_id,
                allApproved ? 'approved' : anyRejected ? 'rejected' : 'pending',
                reason
            );

            return doc;
        } catch (error) {
            console.error('Document review failed:', error);
            throw error;
        } finally {
            this.spinner.hide();
        }
    }
}

class EmailNotifier {
    constructor(sendEmail, spinner) {
        this.sendEmail = sendEmail;
        this.spinner = spinner;
        this.templates = {
            kyc_approved: {
                subject: 'KYC Verification Approved',
                body: (data) => `
                    <h2>Hello ${data.name},</h2>
                    <p>Your KYC verification has been successfully approved.</p>
                    <p>You now have full access to all platform features.</p>
                `
            },
            kyc_rejected: {
                subject: 'KYC Verification Rejected',
                body: (data) => `
                    <h2>Hello ${data.name},</h2>
                    <p>Your KYC verification has been rejected.</p>
                    <p>Reason: ${data.reason}</p>
                    <p>Please review and resubmit your documents.</p>
                `
            },
            balance_updated: {
                subject: 'Account Balance Updated',
                body: (data) => `
                    <h2>Hello ${data.name},</h2>
                    <p>Your ${data.accountType} account balance has been updated.</p>
                    <p>Action: ${data.action}</p>
                    <p>Amount: $${data.amount.toLocaleString()}</p>
                    <p>New Balance: $${data.newBalance.toLocaleString()}</p>
                `
            },
            asset_updated: {
                subject: 'Asset Balance Updated',
                body: (data) => `
                    <h2>Hello ${data.name},</h2>
                    <p>Your ${data.asset} balance has been updated.</p>
                    <p>Action: ${data.action}</p>
                    <p>Amount: ${data.amount} ${data.asset}</p>
                    <p>New Balance: ${data.newBalance} ${data.asset}</p>
                `
            },
            transaction_approved: {
                subject: 'Transaction Approved',
                body: (data) => `
                    <h2>Hello ${data.name},</h2>
                    <p>Your ${data.type} transaction has been approved.</p>
                    <p>Amount: $${data.amount.toLocaleString()}</p>
                    ${data.fee ? `<p>Fee: $${data.fee.toLocaleString()}</p>` : ''}
                `
            },
            transaction_rejected: {
                subject: 'Transaction Rejected',
                body: (data) => `
                    <h2>Hello ${data.name},</h2>
                    <p>Your ${data.type} transaction has been rejected.</p>
                    <p>Amount: $${data.amount.toLocaleString()}</p>
                `
            }
        };
    }

    async sendTemplateEmail(templateName, data) {
        if (!this.templates[templateName]) {
            throw new Error(`Email template '${templateName}' not found`);
        }

        const template = this.templates[templateName];

        try {
            this.spinner.show('Sending email notification...');

            await sendEmail({
                to: data.email,
                subject: template.subject,
                html: template.body(data)
            });

            toastify({
                text: 'Email sent successfully',
                icon: 'fas fa-check'
            });
        } catch (error) {
            console.error('Failed to send email:', error);
            toastify({
                text: 'Failed to send email',
                icon: 'fas fa-times',
                background: 'bg-red-500'
            });
        } finally {
            this.spinner.hide();
        }
    }
}

class TransactionManager {
    constructor(supabase, spinner, emailNotifier) {
        this.supabase = supabase;
        this.spinner = spinner;
        this.emailNotifier = emailNotifier;
        this.FEE_PERCENTAGE = 0.10; // 10% fee
    }

    async handleTransaction(txId, action) {
        this.spinner.show(`${action === 'approve' ? 'Approving' : 'Rejecting'} transaction...`);
        try {
            // First fetch transaction
            const { data: tx, error: txError } = await this.supabase
                .from('transactions')
                .select(`
                *,
                profiles!transactions_user_id_fkey (
                    id, email, full_name
                )
            `)
                .eq('id', txId)
                .single();

            if (txError) throw txError;

            // Then fetch account details
            const { data: account, error: accountError } = await this.supabase
                .from('trading_accounts')
                .select('*')
                .eq('user_id', tx.user_id)
                .eq('account_type', 'live')
                .single();

            if (accountError) {
                console.error('Account fetch error:', accountError);
                throw new Error('Account not found for this transaction');
            }

            // Process transaction with both transaction and account data
            if (action === 'approve') {
                await this.approveTransaction({
                    ...tx,
                    trading_accounts: account
                });
            } else {
                await this.rejectTransaction(tx);
            }

            return true;
        } catch (error) {
            console.error('Transaction handling failed:', error);
            throw error;
        } finally {
            this.spinner.hide();
        }
    }

    async approveTransaction(tx) {
        const fee = tx.type === 'withdrawal' ? tx.amount * this.FEE_PERCENTAGE : 0;
        const totalAmount = tx.type === 'withdrawal' ? tx.amount + fee : tx.amount;

        // Get the user's live trading account
        const { data: account, error: accountError } = await this.supabase
            .from('trading_accounts')
            .select('*')
            .eq('user_id', tx.user_id)
            .eq('account_type', 'live')
            .single();

        if (accountError) {
            throw new Error('Could not find user trading account');
        }

        if (tx.type === 'withdrawal') {
            if (!account || account.balance < totalAmount) {
                toastify({
                    text: `Insufficient balance for withdrawal. Available: $${account?.balance?.toLocaleString() || 0}, Required: $${totalAmount.toLocaleString()}`,
                    icon: 'fas fa-exclamation-circle'
                });
                throw new Error(
                    `Insufficient balance for withdrawal. Available: $${account?.balance?.toLocaleString() || 0}, Required: $${totalAmount.toLocaleString()}`
                );
            }
        }

        // Update transaction status and balance
        const { error } = await this.supabase.rpc('handle_transaction', {
            p_transaction_id: tx.id,
            p_status: 'completed',
            p_amount: tx.amount,
            p_fee: fee
        });

        if (error) throw error;

        // Send email notification
        await this.emailNotifier.sendTemplateEmail('transaction_approved', {
            email: tx.profiles.email,
            name: tx.profiles.full_name,
            type: tx.type,
            amount: tx.amount,
            fee: fee
        });
    }

    async rejectTransaction(tx) {
        const { error } = await this.supabase
            .from('transactions')
            .update({
                status: 'failed',
                completed_at: new Date().toISOString()
            })
            .eq('id', tx.id);

        if (error) throw error;

        // Send email notification
        await this.emailNotifier.sendTemplateEmail('transaction_rejected', {
            email: tx.profiles.email,
            name: tx.profiles.full_name,
            type: tx.type,
            amount: tx.amount
        });
    }
}

class BalanceManager {
    constructor(supabase, spinner, emailNotifier) {
        this.supabase = supabase;
        this.spinner = spinner;
        this.emailNotifier = emailNotifier;
    }

    async updateBalance(accountId, action, amount, reason) {
        this.spinner.show('Updating balance...');
        try {
            const { data: account, error: accountError } = await this.supabase
                .from('trading_accounts')
                .select('*, profiles:user_id(*)')
                .eq('id', accountId)
                .single();

            if (accountError) throw accountError;

            let newBalance;
            switch (action) {
                case 'set':
                    newBalance = amount;
                    break;
                case 'add':
                    newBalance = account.balance + amount;
                    break;
                case 'subtract':
                    if (account.balance < amount) {
                        throw new Error('Insufficient balance');
                    }
                    newBalance = account.balance - amount;
                    break;
                default:
                    throw new Error('Invalid action');
            }

            // Update balance without updated_at (it's handled by trigger)
            const { error } = await this.supabase
                .from('trading_accounts')
                .update({ balance: newBalance })
                .eq('id', accountId);

            if (error) throw error;

            // Log balance change
            await this.logBalanceChange(account, action, amount, newBalance, reason);

            // Only send email if emailNotifier exists
            if (this.emailNotifier && account.profiles) {
                await this.emailNotifier.sendTemplateEmail('balance_updated', {
                    email: account.profiles.email,
                    name: account.profiles.full_name,
                    amount: amount,
                    action: action,
                    newBalance: newBalance
                });
            }

            return true;
        } catch (error) {
            console.error('Balance update failed:', error);
            throw error;
        } finally {
            this.spinner.hide();
        }
    }

    async logBalanceChange(account, action, amount, newBalance, reason) {
        await this.supabase.from('balance_history').insert({
            account_id: account.id,
            user_id: account.user_id,
            action_type: action,
            amount: amount,
            previous_balance: account.balance,
            new_balance: newBalance,
            reason: reason,
            created_at: new Date().toISOString()
        });
    }
}

// In the same Management.js file

class AssetManager {
    constructor(supabase, spinner, emailNotifier) {
        this.supabase = supabase;
        this.spinner = spinner;
        this.emailNotifier = emailNotifier;
    }

    async updateUserAsset(userId, assetId, amount, action = 'set') {
        this.spinner.show('Updating asset balance...');
        try {
            // First get the existing asset if any
            const { data: existingAsset, error: fetchError } = await this.supabase
                .from('user_assets')
                .select('*, assets(*), profiles:user_id(*)')
                .eq('user_id', userId)
                .eq('asset_id', assetId)
                .maybeSingle();

            if (fetchError) throw fetchError;

            let newBalance;
            if (existingAsset) {
                // Calculate new balance based on action
                switch (action) {
                    case 'add':
                        newBalance = existingAsset.balance + amount;
                        break;
                    case 'subtract':
                        if (existingAsset.balance < amount) {
                            throw new Error('Insufficient balance');
                        }
                        newBalance = existingAsset.balance - amount;
                        break;
                    case 'set':
                    default:
                        newBalance = amount;
                }

                // Update existing asset
                const { data: updatedAsset, error: updateError } = await this.supabase
                    .from('user_assets')
                    .update({ balance: newBalance })
                    .eq('id', existingAsset.id)
                    .select('*, assets(*), profiles:user_id(*)')
                    .single();

                if (updateError) throw updateError;
                return updatedAsset;

            } else {
                // Create new asset
                const { data: newAsset, error: insertError } = await this.supabase
                    .from('user_assets')
                    .insert({
                        user_id: userId,
                        asset_id: assetId,
                        balance: amount
                    })
                    .select('*, assets(*), profiles:user_id(*)')
                    .single();

                if (insertError) throw insertError;
                return newAsset;
            }
        } catch (error) {
            console.error('Asset update failed:', error);
            throw error;
        } finally {
            this.spinner.hide();
        }
    }
}

class UserAssetModal {
    constructor(modal, assetManager) {
        this.modal = modal;
        this.assetManager = assetManager;
    }

    render(userId, currentAssets = []) {
        return /* html */`
            <div class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${currentAssets.map(asset => /* html */`
                        <div class="bg-brand-black/30 p-4 rounded-xl">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-brand-primary/10 
                                                flex items-center justify-center">
                                        <img src="${asset.assets.logo_url}" 
                                             alt="${asset.assets.symbol}"
                                             class="w-6 h-6">
                                    </div>
                                    <div>
                                        <div class="font-medium text-white">
                                            ${asset.assets.symbol}
                                        </div>
                                        <div class="text-sm text-gray-400">
                                            Balance: ${asset.balance}
                                        </div>
                                    </div>
                                </div>
                                <button onclick="window.editAssetBalance('${userId}', '${asset.id}')"
                                        class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary
                                               hover:bg-brand-primary/20 transition-colors">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <form id="addAssetForm" class="space-y-4">
                    <!-- Form fields for adding new assets -->
                </form>
            </div>
        `;
    }

}

class UserDetailsView {
    constructor(supabase, spinner) {
        this.supabase = supabase;
        this.spinner = spinner;
        this.currentTab = 'overview';
        this.tabs = [
            { id: 'overview', label: 'Overview', icon: 'chart-pie' },
            { id: 'assets', label: 'Assets', icon: 'coins' },
            { id: 'transactions', label: 'Transactions', icon: 'exchange-alt' },
            { id: 'kyc', label: 'KYC Documents', icon: 'id-card' },
            { id: 'notifications', label: 'Notifications', icon: 'bell' }
        ];
    }

    render(userData) {
        return /* html */`
            <div class="space-y-6">
                <!-- Back Navigation -->
                <div class="flex items-center justify-between">
                    <button onclick="window.backToUsers()"
                            class="flex items-center gap-2 text-gray-400 hover:text-white 
                                   transition-colors">
                        <i class="fas fa-arrow-left"></i>
                        <span>Back to Users</span>
                    </button>
                    <div class="flex gap-2">
                        <button onclick="window.editUser('${userData.id}')"
                                class="px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary
                                       hover:bg-brand-primary/20 transition-colors">
                            <i class="fas fa-edit mr-2"></i>
                            Edit User
                        </button>
                        <button onclick="window.sendEmail('${userData.id}')"
                                class="px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary
                                       hover:bg-brand-primary/20 transition-colors">
                            <i class="fas fa-envelope mr-2"></i>
                            Send Email
                        </button>
                    </div>
                </div>

                <!-- User Header -->
                ${this.renderUserHeader(userData)}

                <!-- Tab Navigation -->
                <div class="flex overflow-x-auto hide-scrollbar gap-2">
                    ${this.renderTabs()}
                </div>

                <!-- Tab Content -->
                <div id="tabContent">
                    ${this.renderTabContent(userData)}
                </div>
            </div>
        `;
    }

    renderUserHeader(user) {
        const liveAccount = user.trading_accounts?.find(acc => acc.account_type === 'live');

        return /* html */`
            <div class="bg-brand-black/30 rounded-xl p-6">
                <div class="flex flex-col md:flex-row justify-between gap-6">
                    <div class="flex items-center gap-4">
                        <div class="w-16 h-16 rounded-full bg-brand-primary/10 overflow-hidden">
                            ${user.avatar_url ?
                `<img src="${user.avatar_url}" alt="${user.full_name}"
                                      class="w-full h-full object-cover">` :
                `<div class="w-full h-full flex items-center justify-center
                                            text-2xl text-brand-primary">
                                    ${user.full_name.charAt(0).toUpperCase()}
                                </div>`
            }
                        </div>
                        <div>
                            <h2 class="text-xl font-bold text-white">${user.full_name}</h2>
                            <p class="text-gray-400">${user.email}</p>
                            <div class="flex items-center gap-2 mt-2">
                                <span class="px-2 py-1 rounded-full text-sm
                                    ${user.is_verified ?
                'bg-green-500/10 text-green-500' :
                'bg-yellow-500/10 text-yellow-500'}">
                                    ${user.is_verified ? 'Verified' : 'Pending Verification'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="text-sm text-gray-400">Live Balance</span>
                        <h3 class="text-2xl font-bold text-white mt-1">
                            $${liveAccount?.balance?.toLocaleString() || '0.00'}
                        </h3>
                    </div>
                </div>
            </div>
        `;
    }

    // ...existing code...

    renderTabContent(userData) {
        switch (this.currentTab) {
            case 'overview':
                return this.renderOverviewTab(userData);
            case 'assets':
                return this.renderAssetsTab(userData);
            case 'transactions':
                return this.renderTransactionsTab(userData);
            case 'kyc':
                return this.renderKycTab(userData);
            case 'notifications':
                return this.renderNotificationsTab(userData);
            default:
                return '<div>Tab not found</div>';
        }
    }

    renderOverviewTab(userData) {
        const pendingTx = userData.transactions?.filter(tx => tx.status === 'pending') || [];
        const recentActivity = userData.transactions?.slice(0, 5) || [];

        return /* html */`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Pending Transactions Card -->
            <div class="bg-brand-black/30 rounded-xl p-6">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-white">Pending Transactions</h3>
                    ${pendingTx.length ? `
                        <span class="px-2 py-1 rounded-full text-sm bg-yellow-500/10 text-yellow-500">
                            ${pendingTx.length} pending
                        </span>
                    ` : ''}
                </div>
                ${this.renderPendingTransactions(pendingTx)}
            </div>

            <!-- Recent Activity Card -->
            <div class="bg-brand-black/30 rounded-xl p-6">
                <h3 class="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                ${this.renderRecentActivity(recentActivity)}
            </div>

            <!-- User Statistics -->
            <div class="bg-brand-black/30 rounded-xl p-6 lg:col-span-2">
                <h3 class="text-lg font-semibold text-white mb-4">Account Statistics</h3>
                ${this.renderUserStats(userData)}
            </div>
        </div>
    `;
    }

    renderPendingTransactions(transactions) {
        if (!transactions.length) {
            return `
            <div class="text-center text-gray-400 py-4">
                No pending transactions
            </div>
        `;
        }

        return /* html */`
        <div class="space-y-4">
            ${transactions.map(tx => /* html */`
                <div class="flex items-center justify-between p-4 bg-brand-black/20 rounded-lg">
                    <div>
                        <div class="text-white capitalize">${tx.type}</div>
                        <div class="text-sm text-gray-400">
                            $${tx.amount.toLocaleString()} ${tx.currency || ''}
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="window.handleTransaction('${tx.id}', 'approve')"
                                class="px-3 py-1 rounded-lg bg-green-500/10 text-green-500
                                       hover:bg-green-500/20 transition-colors">
                            Approve
                        </button>
                        <button onclick="window.handleTransaction('${tx.id}', 'reject')"
                                class="px-3 py-1 rounded-lg bg-red-500/10 text-red-500
                                       hover:bg-red-500/20 transition-colors">
                            Reject
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    }

    renderAssetsTab(userData) {
        const userAssets = userData.user_assets || [];

        return /* html */`
        <div class="space-y-6">
            <!-- Assets Header -->
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">User Assets</h3>
                <button onclick="window.addUserAsset('${userData.id}')"
                        class="px-4 py-2 rounded-xl bg-brand-primary text-white
                               hover:bg-brand-primary/90 transition-colors">
                    <i class="fas fa-plus mr-2"></i>
                    Add Asset
                </button>
            </div>

            <!-- Assets Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${userAssets.map(asset => /* html */`
                    <div class="bg-brand-black/30 rounded-xl p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full bg-brand-primary/10 
                                            flex items-center justify-center overflow-hidden">
                                    ${asset.assets.logo_url ?
                `<img src="${asset.assets.logo_url}" 
                                              alt="${asset.assets.symbol}"
                                              class="w-8 h-8 object-contain">` :
                `<span class="text-xl text-brand-primary">
                                            ${asset.assets.symbol.charAt(0)}
                                        </span>`
            }
                                </div>
                                <div>
                                    <h4 class="font-medium text-white">
                                        ${asset.assets.symbol}
                                    </h4>
                                    <p class="text-sm text-gray-400">
                                        ${asset.assets.name}
                                    </p>
                                </div>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="window.editAssetBalance(
                                    '${userData.id}', 
                                    '${asset.id}',
                                    '${asset.assets.symbol}'
                                )"
                                        class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary
                                               hover:bg-brand-primary/20 transition-colors">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-brand-primary/10">
                            <div class="flex justify-between items-center">
                                <span class="text-gray-400">Balance</span>
                                <span class="text-lg font-medium text-white">
                                    ${asset.balance} ${asset.assets.symbol}
                                </span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    }

    renderTransactionsTab(userData) {
        const transactions = userData.transactions || [];
        const statusColors = {
            completed: 'green',
            pending: 'yellow',
            failed: 'red'
        };

        return /* html */`
        <div class="space-y-6">
            <!-- Transactions Header -->
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">
                    Transactions History
                </h3>
                <div class="flex gap-2">
                    <select id="txTypeFilter" 
                            class="px-3 py-2 rounded-lg bg-brand-black/50 border border-brand-primary/20 
                                   text-white focus:border-brand-primary outline-none">
                        <option value="">All Types</option>
                        <option value="deposit">Deposits</option>
                        <option value="withdrawal">Withdrawals</option>
                        <option value="swap">Swaps</option>
                    </select>
                    <select id="txStatusFilter"
                            class="px-3 py-2 rounded-lg bg-brand-black/50 border border-brand-primary/20 
                                   text-white focus:border-brand-primary outline-none">
                        <option value="">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            <!-- Transactions Table -->
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
                        ${transactions.length ? transactions.map(tx => /* html */`
                            <tr class="border-b border-brand-primary/10 hover:bg-brand-black/20">
                                <td class="p-4">
                                    <div class="flex items-center gap-2">
                                        <i class="fas fa-${tx.type === 'deposit' ? 'arrow-down' :
                tx.type === 'withdrawal' ? 'arrow-up' : 'exchange-alt'
            } text-${statusColors[tx.status]}-500"></i>
                                        <span class="capitalize">${tx.type}</span>
                                    </div>
                                </td>
                                <td class="p-4">
                                    <div class="text-white">
                                        $${tx.amount.toLocaleString()}
                                    </div>
                                    ${tx.fee ? `
                                        <div class="text-sm text-gray-400">
                                            Fee: $${tx.fee.toLocaleString()}
                                        </div>
                                    ` : ''}
                                </td>
                                <td class="p-4">
                                    <span class="px-2 py-1 rounded-full text-sm
                                        bg-${statusColors[tx.status]}-500/10 
                                        text-${statusColors[tx.status]}-500">
                                        ${tx.status}
                                    </span>
                                </td>
                                <td class="p-4 text-gray-400">
                                    ${this.formatDate(tx.created_at)}
                                </td>
                                <td class="p-4">
                                    <div class="flex gap-2">
                                        <button onclick="window.viewTransaction('${tx.id}')"
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
                                    </div>
                                </td>
                            </tr>
                        `).join('') : `
                            <tr>
                                <td colspan="5" class="p-8 text-center text-gray-400">
                                    No transactions found
                                </td>
                            </tr>
                        `}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    }

    renderKycTab(userData) {
        const { kyc_documents = [], kyc_status, kyc_submitted_at, kyc_rejection_reason } = userData;
        const statusColors = {
            approved: 'green',
            pending: 'yellow',
            rejected: 'red',
            not_started: 'gray'
        };

        return /* html */`
        <div class="space-y-6">
            <!-- KYC Status Header -->
            <div class="bg-brand-black/30 rounded-xl p-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-lg font-semibold text-white">KYC Verification Status</h3>
                        <p class="text-gray-400 mt-1">
                            ${kyc_submitted_at ?
                `Submitted ${this.formatDate(kyc_submitted_at)}` :
                'Not submitted yet'}
                        </p>
                    </div>
                    <span class="px-3 py-1 rounded-full text-sm
                        bg-${statusColors[kyc_status]}-500/10 
                        text-${statusColors[kyc_status]}-500">
                        ${kyc_status?.replace('_', ' ').toUpperCase() || 'NOT STARTED'}
                    </span>
                </div>
                ${kyc_rejection_reason ? `
                    <div class="mt-4 p-4 bg-red-500/10 rounded-lg">
                        <span class="text-red-500">Rejection Reason:</span>
                        <p class="text-gray-400 mt-1">${kyc_rejection_reason}</p>
                    </div>
                ` : ''}
            </div>

            <!-- KYC Documents Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${kyc_documents.map(doc => this.renderKycDocument(doc)).join('')}
            </div>
        </div>
    `;
    }

    renderNotificationsTab(userData) {
        const notifications = userData.notifications || [];
        const typeIcons = {
            deposit: 'arrow-down',
            withdrawal: 'arrow-up',
            swap: 'exchange-alt',
            system: 'bell'
        };

        return /* html */`
        <div class="space-y-6">
            <!-- Notifications Header -->
            <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-white">Notifications</h3>
                <button onclick="window.sendCustomNotification('${userData.id}')"
                        class="px-4 py-2 rounded-xl bg-brand-primary text-white
                               hover:bg-brand-primary/90 transition-colors">
                    <i class="fas fa-plus mr-2"></i>
                    Send Notification
                </button>
            </div>

            <!-- Notifications List -->
            <div class="space-y-4">
                ${notifications.length ? notifications.map(notif => /* html */`
                    <div class="bg-brand-black/30 rounded-xl p-4 
                               ${!notif.is_read ? 'border-l-4 border-brand-primary' : ''}">
                        <div class="flex items-start justify-between">
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <i class="fas fa-${typeIcons[notif.type]} text-brand-primary"></i>
                                    <h4 class="font-medium text-white">${notif.title}</h4>
                                    <span class="px-2 py-0.5 rounded-full text-xs capitalize
                                               bg-brand-primary/10 text-brand-primary">
                                        ${notif.type}
                                    </span>
                                </div>
                                <p class="text-gray-400 mt-2">${notif.message}</p>
                                <div class="text-sm text-gray-500 mt-2">
                                    ${this.formatDate(notif.created_at)}
                                </div>
                            </div>
                            <div class="flex items-center gap-2 ml-4">
                                ${!notif.is_read ? `
                                    <button onclick="window.markNotificationRead('${notif.id}')"
                                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary
                                                   hover:bg-brand-primary/20 transition-colors">
                                        <i class="fas fa-check"></i>
                                    </button>
                                ` : ''}
                                <button onclick="window.deleteNotification('${notif.id}')"
                                        class="p-2 rounded-lg bg-red-500/10 text-red-500
                                               hover:bg-red-500/20 transition-colors">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('') : `
                    <div class="text-center text-gray-400 py-8">
                        No notifications found
                    </div>
                `}
            </div>
        </div>
    `;
    }

    // ...existing code...

    initializeEventHandlers() {
        // Tab switching
        document.querySelectorAll('[data-tab]').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Transaction filters
        document.getElementById('txTypeFilter')?.addEventListener('change', this.filterTransactions);
        document.getElementById('txStatusFilter')?.addEventListener('change', this.filterTransactions);

        // Global window handlers
        window.handleTransaction = this.handleTransaction.bind(this);
        window.editAssetBalance = this.showEditAssetModal.bind(this);
        window.sendCustomNotification = this.showNotificationModal.bind(this);
        window.markNotificationRead = this.markNotificationRead.bind(this);
        window.deleteNotification = this.deleteNotification.bind(this);
        window.viewTransaction = this.showTransactionDetails.bind(this);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    async refreshData() {
        this.spinner.show('Refreshing data...');
        try {
            const { data, error } = await this.supabase
                .from('profiles')
                .select(this.getFullUserQuery())
                .eq('id', this.userId)
                .single();

            if (error) throw error;
            this.userData = data;
            this.render(data);
        } catch (error) {
            console.error('Failed to refresh data:', error);
            toastify({
                text: 'Failed to refresh data',
                background: 'bg-red-500'
            });
        } finally {
            this.spinner.hide();
        }
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

    destroy() {
        // Cleanup event listeners
        window.handleTransaction = null;
        window.editAssetBalance = null;
        window.sendCustomNotification = null;
        window.markNotificationRead = null;
        window.deleteNotification = null;
        window.viewTransaction = null;
    }
}

class UserManager {
    async deleteProfile(userId) {
        this.spinner.show('Deleting profile...');
        try {
            const { error } = await this.supabase
                .from('profiles')
                .delete()
                .eq('id', userId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Profile deletion failed:', error);
            throw error;
        } finally {
            this.spinner.hide();
        }
    }
}


export { KycManager, EmailNotifier, AssetManager, BalanceManager, TransactionManager, UserAssetModal, UserDetailsView, UserManager }