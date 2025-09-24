import auth from '../../../utils/auth'
import { fetchUserNotifications, markNotificationAsRead } from '../../../utils/notifications'
import { loadPage, parsePathToRoute } from '../../../routes/router'
import LOGO from '../../../../images/logo.jpg'
import USER from '../../../../images/user.png'
import StyleUserPage from './style'
import toastify from '../../../components/toastify'
import handleActivePage from '../../../utils/HandleActivePage'
import { logoutHandler } from '../functions/loginHandler'

// SVG Icon Components
const icons = {
    trade: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
    </svg>`,
    discover: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>`,
    charts: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 13v-1m4 1v-3m4 3V8M12 21l9-9-9-9-9 9 9 9z"/>
    </svg>`,
    wallet: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
    </svg>`,
    notification: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
    </svg>`
}

const menuItems = [
    { id: 'trade', title: 'Trade', icon: icons.trade },
    { id: 'discover', title: 'Discover', icon: icons.discover },
    { id: 'charts', title: 'Charts', icon: icons.charts },
    { id: 'wallet', title: 'Wallet', icon: icons.wallet }
]

const Navbar = () => {
    // Get current route using parsePathToRoute
    const currentRoute = parsePathToRoute(window.location.pathname)
    let activeRoute = currentRoute.page || 'trade'
    let isProfileOpen = false
    let isNotificationOpen = false
    let notifications = []

    async function handleNotifications() {
        try {
            const { data, error } = await fetchUserNotifications()
            if (error) throw error

            notifications = data || []
            updateNotificationBadge()
            renderNotifications() // Add this new function call
        } catch (error) {
            console.error('Error fetching notifications:', error)
            notifications = []
        }
    }

    // Add this new function to render notifications
    function renderNotifications() {
        const dropdown = document.querySelector('#notificationDropdown')
        if (!dropdown) return

        const notificationContent = notifications.length ? notifications.map(notification => `
            <div class="p-3 rounded-xl hover:bg-brand-primary/10 transition-colors cursor-pointer
                        ${notification.is_read ? 'opacity-60' : 'border-l-2 border-brand-primary'}"
                 data-notification-id="${notification.id}">
                <div class="flex items-center justify-between">
                    <div class="text-sm text-white font-medium">${notification.title}</div>
                    <div class="text-xs text-gray-400">
                        ${new Date(notification.created_at).toLocaleDateString()}
                    </div>
                </div>
                <div class="text-xs text-gray-400 mt-1">${notification.message}</div>
            </div>
        `).join('') : `
            <div class="text-sm text-gray-400 text-center py-8">
                No notifications
            </div>
        `

        dropdown.innerHTML = /* html */`
            <div class="p-4">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-sm font-medium text-white">Notifications</div>
                    ${notifications.length ? `
                        <button class="text-xs text-brand-primary hover:text-brand-primary/80 transition-colors"
                                id="markAllRead">
                            Mark all as read
                        </button>
                    ` : ''}
                </div>
                <div class="space-y-2">
                    ${notificationContent}
                </div>
            </div>
        `
    }

    function updateNotificationBadge() {
        const badge = document.querySelector('#notificationBadge')
        if (badge) {
            const unread = notifications.filter(n => !n.is_read).length
            badge.textContent = unread
            badge.style.display = unread ? 'flex' : 'none'
        }
    }

    function toggleDropdown(type) {
        if (type === 'profile') {
            isProfileOpen = !isProfileOpen
            isNotificationOpen = false
        } else if (type === 'notification') {
            isNotificationOpen = !isNotificationOpen
            isProfileOpen = false
        }

        renderDropdowns()
    }

    function renderDropdowns() {
        // Update profile dropdown visibility
        const profileDropdown = document.querySelector('#profileDropdown')
        if (profileDropdown) {
            profileDropdown.style.display = isProfileOpen ? 'block' : 'none'
        }

        // Update notification dropdown visibility
        const notificationDropdown = document.querySelector('#notificationDropdown')
        if (notificationDropdown) {
            notificationDropdown.style.display = isNotificationOpen ? 'block' : 'none'
        }
    }

    async function handleNavigation(route) {
        try {
            if (!route) return

            // Parse the route first
            const parsed = parsePathToRoute(`/user/${route}`)
            if (parsed.page) {
                activeRoute = parsed.page
                await loadPage(parsed.page)
            }
        } catch (error) {
            console.error('Navigation error:', error)
            // Fallback to dashboard on error
            await loadPage('dashboard')
        }
    }



    async function pageEvents() {
        await handleNotifications()
        await handleActivePage()

        // Setup click handlers with null checks
        document.querySelectorAll('[data-route]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                const route = item.dataset.route
                if (route) {
                    handleNavigation(route)
                }
            })
        })
        // Logo click handler
        const logo = document.querySelector('[data-route="dashboard"]')
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault()
                handleNavigation('dashboard')
            })
        }

        document.querySelector('#profileButton')?.addEventListener('click',
            () => toggleDropdown('profile'))

        document.querySelector('#notificationButton')?.addEventListener('click',
            () => toggleDropdown('notification'))

        // Add notification click handlers
        document.addEventListener('click', async (e) => {
            const notification = e.target.closest('[data-notification-id]')
            if (notification) {
                const id = notification.dataset.notificationId
                await markNotificationAsRead(id)
                await handleNotifications() // Refresh notifications
            }

            const markAllReadBtn = e.target.closest('#markAllRead')
            if (markAllReadBtn) {
                await Promise.all(
                    notifications
                        .filter(n => !n.is_read)
                        .map(n => markNotificationAsRead(n.id))
                )
                await handleNotifications() // Refresh notifications
            }
        })

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown-container')) {
                isProfileOpen = false
                isNotificationOpen = false
                renderDropdowns()
            }
        })

        // Update logout handler to use loadPage
        const logoutBtn = document.getElementById("logout-btn")
        if (logoutBtn) {
            logoutBtn.addEventListener("click", async () => {
                await logoutHandler()
            })
        }
    }

    return {
        html: /* html */`
            <!-- Injected Styling -->
            ${StyleUserPage()}
            <!-- Desktop Sidebar -->
            <aside class="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-20 z-50 pt-10">
                <nav class="flex-1 py-6">
                    <div class="space-y-2 px-2">
                        ${menuItems.map(item => /* html */`
                            <button data-nav data-route="${item.id}"
                                    class="w-full flex flex-col items-center gap-2 p-3 rounded-xl 
                                           ${activeRoute === item.id ? 'bg-brand-primary text-white' : 'text-gray-400 hover:bg-brand-primary/10'}
                                           transition-all duration-200" href="/user/${item.id}">
                                <div class="w-10 h-10 flex items-center justify-center text-white">${item.icon}</div>
                                <span class="text-xs font-medium text-white">${item.title}</span>
                                ${item.badge ? `
                                    <span class="absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-xs 
                                                ${activeRoute === item.id ? 'bg-white/20' : 'bg-brand-primary text-white'}">
                                        ${item.badge}
                                    </span>
                                ` : ''}
                            </button>
                        `).join('')}
                    </div>
                </nav>
            </aside>

            <!-- Top Navigation -->
            <header class="sticky top-0 left-0 right-0 h-16 backdrop-blur-lg z-40">
                <div class="h-full px-4 flex items-center justify-between">
                    <!-- Logo -->
                    <div data-route="dashboard" class="cursor-pointer flex items-center gap-3">
                        <img src="${LOGO}" alt="Logo" class="h-8 w-auto">
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
                                ${icons.notification}
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
                                    ${notifications.length ? notifications.map(notification => `
                                        <div class="p-3 rounded-xl hover:bg-brand-primary/10 transition-colors 
                                                    ${notification.is_read ? 'opacity-60' : ''}">
                                            <div class="text-sm text-white">${notification.title}</div>
                                            <div class="text-xs text-gray-400 mt-1">${notification.message}</div>
                                        </div>
                                    `).join('') : `
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
                                <img src="${auth.getProfile()?.avatar_url || USER}" alt="Profile"
                                    class="w-8 h-8 rounded-xl object-cover">
                                <span class="hidden lg:block text-sm font-medium text-white">
                                    ${auth.getProfile()?.full_name || 'Guest'}
                                </span>
                            </button>

                            <!-- Profile Dropdown -->
                            <div id="profileDropdown"
                                class="hidden fixed lg:absolute top-[4rem] lg:top-full right-0 lg:right-0 mt-2 w-[calc(100vw-2rem)] mx-auto lg:w-64 
                                        rounded-2xl bg-brand-black border border-brand-primary/10
                                        shadow-lg shadow-black/20 z-[9999999]">
                                <div class="p-4 space-y-2">
                                    <div class="flex items-center gap-3 p-2">
                                        <img src="${auth.getProfile()?.avatar_url || USER}" alt="Profile" class="w-10 h-10 rounded-xl">
                                        <div>
                                            <div class="text-sm font-medium text-white">
                                                ${auth.getProfile()?.full_name || 'Guest'}
                                            </div>
                                            <div class="text-xs text-gray-400">
                                                ${auth.getProfile()?.email || ''}
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
                    ${menuItems.map(item => `
                        <button data-route="${item.id}"
                                class="flex flex-col items-center justify-center gap-1
                                    ${activeRoute === item.id ? 'text-brand-primary' : 'text-gray-400'}" href="/user/${item.id}">
                            <div class="w-6 h-6">${item.icon}</div>
                            <span class="text-xs">${item.title}</span>
                        </button>
                    `).join('')}
                </div>
            </nav>
        `,
        pageEvents
    }
}

export default Navbar