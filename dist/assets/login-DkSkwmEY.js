import{L as u}from"./logo-9_xFcp4C.js";import{a as b}from"./reset-3f-UIG5W.js";import{t as p}from"./toastify-C88f8oFV.js";import{a as f}from"./adminLoginHandler-D0WRBhIu.js";import"./index-BXoOFHK0.js";import"./index-BipRJY6b.js";const L=async()=>{b("Admin Login | Olymp AI Invest");let l=0,d=0;function m(){const o=document.getElementById("adminLoginForm"),i=document.getElementById("adminEmail"),n=document.getElementById("adminPassword"),s=o?.querySelector('button[type="submit"]');if(i&&i.addEventListener("input",e=>{const r=e.target.value.trim(),t=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r);i.classList.toggle("border-red-500",!t),s.disabled=!t}),n){const e=document.createElement("div");e.className="password-strength mt-1 text-xs",n.parentElement.appendChild(e),n.addEventListener("input",r=>{const t=r.target.value;let a=0;t.length>=8&&a++,/[A-Z]/.test(t)&&a++,/[0-9]/.test(t)&&a++,/[^A-Za-z0-9]/.test(t)&&a++;const c=["red","orange","yellow","green"];e.style.color=`var(--${c[a-1]})`,e.textContent=a>0?`Password Strength: ${["Weak","Fair","Good","Strong"][a-1]}`:""})}o&&o.addEventListener("submit",async e=>{e.preventDefault();const r=Date.now();if(l>=3&&r-d<3e5){p({text:"Too many attempts. Please try again later.",background:"bg-red-500"});return}s.disabled=!0,s.innerHTML='<i class="fas fa-spinner fa-spin"></i>';const t={email:i.value.trim(),password:n.value};await f(t)||(l++,d=r,s.disabled=!1,s.innerHTML="Login")})}return{html:`
        <div class="min-h-screen bg-gradient-to-br from-brand-dark to-brand-blue/20 flex items-center justify-center p-6">
            <div class="w-full max-w-md">
                <!-- Logo -->
                <div class="text-center mb-8">
                    <img src="${u}" alt="Olymp AI Invest" class="h-16 mx-auto mb-4">
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
        `,pageEvents:m}};export{L as default};
//# sourceMappingURL=login-DkSkwmEY.js.map
