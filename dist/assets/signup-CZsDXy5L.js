import{L as g}from"./logo-9_xFcp4C.js";import{a as y,b as v}from"./reset-3f-UIG5W.js";import{t as n}from"./toastify-C88f8oFV.js";import"./index-Ct12iCQQ.js";import{h,i as x}from"./Bannar-DeiwK6EK.js";import{c as m}from"./passwordStrength-BK8jYuw1.js";import{c as w}from"./countries-DI9tzH0y.js";import{s as k,a as P}from"./signupHandler-Ij0mYrLW.js";import{t as E}from"./analtics-BGqwjPQ7.js";import"./quote_bg-DFN30WNI.js";import"./supabaseClients-DZSCHltC.js";import"./Modal-jvk0lnFM.js";import"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import"./send-email-89Z52C2k.js";import"./webAuthnHelper-CFOYufXH.js";const V=async()=>(y("Create Account | Olymp AI Invest"),v(),await E(),{html:`
        <div class="min-h-screen w-full flex">
            <!-- Form Section -->
            <main class="flex-1 min-h-screen bg-brand-blue/10 relative">
                <!-- Fixed Header -->
                <header class="fixed top-0 left-0 right-0 h-16 flex items-center px-8">
                    <a href="/" data-nav class="flex items-center gap-2">
                        <img src="${g}" alt="Olymp AI Invest" class="h-8 w-auto">
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
                ${h()}
            </aside>
        </div>
        `,pageEvents(){setTimeout(()=>x(),100),document.getElementById("googleLogin")?.addEventListener("click",async()=>{await k()});const i=document.getElementById("signupForm"),e={fullname:document.getElementById("fullname"),email:document.getElementById("email"),phone:document.getElementById("phone"),countrySearch:document.getElementById("countrySearch"),country:document.getElementById("country"),countryDropdown:document.getElementById("countryDropdown"),password:document.getElementById("password"),confirmPassword:document.getElementById("confirmPassword")};e.fullname&&e.fullname.addEventListener("input",r=>{let t=r.target.value.replace(/[^A-Za-z\s]/g,"");t=t.replace(/\s+/g," "),r.target.value=t;const a=t.length>=2;r.target.style.borderColor=a?"":"rgb(239, 68, 68)"}),e.email&&e.email.addEventListener("input",r=>{const t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.target.value);r.target.style.borderColor=t?"":"rgb(239, 68, 68)"}),e.phone&&e.phone.addEventListener("input",r=>{let t=r.target.value.replace(/[^\d+\s-]/g,"");t.startsWith("+")||(t="+"+t),r.target.value=t;const a=/^\+?[\d\s-]{8,}$/.test(t);r.target.style.borderColor=a?"":"rgb(239, 68, 68)"}),document.querySelectorAll(".password-group").forEach(r=>{const t=r.querySelector("input"),a=r.querySelector(".password-toggle");a&&a.addEventListener("click",()=>{const o=t.type==="password"?"text":"password";t.type=o,a.innerHTML=o==="password"?'<i class="fas fa-eye"></i>':'<i class="fas fa-eye-slash"></i>'})});const d=document.getElementById("strengthBar"),p=document.getElementById("strengthText"),f=document.getElementById("strengthIndicators");if(e.password&&e.password.addEventListener("input",r=>{const t=m(r.target.value);if(d.style.width=`${t.strength}%`,d.className=`h-full rounded-full transition-all ${t.color}`,p.textContent=`Password Strength: ${t.strength}%`,f.innerHTML=t.indicators.map(a=>`<span class="px-2 py-1 rounded-full bg-brand-primary/20 text-xs">${a}</span>`).join(""),e.confirmPassword.value){const a=r.target.value===e.confirmPassword.value;e.confirmPassword.style.borderColor=a?"":"rgb(239, 68, 68)"}}),e.confirmPassword&&e.confirmPassword.addEventListener("input",r=>{const t=r.target.value===e.password.value;r.target.style.borderColor=t?"":"rgb(239, 68, 68)"}),e.countrySearch&&e.countryDropdown){let r=-1;e.countrySearch.addEventListener("input",t=>{const a=t.target.value.toLowerCase(),o=w.filter(s=>s.name.toLowerCase().includes(a)).slice(0,10);r=-1,e.countryDropdown.innerHTML=o.map(s=>`
                        <div class="country-option cursor-pointer p-3 hover:bg-brand-primary/20 
                                  text-white transition-colors" data-value="${s.code}">
                            ${s.name}
                        </div>
                    `).join(""),e.countryDropdown.classList.remove("hidden")}),e.countrySearch.addEventListener("keydown",t=>{const a=e.countryDropdown.querySelectorAll(".country-option");switch(t.key){case"ArrowDown":t.preventDefault(),r=Math.min(r+1,a.length-1);break;case"ArrowUp":t.preventDefault(),r=Math.max(r-1,0);break;case"Enter":t.preventDefault(),r>=0&&a[r].click();break;case"Escape":e.countryDropdown.classList.add("hidden");break}a.forEach((o,s)=>{o.classList.toggle("bg-brand-primary/20",s===r)})}),e.countryDropdown.addEventListener("click",t=>{const a=t.target.closest(".country-option");a&&(e.country.value=a.dataset.value,e.countrySearch.value=a.textContent.trim(),e.countryDropdown.classList.add("hidden"),e.countrySearch.style.borderColor="")}),document.addEventListener("click",t=>{t.target.closest(".country-wrapper")||e.countryDropdown.classList.add("hidden")})}i&&i.addEventListener("submit",async r=>{r.preventDefault();const t=e.fullname.value.trim(),a=e.email.value.trim(),o=e.phone.value.trim(),s=e.country.value,c=e.password.value,b=e.confirmPassword.value;if(!/^[A-Za-z\s]{2,}$/.test(t)){n({text:"Please enter a valid full name",icon:"fas fa-exclamation-circle",background:"bg-red-800"}),e.fullname.focus();return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)){n({text:"Please enter a valid email address",icon:"fas fa-exclamation-circle",background:"bg-red-800"}),e.email.focus();return}if(!/^\+?[\d\s-]{8,}$/.test(o)){n({text:"Please enter a valid phone number",icon:"fas fa-exclamation-circle",background:"bg-red-800"}),e.phone.focus();return}if(!s){n({text:"Please select your country",icon:"fas fa-exclamation-circle",background:"bg-red-800"}),e.countrySearch.focus();return}if(m(c).strength<50){n({text:"Please create a stronger password",icon:"fas fa-exclamation-circle",background:"bg-red-800"}),e.password.focus();return}if(c!==b){n({text:"Passwords do not match",icon:"fas fa-exclamation-circle",background:"bg-red-800"}),e.confirmPassword.focus();return}const l={fullname:e.fullname.value.trim(),email:e.email.value.trim(),phone:e.phone.value.trim(),country:e.country.value,password:e.password.value,confirmPassword:e.confirmPassword.value};if(!l.fullname||!l.email||!l.phone||!l.country||!l.password||!l.confirmPassword){n({text:"Please fill in all fields",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"});return}try{if(!await P(l))return}catch(u){console.error("Signup error:",u),n({text:"An unexpected error occurred",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}})}});export{V as default};
//# sourceMappingURL=signup-CZsDXy5L.js.map
