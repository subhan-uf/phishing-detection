const API_URL = "https://8368-34-85-162-192.ngrok-free.app/predict";

window.addEventListener("DOMContentLoaded", () => {
  const iconEl = document.getElementById("status-icon");
  const txtEl  = document.getElementById("status-text");
  const subEl  = document.getElementById("status-sub");

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs?.[0]?.url;
    if (!url) {
      txtEl.textContent = "No active URL";
      return;
    }

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    })
    .then(res => res.json())
    .then(data => {
      if (data.label === "phishing") {
        iconEl.src = "assets/warning.svg";
        txtEl.textContent = "⚠️ Potential Phishing";
        subEl.textContent = `Confidence: ${(data.prob_phish*100).toFixed(1)}%`;
      } else {
        iconEl.src = "assets/safe.svg";
        txtEl.textContent = "✅ Safe";
        subEl.textContent = `Confidence: ${(data.prob_legit*100).toFixed(1)}%`;
      }
    })
    .catch(() => {
      iconEl.src = "assets/warning.svg";
      txtEl.textContent = "⚠️ Error";
      subEl.textContent = "Could not contact API";
    });
  });
});
