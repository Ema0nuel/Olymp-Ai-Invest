import { updateOnboardingStep } from '../utils/onboardingHandler'
import toastify from './toastify'
import spinner from '../utils/spinner'
import WelcomeI from '../../images/welcome/welcome.png'
import supabase from '../utils/supabaseClients'

export default class Onboarding {
    constructor(userId, currentStep = 0) {
        this.userId = userId
        this.currentStep = currentStep
        this.steps = [
            {
                title: 'Welcome to Olymp AI Invest',
                icon: 'rocket',
                content: this.welcomeStep()
            },
            {
                title: 'Basic Information',
                icon: 'user',
                content: this.basicInfoStep()
            },
            {
                title: 'Trading Experience',
                icon: 'chart-line',
                content: this.experienceStep()
            },
            {
                title: 'Security Setup',
                icon: 'shield-alt',
                content: this.securityStep()
            }
        ]

        // Attach instance to window
        window.onboarding = this;
    }

    welcomeStep() {
        return /* html */`
            <div class="text-center space-y-8 animate-fade-in-up">
                <div class="relative">
                    <img src="${WelcomeI}" alt="Welcome" 
                         class="w-64 lg:w-72 mx-auto transform hover:scale-105 transition-transform">
                </div>
                <div class="space-y-4">
                    <h2 class="text-3xl lg:text-4xl font-bold text-white">
                        Welcome to Olymp AI Invest!
                    </h2>
                    <p class="text-gray-400 max-w-md mx-auto text-lg">
                        Let's get your account set up so you can start trading right away.
                        This will only take a few minutes.
                    </p>
                </div>
                <button onclick="onboarding.nextStep()"
                        class="group px-8 py-4 bg-brand-primary text-white rounded-xl
                               hover:bg-opacity-90 transition-all text-lg font-medium
                               flex items-center gap-3 mx-auto">
                    Let's Get Started
                    <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </button>
            </div>
        `
    }

    basicInfoStep() {
        return /* html */`
            <div class="max-w-md mx-auto space-y-6 animate-fade-in-up">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 bg-brand-primary/20 rounded-xl 
                               flex items-center justify-center shrink-0">
                        <i class="fas fa-user text-brand-primary text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl lg:text-2xl font-bold text-white">Tell us about yourself</h3>
                        <p class="text-gray-400">Help us personalize your experience</p>
                    </div>
                </div>

                <form id="basicInfoForm" class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <i class="fas fa-calendar-alt text-brand-primary"></i>
                            Date of Birth
                        </label>
                        <input type="date" required
                               class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white
                                      border border-brand-primary/30 focus:border-brand-primary
                                      outline-none transition-all">
                    </div>
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <i class="fas fa-map-marker-alt text-brand-primary"></i>
                            Address
                        </label>
                        <textarea required rows="3"
                                class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white
                                       border border-brand-primary/30 focus:border-brand-primary
                                       outline-none transition-all resize-none"></textarea>
                    </div>
                    <button type="submit"
                            class="group w-full py-4 bg-brand-primary text-white rounded-xl
                                   hover:bg-opacity-90 transition-all flex items-center 
                                   justify-center gap-2 text-lg font-medium">
                        Continue
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </form>
            </div>
        `
    }

    experienceStep() {
        return /* html */`
            <div class="max-w-md mx-auto space-y-6 animate-fade-in-up">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 bg-brand-primary/20 rounded-xl 
                               flex items-center justify-center shrink-0">
                        <i class="fas fa-chart-line text-brand-primary text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl lg:text-2xl font-bold text-white">Trading Experience</h3>
                        <p class="text-gray-400">Tell us about your trading background</p>
                    </div>
                </div>

                <form id="experienceForm" class="space-y-6">
                    <div class="space-y-4">
                        <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <i class="fas fa-star text-brand-primary"></i>
                            How would you rate your trading experience?
                        </label>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <label class="relative cursor-pointer">
                                <input type="radio" name="experience" value="beginner" 
                                       class="peer sr-only" required>
                                <div class="p-4 rounded-xl border border-brand-primary/30 
                                           peer-checked:border-brand-primary peer-checked:bg-brand-primary/20
                                           hover:bg-brand-primary/10 transition-all">
                                    <i class="fas fa-seedling text-2xl mb-2 text-brand-primary"></i>
                                    <h4 class="font-medium text-white">Beginner</h4>
                                    <p class="text-sm text-gray-400">New to trading</p>
                                </div>
                            </label>
                            <label class="relative cursor-pointer">
                                <input type="radio" name="experience" value="intermediate" 
                                       class="peer sr-only">
                                <div class="p-4 rounded-xl border border-brand-primary/30 
                                           peer-checked:border-brand-primary peer-checked:bg-brand-primary/20
                                           hover:bg-brand-primary/10 transition-all">
                                    <i class="fas fa-chart-bar text-2xl mb-2 text-brand-primary"></i>
                                    <h4 class="font-medium text-white">Intermediate</h4>
                                    <p class="text-sm text-gray-400">Some experience</p>
                                </div>
                            </label>
                            <label class="relative cursor-pointer">
                                <input type="radio" name="experience" value="advanced" 
                                       class="peer sr-only">
                                <div class="p-4 rounded-xl border border-brand-primary/30 
                                           peer-checked:border-brand-primary peer-checked:bg-brand-primary/20
                                           hover:bg-brand-primary/10 transition-all">
                                    <i class="fas fa-crown text-2xl mb-2 text-brand-primary"></i>
                                    <h4 class="font-medium text-white">Advanced</h4>
                                    <p class="text-sm text-gray-400">Expert trader</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                            <i class="fas fa-briefcase text-brand-primary"></i>
                            What assets are you interested in trading?
                        </label>
                        <div class="space-y-3">
                            <label class="flex items-center gap-3 p-3 rounded-xl
                                        border border-brand-primary/30 cursor-pointer
                                        hover:bg-brand-primary/10 transition-all">
                                <input type="checkbox" name="assets" value="crypto"
                                       class="form-checkbox text-brand-primary rounded">
                                <div>
                                    <span class="text-white font-medium">Cryptocurrencies</span>
                                    <p class="text-sm text-gray-400">Bitcoin, Ethereum, etc.</p>
                                </div>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-xl
                                        border border-brand-primary/30 cursor-pointer
                                        hover:bg-brand-primary/10 transition-all">
                                <input type="checkbox" name="assets" value="stocks"
                                       class="form-checkbox text-brand-primary rounded">
                                <div>
                                    <span class="text-white font-medium">Stocks</span>
                                    <p class="text-sm text-gray-400">Company shares</p>
                                </div>
                            </label>
                            <label class="flex items-center gap-3 p-3 rounded-xl
                                        border border-brand-primary/30 cursor-pointer
                                        hover:bg-brand-primary/10 transition-all">
                                <input type="checkbox" name="assets" value="forex"
                                       class="form-checkbox text-brand-primary rounded">
                                <div>
                                    <span class="text-white font-medium">Forex</span>
                                    <p class="text-sm text-gray-400">Currency pairs</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <button type="submit"
                            class="group w-full py-4 bg-brand-primary text-white rounded-xl
                                   hover:bg-opacity-90 transition-all flex items-center 
                                   justify-center gap-2 text-lg font-medium">
                        Continue
                        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </button>
                </form>
            </div>
        `
    }

    securityStep() {
        return /* html */`
            <div class="max-w-md mx-auto space-y-6 animate-fade-in-up">
                <div class="flex items-center gap-4 mb-6">
                    <div class="w-12 h-12 bg-brand-primary/20 rounded-xl 
                               flex items-center justify-center shrink-0">
                        <i class="fas fa-shield-alt text-brand-primary text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-xl lg:text-2xl font-bold text-white">Setup Account Security</h3>
                        <p class="text-gray-400">Create a secure PIN for transactions</p>
                    </div>
                </div>

                <form id="securityForm" class="space-y-6">
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <i class="fas fa-key text-brand-primary"></i>
                                Create PIN (6 digits)
                            </label>
                            <div class="relative">
                                <input type="password" required maxlength="6" pattern="[0-9]{6}"
                                       placeholder="Enter 6-digit PIN"
                                       class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white
                                              border border-brand-primary/30 focus:border-brand-primary
                                              outline-none transition-all text-center tracking-widest">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <i class="fas fa-check-circle text-brand-primary"></i>
                                Confirm PIN
                            </label>
                            <div class="relative">
                                <input type="password" required maxlength="6" pattern="[0-9]{6}"
                                       placeholder="Confirm 6-digit PIN"
                                       class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white
                                              border border-brand-primary/30 focus:border-brand-primary
                                              outline-none transition-all text-center tracking-widest">
                            </div>
                        </div>
                    </div>

                    <button type="submit"
                            class="group w-full py-4 bg-brand-primary text-white rounded-xl
                                   hover:bg-opacity-90 transition-all flex items-center 
                                   justify-center gap-2 text-lg font-medium">
                        Complete Setup
                        <i class="fas fa-check group-hover:scale-110 transition-transform"></i>
                    </button>
                </form>
            </div>
        `
    }

    async nextStep() {
        try {
            spinner.start()
            await updateOnboardingStep(this.userId, this.currentStep + 1)
            this.currentStep++
            this.render()
        } catch (error) {
            toastify({
                text: "Failed to update progress",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-500/10"
            })
        } finally {
            spinner.stop()
        }
    }

    render() {
        const container = document.getElementById('onboardingContainer')
        if (!container) return

        // Ensure instance is attached when rendering
        window.onboarding = this;

        const step = this.steps[this.currentStep]
        container.innerHTML = /* html */`
            <div class="min-h-screen flex items-center justify-center p-4 lg:p-6 animate-fade-in-up">
                <div class="w-full max-w-lg">
                    <!-- Step content -->
                    <div class="bg-brand-dark/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 
                                border border-brand-primary/20 transition-all duration-500
                                hover:border-brand-primary/40 shadow-lg">
                        ${step.content}
                    </div>
                    <!-- Progress bar -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-sm text-gray-400">
                                Step ${this.currentStep + 1} of ${this.steps.length}
                            </span>
                        </div>
                        <div class="h-2 bg-brand-black/50 rounded-full overflow-hidden">
                            <div class="h-full bg-brand-primary transition-all duration-500"
                                 style="width: ${(this.currentStep + 1) / this.steps.length * 100}%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `

        this.setupEventListeners()
    }


    setupEventListeners() {
        // Add form submission handlers based on current step
        const forms = {
            basicInfoForm: this.handleBasicInfo.bind(this),
            experienceForm: this.handleExperience.bind(this),
            securityForm: this.handleSecurity.bind(this)
        }

        Object.entries(forms).forEach(([formId, handler]) => {
            const form = document.getElementById(formId)
            if (form) {
                form.onsubmit = async (e) => {
                    e.preventDefault()
                    await handler(e)
                }
            }
        })
    }

    // Form handlers
    async handleBasicInfo(e) {
        // Handle basic info submission
        await this.nextStep()
    }

    async handleExperience(e) {
        // Handle experience submission
        await this.nextStep()
    }

    async handleSecurity(e) {
        // Handle security setup and complete onboarding
        try {
            spinner.start()
            const pin1 = e.target.querySelector('input[type="password"]').value
            const pin2 = e.target.querySelectorAll('input[type="password"]')[1].value

            if (pin1 !== pin2) {
                toastify({
                    text: "PINs do not match",
                    icon: "fas fa-exclamation-circle",
                    background: "bg-red-500/10"
                })
                return
            }

            // Update profile
            const { error } = await supabase
                .from('profiles')
                .update({
                    is_created: true,
                    pin: pin1,
                    onboarding_step: this.steps.length
                })
                .eq('id', this.userId)

            if (error) throw error

            toastify({
                text: "Account setup complete!",
                icon: "fas fa-check-circle",
                background: "bg-green-500/10"
            })

            // Redirect to dashboard
            setTimeout(() => window.location.reload(), 1500)

        } catch (error) {
            toastify({
                text: "Failed to complete setup",
                icon: "fas fa-exclamation-circle",
                background: "bg-red-500/10"
            })
        } finally {
            spinner.stop()
        }
    }
}