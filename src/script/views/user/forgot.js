import LOGO from '../../../images/logo.jpg'
import reset, { cleanupAll } from '../../utils/reset'
import { handleTestimony, initTestimonials } from '../../components/Bannar'
import { forgotHandler } from './functions/forgotHandler'
import { trackPageVisit } from '../../utils/analtics'


const forgot = async () => {
    reset('Forgot Password | Olymp AI Invest')
    cleanupAll()
    await trackPageVisit()

    function pageEvents() {
        // Initialize testimonials
        setTimeout(() => initTestimonials(), 100)

        const form = document.getElementById('forgotForm')
        const emailInput = document.getElementById('email')
        const submitButton = form?.querySelector('button[type="submit"]')

        // Email validation
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                emailInput.style.borderColor = isValid ? '' : 'rgb(239, 68, 68)'
                submitButton.disabled = !isValid
            })
        }

        // Form submission
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault()

                const email = emailInput.value.trim()
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    return
                }

                // Disable submit button
                if (submitButton) {
                    submitButton.disabled = true
                    submitButton.innerHTML = `
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Sending Instructions...</span>
                    `
                }

                await forgotHandler(email)

                // Re-enable submit button on failure
                if (submitButton) {
                    submitButton.disabled = false
                    submitButton.innerHTML = `
                        Send Instructions
                        <i class="fas fa-paper-plane text-sm"></i>
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
                                Reset Password
                            </h1>
                            <p class="text-gray-400">
                                Enter your email address and we'll send you instructions to reset your password
                            </p>
                        </div>

                        <form id="forgotForm" class="space-y-6">
                            <!-- Email Input -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300" for="email">
                                    Email Address
                                </label>
                                <input type="email" 
                                       id="email" 
                                       required
                                       class="w-full px-4 py-3 rounded-xl bg-brand-black/80 text-white 
                                              border border-brand-primary/30 focus:border-brand-primary 
                                              outline-none transition-all" 
                                       placeholder="you@example.com">
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" 
                                    disabled
                                    class="w-full py-3 rounded-xl bg-brand-primary text-brand-blue 
                                           font-bold text-lg hover:bg-opacity-90 transition-all 
                                           flex items-center justify-center gap-2
                                           disabled:opacity-50 disabled:cursor-not-allowed">
                                Send reset email
                                <i class="fas fa-paper-plane text-sm"></i>
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

export default forgot