import auth from '../../utils/auth'
import reset from '../../utils/reset'
import Navbar from './components/Navbar'
import supabase from '../../utils/supabaseClients'
import { updateProfile, updateAvatar, updatePin } from './functions/editHandler'
import spinner from '../../utils/spinner'
import Modal from '../../components/Modal'
import USER from '../../../images/user.png'
import { loadPage } from '../../routes/router'
import { trackPageVisit } from '../../utils/analtics'


const settings = async () => {
    const authCheck = await auth.check('settings')
    if (!authCheck) return { html: '', pageEvents: () => { } }

    reset('Olymp AI | Settings')
    await trackPageVisit()
    const { html: navbar, pageEvents: navEvents } = Navbar()

    // State
    let userProfile = null
    let accountBalance = 0

    // Add this function before pageEvents
    async function handleKycNavigation() {
        await loadPage('kyc')
    }

    // Fetch user profile and balance
    async function fetchUserData() {
        try {
            spinner.start()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) throw new Error('Not authenticated')

            const [profileResult, balanceResult] = await Promise.all([
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single(),
                supabase
                    .from('trading_accounts')
                    .select('balance')
                    .eq('user_id', user.id)
                    .eq('account_type', 'live')
                    .single()
            ])

            if (profileResult.error) throw profileResult.error
            if (balanceResult.error) throw balanceResult.error

            userProfile = profileResult.data
            accountBalance = balanceResult.data.balance

            // Update UI
            updateProfileUI()
        } catch (error) {
            console.error('Fetch error:', error)
        } finally {
            spinner.stop()
        }
    }

    // Handle avatar change
    async function handleAvatarChange(e) {
        const file = e.target.files[0]
        if (!file) return

        const newAvatarUrl = await updateAvatar(file)
        if (newAvatarUrl) {
            document.getElementById('avatarImage').src = newAvatarUrl
        }
    }

    // Handle profile form submission
    async function handleProfileUpdate(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const updates = Object.fromEntries(formData)

        const success = await updateProfile(updates)
        if (success) {
            await fetchUserData()
        }
    }

    // Handle PIN change
    async function handlePinChange() {
        const modal = new Modal({
            title: 'Change Transaction PIN',
            content: `
                <div class="space-y-4">
                    <input type="password" 
                           id="currentPin"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                           placeholder="Current PIN"
                           maxlength="6"
                           pattern="[0-9]*">
                    <input type="password" 
                           id="newPin"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                           placeholder="New PIN"
                           maxlength="6"
                           pattern="[0-9]*">
                    <input type="password" 
                           id="confirmPin"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                           placeholder="Confirm New PIN"
                           maxlength="6"
                           pattern="[0-9]*">
                </div>
            `,
            actions: [{
                text: 'Update PIN',
                primary: true,
                onClick: async (close) => {
                    const currentPin = document.getElementById('currentPin').value
                    const newPin = document.getElementById('newPin').value
                    const confirmPin = document.getElementById('confirmPin').value

                    if (newPin !== confirmPin) {
                        toastify({
                            text: 'PINs do not match',
                            background: 'bg-red-500'
                        })
                        return
                    }

                    const success = await updatePin(currentPin, newPin)
                    if (success) close()
                }
            }]
        })
        modal.show()
    }

    // Update profile UI
    function updateProfileUI() {
        if (!userProfile) return

        const kycStatus = document.getElementById('kycStatus')
        if (kycStatus) {
            kycStatus.className = `px-2 py-1 rounded text-xs ${userProfile.kyc_status === 'approved' ? 'bg-green-500/20 text-green-500' :
                userProfile.kyc_status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    userProfile.kyc_status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                        'bg-gray-500/20 text-gray-500'
                }`
            kycStatus.textContent = userProfile.kyc_status?.toUpperCase() || 'NOT STARTED'
        }

        // Update form fields
        const form = document.getElementById('profileForm')
        if (form) {
            Object.keys(userProfile).forEach(key => {
                const input = form.elements[key]
                if (input) input.value = userProfile[key]
            })
        }
    }

    // Global handlers
    window.handleAvatarChange = handleAvatarChange
    window.handleProfileUpdate = handleProfileUpdate
    window.handlePinChange = handlePinChange
    window.handleKycNavigation = handleKycNavigation  // Add this line

    // Initialize
    await fetchUserData()

    function pageEvents() {
        navEvents()
    }

    return {
        html: /* html */`
            ${navbar}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
                    <!-- Profile Card -->
                    <div class="bg-gradient-to-br from-brand-black/80 to-brand-black/40 backdrop-blur-xl rounded-3xl p-6 border border-brand-primary/10">
                        <div class="flex flex-col md:flex-row items-center gap-6">
                            <!-- Avatar Section -->
                            <div class="relative group">
                                <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-primary">
                                    <img id="avatarImage"
                                         src="${userProfile?.avatar_url || USER}"
                                         alt="Profile"
                                         class="w-full h-full object-cover">
                                </div>
                                <label class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
                                    <i class="fas fa-camera text-white"></i>
                                    <input type="file"
                                           accept="image/*"
                                           class="hidden"
                                           onchange="window.handleAvatarChange(event)">
                                </label>
                            </div>

                            <!-- User Info -->
                            <div class="flex-1 text-center md:text-left">
                                <h2 class="text-2xl font-bold text-white">${userProfile?.full_name || 'User'}</h2>
                                <p class="text-gray-400">${userProfile?.email}</p>
                                <div class="mt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span class="px-3 py-1 bg-brand-primary/10 rounded-full text-brand-primary text-sm">
                                        <i class="fas fa-wallet mr-1"></i>$${accountBalance.toFixed(2)}
                                    </span>
                                    <span id="kycStatus" class="px-3 py-1 rounded-full text-sm">
                                        ${userProfile?.kyc_status || 'NOT STARTED'}
                                    </span>
                                </div>
                            </div>

                            <!-- Quick Actions -->
                            <div class="flex gap-2">
                                <button onclick="window.handlePinChange()"
                                        class="p-3 bg-brand-primary/10 rounded-xl hover:bg-brand-primary/20 transition-colors">
                                    <i class="fas fa-key text-brand-primary"></i>
                                </button>
                                <!-- First KYC button in Quick Actions -->
                                ${userProfile?.kyc_status !== 'approved' ? `
                                    <button onclick="window.handleKycNavigation()"
                                            class="p-3 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors">
                                        <i class="fas fa-shield-check text-green-500"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    </div>

                    <!-- Edit Profile Form -->
                    <form id="profileForm" class="space-y-6" onsubmit="window.handleProfileUpdate(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-400">Full Name</label>
                                <input type="text"
                                       name="full_name"
                                       required
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-400">Phone Number</label>
                                <input type="tel"
                                       name="phone_number"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-400">Country</label>
                                <input type="text"
                                       name="country"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <button type="submit"
                                class="w-full md:w-auto px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-colors">
                            Save Changes
                        </button>
                    </form>

                    <!-- Security Section -->
                    <div class="space-y-4 pb-14 lg:pb-0">
                        <h3 class="text-lg font-medium text-white">Security</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button onclick="window.handlePinChange()"
                                    class="p-4 bg-brand-black/50 border border-brand-primary/10 rounded-xl hover:bg-brand-primary/5 transition-colors flex items-center justify-between">
                                <span class="flex items-center gap-3">
                                    <i class="fas fa-key text-brand-primary"></i>
                                    <span class="text-white">Change Transaction PIN</span>
                                </span>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                            <!-- Second KYC button in Security Section -->
                            <button onclick="window.handleKycNavigation()"
                                    class="p-4 bg-brand-black/50 border border-brand-primary/10 rounded-xl hover:bg-brand-primary/5 transition-colors flex items-center justify-between">
                                <span class="flex items-center gap-3">
                                    <i class="fas fa-shield-alt text-brand-primary"></i>
                                    <span class="text-white">Identity Verification</span>
                                </span>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        `,
        pageEvents
    }
}

export default settings