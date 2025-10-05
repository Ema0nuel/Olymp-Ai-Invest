import{L as g}from"./logo-9_xFcp4C.js";import{a as b,b as y}from"./reset-3f-UIG5W.js";import{h as w,i as x}from"./Bannar-DeiwK6EK.js";import{s as l}from"./spinner-DaVCJ9xF.js";import{t as p}from"./toastify-C88f8oFV.js";import{s as v}from"./supabaseClients-B0wRxRlI.js";import{l as h}from"./index-Blc0Txpr.js";import{c as u}from"./passwordStrength-BK8jYuw1.js";import{t as P}from"./analtics-CjlshyU7.js";import"./quote_bg-DFN30WNI.js";async function I({password:i}){try{l.start();const{error:a}=await v.auth.updateUser({password:i});if(a)throw a;return l.stop(),p({text:"Password reset successful! Please login with your new password",icon:"fas fa-check-circle",background:"bg-green-500/10",duration:3e3}),await new Promise(o=>setTimeout(o,2e3)),await h("login"),!0}catch(a){return l.stop(),p({text:a.message||"Failed to reset password",icon:"fas fa-exclamation-circle",background:"bg-red-500/10",duration:3e3}),!1}}const A=async()=>{b("Reset Password | Olymp AI Invest"),y(),await P();function i(){setTimeout(()=>x(),100);const a=document.getElementById("resetForm"),o=document.getElementById("password"),n=document.getElementById("confirmPassword"),d=document.getElementById("strengthBar"),m=document.getElementById("strengthText"),f=document.getElementById("strengthIndicators"),r=a?.querySelector('button[type="submit"]');document.querySelectorAll(".password-group").forEach(e=>{const t=e.querySelector("input"),s=e.querySelector(".password-toggle");s&&s.addEventListener("click",()=>{const c=t.type==="password"?"text":"password";t.type=c,s.innerHTML=c==="password"?'<i class="fas fa-eye"></i>':'<i class="fas fa-eye-slash"></i>'})}),o&&o.addEventListener("input",e=>{const t=u(e.target.value);if(d.style.width=`${t.strength}%`,d.className=`h-full rounded-full transition-all ${t.color}`,m.textContent=`Password Strength: ${t.strength}%`,f.innerHTML=t.indicators.map(s=>`<span class="px-2 py-1 rounded-full bg-brand-primary/20 text-xs">${s}</span>`).join(""),r.disabled=t.strength<50,n.value){const s=e.target.value===n.value;n.style.borderColor=s?"":"rgb(239, 68, 68)"}}),n&&n.addEventListener("input",e=>{const t=e.target.value===o.value;e.target.style.borderColor=t?"":"rgb(239, 68, 68)",r.disabled=!t||u(o.value).strength<50}),a&&a.addEventListener("submit",async e=>{e.preventDefault();const t=o.value,s=n.value;if(t!==s){toastify({text:"Passwords do not match",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"});return}r&&(r.disabled=!0,r.innerHTML=`
                        <i class="fas fa-spinner fa-spin"></i>
                        <span>Resetting Password...</span>
                    `),await I({password:t}),r&&(r.disabled=!1,r.innerHTML=`
                        Reset Password
                        <i class="fas fa-key text-sm"></i>
                    `)})}return{html:`
        <div class="min-h-screen flex flex-col lg:flex-row animate-fade-in-up">
            <!-- Form Section -->
            <main class="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                <div class="absolute inset-0 bg-brand-blue/10"></div>
                
                <!-- Logo -->
                <div class="absolute top-8 left-8">
                    <a href="/" data-nav class="flex items-center gap-2">
                        <img src="${g}" alt="Olymp AI Invest" class="h-8">
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
                ${w()}
            </aside>
        </div>
        `,pageEvents:i}};export{A as default};
//# sourceMappingURL=reset-1wCgBd_7.js.map
