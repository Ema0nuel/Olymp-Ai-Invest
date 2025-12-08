import { setActiveNav } from '../utils/active';
import { startPreloader, stopPreloader } from '../utils/preloader';

// Route definitions
const routes = {
    main: {
        home: () => import('../views/main/home'),
        about: () => import('../views/main/about'),
        trading: () => import('../views/main/trading'),
        markets: () => import('../views/main/markets'),
        'market-overview': () => import('../views/main/marketsOverview'),
        help: () => import('../views/main/help'),
        contact: () => import('../views/main/contact'),
        faq: () => import('../views/main/faq'),
        security: () => import('../views/main/security'),
        privacy: () => import('../views/main/privacy'),
        terms: () => import('../views/main/terms'),
        education: () => import('../views/main/education'),
        notfound: () => import('../views/main/notfound'),
        'forgot-password': () => import('../views/user/forgot'),
        'reset-password': () => import('../views/user/reset')
    },
    user: {
        signup: () => import('../views/user/signup'),
        login: () => import('../views/user/login'),
        dashboard: () => import('../views/user/dashboard'),
        withdraw: () => import('../views/user/withdraw'),
        deposit: () => import('../views/user/deposit'),
        swap: () => import('../views/user/swap'),
        wallet: () => import('../views/user/wallet'),
        kyc: () => import('../views/user/kyc'),
        settings: () => import('../views/user/settings'),
        charts: () => import('../views/user/charts'),
        discover: () => import('../views/user/discover'),
        trade: () => import('../views/user/trade'),
        'copy-trade': () => import('../views/user/copyTrade'),
    },
    admin: {
        adminDashboard: () => import('../views/admin/dashboard'),
        adminLogin: () => import('../views/admin/login'),
        adminUsers: () => import('../views/admin/users'),
        adminTransactions: () => import('../views/admin/transactions'),
        adminAssets: () => import('../views/admin/assets'),
        adminAnalytics: () => import('../views/admin/viewAnalytics')
        // Add more admin routes here as needed
    },
};

// Route aliases for user/main only (never for admin)
const routeAliases = {
    'login': 'user/login',
    'signup': 'user/signup',
    'register': 'user/signup',
    'dashboard': 'user/dashboard',
    'withdraw': 'user/withdraw',
    'deposit': 'user/deposit',
    'wallet': 'user/wallet',
    'settings': 'user/settings',
    'trade': 'user/trade',
    'discover': 'user/discover',
    'charts': 'user/charts',
    'kyc': 'user/kyc',
    'swap': 'user/swap',
    'copy-trade': 'user/copy-trade',
};

export function parsePathToRoute(pathname) {
    let path = pathname.replace(/^\/+/, '').split(/[?#]/)[0];

    // Handle empty path
    if (path === '') {
        return { page: 'home' };
    }

    // Handle admin routes: /admin/login or /adminLogin -> adminLogin
    if (path.startsWith('admin/')) {
        const pagePart = path.replace('admin/', '');
        const adminPage = 'admin' + capitalizeFirst(pagePart);
        if (routes.admin[adminPage]) {
            return {
                page: adminPage,
                isAdmin: true,
                exists: true
            };
        }
    }
    // Handle /adminLogin or /adminDashboard directly
    if (path.startsWith('admin')) {
        // e.g. adminLogin, adminDashboard
        if (routes.admin[path]) {
            return {
                page: path,
                isAdmin: true,
                exists: true
            };
        }
    }

    // Aliases (never for admin)
    if (routeAliases[path]) {
        path = routeAliases[path];
    }

    // Handle user routes
    if (path.startsWith('user/')) {
        const page = path.replace('user/', '');
        return {
            page,
            isUser: true,
            exists: !!routes.user[page]
        };
    }

    // Handle main routes
    return {
        page: path,
        exists: !!routes.main[path]
    };
}

function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

async function renderPage(html, pageEvents) {
    const app = window.app;
    if (!app) return;

    // Clear existing content immediately
    app.innerHTML = '';
    app.style.opacity = '0';

    // Create wrapper for new content
    const wrapper = document.createElement('div');
    wrapper.className = 'page-wrapper';
    wrapper.innerHTML = html;

    // Add to DOM but keep hidden
    app.appendChild(wrapper);

    // Initialize page events before showing content
    if (pageEvents) {
        try {
            await pageEvents();
        } catch (error) {
            console.error('Page events error:', error);
        }
    }

    // Show content with smooth fade
    requestAnimationFrame(() => {
        app.style.transition = 'opacity 0.2s ease-out';
        app.style.opacity = '1';
    });
}

export async function loadPage(page, ...args) {
    try {

        const app = window.app;
        if (app) {
            app.style.transition = 'opacity 0.2s ease-out';
            app.style.opacity = '0';
        }

        await startPreloader();

        // Parse route and preserve admin state
        let route = typeof page === 'string' ?
            parsePathToRoute(page) :
            {
                page: page.page,
                isAdmin: page.isAdmin,
                isUser: page.isUser,
                exists: page.exists
            };

        // Only handle aliases if not an admin route
        if (!route.isAdmin && !route.isUser && routeAliases[route.page]) {
            route = parsePathToRoute(routeAliases[route.page]);
        }

        // Determine module loader
        let moduleLoader;
        if (route.isAdmin) {
            moduleLoader = routes.admin[route.page];
        } else if (route.isUser) {
            moduleLoader = routes.user[route.page] || routes.main.notfound;
        } else {
            moduleLoader = routes.main[route.page] || routes.main.notfound;
        }

        // Load component
        const [module] = await Promise.all([
            moduleLoader().catch(error => {
                console.error('Module loading error:', error);
                return routes.main.notfound();
            }),
            new Promise(resolve => setTimeout(resolve, 300))
        ]);

        const component = await module.default(...args);

        // Update path generation for admin routes
        const path = route.isAdmin ?
            `/admin/${route.page.replace('admin', '').toLowerCase()}` :
            route.isUser ? `/user/${route.page}` :
                route.page === 'home' ? '/' : `/${route.page}`;

        if (window.location.pathname !== path) {
            window.history.pushState({
                route: {
                    page: route.page,
                    isAdmin: route.isAdmin,
                    isUser: route.isUser,
                    exists: true
                },
                args
            }, '', path);
        }

        await stopPreloader();
        await renderPage(component.html, component.pageEvents);
        setActiveNav(route.page);

    } catch (error) {
        console.error('Navigation error:', error);
        await stopPreloader();

        const notFound = await routes.main.notfound();
        const errorPage = await notFound.default();
        await renderPage(errorPage.html, errorPage.pageEvents);
    }
}

// Add these styles to your CSS
const styles = document.createElement('style');
styles.textContent = `
    #app {
        min-height: 100vh;
        opacity: 1;
        transition: opacity 0.2s ease-out;
    }
    .page-wrapper {
        min-height: 100vh;
        width: 100%;
    }
    .preloader {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }
`;
document.head.appendChild(styles);

// Initialize router
window.addEventListener('DOMContentLoaded', async () => {
    if (!window.app) {
        window.app = document.createElement('div');
        window.app.id = 'app';
        document.body.prepend(window.app);
    }

    const route = parsePathToRoute(window.location.pathname);
    await loadPage(route);
});

// Update popstate event handler to preserve admin state
window.addEventListener('popstate', async (e) => {
    const pathname = window.location.pathname;
    const route = e.state?.route || parsePathToRoute(pathname);

    // Ensure admin state is preserved on browser navigation
    if (pathname.startsWith('/admin/')) {
        route.isAdmin = true;
        route.isUser = false;
    }

    await loadPage(route, ...(e.state?.args || []));
});

// Export routes for sitemap generation
export { routes };