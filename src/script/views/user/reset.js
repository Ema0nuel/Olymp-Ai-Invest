import LOGO from '../../../images/logo.jpg'
import reset, { cleanupAll } from '../../utils/reset'
import { handleTestimony, initTestimonials } from '../../components/Bannar'
import { resetHandler } from './functions/resetHandler'
import { checkPasswordStrength } from '../../utils/passwordStrength'
import { trackPageVisit } from '../../utils/analtics'

const resetPassword = async () => {
    reset('Reset Password | Olymp AI Invest')
    cleanupAll()
    await trackPageVisit()

    function pageEvents() {
        // Initialize testimonials
        setTimeout(() => initTestimonials(), 100)

        const form = document.getElementById('resetForm')
        const passwordInput = document.getElementById('password')
        const confirmInput = document.getElementById('confirmPassword')
        const strengthBar = document.getElementById('strengthBar')
        const strengthText = document.getElementById('strengthText')
        const indicators = document.getElementById('strengthIndicators')
        const submitButton = form?.querySelector('button[type="submit"]')

        // Password visibility toggles
        document.querySelectorAll('.password-group').forEach(group => {
            const input = group.querySelector('input')
            const toggle = group.querySelector('.password-toggle')

            if (toggle) {
                toggle.addEventListener('click', () => {
                    const type = input.type === 'password' ? 'text' : 'password'
                    input.type = type
                    toggle.innerHTML = type === 'password' ?
                        '<i class="fas fa-eye"></i>' :
                        '<i class="fas fa-eye-slash"></i>'
                })
            }
        })

        // Password strength checker
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                const result = checkPasswordStrength(e.target.value)

                strengthBar.style.width = `${result.strength}%`
                strengthBar.className = `h-full rounded-full transition-all ${result.color}`
                strengthText.textContent = `Password Strength: ${result.strength}%`

                indicators.innerHTML = result.indicators
                    .map(i => `<span class="px-2 py-1 rounded-full bg-brand-primary/20 text-xs">${i}</span>`)
                    .join('')

                // Enable/disable submit based on strength
                submitButton.disabled = result.strength < 50

                // Check confirm password match
                if (confirmInput.value) {
                    const match = e.target.value === confirmInput.value
                    confirmInput.style.borderColor = match ? '' : 'rgb(239, 68, 68)'
                }
            })
        }

        // Confirm password validation
        if (confirmInput) {
            confirmInput.addEventListener('input', (e) => {
                const match = e.target.value === passwordInput.value
                e.target.style.borderColor = match ? '' : 'rgb(239, 68, 68)'
                submitButton.disabled = !match || checkPasswordStrength(passwordInput.value).strength < 50
            })
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const password = passwordInput.value
                const confirmPassword = confirmInput.value

                if (password !== confirmPassword) {
                    toastify({
                        text: "Passwords do not match",
                        icon: "fas fa-exclamation-circle",
                        background: "bg-red-500/10"
                    })
                    return
                }

                // Disable submit button
                if (submitButton) {
                    submitButton.disabled = true
                    submitButton.innerHTML = `
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Resetting Password...</span>
                    `
                }

                await resetHandler({ password })

                // Re-enable submit button on failure
                if (submitButton) {
                    submitButton.disabled = false
                    submitButton.innerHTML = `
                        Reset Password
                        <i class="fas fa-key text-sm"></i>
                    `
                }
            })
        }
    }

    return ({
        html: /* html */`
        <div class="min-h-screen flex flex-col lg:flex-row animate-fade-in-up">
            <!-- Form Section -->
            <main class="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                <div class="absolute inset-0 bg-brand-blue/10"></div>
                
                <!-- Logo -->
                <div class="absolute top-8 left-8">
                    <a href="/" data-nav class="flex items-center gap-2">
                        <img src="${LOGO}" alt="Olymp AI Invest" class="h-8">
                        <span class="text-lg font-bold text-brand-primary">Olymp AI</span>
                    </a>
                </div>

                <!-- Form Container -->
                <div class="w-full max-w-md z-10 relative">
                    <div class="p-8">
                        <div class="text-center lg:text-left mb-8">
                            <h1 class="text-2xl lg:text-3xl font-bold text-white mb-2">
                                Reset Your Password
                            </h1>
                            <p class="text-gray-400">
                                Create a new strong password for your account
                            </p>
                        </div>

                        <form id="resetForm" class="space-y-6">
                            <!-- Password Input -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300" for="password">
                                    New Password
                                </label>
                                <div class="relative password-group">
                                    <input 
                                        type="password" 
                                        id="password" 
                                        required
                                        class="w-full px-4 py-3 pr-12 rounded-xl bg-brand-black/80 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all" 
                                        placeholder="Create a strong password">
                                    <button type="button" 
                                            class="password-toggle absolute right-4 top-1/2 -translate-y-1/2 
                                                   text-gray-400 hover:text-white transition-colors">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>

                                <!-- Password Strength Indicator -->
                                <div class="mt-3 space-y-2">
                                    <div class="h-1.5 bg-brand-black/80 rounded-full overflow-hidden">
                                        <div id="strengthBar" class="h-full w-0 transition-all duration-300"></div>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <span id="strengthText" class="text-xs text-gray-400">
                                            Password Strength: 0%
                                        </span>
                                        <div id="strengthIndicators" class="flex gap-2"></div>
                                    </div>
                                </div>
                            </div>

                            <!-- Confirm Password -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300" for="confirmPassword">
                                    Confirm Password
                                </label>
                                <div class="relative password-group">
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        required
                                        class="w-full px-4 py-3 pr-12 rounded-xl bg-brand-black/80 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all" 
                                        placeholder="Confirm your password">
                                    <button type="button" 
                                            class="password-toggle absolute right-4 top-1/2 -translate-y-1/2 
                                                   text-gray-400 hover:text-white transition-colors">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" 
                                    disabled
                                    class="w-full py-3 rounded-xl bg-brand-primary text-brand-blue 
                                           font-bold text-lg hover:bg-opacity-90 transition-all 
                                           flex items-center justify-center gap-2
                                           disabled:opacity-50 disabled:cursor-not-allowed">
                                Reset Password
                                <i class="fas fa-key text-sm"></i>
                            </button>
                        </form>

                        <!-- Back to Login Link -->
                        <p class="mt-6 text-center text-gray-400">
                            Remember your password? 
                            <a href="/login" data-nav 
                               class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                Back to Login
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <!-- Testimonials Section -->
            <aside class="hidden lg:flex flex-1 relative bg-brand-dark overflow-hidden">
                ${handleTestimony()}
            </aside>
        </div>
        `,
        pageEvents
    })
}

export default resetPassword