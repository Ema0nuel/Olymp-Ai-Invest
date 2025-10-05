import{a as I}from"./auth-CPTav_8h.js";import{a as P}from"./reset-3f-UIG5W.js";import{N as $,c as W}from"./Navbar-Cnbg9OVi.js";import{s as c}from"./supabaseClients-B0wRxRlI.js";import{t as h}from"./toastify-C88f8oFV.js";import{s as i}from"./spinner-DaVCJ9xF.js";import{M as g}from"./Modal-jvk0lnFM.js";import{l as y}from"./index-Blc0Txpr.js";import{t as F}from"./analtics-CjlshyU7.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const R=async()=>{if(!await I.check("withdraw"))return{html:"",pageEvents:()=>{}};P("Olymp AI | Withdraw Assets"),await F();const{html:x,pageEvents:v}=$();let n=[],s=null,r=0,w="",m="",l=!1;async function k(){try{i.start();const{data:{session:t},error:e}=await c.auth.getSession();if(e||!t)throw new Error("Authentication failed. Please login again.");const{data:a,error:o}=await c.from("user_assets").select(`
                *,
                assets:asset_id (
                    id,
                    symbol,
                    name,
                    network,
                    logo_url
                )
            `).eq("user_id",t.user.id);if(o)throw o;if(!a||a.length===0){document.getElementById("assetSelect").innerHTML=`
                <option value="" disabled selected>No assets found</option>
            `;return}n=a,f()}catch(t){console.error("Fetch assets error:",t),h({text:t.message||"Failed to load assets",icon:"fas fa-times",background:"bg-red-500",duration:5e3}),t.message.includes("authentication")&&setTimeout(async()=>await y("login"),2e3)}finally{i.stop()}}async function E(t){const e=t.target.value;s=n.find(a=>a.assets.id===e)?.assets,s&&(document.getElementById("networkSelect").innerHTML=`
            <label class="block text-sm font-medium text-gray-400 mb-2">Select Network</label>
            <select class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                    onchange="window.handleNetworkSelect(event)">
                <option value="" disabled selected>Select Network</option>
                ${s.network.map(a=>`
                    <option value="${a}">${a}</option>
                `).join("")}
            </select>
        `)}function S(t){m=t.target.value,document.getElementById("withdrawForm").classList.remove("hidden")}async function b(t){if(t.preventDefault(),!l)try{if(l=!0,i.start(),!s)throw new Error("Please select an asset");if(!m)throw new Error("Please select a network");const{data:{session:e}}=await c.auth.getSession();if(!e)throw new Error("Not authenticated");if(r=parseFloat(t.target.amount.value),isNaN(r)||r<=0)throw new Error("Please enter a valid amount");if(w=t.target.wallet.value,!w)throw new Error("Please enter a destination wallet");const a=n.find(p=>p.assets.id===s.id);if(!a)throw new Error("Selected asset not found");if(a.balance<r)throw new Error(`Insufficient balance. Available: ${a.balance} ${s.symbol}`);l=!1,i.stop();const o=await new Promise(p=>{new g({title:"Confirm Withdrawal",content:`
                        <div class="space-y-4 text-center">
                            <i class="fas fa-lock text-4xl text-brand-primary"></i>
                            <input type="password" 
                                   id="txPin"
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter 6-digit PIN"
                                   maxlength="6"
                                   pattern="[0-9]*">
                        </div>
                    `,actions:[{text:"Confirm",primary:!0,onClick:N=>{p(document.getElementById("txPin").value),N()}}]}).show()});if(!o||o.length!==6)throw new Error("Invalid PIN");const{error:u}=await c.from("transactions").insert({user_id:e.user.id,type:"withdrawal",status:"pending",from_asset:s.id,amount:r,fee:r*.01,fee_percentage:1,wallet_address:w,network:m});if(u)throw u;await W(e.user.id,"withdrawal","Withdrawal Initiated",`Your withdrawal of ${r} ${s.symbol} is being processed`);const d=new g({content:`
                    <div class="text-center space-y-4">
                        <div class="text-6xl text-green-500">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white">Withdrawal Initiated</h3>
                        <p class="text-gray-400">Your withdrawal will be processed within 24 hours</p>
                    </div>
                `});d.show(),setTimeout(async()=>{d.hide(),await y("dashboard")},3e3)}catch(e){console.error("Withdrawal error:",e),h({text:e.message||"Failed to process withdrawal",background:"bg-red-500"})}finally{l=!1,i.stop()}}window.handleAssetSelect=E,window.handleNetworkSelect=S,window.processWithdraw=b;function A(){v(),window.onerror=function(e,a,o,u,d){return console.error("Global error:",d),h({text:"Something went wrong. Please refresh the page.",background:"bg-red-500"}),!1},(async()=>{try{await k();const e=document.getElementById("withdrawForm");e&&e.addEventListener("submit",b)}catch(e){console.error("Initialization error:",e)}})()}function f(){const t=document.getElementById("assetSelect");if(t)try{const e=n.filter(a=>a.balance>0).map(a=>`
                <option value="${a.assets.id}">
                    ${a.assets.symbol} - Balance: ${parseFloat(a.balance).toFixed(8)}
                </option>
            `);t.innerHTML=e.length?`<option value="" disabled selected>Select Asset</option>${e.join("")}`:'<option value="" disabled selected>No available assets</option>'}catch(e){console.error("Render assets error:",e),t.innerHTML='<option value="" disabled selected>Error loading assets</option>'}}return{html:`
            ${x}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
                    <h1 class="text-2xl font-bold text-white">Withdraw Assets</h1>
                    
                    <!-- Asset Selection -->
                    <div class="space-y-4">
                        <label class="block text-sm font-medium text-gray-400">Select Asset</label>
                        <select id="assetSelect" 
                                class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                onchange="window.handleAssetSelect(event)">
                            <option value="" disabled selected>Select Asset</option>
                        </select>
                    </div>

                    <!-- Network Selection -->
                    <div id="networkSelect" class="space-y-4"></div>

                    <!-- Withdrawal Form -->
                    <form id="withdrawForm" 
                          class="hidden space-y-6" 
                          onsubmit="window.processWithdraw(event)">
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Amount</label>
                            <input type="number" 
                                   name="amount"
                                   step="any"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter amount">
                        </div>

                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Destination Wallet</label>
                            <input type="text" 
                                   name="wallet"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter destination wallet address">
                        </div>

                        <button type="submit"
                                class="w-full p-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90
                                       transition-colors duration-300 flex items-center justify-center gap-2">
                            <i class="fas fa-arrow-right"></i>
                            Proceed with Withdrawal
                        </button>
                    </form>
                </div>
            </main>
        `,pageEvents:A}};export{R as default};
//# sourceMappingURL=withdraw-BWDMzDKg.js.map
