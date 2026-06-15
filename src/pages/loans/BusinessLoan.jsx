// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { Briefcase, CheckCircle, ArrowRight, Phone } from "lucide-react";

// const features = [
//   "Loan amount: ₹1 Lakh – ₹50 Lakh",
//   "Interest rate starting from 10.5% p.a.",
//   "Repayment tenure: 12 – 60 months",
//   "Minimal documentation required",
//   "No collateral for loans upto ₹10L",
//   "Approval in 24–48 hours",
// ];
// const eligibility = [
//   "Business vintage minimum 2 years",
//   "Annual turnover ₹10 Lakh+",
//   "CIBIL score 700 or above",
//   "Age: 21 – 65 years",
//   "GST registered business preferred",
// ];
// const documents = [
//   "PAN Card (Business + Owner)",
//   "Aadhaar Card",
//   "Last 6 months bank statement",
//   "ITR of last 2 years",
//   "GST registration certificate",
//   "Business proof (shop act, udyam etc.)",
// ];

// export default function BusinessLoan() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Hero */}
//       <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-16 px-4">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
//               <Briefcase size={24} />
//             </div>
//             <span className="text-blue-200 font-medium">Loans → Business Loan</span>
//           </div>
//           <h1 className="text-3xl md:text-5xl font-bold mb-4">Business Loan</h1>
//           <p className="text-blue-100 text-lg max-w-xl mb-8">
//             Grow your MSME or startup with fast, collateral-free business loans. Get funds in 24 hours.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
//               Apply Now <ArrowRight size={18} />
//             </button>
//             <button className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
//               <Phone size={16} /> Talk to Expert
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Quick stats */}
//       <section className="bg-white border-b">
//         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
//           {[
//             { label: "Max Loan", value: "₹50 Lakh" },
//             { label: "Interest From", value: "10.5%*" },
//             { label: "Max Tenure", value: "60 Months" },
//             { label: "Approval In", value: "24 Hours" },
//           ].map((s) => (
//             <div key={s.label} className="py-6 px-8 text-center">
//               <div className="text-2xl font-bold text-blue-600">{s.value}</div>
//               <div className="text-sm text-gray-500 mt-1">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 3 info cards */}
//       <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Key Features</h2>
//           <ul className="space-y-3">
//             {features.map((f) => (
//               <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
//                 <CheckCircle size={17} className="text-green-500 mt-0.5 flex-shrink-0" />
//                 {f}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Eligibility</h2>
//           <ul className="space-y-3">
//             {eligibility.map((e) => (
//               <li key={e} className="flex items-start gap-3 text-sm text-gray-600">
//                 <CheckCircle size={17} className="text-blue-500 mt-0.5 flex-shrink-0" />
//                 {e}
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Documents Required</h2>
//           <ul className="space-y-3">
//             {documents.map((d) => (
//               <li key={d} className="flex items-start gap-3 text-sm text-gray-600">
//                 <CheckCircle size={17} className="text-purple-500 mt-0.5 flex-shrink-0" />
//                 {d}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="max-w-5xl mx-auto px-4 pb-16">
//         <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
//           <h2 className="text-2xl font-bold mb-2">Ready to grow your business?</h2>
//           <p className="text-blue-100 mb-6">Apply in 5 minutes — get approval in 24 hours</p>
//           <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">
//             Apply for Business Loan
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }


// add image section and form section after hero. also add faq section before cta

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckCircle, ArrowRight, Zap, Clock, Search, Shield, Star } from "lucide-react";

const features = [
  { icon: Zap,    title: "Compare 25+ Lenders Instantly",  desc: "Evaluate interest rates, tenure & more in one place." },
  { icon: Clock,  title: "Quick Funds in 24-48 Hours",     desc: "Minimal documentation with super-fast approval." },
  { icon: Search, title: "Check Eligibility for Free",     desc: "No impact on credit score. 100% secure." },
  { icon: Shield, title: "Safe, Secure & Compliant",       desc: "RBI-compliant partners. Your data is always protected." },
];

const tableData = [
  { feature: "Loan Amount",          details: "₹1 Lakh – ₹50 Lakh" },
  { feature: "Interest Rate",        details: "10.5% – 36% p.a." },
  { feature: "Repayment Tenure",     details: "12 – 60 months" },
  { feature: "Processing Fee",       details: "0% – 3% of loan amount" },
  { feature: "Disbursal Time",       details: "Within 24 – 48 hours" },
  { feature: "CIBIL Score Required", details: "700+ preferred" },
  { feature: "Collateral",           details: "Not required upto ₹10L" },
  { feature: "Business Vintage",     details: "Minimum 2 years" },
  { feature: "Min Annual Turnover",  details: "₹10 Lakh+" },
];

const useCases = [
  "Purchasing new machinery or equipment",
  "Expanding your business premises",
  "Managing working capital & cash flow",
  "Hiring staff or scaling operations",
  "Marketing & digital transformation",
  "Inventory purchase or raw material",
];

export default function BusinessLoan() {
  const [form, setForm]           = useState({ name: "", mobile: "" });
  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed]       = useState(true);
  const [errors, setErrors]       = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = "Enter your full name as on PAN";
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      e.mobile = "Enter valid 10-digit mobile number";
    if (!agreed) e.agreed = "Please accept terms to continue";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO — left: content  |  right: form
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── LEFT ── */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Business Loan
            </h1>
            <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">
              Power your business growth with flexible loans from 25+ trusted banks and NBFCs.
              One simple application.{" "}
              <span className="text-green-600 font-semibold">Multiple offers.</span>{" "}
              Maximum growth.
            </p>

            {/* Feature list */}
            <div className="space-y-5 mb-10">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{title}</p>
                    <p className="text-gray-400 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* App image */}
            <div className="hidden md:block">
              <img
                src="/images/direct-credit-app.png"
                alt="Direct Paisa App"
                className="w-72 mx-auto drop-shadow-2xl"
              />
            </div>

            {/* Stats bar */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
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
                    {[1,2,3,4].map(i => <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />)}
                    <Star size={9} className="fill-yellow-200 text-yellow-400" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">4.6/5</p>
                  <p className="text-xs text-gray-400">18.2K Reviews</p>
                </div>
              </div>
              {[
                { value: "6.2L+",       sub: "Happy Customers",   color: "text-green-600" },
                { value: "50+",         sub: "Banking Partners",  color: "text-green-600" },
                { value: "₹10,000 Cr+", sub: "Loans Disbursed",   color: "text-green-600" },
              ].map(s => (
                <div key={s.value} className="text-center">
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Sticky form ── */}
          <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

              {/* Cashback banner */}
              <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Get Cashback of <span className="text-green-600 font-bold">₹2,000*</span> on Loan Disbursal
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
                        ✦ Instant Business Loan ✦
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    {/* Headline */}
                    <p className="text-center text-xl font-extrabold text-gray-900 mb-5 leading-snug">
                      Get up to{" "}
                      <span className="text-green-600">₹50 Lakhs</span>{" "}
                      starting at{" "}
                      <span className="text-green-600 underline decoration-green-400 decoration-2 underline-offset-2">
                        10.5%
                      </span>
                    </p>

                    {/* Name */}
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Full Name (as on your PAN)"
                        value={form.name}
                        onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                        className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition
                          ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Mobile */}
                    <div className="mb-1 relative">
                      <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-green-600 font-medium z-10">
                        Mobile Number
                      </span>
                      <div className={`flex items-center border-2 rounded-xl overflow-hidden transition
                        ${errors.mobile ? "border-red-400" : "border-green-400"}`}>
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
                            className="px-3 text-green-600 text-xs font-semibold whitespace-nowrap"
                          >
                            ✏ Edit
                          </button>
                        )}
                      </div>
                      {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-5"
                    >
                      Check Eligibility <ArrowRight size={17} />
                    </button>

                    {/* Terms */}
                    <div className="flex items-start gap-2 mt-3">
                      <input
                        type="checkbox" id="terms" checked={agreed}
                        onChange={e => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
                        className="mt-0.5 accent-green-600 w-4 h-4 flex-shrink-0 cursor-pointer"
                      />
                      <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        By submitting this form, you have read and agree to the{" "}
                        <span className="text-green-500">Terms of Use</span> &{" "}
                        <span className="text-green-500">Privacy Policy</span>
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
                    <button onClick={() => { setForm({ name: "", mobile: "" }); setSubmitted(false); }}
                      className="text-green-600 text-sm font-medium hover:underline">
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Business Loan?</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-4">
          <p>A Business Loan provides working capital and growth funds to MSMEs, startups, and established businesses without pledging major assets. Whether you need to expand, buy equipment, or manage cash flow — Direct Paisa connects you with the right lender in minutes.</p>
          <p>It is ideal for:</p>
          <ul className="space-y-2 pl-1">
            {useCases.map(u => (
              <li key={u} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />{u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TABLE ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Key Business Loan Features at Direct Paisa</h2>
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50">
                <th className="text-left px-6 py-3 font-semibold text-green-700 w-1/2">Feature</th>
                <th className="text-left px-6 py-3 font-semibold text-green-700">Details</th>
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

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Ready to grow your business?</h2>
            <p className="text-green-100 text-sm">Apply in 5 minutes — approval in 24–48 hours</p>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-green-700 font-semibold px-7 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
            Apply Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}