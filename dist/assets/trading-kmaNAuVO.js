import{N as l,F as o}from"./Navbar-DHujhqfN.js";import{a as d,b as c}from"./reset-3f-UIG5W.js";import{t as m}from"./trade-DvAE_Drd.js";import{W as p}from"./621506e9a1183737fff2f2b8_NFT's _ Metaverse-CtPoGJaq.js";import{r as b}from"./banner-D6N_IK2I.js";import{t as g}from"./analtics-D3HxoDr9.js";import"./logo-9_xFcp4C.js";import"./supabaseClients-BL8TJKO9.js";import"./index-DJYm-znp.js";const v="/assets/621506e9a118372908f2f33e_everything-thumbnail-image-0ZaBLYfx.jpeg",f="/assets/621506e9a118371ef8f2f224_Decentralised-finance-BLTfBG1r.png",u="/assets/621506e9a11837332ef2f241_A%20complete%20guide%20to%20NFT's-bt_PwNZ0.png",y=[{title:"Everything you might have missed in January",subtitle:"Olymp AI Invest | January Recap",image:v,date:"February 1, 2024"},{title:"Decentralised Finance (DeFi) – The twenty-first century way of managing your finances",subtitle:"Olymp AI Invest | The twenty-first century way of managing your finances",image:f,date:"December 10, 2024"},{title:"A Complete Guide to NFTs",subtitle:"Olymp AI Invest | A Complete Guide to NFTs",image:p,date:"December 3, 2024"},{title:"A Complete Guide to the Metaverse - The World between Technology and Reality",subtitle:"Olymp AI Invest | A Complete Guide to the Metaverse",image:u,date:"November 26, 2024"}],D=async()=>{d("Olymp AI Invests Trades"),c(),await g();const{html:a,pageEvents:r}=l(),{html:s,pageEvents:i}=m();function n(){r(),i(),document.querySelectorAll(".blog-card").forEach(e=>{e.addEventListener("mouseenter",()=>{e.classList.add("transform","scale-[1.02]","shadow-xl")}),e.addEventListener("mouseleave",()=>{e.classList.remove("transform","scale-[1.02]","shadow-xl")})});const t=document.getElementById("tradingview-banner");if(t){const e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",e.innerHTML=JSON.stringify({symbols:[{proName:"FOREXCOM:SPXUSD",title:"S&P 500 Index"},{proName:"FOREXCOM:NSXUSD",title:"US 100 Cash CFD"},{proName:"FX_IDC:EURUSD",title:"EUR to USD"},{proName:"BITSTAMP:BTCUSD",title:"Bitcoin"},{proName:"BITSTAMP:ETHUSD",title:"Ethereum"},{proName:"NSE:NIFTY",title:"Nifty"}],colorTheme:"dark",locale:"en",largeChartUrl:"",isTransparent:!1,showSymbolLogo:!0,displayMode:"adaptive"}),t.querySelector(".tradingview-widget-container__widget").appendChild(e)}}return{html:`
        ${a}
        <div class="taper-banner w-full">
            ${b()}
        </div>
        <!-- Banner Section -->
        <section class="relative bg-cover bg-center py-20" 
                 style="background-image: url('https://softivus.com/wp/tradly/wp-content/uploads/2025/05/Breadcrumbs-Area-1-min.png')">
            <div class="absolute inset-0 bg-black/70"></div>
            <div class="container mx-auto px-4 relative z-10">
                <div class="text-center">
                    <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">Trading & Analysis</h2>
                    <nav aria-label="breadcrumb" class="flex justify-center">
                        <ol class="flex gap-2 text-gray-300">
                            <li><a href="/" data-nav class="hover:text-brand-primary">Home</a></li>
                            <li>&gt;</li>
                            <li class="text-brand-primary">Trading</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>

        <!-- Trading Widgets Section -->
        ${s}

        <!-- Blog Section -->
        <section class="py-20 bg-brand-dark">
            <div class="container mx-auto px-4">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">Latest Trading Insights</h2>
                    <p class="text-gray-400">Stay updated with our latest market analysis and trading strategies</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${y.map(t=>`
                        <a data-nav 
                           class="blog-card group bg-brand-blue/10 rounded-xl overflow-hidden border border-brand-primary/20 
                                  transition-all duration-300">
                            <div class="aspect-w-16 aspect-h-9 overflow-hidden">
                                <img src="${t.image}" alt="${t.title}" 
                                     class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                            </div>
                            <div class="p-6">
                                <h3 class="text-xl font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                                    ${t.title}
                                </h3>
                                <p class="text-gray-400 text-sm mb-4">${t.subtitle}</p>
                                <div class="flex items-center justify-between">
                                    <span class="text-brand-primary text-sm">${t.date}</span>
                                    <span class="text-white group-hover:translate-x-2 transition-transform">
                                        <i class="fas fa-paper-plane"></i>
                                    </span>
                                </div>
                            </div>
                        </a>
                    `).join("")}
                </div>

                <div class="text-center mt-12">
                    <a href="/markets" data-nav 
                       class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-blue font-bold 
                              rounded-xl hover:bg-opacity-90 transition-all">
                        View All Markets Stats
                        <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-brand-black">
            <div class="container mx-auto px-4">
                <div class="bg-brand-blue/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center 
                            justify-between gap-8 border border-brand-primary/20">
                    <div>
                        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
                            Ready to Start Trading?
                        </h2>
                        <p class="text-gray-300">
                            Join thousands of traders and start your journey today
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-4">
                        <a href="/signup" data-nav 
                           class="inline-flex items-center px-8 py-4 bg-brand-primary text-brand-blue 
                                  font-bold rounded-xl hover:bg-opacity-90 transition-all">
                            Open Account
                            <i class="fas fa-user-plus ml-2"></i>
                        </a>
                        <a href="/login" data-nav 
                           class="inline-flex items-center px-8 py-4 border-2 border-brand-primary 
                                  text-brand-primary font-bold rounded-xl hover:bg-brand-primary/10 transition-all">
                            Try Demo
                            <i class="fas fa-play-circle ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        ${o().html}
    `,pageEvents:n}};export{D as default};
//# sourceMappingURL=trading-kmaNAuVO.js.map
