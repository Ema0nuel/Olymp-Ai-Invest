import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://www.olympaiinvest.com';

// ROUTES: mirror your router structure; set value true for public routes
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
        education: true
    }
};

// MANUAL PAGES: add any specific pages that are missing from the router extraction
// Example: '/special-offer' or '/about/team' — always include leading slash
const manualPages = [
    // Add the missing page here:
    '/about/team' // <-- add your missing path (exact path) if router doesn't export it
];

const routeConfig = {
    home: { priority: '1.0', changefreq: 'daily' },
    trading: { priority: '0.9', changefreq: 'daily' },
    markets: { priority: '0.9', changefreq: 'daily' },
    'market-overview': { priority: '0.8', changefreq: 'weekly' },
    about: { priority: '0.7', changefreq: 'monthly' },
    'about/team': { priority: '0.6', changefreq: 'monthly' }, // example mapping for manual page
    contact: { priority: '0.8', changefreq: 'monthly' },
    help: { priority: '0.6', changefreq: 'weekly' },
    faq: { priority: '0.6', changefreq: 'weekly' },
    education: { priority: '0.6', changefreq: 'weekly' },
    security: { priority: '0.7', changefreq: 'yearly' },
    privacy: { priority: '0.3', changefreq: 'yearly' },
    terms: { priority: '0.3', changefreq: 'yearly' }
};

const DEFAULT_CONFIG = { priority: '0.5', changefreq: 'weekly', includeInSitemap: true };

function flattenRoutes(routesObj, prefix = '') {
    const result = [];
    for (const [key, value] of Object.entries(routesObj)) {
        const fullPath = prefix ? `${prefix}/${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            result.push(...flattenRoutes(value, fullPath));
        } else if (value === true) {
            result.push(fullPath);
        }
    }
    return result;
}

function routeToUrlPath(routePath) {
    if (routePath.startsWith('main/')) routePath = routePath.replace('main/', '');
    if (routePath === 'home') return '/';
    return '/' + routePath;
}

function generateSitemap(routePaths, manualPaths = []) {
    const today = new Date().toISOString().split('T')[0];
    const urlSet = new Set();
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // add from routes
    for (const routePath of routePaths) {
        const short = routePath.replace(/^main\//, '').replace(/\/$/, '');
        const config = routeConfig[short] || DEFAULT_CONFIG;
        if (config.includeInSitemap === false) continue;
        const urlPath = routeToUrlPath(routePath);
        if (urlSet.has(urlPath)) continue;
        urlSet.add(urlPath);
        const url = `${BASE_URL}${urlPath}`;
        xml += '  <url>\n';
        xml += `    <loc>${url}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${config.changefreq}</changefreq>\n`;
        xml += `    <priority>${config.priority}</priority>\n`;
        xml += '  </url>\n';
    }

    // add manual pages (exact paths)
    for (const p of manualPaths) {
        const normalized = p.startsWith('/') ? p : `/${p}`;
        if (urlSet.has(normalized)) continue;
        urlSet.add(normalized);
        const key = normalized.replace(/^\//, '');
        const cfg = routeConfig[key] || DEFAULT_CONFIG;
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${normalized}</loc>\n`;
        xml += `    <lastmod>${today}</lastmod>\n`;
        xml += `    <changefreq>${cfg.changefreq}</changefreq>\n`;
        xml += `    <priority>${cfg.priority}</priority>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>\n';
    return xml;
}

function main() {
    const routePaths = flattenRoutes(routes);
    const sitemapXml = generateSitemap(routePaths, manualPages);

    const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, sitemapXml, 'utf-8');
    console.log(`✅ Sitemap written to: ${outputPath}`);
    console.log(`Included URLs: ${Array.from(new Set([...routePaths.map(r => routeToUrlPath(r)), ...manualPages])).join(', ')}`);
}

main();
