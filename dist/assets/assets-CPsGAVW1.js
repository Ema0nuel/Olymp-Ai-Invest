import{a as A,b as _}from"./reset-3f-UIG5W.js";import{A as $,S as E}from"./Navbar-CR-D7Ce9.js";import{l as j}from"./adminLoginHandler-D0WRBhIu.js";import{l as B}from"./index-BXoOFHK0.js";import{t as d}from"./toastify-C88f8oFV.js";import{M as g}from"./Modal-jvk0lnFM.js";import{s as m}from"./supabaseClients-Fr4pJEim.js";import{E as N,S as I,B as q}from"./sol-CyENyCty.js";import{B as x}from"./bnb-DZcecBIT.js";import"./index-BipRJY6b.js";import"./logo-9_xFcp4C.js";const y={BTC:q,BNB:x,USDT:x,SOL:I,ETH:N},P=async()=>{A("Olymp AI Assets Panel Management"),_();async function b(){try{if(!document.getElementById("assetsGrid"))return;const{data:r,error:e}=await m.from("assets").select(`
                    *,
                    user_assets (
                        id, balance,
                        profiles:user_id (
                            full_name, email
                        )
                    )
                `).order("symbol");if(e)throw e;v(r||[])}catch(t){console.error("Error fetching assets:",t),d({text:"Failed to load assets",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}}function w(t){return y[t.symbol]?`<img src="${y[t.symbol]}" alt="${t.symbol}" class="w-8 h-8">`:t.logo_url?`<img src="${t.logo_url}" alt="${t.symbol}" class="w-8 h-8">`:`<span class="text-xl text-brand-primary">${t.symbol.charAt(0)}</span>`}function v(t){const r=document.getElementById("assetsGrid");r&&(r.innerHTML=t.length?t.map(e=>`
            <div class="bg-brand-black/30 rounded-xl p-6">
                <div class="flex items-center justify-between mb-6">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center overflow-hidden">
                            ${w(e)}
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-white">${e.symbol}</h3>
                            <p class="text-gray-400">${e.name}</p>
                        </div>
                    </div>
                    <button onclick="window.editAsset('${e.id}')"
                            class="p-2 rounded-lg bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20 transition-colors">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>

                <div class="space-y-4">
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Total Users</span>
                        <span class="text-white font-medium">${e.user_assets?.length||0}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Network</span>
                        <span class="text-white font-medium">${Array.isArray(e.network)?e.network.join(", "):e.network||"Not set"}</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Status</span>
                        <span class="px-2 py-1 rounded-full text-sm 
                            ${e.is_active?"bg-green-500/10 text-green-500":"bg-red-500/10 text-red-500"}">
                            ${e.is_active?"Active":"Inactive"}
                        </span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-brand-black/20 rounded-lg">
                        <span class="text-gray-400">Wallet Addresses</span>
                        <span class="text-white font-medium text-right">
                            ${typeof e.wallet_addresses=="object"?Object.keys(e.wallet_addresses).length+" networks":"No addresses"}
                        </span>
                    </div>
                </div>

                ${e.user_assets?.length?`
                    <div class="mt-6">
                        <h4 class="text-sm font-medium text-gray-400 mb-3">Recent Users</h4>
                        <div class="space-y-3">
                            ${e.user_assets.slice(0,3).map(o=>`
                                <div class="flex justify-between items-center p-3 bg-brand-black/20 rounded-lg">
                                    <div>
                                        <div class="text-white">${o.profiles?.full_name||"Unknown User"}</div>
                                        <div class="text-sm text-gray-400">${o.profiles?.email||"No email"}</div>
                                    </div>
                                    <div class="text-right">
                                        <div class="text-white font-medium">${o.balance} ${e.symbol}</div>
                                    </div>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `:""}
            </div>
        `).join(""):`
            <div class="col-span-full text-center text-gray-400 py-8">
                No assets found
            </div>
        `)}function h(){E(),document.querySelectorAll("[data-nav]").forEach(t=>{t.addEventListener("click",async r=>{r.preventDefault();const e=t.dataset.route;e&&await B(`admin${e.charAt(0).toUpperCase()+e.slice(1)}`)})}),document.getElementById("admin-logout")?.addEventListener("click",async()=>{await j()}),b(),window.addAsset=()=>{const t=new g({title:"Add New Asset",content:`
                    <form id="addAssetForm" class="space-y-6">
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Symbol</label>
                            <input type="text" name="symbol" required
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none"
                                   placeholder="e.g., BTC">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input type="text" name="name" required
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none"
                                   placeholder="e.g., Bitcoin">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Network</label>
                            <input type="text" name="network" required
                                class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                        border border-brand-primary/30 focus:border-brand-primary outline-none"
                                placeholder="e.g., BTC Network, ERC20, BEP20 (comma-separated)">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                            <input type="url" name="logo_url"
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none"
                                   placeholder="https://example.com/logo.png">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Wallet Addresses</label>
                            <textarea name="wallet_addresses" required
                                        class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white 
                                                border border-brand-primary/30 focus:border-brand-primary outline-none"
                                        placeholder="Enter wallet addresses (format: NETWORK: ADDRESS)
                                    Example:
                                    BTC: bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                                    ETH: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F"></textarea>
                        </div>
                        <button type="submit"
                                class="w-full h-12 rounded-xl bg-brand-primary text-white 
                                       hover:bg-brand-primary/90 transition-colors">
                            Add Asset
                        </button>
                    </form>
                `});t.show(),document.getElementById("addAssetForm").onsubmit=async r=>{r.preventDefault();const e=new FormData(r.target),n=e.get("network").split(",").map(s=>s.trim()).filter(s=>s),l=e.get("wallet_addresses"),u={};l.split(`
`).map(s=>s.trim()).filter(s=>s).forEach(s=>{const[c,i]=s.split(":").map(a=>a.trim());c&&i&&(u[c]=i)});try{const{error:s}=await m.from("assets").insert({symbol:e.get("symbol").toUpperCase(),name:e.get("name"),network:n,logo_url:e.get("logo_url")||null,is_active:!0,wallet_addresses:u});if(s)throw s;t.hide(),d({text:"Asset added successfully",icon:"fas fa-check-circle",background:"bg-green-500/10"}),b()}catch(s){console.error("Error adding asset:",s),d({text:s.message||"Failed to add asset",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}}},window.editAsset=async t=>{const{data:r,error:e}=await m.from("assets").select("*").eq("id",t).single();if(e){d({text:"Failed to load asset details",icon:"fas fa-exclamation-circle",background:"bg-red-500/10"});return}const o=new g({title:`Edit ${r.symbol}`,content:`
                    <form id="editAssetForm" class="space-y-6">
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                            <input type="text" name="name" value="${r.name}" required
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Network</label>
                            <input type="text" name="network" value="${r.network||""}"
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none">
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Logo URL</label>
                            <input type="url" name="logo_url" value="${r.logo_url||""}"
                                   class="w-full h-12 px-4 rounded-xl bg-brand-black/50 text-white 
                                          border border-brand-primary/30 focus:border-brand-primary outline-none">
                        </div>
                        <div class="form-group">
                            <label class="flex items-center gap-2">
                                <input type="checkbox" name="is_active" ${r.is_active?"checked":""}
                                       class="rounded border-gray-300 text-brand-primary 
                                              focus:border-brand-primary focus:ring-brand-primary">
                                <span class="text-gray-300">Active</span>
                            </label>
                        </div>
                        <div class="form-group">
                            <label class="block text-sm font-medium text-gray-300 mb-2">Wallet Addresses</label>
                            <textarea name="wallet_addresses" required
                                        class="w-full px-4 py-3 rounded-xl bg-brand-black/50 text-white 
                                                border border-brand-primary/30 focus:border-brand-primary outline-none"
                                        placeholder="Enter wallet addresses (format: NETWORK: ADDRESS)">${typeof r.wallet_addresses=="object"?Object.entries(r.wallet_addresses).map(([n,l])=>`${n}: ${l}`).join(`
`):""}</textarea>
                        </div>
                        <button type="submit"
                                class="w-full h-12 rounded-xl bg-brand-primary text-white 
                                       hover:bg-brand-primary/90 transition-colors">
                            Update Asset
                        </button>
                    </form>
                `});o.show(),document.getElementById("editAssetForm").onsubmit=async n=>{n.preventDefault();const l=new FormData(n.target),s=l.get("network").split(",").map(a=>a.trim()).filter(a=>a),c=l.get("wallet_addresses"),i={};c.split(`
`).map(a=>a.trim()).filter(a=>a).forEach(a=>{const[p,f]=a.split(":").map(k=>k.trim());p&&f&&(i[p]=f)});try{const{error:a}=await m.from("assets").update({name:l.get("name"),network:s,logo_url:l.get("logo_url")||null,is_active:l.get("status")==="on",wallet_addresses:i}).eq("id",t);if(a)throw a;o.hide(),d({text:"Asset updated successfully",icon:"fas fa-check-circle",background:"bg-green-500/10"}),b()}catch(a){console.error("Error updating asset:",a),d({text:a.message,icon:"fas fa-exclamation-circle",background:"bg-red-500/10"})}}}}return{html:`
            <div class="flex min-h-screen bg-brand-dark mobile-container">
                ${$().html}
                <main class="flex-1 lg:ml-24 p-4 lg:p-8 pb-24 lg:pb-8">
                    <div class="max-w-7xl mx-auto space-y-6">
                        <div class="flex justify-between items-center">
                            <h1 class="text-2xl font-bold text-white">Assets</h1>
                            <button onclick="window.addAsset()"
                                    class="px-4 py-2 rounded-xl bg-brand-primary text-white 
                                           hover:bg-brand-primary/90 transition-colors">
                                <i class="fas fa-plus"></i>
                                <span class="ml-2">Add Asset</span>
                            </button>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="assetsGrid">
                            <!-- Assets will be rendered here -->
                        </div>
                    </div>
                </main>
            </div>
        `,pageEvents:h}};export{P as default};
//# sourceMappingURL=assets-CPsGAVW1.js.map
