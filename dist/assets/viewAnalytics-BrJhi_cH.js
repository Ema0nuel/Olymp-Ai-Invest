import{a as $,b as k}from"./reset-3f-UIG5W.js";import{A as D,S as N}from"./Navbar-Bv5QRghf.js";import{s as P}from"./supabaseClients-B0wRxRlI.js";import{M as S}from"./Modal-jvk0lnFM.js";import{l as j}from"./index-Blc0Txpr.js";import"./index-54wmEuAA.js";import"./logo-9_xFcp4C.js";async function H(){$("Analytics"),k();let u={},h=!1,g=!0;function y(t){try{t&&typeof t.destroy=="function"&&t.destroy()}catch{}}function v(t){try{if(!t||!window.Chart)return;const e=window.Chart.getChart(t)||window.Chart.getChart(t.id);e&&e.destroy()}catch{}}function f(){Object.values(u).forEach(t=>y(t)),u={},["chart-visitors","chart-devices","chart-pages"].forEach(t=>{const e=document.getElementById(t);e&&v(e)})}async function w(){if(!window.Chart){if(window._chartJsLoading){await window._chartJsLoading;return}window._chartJsLoading=new Promise((t,e)=>{const a=document.createElement("script");a.src="https://cdn.jsdelivr.net/npm/chart.js",a.onload=()=>{t(),window._chartJsLoading=null},a.onerror=r=>{e(r),window._chartJsLoading=null},document.head.appendChild(a)}),await window._chartJsLoading}}async function x(t=1e3){const{data:e,error:a}=await P.from("activity_logs").select("*").order("created_at",{ascending:!1}).limit(t);if(a)throw a;return e||[]}function C(t){new S({title:"Activity Details",content:`
        <div class="space-y-3 text-sm">
          <div><strong>Time:</strong> ${new Date(t.created_at).toLocaleString()}</div>
          <div><strong>Page:</strong> ${t.row_data?.page||"N/A"}</div>
          <div><strong>Operation:</strong> ${t.operation||""}</div>
          <div><strong>IP:</strong> ${t.ip_address||"N/A"}</div>
          <div><strong>Location:</strong> ${t.geo?.city||""} ${t.geo?.country||""}</div>
          <div><strong>Device:</strong> ${t.device_info?.platform||""} ${t.device_info?.language||""}</div>
          <pre class="mt-2 p-2 bg-[#0b0b0b] rounded text-xs overflow-auto">${JSON.stringify(t,null,2)}</pre>
        </div>
      `}).show()}function E(t){const e=[],a={};for(let s=6;s>=0;s--){const d=new Date;d.setDate(d.getDate()-s);const l=d.toLocaleDateString();e.push(l),a[l]=0}const r={},o={},i={};return t.forEach(s=>{const d=new Date(s.created_at).toLocaleDateString();a[d]!==void 0&&a[d]++;const l=s.device_info?.platform?.split(" ")[0]||"Unknown";r[l]=(r[l]||0)+1;const p=s.row_data?.page||"Unknown";o[p]=(o[p]||0)+1;const m=s.geo?.country||"Unknown";i[m]=(i[m]||0)+1}),{labels:e,visitors:e.map(s=>a[s]),devices:r,pages:o,countries:i}}function L(t){t.innerHTML="";const e=document.createElement("div");e.className="grid grid-cols-1 lg:grid-cols-2 gap-6";const a=(d,l)=>{const p=document.createElement("div");p.className="bg-brand-black/50 rounded-2xl p-6";const m=document.createElement("h2");m.className="text-lg font-bold text-brand-primary mb-3",m.textContent=d;const n=document.createElement("div");n.style.height="300px";const c=document.createElement("canvas");return c.id=l,c.width=800,c.height=300,n.appendChild(c),p.appendChild(m),p.appendChild(n),p};e.appendChild(a("Visitors (last 7 days)","chart-visitors")),e.appendChild(a("Devices","chart-devices"));const r=document.createElement("div");r.className="lg:col-span-2 bg-brand-black/50 rounded-2xl p-6";const o=document.createElement("h2");o.className="text-lg font-bold text-brand-primary mb-3",o.textContent="Top Pages";const i=document.createElement("div");i.style.height="300px";const s=document.createElement("canvas");s.id="chart-pages",s.width=800,s.height=300,i.appendChild(s),r.appendChild(o),r.appendChild(i),e.appendChild(r),t.appendChild(e)}async function A(){if(h)return;h=!0;const t=document.getElementById("analytics-content");if(!t){h=!1;return}f(),t.innerHTML=`
      <div class="flex items-center justify-center h-40">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    `;try{await w();const e=await x(1e3);if(!g)return;const a=E(e);L(t);const r=document.createElement("div");if(r.className="mt-6 bg-brand-black/50 rounded-2xl p-6",r.innerHTML=`
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
              ${e.slice(0,50).map((n,c)=>`
                <tr class="border-t border-[#1f1f1f]">
                  <td class="p-2 text-xs">${new Date(n.created_at).toLocaleString()}</td>
                  <td class="p-2">${n.row_data?.page||""}</td>
                  <td class="p-2">${n.geo?.country||""}</td>
                  <td class="p-2">${n.device_info?.platform||""}</td>
                  <td class="p-2"><button class="btn-view-detail text-brand-primary" data-idx="${c}">View</button></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `,t.appendChild(r),await new Promise(n=>requestAnimationFrame(n)),!g)return;const o=document.getElementById("chart-visitors"),i=document.getElementById("chart-devices"),s=document.getElementById("chart-pages");if(!o||!i||!s){console.error("Canvas elements not ready",{visitorsEl:o,devicesEl:i,pagesEl:s}),t.innerHTML='<div class="p-4 text-red-400">Charts could not be rendered: canvas not found.</div>',h=!1;return}[o,i,s].forEach(n=>v(n)),f();const d=o.getContext("2d"),l=i.getContext("2d"),p=s.getContext("2d");u.visitors=new window.Chart(d,{type:"line",data:{labels:a.labels,datasets:[{label:"Visitors",data:a.visitors,borderColor:"#f1d416",backgroundColor:"rgba(241,212,22,0.08)",fill:!0,tension:.35,pointRadius:3}]},options:{responsive:!0,maintainAspectRatio:!1}}),u.devices=new window.Chart(l,{type:"doughnut",data:{labels:Object.keys(a.devices),datasets:[{data:Object.values(a.devices),backgroundColor:["#f1d416","#e11d48","#06b6d4","#8b5cf6","#84cc16"]}]},options:{responsive:!0,maintainAspectRatio:!1}});const m=Object.entries(a.pages).sort((n,c)=>c[1]-n[1]).slice(0,8);u.pages=new window.Chart(p,{type:"bar",data:{labels:m.map(n=>n[0]),datasets:[{data:m.map(n=>n[1]),backgroundColor:"#06b6d4"}]},options:{responsive:!0,maintainAspectRatio:!1}}),Array.from(t.querySelectorAll(".btn-view-detail")).forEach(n=>{n.onclick=()=>{const c=Number(n.dataset.idx)||0,b=e[c];b&&C(b)}})}catch(e){console.error("Analytics render error",e),t.innerHTML=`<div class="p-4 text-red-400">Failed to load analytics: ${e?.message||e}</div>`}finally{h=!1}}function _(){return N(),A(),document.querySelectorAll("[data-nav]").forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault();const a=t.dataset.route;a&&await j(`admin${a.charAt(0).toUpperCase()+a.slice(1)}`)})}),document.getElementById("admin-logout")?.addEventListener("click",async()=>{}),()=>{g=!1,f()}}return{html:`
      <div class="flex min-h-screen bg-brand-dark">
        ${D().html}
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
    `,pageEvents:_}}export{H as default};
//# sourceMappingURL=viewAnalytics-BrJhi_cH.js.map
