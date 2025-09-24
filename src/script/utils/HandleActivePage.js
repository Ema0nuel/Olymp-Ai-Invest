export default async function handleActivePage() {
    // Get current route from pathname, handling /user/ prefix
    const pathParts = window.location.pathname.split('/').filter(Boolean)
    const currentRoute = pathParts.length > 1 && pathParts[0] === 'user'
        ? pathParts[1]  // Get the actual route after /user/
        : pathParts[0] || 'trade'

    // Update desktop navigation
    document.querySelectorAll('[data-nav], [data-route]').forEach(item => {
        const route = item.dataset.route || item.dataset.nav

        // Skip if no route found
        if (!route) return

        if (route === "dashboard") return

        if (route === currentRoute) {
            if (item.closest('.mobile-nav-menu')) {
                // Mobile styling
                item.classList.remove('text-gray-400')
                item.classList.add('text-brand-primary')
            } else {
                // Desktop styling
                item.classList.remove('text-gray-400')
                item.classList.add('bg-brand-primary', 'text-white')
            }
        } else {
            if (item.closest('.mobile-nav-menu')) {
                // Mobile styling
                item.classList.remove('text-brand-primary')
                item.classList.add('text-gray-400')
            } else {
                // Desktop styling
                item.classList.remove('bg-brand-primary', 'text-white')
                item.classList.add('text-gray-400')
            }
        }
    })
}