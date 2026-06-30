// src/lib/analytics.js
// ─────────────────────────────────────────────────────────────────────────────
// FRONTEND-ONLY VERSION (abhi ke liye — backend ki zaroorat NAHI)
//
// Abhi ye sirf console me events print karta hai, taaki aap dekh sako
// ki tracking sahi lag rahi hai. Jab backend ready ho jaaye, neeche
// "BACKEND" wale section ka comment hata dena — bas itna.
// ─────────────────────────────────────────────────────────────────────────────

// Jab backend bana lo, ye URL set karna. Abhi khaali hai = backend off.
const API_URL = import.meta.env.VITE_ANALYTICS_API || "";

// ─── Session / Visitor ID (abhi bhi kaam karte hain, koi backend nahi chahiye) ─
function getSessionId() {
  let id = sessionStorage.getItem("dc_session_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("dc_session_id", id);
  }
  return id;
}

function getVisitorId() {
  let id = localStorage.getItem("dc_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("dc_visitor_id", id);
  }
  return id;
}

// ─── UTM URL se pakdo aur yaad rakho ────────────────────────────────────────
export function captureUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id"];
  const found = {};
  utmKeys.forEach((key) => {
    const val = params.get(key);
    if (val) found[key] = val;
  });
  if (Object.keys(found).length > 0) {
    localStorage.setItem("dc_utm", JSON.stringify(found));
  }
}

function getStoredUtm() {
  try {
    return JSON.parse(localStorage.getItem("dc_utm") || "{}");
  } catch {
    return {};
  }
}

// ─── MAIN: track() ──────────────────────────────────────────────────────────
// Poori website me yahi use karoge: track("card_apply_click", { bankCode: "sbi" })
export function track(eventName, data = {}) {
  const payload = {
    event: eventName,
    data,
    sessionId: getSessionId(),
    visitorId: getVisitorId(),
    utm: getStoredUtm(),
    page: window.location.pathname,
    referrer: document.referrer || "direct",
    timestamp: new Date().toISOString(),
  };

  // ✅ ABHI: console me dikhao (backend ki zaroorat nahi)
  // Browser me F12 dabao → Console tab → yahan saare events dikhenge
  console.log(`📊 [TRACK] ${eventName}`, payload);

  // ─── BACKEND (abhi OFF — jab server bana lo to ye apne aap on ho jaayega) ──
  // API_URL set hone par hi chalega, warna skip.
  if (API_URL) {
    try {
      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
      const ok = navigator.sendBeacon(`${API_URL}/api/track`, blob);
      if (!ok) {
        fetch(`${API_URL}/api/track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* tracking kabhi app crash na kare */
    }
  }

  // ─── GA4 (agar gtag laga ho to bhej do, warna skip) ───────────────────────
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, { ...data, ...getStoredUtm() });
  }
}

// ─── Page par kitni der raha ────────────────────────────────────────────────
export function initPageTimeTracking() {
  let pageEnterTime = Date.now();
  const sendExit = () => {
    const secondsOnPage = Math.round((Date.now() - pageEnterTime) / 1000);
    track("page_exit", { secondsOnPage });
  };
  window.addEventListener("beforeunload", sendExit);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      sendExit();
      pageEnterTime = Date.now();
    }
  });
}