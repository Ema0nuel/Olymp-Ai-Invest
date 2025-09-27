import{a as v}from"./auth-O7crs3AA.js";import{a as k}from"./reset-3f-UIG5W.js";import{N as P}from"./Navbar-Bb7p76Dq.js";import{s as i}from"./supabaseClients-DZSCHltC.js";import{t as u}from"./toastify-C88f8oFV.js";import{s as l}from"./spinner-DaVCJ9xF.js";import{l as b}from"./index-Ct12iCQQ.js";import{M as N}from"./Modal-jvk0lnFM.js";import{A as E}from"./user-BBhvX4PB.js";import{t as C}from"./analtics-BGqwjPQ7.js";import"./logo-9_xFcp4C.js";import"./webAuthnHelper-CFOYufXH.js";async function I(c){try{l.start();const{data:{user:e}}=await i.auth.getUser();if(!e)throw new Error("Not authenticated");const s={id:e.id,updated_at:new Date,...c},{error:t}=await i.from("profiles").update(s).eq("id",e.id);if(t)throw t;return u({text:"Profile updated successfully",background:"bg-green-500"}),await b("settings"),!0}catch(e){return console.error("Update error:",e),u({text:e.message,background:"bg-red-500"}),!1}finally{l.stop()}}async function U(c){try{l.start();const{data:{user:e}}=await i.auth.getUser();if(!e)throw new Error("Not authenticated");const s=c.name.split(".").pop(),t=`${e.id}/avatar.${s}`,{error:o}=await i.storage.from("deposit-screenshots").upload(t,c,{upsert:!0});if(o)throw o;const{data:f}=i.storage.from("deposit-screenshots").getPublicUrl(t),{error:p}=await i.from("profiles").update({avatar_url:f.publicUrl,updated_at:new Date}).eq("id",e.id);if(p)throw p;return u({text:"Avatar updated successfully",background:"bg-green-500"}),await b("settings"),f.publicUrl}catch(e){return console.error("Avatar update error:",e),u({text:e.message,background:"bg-red-500"}),null}finally{l.stop()}}async function A(c,e){try{l.start();const{data:{user:s}}=await i.auth.getUser();if(!s)throw new Error("Not authenticated");const{data:t}=await i.from("profiles").select("pin").eq("id",s.id).single();if(t.pin!==c)throw new Error("Current PIN is incorrect");const{error:o}=await i.from("profiles").update({pin:e,updated_at:new Date}).eq("id",s.id);if(o)throw o;return u({text:"PIN updated successfully",background:"bg-green-500"}),await b("settings"),!0}catch(s){return console.error("PIN update error:",s),u({text:s.message,background:"bg-red-500"}),!1}finally{l.stop()}}const M=async()=>{if(!await v.check("settings"))return{html:"",pageEvents:()=>{}};k("Olymp AI | Settings"),await C();const{html:e,pageEvents:s}=P();let t=null,o=0;async function f(){await b("kyc")}async function p(){try{l.start();const{data:{user:a}}=await i.auth.getUser();if(!a)throw new Error("Not authenticated");const[r,n]=await Promise.all([i.from("profiles").select("*").eq("id",a.id).single(),i.from("trading_accounts").select("balance").eq("user_id",a.id).eq("account_type","live").single()]);if(r.error)throw r.error;if(n.error)throw n.error;t=r.data,o=n.data.balance,h()}catch(a){console.error("Fetch error:",a)}finally{l.stop()}}async function m(a){const r=a.target.files[0];if(!r)return;const n=await U(r);n&&(document.getElementById("avatarImage").src=n)}async function g(a){a.preventDefault();const r=new FormData(a.target),n=Object.fromEntries(r);await I(n)&&await p()}async function y(){new N({title:"Change Transaction PIN",content:`
                <div class="space-y-4">
                    <input type="password" 
                           id="currentPin"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                           placeholder="Current PIN"
                           maxlength="6"
                           pattern="[0-9]*">
                    <input type="password" 
                           id="newPin"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                           placeholder="New PIN"
                           maxlength="6"
                           pattern="[0-9]*">
                    <input type="password" 
                           id="confirmPin"
                           class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white"
                           placeholder="Confirm New PIN"
                           maxlength="6"
                           pattern="[0-9]*">
                </div>
            `,actions:[{text:"Update PIN",primary:!0,onClick:async r=>{const n=document.getElementById("currentPin").value,d=document.getElementById("newPin").value,x=document.getElementById("confirmPin").value;if(d!==x){toastify({text:"PINs do not match",background:"bg-red-500"});return}await A(n,d)&&r()}}]}).show()}function h(){if(!t)return;const a=document.getElementById("kycStatus");a&&(a.className=`px-2 py-1 rounded text-xs ${t.kyc_status==="approved"?"bg-green-500/20 text-green-500":t.kyc_status==="pending"?"bg-yellow-500/20 text-yellow-500":t.kyc_status==="rejected"?"bg-red-500/20 text-red-500":"bg-gray-500/20 text-gray-500"}`,a.textContent=t.kyc_status?.toUpperCase()||"NOT STARTED");const r=document.getElementById("profileForm");r&&Object.keys(t).forEach(n=>{const d=r.elements[n];d&&(d.value=t[n])})}window.handleAvatarChange=m,window.handleProfileUpdate=g,window.handlePinChange=y,window.handleKycNavigation=f,await p();function w(){s()}return{html:`
            ${e}
            <main class="main-scroll-view pb-36 lg:pb-0">
                <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
                    <!-- Profile Card -->
                    <div class="bg-gradient-to-br from-brand-black/80 to-brand-black/40 backdrop-blur-xl rounded-3xl p-6 border border-brand-primary/10">
                        <div class="flex flex-col md:flex-row items-center gap-6">
                            <!-- Avatar Section -->
                            <div class="relative group">
                                <div class="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-primary">
                                    <img id="avatarImage"
                                         src="${t?.avatar_url||E}"
                                         alt="Profile"
                                         class="w-full h-full object-cover">
                                </div>
                                <label class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-opacity">
                                    <i class="fas fa-camera text-white"></i>
                                    <input type="file"
                                           accept="image/*"
                                           class="hidden"
                                           onchange="window.handleAvatarChange(event)">
                                </label>
                            </div>

                            <!-- User Info -->
                            <div class="flex-1 text-center md:text-left">
                                <h2 class="text-2xl font-bold text-white">${t?.full_name||"User"}</h2>
                                <p class="text-gray-400">${t?.email}</p>
                                <div class="mt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span class="px-3 py-1 bg-brand-primary/10 rounded-full text-brand-primary text-sm">
                                        <i class="fas fa-wallet mr-1"></i>$${o.toFixed(2)}
                                    </span>
                                    <span id="kycStatus" class="px-3 py-1 rounded-full text-sm">
                                        ${t?.kyc_status||"NOT STARTED"}
                                    </span>
                                </div>
                            </div>

                            <!-- Quick Actions -->
                            <div class="flex gap-2">
                                <button onclick="window.handlePinChange()"
                                        class="p-3 bg-brand-primary/10 rounded-xl hover:bg-brand-primary/20 transition-colors">
                                    <i class="fas fa-key text-brand-primary"></i>
                                </button>
                                <!-- First KYC button in Quick Actions -->
                                ${t?.kyc_status!=="approved"?`
                                    <button onclick="window.handleKycNavigation()"
                                            class="p-3 bg-green-500/10 rounded-xl hover:bg-green-500/20 transition-colors">
                                        <i class="fas fa-shield-check text-green-500"></i>
                                    </button>
                                `:""}
                            </div>
                        </div>
                    </div>

                    <!-- Edit Profile Form -->
                    <form id="profileForm" class="space-y-6" onsubmit="window.handleProfileUpdate(event)">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-400">Full Name</label>
                                <input type="text"
                                       name="full_name"
                                       required
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-400">Phone Number</label>
                                <input type="tel"
                                       name="phone_number"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                            <div class="space-y-2">
                                <label class="block text-sm font-medium text-gray-400">Country</label>
                                <input type="text"
                                       name="country"
                                       class="w-full p-4 bg-brand-black/50 border border-brand-primary/20 rounded-xl text-white">
                            </div>
                        </div>

                        <button type="submit"
                                class="w-full md:w-auto px-6 py-3 bg-brand-primary text-white rounded-xl hover:bg-brand-primary/90 transition-colors">
                            Save Changes
                        </button>
                    </form>

                    <!-- Security Section -->
                    <div class="space-y-4 pb-14 lg:pb-0">
                        <h3 class="text-lg font-medium text-white">Security</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button onclick="window.handlePinChange()"
                                    class="p-4 bg-brand-black/50 border border-brand-primary/10 rounded-xl hover:bg-brand-primary/5 transition-colors flex items-center justify-between">
                                <span class="flex items-center gap-3">
                                    <i class="fas fa-key text-brand-primary"></i>
                                    <span class="text-white">Change Transaction PIN</span>
                                </span>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                            <!-- Second KYC button in Security Section -->
                            <button onclick="window.handleKycNavigation()"
                                    class="p-4 bg-brand-black/50 border border-brand-primary/10 rounded-xl hover:bg-brand-primary/5 transition-colors flex items-center justify-between">
                                <span class="flex items-center gap-3">
                                    <i class="fas fa-shield-alt text-brand-primary"></i>
                                    <span class="text-white">Identity Verification</span>
                                </span>
                                <i class="fas fa-chevron-right text-gray-400"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        `,pageEvents:w}};export{M as default};
//# sourceMappingURL=settings-Cd3moBzK.js.map
