import"./index-Ct12iCQQ.js";import"./index-bXXNSZn9.js";import{L as r}from"./logo-9_xFcp4C.js";function v(){const t="bg-brand-primary text-white",a="text-gray-400";function e(){const o=window.location.pathname;document.querySelectorAll("[data-nav]").forEach(s=>{const n=s.dataset.route;o.includes(`/admin/${n}`)?(s.classList.add(...t.split(" ")),s.classList.remove(...a.split(" "))):(s.classList.remove(...t.split(" ")),s.classList.add(...a.split(" ")))})}return e(),`
        <style>
            .icon-container svg {
                transition: transform 0.2s ease;
            }
            [data-nav]:hover .icon-container svg {
                transform: scale(1.1);
            }
            .mobile-nav-menu {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
            }
        </style>
    `}const u=()=>{const t=[{id:"dashboard",label:"Dashboard",path:"/admin/dashboard",icon:`<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
            </svg>`},{id:"users",label:"Users",path:"/admin/users",icon:`<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>`},{id:"transactions",label:"Transactions",path:"/admin/transactions",icon:`<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`},{id:"assets",label:"Assets",path:"/admin/assets",icon:`<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>`},{id:"analytics",label:"Analytics",path:"/admin/analytics",icon:`<svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>`}];return{html:`
        <!-- Desktop Sidebar -->
        <aside class="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-24 backdrop-blur-xl z-40">
            <!-- Logo -->
            <div class="p-6 flex justify-center border-b border-brand-primary/10">
                <img src="${r}" alt="Logo" class="w-12 h-12">
            </div>

            <!-- Navigation -->
            <nav class="flex-1 py-8">
                <div class="space-y-4 px-3">
                    ${t.map(a=>`
                        <button data-nav data-route="${a.id}"
                                class="w-full aspect-square flex flex-col items-center justify-center gap-2 p-3 
                                       rounded-xl text-gray-400 hover:bg-brand-primary/10 hover:text-white 
                                       transition-all duration-300">
                            <div class="icon-container">${a.icon}</div>
                            <span class="text-xs font-medium">${a.label}</span>
                        </button>
                    `).join("")}
                </div>
            </nav>

            <!-- Logout Button -->
            <div class="p-4 border-t border-brand-primary/10">
                <button id="admin-logout"
                        class="w-full aspect-square flex flex-col items-center justify-center p-3 
                               rounded-xl text-red-500 hover:bg-red-500/10 transition-all duration-300">
                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                    </svg>
                    <span class="text-xs font-medium mt-2">Logout</span>
                </button>
            </div>
        </aside>

        <!-- Mobile Bottom Navigation -->
        <nav class="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-brand-black/95 backdrop-blur-3xl 
                    border rounded-lg border-brand-primary/10 z-50 px-0 p-2">
            <div class="h-full grid grid-cols-5 gap-1 px-2">
                ${t.map(a=>`
                    <button data-nav data-route="${a.id}"
                            class="flex flex-col items-center justify-center gap-1 p-2
                                   text-gray-400 hover:text-white transition-colors rounded-lg">
                        <div class="icon-container">${a.icon}</div>
                        <span class="text-[10px] font-medium">${a.label}</span>
                    </button>
                `).join("")}
            </div>
        </nav>
        `}};export{u as A,v as S};
//# sourceMappingURL=Navbar-CfGHmPCC.js.map
