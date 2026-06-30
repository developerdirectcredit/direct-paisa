

// // add new code

// // src/pages/CreditCards.jsx
// // ─────────────────────────────────────────────────────────────────────────────
// // 3-step flow:
// //   STEP 1  → User naam + mobile number daalta hai
// //   STEP 2  → OTP verify  → login ho jaata hai (user state set)
// //   STEP 3  → Bank offers, har bank par "Apply" button (UTM link kholta hai)
// //
// // Navbar aur Footer ab apne components se aate hain.
// // Sign Out hata diya gaya hai.
// // ─────────────────────────────────────────────────────────────────────────────

// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { ExternalLink } from "lucide-react";
// import { getAllCards, buildUtmLink } from "../data/cardsData";

// const STEPS = {
//   DETAILS: "details", // naam + number
//   OTP: "otp",
//   PROCESSING: "processing",
//   OFFERS: "offers",
// };

// const STEP_ORDER = [STEPS.DETAILS, STEPS.OTP, STEPS.PROCESSING, STEPS.OFFERS];

// export default function CreditCards() {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(STEPS.DETAILS);

//   // logged-in user (null = not logged in). OTP verify hone par set hota hai.
//   const [user, setUser] = useState(null);

//   const [form, setForm] = useState({
//     fullName: "",
//     mobile: "",
//     otp: ["", "", "", ""],
//   });

//   const [offers, setOffers] = useState([]);

//   // OTP timer + refs
//   const [otpTimer, setOtpTimer] = useState(0);
//   const [otpError, setOtpError] = useState("");
//   const otpRefs = useRef([]);

//   const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

//   // ── Back navigation (STEP_ORDER use, header back ya browser ke liye) ──
//   // eslint-disable-next-line no-unused-vars
//   const goBack = () => {
//     const idx = STEP_ORDER.indexOf(step);
//     if (idx <= 0) {
//       navigate("/");
//     } else {
//       setOtpError("");
//       setStep(STEP_ORDER[idx - 1]);
//     }
//   };

//   // ── OTP countdown timer ──
//   useEffect(() => {
//     if (step !== STEPS.OTP) return;
//     if (otpTimer <= 0) return;
//     const id = setInterval(() => {
//       setOtpTimer((t) => (t <= 1 ? 0 : t - 1));
//     }, 1000);
//     return () => clearInterval(id);
//   }, [step, otpTimer]);

//   // ── OTP step par aate hi timer start + first box focus ──
//   useEffect(() => {
//     if (step === STEPS.OTP) {
//       setOtpTimer(30);
//       setOtpError("");
//       update("otp", ["", "", "", ""]);
//       setTimeout(() => otpRefs.current[0]?.focus(), 100);
//     }
//   }, [step]);

//   // ── OTP input change ──
//   const handleOtpChange = (i, value) => {
//     const digit = value.replace(/\D/g, "").slice(-1);
//     const next = [...form.otp];
//     next[i] = digit;
//     update("otp", next);
//     setOtpError("");
//     if (digit && i < form.otp.length - 1) {
//       otpRefs.current[i + 1]?.focus();
//     }
//   };

//   const handleOtpKeyDown = (i, e) => {
//     if (e.key === "Backspace" && !form.otp[i] && i > 0) {
//       otpRefs.current[i - 1]?.focus();
//     }
//   };

//   const handleOtpPaste = (e) => {
//     e.preventDefault();
//     const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
//     if (!pasted) return;
//     const next = ["", "", "", ""];
//     pasted.split("").forEach((d, idx) => (next[idx] = d));
//     update("otp", next);
//     const focusIdx = Math.min(pasted.length, 3);
//     otpRefs.current[focusIdx]?.focus();
//   };

//   const resendOtp = () => {
//     if (otpTimer > 0) return;
//     setOtpTimer(30);
//     setOtpError("");
//     update("otp", ["", "", "", ""]);
//     otpRefs.current[0]?.focus();
//   };

//   // ── OTP verify → LOGIN ho jaata hai ──
//   const verifyOtp = () => {
//     const code = form.otp.join("");
//     if (code.length !== 4) {
//       setOtpError("Please enter the complete 4-digit OTP");
//       return;
//     }
//     // (Demo: koi bhi 4-digit OTP sahi maana ja raha. Real app me API verify karega.)
//     setOtpError("");
//     // Yahan user login ho gaya — naam + number store
//     setUser({ name: form.fullName.trim(), mobile: form.mobile });
//     setStep(STEPS.PROCESSING);
//   };

//   // ── Processing ke baad offers nikaalo ──
//   useEffect(() => {
//     if (step === STEPS.PROCESSING) {
//       const timer = setTimeout(() => {
//         setOffers(getAllCards());
//         setStep(STEPS.OFFERS);
//       }, 2200);
//       return () => clearTimeout(timer);
//     }
//   }, [step]);

//   // ── Apply click → UTM link naye tab me kholo ──
//   const handleApply = (card) => {
//     const link = buildUtmLink(card.applyUrl, card, {
//       // user-specific tracking yahan add kar sakte ho:
//       utm_id: user?.mobile || "",
//     });
//     window.open(link, "_blank", "noopener,noreferrer");
//   };

//   // ===== STEP 1: DETAILS (Name + Number) =====
//   if (step === STEPS.DETAILS) {
//     const nameValid = form.fullName.trim().length >= 2;
//     const mobileValid = form.mobile.length === 10;
//     const canContinue = nameValid && mobileValid;

//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="flex flex-1">
//           {/* Left panel — logo */}
//           <div className="hidden md:flex md:w-2/5 bg-white border-r border-gray-100 flex-col items-center justify-center p-10">
//             <img
//               src="/logo.png"
//               alt="Direct Credit — The MSME Experts"
//               className="w-full max-w-xs object-contain"
//             />
//           </div>

//           {/* Right form */}
//           <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
//             <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border">
//               <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                 Get your perfect Credit Card Now!
//               </h1>

//               {/* Name */}
//               <label className="text-xs text-blue-600 font-medium">Full Name (as on PAN)</label>
//               <input
//                 value={form.fullName}
//                 onChange={(e) =>
//                   update("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))
//                 }
//                 placeholder="Enter your name"
//                 className="w-full border-2 border-blue-500 rounded-lg px-4 py-3 mt-1 mb-1 outline-none"
//               />
//               {form.fullName && !nameValid && (
//                 <p className="text-xs text-red-500 mb-2">Please enter your full name</p>
//               )}

//               {/* Mobile */}
//               <label className="text-xs text-blue-600 font-medium mt-3 block">Mobile Number</label>
//               <div className="flex items-center border-2 border-blue-500 rounded-lg px-3 py-3 mt-1 mb-2">
//                 <span className="mr-2">🇮🇳 +91</span>
//                 <input
//                   type="tel"
//                   maxLength={10}
//                   value={form.mobile}
//                   onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
//                   className="flex-1 outline-none"
//                   placeholder="10-digit number"
//                 />
//                 <span className="text-gray-400 text-sm">{form.mobile.length} / 10</span>
//               </div>
//               <p className="text-xs text-gray-500 mb-4">
//                 We'll check credit card offers against your number
//               </p>

//               <div className="border border-blue-300 rounded-lg text-center text-blue-600 text-sm py-2 mb-3">
//                 + Get Assured ₹200 Cashback on every card +
//               </div>

//               <button
//                 disabled={!canContinue}
//                 onClick={() => setStep(STEPS.OTP)}
//                 className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
//               >
//                 Unlock Card Offers
//               </button>
//               <p className="text-[11px] text-gray-400 text-center mt-3">
//                 By submitting this form, you agree to the Terms of Use & Privacy Policy
//               </p>
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // ===== STEP 2: OTP =====
//   if (step === STEPS.OTP) {
//     const otpComplete = form.otp.join("").length === 4;
//     return (
//       <div className="min-h-screen flex flex-col bg-gray-50">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
//             <button
//               onClick={() => setStep(STEPS.DETAILS)}
//               className="absolute top-4 right-4 text-gray-400 text-xl"
//               aria-label="Close"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
//               Verify Mobile Number
//             </h2>
//             <p className="text-center text-xs bg-gray-100 rounded py-1 mb-6">
//               OTP sent on Mobile Number +91-xxx{form.mobile.slice(-4)}
//             </p>
//             <div className="flex justify-center gap-4 mb-2">
//               {form.otp.map((digit, i) => (
//                 <input
//                   key={i}
//                   ref={(el) => (otpRefs.current[i] = el)}
//                   type="tel"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(i, e.target.value)}
//                   onKeyDown={(e) => handleOtpKeyDown(i, e)}
//                   onPaste={handleOtpPaste}
//                   className={`w-12 h-12 border-b-2 text-center text-xl outline-none transition-colors ${
//                     otpError ? "border-red-400" : "border-gray-300 focus:border-blue-500"
//                   }`}
//                 />
//               ))}
//             </div>

//             {otpError && (
//               <p className="text-center text-xs text-red-500 mb-2">{otpError}</p>
//             )}

//             <p className="text-center text-xs text-gray-500 mb-4">
//               {otpTimer > 0 ? (
//                 <>
//                   Resend OTP in{" "}
//                   <span className="font-semibold text-blue-600">
//                     {otpTimer < 10 ? `0${otpTimer}` : otpTimer}
//                   </span>{" "}
//                   seconds
//                 </>
//               ) : (
//                 <button
//                   onClick={resendOtp}
//                   className="text-blue-600 font-semibold hover:underline"
//                 >
//                   Resend OTP
//                 </button>
//               )}
//             </p>

//             <label className="flex items-center gap-2 text-sm mb-4">
//               <input type="checkbox" defaultChecked /> Remember Me
//             </label>
//             <button
//               onClick={verifyOtp}
//               disabled={!otpComplete}
//               className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
//             >
//               Verify & Login
//             </button>
//             <p className="text-[11px] text-gray-400 text-center mt-3">
//               Demo: koi bhi 4-digit number daalo, login ho jaayega
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // ===== STEP 3a: PROCESSING =====
//   if (step === STEPS.PROCESSING) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="flex-1 flex flex-col items-center justify-center bg-white">
//           <div className="bg-green-100 text-green-700 rounded-lg px-5 py-2 text-sm mb-10">
//             🪙 Apply today to get ₹200 Cashback
//           </div>
//           <div className="text-7xl mb-8 animate-pulse">💳</div>
//           <h2 className="text-xl font-bold text-gray-800">
//             Processing {user?.name ? `${user.name}'s` : "Your"} Profile
//           </h2>
//           <p className="text-sm text-gray-500 mt-2">Trusted by over 2 million happy users.</p>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // ===== STEP 3b: OFFERS =====
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       <Navbar />

//       <div className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full">
//         {/* Welcome message — login hone par naam ke saath */}
//         {user && (
//           <div className="bg-white border rounded-xl px-5 py-4 mb-6">
//             <p className="text-lg font-semibold text-gray-800">
//               Welcome, {user.name} 👋
//             </p>
//             <p className="text-sm text-gray-500">
//               Yahan aapke liye best card offers hain. Apply par tap karke aage badhein.
//             </p>
//           </div>
//         )}

//         {/* cashback banner */}
//         <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-5 mb-6 flex items-center justify-between">
//           <span className="font-bold">Apply &amp; EARN HUGE CASHBACKS</span>
//           <span className="text-sm">₹200 + ₹750 Cashback</span>
//         </div>

//         <h2 className="text-lg font-semibold mb-4">
//           {offers.length} Card Offer{offers.length !== 1 ? "s" : ""}
//         </h2>

//         <div className="space-y-5">
//           {offers.map((card) => (
//             <div key={card.id} className="bg-white border rounded-xl p-5">
//               <span className="inline-block border border-orange-400 text-orange-500 text-xs rounded px-2 py-0.5 mb-3">
//                 {card.tag}
//               </span>
//               <div className="flex gap-5 flex-col sm:flex-row">
//                 <div className="w-40 h-24 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0">
//                   {card.image ? (
//                     <img
//                       src={card.image}
//                       alt={card.name}
//                       className="w-full h-full object-cover rounded-lg"
//                     />
//                   ) : (
//                     "CARD"
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-800">{card.name}</h3>
//                   <p className="text-sm text-gray-500 mt-1">1st Year Fee: {card.firstYearFee}</p>
//                   <p className="text-sm text-gray-600 mt-1">{card.joiningBenefit}</p>
//                   <ul className="text-sm text-gray-600 mt-2 space-y-1">
//                     {card.benefits.map((b, i) => (
//                       <li key={i}>• {b}</li>
//                     ))}
//                   </ul>
//                   <div className="flex gap-3 mt-4">
//                     <button className="text-blue-600 text-sm">+ More Details</button>
//                     {/* Apply → UTM link kholta hai */}
//                     <button
//                       onClick={() => handleApply(card)}
//                       className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded px-4 py-2 inline-flex items-center gap-1.5"
//                     >
//                       Apply Now
//                       <ExternalLink size={14} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

//== ab tracking ka code add kar rhe hai


// src/pages/CreditCards.jsx
// ─────────────────────────────────────────────────────────────────────────────
// 3-step flow + ANALYTICS TRACKING
//   STEP 1  → User naam + mobile number daalta hai
//   STEP 2  → OTP verify  → login ho jaata hai
//   STEP 3  → Bank offers, har bank par "Apply" button (UTM link kholta hai)
//
// Tracking events lage hue hain (track() ki lines).
// Abhi backend nahi hai to ye console me dikhenge (F12 → Console).
// ─────────────────────────────────────────────────────────────────────────────

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { getAllCards, buildUtmLink } from "../data/cardsData";
import { track } from "../lib/analytics"; // ← tracking import

const STEPS = {
  DETAILS: "details", // naam + number
  OTP: "otp",
  PROCESSING: "processing",
  OFFERS: "offers",
};

const STEP_ORDER = [STEPS.DETAILS, STEPS.OTP, STEPS.PROCESSING, STEPS.OFFERS];

export default function CreditCards() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.DETAILS);

  // logged-in user (null = not logged in). OTP verify hone par set hota hai.
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    otp: ["", "", "", ""],
  });

  const [offers, setOffers] = useState([]);

  // form_start sirf ek baar fire ho — iske liye flag
  const formStartedRef = useRef(false);

  // OTP timer + refs
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef([]);

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  // ── TRACK: form_start — user pehli baar koi input me type kare ──
  const handleFirstInput = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      track("form_start"); // form bharna shuru hua
    }
  };

  // ── Back navigation ──
  // eslint-disable-next-line no-unused-vars
  const goBack = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx <= 0) {
      navigate("/");
    } else {
      setOtpError("");
      setStep(STEP_ORDER[idx - 1]);
    }
  };

  // ── OTP countdown timer ──
  useEffect(() => {
    if (step !== STEPS.OTP) return;
    if (otpTimer <= 0) return;
    const id = setInterval(() => {
      setOtpTimer((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [step, otpTimer]);

  // ── OTP step par aate hi timer start + first box focus ──
  useEffect(() => {
    if (step === STEPS.OTP) {
      setOtpTimer(30);
      setOtpError("");
      update("otp", ["", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  }, [step]);

  // ── TRACK: offers_viewed — jab offers page khule ──
  useEffect(() => {
    if (step === STEPS.OFFERS) {
      track("offers_viewed", { count: offers.length });
    }
  }, [step, offers.length]);

  // ── OTP input change ──
  const handleOtpChange = (i, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...form.otp];
    next[i] = digit;
    update("otp", next);
    setOtpError("");
    if (digit && i < form.otp.length - 1) {
      otpRefs.current[i + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !form.otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const next = ["", "", "", ""];
    pasted.split("").forEach((d, idx) => (next[idx] = d));
    update("otp", next);
    const focusIdx = Math.min(pasted.length, 3);
    otpRefs.current[focusIdx]?.focus();
  };

  const resendOtp = () => {
    if (otpTimer > 0) return;
    setOtpTimer(30);
    setOtpError("");
    update("otp", ["", "", "", ""]);
    otpRefs.current[0]?.focus();
    track("otp_resend", { mobile: form.mobile }); // ← TRACK: resend
  };

  // ── OTP verify → LOGIN ho jaata hai ──
  const verifyOtp = () => {
    const code = form.otp.join("");
    if (code.length !== 4) {
      setOtpError("Please enter the complete 4-digit OTP");
      track("otp_failed", { reason: "incomplete" }); // ← TRACK: galat OTP
      return;
    }
    // (Demo: koi bhi 4-digit OTP sahi maana ja raha. Real app me API verify karega.)
    setOtpError("");
    setUser({ name: form.fullName.trim(), mobile: form.mobile });

    track("login_success", { name: form.fullName.trim() }); // ← TRACK: login hua
    track("form_complete"); // ← TRACK: form pura bhara

    setStep(STEPS.PROCESSING);
  };

  // ── Processing ke baad offers nikaalo ──
  useEffect(() => {
    if (step === STEPS.PROCESSING) {
      const timer = setTimeout(() => {
        setOffers(getAllCards());
        setStep(STEPS.OFFERS);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // ── Apply click → TRACK + UTM link naye tab me kholo ──
  const handleApply = (card) => {
    // ← TRACK: kis bank ke Apply par click hua (sabse important event)
    track("card_apply_click", {
      cardId: card.id,
      bankCode: card.bankCode,
      cardName: card.name,
    });

    const link = buildUtmLink(card.applyUrl, card, {
      utm_id: user?.mobile || "",
    });
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // ── More Details click → TRACK ──
  const handleDetails = (card) => {
    track("card_details_click", {
      cardId: card.id,
      bankCode: card.bankCode,
    });
  };

  // ===== STEP 1: DETAILS (Name + Number) =====
  if (step === STEPS.DETAILS) {
    const nameValid = form.fullName.trim().length >= 2;
    const mobileValid = form.mobile.length === 10;
    const canContinue = nameValid && mobileValid;

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex flex-1">
          {/* Left panel — logo */}
          <div className="hidden md:flex md:w-2/5 bg-white border-r border-gray-100 flex-col items-center justify-center p-10">
            <img
              src="/logo.png"
              alt="Direct Credit — The MSME Experts"
              className="w-full max-w-xs object-contain"
            />
          </div>

          {/* Right form */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Get your perfect Credit Card Now!
              </h1>

              {/* Name */}
              <label className="text-xs text-blue-600 font-medium">Full Name (as on PAN)</label>
              <input
                value={form.fullName}
                onChange={(e) => {
                  handleFirstInput(); // ← TRACK form_start
                  update("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""));
                }}
                placeholder="Enter your name"
                className="w-full border-2 border-blue-500 rounded-lg px-4 py-3 mt-1 mb-1 outline-none"
              />
              {form.fullName && !nameValid && (
                <p className="text-xs text-red-500 mb-2">Please enter your full name</p>
              )}

              {/* Mobile */}
              <label className="text-xs text-blue-600 font-medium mt-3 block">Mobile Number</label>
              <div className="flex items-center border-2 border-blue-500 rounded-lg px-3 py-3 mt-1 mb-2">
                <span className="mr-2">🇮🇳 +91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => {
                    handleFirstInput(); // ← TRACK form_start
                    update("mobile", e.target.value.replace(/\D/g, ""));
                  }}
                  className="flex-1 outline-none"
                  placeholder="10-digit number"
                />
                <span className="text-gray-400 text-sm">{form.mobile.length} / 10</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                We'll check credit card offers against your number
              </p>

              <div className="border border-blue-300 rounded-lg text-center text-blue-600 text-sm py-2 mb-3">
                + Get Assured ₹200 Cashback on every card +
              </div>

              <button
                disabled={!canContinue}
                onClick={() => {
                  track("otp_requested", { mobile: form.mobile }); // ← TRACK
                  setStep(STEPS.OTP);
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
              >
                Unlock Card Offers
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-3">
                By submitting this form, you agree to the Terms of Use & Privacy Policy
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ===== STEP 2: OTP =====
  if (step === STEPS.OTP) {
    const otpComplete = form.otp.join("").length === 4;
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setStep(STEPS.DETAILS)}
              className="absolute top-4 right-4 text-gray-400 text-xl"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
              Verify Mobile Number
            </h2>
            <p className="text-center text-xs bg-gray-100 rounded py-1 mb-6">
              OTP sent on Mobile Number +91-xxx{form.mobile.slice(-4)}
            </p>
            <div className="flex justify-center gap-4 mb-2">
              {form.otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className={`w-12 h-12 border-b-2 text-center text-xl outline-none transition-colors ${
                    otpError ? "border-red-400" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              ))}
            </div>

            {otpError && (
              <p className="text-center text-xs text-red-500 mb-2">{otpError}</p>
            )}

            <p className="text-center text-xs text-gray-500 mb-4">
              {otpTimer > 0 ? (
                <>
                  Resend OTP in{" "}
                  <span className="font-semibold text-blue-600">
                    {otpTimer < 10 ? `0${otpTimer}` : otpTimer}
                  </span>{" "}
                  seconds
                </>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </p>

            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" defaultChecked /> Remember Me
            </label>
            <button
              onClick={verifyOtp}
              disabled={!otpComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
            >
              Verify & Login
            </button>
            <p className="text-[11px] text-gray-400 text-center mt-3">
              Demo: koi bhi 4-digit number daalo, login ho jaayega
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ===== STEP 3a: PROCESSING =====
  if (step === STEPS.PROCESSING) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
          <div className="bg-green-100 text-green-700 rounded-lg px-5 py-2 text-sm mb-10">
            🪙 Apply today to get ₹200 Cashback
          </div>
          <div className="text-7xl mb-8 animate-pulse">💳</div>
          <h2 className="text-xl font-bold text-gray-800">
            Processing {user?.name ? `${user.name}'s` : "Your"} Profile
          </h2>
          <p className="text-sm text-gray-500 mt-2">Trusted by over 2 million happy users.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // ===== STEP 3b: OFFERS =====
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Welcome message — login hone par naam ke saath */}
        {user && (
          <div className="bg-white border rounded-xl px-5 py-4 mb-6">
            <p className="text-lg font-semibold text-gray-800">
              Welcome, {user.name} 👋
            </p>
            <p className="text-sm text-gray-500">
              Yahan aapke liye best card offers hain. Apply par tap karke aage badhein.
            </p>
          </div>
        )}

        {/* cashback banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-5 mb-6 flex items-center justify-between">
          <span className="font-bold">Apply &amp; EARN HUGE CASHBACKS</span>
          <span className="text-sm">₹200 + ₹750 Cashback</span>
        </div>

        <h2 className="text-lg font-semibold mb-4">
          {offers.length} Card Offer{offers.length !== 1 ? "s" : ""}
        </h2>

        <div className="space-y-5">
          {offers.map((card) => (
            <div key={card.id} className="bg-white border rounded-xl p-5">
              <span className="inline-block border border-orange-400 text-orange-500 text-xs rounded px-2 py-0.5 mb-3">
                {card.tag}
              </span>
              <div className="flex gap-5 flex-col sm:flex-row">
                <div className="w-40 h-24 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0">
                  {card.image ? (
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    "CARD"
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{card.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">1st Year Fee: {card.firstYearFee}</p>
                  <p className="text-sm text-gray-600 mt-1">{card.joiningBenefit}</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    {card.benefits.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleDetails(card)}
                      className="text-blue-600 text-sm"
                    >
                      + More Details
                    </button>
                    {/* Apply → TRACK + UTM link kholta hai */}
                    <button
                      onClick={() => handleApply(card)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm rounded px-4 py-2 inline-flex items-center gap-1.5"
                    >
                      Apply Now
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}