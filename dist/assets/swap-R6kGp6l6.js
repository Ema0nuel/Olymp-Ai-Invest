import{a as j}from"./auth-S8CH6sXT.js";import{a as N}from"./reset-3f-UIG5W.js";import{N as U,c as C}from"./Navbar-Bx9buvzJ.js";import{s as n}from"./supabaseClients-Fr4pJEim.js";import{t as h}from"./toastify-C88f8oFV.js";import{s as p}from"./spinner-DaVCJ9xF.js";import{M as g}from"./Modal-jvk0lnFM.js";import{l as R}from"./index-BXoOFHK0.js";import{t as H}from"./analtics-7M16VRr7.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const se=async()=>{if(!await j.check("swap"))return{html:"",pageEvents:()=>{}};N("Olymp AI | Swap Assets"),await H();const{html:_,pageEvents:S}=U();let f=[],w=[],d=0,a=null,r=null,l={},i=0,m=!1;async function A(){try{const e=await(await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd")).json();return l={BTC:e.bitcoin.usd,ETH:e.ethereum.usd,USDT:e.tether.usd,BNB:e.binancecoin.usd},l}catch{h({text:"Failed to fetch current prices",background:"bg-red-500"})}}async function E(){try{p.start(),await Promise.all([A(),P()])}catch(t){console.error("Initialization error:",t)}finally{p.stop()}}async function P(){try{const{data:{session:t}}=await n.auth.getSession();if(!t)throw new Error("Not authenticated");const[e,s,o]=await Promise.all([n.from("user_assets").select(`
                        *,
                        assets:asset_id (
                            id,
                            symbol,
                            name,
                            network,
                            logo_url
                        )
                    `).eq("user_id",t.user.id),n.from("assets").select("*"),n.from("trading_accounts").select("balance").eq("user_id",t.user.id).eq("account_type","live").single()]);if(e.error)throw e.error;if(s.error)throw s.error;if(o.error)throw o.error;f=e.data||[],w=s.data||[],d=o.data?.balance||0,F()}catch(t){console.error("Fetch assets error:",t),h({text:"Failed to load assets",background:"bg-red-500"})}}function v(){if(!a||!r||!l)return 0;if(a==="balance")return 1/l[r.symbol];if(r==="balance")return l[a.assets.symbol];const t=l[a.assets.symbol],e=l[r.symbol];return e?t/e:0}function y(){const t=document.getElementById("swapPreview"),e=document.getElementById("swapAmount")?.value||0;if(i=parseFloat(e),!a||!r||!e){t.innerHTML="";return}const s=v(),o=e*s,c=e*.01,b=a==="balance"?"USD":a.assets.symbol,u=r==="balance"?"USD":r.symbol;t.innerHTML=`
            <div class="space-y-4 p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Exchange Rate</span>
                    <span class="text-white">
                        1 ${b} = ${s.toFixed(8)} ${u}
                    </span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">Fee (1%)</span>
                    <span class="text-white">
                        ${c.toFixed(8)} ${b}
                    </span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-400">You'll Receive</span>
                    <span class="text-green-500">
                        ${o.toFixed(8)} ${u}
                    </span>
                </div>
            </div>
        `}function $(t){const e=t.target.value;a=e==="balance"?"balance":f.find(o=>o.assets.id===e),y();const s=document.getElementById("toAsset");Array.from(s.options).forEach(o=>{o.disabled=o.value===e})}function k(t){const e=t.target.value;r=e==="balance"?"balance":w.find(s=>s.id===e),y()}function F(){const t=document.getElementById("fromAsset"),e=document.getElementById("toAsset");!t||!e||(t.innerHTML=`
            <option value="" disabled selected>Select Source</option>
            <option value="balance">Main Balance - $${d.toFixed(2)} USD</option>
            ${f.map(s=>`
                <option value="${s.assets.id}">
                    ${s.assets.symbol} - Balance: ${parseFloat(s.balance).toFixed(8)}
                </option>
            `).join("")}
        `,e.innerHTML=`
            <option value="" disabled selected>Select Destination</option>
            <option value="balance">Main Balance (USD)</option>
            ${w.map(s=>`
                <option value="${s.id}">${s.symbol}</option>
            `).join("")}
        `)}async function T(t){if(t.preventDefault(),!m)try{m=!0,p.start();const{data:{session:e}}=await n.auth.getSession();if(!e)throw new Error("Not authenticated");if(!a||!r||!i)throw new Error("Please fill all fields");if(a==="balance"){if(d<i)throw new Error("Insufficient main balance")}else if(a.balance<i)throw new Error("Insufficient asset balance");p.stop(),m=!1;const s=await new Promise(D=>{new g({title:"Confirm Swap",content:`
                        <div class="space-y-4 text-center">
                            <i class="fas fa-lock text-4xl text-brand-primary"></i>
                            <input type="password" 
                                   id="txPin"
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter 6-digit PIN"
                                   maxlength="6"
                                   pattern="[0-9]*">
                        </div>
                    `,actions:[{text:"Confirm",primary:!0,onClick:M=>{D(document.getElementById("txPin").value),M()}}]}).show()});if(!s||s.length!==6)throw new Error("Invalid PIN");const o=v(),c=i*o,b=i*.01,{error:u}=await n.from("transactions").insert({user_id:e.user.id,type:"swap",status:"completed",from_asset:a==="balance"?null:a.assets.id,to_asset:r==="balance"?null:r.id,amount:i,fee:b,fee_percentage:1});if(u)throw u;a==="balance"?await Promise.all([n.from("trading_accounts").update({balance:d-i}).eq("user_id",e.user.id).eq("account_type","live"),n.rpc("create_or_update_user_asset",{p_user_id:e.user.id,p_asset_id:r.id,p_amount:c})]):r==="balance"?await Promise.all([n.rpc("create_or_update_user_asset",{p_user_id:e.user.id,p_asset_id:a.assets.id,p_amount:-i}),n.from("trading_accounts").update({balance:d+c}).eq("user_id",e.user.id).eq("account_type","live")]):await Promise.all([n.rpc("create_or_update_user_asset",{p_user_id:e.user.id,p_asset_id:a.assets.id,p_amount:-i}),n.rpc("create_or_update_user_asset",{p_user_id:e.user.id,p_asset_id:r.id,p_amount:c})]);const B=a==="balance"?"USD":a.assets.symbol,q=r==="balance"?"USD":r.symbol;await C(e.user.id,"swap","Swap Successful",`Swapped ${i} ${B} to ${c.toFixed(8)} ${q}`);const x=new g({content:`
                    <div class="text-center space-y-4">
                        <div class="text-6xl text-green-500">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h3 class="text-xl font-medium text-white">Swap Successful</h3>
                        <p class="text-gray-400">Your assets have been swapped</p>
                    </div>
                `});x.show(),setTimeout(async()=>{x.hide(),await R("dashboard")},3e3)}catch(e){console.error("Swap error:",e),h({text:e.message||"Failed to process swap",background:"bg-red-500"})}finally{m=!1,p.stop()}}window.handleFromAssetSelect=$,window.handleToAssetSelect=k,window.processSwap=T,window.updateSwapPreview=y;function I(){S(),E()}return{html:`
            ${_}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
                    <h1 class="text-2xl font-bold text-white">Swap Assets</h1>
                    
                    <form class="space-y-6" onsubmit="window.processSwap(event)">
                        <!-- From Asset -->
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">From</label>
                            <select id="fromAsset" 
                                    class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                    onchange="window.handleFromAssetSelect(event)"
                                    required>
                                <option value="" disabled selected>Select Asset</option>
                            </select>
                        </div>

                        <!-- Swap Icon -->
                        <div class="flex justify-center">
                            <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                                <i class="fas fa-arrow-down text-brand-primary"></i>
                            </div>
                        </div>

                        <!-- To Asset -->
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">To</label>
                            <select id="toAsset" 
                                    class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                    onchange="window.handleToAssetSelect(event)"
                                    required>
                                <option value="" disabled selected>Select Asset</option>
                            </select>
                        </div>

                        <!-- Amount -->
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Amount</label>
                            <input type="number" 
                                   id="swapAmount"
                                   step="any"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                                   placeholder="Enter amount"
                                   oninput="window.updateSwapPreview()">
                        </div>

                        <!-- Swap Preview -->
                        <div id="swapPreview" class="space-y-4"></div>

                        <button type="submit"
                                class="w-full p-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90
                                       transition-colors duration-300 flex items-center justify-center gap-2">
                            <i class="fas fa-exchange-alt"></i>
                            Swap Assets
                        </button>
                    </form>
                </div>
            </main>
        `,pageEvents:I}};export{se as default};
//# sourceMappingURL=swap-R6kGp6l6.js.map
