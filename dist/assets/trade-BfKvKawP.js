import{a as P,h as i}from"./auth-IGyDQ3pF.js";import{a as I}from"./reset-3f-UIG5W.js";import{N as E}from"./Navbar-CJU9E0Tv.js";import{s as p}from"./supabaseClients-BL8TJKO9.js";import{M as A}from"./Modal-jvk0lnFM.js";import{t as n}from"./toastify-C88f8oFV.js";import{s as a}from"./spinner-DaVCJ9xF.js";import{l as v}from"./index-DJYm-znp.js";import{t as B}from"./analtics-D3HxoDr9.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";let c=null;const N=()=>new Promise(u=>{const l=document.createElement("script");l.type="text/javascript",l.src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",l.async=!0,l.onload=()=>u(),document.head.appendChild(l)}),H=async()=>{a.start();try{let h=function(){const e=document.getElementById("tradePanel");e&&(e.innerHTML=`
            <div class="h-full p-6 space-y-6">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-white">Start Trading</h2>
                    <div class="text-right">
                        <div class="text-sm text-gray-400">Available Balance</div>
                        <div class="text-xl font-bold text-white">$${r.userBalance.toFixed(2)}</div>
                    </div>
                </div>

                <form id="tradeForm" class="space-y-6">
                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">Select Asset</label>
                        <select id="tradeAsset" required
                                class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            <option value="USD">Trade with USD Balance ($${r.userBalance.toFixed(2)})</option>
                            ${r.userAssets.map(t=>`
                                        <option value="${t.assets.id}" 
                                                data-symbol="${t.assets.symbol}"
                                                data-balance="${t.balance}">
                                            ${t.assets.symbol} - Balance: ${t.balance.toFixed(8)}
                                        </option>
                                    `).join("")}
                        </select>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">Trade Amount</label>
                        <div class="relative">
                            <input type="number" id="tradeAmount" required
                                   min="1" step="0.00000001"
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white pr-20"
                                   placeholder="Enter amount">
                            <button type="button" onclick="window.setMaxAmount()"
                                    class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-xs
                                           bg-brand-primary/20 text-brand-primary rounded-lg hover:bg-brand-primary/30">
                                MAX
                            </button>
                        </div>
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm text-gray-400">Session Duration</label>
                        <select id="tradeDuration" required
                                class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            <option value="300">5 Minutes</option>
                            <option value="600">10 Minutes</option>
                            <option value="900">15 Minutes</option>
                            <option value="1200">20 Minutes</option>
                            <option value="1800">30 Minutes</option>
                            <option value="2700">45 Minutes</option>
                            <option value="3600">1 Hour</option>
                        </select>
                    </div>

                    <button type="submit" 
                            class="w-full p-4 bg-brand-primary text-white rounded-xl
                                   hover:bg-brand-primary/90 transition-colors">
                        <i class="fas fa-play-circle mr-2"></i>
                        Start Trading Session
                    </button>
                </form>
            </div>
        `,document.getElementById("tradeForm")?.addEventListener("submit",handleTradeSubmit),i.initializeTradingView(),document.getElementById("tradeAsset")?.addEventListener("change",t=>{const s=t.target.selectedOptions[0].dataset.symbol;s&&s!=="USD"&&i.initializeTradingView(s)}))},b=function(){const e=document.getElementById("tradePanel");e&&(e.innerHTML=`
            <div class="h-full p-6 space-y-6">
                <h2 class="text-2xl font-bold text-white">Active Trading Session</h2>
                
                <!-- Live Trade Info -->
                <div id="tradeInfo" class="space-y-4"></div>

                <!-- Take Profit / Stop Loss Controls -->
                <div class="space-y-4">
                    <div class="flex gap-4">
                        <input type="number" id="takeProfitAmount"
                               class="flex-1 p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                               placeholder="Take Profit Amount">
                        <button onclick="window.setTakeProfitTarget()"
                                class="px-6 py-4 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500/30">
                            <i class="fas fa-check mr-2"></i>Set TP
                        </button>
                    </div>
                    <div class="flex gap-4">
                        <input type="number" id="stopLossAmount"
                               class="flex-1 p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                               placeholder="Stop Loss Amount">
                        <button onclick="window.setStopLossTarget()"
                                class="px-6 py-4 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30">
                            <i class="fas fa-shield-alt mr-2"></i>Set SL
                        </button>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-4">
                    <button onclick="window.endTrade()"
                            class="p-4 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30">
                        <i class="fas fa-stop-circle mr-2"></i>End Session
                    </button>
                    <button onclick="window.takeProfitNow()"
                            class="p-4 bg-green-500/20 text-green-500 rounded-xl hover:bg-green-500/30">
                        <i class="fas fa-check-circle mr-2"></i>Take Profit
                    </button>
                </div>
            </div>
        `,i.updateUI())};if(!await P.check("trade"))return{html:"",pageEvents:()=>{}};I("Olymp AI | Trade"),await B();const{html:l,pageEvents:y}=E(),r={userAssets:[],userBalance:0,isProcessing:!1,userId:null};async function w(){try{a.start();const{data:{user:e}}=await p.auth.getUser();if(!e)throw new Error("Authentication required");r.userId=e.id;const[t,s]=await Promise.all([p.from("trading_accounts").select("balance").eq("user_id",e.id).eq("account_type","live").single(),p.from("user_assets").select(`
                        id,
                        balance,
                        assets:asset_id (
                            id,
                            symbol,
                            name,
                            logo_url
                        )
                    `).eq("user_id",e.id)]);if(t.error)throw t.error;if(s.error)throw s.error;r.userBalance=t.data?.balance||0,localStorage.setItem("userBalance",r.userBalance.toString()),r.userAssets=s.data||[];const o=localStorage.getItem("activeTradeSession");o?(c=JSON.parse(o),i.restoreSession(c),b()):h()}catch(e){console.error("Initialization error:",e),n({text:"Failed to load trading data",background:"bg-red-500"})}finally{a.stop()}}async function x(){return new Promise(e=>{new A({title:"Verify Trading PIN",content:`
                    <div class="space-y-4 text-center">
                        <i class="fas fa-lock text-4xl text-brand-primary"></i>
                        <p class="mt-2 text-gray-400">Enter your PIN to start trading</p>
                        <input type="password" id="tradePin"
                               class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white text-center"
                               placeholder="Enter 6-digit PIN" maxlength="6" pattern="[0-9]*">
                    </div>
                `,actions:[{text:"Confirm",primary:!0,onClick:async s=>{try{const o=document.getElementById("tradePin").value;if(!o||o.length!==6)throw new Error("Invalid PIN format");const{data:d}=await p.from("profiles").select("pin").eq("id",r.userId).single();if(!d?.pin||d.pin!==o)throw new Error("Invalid PIN");s(),e(!0)}catch(o){n({text:o.message,background:"bg-red-500"})}}}]}).show()})}return window.setMaxAmount=()=>{const e=document.getElementById("tradeAsset"),t=document.getElementById("tradeAmount");if(!e||!t)return;const s=e.value,o=s==="USD"?r.userBalance:r.userAssets.find(d=>d.assets.id===s)?.balance||0;t.value=o.toString()},window.handleTradeSubmit=async e=>{if(e.preventDefault(),!r.isProcessing)try{r.isProcessing=!0,a.start();const t=document.getElementById("tradeAsset"),s=t.options[t.selectedIndex],o=t.value,d=parseFloat(document.getElementById("tradeAmount").value),g=parseInt(document.getElementById("tradeDuration").value),m=o==="USD",k=s.dataset.symbol||"BTCUSDT",f=m?"USD":s.dataset.symbol;if(a.stop(),!o||!d||!g)throw new Error("Please fill all fields");const S=m?r.userBalance:r.userAssets.find(T=>T.assets.id===o)?.balance||0;if(d>S)throw new Error(`Insufficient ${f} balance`);if(!await x())throw new Error("PIN verification failed");c=await i.initializeSession({amount:d,duration:g,symbol:k,tradeAsset:f,isFromBalance:m}),b()}catch(t){console.error("Trade error:",t),n({text:t.message||"Failed to start trade",background:"bg-red-500"})}finally{r.isProcessing=!1,a.stop()}},window.setTakeProfitTarget=()=>{const e=parseFloat(document.getElementById("takeProfitAmount").value);if(!e||isNaN(e)){n({text:"Please enter a valid take profit amount",background:"bg-red-500"});return}i.setTakeProfit(e)},window.setStopLossTarget=()=>{const e=parseFloat(document.getElementById("stopLossAmount").value);if(!e||isNaN(e)){n({text:"Please enter a valid stop loss amount",background:"bg-red-500"});return}i.setStopLoss(e)},window.endTrade=async()=>{if(c)try{a.start(),await i.endSession(),await v("trade")}catch(e){console.error("End trade error:",e),n({text:"Failed to end session",background:"bg-red-500"})}finally{a.stop()}},window.takeProfitNow=async()=>{if(!c||c.currentProfit<=0){n({text:"No profit to take",background:"bg-red-500"});return}try{a.start(),await i.endSession("take_profit"),await v("trade")}catch(e){console.error("Take profit error:",e),n({text:"Failed to take profit",background:"bg-red-500"})}finally{a.stop()}},{html:`
            ${l}
            <main class="main-scroll-view flex flex-col lg:flex-row h-full">
                <!-- TradingView Chart -->
                <div class="w-full lg:w-2/3 h-[50vh] lg:h-full overflow-y-auto">
                    <div id="tradingview_widget" class="w-full h-full"></div>
                </div>

                <!-- Trading Panel -->
                <div class="w-full lg:w-1/3 h-[55vh] lg:h-full overflow-y-auto pb-10 lg:pb-0">
                    <div id="tradePanel"></div>
                </div>
            </main>
        `,pageEvents:async()=>{try{await N(),await y(),setTimeout(async()=>{try{await w(),document.addEventListener("visibilitychange",()=>{c&&i.handleVisibilityChange(document.hidden)}),Notification.permission==="default"&&await Notification.requestPermission()}catch(e){console.error("Initialization error:",e),n({text:"Failed to load trading data",background:"bg-red-500"})}finally{a&&a.stop&&a.stop()}},100)}catch(e){console.error("Page initialization error:",e),n({text:"Failed to initialize page",background:"bg-red-500"}),a&&a.stop&&a.stop()}}}}catch(u){return console.error("Trade page error:",u),a.stop(),{html:'<div class="text-red-500">Error loading trade page</div>',pageEvents:()=>{}}}};export{H as default};
//# sourceMappingURL=trade-BfKvKawP.js.map
