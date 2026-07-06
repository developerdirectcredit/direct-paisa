// import { ChevronUp } from "lucide-react";
// import { Link } from "react-router-dom";


// export default function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <footer className="bg-[#050824] text-white mt-20">
//       {/* Top Strip */}
//       <div className="bg-[#02051A] border-b border-gray-800">
//         <div className="max-w-7xl mx-auto py-5 px-6 text-center">
//           <h3 className="font-semibold tracking-wide text-sm">
//             MOST SEARCHED LINKS +
//           </h3>
//         </div>
//       </div>

//       {/* Partner Strip */}
//       <div className="bg-[#11142F] border-b border-gray-800">
//         <div className="max-w-7xl mx-auto px-6 py-8">
//           <div className="grid grid-cols-2 md:grid-cols-6 gap-5 items-center">
//             <div className="text-gray-300 font-semibold">
//               OUR PARTNERS
//             </div>

//             <div className="bg-[#1B1E3A] p-4 rounded text-center">
//               NBFC Partner
//             </div>

//             <div className="bg-[#1B1E3A] p-4 rounded text-center">
//               Banking Partner
//             </div>

//             <div className="bg-[#1B1E3A] p-4 rounded text-center">
//               MSME Funding
//             </div>

//             <div className="bg-[#1B1E3A] p-4 rounded text-center">
//               Direct Credit
//             </div>

//             <div className="bg-[#1B1E3A] p-4 rounded text-center">
//               Financial Partner
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-6 py-14">
//         <div className="grid md:grid-cols-4 gap-10">
//           {/* Logo */}
//           <div>
//             <img
//               src="/images/direct-credit-logo.jpg"
//               alt="Direct Credit"
//               className="w-52 mb-5"
//             />

//             <p className="text-gray-400 leading-7 text-sm">
//               Direct Credit is India's trusted MSME funding and business
//               loan consultancy helping enterprises secure funding from
//               ₹50 Lakh to ₹200 Crore.
//             </p>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="font-bold mb-5">
//               DIRECT CREDIT
//             </h3>

//             <ul className="space-y-3 text-gray-400">
//               {/* <li>About Us</li> */}
//               <li>
//               <Link to="/about" className="hover:text-white transition-colors">
//                 About Us
//               </Link>
//             </li>
//                 <li>
//                 <Link
//                   to="/careers"
//                   className="hover:text-white transition-colors"
//                 >
//                   Careers
//                 </Link>
//               </li>
              
//               <li>
//                 <Link
//                   to="/awards"
//                   className="hover:text-white transition-colors"
//                 >
//                   Awards
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/culture"
//                   className="hover:text-white transition-colors"
//                 >
//                   Culture
//                 </Link>
//               </li>
//               {/* <li>Contact Us</li> */}
//                <li>
//                 <Link
//                   to="/contact-us"
//                   className="hover:text-white transition-colors"
//                 >
//                   Contact Us
//                 </Link>
//                 </li>
//                 <li>
//                 <Link
//                   to="/privacy-policy"
//                   className="hover:text-white transition-colors"
//                 >
//                   Privacy Policy
//                 </Link>
//                 </li>
//               {/* <li>Privacy Policy</li> */}
//               {/* <li>Terms & Conditions</li> */}

//                 <li>
//                 <Link
//                   to="/terms-conditions"
//                   className="hover:text-white transition-colors"
//                 >
//                   Terms & Conditions
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Products */}
//           <div>
//             <h3 className="font-bold mb-5">
//               PRODUCTS
//             </h3>

//             <ul className="space-y-3 text-gray-400">
//               <li>Business Loan</li>
//               <li>MSME Loan</li>
//               <li>Working Capital Loan</li>
//               <li>Project Finance</li>
//               <li>Warehouse Loan</li>
//               <li>Home Loan</li>
//               <li>Personal Loan</li>
//             </ul>
//           </div>

//           {/* Download App */}
//           <div>
//             <h3 className="font-bold mb-5">
//               DOWNLOAD APP
//             </h3>

//             <div className="space-y-4">
//               <button className="w-full bg-black border border-gray-700 rounded-lg p-3 text-left">
//                 📱 Get it on Google Play
//               </button>

//               <button className="w-full bg-black border border-gray-700 rounded-lg p-3 text-left">
//                 🍎 Download on App Store
//               </button>
//             </div>

//             <div className="mt-6 text-gray-400">
//               Follow us on LinkedIn
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-gray-500 text-sm">
//             © 2026 Direct Credit. All Rights Reserved.
//           </p>

//           <p className="text-gray-500 text-sm">
//             THE MSME EXPERTS
//           </p>
//         </div>
//       </div>

//       {/* Scroll Top Button */}
//       <button
//         onClick={scrollToTop}
//         className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
//       >
//         <ChevronUp size={24} />
//       </button>
//     </footer> 
//   );
// }
// == esme business loan aur loan clicable nhi tha toh uske liye code likh rha hu 

// 



const APP_LINK = "https://onelink.to/kqq5xd";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.directcredit.ondcapp&pcampaignid=web_share";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/direct-credit/id6765877653";

import { ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/*  Footer                                                            */
/*  - PRODUCTS list links to loan pages.                              */
/*  - Social icons are clickable — replace the href values below      */
/*    with your own profile URLs.                                     */
/* ------------------------------------------------------------------ */

// PRODUCTS — each links to a loan page. Map to whichever route exists.
const productLinks = [
  { label: "Business Loan", to: "/loans/business" },
  { label: "MSME Loan", to: "/loans/business" },
  { label: "Working Capital Loan", to: "/loans/business" },
  { label: "Project Finance", to: "/loans/project-loan" },
  { label: "Warehouse Loan", to: "/loans/warehouse-finance" },
  { label: "Home Loan", to: "/loans/home" },
  { label: "Personal Loan", to: "/loans/personal" },
];

// COMPANY links.
const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Careers", to: "/careers" },
  { label: "Awards", to: "/awards" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-conditions" },
];

/* Inline brand SVG icons (lucide-react removed brand logos in newer versions). */
function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  );
}
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}
function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}
function XIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.75l-5.29-6.92L4.4 22H1.14l8.02-9.17L1.5 2h6.92l4.78 6.32L18.244 2zm-1.18 18h1.86L7.02 3.9H5.02L17.064 20z" />
    </svg>
  );
}

// SOCIAL links — replace the href with your own profile URLs.
const socialLinks = [
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com/DIRECTCREDIT23" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com/DIRECTCREDIT23" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com/company/DIRECTCREDIT23" },
  { label: "YouTube", icon: YoutubeIcon, href: "https://youtube.com/@DIRECTCREDIT23" },
  { label: "Twitter", icon: XIcon, href: "https://twitter.com/DIRECTCREDIT23" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050824] text-white mt-20">
      {/* Top Strip */}
      <div className="bg-[#02051A] border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-5 px-6 text-center">
          <h3 className="font-semibold tracking-wide text-sm">
            MOST SEARCHED LINKS +
          </h3>
        </div>
      </div>

      {/* Partner Strip */}
      <div className="bg-[#11142F] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-5 items-center">
            <div className="text-gray-300 font-semibold">OUR PARTNERS</div>
            <div className="bg-[#1B1E3A] p-4 rounded text-center">NBFC Partner</div>
            <div className="bg-[#1B1E3A] p-4 rounded text-center">Banking Partner</div>
            <div className="bg-[#1B1E3A] p-4 rounded text-center">MSME Funding</div>
            <div className="bg-[#1B1E3A] p-4 rounded text-center">Direct Credit</div>
            <div className="bg-[#1B1E3A] p-4 rounded text-center">Financial Partner</div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <img
              src="/images/direct-credit-logo.jpg"
              alt="Direct Credit"
              className="w-52 mb-5"
            />
            <p className="text-gray-400 leading-7 text-sm">
              Direct Credit is India's trusted MSME funding and business loan
              consultancy helping enterprises secure funding from ₹50 Lakh to
              ₹200 Crore.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full bg-[#1B1E3A] hover:bg-blue-600 flex items-center justify-center transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-5">DIRECT CREDIT</h3>
            <ul className="space-y-3 text-gray-400">
              {companyLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold mb-5">PRODUCTS</h3>
            <ul className="space-y-3 text-gray-400">
              {productLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
            
           {/* Download App */}
<div>
  <h3 className="font-bold mb-5">DOWNLOAD APP</h3>

  {/* QR Code */}
  <a
    href={APP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block mb-5"
  >
    <img
      src="/images/app-qr.png"
      alt="Scan to Download"
      className="w-24 h-24 rounded-lg border border-gray-700 bg-white p-1"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  </a>

  <div className="space-y-3">

    {/* Google Play */}
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-black text-white rounded-lg px-4 py-3 hover:bg-gray-900 transition-colors"
    >
      <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0">
        <path
          d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35z"
          fill="#00D9FF"
        />
        <path
          d="M16.81 15.12L4.5 22.1l9.19-9.19 3.12 2.21z"
          fill="#00F076"
        />
        <path
          d="M20.16 10.81c.35.2.59.57.59 1.19s-.24.99-.59 1.19l-2.71 1.56-3.31-3.31 3.31-3.31 2.71 1.56z"
          fill="#FFC900"
        />
        <path
          d="M4.5 1.9l12.31 6.98-3.12 2.21L4.5 1.9z"
          fill="#FF3A44"
        />
      </svg>

      <div className="leading-tight">
        <p className="text-[9px] uppercase tracking-wide">
          Get it on
        </p>
        <p className="text-sm font-semibold">
          Google Play
        </p>
      </div>
    </a>

    {/* App Store */}
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-black text-white rounded-lg px-4 py-3 hover:bg-gray-900 transition-colors"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 shrink-0"
        fill="white"
      >
        <path d="M17.05 12.53c-.02-2.02 1.65-2.99 1.72-3.04-.94-1.37-2.4-1.56-2.92-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.29 2-1.4 2.43-.36 6.02 1 7.99.67.96 1.47 2.04 2.51 2 1.01-.04 1.39-.65 2.61-.65 1.22 0 1.56.65 2.63.63 1.09-.02 1.78-.98 2.44-1.95.77-1.12 1.09-2.2 1.11-2.26-.02-.01-2.13-.82-2.15-3.25zM15.03 6.36c.55-.67.92-1.6.82-2.53-.79.03-1.75.53-2.32 1.19-.51.59-.96 1.53-.84 2.44.88.07 1.79-.45 2.34-1.1z" />
      </svg>

      <div className="leading-tight">
        <p className="text-[9px] uppercase tracking-wide">
          Download on the
        </p>
        <p className="text-sm font-semibold">
          App Store
        </p>
      </div>
    </a>

  </div>

  <p className="mt-5 text-xs text-gray-400">
    Scan the QR code or download the Direct Credit App.
  </p>
</div>
</div>
</div>
          {/* add code end */}
      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Direct Credit. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm">THE MSME EXPERTS</p>
        </div>
      </div>

      {/* Scroll Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      >
        <ChevronUp size={24} />
      </button>
    </footer>
  );
}