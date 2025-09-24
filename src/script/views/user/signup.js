import LOGO from '../../../images/logo.jpg'
import reset, { cleanupAll } from '../../utils/reset'
import toastify from '../../components/toastify'
import { loadPage } from '../../routes/router'
import { handleTestimony, initTestimonials } from '../../components/Bannar'
import { checkPasswordStrength } from '../../utils/passwordStrength'
import countries from '../../data/countries.json'
import { signupHandler, signInWithGoogle } from './functions/signupHandler'
import { trackPageVisit } from '../../utils/analtics'


const signup = async () => {
    reset('Create Account | Olymp AI Invest')
    cleanupAll()
    await trackPageVisit()

    return ({
        html: /* html */`
        <div class="min-h-screen w-full flex">
            <!-- Form Section -->
            <main class="flex-1 min-h-screen bg-brand-blue/10 relative">
                <!-- Fixed Header -->
                <header class="fixed top-0 left-0 right-0 h-16 flex items-center px-8">
                    <a href="/" data-nav class="flex items-center gap-2">
                        <img src="${LOGO}" alt="Olymp AI Invest" class="h-8 w-auto">
                        <span class="text-lg font-bold text-brand-primary">Olymp AI</span>
                    </a>
                </header>

                <!-- Scrollable Content Area -->
                <div class="w-full pt-16 pb-8 overflow-y-auto h-screen">
                    <div class="max-w-md mx-auto px-6 py-8">
                        <!-- Form Header -->
                        <div class="mb-8">
                            <h1 class="text-2xl lg:text-3xl font-bold text-white">Create Account</h1>
                            <p class="text-gray-400 mt-2">Start your trading journey today</p>
                        </div>

                        <!-- Social Login Buttons -->
                        <div class="space-y-4 mb-6">
                            <button 
                                type="button"
                                id="googleLogin"
                                class="w-full py-3 px-4 rounded-xl bg-white text-gray-800 
                                    font-medium flex items-center justify-center gap-3 
                                    hover:bg-gray-100 transition-colors">
                                <svg class="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" 
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" 
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" 
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" 
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>
                        </div>

                        <!-- Or Divider -->
                        <div class="relative my-6">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-600"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-[#0d0f12] text-gray-400">or</span>
                            </div>
                        </div>

                        <!-- Signup Form -->
                        <form id="signupForm" class="space-y-6" autocomplete="off" novalidate>
                            <!-- Full Name Input -->
                            <div class="form-group">
                                <label for="fullname" class="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="fullname" 
                                        name="fullname"
                                        class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all"
                                        placeholder="Enter your full name"
                                        required
                                    >
                                </div>
                            </div>

                            <!-- Email Input -->
                            <div class="form-group">
                                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div class="relative">
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all"
                                        placeholder="you@example.com"
                                        required
                                    >
                                </div>
                            </div>

                            <!-- Phone Input -->
                            <div class="form-group">
                                <label for="phone" class="block text-sm font-medium text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                <div class="relative">
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone"
                                        class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all"
                                        placeholder="+1234567890"
                                        required
                                    >
                                </div>
                            </div>

                            <!-- Country Selection -->
                            <div class="form-group country-wrapper">
                                <label for="countrySearch" class="block text-sm font-medium text-gray-300 mb-2">
                                    Country
                                </label>
                                <div class="relative">
                                    <input 
                                        type="text" 
                                        id="countrySearch" 
                                        class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all"
                                        placeholder="Search your country"
                                        autocomplete="off"
                                    >
                                    <input type="hidden" id="country" name="country" required>
                                    
                                    <!-- Country Dropdown -->
                                    <div id="countryDropdown" 
                                         class="hidden absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto 
                                                rounded-xl bg-brand-black border border-brand-primary/30 
                                                shadow-lg z-50">
                                    </div>
                                </div>
                            </div>

                            <!-- Password Input -->
                            <div class="form-group">
                                <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div class="relative password-group">
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password"
                                        class="w-full h-12 px-4 pr-12 rounded-xl bg-brand-black/50 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all"
                                        placeholder="Create a strong password"
                                        required
                                    >
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
                            <div class="form-group">
                                <label for="confirmPassword" class="block text-sm font-medium text-gray-300 mb-2">
                                    Confirm Password
                                </label>
                                <div class="relative password-group">
                                    <input 
                                        type="password" 
                                        id="confirmPassword" 
                                        name="confirmPassword"
                                        class="w-full h-12 px-4 pr-12 rounded-xl bg-brand-black/50 text-white 
                                               border border-brand-primary/30 focus:border-brand-primary 
                                               outline-none transition-all"
                                        placeholder="Confirm your password"
                                        required
                                    >
                                    <button type="button" 
                                            class="password-toggle absolute right-4 top-1/2 -translate-y-1/2 
                                                   text-gray-400 hover:text-white transition-colors">
                                        <i class="fas fa-eye"></i>
                                    </button>
                                </div>
                            </div>

                            <!-- Terms and Conditions -->
                            <div class="space-y-6">
                                <p class="text-sm text-gray-400 leading-relaxed">
                                    By continuing, you agree to Olymp AI Invest's 
                                    <a href="/terms" target="_blank" data-nav 
                                       class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        Terms of Service
                                    </a> 
                                    and 
                                    <a href="/privacy" target="_blank" data-nav
                                       class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        Privacy Policy
                                    </a>, 
                                    and to receive periodic emails with updates.
                                </p>

                                <!-- Submit Button -->
                                <button type="submit" 
                                        class="w-full h-12 rounded-xl bg-brand-primary text-brand-blue 
                                               font-semibold text-base hover:bg-opacity-90 transition-all 
                                               flex items-center justify-center gap-2">
                                    Create Account
                                    <i class="fas fa-arrow-right text-sm"></i>
                                </button>
                            </div>
                        </form>

                        <!-- Login Link -->
                        <p class="mt-8 text-center text-gray-400">
                            Already have an account? 
                            <a href="/login" data-nav 
                               class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                Sign In
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
        pageEvents() {
            // Initialize testimonials
            setTimeout(() => initTestimonials(), 100)

            // Google Sign In
            document.getElementById('googleLogin')?.addEventListener('click', async () => {
                await signInWithGoogle();
            });

            // Form elements
            const form = document.getElementById('signupForm')
            const inputs = {
                fullname: document.getElementById('fullname'),
                email: document.getElementById('email'),
                phone: document.getElementById('phone'),
                countrySearch: document.getElementById('countrySearch'),
                country: document.getElementById('country'),
                countryDropdown: document.getElementById('countryDropdown'),
                password: document.getElementById('password'),
                confirmPassword: document.getElementById('confirmPassword')
            }

            // Validate and format full name
            if (inputs.fullname) {
                inputs.fullname.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/[^A-Za-z\s]/g, '')
                    value = value.replace(/\s+/g, ' ')
                    e.target.value = value

                    const isValid = value.length >= 2
                    e.target.style.borderColor = isValid ? '' : 'rgb(239, 68, 68)'
                })
            }

            // Validate and format email
            if (inputs.email) {
                inputs.email.addEventListener('input', (e) => {
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)
                    e.target.style.borderColor = isValid ? '' : 'rgb(239, 68, 68)'
                })
            }

            // Validate and format phone
            if (inputs.phone) {
                inputs.phone.addEventListener('input', (e) => {
                    let value = e.target.value.replace(/[^\d+\s-]/g, '')
                    if (!value.startsWith('+')) {
                        value = '+' + value
                    }
                    e.target.value = value

                    const isValid = /^\+?[\d\s-]{8,}$/.test(value)
                    e.target.style.borderColor = isValid ? '' : 'rgb(239, 68, 68)'
                })
            }

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

            // Password strength
            const strengthBar = document.getElementById('strengthBar')
            const strengthText = document.getElementById('strengthText')
            const indicators = document.getElementById('strengthIndicators')

            if (inputs.password) {
                inputs.password.addEventListener('input', (e) => {
                    const result = checkPasswordStrength(e.target.value)

                    strengthBar.style.width = `${result.strength}%`
                    strengthBar.className = `h-full rounded-full transition-all ${result.color}`
                    strengthText.textContent = `Password Strength: ${result.strength}%`

                    indicators.innerHTML = result.indicators
                        .map(i => `<span class="px-2 py-1 rounded-full bg-brand-primary/20 text-xs">${i}</span>`)
                        .join('')

                    // Match check if confirm password has value
                    if (inputs.confirmPassword.value) {
                        const match = e.target.value === inputs.confirmPassword.value
                        inputs.confirmPassword.style.borderColor = match ? '' : 'rgb(239, 68, 68)'
                    }
                })
            }

            // Confirm password validation
            if (inputs.confirmPassword) {
                inputs.confirmPassword.addEventListener('input', (e) => {
                    const match = e.target.value === inputs.password.value
                    e.target.style.borderColor = match ? '' : 'rgb(239, 68, 68)'
                })
            }

            // Country search and selection
            if (inputs.countrySearch && inputs.countryDropdown) {
                let selectedIndex = -1

                // Handle search input
                inputs.countrySearch.addEventListener('input', (e) => {
                    const search = e.target.value.toLowerCase()
                    const filtered = countries
                        .filter(c => c.name.toLowerCase().includes(search))
                        .slice(0, 10)

                    selectedIndex = -1
                    inputs.countryDropdown.innerHTML = filtered.map(country => `
                        <div class="country-option cursor-pointer p-3 hover:bg-brand-primary/20 
                                  text-white transition-colors" data-value="${country.code}">
                            ${country.name}
                        </div>
                    `).join('')

                    inputs.countryDropdown.classList.remove('hidden')
                })

                // Keyboard navigation
                inputs.countrySearch.addEventListener('keydown', (e) => {
                    const options = inputs.countryDropdown.querySelectorAll('.country-option')

                    switch (e.key) {
                        case 'ArrowDown':
                            e.preventDefault()
                            selectedIndex = Math.min(selectedIndex + 1, options.length - 1)
                            break
                        case 'ArrowUp':
                            e.preventDefault()
                            selectedIndex = Math.max(selectedIndex - 1, 0)
                            break
                        case 'Enter':
                            e.preventDefault()
                            if (selectedIndex >= 0) {
                                options[selectedIndex].click()
                            }
                            break
                        case 'Escape':
                            inputs.countryDropdown.classList.add('hidden')
                            break
                    }

                    options.forEach((opt, idx) => {
                        opt.classList.toggle('bg-brand-primary/20', idx === selectedIndex)
                    })
                })

                // Handle selection
                inputs.countryDropdown.addEventListener('click', (e) => {
                    const option = e.target.closest('.country-option')
                    if (option) {
                        inputs.country.value = option.dataset.value
                        inputs.countrySearch.value = option.textContent.trim()
                        inputs.countryDropdown.classList.add('hidden')
                        inputs.countrySearch.style.borderColor = ''
                    }
                })

                // Close dropdown on outside click
                document.addEventListener('click', (e) => {
                    if (!e.target.closest('.country-wrapper')) {
                        inputs.countryDropdown.classList.add('hidden')
                    }
                })
            }

            // Form submission
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault()

                    // Validate all fields
                    const fullname = inputs.fullname.value.trim()
                    const email = inputs.email.value.trim()
                    const phone = inputs.phone.value.trim()
                    const country = inputs.country.value
                    const password = inputs.password.value
                    const confirmPassword = inputs.confirmPassword.value

                    // Validate full name
                    if (!/^[A-Za-z\s]{2,}$/.test(fullname)) {
                        toastify({
                            text: "Please enter a valid full name",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-800"
                        })
                        inputs.fullname.focus()
                        return
                    }

                    // Validate email
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                        toastify({
                            text: "Please enter a valid email address",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-800"
                        })
                        inputs.email.focus()
                        return
                    }

                    // Validate phone
                    if (!/^\+?[\d\s-]{8,}$/.test(phone)) {
                        toastify({
                            text: "Please enter a valid phone number",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-800"
                        })
                        inputs.phone.focus()
                        return
                    }

                    // Validate country
                    if (!country) {
                        toastify({
                            text: "Please select your country",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-800"
                        })
                        inputs.countrySearch.focus()
                        return
                    }

                    // Validate password strength
                    const strength = checkPasswordStrength(password)
                    if (strength.strength < 50) {
                        toastify({
                            text: "Please create a stronger password",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-800"
                        })
                        inputs.password.focus()
                        return
                    }

                    // Validate password match
                    if (password !== confirmPassword) {
                        toastify({
                            text: "Passwords do not match",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-800"
                        })
                        inputs.confirmPassword.focus()
                        return
                    }

                    // Collect form data
                    const formData = {
                        fullname: inputs.fullname.value.trim(),
                        email: inputs.email.value.trim(),
                        phone: inputs.phone.value.trim(),
                        country: inputs.country.value,
                        password: inputs.password.value,
                        confirmPassword: inputs.confirmPassword.value
                    }

                    // Basic validation before sending to handler
                    if (!formData.fullname || !formData.email || !formData.phone ||
                        !formData.country || !formData.password || !formData.confirmPassword) {
                        toastify({
                            text: "Please fill in all fields",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-500/10"
                        })
                        return
                    }
                    // Call signup handler
                    try {
                        const success = await signupHandler(formData)
                        if (!success) {
                            // Error handling is done inside signupHandler
                            return
                        }
                    } catch (error) {
                        console.error('Signup error:', error)
                        toastify({
                            text: "An unexpected error occurred",
                            icon: "fas fa-exclamation-circle",
                            background: "bg-red-500/10"
                        })
                    }
                })
            }
        }
    })
}

export default signup