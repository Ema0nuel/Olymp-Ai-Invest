import{a as q}from"./auth-S8CH6sXT.js";import{a as L}from"./reset-3f-UIG5W.js";import{N as B}from"./Navbar-Bx9buvzJ.js";import{M as h}from"./Modal-jvk0lnFM.js";import{s as l}from"./supabaseClients-Fr4pJEim.js";import{t as r}from"./toastify-C88f8oFV.js";import{s as w}from"./spinner-DaVCJ9xF.js";import{l as I}from"./index-BXoOFHK0.js";import{B as U,E as F,S as M}from"./sol-CyENyCty.js";import{t as N}from"./analtics-7M16VRr7.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const x=[{id:"123e4567-e89b-12d3-a456-426614174000",symbol:"BTC",name:"Bitcoin",networks:["BTC"],addresses:{BTC:"bc1ql37jxk49j29s0qhvkp8mv8x739uqywx3mvze7u"},logo_url:U,min_deposit:.001},{id:"123e4567-e89b-12d3-a456-426614174001",symbol:"ETH",name:"Ethereum",networks:["ERC20"],addresses:{ERC20:"0x5b06694Dc20DC3ADF3b6E5A2Aa060235D1eC03D5"},logo_url:F,min_deposit:.01},{id:"123e4567-e89b-12d3-a456-426614174002",symbol:"USDT",name:"Tether USD",networks:["USDT"],addresses:{USDT:"0x5b06694Dc20DC3ADF3b6E5A2Aa060235D1eC03D5"},logo_url:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/USDT_Logo.png/2048px-USDT_Logo.png",min_deposit:20},{id:"123e4567-e89b-12d3-a456-426614174003",symbol:"XRP",name:"XRP",networks:["XRP"],addresses:{XRP:"rPnbecvK7yVmqmmAdUf2zcPLuqkuq6kkMg"},logo_url:"https://img.freepik.com/premium-vector/xrp-crypto-coin-cryptocurrency-isometric-illustration_641602-249.jpg?semt=ais_hybrid&w=740&q=80",min_deposit:1},{id:"123e4567-e89b-12d3-a456-426614174004",symbol:"SOL",name:"Solana",networks:["SOL"],addresses:{SOL:"3TbGt1jPvMPRmpwMYAjTBq4wMHXnty9sFB47M6UZfXKX"},logo_url:M,min_deposit:.01}],re=async()=>{if(!await q.check("deposit"))return{html:"",pageEvents:()=>{}};L("Olymp AI | Deposit Assets"),await N();const{html:v,pageEvents:k}=B();let e=null,c=null,p=null;function S(t){navigator.clipboard.writeText(t).then(()=>{r({text:"Address copied!",icon:"fas fa-check",background:"bg-green-500",duration:2e3})}).catch(()=>{r({text:"Failed to copy",icon:"fas fa-times",background:"bg-red-500",duration:2e3})})}async function D(t){const s=t.target.value;e=x.find(n=>n.id===s);const a=document.querySelector("#networkSelect"),o=document.querySelector("#addressDisplay"),b=document.querySelector("#depositForm");e&&(a.classList.remove("opacity-0"),setTimeout(()=>{a.innerHTML=`
                    <label class="block text-sm font-medium text-gray-400 mb-2">Select Network</label>
                    <select class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                            onchange="window.handleNetworkSelect(event)">
                        <option value="" disabled selected>Select Network</option>
                        ${e.networks.map(n=>`
                            <option value="${n}">${n}</option>
                        `).join("")}
                    </select>
                `},300)),o.classList.add("opacity-0"),b.classList.add("opacity-0")}async function E(t){c=t.target.value;const s=e.addresses[c],a=document.querySelector("#addressDisplay"),o=document.querySelector("#depositForm");a.classList.remove("opacity-0"),setTimeout(()=>{a.innerHTML=`
                <div class="space-y-4 animate-fade-in">
                    <label class="block text-sm font-medium text-gray-400">Deposit Address</label>
                    <div class="p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl space-y-4">
                        <div class="flex items-center gap-3">
                            <img src="${e.logo_url}" alt="${e.symbol}" 
                                 class="w-8 h-8 rounded-full">
                            <div>
                                <h3 class="font-medium text-white">${e.name}</h3>
                                <p class="text-sm text-gray-400">${c} Network</p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 p-3 bg-black/20 rounded-lg">
                            <code class="text-brand-primary flex-1 break-all text-sm">${s}</code>
                            <button type="button"
                                    class="p-2 hover:bg-white/5 rounded-lg transition-colors group"
                                    id="copyAddressBtn">
                                <i class="fas fa-copy text-gray-400 group-hover:text-white 
                                          transition-colors"></i>
                            </button>
                        </div>
                        <div class="text-xs text-yellow-500/80 flex items-center gap-2">
                            <i class="fas fa-triangle-exclamation"></i>
                            <span>Send only ${e.symbol} to this deposit address</span>
                        </div>
                    </div>
                </div>
            `,document.getElementById("copyAddressBtn").onclick=()=>S(s),o.classList.remove("opacity-0")},300)}async function A(t){const s=t.target.files[0],a=5*1024*1024;if(!s.type.startsWith("image/")){r({text:"Please upload an image file",icon:"fas fa-times",background:"bg-red-500"}),t.target.value="";return}if(s.size>a){r({text:"Image must be less than 5MB",icon:"fas fa-times",background:"bg-red-500"}),t.target.value="";return}p=s,document.getElementById("screenshotPreview").src=URL.createObjectURL(s),document.getElementById("screenshotPreview").classList.remove("hidden")}async function P(t){t.preventDefault();const{data:{session:s},error:a}=await l.auth.getSession();if(a||!s?.user?.id){r({text:"Authentication error. Please login again.",icon:"fas fa-times",background:"bg-red-500"});return}const o=s.user.id,{data:b,error:n}=await l.from("assets").select("id").eq("id",e.id).single();if(n||!b){r({text:"Selected asset not found in database",icon:"fas fa-times",background:"bg-red-500"});return}if(!e||!c||!p){r({text:"Please fill all required fields",icon:"fas fa-times",background:"bg-red-500"});return}const f=t.target,m=parseFloat(f.amount.value),T=f.sourceWallet.value;if(m<e.min_deposit){r({text:`Minimum deposit is ${e.min_deposit} ${e.symbol}`,background:"bg-red-500"});return}if(await new Promise(i=>{new h({title:"Enter Transaction PIN",content:`
                <div class="space-y-4">
                    <i class="fas fa-lock text-4xl text-brand-primary"></i>
                    <p class="text-sm text-gray-400">Enter your 6-digit transaction PIN to confirm deposit</p>
                    <input type="password" 
                           id="pinInput"
                           pattern="[0-9]*"
                           inputmode="numeric"
                           maxlength="6"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                  focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-center"
                           placeholder="******">
                </div>
            `,actions:[{text:"Confirm",primary:!0,onClick:d=>{const u=document.getElementById("pinInput").value;u.length===6?(i(u),d()):r({text:"Please enter a 6-digit PIN",background:"bg-red-500"})}},{text:"Cancel",onClick:d=>{i(null),d()}}]}).show()})){w.start();try{const i=`${o}/${Date.now()}_${p.name.replace(/[^a-zA-Z0-9.-]/g,"")}`,{data:$,error:d}=await l.storage.from("deposit-screenshots").upload(i,p,{cacheControl:"3600",upsert:!1,contentType:p.type});if(d)throw console.error("Upload error:",d),new Error("Failed to upload screenshot");const{data:u}=l.storage.from("deposit-screenshots").getPublicUrl(i),C=u.publicUrl,{data:X,error:g}=await l.from("transactions").insert({user_id:o,type:"deposit",status:"pending",from_asset:e.id,to_asset:e.id,amount:m,fee:m*.01,fee_percentage:1,wallet_address:T,network:c,screenshot_url:C}).select().single();if(g)throw g;await l.from("notifications").insert({user_id:o,title:"Deposit Initiated",message:`Your deposit of ${m} ${e.symbol} is being processed`,type:"deposit"});const y=new h({title:"Deposit Initiated",content:`
                <div class="space-y-4">
                    <div class="text-6xl text-green-500">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <p>Your deposit has been initiated successfully</p>
                    <p class="text-sm text-gray-400">Your balance will be updated within 24 hours</p>
                </div>
            `,actions:[{text:"Go to Dashboard",primary:!0,onClick:()=>{y.hide(),I("dashboard")}}]});y.show()}catch(i){r({text:i.message||"Failed to process deposit",icon:"fas fa-times",background:"bg-red-500"})}finally{w.stop()}}}window.handleAssetSelect=D,window.handleNetworkSelect=E,window.handleScreenshot=A,window.processDeposit=P;function _(){k()}return{html:`
            ${v}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-3xl mx-auto p-4 md:p-8 space-y-8">
                    <h1 class="text-2xl font-bold text-white">Deposit Crypto</h1>
                    
                    <!-- Asset Selection -->
                    <div class="space-y-4">
                        <label class="block text-sm font-medium text-gray-400">Select Asset</label>
                        <select class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                     focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all duration-300"
                                onchange="window.handleAssetSelect(event)">
                            <option value="" disabled selected>Select Asset</option>
                            ${x.map(t=>`
                                <option value="${t.id}">${t.name} (${t.symbol})</option>
                            `).join("")}
                        </select>
                    </div>

                    <!-- Network Selection -->
                    <div id="networkSelect" class="space-y-4 opacity-0 transition-opacity duration-300"></div>

                    <!-- Address Display -->
                    <div id="addressDisplay" class="opacity-0 transition-opacity duration-300"></div>

                    <!-- Deposit Form -->
                    <form id="depositForm" class="space-y-6 opacity-0 transition-opacity duration-300"
                          onsubmit="window.processDeposit(event)">
                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Amount</label>
                            <input type="number" 
                                   name="amount"
                                   step="any"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                                   placeholder="Enter amount">
                        </div>

                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Your Wallet Address</label>
                            <input type="text" 
                                   name="sourceWallet"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                                   placeholder="Enter your wallet address">
                        </div>

                        <div class="space-y-4">
                            <label class="block text-sm font-medium text-gray-400">Payment Screenshot</label>
                            <input type="file" 
                                   accept="image/*"
                                   required
                                   class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white
                                          focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                                   onchange="window.handleScreenshot(event)">
                            <img id="screenshotPreview" class="hidden max-w-full h-auto rounded-xl" alt="Screenshot preview">
                        </div>

                        <button type="submit"
                                class="w-full p-4 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90
                                       transition-colors duration-300 flex items-center justify-center gap-2">
                            <i class="fas fa-arrow-right"></i>
                            Proceed with Deposit
                        </button>
                    </form>
                </div>
            </main>
        `,pageEvents:_}};export{re as default};
//# sourceMappingURL=deposit-BazrRJLo.js.map
