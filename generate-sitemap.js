import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL — update to your live domain
const BASE_URL = 'https://www.olympaiinvest.com';

// Routes extracted from router.js (manually maintained)
// This is the definitive route structure
const routes = {
    main: {
        home: true,
        about: true,
        trading: true,
        markets: true,
        'market-overview': true,
        help: true,
        contact: true,
        faq: true,
        security: true,
        privacy: true,
        terms: true,
        education: true,
        notfound: true,
        'forgot-password': true,
        'reset-password': true,
    },
    user: {
        signup: true,
        login: true,
        dashboard: true,
        withdraw: true,
        deposit: true,
        swap: true,
        wallet: true,
        kyc: true,
        settings: true,
        charts: true,
        discover: true,
        trade: true,
        'copy-trade': true,
    },
    admin: {
        adminDashboard: true,
        adminLogin: true,
        adminUsers: true,
        adminTransactions: true,
        adminAssets: true,
        adminAnalytics: true,
    },
};

// SEO config: route patterns -> priority & changefreq
const routeConfig = {
    // Main/Public routes (higher priority, crawl frequently)
    'home': { priority: '1.0', changefreq: 'daily' },
    'trading': { priority: '0.9', changefreq: 'daily' },
    'markets': { priority: '0.9', changefreq: 'daily' },
    'market-overview': { priority: '0.8', changefreq: 'weekly' },
    'about': { priority: '0.7', changefreq: 'monthly' },
    'contact': { priority: '0.8', changefreq: 'monthly' },
    'help': { priority: '0.6', changefreq: 'weekly' },
    'faq': { priority: '0.6', changefreq: 'weekly' },
    'education': { priority: '0.6', changefreq: 'weekly' },
    'security': { priority: '0.7', changefreq: 'yearly' },
    'privacy': { priority: '0.3', changefreq: 'yearly' },
    'terms': { priority: '0.3', changefreq: 'yearly' },
    'forgot-password': { priority: '0.5', changefreq: 'monthly' },
    'reset-password': { priority: '0.5', changefreq: 'monthly' },
    'notfound': { includeInSitemap: false },

    // User routes (protected, do not include in public sitemap)
    'user/signup': { includeInSitemap: false },
    'user/login': { includeInSitemap: false },
    'user/dashboard': { includeInSitemap: false },
    'user/withdraw': { includeInSitemap: false },
    'user/deposit': { includeInSitemap: false },
    'user/swap': { includeInSitemap: false },
    'user/wallet': { includeInSitemap: false },
    'user/kyc': { includeInSitemap: false },
    'user/settings': { includeInSitemap: false },
    'user/charts': { includeInSitemap: false },
    'user/discover': { includeInSitemap: false },
    'user/trade': { includeInSitemap: false },
    'user/copy-trade': { includeInSitemap: false },

    // Admin routes (never include in public sitemap)
    'admin/adminLogin': { includeInSitemap: false },
    'admin/adminDashboard': { includeInSitemap: false },
    'admin/adminUsers': { includeInSitemap: false },
    'admin/adminTransactions': { includeInSitemap: false },
    'admin/adminAssets': { includeInSitemap: false },
    'admin/adminAnalytics': { includeInSitemap: false },
};

// Default config if route not explicitly defined
const DEFAULT_CONFIG = {
    priority: '0.5',
    changefreq: 'weekly',
    includeInSitemap: true
};

/**
 * Flatten routes object into array of route paths
 */
function flattenRoutes(routesObj, prefix = '') {
    const result = [];
    for (const [key, value] of Object.entries(routesObj)) {
        const fullPath = prefix ? `${prefix}/${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            // Nested object — recurse
            result.push(...flattenRoutes(value, fullPath));
        } else if (value === true || typeof value === 'function') {
            // This is a route — add it
            result.push(fullPath);
        }
    }
    return result;
}

/**
 * Convert route path to URL slug
 * Removes the 'main' prefix and converts properly:
 * 'home' => '/'
 * 'about' => '/about'
 * 'user/login' => '/user/login'
 * 'admin/adminDashboard' => '/admin/dashboard'
 */
function routeToUrlPath(routePath) {
    // Remove 'main/' prefix if present
    if (routePath.startsWith('main/')) {
        routePath = routePath.replace('main/', '');
    }

    // If 'home' (after removing main), it's root
    if (routePath === 'home') {
        return '/';
    }

    // Convert admin route names: adminDashboard -> dashboard, adminLogin -> login
    if (routePath.startsWith('admin/')) {
        const adminRoute = routePath.replace('admin/', '').replace(/^admin/, '').toLowerCase();
        return '/admin/' + adminRoute;
    }

    // Return with leading slash
    return '/' + routePath;
}

/**
 * Generate sitemap XML
 */
function generateSitemap(routePaths) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    const today = new Date().toISOString().split('T')[0];
    const urlSet = new Set(); // Avoid duplicates

    for (const routePath of routePaths) {
        const config = routeConfig[routePath] || DEFAULT_CONFIG;

        // Skip if explicitly marked as not to include
        if (config.includeInSitemap === false) {
            continue;
        }

        const urlPath = routeToUrlPath(routePath);

        // Avoid duplicate root entries
        if (urlSet.has(urlPath)) {
            continue;
        }
        urlSet.add(urlPath);

        const url = `${BASE_URL}${urlPath}`;
        const priority = config.priority || DEFAULT_CONFIG.priority;
        const changefreq = config.changefreq || DEFAULT_CONFIG.changefreq;

        xml += '  <url>\n';
        xml += `    <loc>${escapeXml(url)}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${changefreq}</changefreq>\n`;
        xml += `    <priority>${priority}</priority>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>\n';
    return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(str) {
    return String(str).replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
}

/**
 * Main: generate and write sitemap
 */
function main() {
    try {
        console.log('🔍 Flattening routes...');
        const routePaths = flattenRoutes(routes);
        console.log(`✓ Found ${routePaths.length} total routes`);

        console.log('🛠 Generating sitemap...');
        const sitemapXml = generateSitemap(routePaths);

        const outputPath = path.join(__dirname, 'sitemap.xml');
        fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
        console.log(`✅ Sitemap written to: ${outputPath}`);

        // Log summary for review
        console.log('\n📋 Route Summary:');
        const publicRoutes = routePaths.filter(r => {
            const config = routeConfig[r] || DEFAULT_CONFIG;
            return config.includeInSitemap !== false;
        });
        console.log(`   Public/Crawlable: ${publicRoutes.length}`);
        console.log(`   Protected/Excluded: ${routePaths.length - publicRoutes.length}`);
        console.log('\n🌐 Sample Public URLs:');
        publicRoutes.slice(0, 10).forEach(r => {
            const url = `${BASE_URL}${routeToUrlPath(r)}`;
            const config = routeConfig[r] || DEFAULT_CONFIG;
            console.log(`   ${url} (priority: ${config.priority})`);
        });
    } catch (err) {
        console.error('❌ Error generating sitemap:', err);
        process.exit(1);
    }
}

main();
