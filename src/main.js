import './css/style.css'
import { loadPage, parsePathToRoute } from './script/routes/router';
import creditedUsers from './script/components/cashout';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { translateWidget } from './script/components/translation';


const app = document.getElementById("app")
window.app = app

// Track the cashout element
let cashoutElement = null;

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
  loadJivoChat();
});

function loadJivoChat() {
  if (window.jivo_api || document.getElementById("jivo-script")) return;
  const script = document.createElement('script');
  script.id = "jivo-script";
  script.src = '//code.jivosite.com/widget/eCCc6qKzVU';
  script.async = true;
  document.body.appendChild(script);
}

function removeJivoChat() {
  // Remove the script
  const script = document.getElementById("jivo-script");
  if (script) script.remove();
  // Remove the widget if already loaded
  if (window.jivo_api && window.jivo_api.destroy) {
    window.jivo_api.destroy();
  }
  // Remove widget DOM if present
  const widget = document.getElementById("jvlabelWrap");
  if (widget) widget.remove();
}
