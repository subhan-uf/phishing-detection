// content.js

const API_URL = "https://8368-34-85-162-192.ngrok-free.app/predict";

// The core check that sends the POST and blocks if phishing
async function checkUrl(url) {
  if (!/^https?:\/\//.test(url)) return;
  console.log("[PhishBlocker] checking", url);
  try {
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });
    const data = await resp.json();
    console.log("[PhishBlocker] response", data);
    if (data.label === "phishing") {
              chrome.runtime.sendMessage({
                    type: "phishing-detected",
                    url
                  });
    }
  } catch (err) {
    console.error("[PhishBlocker] error", err);
  }
}

// Hook into history API so we catch SPA navigations
function hookHistoryEvents() {
  const origPush = history.pushState;
  history.pushState = function(...args) {
    origPush.apply(this, args);
    checkUrl(window.location.href);
  };
  const origReplace = history.replaceState;
  history.replaceState = function(...args) {
    origReplace.apply(this, args);
    checkUrl(window.location.href);
  };
  window.addEventListener("popstate", () => {
    checkUrl(window.location.href);
  });
}

// Catch regular link clicks before they trigger navigation
function hookLinkClicks() {
    document.addEventListener("click", async e => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      e.preventDefault();
      const href = a.href;
      await checkUrl(href);
      window.location.href = href;
    });
  }
  

// Initialize on load
(function() {
  checkUrl(window.location.href);    // initial check
  hookHistoryEvents();               // catch SPA changes
  hookLinkClicks();                  // catch ordinary clicks
})();
