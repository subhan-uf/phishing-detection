console.log("🛡️ PhishBlocker background worker starting up");

const API_URL = "https://8368-34-85-162-192.ngrok-free.app/predict";
const cache   = {};

// Listen for any navigation in the main frame
// background.js

chrome.runtime.onMessage.addListener((msg, sender) => {
    if (msg.type === "phishing-detected") {
      // Attempt to open the extension popup:
      chrome.action.openPopup()
        .then(() => {
          // popup opened successfully
        })
        .catch(err => {
          // Chrome will refuse if not a user gesture
          // Fallback: show a notification that the user can click
          chrome.notifications.create({
            type: "basic",
            iconUrl: 'icons/icon48.png',
            title: '⚠️ PhishBlocker Alert',
            message: 'Suspicious link detected—click for details.'
          });
        });
    }
  });
  
  // When the user clicks the notification, open the popup for real:
  chrome.notifications.onClicked.addListener(id => {
    chrome.action.openPopup().catch(() => {});
  });
  
