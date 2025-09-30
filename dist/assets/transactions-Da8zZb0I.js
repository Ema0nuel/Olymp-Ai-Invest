import{a as f,b as g}from"./reset-3f-UIG5W.js";import{A as b,S as y}from"./Navbar-CR-D7Ce9.js";import{l as x}from"./adminLoginHandler-D0WRBhIu.js";import{l as h}from"./index-BXoOFHK0.js";import{TransactionManager as v}from"./Management-b6nLML7q.js";import{M as p}from"./Modal-jvk0lnFM.js";import{t as o}from"./toastify-C88f8oFV.js";import{s as d}from"./supabaseClients-Fr4pJEim.js";import"./index-BipRJY6b.js";import"./logo-9_xFcp4C.js";import"./send-email-89Z52C2k.js";const U=async()=>{f("Olymp AI Transactions Panel Management"),g();async function l(n={}){try{if(!document.getElementById("transactionsTable"))return;let t=d.from("transactions").select(`
                *,
                profiles!transactions_user_id_fkey (
                    full_name, 
                    email
                ),
                trading_accounts!transactions_account_id_fkey (
                    balance,
                    account_type
                )
            `).order("created_at",{ascending:!1});n.type&&(t=t.eq("type",n.type)),n.status&&(t=t.eq("status",n.status));const{data:c,error:i}=await t;if(i)throw i;u(c||[])}catch(r){console.error("Error fetching transactions:",r),o({text:"Failed to load transactions",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}}function u(n){const r=document.getElementById("transactionsTable");r&&(r.innerHTML=n.length?n.map(t=>`
        <tr class="border-b border-brand-primary/10 hover:bg-brand-black/20">
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <i class="fas fa-${t.type==="deposit"?"arrow-down":"arrow-up"} 
                           ${t.type==="deposit"?"text-green-500":"text-red-500"}"></i>
                    </div>
                    <div>
                        <div class="font-medium text-white">
                            ${t.profiles?.full_name||"Deleted User"}
                        </div>
                        <div class="text-sm text-gray-400">
                            ${t.profiles?.email||"No email"}
                        </div>
                    </div>
                </div>
            </td>
            <td class="p-4">
                <span class="capitalize">${t.type||"Unknown"}</span>
            </td>
            <td class="p-4">$${(t.amount||0).toLocaleString()}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded-full text-sm
                    ${t.status==="completed"?"bg-green-500/10 text-green-500":t.status==="pending"?"bg-yellow-500/10 text-yellow-500":"bg-red-500/10 text-red-500"}">
                    ${t.status||"Unknown"}
                </span>
            </td>
            <td class="p-4 text-gray-400">
                ${t.created_at?new Date(t.created_at).toLocaleString():"No date"}
            </td>
            <td class="p-4">
                <div class="flex gap-2">
                    <button onclick="window.viewTxDetails('${t.id}')"
                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary
                                   hover:bg-brand-primary/20 transition-colors">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${t.status==="pending"?`
                        <button onclick="window.handleTransaction('${t.id}', 'approve')"
                                class="p-2 rounded-lg bg-green-500/10 text-green-500
                                       hover:bg-green-500/20 transition-colors">
                            <i class="fas fa-check"></i>
                        </button>
                        <button onclick="window.handleTransaction('${t.id}', 'reject')"
                                class="p-2 rounded-lg bg-red-500/10 text-red-500
                                       hover:bg-red-500/20 transition-colors">
                            <i class="fas fa-times"></i>
                        </button>
                    `:""}
                    <button onclick="window.deleteTx('${t.id}')"
                            class="p-2 rounded-lg bg-red-500/10 text-red-500
                                   hover:bg-red-500/20 transition-colors">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join(""):`
        <tr>
            <td colspan="6" class="p-8 text-center text-gray-400">
                No transactions found
            </td>
        </tr>
    `)}function m(){y();const n={show:()=>{},hide:()=>{}},r=new v(d,n),t=document.getElementById("typeFilter"),c=document.getElementById("statusFilter");function i(){const s={type:t.value,status:c.value};l(s)}t.addEventListener("change",i),c.addEventListener("change",i),l(),document.querySelectorAll("[data-nav]").forEach(s=>{s.addEventListener("click",async e=>{e.preventDefault();const a=s.dataset.route;a&&await h(`admin${a.charAt(0).toUpperCase()+a.slice(1)}`)})}),document.getElementById("admin-logout")?.addEventListener("click",async()=>{await x()}),window.viewTxDetails=async s=>{try{const{data:e,error:a}=await d.from("transactions").select(`
                *,
                profiles!transactions_user_id_fkey (
                    full_name, 
                    email
                ),
                trading_accounts!transactions_account_id_fkey (
                    balance,
                    account_type
                )
            `).eq("id",s).single();if(a)throw a;new p({title:"Transaction Details",content:`
                <div class="space-y-6">
                    <div class="flex justify-center mb-6">
                        <div class="w-16 h-16 rounded-full bg-brand-primary/10 
                                    flex items-center justify-center">
                            <i class="fas fa-${e.type==="deposit"?"arrow-down":"arrow-up"} text-2xl 
                               ${e.type==="deposit"?"text-green-500":"text-red-500"}"></i>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <p class="text-sm text-gray-400">Type</p>
                            <p class="text-white font-medium capitalize">${e.type||"Unknown"}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Amount</p>
                            <p class="text-white font-medium">$${(e.amount||0).toLocaleString()}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Status</p>
                            <p class="text-white font-medium">${e.status||"Unknown"}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">Date</p>
                            <p class="text-white font-medium">
                                ${e.created_at?new Date(e.created_at).toLocaleString():"No date"}
                            </p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-sm text-gray-400">User</p>
                            <p class="text-white font-medium">${e.profiles?.full_name||"Deleted User"}</p>
                            <p class="text-sm text-gray-400">${e.profiles?.email||"No email"}</p>
                        </div>
                        ${e.wallet_address?`
                            <div class="col-span-2">
                                <p class="text-sm text-gray-400">Wallet Address</p>
                                <p class="text-white font-medium break-all">
                                    ${e.wallet_address}
                                </p>
                            </div>
                        `:""}
                        ${e.screenshot_url?`
                            <div class="col-span-2">
                                <p class="text-sm text-gray-400">Screenshot</p>
                                <img src="${e.screenshot_url}" 
                                     alt="Transaction Screenshot"
                                     class="mt-2 rounded-lg max-w-full h-auto">
                            </div>
                        `:""}
                    </div>
                </div>
            `}).show()}catch(e){console.error("Error fetching transaction details:",e),o({text:"Failed to load transaction details",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}},window.handleTransaction=async(s,e)=>{try{await r.handleTransaction(s,e),o({text:`Transaction ${e}ed successfully`,icon:"fas fa-check-circle",background:"bg-green-500/10"}),l()}catch(a){console.error("Transaction handling failed:",a),o({text:a.message||`Failed to ${e} transaction`,icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}},window.deleteTx=async s=>{new p({title:"Delete Transaction",content:`
                    <p class="text-gray-400">
                        Are you sure you want to delete this transaction? 
                        This action cannot be undone.
                    </p>
                `,actions:[{text:"Delete",class:"bg-red-500 hover:bg-red-600",onClick:async e=>{try{const{error:a}=await d.from("transactions").delete().eq("id",s);if(a)throw a;e(),o({text:"Transaction deleted successfully",icon:"fas fa-check-circle",background:"bg-green-500/10"}),l()}catch(a){console.error("Error deleting transaction:",a),o({text:"Failed to delete transaction",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}}},{text:"Cancel",onClick:e=>e()}]}).show()}}return{html:`
            <div class="flex min-h-screen bg-brand-dark mobile-container">
                ${b().html}
                <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                    <div class="max-w-7xl mx-auto space-y-6">
                        <div class="flex justify-between items-center">
                            <h1 class="text-2xl font-bold text-white">Transactions</h1>
                            <div class="flex gap-4">
                                <select id="typeFilter" 
                                        class="px-4 py-2 rounded-xl bg-brand-black/50 text-white border
                                            border-brand-primary/30 focus:border-brand-primary outline-none">
                                    <option value="">All Types</option>
                                    <option value="deposit">Deposits</option>
                                    <option value="withdrawal">Withdrawals</option>
                                </select>
                                <select id="statusFilter"
                                        class="px-4 py-2 rounded-xl bg-brand-black/50 text-white border
                                            border-brand-primary/30 focus:border-brand-primary outline-none">
                                    <option value="">All Status</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="failed">Failed</option>
                                </select>
                            </div>
                        </div>

                        <div class="bg-brand-black/50 backdrop-blur-xl border border-brand-primary/10 
                                  rounded-2xl overflow-hidden">
                            <div class="overflow-x-auto">
                                <table class="w-full">
                                    <thead>
                                        <tr class="text-left border-b border-brand-primary/10">
                                            <th class="p-4 text-gray-400 font-medium">User</th>
                                            <th class="p-4 text-gray-400 font-medium">Type</th>
                                            <th class="p-4 text-gray-400 font-medium">Amount</th>
                                            <th class="p-4 text-gray-400 font-medium">Status</th>
                                            <th class="p-4 text-gray-400 font-medium">Date</th>
                                            <th class="p-4 text-gray-400 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody id="transactionsTable">
                                        <!-- Transactions will be rendered here -->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `,pageEvents:m}};export{U as default};
//# sourceMappingURL=transactions-Da8zZb0I.js.map
