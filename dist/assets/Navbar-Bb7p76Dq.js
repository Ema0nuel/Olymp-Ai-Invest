import{a as c,b as E}from"./auth-O7crs3AA.js";import{s as u}from"./supabaseClients-DZSCHltC.js";import{p as x,l as y}from"./index-Ct12iCQQ.js";import{L as z}from"./logo-9_xFcp4C.js";import{A as k}from"./user-BBhvX4PB.js";async function N(){try{const{data:{session:i},error:r}=await u.auth.getSession();if(r||!i)throw new Error("Not authenticated");const e=i.user.id,{data:n,error:a}=await u.from("notifications").select(`
                id,
                title,
                message,
                type,
                is_read,
                created_at
            `).eq("user_id",e).order("created_at",{ascending:!1});if(a)throw a;return{data:n,error:null}}catch(i){return console.error("Fetch notifications error:",i),{data:null,error:i.message}}}async function $(i){try{const{data:{session:r},error:e}=await u.auth.getSession();if(e||!r)throw new Error("Not authenticated");const n=r.user.id,{data:a,error:l}=await u.from("notifications").update({is_read:!0}).match({id:i,user_id:n}).select().single();if(l)throw l;return{data:a,error:null}}catch(r){return console.error("Mark notification error:",r),{error:r.message}}}async function R(i,r,e,n){try{if(!["deposit","withdrawal","swap","system"].includes(r))throw new Error("Invalid notification type");const{data:a,error:l}=await u.from("notifications").insert({user_id:i,type:r,title:e,message:n,is_read:!1}).select().single();if(l)throw l;return{data:a,error:null}}catch(a){return console.error("Create notification error:",a),{error:a.message}}}function P(){return`
        <style>
            /* Reset and Base Styles */
            :root {
                --nav-height: 4rem;
                --header-height: 4rem;
                --safe-area: env(safe-area-inset-bottom, 0px);
                --address-bar: var(--address-bar-height, 0px);--vh: 1vh;
                --brand-black: #242424;
                --brand-primary: #f1d416;
            }

            /* Layout & Viewport Fixes */
            body {
                margin: 0;
                padding: 0;
                height: 100vh;
                height: calc(var(--vh, 1vh) * 100);
                overflow: hidden;
                position: fixed;
                width: 100%;
                -webkit-text-size-adjust: none !important;
                overscroll-behavior-y: none;
                -webkit-overflow-scrolling: touch;
                -webkit-tap-highlight-color: transparent;
                background-color: var(--brand-black);
                font-family: "BankFont", system-ui, -apple-system, sans-serif;
            }

            /* Prevent Zoom on Inputs */
            input, textarea {
                font-size: 16px !important;
                max-height: 100%;
                -webkit-text-size-adjust: 100% !important;
                transform: translateZ(0);
            }
            /* Select element fixes */
            select {
                -webkit-appearance: none;
                appearance: none;
                position: relative;
                z-index: 3;
                background-color: var(--brand-black);
                border: 1px solid rgba(255,255,255,0.1);
            }

            /* Prevent select dropdown from disappearing */
            .select-wrapper {
                position: relative;
                z-index: 100;
            }

            /* Smooth Transitions */
            .page-transition {
                animation: fadeIn 0.3s ease-out;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Layout Structure */
            .main-scroll-view {
                position: fixed;
                top: var(--header-height);
                left: 0;
                right: 0;
                bottom: 0;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
                padding: 1rem;
                padding-bottom: calc(1rem + var(--safe-area));
                transition: all 0.3s ease;
                z-index: 1;
                transform: translate3d(0,0,0);
                -webkit-transform: translate3d(0,0,0);
            }

            .mobile-nav-menu {
                position: fixed !important;
                left: 0 !important;
                right: 0 !important;
                top: cal(100vh - 4rem - env(safe-area-inset-bottom, 0px)) !important;
                width: 100% !important;
                height: calc(var(--nav-height) + var(--safe-area)) !important;
                background-color: var(--brand-black) !important;
                padding-bottom: var(--safe-area) !important;
                transition: transform 0.3s ease;
            }
            
            .dropdown-container,
            #notificationDropdown {
                z-index: 9999 !important;
            }

            /* Fix for input focus issues */
            .input-wrapper {
                transform: translateZ(0);
                -webkit-transform: translate3d(0,0,0);
                backface-visibility: hidden;
                position: relative;
                z-index: 2;
            }

            /* Prevent content disappearing */
            .content-wrapper {
                transform: translateZ(0);
                -webkit-transform: translate3d(0,0,0);
                backface-visibility: hidden;
                contain: paint;
            }

            /* Mobile Specific (< 768px) */
            @media (max-width: 768px) {
                .main-scroll-view {
                    padding-top: 4rem !important;
                    height: calc((var(--vh, 1vh) * 100) - var(--header-height) - var(--safe-area));
                    -webkit-mask-image: -webkit-radial-gradient(white, black);
                }

                /* Force hardware acceleration */
                body * {
                    -webkit-transform: translateZ(0);
                    -moz-transform: translateZ(0);
                    -ms-transform: translateZ(0);
                    -o-transform: translateZ(0);
                    transform: translateZ(0);
                }
            }

            /* Tablet (769px - 1023px) */
            @media (min-width: 769px) and (max-width: 1023px) {
                .main-scroll-view {
                    padding-top: 4rem !important;
                    height: calc((var(--vh, 1vh) * 100) - var(--header-height) - var(--safe-area));
                    -webkit-mask-image: -webkit-radial-gradient(white, black);
                }
            }

            /* Desktop (> 1024px) */
            @media (min-width: 1024px) {
                .main-scroll-view {
                    left: 5rem;
                    right: 1rem;
                    padding: 2rem;
                    padding-top: 0;
                    height: calc(100vh - var(--header-height));
                }

                .mobile-nav-menu {
                    display: none !important;
                }
            }
        </style>

        <script>
            ${j()}
        <\/script>
    `}function j(){const i=document.documentElement;let r;function e(){const l=window.innerHeight*.01;i.style.setProperty("--vh",`${l}px`)}function n(){document.querySelectorAll("select").forEach(f=>{f.addEventListener("focus",()=>{const m=document.querySelector(".main-scroll-view"),v=m.scrollTop;f.addEventListener("blur",()=>{setTimeout(()=>{m.scrollTop=v},0)},{once:!0})})})}return e(),n(),window.addEventListener("resize",()=>{clearTimeout(r),r=setTimeout(e,100)},{passive:!0}),window.addEventListener("orientationchange",()=>{setTimeout(e,100)},{passive:!0}),new MutationObserver(n).observe(document.body,{childList:!0,subtree:!0}),""}async function B(){const i=window.location.pathname.split("/").filter(Boolean),r=i.length>1&&i[0]==="user"?i[1]:i[0]||"trade";document.querySelectorAll("[data-nav], [data-route]").forEach(e=>{const n=e.dataset.route||e.dataset.nav;n&&n!=="dashboard"&&(n===r?e.closest(".mobile-nav-menu")?(e.classList.remove("text-gray-400"),e.classList.add("text-brand-primary")):(e.classList.remove("text-gray-400"),e.classList.add("bg-brand-primary","text-white")):e.closest(".mobile-nav-menu")?(e.classList.remove("text-brand-primary"),e.classList.add("text-gray-400")):(e.classList.remove("bg-brand-primary","text-white"),e.classList.add("text-gray-400")))})}const p={trade:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>`,discover:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>`,charts:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z"/>
    </svg>`,wallet:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
    </svg>`,notification:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
    </svg>`},L=[{id:"trade",title:"Trade",icon:p.trade},{id:"discover",title:"Discover",icon:p.discover},{id:"charts",title:"Charts",icon:p.charts},{id:"wallet",title:"Wallet",icon:p.wallet}],q=()=>{let r=x(window.location.pathname).page||"trade",e=!1,n=!1,a=[];async function l(){try{const{data:t,error:o}=await N();if(o)throw o;a=t||[],m(),f()}catch(t){console.error("Error fetching notifications:",t),a=[]}}function f(){const t=document.querySelector("#notificationDropdown");if(!t)return;const o=a.length?a.map(s=>`
            <div class="p-3 rounded-xl hover:bg-brand-primary/10 transition-colors cursor-pointer
                        ${s.is_read?"opacity-60":"border-l-2 border-brand-primary"}"
                 data-notification-id="${s.id}">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-white font-medium">${s.title}</div>
                    <div class="text-xs text-gray-400">
                        ${new Date(s.created_at).toLocaleDateString()}
                    </div>
                </div>
                <div class="text-xs text-gray-400 mt-1">${s.message}</div>
            </div>
        `).join(""):`
            <div class="text-sm text-gray-400 text-center py-8">
                No notifications
            </div>
        `;t.innerHTML=`
            <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-sm font-medium text-white">Notifications</div>
                    ${a.length?`
                        <button class="text-xs text-brand-primary hover:text-brand-primary/80 transition-colors"
                                id="markAllRead">
                            Mark all as read
                        </button>
                    `:""}
                </div>
                <div class="space-y-2">
                    ${o}
                </div>
            </div>
        `}function m(){const t=document.querySelector("#notificationBadge");if(t){const o=a.filter(s=>!s.is_read).length;t.textContent=o,t.style.display=o?"flex":"none"}}function v(t){t==="profile"?(e=!e,n=!1):t==="notification"&&(n=!n,e=!1),w()}function w(){const t=document.querySelector("#profileDropdown");t&&(t.style.display=e?"block":"none");const o=document.querySelector("#notificationDropdown");o&&(o.style.display=n?"block":"none")}async function b(t){try{if(!t)return;const o=x(`/user/${t}`);o.page&&(r=o.page,await y(o.page))}catch(o){console.error("Navigation error:",o),await y("dashboard")}}async function S(){await l(),await B(),document.querySelectorAll("[data-route]").forEach(s=>{s.addEventListener("click",h=>{h.preventDefault();const g=s.dataset.route;g&&b(g)})});const t=document.querySelector('[data-route="dashboard"]');t&&t.addEventListener("click",s=>{s.preventDefault(),b("dashboard")}),document.querySelector("#profileButton")?.addEventListener("click",()=>v("profile")),document.querySelector("#notificationButton")?.addEventListener("click",()=>v("notification")),document.addEventListener("click",async s=>{const h=s.target.closest("[data-notification-id]");if(h){const d=h.dataset.notificationId;await $(d),await l()}s.target.closest("#markAllRead")&&(await Promise.all(a.filter(d=>!d.is_read).map(d=>$(d.id))),await l())}),document.addEventListener("click",s=>{s.target.closest(".dropdown-container")||(e=!1,n=!1,w())});const o=document.getElementById("logout-btn");o&&o.addEventListener("click",async()=>{await E()})}return{html:`
            <!-- Injected Styling -->
            ${P()}
            <!-- Desktop Sidebar -->
            <aside class="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-20 z-50 pt-10">
                <nav class="flex-1 py-6">
                    <div class="space-y-2 px-2">
                        ${L.map(t=>`
                            <button data-nav data-route="${t.id}"
                                    class="w-full flex flex-col items-center gap-2 p-3 rounded-xl 
                                           ${r===t.id?"bg-brand-primary text-white":"text-gray-400 hover:bg-brand-primary/10"}
                                           transition-all duration-200" href="/user/${t.id}">
                                <div class="w-10 h-10 flex items-center justify-center text-white">${t.icon}</div>
                                <span class="text-xs font-medium text-white">${t.title}</span>
                                ${t.badge?`
                                    <span class="absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-xs 
                                                ${r===t.id?"bg-white/20":"bg-brand-primary text-white"}">
                                        ${t.badge}
                                    </span>
                                `:""}
                            </button>
                        `).join("")}
                    </div>
                </nav>
            </aside>

            <!-- Top Navigation -->
            <header class="sticky top-0 left-0 right-0 h-16 backdrop-blur-lg z-40">
                <div class="h-full px-4 flex items-center justify-between">
                    <!-- Logo -->
                    <div data-route="dashboard" class="cursor-pointer flex items-center gap-3">
                        <img src="${z}" alt="Logo" class="h-8 w-auto">
                        <span class="text-xl font-bold text-brand-primary bg-clip-text">
                            Dashboard
                        </span>
                    </div>

                    <!-- Right Actions -->
                    <div class="flex items-center gap-4 z-50">
                        <!-- Notifications -->
                        <div class="dropdown-container relative z-[99999]">
                            <button id="notificationButton"
                                    class="w-10 h-10 rounded-xl flex items-center justify-center 
                                           hover:bg-brand-primary/10 transition-colors">
                                ${p.notification}
                                <span id="notificationBadge"
                                      class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-primary
                                             flex items-center justify-center text-xs text-white
                                             ring-2 ring-brand-dark">
                                </span>
                            </button>

                            <!-- Notification Dropdown -->
                            <div id="notificationDropdown"
                                class="hidden fixed lg:absolute top-[4rem] lg:top-full -right-16 lg:right-0 mt-2 
                                        w-[calc(100vw-2rem)] mx-auto lg:w-80 max-h-[calc(100vh-12rem)] overflow-y-auto
                                        rounded-2xl bg-brand-black border border-brand-primary/10
                                        shadow-lg shadow-black/20 h-[300px] lg:h-[400px] z-[9999999]">
                                <div class="p-4">
                                    <div class="text-sm font-medium text-white mb-2">Notifications</div>
                                    ${a.length?a.map(t=>`
                                        <div class="p-3 rounded-xl hover:bg-brand-primary/10 transition-colors 
                                                    ${t.is_read?"opacity-60":""}">
                                            <div class="text-sm text-white">${t.title}</div>
                                            <div class="text-xs text-gray-400 mt-1">${t.message}</div>
                                        </div>
                                    `).join(""):`
                                        <div class="text-sm text-gray-400 text-center py-8">
                                            No notifications
                                        </div>
                                    `}
                                </div>
                            </div>
                        </div>

                        <!-- Profile -->
                        <div class="dropdown-container relative">
                            <button id="profileButton"
                                    class="flex items-center gap-2 px-3 py-2 rounded-xl
                                        hover:bg-brand-primary/10 transition-colors">
                                <img src="${c.getProfile()?.avatar_url||k}" alt="Profile"
                                    class="w-8 h-8 rounded-xl object-cover">
                                <span class="hidden lg:block text-sm font-medium text-white">
                                    ${c.getProfile()?.full_name||"Guest"}
                                </span>
                            </button>

                            <!-- Profile Dropdown -->
                            <div id="profileDropdown"
                                class="hidden fixed lg:absolute top-[4rem] lg:top-full right-0 lg:right-0 mt-2 w-[calc(100vw-2rem)] mx-auto lg:w-64 
                                        rounded-2xl bg-brand-black border border-brand-primary/10
                                        shadow-lg shadow-black/20 z-[9999999]">
                                <div class="p-4 space-y-2">
                                    <div class="flex items-center gap-3 p-2">
                                        <img src="${c.getProfile()?.avatar_url||k}" alt="Profile" class="w-10 h-10 rounded-xl">
                                        <div>
                                            <div class="text-sm font-medium text-white">
                                                ${c.getProfile()?.full_name||"Guest"}
                                            </div>
                                            <div class="text-xs text-gray-400">
                                                ${c.getProfile()?.email||""}
                                            </div>
                                        </div>
                                    </div>
                                    <hr class="border-brand-primary/10">
                                    <button data-nav data-route="settings" class="w-full text-left p-2 text-sm text-gray-400 hover:text-white
                                                hover:bg-brand-primary/10 rounded-lg transition-colors">
                                        Settings
                                    </button>
                                    <button class="w-full text-left p-2 text-sm text-red-500 hover:text-red-400
                                                hover:bg-red-500/10 rounded-lg transition-colors" id="logout-btn">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- Mobile Bottom Navigation -->
            <nav class="lg:hidden h-16 z-[10]
                    border-t border-brand-primary/10 w-full mobile-nav-menu">
                <div class="h-full grid grid-cols-4 px-4 bg-brand-black/95 backdrop-blur-3xl">
                    ${L.map(t=>`
                        <button data-route="${t.id}"
                                class="flex flex-col items-center justify-center gap-1
                                    ${r===t.id?"text-brand-primary":"text-gray-400"}" href="/user/${t.id}">
                            <div class="w-6 h-6">${t.icon}</div>
                            <span class="text-xs">${t.title}</span>
                        </button>
                    `).join("")}
                </div>
            </nav>
        `,pageEvents:S}};export{q as N,R as c};
//# sourceMappingURL=Navbar-Bb7p76Dq.js.map
