import{a as p}from"./auth-CPTav_8h.js";import{a as u}from"./reset-3f-UIG5W.js";import{N as g}from"./Navbar-Cnbg9OVi.js";import{t as y}from"./analtics-CjlshyU7.js";import"./spinner-DaVCJ9xF.js";import"./toastify-C88f8oFV.js";import"./supabaseClients-B0wRxRlI.js";import"./index-Blc0Txpr.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";let c=!1,o=0;const d=3,s={advancedChart:{autosize:!0,symbol:"BITSTAMP:BTCUSD",interval:"D",timezone:"Etc/UTC",theme:"dark",style:"1",locale:"en",enable_publishing:!1,hide_side_toolbar:!1,allow_symbol_change:!0,studies:["MACD@tv-basicstudies"],container_id:"tradingview_chart",backgroundColor:"#1E222D",onReady:()=>console.log("Main chart loaded successfully")},technicalAnalysis:{symbol:"BITSTAMP:BTCUSD",showIntervalTabs:!0,interval:"1D",width:"100%",height:"400",timezone:"Etc/UTC",theme:"dark",style:"1",locale:"en",backgroundColor:"#1E222D",displayMode:"single"},cryptoMarket:{dataSource:"Crypto",width:"100%",height:"400",defaultColumn:"overview",screener_type:"crypto_mkt",displayCurrency:"USD",colorTheme:"dark",locale:"en",backgroundColor:"#1E222D"}};function w(e){return new Promise((t,n)=>{if(document.querySelector(`script[src="${e}"]`)){t();return}const a=document.createElement("script");a.src=e,a.async=!0,a.onload=t,a.onerror=()=>n(new Error(`Failed to load: ${e}`)),document.head.appendChild(a)})}async function h(e,t,n){await new Promise(i=>{const r=()=>{const l=document.getElementById(e);l?i(l):setTimeout(r,100)};r()});const a=document.getElementById(e);a.innerHTML="";try{if(n==="main")await w("https://s3.tradingview.com/tv.js"),await new Promise(i=>{const r=()=>{window.TradingView?i():setTimeout(r,100)};r()}),new TradingView.widget({...t,container_id:e});else{const i=document.createElement("script");i.type="text/javascript",i.async=!0,i.src=`https://s3.tradingview.com/external-embedding/embed-widget-${n}.js`,i.innerHTML=JSON.stringify(t),a.appendChild(i)}}catch(i){console.error(`Failed to create widget ${e}:`,i)}}async function m(){if(!(c||o>=d))try{o++,document.readyState!=="complete"&&await new Promise(t=>window.addEventListener("load",t)),await h("tradingview_chart",s.advancedChart,"main");const e=[{type:"technical-analysis",id:"technical_analysis_container",config:s.technicalAnalysis},{type:"screener",id:"crypto_market_container",config:s.cryptoMarket}];await Promise.all(e.map(t=>h(t.id,t.config,t.type))),c=!0,console.log("All widgets initialized successfully")}catch(e){console.error("Widget initialization failed:",e),o<d&&setTimeout(()=>m(),1e3)}}const S=async()=>{if(!await p.check("charts"))return{html:"",pageEvents:()=>{}};u("Olymp AI | Charts"),await y();const{html:t,pageEvents:n}=g();return{html:`
            ${t}
            <main class="main-scroll-view flex-1">
                <!-- Header Section -->
                <div class="p-4">
                    <h1 class="text-2xl font-bold text-white">Market Charts</h1>
                </div>

                <div class="h-full p-4 space-y-6">
                    <!-- Main Chart -->
                    <section class="rounded-lg overflow-hidden bg-[#1E222D]">
                        <div id="tradingview_chart" class="h-[600px] w-full"></div>
                    </section>

                    <!-- Technical Analysis & Market Data -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-16 lg:pb-0">
                        <section class="rounded-lg overflow-hidden p-4">
                            <h2 class="text-xl font-semibold text-white mb-4">Technical Analysis</h2>
                            <div id="technical_analysis_container" class="h-[400px]"></div>
                        </section>
                        
                        <section class="rounded-lg overflow-hidden p-4">
                            <h2 class="text-xl font-semibold text-white mb-4">Crypto Market</h2>
                            <div id="crypto_market_container" class="h-[400px]"></div>
                        </section>
                    </div>
                </div>
            </main>
        `,pageEvents:async()=>{n(),c||await m()}}};export{S as default};
//# sourceMappingURL=charts-DtvOp9yy.js.map
