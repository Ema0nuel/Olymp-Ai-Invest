// ...existing code...
import reset, { cleanupAll } from '../../utils/reset';
import AdminNavbar from './components/Navbar';
import StyleAdminPage from './components/style';
import supabase from '../../utils/supabaseClients';
import Modal from '../../components/Modal';
import { loadPage } from '../../routes/router';

// Safe, single-render analytics view with robust Chart.js handling
export default async function analyticsView() {
    reset('Analytics');
    cleanupAll();

    let charts = {};            // local chart instances
    let isRendering = false;    // guard against re-entrancy
    let mounted = true;         // track lifecycle for async work

    function safeDestroy(chart) {
        try { if (chart && typeof chart.destroy === 'function') chart.destroy(); } catch (e) { /* noop */ }
    }

    function destroyChartForCanvas(canvas) {
        try {
            if (!canvas || !window.Chart) return;
            const existing = window.Chart.getChart(canvas) || window.Chart.getChart(canvas.id);
            if (existing) existing.destroy();
        } catch (e) { /* noop */ }
    }

    function cleanupCharts() {
        Object.values(charts).forEach(c => safeDestroy(c));
        charts = {};
        ['chart-visitors', 'chart-devices', 'chart-pages'].forEach(id => {
            const el = document.getElementById(id);
            if (el) destroyChartForCanvas(el);
        });
    }

    async function loadChartJsOnce() {
        if (window.Chart) return;
        if (window._chartJsLoading) { await window._chartJsLoading; return; }
        window._chartJsLoading = new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            s.onload = () => { resolve(); window._chartJsLoading = null; };
            s.onerror = (e) => { reject(e); window._chartJsLoading = null; };
            document.head.appendChild(s);
        });
        await window._chartJsLoading;
    }

    async function fetchLogs(limit = 1000) {
        const { data, error } = await supabase
            .from('activity_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(limit);
        if (error) throw error;
        return data || [];
    }

    function showLogModal(log) {
        new Modal({
            title: 'Activity Details',
            content: `
        <div class="space-y-3 text-sm">
          <div><strong>Time:</strong> ${new Date(log.created_at).toLocaleString()}</div>
          <div><strong>Page:</strong> ${log.row_data?.page || 'N/A'}</div>
          <div><strong>Operation:</strong> ${log.operation || ''}</div>
          <div><strong>IP:</strong> ${log.ip_address || 'N/A'}</div>
          <div><strong>Location:</strong> ${log.geo?.city || ''} ${log.geo?.country || ''}</div>
          <div><strong>Device:</strong> ${log.device_info?.platform || ''} ${log.device_info?.language || ''}</div>
          <pre class="mt-2 p-2 bg-[#0b0b0b] rounded text-xs overflow-auto">${JSON.stringify(log, null, 2)}</pre>
        </div>
      `
        }).show();
    }

    function processLogs(logs) {
        const labels = [];
        const countsByDate = {};
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const key = d.toLocaleDateString();
            labels.push(key);
            countsByDate[key] = 0;
        }

        const devices = {};
        const pages = {};
        const countries = {};

        logs.forEach(l => {
            const day = new Date(l.created_at).toLocaleDateString();
            if (countsByDate[day] !== undefined) countsByDate[day]++;

            const dev = l.device_info?.platform?.split(' ')[0] || 'Unknown';
            devices[dev] = (devices[dev] || 0) + 1;

            const page = l.row_data?.page || 'Unknown';
            pages[page] = (pages[page] || 0) + 1;

            const country = l.geo?.country || 'Unknown';
            countries[country] = (countries[country] || 0) + 1;
        });

        return {
            labels,
            visitors: labels.map(l => countsByDate[l]),
            devices,
            pages,
            countries
        };
    }

    // Create card + canvas nodes via DOM APIs to guarantee availability
    function buildChartCards(container) {
        // clear container
        container.innerHTML = '';

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-6';

        const makeCard = (title, canvasId) => {
            const card = document.createElement('div');
            card.className = 'bg-brand-black/50 rounded-2xl p-6';
            const h = document.createElement('h2');
            h.className = 'text-lg font-bold text-brand-primary mb-3';
            h.textContent = title;
            const wrapper = document.createElement('div');
            wrapper.style.height = '300px';
            const canvas = document.createElement('canvas');
            canvas.id = canvasId;
            canvas.width = 800; // explicit size helps Chart.js
            canvas.height = 300;
            wrapper.appendChild(canvas);
            card.appendChild(h);
            card.appendChild(wrapper);
            return card;
        };

        grid.appendChild(makeCard('Visitors (last 7 days)', 'chart-visitors'));
        grid.appendChild(makeCard('Devices', 'chart-devices'));

        const pagesCard = document.createElement('div');
        pagesCard.className = 'lg:col-span-2 bg-brand-black/50 rounded-2xl p-6';
        const hPages = document.createElement('h2');
        hPages.className = 'text-lg font-bold text-brand-primary mb-3';
        hPages.textContent = 'Top Pages';
        const pagesWrapper = document.createElement('div');
        pagesWrapper.style.height = '300px';
        const pagesCanvas = document.createElement('canvas');
        pagesCanvas.id = 'chart-pages';
        pagesCanvas.width = 800;
        pagesCanvas.height = 300;
        pagesWrapper.appendChild(pagesCanvas);
        pagesCard.appendChild(hPages);
        pagesCard.appendChild(pagesWrapper);

        grid.appendChild(pagesCard);

        container.appendChild(grid);
    }

    async function render() {
        if (isRendering) return;
        isRendering = true;

        const container = document.getElementById('analytics-content');
        if (!container) { isRendering = false; return; }

        cleanupCharts();

        // loading UI
        container.innerHTML = `
      <div class="flex items-center justify-center h-40">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    `;

        try {
            await loadChartJsOnce();
            const logs = await fetchLogs(1000);
            if (!mounted) return;

            const data = processLogs(logs);

            // build canvases reliably using DOM API
            buildChartCards(container);

            // build table separately (innerHTML okay for rows)
            const tableWrap = document.createElement('div');
            tableWrap.className = 'mt-6 bg-brand-black/50 rounded-2xl p-6';
            tableWrap.innerHTML = `
        <h2 class="text-lg font-bold text-brand-primary mb-3">Recent activity</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-brand-primary">
                <th class="p-2">Time</th>
                <th class="p-2">Page</th>
                <th class="p-2">Country</th>
                <th class="p-2">Device</th>
                <th class="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              ${logs.slice(0, 50).map((l, i) => `
                <tr class="border-t border-[#1f1f1f]">
                  <td class="p-2 text-xs">${new Date(l.created_at).toLocaleString()}</td>
                  <td class="p-2">${l.row_data?.page || ''}</td>
                  <td class="p-2">${l.geo?.country || ''}</td>
                  <td class="p-2">${l.device_info?.platform || ''}</td>
                  <td class="p-2"><button class="btn-view-detail text-brand-primary" data-idx="${i}">View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
            container.appendChild(tableWrap);

            // wait a frame to ensure elements are in DOM and measured
            await new Promise(r => requestAnimationFrame(r));
            if (!mounted) return;

            // grab canvases (now guaranteed to exist)
            const visitorsEl = document.getElementById('chart-visitors');
            const devicesEl = document.getElementById('chart-devices');
            const pagesEl = document.getElementById('chart-pages');

            if (!visitorsEl || !devicesEl || !pagesEl) {
                console.error('Canvas elements not ready', { visitorsEl, devicesEl, pagesEl });
                container.innerHTML = `<div class="p-4 text-red-400">Charts could not be rendered: canvas not found.</div>`;
                isRendering = false;
                return;
            }

            // ensure no leftover charts on canvases
            [visitorsEl, devicesEl, pagesEl].forEach(el => destroyChartForCanvas(el));
            cleanupCharts();

            // create charts
            const visitorsCtx = visitorsEl.getContext('2d');
            const devicesCtx = devicesEl.getContext('2d');
            const pagesCtx = pagesEl.getContext('2d');

            charts.visitors = new window.Chart(visitorsCtx, {
                type: 'line',
                data: { labels: data.labels, datasets: [{ label: 'Visitors', data: data.visitors, borderColor: '#f1d416', backgroundColor: 'rgba(241,212,22,0.08)', fill: true, tension: 0.35, pointRadius: 3 }] },
                options: { responsive: true, maintainAspectRatio: false }
            });

            charts.devices = new window.Chart(devicesCtx, {
                type: 'doughnut',
                data: { labels: Object.keys(data.devices), datasets: [{ data: Object.values(data.devices), backgroundColor: ['#f1d416', '#e11d48', '#06b6d4', '#8b5cf6', '#84cc16'] }] },
                options: { responsive: true, maintainAspectRatio: false }
            });

            const topPages = Object.entries(data.pages).sort((a, b) => b[1] - a[1]).slice(0, 8);
            charts.pages = new window.Chart(pagesCtx, {
                type: 'bar',
                data: { labels: topPages.map(p => p[0]), datasets: [{ data: topPages.map(p => p[1]), backgroundColor: '#06b6d4' }] },
                options: { responsive: true, maintainAspectRatio: false }
            });

            // attach detail handlers using local logs array
            Array.from(container.querySelectorAll('.btn-view-detail')).forEach(btn => {
                btn.onclick = () => {
                    const idx = Number(btn.dataset.idx) || 0;
                    const log = logs[idx];
                    if (log) showLogModal(log);
                };
            });

        } catch (err) {
            console.error('Analytics render error', err);
            container.innerHTML = `<div class="p-4 text-red-400">Failed to load analytics: ${err?.message || err}</div>`;
        } finally {
            isRendering = false;
        }
    }

    function pageEvents() {
        StyleAdminPage();
        render(); // run once
        // handle nav & logout if present
        document.querySelectorAll('[data-nav]').forEach(button => {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const route = button.dataset.route;
                if (route) await loadPage(`admin${route.charAt(0).toUpperCase() + route.slice(1)}`);
            });
        });
        document.getElementById('admin-logout')?.addEventListener('click', async () => { /* logoutAdmin(); */ });

        return () => { mounted = false; cleanupCharts(); };
    }

    return {
        html: /* html */ `
      <div class="flex min-h-screen bg-brand-dark">
        ${AdminNavbar().html}
        <main class="flex-1 lg:ml-24 p-4 lg:p-8">
          <div class="max-w-7xl mx-auto space-y-6">
            <header class="bg-brand-black/50 rounded-2xl p-6">
              <h1 class="text-2xl font-bold text-white">Analytics</h1>
              <p class="text-gray-400 mt-1">Activity logs and insights</p>
            </header>
            <div id="analytics-content"></div>
          </div>
        </main>
      </div>
    `,
        pageEvents
    };
}
// ...existing code...