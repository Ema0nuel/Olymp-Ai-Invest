import{a as L}from"./auth-IGyDQ3pF.js";import{a as M}from"./reset-3f-UIG5W.js";import{N as F}from"./Navbar-CJU9E0Tv.js";import{M as g}from"./Modal-jvk0lnFM.js";import{t as p}from"./toastify-C88f8oFV.js";import{f as r}from"./formatters-CtERY4B5.js";import{s as l}from"./supabaseClients-BL8TJKO9.js";import{t as I}from"./analtics-D3HxoDr9.js";import{S as D,E as j,B as f}from"./sol-CyENyCty.js";import{B as A}from"./bnb-DZcecBIT.js";import"./spinner-DaVCJ9xF.js";import"./index-DJYm-znp.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const w={"BTC/USDT":f,"ETH/USDT":j,"BNB/USDT":A,"SOL/USDT":D};function U(){return`
        .modal-content {
            min-width: 320px;
            max-width: 90vw;
            max-height: 90vh;
            overflow-y: auto;
        }

        #tradingview_widget {
            background: #131722;
            min-height: 400px;
            position: relative;
            z-index: 1;
        }

        .trading-view-container {
            position: relative;
            width: 100%;
            height: 400px;
            overflow: hidden;
        }
    `}function v(){return new Promise(d=>{if(window.TradingView){d(window.TradingView);return}const i=document.createElement("script");i.type="text/javascript",i.src="https://s3.tradingview.com/tv.js",i.async=!0,i.onload=()=>{d(window.TradingView)},i.onerror=m=>{console.error("Failed to load TradingView:",m),d(null)},document.head.appendChild(i)})}const Z=async()=>{if(!await L.check("copyTrade"))return{html:"",pageEvents:()=>{}};M("Olymp AI | Copy Trading"),await I();const{html:i,pageEvents:m}=F(),{data:{user:h}}=await l.auth.getUser(),{data:x}=await l.from("trading_accounts").select("balance").eq("user_id",h.id).eq("account_type","live").single(),{data:b,error:T}=await l.from("trading_bots").select(`
            *,
            creator:profiles(full_name),
            bot_trades(
                pair,
                pnl,
                created_at,
                status
            )
        `).eq("status","active").order("total_profit",{ascending:!1});if(T)return p({text:"Error loading trading bots",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"}),{html:"",pageEvents:()=>{}};const y=b.map(t=>({...t,lastTrades:t.bot_trades.sort((e,a)=>new Date(a.created_at)-new Date(e.created_at)).slice(0,3).map(e=>({pair:e.pair,pnl:e.pnl,status:e.status,time:new Intl.RelativeTimeFormat("en").format(Math.round((new Date(e.created_at)-new Date)/(1e3*60)),"minutes")}))}));function _(t){v().then(()=>{const e=t.lastTrades[0]?.pair?.replace("/","")||"BTCUSDT";new g({title:`Copy Trade ${t.name}`,content:`
                <div class="space-y-6">
                    <div class="w-full h-[400px] bg-[#131722] rounded-xl overflow-hidden" 
                         style="position:relative;">
                        <div id="tradingview_widget" 
                            style="width:100%; height:100%; position:absolute; top:0; left:0;">
                        </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-4 bg-brand-primary/10 rounded-xl">
                        <div class="flex items-center gap-3">
                            <img src="${w[t.lastTrades[0]?.pair]||f}" 
                                 class="w-10 h-10 rounded-full" alt="${t.name}">
                            <div>
                                <h4 class="text-white font-medium">${t.name}</h4>
                                <p class="text-sm text-gray-400">Win Rate: ${t.win_rate}%</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <p class="text-${t.total_profit>=0?"green":"red"}-500 font-medium">
                                ${r(t.total_profit)}
                            </p>
                            <p class="text-sm text-gray-400">${t.total_trades} trades</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <label class="text-sm text-gray-400 mb-2 block">Allocation Amount (USDT)</label>
                            <input type="number" id="allocation" min="${t.min_allocation||10}" max="${Math.min(t.max_allocation||1e4,x?.balance||0)}"
                                   class="w-full bg-brand-black/50 border border-brand-primary/20 rounded-xl px-4 py-3
                                          text-white focus:border-brand-primary transition-colors"
                                   placeholder="Enter amount...">
                            <p class="text-xs text-gray-400 mt-1">Available: ${r(x?.balance||0)}</p>
                        </div>

                        <div>
                            <label class="text-sm text-gray-400 mb-2 block">Stop Loss (%)</label>
                            <input type="number" id="stopLoss" min="1" max="100"
                                   class="w-full bg-brand-black/50 border border-brand-primary/20 rounded-xl px-4 py-3
                                          text-white focus:border-brand-primary transition-colors"
                                   placeholder="Enter stop loss...">
                        </div>
                    </div>

                    <div class="p-4 bg-yellow-500/10 rounded-xl">
                        <h4 class="text-yellow-500 font-medium mb-2">Risk Summary</h4>
                        <ul class="text-sm text-gray-400 space-y-2">
                            <li>• Maximum possible loss: <span id="maxLoss">-</span></li>
                            <li>• Estimated monthly return: <span id="estReturn">-</span></li>
                            <li>• Trading fee: 2% of profits</li>
                        </ul>
                    </div>

                    <div id="tradeInfo"></div>
                </div>
            `,size:"lg",actions:[{text:"Start Copy Trading",primary:!0,onClick:s=>E(t,s)}]}).show(),requestAnimationFrame(()=>{try{C(e),$(t)}catch(s){console.error("Failed to initialize trading view:",s);const o=document.getElementById("tradingview_widget");o&&(o.innerHTML='<div class="p-4 text-center text-red-500">Failed to load chart</div>')}})})}function C(t="BTCUSDT"){const e=document.getElementById("tradingview_widget");if(!e){console.error("Container not found");return}e.innerHTML="";try{return new window.TradingView.widget({container_id:"tradingview_widget",autosize:!1,width:e.offsetWidth,height:e.offsetHeight,symbol:`BINANCE:${t}`,interval:"15",timezone:"Etc/UTC",theme:"dark",style:"1",locale:"en",toolbar_bg:"#131722",enable_publishing:!1,hide_side_toolbar:!1,allow_symbol_change:!0,save_image:!1,hideideas:!0})}catch(a){console.error("Widget creation error:",a),e.innerHTML='<div class="p-4 text-center text-red-500">Failed to initialize chart</div>'}}function $(t){const e=document.getElementById("allocation"),a=document.getElementById("stopLoss"),s=document.getElementById("maxLoss"),o=document.getElementById("estReturn");function n(){const c=parseFloat(e.value)||0,u=parseFloat(a.value)||0;s.textContent=r(-(c*(u/100))),o.textContent=r(c*.15)}e?.addEventListener("input",n),a?.addEventListener("input",n)}async function E(t,e){const a=document.getElementById("allocation")?.value,s=document.getElementById("stopLoss")?.value;if(!a||!s){p({text:"Please fill in all fields",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"});return}if(!await k(t,parseFloat(a),parseFloat(s)))return;const{data:{user:n}}=await l.auth.getUser(),{error:c}=await l.from("copy_trade_subscriptions").insert({user_id:n.id,bot_id:t.id,allocation_amount:parseFloat(a),stop_loss:parseFloat(s),status:"active",created_at:new Date().toISOString()});if(c){p({text:"Failed to start copy trading",background:"bg-red-500/10",icon:"fas fa-exclamation-circle"});return}p({text:`Successfully started copy trading ${t.name}`,background:"bg-green-500/10",icon:"fas fa-check-circle"});const u=new g({title:"Copy Trade Started",content:`
            <div class="space-y-6 text-center">
                <div class="text-green-500">
                    <svg class="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <h3 class="text-xl font-medium text-white">Successfully Started Copy Trading</h3>
                <p class="text-gray-400">
                    Your copy trade has been set up successfully. You can monitor your positions
                    and performance in the Copy Trading dashboard.
                </p>
                <button onclick="window.location.href='/copy-trade'"
                        class="px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-opacity-90">
                    View Copy Trading Dashboard
                </button>
            </div>
        `});e(),u.show()}async function k(t,e,a){return new Promise(s=>{new g({title:"Confirm Copy Trade",content:`
                <div class="space-y-6">
                    <div class="p-4 bg-brand-primary/10 rounded-xl">
                        <h4 class="text-lg font-medium text-white mb-2">Summary</h4>
                        <ul class="space-y-2 text-sm text-gray-400">
                            <li class="flex justify-between">
                                <span>Bot:</span>
                                <span class="text-white">${t.name}</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Allocation:</span>
                                <span class="text-white">${r(e)}</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Stop Loss:</span>
                                <span class="text-white">${a}%</span>
                            </li>
                            <li class="flex justify-between">
                                <span>Max Loss:</span>
                                <span class="text-red-500">${r(-(e*(a/100)))}</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="bg-yellow-500/10 p-4 rounded-xl">
                        <h4 class="text-yellow-500 font-medium mb-2">Important Notice</h4>
                        <p class="text-sm text-gray-400">
                            By confirming, you agree to allocate funds to copy this trader's positions.
                            The stop loss will automatically close positions if losses exceed ${a}%.
                        </p>
                    </div>
                </div>
            `,actions:[{text:"Cancel",onClick:n=>{n(),s(!1)}},{text:"Confirm Copy Trade",primary:!0,onClick:async n=>{n(),s(!0)}}]}).show()})}function S(t){return`
            <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl border border-brand-primary/10
                        hover:border-brand-primary/30 transition-all duration-300">
                <div class="p-6 space-y-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                            <img src="${w[t.lastTrades[0]?.pair]||f}" 
                                 class="w-10 h-10 rounded-full" alt="${t.name}">
                            <div>
                                <h3 class="text-lg font-medium text-white">${t.name}</h3>
                                <p class="text-sm text-gray-400">Created by ${t.creator?.full_name||"N/A"}</p>
                            </div>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-500">
                            ${t.status}
                        </span>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div>
                            <p class="text-gray-400 text-sm">Profit</p>
                            <p class="text-${t.total_profit>=0?"green":"red"}-500 font-medium">
                                ${r(t.total_profit)}
                            </p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Win Rate</p>
                            <p class="text-white font-medium">${t.win_rate}%</p>
                        </div>
                        <div>
                            <p class="text-gray-400 text-sm">Trades</p>
                            <p class="text-white font-medium">${t.total_trades}</p>
                        </div>
                    </div>
                    <div class="space-y-2">
                        <p class="text-sm text-gray-400">Recent Trades</p>
                        ${t.lastTrades.map(e=>`
                            <div class="flex items-center justify-between text-sm">
                                <span class="text-white">${e.pair}</span>
                                <span class="text-${e.pnl>=0?"green":"red"}-500">
                                    ${r(e.pnl)}
                                </span>
                            </div>
                        `).join("")}
                    </div>
                    <button onclick="window.showCopyTradeModal('${t.id}')"
                            class="w-full px-4 py-3 rounded-xl bg-brand-primary text-white font-medium
                                   hover:bg-opacity-90 transition-colors">
                        Copy Trade
                    </button>
                </div>
            </div>
        `}function B(){m(),v(),window.showCopyTradeModal=t=>{const e=y.find(a=>a.id===t);e&&_(e)}}return{html:`
            ${i}
            <main class="main-scroll-view">
                <div class="p-4 md:p-8 max-w-7xl mx-auto">
                    <div class="mb-8">
                        <h1 class="text-2xl font-bold text-white mb-2">Copy Trading</h1>
                        <p class="text-gray-400">Follow and copy successful traders automatically</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <style>
                            ${U()}
                        </style>
                        ${y.map(S).join("")}
                    </div>
                </div>
            </main>
        `,pageEvents:B}};export{Z as default};
//# sourceMappingURL=copyTrade-Cvgyu3sb.js.map
