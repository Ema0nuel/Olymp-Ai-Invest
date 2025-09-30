import{L as m}from"./logo-9_xFcp4C.js";import{a as p,b as u}from"./reset-3f-UIG5W.js";import{h as f,i as b}from"./Bannar-DeiwK6EK.js";import{a as g,l as d}from"./auth-S8CH6sXT.js";import{h as y}from"./signupHandler-BIhBnmI7.js";import{t as v}from"./analtics-7M16VRr7.js";import"./quote_bg-DFN30WNI.js";import"./spinner-DaVCJ9xF.js";import"./toastify-C88f8oFV.js";import"./supabaseClients-Fr4pJEim.js";import"./index-BXoOFHK0.js";import"./webAuthnHelper-CFOYufXH.js";import"./Modal-jvk0lnFM.js";import"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import"./send-email-89Z52C2k.js";const j=async()=>{if(!await g.check("login"))return{html:"",pageEvents:()=>{}};p("Login | Olymp AI Invest"),await v(),u();function c(){setTimeout(()=>b(),100);const r=document.getElementById("loginForm"),s=document.getElementById("email"),e=document.getElementById("password"),a=r?.querySelector('button[type="submit"]');s&&s.addEventListener("input",t=>{const o=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t.target.value);s.style.borderColor=o?"":"rgb(239, 68, 68)"});const i=document.createElement("button");i.type="button",i.className="absolute right-4 bottom-0 -translate-y-1/2 text-gray-400 hover:text-white transition-colors",i.innerHTML='<i class="fas fa-eye"></i>',e&&(i.addEventListener("click",()=>{const t=e.type==="password"?"text":"password";e.type=t,i.innerHTML=t==="password"?'<i class="fas fa-eye"></i>':'<i class="fas fa-eye-slash"></i>'}),e.parentElement.style.position="relative",e.parentElement.appendChild(i)),r&&r.addEventListener("submit",async t=>{t.preventDefault(),a&&(a.disabled=!0,a.innerHTML=`
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Signing in...</span>
                    `);const o={email:s.value.trim(),password:e.value};await d(o),a&&(a.disabled=!1,a.innerHTML=`
                        Sign In
                        <i class="fas fa-arrow-right text-sm"></i>
                    `)});const l=document.getElementById("googleLogin"),n=document.getElementById("biometricLogin");l&&l.addEventListener("click",y),n&&window.PublicKeyCredential?n.addEventListener("click",async()=>{const t=s?.value?.trim();await d({email:t})||r.classList.remove("hidden")}):n&&(n.style.display="none")}return{html:`
        <div class="min-h-screen w-full flex">
            <!-- Login Form Section -->
            <main class="flex-1 min-h-screen bg-brand-blue/10 relative">
                
                 <!-- Fixed Header -->
                <header class="fixed top-0 left-0 right-0 h-16 flex items-center px-8">
                    <a href="/" data-nav class="flex items-center gap-2">
                        <img src="${m}" alt="Olymp AI Invest" class="h-8 w-auto">
                        <span class="text-lg font-bold text-brand-primary">Olymp AI</span>
                    </a>
                </header>

                <!-- Scrollable Content Area -->
                <div class="w-full pt-16 pb-8 overflow-y-auto h-screen">
                    <div class="max-w-md mx-auto px-6 py-8">
                        <!-- Form Header -->
                        <div class="mb-8">
                            <h1 class="text-2xl lg:text-3xl font-bold text-white">Welcome Back</h1>
                            <p class="text-gray-400 mt-2">Sign in to your trading account</p>
                        </div>

                        <!-- Social Login Buttons -->
                        <div class="space-y-4 mb-6">
                            <button id="googleLogin"
                                class="w-full py-3 px-4 rounded-xl bg-white text-gray-800 
                                       font-medium flex items-center justify-center gap-3 
                                       hover:bg-gray-100 transition-colors">
                                <svg class="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Continue with Google
                            </button>

                            <!-- Biometric Button -->
                            <button id="biometricLogin" 
                                class="w-full py-3 rounded-xl border border-brand-primary/30 
                                       text-brand-primary hover:bg-brand-primary/10 transition-all 
                                       flex items-center justify-center gap-2">
                                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 14c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z" 
                                          stroke-width="2" stroke-linecap="round"/>
                                    <path d="M20.59 22c-1.88-3.21-5.44-5-8.59-5s-6.71 1.79-8.59 5" 
                                          stroke-width="2" stroke-linecap="round"/>
                                    <path d="M7 9a5 5 0 0 1 10 0" 
                                          stroke-width="2" stroke-linecap="round"/>
                                </svg>
                                Use Biometrics
                            </button>
                        </div>

                        <!-- Divider -->
                        <div class="relative my-6">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-600"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-[#0d0f12] text-gray-400">or continue with email</span>
                            </div>
                        </div>

                        <form id="loginForm" class="space-y-6">
                            <!-- Email Input -->
                            <div class="space-y-2">
                                <label class="text-sm font-medium text-gray-300" for="email">
                                    Email Address
                                </label>
                                <input type="email" id="email" required
                                       class="w-full px-4 py-3 rounded-xl bg-brand-black/80 text-white 
                                              border border-brand-primary/30 focus:border-brand-primary 
                                              outline-none transition-all" 
                                       placeholder="you@example.com">
                            </div>

                            <!-- Password Input -->
                            <div class="space-y-2">
                                <div class="flex items-center justify-between">
                                    <label class="text-sm font-medium text-gray-300" for="password">
                                        Password
                                    </label>
                                    <a href="/forgot-password" data-nav 
                                       class="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                                <input type="password" id="password" required
                                       class="w-full px-4 py-3 rounded-xl bg-brand-black/80 text-white 
                                              border border-brand-primary/30 focus:border-brand-primary 
                                              outline-none transition-all" 
                                       placeholder="••••••••">
                            </div>

                            <!-- Submit Button -->
                            <button type="submit" 
                                    class="w-full py-3 rounded-xl bg-brand-primary text-brand-blue 
                                           font-bold text-lg hover:bg-opacity-90 transition-all 
                                           flex items-center justify-center gap-2">
                                Sign In
                                <i class="fas fa-arrow-right text-sm"></i>
                            </button>
                        </form>

                        <!-- Sign Up Link -->
                        <p class="mt-6 text-center text-gray-400">
                            Don't have an account? 
                            <a href="/signup" data-nav 
                               class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>
            </main>

            <!-- Testimonials Section -->
            <aside class="hidden lg:flex flex-1 relative bg-brand-dark overflow-hidden">
                ${f()}
            </aside>
        </div>
        `,pageEvents:c}};export{j as default};
//# sourceMappingURL=login-zYXA5a0A.js.map
