import{a as f,b}from"./reset-3f-UIG5W.js";import{A as v,S as g}from"./Navbar-DRjmX4_G.js";import{l as y}from"./adminLoginHandler-DKkGkT28.js";import{l as w}from"./index-U9ehfUVP.js";import{t as x}from"./toastify-C88f8oFV.js";import{s as m}from"./supabaseClients-CP3flIu-.js";import{M as C}from"./Modal-jvk0lnFM.js";import"./index-CHDAFkWG.js";import"./logo-9_xFcp4C.js";const A=()=>{async function n(){try{const r=await(await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd")).json();return{BTC:r.bitcoin.usd,ETH:r.ethereum.usd,USDT:r.tether.usd,BNB:r.binancecoin.usd}}catch{return x({text:"Failed to fetch current prices",background:"bg-red-500"}),{}}}async function d(){try{const i=await n(),r=document.getElementById("cryptoPrices");if(!r)return;r.innerHTML="",Object.entries(i).forEach(([t,s])=>{const a=Math.random()*5-2.5,c=document.createElement("div");c.className="flex items-center justify-between p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10",c.innerHTML=`
                    <div class="flex items-center gap-3">
                        ${e[t]}
                        <div>
                            <h3 class="font-medium text-white">${t}</h3>
                            <p class="text-sm text-gray-400">$${s.toLocaleString()}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${a>=0?"text-green-500":"text-red-500"}">
                            ${a>=0?"↑":"↓"} ${Math.abs(a).toFixed(2)}%
                        </span>
                    </div>
                `,r.appendChild(c)})}catch(i){console.error("Error fetching prices:",i)}}const e={BTC:'<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#F7931A" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/></svg>',ETH:'<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#627EEA" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" fill-opacity="0.602" d="M16.498 4v8.87l7.497 3.35z"/><path fill="white" d="M16.498 4L9 16.22l7.498-3.35z"/><path fill="white" fill-opacity="0.602" d="M16.498 21.968v6.027L24 17.616z"/><path fill="white" d="M16.498 27.995v-6.028L9 17.616z"/><path fill="white" fill-opacity="0.2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/><path fill="white" fill-opacity="0.602" d="M9 16.22l7.498 4.353v-7.701z"/></svg>',USDT:'<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#26A17B" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" d="M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117"/></svg>',BNB:'<svg class="w-8 h-8" viewBox="0 0 32 32"><path fill="#F3BA2F" d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"/><path fill="white" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"/></svg>'};return{html:`
        <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-white">Crypto Assets</h2>
                <button id="refreshPrices" 
                        class="text-gray-400 hover:text-white transition-colors">
                    <i class="fas fa-sync-alt"></i>
                </button>
            </div>
            <div id="cryptoPrices" class="space-y-4"></div>
        </div>
    `,init:()=>{d(),document.getElementById("refreshPrices")?.addEventListener("click",i=>{const r=i.currentTarget.querySelector("i");r?.classList.add("animate-spin"),d().finally(()=>{setTimeout(()=>r?.classList.remove("animate-spin"),1e3)})})}}},$=()=>{async function n(){try{const e=document.getElementById("recentTransactions");if(!e)return;e.innerHTML="";const{data:i,error:r}=await m.from("transactions").select(`
                    *,
                    profiles!transactions_user_id_fkey (full_name, email)
                `).order("created_at",{ascending:!1}).limit(4);if(r)throw r;if(!i)return;i.forEach(t=>{const s=document.createElement("div");s.className="flex items-center justify-between p-4 bg-brand-black/30 rounded-xl border border-brand-primary/10 cursor-pointer hover:bg-brand-primary/5 transition-colors",s.onclick=()=>d(t);const a={completed:"text-green-500",pending:"text-yellow-500",failed:"text-red-500"}[t.status];s.innerHTML=`
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                            <i class="fas fa-${t.type==="deposit"?"arrow-down":"arrow-up"} 
                                   ${t.type==="deposit"?"text-green-500":"text-red-500"}"></i>
                        </div>
                        <div>
                            <h3 class="font-medium text-white">${t.profiles.full_name}</h3>
                            <p class="text-sm text-gray-400">${t.type} - $${t.amount}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="${a}">${t.status}</span>
                        <p class="text-sm text-gray-400">${new Date(t.created_at).toLocaleDateString()}</p>
                    </div>
                `,e.appendChild(s)})}catch(e){console.error("Error fetching transactions:",e)}}function d(e){new C({title:"Transaction Details",content:`
                <div class="space-y-4">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                            <i class="fas fa-${e.type==="deposit"?"arrow-down":"arrow-up"} text-2xl 
                                   ${e.type==="deposit"?"text-green-500":"text-red-500"}"></i>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-400">Type</p>
                            <p class="text-white font-medium">${e.type}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Amount</p>
                            <p class="text-white font-medium">$${e.amount}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Status</p>
                            <p class="text-white font-medium">${e.status}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Date</p>
                            <p class="text-white font-medium">${new Date(e.created_at).toLocaleString()}</p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm text-gray-400">User</p>
                            <p class="text-white font-medium">${e.profiles.full_name}</p>
                            <p class="text-sm text-gray-400">${e.profiles.email}</p>
                        </div>
                    </div>
                </div>
            `}).show()}return{html:`
            <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                <h2 class="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
                <div id="recentTransactions" class="space-y-4"></div>
            </div>
        `,init:n}},L=()=>{let n={transaction:null,userGrowth:null};function d(){n.transaction&&(n.transaction.destroy(),n.transaction=null),n.userGrowth&&(n.userGrowth.destroy(),n.userGrowth=null)}async function e(){try{d(),window.Chart||await new Promise((t,s)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=t,a.onerror=s,document.head.appendChild(a)}),await Promise.all([i(),r()])}catch(t){console.error("Chart initialization error:",t)}}async function i(){try{const t=document.getElementById("transactionChart");if(!t)return;t.getContext("2d").clearRect(0,0,t.width,t.height);const{data:s,error:a}=await m.from("transactions").select("amount, created_at, type").order("created_at",{ascending:!0});if(a)throw a;const c=s.reduce((l,p)=>{const o=new Date(p.created_at).toLocaleDateString();return l[o]||(l[o]={deposits:0,withdrawals:0}),p.type==="deposit"&&(l[o].deposits+=p.amount),p.type==="withdrawal"&&(l[o].withdrawals+=p.amount),l},{});n.transaction=new Chart(t,{type:"line",data:{labels:Object.keys(c),datasets:[{label:"Deposits",data:Object.values(c).map(l=>l.deposits),borderColor:"#10B981",tension:.4},{label:"Withdrawals",data:Object.values(c).map(l=>l.withdrawals),borderColor:"#EF4444",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,grid:{color:"rgba(255, 255, 255, 0.1)"},ticks:{color:"#9CA3AF"}},x:{grid:{color:"rgba(255, 255, 255, 0.1)"},ticks:{color:"#9CA3AF"}}},plugins:{legend:{labels:{color:"#9CA3AF"}}}}})}catch(t){console.error("Error creating transaction chart:",t)}}async function r(){try{const t=document.getElementById("userGrowthChart");if(!t)return;t.getContext("2d").clearRect(0,0,t.width,t.height);const{data:s,error:a}=await m.from("profiles").select("created_at").order("created_at",{ascending:!0});if(a)throw a;const c=s.reduce((o,h)=>{const u=new Date(h.created_at).toLocaleDateString();return o[u]=(o[u]||0)+1,o},{});let l=0;const p=Object.entries(c).map(([o,h])=>(l+=h,{date:o,total:l}));n.userGrowth=new Chart(t,{type:"line",data:{labels:p.map(o=>o.date),datasets:[{label:"Total Users",data:p.map(o=>o.total),borderColor:"#8B5CF6",tension:.4}]},options:{responsive:!0,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0,grid:{color:"rgba(255, 255, 255, 0.1)"},ticks:{color:"#9CA3AF"}},x:{grid:{color:"rgba(255, 255, 255, 0.1)"},ticks:{color:"#9CA3AF"}}},plugins:{legend:{labels:{color:"#9CA3AF"}}}}})}catch(t){console.error("Error creating user growth chart:",t)}}return{html:`
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">Transaction Flow</h2>
                    <div class="h-[300px] relative">
                        <canvas id="transactionChart"></canvas>
                    </div>
                </div>
                
                <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-4">User Growth</h2>
                    <div class="h-[300px] relative">
                        <canvas id="userGrowthChart"></canvas>
                    </div>
                </div>
            </div>
        `,init:e,cleanup:d}},F=async()=>{f("Olymp AI Admin Dashboard"),b();const{data:n}=await m.from("trading_accounts").select("balance").eq("account_type","live"),d=n?.reduce((s,a)=>s+a.balance,0)||0,e=A(),i=$(),r=L();function t(){g(),e.init(),i.init(),r.init(),document.querySelectorAll("[data-nav]").forEach(s=>{s.addEventListener("click",async a=>{a.preventDefault();const c=s.dataset.route;c&&await w(`admin${c.charAt(0).toUpperCase()+c.slice(1)}`)})}),document.getElementById("admin-logout")?.addEventListener("click",async()=>{await y()})}return{html:`
        <div class="flex min-h-screen bg-brand-dark">
            ${v().html}
            
            <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                <div class="max-w-7xl mx-auto space-y-6">
                    <!-- Header with Total Balance -->
                    <header class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 rounded-2xl p-6">
                        <h1 class="text-2xl lg:text-3xl font-bold text-white">Admin Dashboard</h1>
                        <p class="text-gray-400 mt-2">Platform Overview</p>
                        <div class="mt-4 p-4 bg-brand-primary/10 rounded-xl">
                            <p class="text-sm text-gray-400">Total User Balance</p>
                            <p class="text-4xl font-bold text-white">$${d.toLocaleString()}</p>
                        </div>
                    </header>

                    <!-- Analytics Charts -->
                    ${r.html}

                    <!-- Crypto Prices and Recent Transactions -->
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        ${e.html}
                        ${i.html}
                    </div>
                </div>
            </main>
        </div>
        `,pageEvents:t}};export{F as default};
//# sourceMappingURL=dashboard-B7RjKDE9.js.map
