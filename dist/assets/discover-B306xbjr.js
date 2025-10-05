import{a as u}from"./auth-CPTav_8h.js";import{a as v,b as f}from"./reset-3f-UIG5W.js";import{N as w}from"./Navbar-Cnbg9OVi.js";import{s as r}from"./supabaseClients-B0wRxRlI.js";import{t as x}from"./analtics-CjlshyU7.js";import"./spinner-DaVCJ9xF.js";import"./toastify-C88f8oFV.js";import"./index-Blc0Txpr.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const N=async()=>{if(!await u.check("discover"))return{html:"",pageEvents:()=>{}};v("Olymp AI | Discover"),f(),await x();const{html:s,pageEvents:n}=w(),{data:{user:c}}=await r.auth.getUser(),{data:l}=await r.from("profiles").select("full_name").eq("id",c.id).single(),d=()=>{const e=new Date().getHours();return e<12?"Good Morning":e<18?"Good Afternoon":"Good Evening"},i={tickerTape:{widget:"ticker-tape",containerId:"ticker_tape",config:{colorTheme:"dark",isTransparent:!1,showSymbolLogo:!0,displayMode:"adaptive",locale:"en",symbols:[{proName:"BITSTAMP:BTCUSD",title:"Bitcoin"},{proName:"BITSTAMP:ETHUSD",title:"Ethereum"},{proName:"FOREXCOM:SPXUSD",title:"S&P 500"},{proName:"FX_IDC:EURUSD",title:"EUR/USD"},{proName:"OANDA:XAUUSD",title:"Gold"}]}},marketQuotes:{widget:"market-quotes",containerId:"market_quotes",config:{width:"100%",height:"400",locale:"en",colorTheme:"dark",isTransparent:!1,showSymbolLogo:!0}},hotlists:{widget:"hotlists",containerId:"market_hotlists",config:{colorTheme:"dark",isTransparent:!1,showChart:!0,locale:"en",width:"100%",height:"400",dateRange:"12M"}},forexCross:{widget:"forex-cross-rates",containerId:"forex_cross_rates",config:{width:"100%",height:"400",colorTheme:"dark",isTransparent:!1,currencies:["EUR","USD","JPY","GBP","CHF","AUD","CAD","NZD"]}}},m=e=>new Promise(o=>{const a=document.getElementById(e.containerId);if(a){const t=document.createElement("script");t.src=`https://s3.tradingview.com/external-embedding/embed-widget-${e.widget}.js`,t.type="text/javascript",t.async=!0,t.innerHTML=JSON.stringify(e.config),t.onload=()=>o(),a.appendChild(t)}});async function p(){try{await Promise.all(Object.values(i).map(e=>m(e)))}catch(e){console.error("Error initializing widgets:",e)}}async function h(){await n(),await p();const e=window.matchMedia("(min-width: 768px)"),o=a=>{document.querySelectorAll(".widget-container").forEach(g=>{g.style.height=a.matches?"400px":"300px"})};e.addListener(o),o(e)}return{html:`
            ${s}
            <main class="main-scroll-view flex-1">
                <!-- Ticker Tape - Fixed at top -->
                <div class="sticky top-0 z-10 h-24 lg:px-6 lg:mx-auto">
                    <div id="${i.tickerTape.containerId}"></div>
                </div>

                <!-- User Greeting -->
                <div class="p-4 pt-20 md:p-6 md:pt-8">
                    <h1 class="text-2xl font-bold text-white">
                        ${d()}, ${l?.full_name?.split(" ")[0]||"Trader"}!
                    </h1>
                    <p class="text-gray-400 mt-1">Here's your market overview</p>
                </div>

                <!-- Market Overview Sections -->
                <div class="p-4 md:p-6 space-y-6 pb-14 lg:pb-0">
                    <!-- Market Quotes Section -->
                    <section class="widget-container rounded-lg overflow-hidden">
                        <h2 class="text-xl font-semibold text-white mb-4">Market Overview</h2>
                        <div id="${i.marketQuotes.containerId}" class="h-full"></div>
                    </section>

                    <!-- Two Column Layout -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <!-- Hotlists -->
                        <section class="widget-container rounded-lg overflow-hidden">
                            <h2 class="text-xl font-semibold text-white mb-4">Top Movers</h2>
                            <div id="${i.hotlists.containerId}" class="h-full"></div>
                        </section>

                        <!-- Forex Cross Rates -->
                        <section class="widget-container rounded-lg overflow-hidden">
                            <h2 class="text-xl font-semibold text-white mb-4">Forex Overview</h2>
                            <div id="${i.forexCross.containerId}" class="h-full"></div>
                        </section>
                    </div>
                </div>
            </main>
        `,pageEvents:h}};export{N as default};
//# sourceMappingURL=discover-B306xbjr.js.map
