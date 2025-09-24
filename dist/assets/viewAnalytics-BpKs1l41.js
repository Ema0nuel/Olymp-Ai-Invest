import{a as _,b as $}from"./reset-3f-UIG5W.js";import{A as k,S as D}from"./Navbar-DRjmX4_G.js";import{s as P}from"./supabaseClients-CP3flIu-.js";import{M as S}from"./Modal-jvk0lnFM.js";import{l as j}from"./index-U9ehfUVP.js";import"./index-CHDAFkWG.js";import"./logo-9_xFcp4C.js";async function N(){_("Analytics"),$();let l={},p=!1,u=!0;function y(t){try{t&&typeof t.destroy=="function"&&t.destroy()}catch{}}function h(t){try{if(!t||!window.Chart)return;const e=window.Chart.getChart(t)||window.Chart.getChart(t.id);e&&e.destroy()}catch{}}function f(){Object.values(l).forEach(t=>y(t)),l={},["chart-visitors","chart-devices","chart-pages"].forEach(t=>{const e=document.getElementById(t);e&&h(e)})}async function w(){if(!window.Chart){if(window._chartJsLoading){await window._chartJsLoading;return}window._chartJsLoading=new Promise((t,e)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=()=>{t(),window._chartJsLoading=null},a.onerror=i=>{e(i),window._chartJsLoading=null},document.head.appendChild(a)}),await window._chartJsLoading}}async function x(t=1e3){const{data:e,error:a}=await P.from("activity_logs").select("*").order("created_at",{ascending:!1}).limit(t);if(a)throw a;return e||[]}function C(t){new S({title:"Activity Details",content:`
        <div class="space-y-3 text-sm">
          <div><strong>Time:</strong> ${new Date(t.created_at).toLocaleString()}</div>
          <div><strong>Page:</strong> ${t.row_data?.page||"N/A"}</div>
          <div><strong>Operation:</strong> ${t.operation||""}</div>
          <div><strong>IP:</strong> ${t.ip_address||"N/A"}</div>
          <div><strong>Location:</strong> ${t.geo?.city||""} ${t.geo?.country||""}</div>
          <div><strong>Device:</strong> ${t.device_info?.platform||""} ${t.device_info?.language||""}</div>
          <pre class="mt-2 p-2 bg-[#0b0b0b] rounded text-xs overflow-auto">${JSON.stringify(t,null,2)}</pre>
        </div>
      `}).show()}function A(t){const e=[],a={};for(let n=6;n>=0;n--){const d=new Date;d.setDate(d.getDate()-n);const c=d.toLocaleDateString();e.push(c),a[c]=0}const i={},r={},o={};return t.forEach(n=>{const d=new Date(n.created_at).toLocaleDateString();a[d]!==void 0&&a[d]++;const c=n.device_info?.platform?.split(" ")[0]||"Unknown";i[c]=(i[c]||0)+1;const v=n.row_data?.page||"Unknown";r[v]=(r[v]||0)+1;const m=n.geo?.country||"Unknown";o[m]=(o[m]||0)+1}),{labels:e,visitors:e.map(n=>a[n]),devices:i,pages:r,countries:o}}async function L(){if(p)return;p=!0;const t=document.getElementById("analytics-content");if(!t){p=!1;return}f(),t.innerHTML=`
      <div class="flex items-center justify-center h-40">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    `;try{await w();const e=await x(1e3);if(!u)return;const a=A(e);if(t.innerHTML=`
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-brand-black/50 rounded-2xl p-6">
            <h2 class="text-lg font-bold text-brand-primary mb-3">Visitors (last 7 days)</h2>
            <div style="height:300px"><canvas id="chart-visitors"></canvas></div>
          </div>
          <div class="bg-brand-black/50 rounded-2xl p-6">
            <h2 class="text-lg font-bold text-brand-primary mb-3">Devices</h2>
            <div style="height:300px"><canvas id="chart-devices"></canvas></div>
          </div>
          <div class="lg:col-span-2 bg-brand-black/50 rounded-2xl p-6">
            <h2 class="text-lg font-bold text-brand-primary mb-3">Top Pages</h2>
            <div style="height:300px"><canvas id="chart-pages"></canvas></div>
          </div>
        </div>

        <div class="mt-6 bg-brand-black/50 rounded-2xl p-6">
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
                ${e.slice(0,50).map((s,g)=>`
                  <tr class="border-t border-[#1f1f1f]">
                    <td class="p-2 text-xs">${new Date(s.created_at).toLocaleString()}</td>
                    <td class="p-2">${s.row_data?.page||""}</td>
                    <td class="p-2">${s.geo?.country||""}</td>
                    <td class="p-2">${s.device_info?.platform||""}</td>
                    <td class="p-2">
                      <button class="btn-view-detail text-brand-primary" data-idx="${g}">View</button>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      `,await new Promise(s=>requestAnimationFrame(()=>requestAnimationFrame(s))),!u)return;const i=document.getElementById("chart-visitors"),r=document.getElementById("chart-devices"),o=document.getElementById("chart-pages");if(!i||!r||!o){console.error("Canvas elements not ready",{visitorsEl:i,devicesEl:r,pagesEl:o}),t.innerHTML='<div class="p-4 text-red-400">Charts could not be rendered: canvas not found.</div>',p=!1;return}[i,r,o].forEach(s=>h(s)),f();const n=i.getContext("2d"),d=r.getContext("2d"),c=o.getContext("2d");l.visitors=new window.Chart(n,{type:"line",data:{labels:a.labels,datasets:[{label:"Visitors",data:a.visitors,borderColor:"#f1d416",backgroundColor:"rgba(241,212,22,0.08)",fill:!0,tension:.35,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1}}),l.devices=new window.Chart(d,{type:"doughnut",data:{labels:Object.keys(a.devices),datasets:[{data:Object.values(a.devices),backgroundColor:["#f1d416","#e11d48","#06b6d4","#8b5cf6","#84cc16"]}]},options:{responsive:!0,maintainAspectRatio:!1}});const v=Object.entries(a.pages).sort((s,g)=>g[1]-s[1]).slice(0,8);l.pages=new window.Chart(c,{type:"bar",data:{labels:v.map(s=>s[0]),datasets:[{data:v.map(s=>s[1]),backgroundColor:"#06b6d4"}]},options:{responsive:!0,maintainAspectRatio:!1}}),Array.from(document.querySelectorAll(".btn-view-detail")).forEach(s=>{s.onclick=()=>{const g=Number(s.dataset.idx)||0,b=e[g];b&&C(b)}})}catch(e){console.error("Analytics render error",e),t.innerHTML=`<div class="p-4 text-red-400">Failed to load analytics: ${e?.message||e}</div>`}finally{p=!1}}function E(){return D(),L(),document.querySelectorAll("[data-nav]").forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault();const a=t.dataset.route;a&&await j(`admin${a.charAt(0).toUpperCase()+a.slice(1)}`)})}),document.getElementById("admin-logout")?.addEventListener("click",async()=>{await logoutAdmin()}),()=>{u=!1,f()}}return{html:`
      <div class="flex min-h-screen bg-brand-dark">
        ${k().html}
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
    `,pageEvents:E}}export{N as default};
//# sourceMappingURL=viewAnalytics-BpKs1l41.js.map
