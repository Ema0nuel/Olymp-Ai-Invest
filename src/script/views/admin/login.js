import LOGO from '../../../images/logo.jpg';
import reset from '../../utils/reset';
import toastify from '../../components/toastify';
import { adminLoginHandler, checkAdminAuth } from './functions/adminLoginHandler';
import { loadPage } from '../../routes/router';

const adminLogin = async () => {

    reset('Admin Login | Olymp AI Invest');

    let loginAttempts = 0;
    let lastAttemptTime = 0;

    function pageEvents() {
        const form = document.getElementById('adminLoginForm');
        const emailInput = document.getElementById('adminEmail');
        const passwordInput = document.getElementById('adminPassword');
        const submitButton = form?.querySelector('button[type="submit"]');

        // Advanced email validation
        if (emailInput) {
            emailInput.addEventListener('input', (e) => {
                const email = e.target.value.trim();
                const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                emailInput.classList.toggle('border-red-500', !isValid);
                submitButton.disabled = !isValid;
            });
        }

        // Password strength indicator
        if (passwordInput) {
            const strengthIndicator = document.createElement('div');
            strengthIndicator.className = 'password-strength mt-1 text-xs';
            passwordInput.parentElement.appendChild(strengthIndicator);

            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                let strength = 0;

                if (password.length >= 8) strength++;
                if (/[A-Z]/.test(password)) strength++;
                if (/[0-9]/.test(password)) strength++;
                if (/[^A-Za-z0-9]/.test(password)) strength++;

                const colors = ['red', 'orange', 'yellow', 'green'];
                strengthIndicator.style.color = `var(--${colors[strength - 1]})`;
                strengthIndicator.textContent = strength > 0 ?
                    `Password Strength: ${['Weak', 'Fair', 'Good', 'Strong'][strength - 1]}` : '';
            });
        }

        // Form submission with rate limiting
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                // Check rate limiting
                const now = Date.now();
                if (loginAttempts >= 3 && now - lastAttemptTime < 300000) {
                    toastify({
                        text: 'Too many attempts. Please try again later.',
                        background: 'bg-red-500'
                    });
                    return;
                }

                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

                const formData = {
                    email: emailInput.value.trim(),
                    password: passwordInput.value
                };

                const success = await adminLoginHandler(formData);

                if (!success) {
                    loginAttempts++;
                    lastAttemptTime = now;
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Login';
                }
            });
        }
    }

    return {
        html: /* html */`
        <div class="min-h-screen bg-gradient-to-br from-brand-dark to-brand-blue/20 flex items-center justify-center p-6">
            <div class="w-full max-w-md">
                <!-- Logo -->
                <div class="text-center mb-8">
                    <img src="${LOGO}" alt="Olymp AI Invest" class="h-16 mx-auto mb-4">
                    <h1 class="text-2xl font-bold text-white">Admin Portal</h1>
                    <p class="text-gray-400 text-sm">Secure administrative access</p>
                </div>

                <!-- Login Form -->
                <form id="adminLoginForm" class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-brand-primary/10">
                    <div class="space-y-6">
                        <!-- Email Input -->
                        <div>
                            <label class="text-sm font-medium text-gray-300 block mb-2">
                                Administrator Email
                            </label>
                            <input type="email" id="adminEmail" required
                                   class="w-full px-4 py-3 rounded-xl bg-brand-black/80 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary 
                                          outline-none transition-all"
                                   placeholder="admin@Olymp AI.com">
                        </div>

                        <!-- Password Input -->
                        <div>
                            <label class="text-sm font-medium text-gray-300 block mb-2">
                                Secure Password
                            </label>
                            <div class="relative">
                                <input type="password" id="adminPassword" required
                                       class="w-full px-4 py-3 rounded-xl bg-brand-black/80 text-white 
                                              border border-brand-primary/30 focus:border-brand-primary 
                                              outline-none transition-all"
                                       placeholder="******">
                            </div>
                        </div>

                        <!-- Security Notice -->
                        <div class="text-xs text-gray-400 bg-brand-primary/5 p-3 rounded-lg">
                            <i class="fas fa-shield-alt mr-1"></i>
                            This is a secure administrative portal. Unauthorized access attempts will be logged.
                        </div>

                        <!-- Submit Button -->
                        <button type="submit"
                                class="w-full py-3 rounded-xl bg-brand-primary text-white font-bold 
                                       hover:bg-opacity-90 transition-all flex items-center justify-center 
                                       gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            Login to Admin Panel
                            <i class="fas fa-lock text-sm"></i>
                        </button>
                    </div>
                </form>

                <!-- Return to Main Site -->
                <div class="text-center mt-6">
                    <a href="/" data-nav class="text-sm text-gray-400 hover:text-white transition-colors">
                        <i class="fas fa-arrow-left mr-1"></i>
                        Return to Main Site
                    </a>
                </div>
            </div>
        </div>
        `,
        pageEvents
    };
};

export default adminLogin;