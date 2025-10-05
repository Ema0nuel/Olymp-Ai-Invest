import{N as p,F as m}from"./Navbar-DHujhqfN.js";import{r as g}from"./banner-D6N_IK2I.js";import{a as u,b}from"./reset-3f-UIG5W.js";import{t as x}from"./analtics-CjlshyU7.js";import"./logo-9_xFcp4C.js";import"./supabaseClients-B0wRxRlI.js";import"./index-Blc0Txpr.js";function v(){const t=document.getElementById("tradingview-widget");t&&(t.innerHTML=`
            <div class="relative w-full max-w-4xl mx-auto p-2 rounded-2xl border border-[#f1d416] bg-transparent backdrop-blur-md shadow-lg hover:shadow-[0_0_20px_#f1d416] transition duration-300">
                <iframe 
                    scrolling="no" 
                    allowtransparency="true" 
                    frameborder="0"
                    src="https://www.tradingview-widget.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%221D%22%2C%22showChart%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A361%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22tabs%22%3A%5B%7B%22title%22%3A%22Instruments%22%2C%22symbols%22%3A%5B%7B%22s%22%3A%22FX%3AEURUSD%22%7D%2C%7B%22s%22%3A%22FX%3AGBPUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDJPY%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCHF%22%7D%2C%7B%22s%22%3A%22FX%3AAUDUSD%22%7D%2C%7B%22s%22%3A%22FX%3AUSDCAD%22%7D%5D%7D%5D%7D"
                    title="market overview TradingView widget" 
                    lang="en"
                    class="w-full h-[361px] rounded-2xl border-none bg-transparent">
                </iframe>
            </div>
        `)}function f(){[{selector:".stat-volume",value:8200,suffix:"B+"},{selector:".stat-traders",value:3500,suffix:"M+"},{selector:".stat-countries",value:195,suffix:"+"},{selector:".stat-instruments",value:250,suffix:"+"}].forEach(e=>{const r=document.querySelector(e.selector);if(r){let l=function(d){n||(n=d);const o=Math.min((d-n)/i,1),c=Math.floor(o*(a-s)+s);r.textContent=c.toLocaleString()+e.suffix,o<1&&requestAnimationFrame(l)},s=0;const a=e.value,i=1200;let n;requestAnimationFrame(l)}})}function y(){const t=document.querySelectorAll("[data-filter]"),e=document.querySelectorAll(".news-item");t.forEach(r=>{r.addEventListener("click",()=>{t.forEach(a=>a.classList.remove("bg-brand-primary","text-brand-blue")),r.classList.add("bg-brand-primary","text-brand-blue");const s=r.dataset.filter;e.forEach(a=>{s==="all"||a.dataset.category===s?a.style.display="flex":a.style.display="none"})})})}function h(){document.querySelectorAll(".market-card").forEach(t=>{t.addEventListener("mouseenter",()=>{t.classList.add("shadow-xl","border-brand-primary","scale-105")}),t.addEventListener("mouseleave",()=>{t.classList.remove("shadow-xl","border-brand-primary","scale-105")})})}function w(t){return`
        <div class="flex flex-col items-center bg-brand-blue/10 rounded-xl p-6">
            <span class="stat-volume text-3xl font-bold text-brand-primary mb-2">0</span>
            <span class="text-gray-300">Daily Volume</span>
        </div>
        <div class="flex flex-col items-center bg-brand-blue/10 rounded-xl p-6">
            <span class="stat-traders text-3xl font-bold text-brand-primary mb-2">0</span>
            <span class="text-gray-300">Active Traders</span>
        </div>
        <div class="flex flex-col items-center bg-brand-blue/10 rounded-xl p-6">
            <span class="stat-countries text-3xl font-bold text-brand-primary mb-2">0</span>
            <span class="text-gray-300">Countries</span>
        </div>
        <div class="flex flex-col items-center bg-brand-blue/10 rounded-xl p-6">
            <span class="stat-instruments text-3xl font-bold text-brand-primary mb-2">0</span>
            <span class="text-gray-300">Instruments</span>
        </div>
    `}function k(){return[{image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market-4.png",title:"The Day Trader’s Lifestyle: Freedom and Flexibility",desc:"The dollar index extended gains to above 107, its strongest level since November and tracking Treasury yields higher hawkish extended period.",date:"February 11, 2024",category:"trading-lifestyle"},{image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market2-4.png",title:"Building Your Trading Plan: A Roadmap to Profitability",desc:"The dollar index extended gains to above 107, its strongest level since November and tracking Treasury yields higher hawkish extended period.",date:"February 11, 2024",category:"strategy"},{image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market3-3.png",title:"Risk Management 101: Protecting Your Capital in Trading",desc:"The dollar index extended gains to above 107, its strongest level since November and tracking Treasury yields higher hawkish extended period.",date:"February 11, 2025",category:"education"},{image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market4-3.png",title:"Crypto Craze: A Comprehensive Guide to Cryptocurrency Trading",desc:"The dollar index extended gains to above 107, its strongest level since November and tracking Treasury yields higher hawkish extended period.",date:"February 11, 2024",category:"crypto"},{image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market5-2.png",title:"Trading Pitfalls: Common Mistakes and How to Avoid Them",desc:"The dollar index extended gains to above 107, its strongest level since November and tracking Treasury yields higher hawkish extended period.",date:"February 11, 2024",category:"technical-analysis"},{image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market6-4.png",title:"Chart Analysis Mastery Reading the Language of the Markets",desc:"The dollar index extended gains to above 107, its strongest level since November and tracking Treasury yields higher hawkish extended period.",date:"February 11, 2024",category:"market-analysis"}].map(e=>`
        <div class="market-card flex flex-col gap-6 bg-brand-blue/10 rounded-xl p-6 border border-brand-blue/20 transition-all duration-300 cursor-pointer" data-category="${e.category}">
            <div class="w-full md:w-48 flex-shrink-0">
                <img src="${e.image}" alt="${e.title}" class="w-full h-32 object-cover rounded-lg transition-all duration-300 hover:scale-105">
            </div>
            <div class="flex-grow">
                <h4 class="text-xl font-bold text-white mb-2">${e.title}</h4>
                <p class="text-gray-400 mb-2">${e.desc}</p>
                <span class="text-sm text-brand-primary">${e.date}</span>
            </div>
        </div>
    `).join("")}function A(){return[{id:"all",label:"All"},{id:"trading-lifestyle",label:"Lifestyle"},{id:"strategy",label:"Strategy"},{id:"education",label:"Education"},{id:"crypto",label:"Crypto"},{id:"technical-analysis",label:"Technical"},{id:"market-analysis",label:"Market"}].map(e=>`
        <button data-filter="${e.id}" class="px-4 py-2 rounded-lg text-sm font-semibold bg-brand-blue/10 text-white hover:bg-brand-primary hover:text-brand-blue transition-all">${e.label}</button>
    `).join("")}function T(t){return t.map(e=>`
        <div class="news-item flex flex-col gap-6 bg-brand-blue/10 rounded-xl p-6 border border-brand-blue/20 transition-all duration-300" data-category="${e.category}">
            <div class="w-full md:w-48 flex-shrink-0">
                <img src="${e.image}" alt="${e.title}" class="w-full h-32 object-cover rounded-lg transition-all duration-300 hover:scale-105">
            </div>
            <div class="flex-grow">
                <h4 class="text-xl font-bold text-white mb-2">${e.title}</h4>
                <p class="text-gray-400 mb-2">${e.excerpt}</p>
                <span class="text-sm text-brand-primary">${e.date}</span>
            </div>
        </div>
    `).join("")}function C(t){return t.map(e=>`
        <div class="flex gap-4 items-center p-4 rounded-lg hover:bg-brand-blue/20 transition-all">
            <img src="${e.image}" alt="${e.title}" class="w-16 h-16 rounded-lg object-cover">
            <div>
                <h4 class="text-white font-medium hover:text-brand-primary transition-colors">
                    <a data-nav>${e.title}</a>
                </h4>
                <span class="text-sm text-gray-400">${e.date}</span>
            </div>
        </div>
    `).join("")}const B=async()=>{u("Olymp AI Invests and Analysis"),b(),await x();const{html:t,pageEvents:e}=p(),r=[{id:1,title:"The Day Trader's Lifestyle: Freedom and Flexibility",image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market-4.png",date:"August 19, 2025",excerpt:"Discover how successful day traders are achieving work-life balance while maximizing their trading potential on Olymp AI Invest.",category:"trading-lifestyle"},{id:2,title:"Building Your Trading Plan: A Roadmap to Profitability",image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market2-4.png",date:"August 19, 2025",excerpt:"Learn the essential components of a successful trading plan and how to implement them effectively.",category:"strategy"},{id:3,title:"Risk Management 101: Protecting Your Capital",image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market3-3.png",date:"August 18, 2025",excerpt:"Master the fundamentals of risk management and discover proven techniques to preserve your trading capital.",category:"education"},{id:4,title:"Cryptocurrency Market Analysis and Trends",image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market4-3.png",date:"August 18, 2025",excerpt:"Stay updated with the latest cryptocurrency market trends and expert analysis for informed trading decisions.",category:"crypto"},{id:5,title:"Advanced Technical Analysis Techniques",image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market5-2.png",date:"August 17, 2025",excerpt:"Enhance your technical analysis skills with advanced charting patterns and indicators.",category:"technical-analysis"},{id:6,title:"Global Market Trends and Opportunities",image:"https://softivus.com/wp/tradly/wp-content/uploads/2024/02/market6-4.png",date:"August 17, 2025",excerpt:"Explore emerging market trends and discover new trading opportunities across global markets.",category:"market-analysis"}];function s(){e(),v(),f(),y(),h();const a=document.getElementById("tradingview-banner");if(a){const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",i.innerHTML=JSON.stringify({symbols:[{proName:"FOREXCOM:SPXUSD",title:"S&P 500 Index"},{proName:"FOREXCOM:NSXUSD",title:"US 100 Cash CFD"},{proName:"FX_IDC:EURUSD",title:"EUR to USD"},{proName:"BITSTAMP:BTCUSD",title:"Bitcoin"},{proName:"BITSTAMP:ETHUSD",title:"Ethereum"},{proName:"NSE:NIFTY",title:"Nifty"}],colorTheme:"dark",locale:"en",largeChartUrl:"",isTransparent:!1,showSymbolLogo:!0,displayMode:"adaptive"}),a.querySelector(".tradingview-widget-container__widget").appendChild(i)}}return{html:`
        ${t}
        <div class="taper-banner w-full">
            ${g()}
        </div>
        <main class="flex flex-col min-h-screen">
            <section class="relative py-20 bg-cover bg-center" 
                     style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-brand-black/90"></div>
                <div class="container mx-auto px-4 relative z-10">
                    <div class="max-w-4xl mx-auto text-center">
                        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                            Discover Global Market Opportunities
                        </h1>
                        <p class="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
                            Access real-time market data, expert analysis, and trade multiple assets on Olymp AI Invest's advanced trading platform.
                        </p>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            ${w()}
                        </div>
                        <div class="flex flex-wrap justify-center gap-4">
                            <a href="/login" data-nav class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-blue font-bold rounded-xl hover:bg-opacity-90 transition-all">
                                Start Trading
                                <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                            <a href="/market-overview" data-nav class="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all">
                                Market Overview
                                <i class="fas fa-chart-line ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="market-overview" class="py-16">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div class="lg:col-span-2">
                            <div class="bg-brand-blue/5 rounded-2xl p-6 mb-8">
                                <h2 class="text-2xl font-bold text-white mb-6">Popular Markets</h2>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    ${k()}
                                </div>
                            </div>
                            <div class="bg-brand-blue/5 rounded-2xl p-6">
                                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                    <h2 class="text-2xl font-bold text-white">Latest Market News</h2>
                                    <div class="flex flex-wrap gap-2">
                                        ${A()}
                                    </div>
                                </div>
                                <div class="grid grid-cols-1 gap-6 news-grid">
                                    ${T(r)}
                                </div>
                            </div>
                        </div>
                        <div class="lg:col-span-1">
                            <div class="bg-brand-blue/5 rounded-2xl p-6 mb-8">
                                <h3 class="text-xl font-bold text-white mb-6">Market Summary</h3>
                                <div id="tradingview-widget" class="h-[500px]"></div>
                            </div>
                            <div class="bg-brand-blue/5 rounded-2xl p-6">
                                <h3 class="text-xl font-bold text-white mb-6">Recent Updates</h3>
                                ${C(r.slice(0,4))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-20 bg-black">
                <div class="container mx-auto px-4">
                    <div class="max-w-4xl mx-auto text-center">
                        <h2 class="text-3xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Trading?
                        </h2>
                        <p class="text-lg text-gray-300 mb-8">
                            Join millions of traders worldwide on Olymp AI Invest
                        </p>
                        <div class="flex flex-wrap justify-center gap-4">
                            <a href="/signup" data-nav 
                               class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-blue 
                                      font-bold rounded-xl hover:bg-opacity-90 transition-all">
                                Create Account
                                <i class="fas fa-user-plus ml-2"></i>
                            </a>
                            <a href="/login" data-nav 
                               class="inline-flex items-center px-8 py-4 border-2 border-brand-primary 
                                      text-brand-primary font-bold rounded-xl hover:bg-brand-primary/10 transition-all">
                                Check update trades
                                <i class="fas fa-play-circle ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            ${m().html}
        </main>
        `,pageEvents:s}};export{B as default};
//# sourceMappingURL=markets-B0uC2GD8.js.map
