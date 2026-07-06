

// == add qr image and download links for app store and play store in the above component


/* ------------------------------------------------------------------ */
/*  AppPromo — "Get the Direct Credit App" section                    */
/*  - Left: phone mockups image                                       */
/*  - Right: feature list + QR code + Google Play / App Store badges  */
/*                                                                    */
/*  QR CODE:                                                          */
/*   Simplest: put your QR image at /public/images/app-qr.png and it  */
/*   shows automatically. (Replace APP_LINK below with your real      */
/*   app / onelink URL so the store buttons point to the right place) */
/* ------------------------------------------------------------------ */

const APP_LINK = "https://onelink.to/kqq5xd"; // TODO: replace with your real app link
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.directcredit.ondcapp&pcampaignid=web_share";
const APP_STORE_URL = "https://apps.apple.com/in/app/direct-credit/id6765877653";

const features = [
  "Easy Personal Loan Application Process",
  "Quick Eligibility Check Without CIBIL Impact",
  "Fast Loan Updates & Approval Tracking",
  "Secure Document Upload & Verification",
  "Compare Best Loan Offers & Interest Rates",
];

export default function AppPromo() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto rounded-3xl border border-gray-200 shadow-sm p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">

        {/* Left — phone mockups */}
        <img
          src="/images/direct-credit-app.png"
          alt="Direct Credit App"
          className="rounded-xl w-full object-contain"
        />

        {/* Right — content */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get the Direct Credit App
          </h2>

          <ul className="mt-6 space-y-3 text-gray-700">
            {features.map((f, i) => (
              <li key={f} className="text-sm md:text-base">
                <span className="font-semibold text-gray-900">{i + 1}.</span> {f}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-7 border-t border-dashed border-gray-300" />

          {/* QR + store badges */}
          <div className="flex flex-wrap items-center gap-6">
            {/* QR code */}
            <a
              href={APP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
              title="Scan to download"
            >
              <img
                src="/images/app-qr.png"
                alt="Scan to download the Direct Credit app"
                className="w-28 h-28 rounded-lg border border-gray-200 object-contain bg-white"
                onError={(e) => {
                  // If you haven't added a QR image yet, show a placeholder box.
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-28 h-28 rounded-lg border border-dashed border-gray-300 items-center justify-center text-center text-[10px] text-gray-400 px-2"
                style={{ display: "none" }}
              >
                Add QR at<br />/images/app-qr.png
              </div>
            </a>

            {/* Vertical divider */}
            <div className="hidden sm:block h-24 border-l border-dashed border-gray-300" />

            {/* Store badges */}
            <div className="flex flex-col gap-3">
              {/* Google Play */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white rounded-lg px-4 py-2.5 hover:bg-gray-900 transition-colors w-48"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0">
                  <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35z" fill="#00D9FF"/>
                  <path d="M16.81 15.12L4.5 22.1l9.19-9.19 3.12 2.21z" fill="#00F076"/>
                  <path d="M20.16 10.81c.35.2.59.57.59 1.19s-.24.99-.59 1.19l-2.71 1.56-3.31-3.31 3.31-3.31 2.71 1.56z" fill="#FFC900"/>
                  <path d="M4.5 1.9l12.31 6.98-3.12 2.21L4.5 1.9z" fill="#FF3A44"/>
                </svg>
                <div className="leading-tight">
                  <p className="text-[9px] uppercase tracking-wide">Get it on</p>
                  <p className="text-sm font-semibold -mt-0.5">Google Play</p>
                </div>
              </a>

              {/* App Store */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-black text-white rounded-lg px-4 py-2.5 hover:bg-gray-900 transition-colors w-48"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="white">
                  <path d="M17.05 12.53c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.29 2-1.4 2.43-.36 6.02 1 7.99.67.96 1.47 2.04 2.51 2 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.98 2.44-1.95.77-1.12 1.09-2.2 1.11-2.26-.02-.01-2.13-.82-2.15-3.25zM15.03 6.36c.55-.67.92-1.6.82-2.53-.79.03-1.75.53-2.32 1.19-.51.59-.96 1.53-.84 2.44.88.07 1.79-.45 2.34-1.1z"/>
                </svg>
                <div className="leading-tight">
                  <p className="text-[9px] uppercase tracking-wide">Download on the</p>
                  <p className="text-sm font-semibold -mt-0.5">App Store</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
