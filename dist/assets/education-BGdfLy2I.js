import{N as d,F as l}from"./Navbar-DHujhqfN.js";import{r as c,i as p}from"./stat-CwrfErq9.js";import{r as m}from"./banner-D6N_IK2I.js";import{a as b,b as u}from"./reset-3f-UIG5W.js";import{t as x}from"./analtics-D3HxoDr9.js";import"./logo-9_xFcp4C.js";import"./supabaseClients-BL8TJKO9.js";import"./index-DJYm-znp.js";const g=[{title:"Forex Trading Fundamentals",category:"beginner",lessons:12,duration:"6 hours",icon:"chart-line",description:"Master the basics of forex trading, currency pairs, and market analysis.",color:"blue"},{title:"Technical Analysis Mastery",category:"intermediate",lessons:15,duration:"8 hours",icon:"chart-candlestick",description:"Learn advanced chart patterns and technical indicators.",color:"emerald"},{title:"Risk Management Strategies",category:"advanced",lessons:10,duration:"5 hours",icon:"shield-check",description:"Develop effective risk management techniques for consistent trading.",color:"purple"},{title:"Cryptocurrency Trading",category:"intermediate",lessons:14,duration:"7 hours",icon:"bitcoin-sign",description:"Navigate the crypto markets with confidence and strategy.",color:"amber"}],s=[{value:1e3,suffix:"+",label:"Video Lessons",icon:"video"},{value:50,suffix:"K+",label:"Active Students",icon:"users"},{value:95,suffix:"%",label:"Success Rate",icon:"chart-line"},{value:24,suffix:"/7",label:"Support",icon:"headset"}];function v(){s.forEach((r,t)=>{const i=document.querySelector(`.stat-value-${t}`);if(i){let n=0;const e=r.value;anime({targets:i,innerHTML:[n,e],easing:"easeInOutExpo",duration:1500,round:1,update:function(o){i.innerHTML=Math.round(o.animations[0].currentValue)+r.suffix}})}})}function f(){document.querySelectorAll(".course-card").forEach(t=>{t.addEventListener("mouseenter",()=>{anime({targets:t,scale:1.05,duration:300,easing:"easeOutExpo"})}),t.addEventListener("mouseleave",()=>{anime({targets:t,scale:1,duration:300,easing:"easeOutExpo"})})})}const $=async()=>{b("Olymp AI Invest Education Center"),u(),await x();const{html:r,pageEvents:t}=d(),i=m();function n(){t(),v(),f();const e=document.getElementById("tradingview-banner");if(e){const a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",a.innerHTML=JSON.stringify({symbols:[{proName:"FOREXCOM:SPXUSD",title:"S&P 500 Index"},{proName:"FOREXCOM:NSXUSD",title:"US 100 Cash CFD"},{proName:"FX_IDC:EURUSD",title:"EUR to USD"},{proName:"BITSTAMP:BTCUSD",title:"Bitcoin"},{proName:"BITSTAMP:ETHUSD",title:"Ethereum"},{proName:"NSE:NIFTY",title:"Nifty"}],colorTheme:"dark",locale:"en",largeChartUrl:"",isTransparent:!1,showSymbolLogo:!0,displayMode:"adaptive"}),e.querySelector(".tradingview-widget-container__widget").appendChild(a)}p()}return{html:`
        ${r}
         <div class="taper-banner w-full">
            ${i}
        </div>
        <main class="flex flex-col min-h-screen bg-brand-dark">
            
            <!-- Hero Section -->
            <section class="relative py-20 overflow-hidden bg-cover bg-center"  
                     style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
                 <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-brand-black/90"></div>
                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-4xl mx-auto text-center">
                        <span class="inline-block px-4 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium mb-6">
                            Education Center
                        </span>
                        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                            Master the Markets with Confidence
                        </h1>
                        <p class="text-xl text-gray-400 mb-12">
                            Access professional trading education, market analysis, and expert insights to enhance your trading journey.
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                            ${s.map((e,a)=>`
                                <div class="p-6 rounded-2xl bg-brand-black/50 backdrop-blur border border-brand-primary/10">
                                    <i class="fas fa-${e.icon} text-2xl text-brand-primary mb-4"></i>
                                    <div class="stat-value-${a} text-3xl font-bold text-white mb-2">0</div>
                                    <div class="text-gray-400">${e.label}</div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                </div>
            </section>
            ${c()}

            <!-- Courses Section -->
            <section class="py-20">
                <div class="container mx-auto px-4">
                    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h2 class="text-3xl font-bold text-white mb-4">Featured Courses</h2>
                            <p class="text-gray-400 max-w-2xl">
                                Start your trading journey with our comprehensive courses designed by industry experts.
                            </p>
                        </div>
                        <div class="flex gap-4">
                            <button class="px-6 py-2 rounded-xl bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                                All Courses
                            </button>
                            <button class="px-6 py-2 rounded-xl bg-brand-black/50 text-white hover:bg-brand-black/70 transition-colors">
                                Popular
                            </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        ${g.map(e=>`
                            <div class="course-card group rounded-2xl bg-brand-black/50 border border-brand-primary/10 p-6 transition-all">
                                <div class="flex items-center gap-4 mb-6">
                                    <div class="w-12 h-12 rounded-xl bg-${e.color}-500/10 flex items-center justify-center">
                                        <i class="fas fa-${e.icon} text-${e.color}-500"></i>
                                    </div>
                                    <div>
                                        <span class="text-sm text-gray-400 capitalize">${e.category}</span>
                                        <h3 class="text-lg font-semibold text-white">${e.title}</h3>
                                    </div>
                                </div>
                                <p class="text-gray-400 mb-6">${e.description}</p>
                                <div class="flex items-center justify-between pt-4 border-t border-brand-primary/10">
                                    <div class="flex items-center gap-4">
                                        <span class="text-sm text-gray-400">
                                            <i class="fas fa-book-open mr-2"></i>${e.lessons} lessons
                                        </span>
                                        <span class="text-sm text-gray-400">
                                            <i class="fas fa-clock mr-2"></i>${e.duration}
                                        </span>
                                    </div>
                                    <button class="w-8 h-8 rounded-full bg-brand-primary/10 text-brand-primary 
                                                   group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
                                        <i class="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="py-20 bg-brand-black relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent"></div>
                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-4xl mx-auto bg-brand-black/80 backdrop-blur rounded-2xl p-8 border border-brand-primary/10">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-white mb-6">
                                Ready to Start Learning?
                            </h2>
                            <p class="text-gray-400 mb-8">
                                Join thousands of traders who are already learning and trading with Olymp AI Invest.
                            </p>
                            <div class="flex flex-col sm:flex-row justify-center gap-4">
                                <a href="/signup" data-nav 
                                   class="px-8 py-4 rounded-xl bg-brand-primary text-brand-dark font-semibold 
                                          hover:bg-brand-primary/90 transition-colors">
                                    Create Free Account
                                </a>
                                <a href="/markets" data-nav 
                                   class="px-8 py-4 rounded-xl border border-brand-primary text-brand-primary 
                                          hover:bg-brand-primary/10 transition-colors">
                                    Explore Markets
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            ${l().html}
        </main>
        `,pageEvents:n}};export{$ as default};
//# sourceMappingURL=education-BGdfLy2I.js.map
