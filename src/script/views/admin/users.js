import reset, { cleanupAll } from '../../utils/reset';
import AdminNavbar from './components/Navbar';
import StyleAdminPage from './components/style';
import { checkAdminAuth, logoutAdmin } from './functions/adminLoginHandler';
import { loadPage } from '../../routes/router';
import { formatDistance } from 'date-fns';
import Modal from '../../components/Modal';
import { Spinner } from './components/spinner';
import { handleError } from '../../utils/errorHandler';
import supabase from '../../utils/supabaseClients';
import { UserDetailsView } from './components/UserDetails';
import AVATAR from '../../../images/user.png'
import { sendEmail } from '../../utils/send-email';
import countries from '../../data/countries.json';
import { createTradingAccounts, generateWelcomeEmailTemplate } from '../user/functions/signupHandler';
import toastify from '../../components/toastify';
import { createClient } from '@supabase/supabase-js';
// Create a Supabase client with service role key
const adminSupabase = createClient(
    'https://ezdabfeiajfpzyoqiqcc.supabase.co',
    import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

const users = async () => {

    reset('Olymp AI User Panel Management');
    cleanupAll();

    let currentView = 'list';
    let selectedUserId = null;
    let usersData = [];
    const spinner = new Spinner();
    let userDetailsView = null;

    async function loadUsers() {
        spinner.show('Loading users...');
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select(`
                    *,
                    trading_accounts (
                        id, account_type, balance, leverage, asset_type
                    ),
                    user_assets (
                        id, balance,
                        assets (id, symbol, name, logo_url)
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            usersData = data;
            renderContent();
        } catch (error) {
            handleError(error, 'Failed to load users');
        } finally {
            spinner.hide();
        }
    }

    function renderUserAvatar(user) {
        return /* html */`
            <div class="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                ${user.avatar_url
                ? `<img src="${user.avatar_url || AVATAR}" 
                           alt="${user.full_name}" 
                           class="w-full h-full object-cover">`
                : `<span class="text-xl text-brand-primary">
                           ${user.full_name.charAt(0).toUpperCase()}
                       </span>`
            }
            </div>
        `;
    }

    function renderContent() {
        const contentDiv = document.getElementById('mainContent');
        if (!contentDiv) return;

        try {
            switch (currentView) {
                case 'list':
                    contentDiv.innerHTML = renderUsersList();
                    break;
                case 'details':
                    contentDiv.innerHTML = `<div id="userDetailsContent"></div>`;
                    if (selectedUserId) {
                        userDetailsView = new UserDetailsView(selectedUserId);
                        userDetailsView.initialize().catch(error => {
                            handleError(error, 'Failed to initialize user details');
                        });
                    }
                    break;
            }
        } catch (error) {
            handleError(error, 'Failed to render content');
        }
    }

    function renderUsersList() {
        return /* html */`
            <div class="space-y-6">
                <!-- Header with Add User Button -->
                <div class="flex justify-between items-center">
                    <h1 class="text-2xl font-bold text-white">Users</h1>
                    <div class="flex flex-row gap-2">
                        <button onclick="window.handleAddUser()"
                                class="px-4 py-2 rounded-xl bg-brand-primary text-white
                                    hover:bg-brand-primary/90 transition-colors">
                            <i class="fas fa-plus"></i>
                            <span class="ml-2">Add User</span>
                        </button>
                        <button onclick="window.handleDeleteUser()"
                                class="px-4 py-2 rounded-xl bg-red-500 text-white
                                    hover:bg-red-500/80 transition-colors">
                            <i class="fas fa-plus"></i>
                            <span class="ml-2">Delete User</span>
                        </button>
                    </div>
                </div>

                <!-- Users Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${usersData.map(user => /* html */`
                        <div class="bg-brand-black/50 rounded-xl p-6 hover:border-brand-primary/30 
                                  transition-colors cursor-pointer"
                             onclick="window.viewUserDetails('${user.id}')">
                            <!-- User card content -->
                            ${renderUserCard(user)}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    function renderUserCard(user) {
        const liveAccount = user.trading_accounts?.find(acc => acc.account_type === 'live');

        return /* html */`
            <div class="flex items-start justify-between">
                <!-- User basic info -->
                <div class="flex items-center gap-4">
                    ${renderUserAvatar(user)}
                    <div>
                        <h3 class="font-medium text-white">${user.full_name}</h3>
                        <p class="text-sm text-gray-400">${user.email}</p>
                    </div>
                </div>
                <!-- Verification status -->
                <span class="px-2 py-1 rounded-full text-sm
                    ${user.is_verified ?
                'bg-green-500/10 text-green-500' :
                'bg-yellow-500/10 text-yellow-500'}">
                    ${user.is_verified ? 'Verified' : 'Pending'}
                </span>
            </div>
            <!-- User balance info -->
            <div class="mt-4 pt-4 border-t border-brand-primary/10">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <span class="text-sm text-gray-400">Live Balance</span>
                        <p class="text-white mt-1">
                            $${liveAccount?.balance?.toLocaleString() || '0.00'}
                        </p>
                    </div>
                    <div>
                        <span class="text-sm text-gray-400">Joined</span>
                        <p class="text-white mt-1">
                            ${formatDistance(new Date(user.created_at), new Date(), {
                    addSuffix: true
                })}
                        </p>
                    </div>
                </div>
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

        loadUsers();

        // Update the view handler
        window.viewUserDetails = (userId) => {
            if (!userId) return;

            try {
                selectedUserId = userId;
                currentView = 'details';
                renderContent();
            } catch (error) {
                handleError(error, 'Failed to view user details');
            }
        };

        window.backToUsersList = () => {
            try {
                if (userDetailsView) {
                    // Properly cleanup all window handlers
                    [
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
                    ].forEach(handler => {
                        if (window[handler]) {
                            window[handler] = null;
                        }
                    });

                    userDetailsView.destroy();
                    userDetailsView = null;
                }
                currentView = 'list';
                renderContent();
            } catch (error) {
                handleError(error, 'Failed to return to users list');
            }
        };
        window.handleAddUser = () => {
            const modal = new Modal({
                title: 'Add New User',
                content: /* html */`
            <form id="addUserForm" class="space-y-6">
                <!-- Full Name Input -->
                <div class="form-group">
                    <label for="fullname" class="block text-sm font-medium text-gray-300 mb-2">
                        Full Name
                    </label>
                    <input type="text" id="fullname" name="fullname"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="Enter user's full name" required>
                </div>

                <!-- Email Input -->
                <div class="form-group">
                    <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                    </label>
                    <input type="email" id="email" name="email"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="user@example.com" required>
                </div>

                <!-- Phone Input -->
                <div class="form-group">
                    <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                    </label>
                    <input type="tel" id="phone" name="phone"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="+1234567890" required>
                </div>

                <!-- Country Selection -->
                <div class="form-group">
                    <label for="country" class="block text-sm font-medium text-gray-300 mb-2">
                        Country
                    </label>
                    <select id="country" name="country"
                            class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                   border border-brand-primary/30 focus:border-brand-primary 
                                   outline-none transition-all" required>
                        <option value="">Select Country</option>
                        ${countries.map(c => `<option value="${c.code}">${c.name}</option>`).join('')}
                    </select>
                </div>

                <!-- Password Input -->
                <div class="form-group">
                    <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                        Password
                    </label>
                    <input type="password" id="password" name="password"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="Create password" required>
                </div>
            </form>
        `,
                actions: [{
                    text: 'Add User',
                    primary: true,
                    onClick: async (close) => {
                        const form = document.getElementById('addUserForm');
                        const formData = {
                            fullname: form.fullname.value.trim(),
                            email: form.email.value.trim(),
                            phone: form.phone.value.trim(),
                            country: form.country.value,
                            password: form.password.value
                        };

                        // Basic validation
                        if (!formData.fullname || !formData.email || !formData.phone ||
                            !formData.country || !formData.password) {
                            toastify({
                                text: "Please fill in all fields",
                                icon: "fas fa-exclamation-circle",
                                background: "bg-red-500/10"
                            });
                            return;
                        }

                        try {
                            spinner.show('Creating user account...');

                            // Create user with Supabase auth
                            const { data: authUser, error: authError } = await supabase.auth.signUp({
                                email: formData.email,
                                password: formData.password,
                                options: {
                                    data: {
                                        full_name: formData.fullname
                                    }
                                }
                            });

                            if (authError) throw authError;

                            // Create profile
                            const { error: profileError } = await supabase
                                .from('profiles')
                                .insert({
                                    id: authUser.user.id,
                                    full_name: formData.fullname,
                                    email: formData.email,
                                    phone_number: formData.phone,
                                    country: formData.country,
                                    is_verified: true // Automatically verify the user
                                });

                            if (profileError) throw profileError;

                            // Create trading accounts
                            await createTradingAccounts(authUser.user.id);

                            // Send welcome email
                            await sendEmail({
                                to: formData.email,
                                subject: "Welcome to Olymp AI Invest",
                                html: generateWelcomeEmailTemplate(formData.email)
                            });

                            close();
                            toastify({
                                text: "User created successfully",
                                icon: "fas fa-check-circle",
                                background: "bg-green-500/10"
                            });

                            // Refresh users list
                            window.dispatchEvent(new Event('refreshUsers'));

                        } catch (error) {
                            console.error('Error creating user:', error);
                            toastify({
                                text: error.message || "Failed to create user",
                                icon: "fas fa-exclamation-circle",
                                background: "bg-red-500/10"
                            });
                        } finally {
                            spinner.hide();
                        }
                    }
                }]
            });

            modal.show();
        };

        // Update the handleDeleteUser function
        window.handleDeleteUser = () => {
            const modal = new Modal({
                title: 'Delete User',
                content: /* html */`
            <form id="deleteUserForm" class="space-y-6">
                <div class="form-group">
                    <label for="userEmail" class="block text-sm font-medium text-gray-300 mb-2">
                        User Email
                    </label>
                    <input type="email" id="userEmail" name="userEmail"
                           class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                  border border-brand-primary/30 focus:border-brand-primary 
                                  outline-none transition-all"
                           placeholder="Enter user's email" required>
                </div>
                <div class="mt-4 p-4 bg-red-500/10 rounded-lg">
                    <p class="text-red-500">Warning: This action cannot be undone!</p>
                    <p class="text-gray-400 mt-2">
                        This will permanently delete the user account and all associated data including:
                        <ul class="list-disc list-inside mt-2 space-y-1">
                            <li>Profile information</li>
                            <li>Trading accounts</li>
                            <li>Transaction history</li>
                            <li>Assets and balances</li>
                            <li>KYC documents</li>
                        </ul>
                    </p>
                </div>
            </form>
        `,
                actions: [{
                    text: 'Delete User',
                    primary: true,
                    class: 'bg-red-500 hover:bg-red-600',
                    onClick: async (close) => {
                        try {
                            const email = document.getElementById('userEmail').value.trim();

                            if (!email) {
                                toastify({
                                    text: "Please enter user's email",
                                    icon: "fas fa-exclamation-circle",
                                    background: "bg-red-500/10"
                                });
                                return;
                            }

                            spinner.show('Deleting user...');

                            // First, get the user's ID from their email
                            const { data: profile, error: profileError } = await supabase
                                .from('profiles')
                                .select('id')
                                .eq('email', email)
                                .single();

                            if (profileError || !profile) {
                                throw new Error('User not found');
                            }

                            // Delete the user's auth record using service role
                            const { error: authError } = await adminSupabase.auth.admin.deleteUser(
                                profile.id
                            );

                            if (authError) throw authError;

                            // Delete the user's profile and related data
                            const { error: deleteError } = await supabase
                                .from('profiles')
                                .delete()
                                .eq('id', profile.id);

                            if (deleteError) throw deleteError;

                            close();
                            toastify({
                                text: "User deleted successfully",
                                icon: "fas fa-check-circle",
                                background: "bg-green-500/10"
                            });

                            // Refresh users list
                            loadUsers();

                        } catch (error) {
                            console.error('Error deleting user:', error);
                            toastify({
                                text: error.message || "Failed to delete user",
                                icon: "fas fa-exclamation-circle",
                                background: "bg-red-500/10"
                            });
                        } finally {
                            spinner.hide();
                        }
                    }
                },
                {
                    text: 'Cancel',
                    onClick: (close) => close()
                }]
            });

            modal.show();
        };

        window.addEventListener('refreshUsers', loadUsers);
    }

    return {
        html: /* html */`
            <div class="flex min-h-screen bg-brand-dark mobile-container">
                ${AdminNavbar().html}
                <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                    <div id="mainContent" class="max-w-7xl mx-auto space-y-6">
                        <!-- Content will be rendered here -->
                    </div>
                </main>
            </div>
        `,
        pageEvents
    };
};

export default users;