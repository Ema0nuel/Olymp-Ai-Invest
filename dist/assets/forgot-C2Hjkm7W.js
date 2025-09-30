import{L as l}from"./logo-9_xFcp4C.js";import{a as d,b as m}from"./reset-3f-UIG5W.js";import{h as c,i as p}from"./Bannar-DeiwK6EK.js";import{s as o}from"./spinner-DaVCJ9xF.js";import{t as n}from"./toastify-C88f8oFV.js";import{s as f}from"./supabaseClients-Fr4pJEim.js";import{l as u}from"./index-BXoOFHK0.js";import{t as b}from"./analtics-7M16VRr7.js";import"./quote_bg-DFN30WNI.js";async function g(r){try{o.start();const{error:e}=await f.auth.resetPasswordForEmail(r,{redirectTo:`${window.location.origin}/reset-password`});if(e)throw e;return o.stop(),n({text:"Password reset instructions sent to your email",icon:"fas fa-envelope",background:"bg-green-500/10",duration:3e3}),await new Promise(a=>setTimeout(a,2e3)),await u("login"),!0}catch(e){return o.stop(),n({text:e.message||"Failed to send reset instructions",icon:"fas fa-exclamation-circle",background:"bg-red-500/10",duration:3e3}),!1}}const T=async()=>{d("Forgot Password | Olymp AI Invest"),m(),await b();function r(){setTimeout(()=>p(),100);const e=document.getElementById("forgotForm"),a=document.getElementById("email"),t=e?.querySelector('button[type="submit"]');a&&a.addEventListener("input",i=>{const s=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.target.value);a.style.borderColor=s?"":"rgb(239, 68, 68)",t.disabled=!s}),e&&e.addEventListener("submit",async i=>{i.preventDefault();const s=a.value.trim();!s||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)||(t&&(t.disabled=!0,t.innerHTML=`
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Sending Instructions...</span>
                    `),await g(s),t&&(t.disabled=!1,t.innerHTML=`
                        Send Instructions
                        <i class="fas fa-paper-plane text-sm"></i>
                    `))})}return{html:`
        <div class="min-h-screen flex flex-col lg:flex-row animate-fade-in-up">
            <!-- Form Section -->
            <main class="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                <div class="absolute inset-0 bg-brand-blue/10"></div>
                
                <!-- Logo -->
                <div class="absolute top-8 left-8">
                    <a href="/" data-nav class="flex items-center gap-2">
                        <img src="${l}" alt="Olymp AI Invest" class="h-8">
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
                ${c()}
            </aside>
        </div>
        `,pageEvents:r}};export{T as default};
//# sourceMappingURL=forgot-C2Hjkm7W.js.map
