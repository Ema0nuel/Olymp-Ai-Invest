import './css/style.css'
import { loadPage, parsePathToRoute } from './script/routes/router';
import creditedUsers from './script/components/cashout';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { translateWidget } from './script/components/translation';


const app = document.getElementById("app")
window.app = app

// Track the cashout element
let cashoutElement = null;

function isAdminPage(page) {
  return typeof page === 'string' && page.startsWith('admin');
}

document.addEventListener("click", async (e) => {
  let target = e.target;
  while (target && target !== document) {
    if (target.matches && target.matches('[data-nav], [data-routes]')) {
      e.preventDefault();
      const path = target.getAttribute('href');
      const parsed = parsePathToRoute(path);
      const page = parsed.page;
      await loadPage(page);

      // Only show cashout on home page
      if (page === 'home' || page === '') {
        loadCashOut();
      } else {
        removeCashout();
      }

      // Only load Jivo on non-admin pages
      if (isAdminPage(page)) {
        removeJivoChat();
      } else {
        loadJivoChat();
      }
    }
    target = target.parentElement;
  }
});

function loadCashOut() {
  // Remove existing cashout if any
  removeCashout();
  // Create and store new instance
  cashoutElement = creditedUsers();
  document.body.appendChild(cashoutElement);
}

function removeCashout() {
  if (cashoutElement && document.body.contains(cashoutElement)) {
    document.body.removeChild(cashoutElement);
    cashoutElement = null;
  }
}

// Initial page load
window.addEventListener("DOMContentLoaded", async () => {
  const { page, args } = parsePathToRoute(window.location.pathname);
  await loadPage(page, ...(args || []));
  // Add translation widget
  document.body.appendChild(translateWidget());

  // Only show cashout on home page
  if (page === 'home' || page === '') {
    loadCashOut();
  } else {
    removeCashout();
  }

  // Load or remove Jivo depending on whether this is an admin page
  if (isAdminPage(page)) {
    removeJivoChat();
  } else {
    loadJivoChat();
  }
});

// Load Jivo unless already loaded
function loadJivoChat() {
  if (window.jivo_api || document.getElementById("jivo-script")) return;
  const script = document.createElement('script');
  script.id = "jivo-script";
  script.src = '//code.jivosite.com/widget/eCCc6qKzVU';
  script.async = true;
  document.body.appendChild(script);
}

// Remove Jivo script and widget
function removeJivoChat() {
  // Remove the script
  const script = document.getElementById("jivo-script");
  if (script) script.remove();
  // Remove the widget if already loaded
  if (window.jivo_api && typeof window.jivo_api.destroy === 'function') {
    try { window.jivo_api.destroy(); } catch (e) { /* ignore */ }
  }
  // Remove widget DOM if present
  const widget = document.getElementById("jvlabelWrap");
  if (widget) widget.remove();
}