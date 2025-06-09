# PhishBlocker Pro

PhishBlocker Pro is a browser extension that warns you before visiting potentially malicious websites. It checks links in real time using a machine learning service and displays a clear warning when a phishing attempt is detected.

## Features

- **Real-time scanning** of every link the user navigates to or clicks.
- **Service worker** background script that triggers a notification when a page is classified as phishing.
- **Popup interface** showing whether the current site is safe or suspicious along with confidence scores.
- **Standalone warning page** that blocks the site when a phishing threat is detected.
- **Lightweight design** with no build step—just load the folder as an unpacked extension.

## Installation

1. Clone or download this repository.
2. Open the browser extension management page (for Chrome/Chromium: `chrome://extensions`).
3. Enable **Developer mode**.
4. Choose **Load unpacked** and select this project folder.
5. Navigate to any site and click the extension icon to view its status.

## How it works

- `content.js` injects listeners for page loads, history changes and link clicks. When a navigation event occurs, it sends the target URL to a remote `/predict` API.
- If the response label is `phishing`, a message is sent to `background.js`, which either opens the popup or shows a browser notification.
- The popup (`popup.html`/`popup.js`) queries the same API and displays an icon and confidence score.
- A simple warning page (`warning.html`) can be shown to block access when a threat is found.

The API endpoint is defined at the top of each script and can be customised to point to your own phishing detection service.

## Repository structure

```
assets/     Static SVG icons used in the popup and warning page
icons/      Browser action icons (16/48/128px)
background.js  Service worker for notifications
content.js     Monitors navigation and sends URL checks
manifest.json  Extension manifest (Chrome MV3)
popup.html/css/js  UI for quick status indication
warning.html/css   Full-page block screen
```

## Contributing

Pull requests are welcome. Feel free to open issues for any bugs or suggestions.

## License

This project is released under the MIT License.
