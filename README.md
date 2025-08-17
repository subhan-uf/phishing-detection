# PhishBlocker Pro

PhishBlocker Pro is a sophisticated browser extension designed for high-accuracy, real-time phishing detection using a custom machine learning model. It moves beyond outdated blacklist methods by analyzing links for complex phishing patterns, leveraging a multi-stage pipeline, robust backend API, and seamless browser integration.

---

## Professional Overview

### Introduction to Phishing

Phishing is a top cyber threat: attackers create fake websites mimicking trusted brands, aiming to trick users into revealing sensitive information. Conventional methods rely on static blacklists, which often fail as attackers continuously generate new domains. PhishBlocker Pro provides dynamic, intelligent detection by analyzing the actual characteristics of each link as you browse.

### Project Objectives

- **Feature Extraction Pipeline:**  
  - Analyzes URLs for deep, multi-layered signals of phishing, including entropy, brand imitation, domain tricks, and more.
- **Advanced ML Classification:**  
  - Employs a Random Forest Classifier trained on a massive dataset (see below) to accurately classify URLs as phishing or legitimate.
- **Browser Extension Deployment:**  
  - Integrates the live model into an easy-to-use extension, delivering instant feedback and blocking threats at the point of click.

---

## Dataset & Model Training

- **Training samples:** 690,704  
- **Test samples:**     172,676  
- **Training notebook:** [Google Colab ML training code](https://colab.research.google.com/drive/14_hQMxejzWz37v2Qx9dIhvg_3FlALGTj?usp=sharing#scrollTo=nNLNjrR9ZHzI)

### Feature Engineering

Features extracted include:
- Host, path, and URL length (phishing often uses excessive or unusual lengths)
- Special character and symbol count
- Entropy and randomness (detects obfuscation)
- Subdomain and suffix analysis (catches rare TLDs and deep subdomains)
- Brand imitation & suspicious keywords in path/subdomain
- IP address and protocol checks
- Unicode/punycode abuse (homoglyph attacks)
- Digit/letter ratios, fake extensions, abnormal segments
- **Top Domain Check:** Uses Tranco/Alexa Top 1M list to avoid false alarms on trusted domains

---

## System Architecture & Workflow

### 1. Content Script (`content.js`)

- Injected into every tab; monitors:
  - Page loads
  - History API navigation (for SPAs)
  - Link clicks
- On navigation:
  - Sends a POST request to the backend ML API (`/predict`) with the URL
  - If the result label is `phishing`, sends a message to the background worker and triggers blocking/warning

### 2. Background Worker (`background.js`)

- Listens for phishing detection messages
- Tries to open the extension popup automatically; if not possible, shows a browser notification
- On notification click, opens the popup with more details

### 3. Popup UI (`popup.html`, `popup.js`, `popup.css`)

- When the user clicks the extension icon:
  - Fetches the current page’s URL
  - Sends it to the ML API for classification
  - Displays:
    - **Phishing Detected:** Red warning icon, alert, and confidence score (e.g., "Confidence: 96.2%")
    - **Safe:** Green check icon, safe message, and confidence score (e.g., "Confidence: 99.1%")
    - **Error:** If API is unreachable, shows a warning

- **Styling:** Crisp, responsive design; visual feedback with SVG icons and animated transitions

### 4. Warning Page (`warning.html`, `warning.css`)

- If a phishing site is detected:
  - Navigation is blocked
  - Full-screen warning shown: "Phishing Detected — This site has been blocked for your safety."
  - Large warning icon; clear instructions

### 5. API Integration

- The extension is decoupled from the model logic: any backend serving the `/predict` endpoint can be used.
- API expects `{ url: <string> }` in POST body, returns `{ label: "phishing"|"legit", prob_phish, prob_legit }`.

---

## User Experience

### Extension Appearance

#### 1. Phishing Detected
![Demo](https://i.imgur.com/GURxdgn.png)

#### 2. No Phishing Detected
![Demo](https://i.imgur.com/Xrog9Oe.png)


---

## Repository Structure

```
assets/         — SVG icons for popup and warning page
icons/          — Browser icon images
background.js   — Background worker (notifications, communication)
content.js      — Injected script (monitors navigation, sends URL checks)
manifest.json   — Extension manifest (Chrome MV3)
popup.html/css/js — Popup UI for site status (safe/warning)
warning.html/css  — Full-page block for phishing sites
```

---

## Installation

1. Clone or download this repository.
2. Open your browser’s extension management page (e.g., `chrome://extensions` for Chrome/Chromium).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the project directory.
5. Visit any site and click the extension icon to check its safety status.

---

## Machine Learning API

- API-driven architecture; any compatible `/predict` endpoint can be used.
- Highly configurable for custom models or additional features.

---

## Contributing

Pull requests are welcome! Please open issues for bugs or feature suggestions.

---

## License

This project is made by Subhan.

---
