import{a as D}from"./auth-O7crs3AA.js";import{a as A}from"./reset-3f-UIG5W.js";import{N as L}from"./Navbar-Bb7p76Dq.js";import{s as e}from"./supabaseClients-DZSCHltC.js";import{t as d}from"./toastify-C88f8oFV.js";import{M as p}from"./Modal-jvk0lnFM.js";import{s}from"./spinner-DaVCJ9xF.js";import{l as B}from"./index-Ct12iCQQ.js";import{E as j,B as q}from"./eth-DaSwGu82.js";import{B as m,S as E}from"./sol-CRd287EW.js";import{t as C}from"./analtics-BGqwjPQ7.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";import"./user-BBhvX4PB.js";const R={BTC:q,ETH:j,BNB:m,SOL:E,USDT:m},X=async()=>{if(!await D.check("wallet"))return{html:"",pageEvents:()=>{}};A("Olymp AI | Manage Wallet"),await C();const{html:g,pageEvents:x}=L(),{data:{user:i}}=await e.auth.getUser(),[b,w,y,f]=await Promise.all([e.from("trading_accounts").select("balance").eq("user_id",i.id).eq("account_type","live").single(),e.from("user_assets").select(`
                balance,
                assets (
                    symbol,
                    name,
                    logo_url
                )
            `).eq("user_id",i.id),e.from("notifications").select("*").eq("user_id",i.id).order("created_at",{ascending:!1}).limit(5),e.from("transactions").select("*").eq("user_id",i.id).order("created_at",{ascending:!1}).limit(5)]),u=b.data?.balance||0,n=w.data||[],h=y.data||[],v=f.data||[];async function $(){s.start();const{data:a}=await e.from("notifications").select("*").eq("user_id",i.id).order("created_at",{ascending:!1});document.querySelector("main").innerHTML=`
            <div class="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-16 lg:pb-0">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-medium text-white">All Notifications</h2>
                    <button onclick="backToWallet()" 
                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
                ${o(a)}
            </div>
        `,s.stop()}async function k(){s.start();const{data:a}=await e.from("transactions").select("*").eq("user_id",i.id).order("created_at",{ascending:!1});document.querySelector("main").innerHTML=`
            <div class="p-4 md:p-8 max-w-4xl mx-auto space-y-6 pb-16 lg:pb-0">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="text-xl font-medium text-white">Transaction History</h2>
                    <button onclick="backToWallet()" 
                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i>Back
                    </button>
                </div>
                ${c(a)}
            </div>
        `,s.stop()}async function _(){await B("wallet")}function o(a){return a.length?a.map(t=>`
        <div onclick="showNotificationDetails('${t.id}')"
             class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-4 border border-brand-primary/10 
                    hover:bg-brand-primary/5 transition-colors cursor-pointer">
            <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg ${t.type==="deposit"?"bg-green-500/10 text-green-500":t.type==="withdrawal"?"bg-red-500/10 text-red-500":"bg-brand-primary/10 text-brand-primary"} flex items-center justify-center">
                    <i class="fas fa-${t.type==="deposit"?"arrow-down":t.type==="withdrawal"?"arrow-up":t.type==="system"?"bell":"exchange-alt"}"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="text-white font-medium truncate">${t.title}</h4>
                    <p class="text-gray-400 text-sm truncate">${t.message}</p>
                    <span class="text-xs text-gray-500">
                        ${new Date(t.created_at).toLocaleString()}
                    </span>
                </div>
                ${t.is_read?"":`
                    <div class="w-2 h-2 rounded-full bg-brand-primary"></div>
                `}
            </div>
        </div>
    `).join(""):`
        <div class="text-center text-gray-400 py-8">
            <i class="fas fa-bell-slash text-4xl mb-4"></i>
            <p>No notifications yet</p>
        </div>
    `}async function l(a){try{s.start();const{data:t,error:r}=await e.from("notifications").select("*").eq("id",a).single();if(r)throw r;new p({title:t.title,content:`
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg ${t.type==="deposit"?"bg-green-500/10 text-green-500":t.type==="withdrawal"?"bg-red-500/10 text-red-500":"bg-brand-primary/10 text-brand-primary"} flex items-center justify-center">
                            <i class="fas fa-${t.type==="deposit"?"arrow-down":t.type==="withdrawal"?"arrow-up":t.type==="system"?"bell":"exchange-alt"} text-xl"></i>
                        </div>
                        <div class="flex-1">
                            <p class="text-gray-400">${t.message}</p>
                            <span class="text-xs text-gray-500">
                                ${new Date(t.created_at).toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>
            `}).show(),await e.from("notifications").update({is_read:!0}).eq("id",a)}catch(t){console.error("Error showing notification:",t),d({text:"Error showing notification details",background:"bg-red-500"})}finally{s.stop()}}window.showNotificationDetails=l;async function T(a){try{s.start();const{data:t,error:r}=await e.from("transactions").select(`
                *,
                from_asset ( symbol, name ),
                to_asset ( symbol, name )
            `).eq("id",a).single();if(r)throw r;new p({title:"Transaction Details",content:`
                <div class="space-y-4">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg ${t.type==="deposit"?"bg-green-500/10 text-green-500":t.type==="withdrawal"?"bg-red-500/10 text-red-500":"bg-brand-primary/10 text-brand-primary"} flex items-center justify-center">
                            <i class="fas fa-${t.type==="deposit"?"arrow-down":t.type==="withdrawal"?"arrow-up":"exchange-alt"} text-xl"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="text-lg font-medium text-white capitalize mb-1">${t.type}</h4>
                            <div class="space-y-2">
                                <p class="text-gray-400">
                                    <span class="text-gray-500">Amount:</span> 
                                    <span class="${t.type==="deposit"?"text-green-500":"text-red-500"}">
                                        ${t.type==="withdrawal"?"-":"+"}$${t.amount.toLocaleString()}
                                    </span>
                                </p>
                                <p class="text-gray-400">
                                    <span class="text-gray-500">Status:</span>
                                    <span class="px-2 py-1 rounded-lg text-xs ${t.status==="completed"?"bg-green-500/10 text-green-500":t.status==="pending"?"bg-yellow-500/10 text-yellow-500":"bg-red-500/10 text-red-500"}">${t.status}</span>
                                </p>
                                ${t.wallet_address?`
                                    <p class="text-gray-400">
                                        <span class="text-gray-500">Wallet:</span> 
                                        <span class="font-mono text-sm">${t.wallet_address}</span>
                                    </p>
                                `:""}
                                ${t.network?`
                                    <p class="text-gray-400">
                                        <span class="text-gray-500">Network:</span> 
                                        <span>${t.network}</span>
                                    </p>
                                `:""}
                                <p class="text-gray-400">
                                    <span class="text-gray-500">Date:</span>
                                    <span>${new Date(t.created_at).toLocaleString()}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    ${t.screenshot_url?`
                        <div class="mt-4">
                            <p class="text-gray-500 mb-2">Payment Screenshot:</p>
                            <img src="${t.screenshot_url}" 
                                 alt="Payment Screenshot"
                                 class="w-full rounded-xl">
                        </div>
                    `:""}
                </div>
            `}).show()}catch(t){console.error("Error showing transaction:",t),d({text:"Error showing transaction details",background:"bg-red-500"})}finally{s.stop()}}function c(a){return a.length?a.map(t=>`
            <div onclick="showTransactionDetails('${t.id}')"
                 class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-4 border border-brand-primary/10 
                        hover:bg-brand-primary/5 transition-colors cursor-pointer">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg ${t.type==="deposit"?"bg-green-500/10 text-green-500":t.type==="withdrawal"?"bg-red-500/10 text-red-500":"bg-brand-primary/10 text-brand-primary"} flex items-center justify-center">
                        <i class="fas fa-${t.type==="deposit"?"arrow-down":t.type==="withdrawal"?"arrow-up":"exchange-alt"} text-xl"></i>
                    </div>
                    <div class="flex-1">
                        <h4 class="text-white font-medium capitalize">${t.type}</h4>
                        <p class="text-gray-400 text-sm">
                            ${new Date(t.created_at).toLocaleString()}
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-${t.type==="deposit"?"green":"red"}-500 font-medium">
                            ${t.type==="withdrawal"?"-":"+"}$${t.amount.toLocaleString()}
                        </p>
                        <span class="px-2 py-1 rounded-lg text-xs ${t.status==="completed"?"bg-green-500/10 text-green-500":t.status==="pending"?"bg-yellow-500/10 text-yellow-500":"bg-red-500/10 text-red-500"}">${t.status}</span>
                    </div>
                </div>
            </div>
        `).join(""):`
            <div class="text-center text-gray-400 py-8">
                <i class="fas fa-history text-4xl mb-4"></i>
                <p>No transactions found</p>
            </div>
        `}window.showAllNotifications=$,window.showAllTransactions=k,window.backToWallet=_,window.showNotificationDetails=l,window.showTransactionDetails=T;function N(){x()}return{html:`
            ${g}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="p-4 md:p-8 max-w-6xl mx-auto">
                    <!-- Balance Card -->
                    <div class="bg-gradient-to-br from-brand-primary to-brand-primary/50 rounded-3xl p-8 mb-8">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-white/60 mb-2">Total Balance</h2>
                                <p class="text-4xl font-bold text-white">
                                    $${u.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
                                </p>
                            </div>
                            <svg class="w-24 h-24 text-white/20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                            </svg>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Assets List -->
                        <div class="space-y-4">
                            <h3 class="text-lg font-medium text-white mb-4">Your Assets</h3>
                            ${n.length?n.map(a=>`
                                <div class="bg-brand-black/50 backdrop-blur-xl rounded-xl p-4 border border-brand-primary/10">
                                    <div class="flex items-center gap-4">
                                        <img src="${R[a.assets.symbol]||a.assets.logo_url}" 
                                             alt="${a.assets.symbol}"
                                             class="w-10 h-10 rounded-lg">
                                        <div class="flex-1">
                                            <h4 class="text-white font-medium">${a.assets.name}</h4>
                                            <p class="text-gray-400 text-sm">${a.assets.symbol}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-white font-medium">
                                                ${a.balance.toLocaleString("en-US",{minimumFractionDigits:8,maximumFractionDigits:8})}
                                            </p>
                                            <p class="text-gray-400 text-sm">
                                                ${a.assets.symbol}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            `).join(""):`
                                <div class="text-center text-gray-400 py-8">
                                    <i class="fas fa-coins text-4xl mb-4"></i>
                                    <p>No assets yet</p>
                                </div>
                            `}
                        </div>

                        <!-- Recent Activity -->
                        <div class="space-y-8 pb-16 lg:pb-0">
                            <!-- Notifications -->
                            <div class="space-y-4">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-medium text-white">Recent Notifications</h3>
                                    <button onclick="showAllNotifications()"
                                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        View All
                                    </button>
                                </div>
                                ${o(h)}
                            </div>

                            <!-- Transactions -->
                            <div class="space-y-4">
                                <div class="flex items-center justify-between mb-4">
                                    <h3 class="text-lg font-medium text-white">Recent Transactions</h3>
                                    <button onclick="showAllTransactions()"
                                            class="text-brand-primary hover:text-brand-primary/80 transition-colors">
                                        View All
                                    </button>
                                </div>
                                ${c(v)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `,pageEvents:N}};export{X as default};
//# sourceMappingURL=wallet-Dkh6P6r0.js.map
