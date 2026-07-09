



// add image and form section same side this code used with loan flow system

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoanAplicationFlow from "../../components/loan-flow/LoanAplicationFlow";
import { CheckCircle, ArrowRight, Zap, Clock, Search, Shield, Star } from "lucide-react";

const features = [
  { icon: Zap,    color: "bg-blue-50 text-blue-600",   title: "Compare 30+ Lenders Instantly",  desc: "Evaluate interest rates, tenure & more in one place." },
  { icon: Clock,  color: "bg-blue-50 text-blue-600",   title: "Get Funds in 24 Hours",           desc: "Minimal documentation with super-fast approval." },
  { icon: Search, color: "bg-blue-50 text-blue-600",   title: "Check Eligibility for Free",      desc: "No impact on credit score. 100% secure." },
  { icon: Shield, color: "bg-blue-50 text-blue-600",   title: "Safe, Secure & Compliant",        desc: "RBI-compliant partners. Your data is always protected." },
];

const tableData = [
  { feature: "Loan Amount",           details: "₹10,000 – ₹50 Lakh" },
  { feature: "Interest Rate",         details: "9.98% – 44% p.a." },
  { feature: "Repayment Tenure",      details: "12 – 84 months" },
  { feature: "Processing Fee",        details: "0% – 4% of loan amount" },
  { feature: "Disbursal Time",        details: "Within 24 – 72 hours" },
  { feature: "CIBIL Score Required",  details: "700+ (760+ for best rates)" },
  { feature: "Collateral Required",   details: "None (Unsecured)" },
  { feature: "Minimum Salary",        details: "₹15,000/month (varies by lender)" },
  { feature: "Prepayment Charges",    details: "0% – 5% (lender-specific)" },
];

const useCases = [
  "Medical or emergency expenses",
  "Education or skill-upgradation costs",
  "Wedding and family functions",
  "Travel and holidays",
  "Home repairs, rent deposits, or moving costs",
  "Debt consolidation and balance transfer",
];

export default function PersonalLoan() {
  const [form, setForm]           = useState({ name: "", mobile: "" });
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed]       = useState(true);
  const [errors, setErrors]       = useState({});

  // ── Loan flow modal must stay closed until the name + mobile form
  //    on THIS page is filled in and validated. It was wrongly
  //    initialised to `true`, which skipped this page entirely and
  //    opened the Basic Details step directly on page load.
  const [showLoanFlow, setShowLoanFlow] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "Enter your full name as on PAN";
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      e.mobile = "Enter valid 10-digit mobile number";
    if (!agreed) e.agreed = "Please accept terms to continue";
    return e;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══════════════════════════════════════════════
          HERO — left: content+image  |  right: form
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── LEFT ── */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Personal Loan
            </h1>
            <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">
              Find the right personal loan for you from 30+ Banks and NBFCs on Direct Credit — with just
              one easy application.{" "}
              <span className="text-blue-600 font-semibold">Multiple offers.</span>{" "}
              Maximum growth.
            </p>

            {/* Feature list */}
            <div className="space-y-5 mb-10">
              {features.map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{title}</p>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone mockup image */}
            <div className="relative hidden md:block">
              <img
                src="/images/direct-credit-app.png"
                alt="Direct Credit App"
                className="w-72 mx-auto drop-shadow-2xl"
              />
            </div>

            {/* Stats bar */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
              {/* Play store */}
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" fill="#4CAF50"/>
                    <path d="M3 3.5l9.5 9.5L3 22.5V3.5z" fill="#8BC34A"/>
                    <path d="M12.5 13l6 3.5-6-3.5z" fill="#FF9800"/>
                    <path d="M12.5 11L3 3.5l9.5 7.5z" fill="#F44336"/>
                  </svg>
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-xs font-bold text-gray-800">4.5/5</p>
                  <p className="text-xs text-gray-400">15 Reviews</p>
                </div>
              </div>
              {[
                { value: "5L",    sub: "Satisfied Customers" },
                { value: "65+",       sub: "Lending Partners" },
                { value: "₹65 Cr+", sub: "Loans Disbursed" },
              ].map(s => (
                <div key={s.value} className="text-center">
                  <p className="text-lg font-bold text-blue-600">{s.value}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Sticky form card ── */}
          <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

              {/* Cashback banner */}
              <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Get Cashback of <span className="text-blue-600 font-bold">₹1,000*</span> on Loan Disbursal
                  </p>
                  <p className="text-xs text-gray-400">Valid till 30th June '26 &nbsp;·&nbsp; *T&C Apply</p>
                </div>
              </div>

              <div className="px-6 py-6">
                {!submitted ? (
                  <>
                    {/* Divider label */}
                    <div className="flex items-center gap-2 mb-4 justify-center">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap px-1">
                        ✦ Instant Personal Loan ✦
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Headline */}
                    <p className="text-center text-xl font-extrabold text-gray-900 mb-5 leading-snug">
                      Get up to{" "}
                      <span className="text-blue-600">₹50 Lakhs</span>{" "}
                      starting at{" "}
                      <span className="text-blue-600 underline decoration-blue-400 decoration-2 underline-offset-2">
                        9.98%
                      </span>
                    </p>

                    {/* Name input */}
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Full Name (as on your PAN)"
                        value={form.name}
                        onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                        className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                          ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Mobile input */}
                    <div className="mb-1 relative">
                      <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-blue-500 font-medium z-10">
                        Mobile Number
                      </span>
                      <div className={`flex items-center border-2 rounded-xl overflow-hidden transition
                        ${errors.mobile ? "border-red-400" : "border-blue-400"}`}>
                        <div className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                          <span className="text-base">🇮🇳</span>
                          <span className="text-sm text-gray-600 font-medium">+91</span>
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter mobile number"
                          value={form.mobile}
                          onChange={e => {
                            const v = e.target.value.replace(/\D/g, "");
                            setForm({ ...form, mobile: v });
                            setErrors({ ...errors, mobile: "" });
                          }}
                          className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
                        />
                        {form.mobile.length === 10 && (
                          <button
                            onClick={() => setForm({ ...form, mobile: "" })}
                            className="px-3 text-blue-600 text-xs font-semibold flex items-center gap-1 whitespace-nowrap"
                          >
                            ✏ Edit
                          </button>
                        )}
                      </div>
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Submit — opens loan flow only after name + mobile pass validation */}
                    <button
                      onClick={() => {
                        const e = validate();
                        if (Object.keys(e).length > 0) { setErrors(e); return; }
                        setShowLoanFlow(true);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-5"
                    >
                      Check Eligibility <ArrowRight size={17} />
                    </button>

                    {/* Terms */}
                    <div className="flex items-start gap-2 mt-3">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreed}
                        onChange={e => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
                        className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        By submitting this form, you have read and agree to the{" "}
                        <span className="text-blue-500">Credit Report Terms of Use</span>,{" "}
                        <span className="text-blue-500">Terms of Use</span> &{" "}
                        <span className="text-blue-500">Privacy Policy</span>
                        {" "}<span className="text-blue-500 font-medium">Read more</span>
                      </label>
                    </div>
                    {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-green-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Application Received!</h3>
                    <p className="text-gray-500 text-sm mb-1">
                      Hi <span className="font-semibold text-gray-700">{form.name}</span>,
                    </p>
                    <p className="text-gray-500 text-sm mb-6">
                      Our team will call you on{" "}
                      <span className="font-semibold text-gray-700">+91 {form.mobile}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setForm({ name: "", mobile: "" }); setSubmitted(false); }}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      Submit another application
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── WHAT IS ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Personal Loan?</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-4">
          <p>
           A Personal Loan gives you quick access to funds for both your urgent and planned financial needs without the need to pledge any security.
            With a fully digital online personal loan process, you can complete your application in just a few clicks and get quick approval.
          </p>
          <p>
            Most lenders in India use automated systems to assess your credit profile, income, and basic
            details in real time. An instant online Personal Loan is ideal for:
          </p>
          <ul className="space-y-2 pl-1">
            {useCases.map(u => (
              <li key={u} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FEATURE TABLE ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">
          Key Personal Loan Features at Direct Credit
        </h2>
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="text-left px-6 py-3 font-semibold text-blue-700 w-1/2">Feature</th>
                <th className="text-left px-6 py-3 font-semibold text-blue-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-6 py-3.5 text-gray-700 font-medium border-t border-gray-100">{row.feature}</td>
                  <td className="px-6 py-3.5 text-gray-600 border-t border-gray-100">{row.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── WHY DIRECT PAISA ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Apply for a Personal Loan on Direct Credit?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
          Direct Credit provides personal loan offers from 30+ banks & NBFCs, enabling you to compare,
          choose and apply for the personal loan that suits your requirements the best, with the highest
          chances of approval. Through deep integrations with India's leading Banks and NBFCs, you can
          apply for a personal loan with ease on the Direct Credit platform, through end-to-end digital
          processes.
        </p>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Need funds instantly?</h2>
            <p className="text-blue-100 text-sm">Apply in 5 minutes — money in your account in 24 hours</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            Apply Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />

      {/* ── Loan Application Flow Modal ── */}
      {showLoanFlow && (
        <LoanAplicationFlow
          initialName={form.name}
          initialMobile={form.mobile}
          onClose={() => setShowLoanFlow(false)}
        />
      )}
    </div>
  );
}

// === es code loan flow nhi direct utm link add hai



// add image and form section same side eseme ye tha poora basic details ek hi file me show rha hai 

// es code se app direct utm link se bank ke page pe redirect ho jayega jo ki ye instantat personal loan ke liye hai
// import { useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { CheckCircle, ArrowRight, Zap, Clock, Search, Shield, Star } from "lucide-react";

// const features = [
//   { icon: Zap,    color: "bg-blue-50 text-blue-600",   title: "Compare 30+ Lenders Instantly",  desc: "Evaluate interest rates, tenure & more in one place." },
//   { icon: Clock,  color: "bg-blue-50 text-blue-600",   title: "Get Funds in 24 Hours",           desc: "Minimal documentation with super-fast approval." },
//   { icon: Search, color: "bg-blue-50 text-blue-600",   title: "Check Eligibility for Free",      desc: "No impact on credit score. 100% secure." },
//   { icon: Shield, color: "bg-blue-50 text-blue-600",   title: "Safe, Secure & Compliant",        desc: "RBI-compliant partners. Your data is always protected." },
// ];

// const tableData = [
//   { feature: "Loan Amount",           details: "₹10,000 – ₹50 Lakh" },
//   { feature: "Interest Rate",         details: "9.98% – 44% p.a." },
//   { feature: "Repayment Tenure",      details: "12 – 84 months" },
//   { feature: "Processing Fee",        details: "0% – 4% of loan amount" },
//   { feature: "Disbursal Time",        details: "Within 24 – 72 hours" },
//   { feature: "CIBIL Score Required",  details: "700+ (760+ for best rates)" },
//   { feature: "Collateral Required",   details: "None (Unsecured)" },
//   { feature: "Minimum Salary",        details: "₹15,000/month (varies by lender)" },
//   { feature: "Prepayment Charges",    details: "0% – 5% (lender-specific)" },
// ];

// const useCases = [
//   "Medical or emergency expenses",
//   "Education or skill-upgradation costs",
//   "Wedding and family functions",
//   "Travel and holidays",
//   "Home repairs, rent deposits, or moving costs",
//   "Debt consolidation and balance transfer",
// ];

// // ── Bank offers shown after eligibility check.
// //    Currently only Bajaj Finserv. Add more objects here later.
// const bankOffers = [
//   {
//     id: "bajaj",
//     name: "Bajaj Finserv",
//     logo: "https://www.bajajfinservmarkets.in/favicon.ico",
//     rate: "9.98% p.a.",
//     amount: "Up to ₹50 Lakh",
//     tenure: "12 – 84 months",
//     processing: "Up to 3.93%",
//     tag: "Best Match",
//     baseUrl: "https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/",
//   },
// ];

// // Build the final apply URL with UTM params (name + mobile attached)
// const buildApplyUrl = (offer, form) => {
//   const params = new URLSearchParams({
//     utm_source: "directpaisa",
//     utm_medium: "referral",
//     utm_campaign: "personal_loan",
//     utm_content: offer.id,
//     ref_name: form.name,
//     ref_mobile: form.mobile,
//   });
//   return `${offer.baseUrl}?${params.toString()}`;
// };

// export default function PersonalLoan() {
//   const [form, setForm]           = useState({ name: "", mobile: "" });
//   const [agreed, setAgreed]       = useState(true);
//   const [errors, setErrors]       = useState({});

//   // After name + mobile pass validation, we show the bank offers
//   // section instead of opening any modal.
//   const [showOffers, setShowOffers] = useState(false);

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim() || form.name.trim().length < 3)
//       e.name = "Enter your full name as on PAN";
//     if (!/^[6-9]\d{9}$/.test(form.mobile))
//       e.mobile = "Enter valid 10-digit mobile number";
//     if (!agreed) e.agreed = "Please accept terms to continue";
//     return e;
//   };

//   // Open the bank's apply link (with UTM) in the SAME tab
//   const handleOfferClick = (offer) => {
//     window.location.href = buildApplyUrl(offer, form);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {/* ══════════════════════════════════════════════
//           HERO — left: content+image  |  right: form
//       ══════════════════════════════════════════════ */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
//         <div className="flex flex-col lg:flex-row gap-10 items-start">

//           {/* ── LEFT ── */}
//           <div className="flex-1">
//             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
//               Personal Loan
//             </h1>
//             <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">
//               Find the right personal loan for you from 30+ Banks and NBFCs on Direct Paisa — with just
//               one easy application.{" "}
//               <span className="text-blue-600 font-semibold">Multiple offers.</span>{" "}
//               Maximum growth.
//             </p>

//             {/* Feature list */}
//             <div className="space-y-5 mb-10">
//               {features.map(({ icon: Icon, color, title, desc }) => (
//                 <div key={title} className="flex items-start gap-4">
//                   <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
//                     <Icon size={20} />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-800 text-sm">{title}</p>
//                     <p className="text-gray-400 text-sm">{desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Phone mockup image */}
//             <div className="relative hidden md:block">
//               <img
//                 src="/images/direct-credit-app.png"
//                 alt="Direct Paisa App"
//                 className="w-72 mx-auto drop-shadow-2xl"
//               />
//             </div>

//             {/* Stats bar */}
//             <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
//               {/* Play store */}
//               <div className="flex items-center gap-2">
//                 <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
//                   <svg viewBox="0 0 24 24" className="w-5 h-5">
//                     <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" fill="#4CAF50"/>
//                     <path d="M3 3.5l9.5 9.5L3 22.5V3.5z" fill="#8BC34A"/>
//                     <path d="M12.5 13l6 3.5-6-3.5z" fill="#FF9800"/>
//                     <path d="M12.5 11L3 3.5l9.5 7.5z" fill="#F44336"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="flex gap-0.5 mb-0.5">
//                     {[1,2,3,4,5].map(i => <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />)}
//                   </div>
//                   <p className="text-xs font-bold text-gray-800">4.5/5</p>
//                   <p className="text-xs text-gray-400">15.6L Reviews</p>
//                 </div>
//               </div>
//               {[
//                 { value: "5.7cr+",    sub: "Satisfied Customers" },
//                 { value: "65+",       sub: "Lending Partners" },
//                 { value: "₹65k Cr+", sub: "Loans Disbursed" },
//               ].map(s => (
//                 <div key={s.value} className="text-center">
//                   <p className="text-lg font-bold text-blue-600">{s.value}</p>
//                   <p className="text-xs text-gray-400">{s.sub}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT — Sticky form card ── */}
//           <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24">
//             <div className="border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

//               {/* Cashback banner */}
//               <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
//                 <span className="text-2xl">💰</span>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">
//                     Get Cashback of <span className="text-blue-600 font-bold">₹1,000*</span> on Loan Disbursal
//                   </p>
//                   <p className="text-xs text-gray-400">Valid till 30th June '26 &nbsp;·&nbsp; *T&C Apply</p>
//                 </div>
//               </div>

//               <div className="px-6 py-6">
//                 {!showOffers ? (
//                   <>
//                     {/* Divider label */}
//                     <div className="flex items-center gap-2 mb-4 justify-center">
//                       <div className="h-px flex-1 bg-gray-200" />
//                       <span className="text-xs text-gray-500 font-medium whitespace-nowrap px-1">
//                         ✦ Instant Personal Loan ✦
//                       </span>
//                       <div className="h-px flex-1 bg-gray-200" />
//                     </div>

//                     {/* Headline */}
//                     <p className="text-center text-xl font-extrabold text-gray-900 mb-5 leading-snug">
//                       Get up to{" "}
//                       <span className="text-blue-600">₹50 Lakhs</span>{" "}
//                       starting at{" "}
//                       <span className="text-blue-600 underline decoration-blue-400 decoration-2 underline-offset-2">
//                         9.98%
//                       </span>
//                     </p>

//                     {/* Name input */}
//                     <div className="mb-4">
//                       <input
//                         type="text"
//                         placeholder="Full Name (as on your PAN)"
//                         value={form.name}
//                         onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
//                         className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
//                           ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
//                       />
//                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                     </div>

//                     {/* Mobile input */}
//                     <div className="mb-1 relative">
//                       <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-blue-500 font-medium z-10">
//                         Mobile Number
//                       </span>
//                       <div className={`flex items-center border-2 rounded-xl overflow-hidden transition
//                         ${errors.mobile ? "border-red-400" : "border-blue-400"}`}>
//                         <div className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 bg-gray-50 flex-shrink-0">
//                           <span className="text-base">🇮🇳</span>
//                           <span className="text-sm text-gray-600 font-medium">+91</span>
//                         </div>
//                         <input
//                           type="tel"
//                           maxLength={10}
//                           placeholder="Enter mobile number"
//                           value={form.mobile}
//                           onChange={e => {
//                             const v = e.target.value.replace(/\D/g, "");
//                             setForm({ ...form, mobile: v });
//                             setErrors({ ...errors, mobile: "" });
//                           }}
//                           className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
//                         />
//                         {form.mobile.length === 10 && (
//                           <button
//                             onClick={() => setForm({ ...form, mobile: "" })}
//                             className="px-3 text-blue-600 text-xs font-semibold flex items-center gap-1 whitespace-nowrap"
//                           >
//                             ✏ Edit
//                           </button>
//                         )}
//                       </div>
//                       {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
//                     </div>

//                     {/* Submit — shows bank offers only after name + mobile pass validation */}
//                     <button
//                       onClick={() => {
//                         const e = validate();
//                         if (Object.keys(e).length > 0) { setErrors(e); return; }
//                         setShowOffers(true);
//                       }}
//                       className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-5"
//                     >
//                       Check Eligibility <ArrowRight size={17} />
//                     </button>

//                     {/* Terms */}
//                     <div className="flex items-start gap-2 mt-3">
//                       <input
//                         type="checkbox"
//                         id="terms"
//                         checked={agreed}
//                         onChange={e => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
//                         className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0 cursor-pointer"
//                       />
//                       <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
//                         By submitting this form, you have read and agree to the{" "}
//                         <span className="text-blue-500">Credit Report Terms of Use</span>,{" "}
//                         <span className="text-blue-500">Terms of Use</span> &{" "}
//                         <span className="text-blue-500">Privacy Policy</span>
//                         {" "}<span className="text-blue-500 font-medium">Read more</span>
//                       </label>
//                     </div>
//                     {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
//                   </>
//                 ) : (
//                   /* ── BANK OFFERS ── */
//                   <div>
//                     {/* Greeting */}
//                     <div className="flex items-center gap-2 mb-4">
//                       <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
//                         <CheckCircle size={20} className="text-green-500" />
//                       </div>
//                       <div>
//                         <p className="text-sm font-bold text-gray-800">
//                           Hi {form.name.split(" ")[0]}, you're eligible! 🎉
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           {bankOffers.length} offer{bankOffers.length > 1 ? "s" : ""} matched for +91 {form.mobile}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Offer cards */}
//                     <div className="space-y-3">
//                       {bankOffers.map(offer => (
//                         <button
//                           key={offer.id}
//                           onClick={() => handleOfferClick(offer)}
//                           className="w-full text-left border border-gray-200 rounded-2xl p-4 hover:border-blue-400 hover:shadow-md transition group"
//                         >
//                           <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-2.5">
//                               <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
//                                 <img src={offer.logo} alt={offer.name} className="w-6 h-6 object-contain"
//                                   onError={(ev) => { ev.currentTarget.style.display = "none"; }} />
//                               </div>
//                               <div>
//                                 <p className="text-sm font-bold text-gray-800">{offer.name}</p>
//                                 <p className="text-xs text-gray-400">Instant approval</p>
//                               </div>
//                             </div>
//                             {offer.tag && (
//                               <span className="text-[10px] font-semibold bg-green-50 text-green-600 px-2 py-1 rounded-full">
//                                 {offer.tag}
//                               </span>
//                             )}
//                           </div>

//                           <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-3">
//                             <div>
//                               <p className="text-[10px] text-gray-400">Interest Rate</p>
//                               <p className="text-xs font-bold text-gray-800">{offer.rate}</p>
//                             </div>
//                             <div>
//                               <p className="text-[10px] text-gray-400">Loan Amount</p>
//                               <p className="text-xs font-bold text-gray-800">{offer.amount}</p>
//                             </div>
//                             <div>
//                               <p className="text-[10px] text-gray-400">Tenure</p>
//                               <p className="text-xs font-bold text-gray-800">{offer.tenure}</p>
//                             </div>
//                             <div>
//                               <p className="text-[10px] text-gray-400">Processing Fee</p>
//                               <p className="text-xs font-bold text-gray-800">{offer.processing}</p>
//                             </div>
//                           </div>

//                           <div className="w-full bg-blue-600 group-hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
//                             Apply Now <ArrowRight size={16} />
//                           </div>
//                         </button>
//                       ))}
//                     </div>

//                     {/* Back link */}
//                     <button
//                       onClick={() => setShowOffers(false)}
//                       className="text-blue-600 text-xs font-medium hover:underline mt-4 block mx-auto"
//                     >
//                       ← Edit details
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>

//       {/* ── WHAT IS ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Personal Loan?</h2>
//         <div className="text-gray-600 text-sm leading-relaxed space-y-4">
//           <p>
//             A Personal Loan gives you quick access to funds for your urgent as well as planned needs
//             without pledging any security. With a fully digital online personal loan process, you can
//             complete your application in just a few clicks and get a quick approval.
//           </p>
//           <p>
//             Most lenders in India use automated systems to assess your credit profile, income, and basic
//             details in real time. An instant online Personal Loan is ideal for:
//           </p>
//           <ul className="space-y-2 pl-1">
//             {useCases.map(u => (
//               <li key={u} className="flex items-start gap-3">
//                 <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
//                 {u}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* ── FEATURE TABLE ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-5">
//           Key Personal Loan Features at Direct Paisa
//         </h2>
//         <div className="rounded-2xl border border-gray-200 overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-blue-50">
//                 <th className="text-left px-6 py-3 font-semibold text-blue-700 w-1/2">Feature</th>
//                 <th className="text-left px-6 py-3 font-semibold text-blue-700">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tableData.map((row, i) => (
//                 <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                   <td className="px-6 py-3.5 text-gray-700 font-medium border-t border-gray-100">{row.feature}</td>
//                   <td className="px-6 py-3.5 text-gray-600 border-t border-gray-100">{row.details}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* ── WHY DIRECT PAISA ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Why Apply for a Personal Loan on Direct Paisa?
//         </h2>
//         <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
//           Direct Paisa provides personal loan offers from 30+ banks & NBFCs, enabling you to compare,
//           choose and apply for the personal loan that suits your requirements the best, with the highest
//           chances of approval. Through deep integrations with India's leading Banks and NBFCs, you can
//           apply for a personal loan with ease on the Direct Paisa platform, through end-to-end digital
//           processes.
//         </p>
//       </section>

//       {/* ── BOTTOM CTA ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
//         <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h2 className="text-xl font-bold mb-1">Need funds instantly?</h2>
//             <p className="text-blue-100 text-sm">Apply in 5 minutes — money in your account in 24 hours</p>
//           </div>
//           <button
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
//           >
//             Apply Now <ArrowRight size={16} />
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
