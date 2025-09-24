import{a as x}from"./auth-DqjBu9rB.js";import{a as k}from"./reset-3f-UIG5W.js";import{N as S}from"./Navbar-Bgx_mqpu.js";import{s as u}from"./supabaseClients-CP3flIu-.js";import{t as g}from"./toastify-C88f8oFV.js";import{s as b}from"./spinner-DaVCJ9xF.js";import{f}from"./formatters-CtERY4B5.js";import{E as C,B}from"./eth-DaSwGu82.js";import{S as E,B as T}from"./sol-CRd287EW.js";import{t as $}from"./analtics-DgXkwIat.js";import"./index-U9ehfUVP.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";async function I(s){try{const{data:e,error:t}=await u.from("profiles").select("is_created, onboarding_step").eq("id",s).single();if(t)throw t;return{isComplete:e.is_created,currentStep:e.onboarding_step||0}}catch(e){return console.error("Onboarding check failed:",e),{isComplete:!1,currentStep:0}}}async function L(s,e){try{const{error:t}=await u.from("profiles").update({onboarding_step:e}).eq("id",s);if(t)throw t;return!0}catch(t){return console.error("Failed to update onboarding step:",t),!1}}const j="/assets/welcome-DdpoTFSD.png";class _{constructor(e,t=0){this.userId=e,this.currentStep=t,this.steps=[{title:"Welcome to Olymp AI Invest",icon:"rocket",content:this.welcomeStep()},{title:"Basic Information",icon:"user",content:this.basicInfoStep()},{title:"Trading Experience",icon:"chart-line",content:this.experienceStep()},{title:"Security Setup",icon:"shield-alt",content:this.securityStep()}],window.onboarding=this}welcomeStep(){return`
            <div class="text-center space-y-8 animate-fade-in-up">
                <div class="relative">
                    <img src="${j}" alt="Welcome" 
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
        `}basicInfoStep(){return`
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
        `}experienceStep(){return`
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
        `}securityStep(){return`
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
        `}async nextStep(){try{b.start(),await L(this.userId,this.currentStep+1),this.currentStep++,this.render()}catch{g({text:"Failed to update progress",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}finally{b.stop()}}render(){const e=document.getElementById("onboardingContainer");if(!e)return;window.onboarding=this;const t=this.steps[this.currentStep];e.innerHTML=`
            <div class="min-h-screen flex items-center justify-center p-4 lg:p-6 animate-fade-in-up">
                <div class="w-full max-w-lg">
                    <!-- Step content -->
                    <div class="bg-brand-dark/50 backdrop-blur-sm rounded-2xl p-6 lg:p-8 
                                border border-brand-primary/20 transition-all duration-500
                                hover:border-brand-primary/40 shadow-lg">
                        ${t.content}
                    </div>
                    <!-- Progress bar -->
                    <div class="mb-8">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-sm text-gray-400">
                                Step ${this.currentStep+1} of ${this.steps.length}
                            </span>
                        </div>
                        <div class="h-2 bg-brand-black/50 rounded-full overflow-hidden">
                            <div class="h-full bg-brand-primary transition-all duration-500"
                                 style="width: ${(this.currentStep+1)/this.steps.length*100}%">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,this.setupEventListeners()}setupEventListeners(){const e={basicInfoForm:this.handleBasicInfo.bind(this),experienceForm:this.handleExperience.bind(this),securityForm:this.handleSecurity.bind(this)};Object.entries(e).forEach(([t,i])=>{const n=document.getElementById(t);n&&(n.onsubmit=async l=>{l.preventDefault(),await i(l)})})}async handleBasicInfo(e){await this.nextStep()}async handleExperience(e){await this.nextStep()}async handleSecurity(e){try{b.start();const t=e.target.querySelector('input[type="password"]').value,i=e.target.querySelectorAll('input[type="password"]')[1].value;if(t!==i){g({text:"PINs do not match",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"});return}const{error:n}=await u.from("profiles").update({is_created:!0,pin:t,onboarding_step:this.steps.length}).eq("id",this.userId);if(n)throw n;g({text:"Account setup complete!",icon:"fas fa-check-circle",background:"bg-green-500/10"}),setTimeout(()=>window.location.reload(),1500)}catch{g({text:"Failed to complete setup",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}finally{b.stop()}}}const F={BTC:B,ETH:C,BNB:T,SOL:E},q=async()=>{let s=!0,e=[],t=[],i=0;async function n(){const r=document.getElementById("balanceChart").getContext("2d"),o=r.createLinearGradient(0,0,0,200);o.addColorStop(0,"rgba(41, 98, 255, 0.2)"),o.addColorStop(1,"rgba(41, 98, 255, 0)"),new Chart(r,{type:"line",data:{labels:e.map(m=>new Date(m.created_at).toLocaleDateString()),datasets:[{label:"Balance History",data:e.map(m=>m.amount),borderColor:"#2962ff",backgroundColor:o,tension:.4,fill:!0}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1,drawBorder:!1},ticks:{color:"#6b7280"}},y:{grid:{color:"rgba(107, 114, 128, 0.1)",drawBorder:!1},ticks:{color:"#6b7280",callback:m=>`$${m.toLocaleString()}`}}}}})}async function l(){try{const r=x.getProfile();if(!r?.id)return 0;const{data:o,error:m}=await u.from("trading_accounts").select("balance, created_at").eq("user_id",r.id).eq("account_type","live");if(m||!o||o.length===0)return 0;const y=o[0],{data:v,error:w}=await u.from("transactions").select("amount, created_at, type").eq("user_id",r.id).order("created_at",{ascending:!1}).limit(7);return w?(e=[],y?.balance||0):(e=v||[],y?.balance||0)}catch{return 0}}async function a(){t=["BTC","ETH","BNB","SOL"].map(o=>({symbol:o,price:Math.random()*5e4,change:Math.random()*10-5}))}async function d(){i=await l(),c()}function c(){const r=document.querySelector("#balanceAmount");r&&(r.textContent=s?f(Number(i)):"******")}function p(){s=!s;const r=document.querySelector("#balanceAmount"),o=document.querySelector("#toggleIcon");r&&o&&(c(),o.className=`fas ${s?"fa-eye":"fa-eye-slash"} text-white`)}async function h(){document.querySelector("#toggleBalance")?.addEventListener("click",p),await n(),await d()}return{html:`
    <div class="space-y-6">
        <div class="bg-gradient-to-br from-brand-black/80 to-brand-black/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-brand-primary/10 overflow-hidden relative">
            <div class="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>
            </div>
            <div class="relative z-10">
                <div class="flex flex-col items-center sm:items-start text-center sm:text-left mb-8">
                    <span class="text-xs font-medium text-brand-primary mb-2">Live Account</span>
                    <h2 class="text-sm text-gray-400 mb-3">Total Balance</h2>
                    <div class="flex items-center gap-3">
                        <h3 id="balanceAmount" class="text-4xl md:text-3xl font-bold text-white tracking-tight">
                            ${f(Number(await l()))}
                        </h3>
                        <button id="toggleBalance" 
                                class="p-2 hover:bg-white/5 rounded-xl transition-colors"
                                aria-label="${s?"Hide":"Show"} balance">
                            <i id="toggleIcon" class="fas fa-eye text-gray-400 hover:text-white transition-colors"></i>
                        </button>
                    </div>
                </div>
                <div class="my-4">
                    <div class="relative inline-block w-full">
                        <div class="w-full absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#ce6706] via-[#f1d416] to-[#ce6706] 
                                    animate-gradient opacity-75 blur-[2px]"></div>
                        <a data-nav href="/copy-trade" 
                        class="w-full relative inline-flex justify-center items-center gap-4 px-10 py-3  
                                bg-[#242424]/90 backdrop-blur-sm
                                rounded-2xl hover:scale-[1.02] transition-all duration-300 
                                group border border-white/5">
                        <div class="p-2 bg-[#f1d416]/10 rounded-xl 
                                    group-hover:bg-[#f1d416]/20 transition-all duration-300 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" 
                                class="w-5 h-5 text-[#f1d416] group-hover:translate-x-1 
                                        transition-transform duration-300" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor">
                            <path stroke-linecap="round" 
                                    stroke-linejoin="round" 
                                    stroke-width="2" 
                                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                            </svg>
                        </div>
                        <div class="flex flex-col items-center">
                            <span class="text-xs text-[#f1d416]/70">Ready to automate?</span>
                            <span class="text-lg font-medium text-white">Start Copy Trading</span>
                        </div>
                        <div class="flex items-center gap-1 ml-4">
                            <div class="w-1.5 h-1.5 rounded-full bg-[#f1d416]/50 animate-pulse"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-[#f1d416]/50 animate-pulse delay-150"></div>
                            <div class="w-1.5 h-1.5 rounded-full bg-[#f1d416]/50 animate-pulse delay-300"></div>
                        </div>
                        </a>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-8">
                    <a href="/deposit" data-nav
                       class="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-2 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-white">Deposit</span>
                    </a>
                    <a href="/withdraw" data-nav
                       class="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500 mb-2 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16M4 12h16" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-white">Withdraw</span>
                    </a>
                    <a href="/swap" data-nav
                       class="flex flex-col items-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div class="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 mb-2 group-hover:scale-110 transition-transform">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <span class="text-sm font-medium text-white">Swap</span>
                    </a>
                </div>
                <div class="h-32 sm:h-48">
                    <canvas id="balanceChart" class="w-full"></canvas>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            ${(await a(),t).map(r=>`
                <div class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-4 border border-brand-primary/10">
                    <div class="flex items-center gap-3 mb-2">
                        <img src="${F[r.symbol]}" 
                             alt="${r.symbol}" 
                             class="w-6 h-6 sm:w-8 sm:h-8">
                        <div>
                            <h3 class="text-sm sm:font-medium text-white">${r.symbol}/USD</h3>
                            <p class="text-xs text-gray-400">Live Rate</p>
                        </div>
                    </div>
                    <div class="mt-2 sm:mt-3">
                        <div class="text-base sm:text-lg font-bold text-white">
                            ${f(r.price)}
                        </div>
                        <div class="text-xs sm:text-sm ${r.change>0?"text-green-500":"text-red-500"}">
                            ${r.change>0?"+":""}${r.change.toFixed(2)}%
                        </div>
                    </div>
                </div>
            `).join("")}
        </div>
    </div>
    `,pageEvents:h}},D=()=>{function s(){if(document.querySelector("#tradingViewScript"))return;const t=document.createElement("script");t.id="tradingViewScript",t.type="text/javascript",t.src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",t.async=!0,t.innerHTML=JSON.stringify({colorTheme:"dark",dateRange:"12M",locale:"en",largeChartUrl:"",isTransparent:!1,showFloatingTooltip:!1,plotLineColorGrowing:"rgba(41, 98, 255, 1)",plotLineColorFalling:"rgba(41, 98, 255, 1)",gridLineColor:"rgba(240, 243, 250, 0)",scaleFontColor:"#DBDBDB",belowLineFillColorGrowing:"rgba(41, 98, 255, 0.12)",belowLineFillColorFalling:"rgba(41, 98, 255, 0.12)",belowLineFillColorGrowingBottom:"rgba(41, 98, 255, 0)",belowLineFillColorFallingBottom:"rgba(41, 98, 255, 0)",symbolActiveColor:"rgba(41, 98, 255, 0.12)",backgroundColor:"#0f0f0f",width:"100%",height:"100%",showSymbolLogo:!0,showChart:!0});const i=document.querySelector("#tradingViewWidget");i&&(i.innerHTML='<div class="tradingview-widget-container__widget"></div>',i.appendChild(t))}function e(){setTimeout(s,100)}return{html:`
        <div class="mt-6">
            <div class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-2 h-[500px] border border-brand-primary/10">
                <div id="tradingViewWidget" class="tradingview-widget-container" style="height:600px">
                    <div class="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </div>
        `,pageEvents:e}},M=async()=>{let s=!1;async function e(){try{b.start();const{data:{session:a},error:d}=await u.auth.getSession();if(d||!a)throw new Error("Not authenticated");const{data:c,error:p}=await u.from("transactions").select(`
                    id,
                    type,
                    amount,
                    status,
                    created_at,
                    from_asset,
                    to_asset
                `).eq("user_id",a.user.id).order("created_at",{ascending:!1});if(p)throw p;return c||[]}catch(a){return console.error("Fetch transactions error:",a),[]}finally{b.stop()}}function t(a){return`
            <tr class="border-b border-brand-primary/5 text-sm hover:bg-brand-primary/5 transition-colors">
                <td class="py-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-lg 
                            ${a.type==="deposit"?"bg-green-500/10 text-green-500":a.type==="withdrawal"?"bg-red-500/10 text-red-500":"bg-brand-primary/10 text-brand-primary"} 
                            flex items-center justify-center">
                            <i class="fas fa-${a.type==="deposit"?"arrow-down":a.type==="withdrawal"?"arrow-up":"exchange-alt"}"></i>
                        </div>
                        <span class="text-white capitalize">${a.type}</span>
                    </div>
                </td>
                <td class="py-4">
                    <span class="${a.type==="deposit"?"text-green-500":a.type==="withdrawal"?"text-red-500":"text-white"}">
                        ${a.type==="withdrawal"?"-":"+"}$${a.amount.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:8})}
                    </span>
                </td>
                <td class="py-4">
                    <span class="px-2 py-1 rounded-lg text-xs ${a.status==="completed"?"bg-green-500/10 text-green-500":a.status==="pending"?"bg-yellow-500/10 text-yellow-500":"bg-red-500/10 text-red-500"}">
                        ${a.status}
                    </span>
                </td>
                <td class="py-4 text-gray-400">
                    ${new Date(a.created_at).toLocaleString()}
                </td>
            </tr>
        `}async function i(){s=!s;const a=document.getElementById("transactionsBody"),d=document.getElementById("viewMoreBtn");if(!a||!d)return;d.innerHTML=s?'<i class="fas fa-chevron-up mr-2"></i>View Less':'<i class="fas fa-chevron-down mr-2"></i>View More';const c=await e(),p=s?c:c.slice(0,5);a.innerHTML=p.length?p.map(t).join(""):`<tr>
                <td colspan="4" class="py-8 text-center text-gray-400">
                    <i class="fas fa-history text-4xl mb-2 block"></i>
                    <p>No transactions found</p>
                </td>
            </tr>`}const n=await e(),l=n.slice(0,5);return window.toggleTransactions=i,{html:`
        <div class="mt-6 mb-16 lg:mb-2">
            <div class="bg-brand-black/50 backdrop-blur-xl rounded-2xl p-6 border border-brand-primary/10">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-lg font-medium text-white">
                        <i class="fas fa-history mr-2"></i>Recent Transactions
                    </h2>
                    ${n.length>5?`
                        <button id="viewMoreBtn"
                                onclick="window.toggleTransactions()"
                                class="text-sm text-brand-primary hover:text-brand-primary/80 transition-colors inline-flex items-center">
                            <i class="fas fa-chevron-down mr-2"></i>View More
                        </button>
                    `:""}
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr class="text-left text-sm text-gray-400 border-b border-brand-primary/10">
                                <th class="pb-4 font-medium">Type</th>
                                <th class="pb-4 font-medium">Amount</th>
                                <th class="pb-4 font-medium">Status</th>
                                <th class="pb-4 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody id="transactionsBody">
                            ${l.length?l.map(t).join(""):`<tr>
                                    <td colspan="4" class="py-8 text-center text-gray-400">
                                        <i class="fas fa-history text-4xl mb-2 block"></i>
                                        <p>No transactions found</p>
                                    </td>
                                </tr>`}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        `}},X=async()=>{if(!await x.check("dashboard"))return{html:"",pageEvents:()=>{}};k("Olymp AI | Dashboard"),await $();const e=x.getProfile();if(!e)return{html:"",pageEvents:()=>{}};const{isComplete:t,currentStep:i}=await I(e.id),{html:n,pageEvents:l}=S(),a=await q(),d=D(),c=await M();async function p(){t?(l(),await a.pageEvents(),d.pageEvents()):new _(e.id,i).render()}return{html:t?`
            ${n}
            <main class="main-scroll-view">
                <div class="p-4 md:p-8">
                    ${a.html}
                    ${d.html}
                    ${c.html}
                </div>
            </main>
        `:`
            <div id="onboardingContainer"></div>
        `,pageEvents:p}};export{X as default};
//# sourceMappingURL=dashboard-kjmr_bJW.js.map
