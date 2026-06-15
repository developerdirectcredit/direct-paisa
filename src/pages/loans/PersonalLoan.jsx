// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { BadgeIndianRupee, CheckCircle, ArrowRight, Phone } from "lucide-react";

// const features = ["Loan amount: ₹50,000 – ₹40 Lakh","Interest rate from 10.99% p.a.","Tenure: 12 – 60 months","No collateral required","100% paperless process","Disbursal in 24 hours"];
// const eligibility = ["Age: 21 – 60 years","Salaried or self-employed","Min salary ₹15,000/month","CIBIL score 700+","Work experience 1 year+"];
// const documents = ["PAN Card","Aadhaar Card","Last 3 months salary slips","6 months bank statement","Form 16 / ITR"];

// export default function PersonalLoan() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-16 px-4">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><BadgeIndianRupee size={24} /></div>
//             <span className="text-blue-200 font-medium">Loans → Personal Loan</span>
//           </div>
//           <h1 className="text-3xl md:text-5xl font-bold mb-4">Personal Loan</h1>
//           <p className="text-blue-100 text-lg max-w-xl mb-8">Instant personal loans upto ₹40 Lakh — for travel, medical, wedding or any personal need.</p>
//           <div className="flex flex-wrap gap-4">
//             <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">Apply Now <ArrowRight size={18} /></button>
//             <button className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"><Phone size={16} /> Talk to Expert</button>
//           </div>
//         </div>
//       </section>
//       <section className="bg-white border-b">
//         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
//           {[{label:"Max Loan",value:"₹40 Lakh"},{label:"Interest From",value:"10.99%*"},{label:"Max Tenure",value:"60 Months"},{label:"Disbursal",value:"24 Hours"}].map((s) => (
//             <div key={s.label} className="py-6 px-8 text-center">
//               <div className="text-2xl font-bold text-blue-600">{s.value}</div>
//               <div className="text-sm text-gray-500 mt-1">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Key Features</h2>
//           <ul className="space-y-3">{features.map((f) => <li key={f} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-green-500 mt-0.5 flex-shrink-0" />{f}</li>)}</ul>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Eligibility</h2>
//           <ul className="space-y-3">{eligibility.map((e) => <li key={e} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-blue-500 mt-0.5 flex-shrink-0" />{e}</li>)}</ul>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Documents Required</h2>
//           <ul className="space-y-3">{documents.map((d) => <li key={d} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-purple-500 mt-0.5 flex-shrink-0" />{d}</li>)}</ul>
//         </div>
//       </section>
//       <section className="max-w-5xl mx-auto px-4 pb-16">
//         <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
//           <h2 className="text-2xl font-bold mb-2">Need funds instantly?</h2>
//           <p className="text-blue-100 mb-6">Apply in 5 minutes — money in your account in 24 hours</p>
//           <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-colors">Apply for Personal Loan</button>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }


// == add new code

// import { useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { BadgeIndianRupee, CheckCircle, ArrowRight, Phone, Shield, Zap, Users } from "lucide-react";

// const tableData = [
//   { feature: "Loan Amount", details: "₹10,000 – ₹50 Lakh" },
//   { feature: "Interest Rate", details: "9.98% – 44% p.a." },
//   { feature: "Repayment Tenure", details: "12 – 84 months" },
//   { feature: "Processing Fee", details: "0% – 4% of loan amount" },
//   { feature: "Disbursal Time", details: "Within 24 – 72 hours" },
//   { feature: "CIBIL Score Required", details: "700+ (760+ for best rates)" },
//   { feature: "Collateral Required", details: "None (Unsecured)" },
//   { feature: "Minimum Salary", details: "₹15,000/month (varies by lender)" },
//   { feature: "Prepayment Charges", details: "0% – 5% (lender-specific)" },
// ];

// const useCases = [
//   "Medical or emergency expenses",
//   "Education or skill-upgradation costs",
//   "Wedding and family functions",
//   "Travel and holidays",
//   "Home repairs, rent deposits, or moving costs",
//   "Debt consolidation and balance transfer",
// ];

// const whyUs = [
//   { icon: Users, title: "30+ Lenders", desc: "Compare offers from top banks & NBFCs" },
//   { icon: Zap, title: "Instant Approval", desc: "Real-time eligibility check in seconds" },
//   { icon: Shield, title: "100% Secure", desc: "Your data is safe & encrypted" },
// ];

// export default function PersonalLoan() {
//   const [form, setForm] = useState({ name: "", mobile: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Full name required";
//     else if (form.name.trim().length < 3) e.name = "Enter valid full name";
//     if (!form.mobile.trim()) e.mobile = "Mobile number required";
//     else if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
//     return e;
//   };

//   const handleSubmit = () => {
//     const e = validate();
//     if (Object.keys(e).length > 0) { setErrors(e); return; }
//     setSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />

//       {/* Hero + Form */}
//       <section className="bg-gradient-to-br from-blue-700 to-blue-500 text-white py-12 px-4">
//         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">

//           {/* Left — Hero text */}
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
//                 <BadgeIndianRupee size={22} />
//               </div>
//               <span className="text-blue-200 text-sm font-medium">Loans → Personal Loan</span>
//             </div>
//             <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
//               Get up to ₹50 Lakhs<br />starting at <span className="text-yellow-300">9.98%</span>
//             </h1>
//             <p className="text-blue-100 text-base mb-8 max-w-md">
//               Quick access to funds for your urgent and planned needs — no security required, fully digital process.
//             </p>

//             {/* Why Direct Paisa */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//               {whyUs.map(({ icon: Icon, title, desc }) => (
//                 <div key={title} className="bg-white/10 rounded-xl p-4">
//                   <Icon size={20} className="mb-2 text-yellow-300" />
//                   <div className="font-semibold text-sm">{title}</div>
//                   <div className="text-blue-200 text-xs mt-0.5">{desc}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right — Form card */}
//           <div className="w-full lg:w-96 bg-white rounded-2xl shadow-2xl p-6 text-gray-800">
//             {!submitted ? (
//               <>
//                 <h2 className="text-lg font-bold text-gray-800 mb-1">Check Your Eligibility</h2>
//                 <p className="text-xs text-gray-400 mb-5">Free check — no impact on credit score</p>

//                 {/* Name field */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Full Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="As on your PAN card"
//                     value={form.name}
//                     onChange={(e) => {
//                       setForm({ ...form, name: e.target.value });
//                       setErrors({ ...errors, name: "" });
//                     }}
//                     className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
//                       errors.name ? "border-red-400 bg-red-50" : "border-gray-200"
//                     }`}
//                   />
//                   {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                 </div>

//                 {/* Mobile field */}
//                 <div className="mb-5">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Mobile Number <span className="text-red-500">*</span>
//                   </label>
//                   <div className={`flex items-center border rounded-xl overflow-hidden transition ${
//                     errors.mobile ? "border-red-400 bg-red-50" : "border-gray-200"
//                   }`}>
//                     <span className="px-3 py-3 bg-gray-100 text-sm text-gray-500 border-r border-gray-200 font-medium">
//                       +91
//                     </span>
//                     <input
//                       type="tel"
//                       maxLength={10}
//                       placeholder="10-digit mobile number"
//                       value={form.mobile}
//                       onChange={(e) => {
//                         const val = e.target.value.replace(/\D/g, "");
//                         setForm({ ...form, mobile: val });
//                         setErrors({ ...errors, mobile: "" });
//                       }}
//                       className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
//                     />
//                   </div>
//                   {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
//                 >
//                   Check Eligibility <ArrowRight size={17} />
//                 </button>

//                 <p className="text-xs text-gray-400 text-center mt-3">
//                   By continuing, you agree to our{" "}
//                   <span className="text-blue-500 cursor-pointer">Terms & Privacy Policy</span>
//                 </p>
//               </>
//             ) : (
//               /* Success state */
//               <div className="text-center py-6">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle size={32} className="text-green-500" />
//                 </div>
//                 <h3 className="text-lg font-bold text-gray-800 mb-2">Application Received!</h3>
//                 <p className="text-gray-500 text-sm mb-1">
//                   Hi <span className="font-semibold text-gray-700">{form.name}</span>,
//                 </p>
//                 <p className="text-gray-500 text-sm mb-5">
//                   Our team will call you on{" "}
//                   <span className="font-semibold text-gray-700">+91 {form.mobile}</span> within 24 hours.
//                 </p>
//                 <button
//                   onClick={() => { setForm({ name: "", mobile: "" }); setSubmitted(false); }}
//                   className="text-blue-600 text-sm font-medium hover:underline"
//                 >
//                   Submit another application
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Quick stats bar */}
//       <section className="bg-white border-b">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
//           {[
//             { label: "Max Loan", value: "₹50 Lakh" },
//             { label: "Interest From", value: "9.98%*" },
//             { label: "Max Tenure", value: "84 Months" },
//             { label: "Disbursal In", value: "24 Hours" },
//           ].map((s) => (
//             <div key={s.label} className="py-5 px-6 text-center">
//               <div className="text-xl font-bold text-blue-600">{s.value}</div>
//               <div className="text-xs text-gray-500 mt-1">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* What is Personal Loan */}
//       <section className="max-w-6xl mx-auto px-4 py-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Personal Loan?</h2>
//         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-gray-600 leading-relaxed text-sm space-y-4">
//           <p>
//             A Personal Loan gives you quick access to funds for your urgent as well as planned needs without pledging any security. With a fully digital online personal loan process, you can complete your application in just a few clicks and get a quick approval.
//           </p>
//           <p>
//             Most lenders in India use automated systems to assess your credit profile, income, and basic details in real time. When you apply for a personal loan online, the system can instantly evaluate your basic eligibility, approximate loan amount, and an indicative EMI based on your chosen tenure.
//           </p>
//           <p>
//             If you meet the lender's criteria and your documents are in order, approval is done quickly, and the amount can be disbursed soon after you e-sign the agreement. An instant online Personal Loan is ideal for:
//           </p>
//           <ul className="space-y-2 pl-1">
//             {useCases.map((u) => (
//               <li key={u} className="flex items-start gap-3">
//                 <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
//                 {u}
//               </li>
//             ))}
//           </ul>
//           <p>
//             The best thing about personal loans is that you can use these funds as per your financial needs, subject to the lender's terms and conditions.
//           </p>
//         </div>
//       </section>

//       {/* Feature Table */}
//       <section className="max-w-6xl mx-auto px-4 pb-12">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Personal Loan Features at Direct Paisa</h2>
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
//                   <td className="px-6 py-3.5 text-gray-700 font-medium">{row.feature}</td>
//                   <td className="px-6 py-3.5 text-gray-600">{row.details}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* Why Direct Paisa */}
//       <section className="max-w-6xl mx-auto px-4 pb-16">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Apply for a Personal Loan on Direct Paisa?</h2>
//         <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-gray-600 text-sm leading-relaxed">
//           <p>
//             Direct Paisa provides personal loan offers from 30+ banks & NBFCs, enabling you to compare, choose and apply for the personal loan that suits your requirements the best, with the highest chances of approval. Through deep integrations with India's leading Banks and NBFCs, you can apply for a personal loan with ease on the Direct Paisa platform, through end-to-end digital processes.
//           </p>
//         </div>
//       </section>

//       {/* Bottom CTA */}
//       <section className="max-w-6xl mx-auto px-4 pb-16">
//         <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h2 className="text-xl font-bold mb-1">Need funds instantly?</h2>
//             <p className="text-blue-100 text-sm">Apply in 5 minutes — money in your account in 24 hours</p>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
//             >
//               Apply Now <ArrowRight size={16} />
//             </button>
//             <button className="border border-white/40 text-white font-medium px-5 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
//               <Phone size={15} /> Call Us
//             </button>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }



// add image section 

// import { useState } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import {
//   CheckCircle, ArrowRight, Ban, Banknote, Search, Shield,
//   Star, Users, Handshake, TrendingUp
// } from "lucide-react";

// const features = [
//   { icon: Ban, title: "Compare 30+ Lenders instantly", desc: "with no physical paperwork." },
//   { icon: Banknote, title: "Get funds in 24 hours", desc: "with instant pre-approval." },
//   { icon: Search, title: "Check eligibility", desc: "with zero impact on your credit score." },
//   { icon: Shield, title: "Bank-grade security", desc: "with RBI-approved lenders and no spam calls." },
// ];

// const stats = [
//   { icon: Star, value: "4.5/5", sub: "15.6L Reviews", label: "Google Play Store" },
//   { icon: Users, value: "5.7cr+", sub: "Satisfied Customers" },
//   { icon: Handshake, value: "65+", sub: "Lending Partners" },
//   { icon: TrendingUp, value: "₹65k Cr+", sub: "Loans Disbursed" },
// ];

// const tableData = [
//   { feature: "Loan Amount", details: "₹10,000 – ₹50 Lakh" },
//   { feature: "Interest Rate", details: "9.98% – 44% p.a." },
//   { feature: "Repayment Tenure", details: "12 – 84 months" },
//   { feature: "Processing Fee", details: "0% – 4% of loan amount" },
//   { feature: "Disbursal Time", details: "Within 24 – 72 hours" },
//   { feature: "CIBIL Score Required", details: "700+ (760+ for best rates)" },
//   { feature: "Collateral Required", details: "None (Unsecured)" },
//   { feature: "Minimum Salary", details: "₹15,000/month (varies by lender)" },
//   { feature: "Prepayment Charges", details: "0% – 5% (lender-specific)" },
// ];

// const useCases = [
//   "Medical or emergency expenses",
//   "Education or skill-upgradation costs",
//   "Wedding and family functions",
//   "Travel and holidays",
//   "Home repairs, rent deposits, or moving costs",
//   "Debt consolidation and balance transfer",
// ];

// export default function PersonalLoan() {
//   const [form, setForm] = useState({ name: "", mobile: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [agreed, setAgreed] = useState(true);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim() || form.name.trim().length < 3) e.name = "Enter your full name as on PAN";
//     if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
//     if (!agreed) e.agreed = "Please accept terms to continue";
//     return e;
//   };

//   const handleSubmit = () => {
//     const e = validate();
//     if (Object.keys(e).length > 0) { setErrors(e); return; }
//     setSubmitted(true);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {/* ── HERO SECTION ── */}
//       <section className="max-w-6xl mx-auto px-4 py-12">
//         <div className="flex flex-col lg:flex-row gap-10 items-start">

//           {/* LEFT side */}
//           <div className="flex-1">
//             <h1 className="text-4xl font-bold text-gray-900 mb-3">Personal Loan</h1>
//             <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">
//               Find the right personal loan for you from 30+ Banks and NBFCs on Direct Paisa — with just
//               one easy application. Get customized offers matched to your eligibility, with highest chances
//               of approval.
//             </p>

//             {/* Feature list */}
//             <div className="space-y-5 mb-10">
//               {features.map(({ icon: Icon, title, desc }) => (
//                 <div key={title} className="flex items-start gap-4">
//                   <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
//                     <Icon size={19} className="text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="font-semibold text-gray-800 text-sm">{title}</p>
//                     <p className="text-gray-400 text-sm">{desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Stats bar */}
//             <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//               {/* Play store */}
//               <div className="flex items-center gap-2">
//                 <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
//                   <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
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
//                 { value: "5.7cr+", sub: "Satisfied Customers" },
//                 { value: "65+", sub: "Lending Partners" },
//                 { value: "₹65k Cr+", sub: "Loans Disbursed" },
//               ].map((s) => (
//                 <div key={s.value} className="text-center">
//                   <p className="text-lg font-bold text-gray-800">{s.value}</p>
//                   <p className="text-xs text-gray-400">{s.sub}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT side — Form card */}
//           <div className="w-full lg:w-[400px] flex-shrink-0">
//             <div className="border border-gray-200 rounded-2xl shadow-lg overflow-hidden">

//               {/* Cashback banner */}
//               <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
//                 <span className="text-2xl">💰</span>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">
//                     Get Cashback of <span className="text-blue-600">₹1,000*</span> on Loan Disbursal
//                   </p>
//                   <p className="text-xs text-gray-400">Valid till 30th June '26 &nbsp;·&nbsp; *T&C Apply</p>
//                 </div>
//               </div>

//               <div className="px-6 py-6">
//                 {!submitted ? (
//                   <>
//                     {/* Header */}
//                     <div className="flex items-center gap-2 mb-4 justify-center">
//                       <div className="h-px flex-1 bg-gray-200" />
//                       <span className="text-xs text-gray-500 font-medium whitespace-nowrap">✦ Instant Personal Loan ✦</span>
//                       <div className="h-px flex-1 bg-gray-200" />
//                     </div>

//                     <p className="text-center text-xl font-bold text-gray-900 mb-5">
//                       Get up to{" "}
//                       <span className="text-blue-600">₹50 Lakhs</span>{" "}
//                       starting at{" "}
//                       <span className="text-blue-600 underline decoration-blue-400 decoration-2 underline-offset-2">
//                         9.98%
//                       </span>
//                     </p>

//                     {/* Name */}
//                     <div className="mb-4">
//                       <input
//                         type="text"
//                         placeholder="Full Name (as on your PAN)"
//                         value={form.name}
//                         onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
//                         className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
//                       />
//                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                     </div>

//                     {/* Mobile */}
//                     <div className="mb-2">
//                       <div className={`flex items-center border rounded-xl overflow-hidden transition ${errors.mobile ? "border-red-400" : "border-gray-200"}`}>
//                         {/* Flag + code */}
//                         <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50">
//                           <span className="text-base">🇮🇳</span>
//                           <span className="text-sm text-gray-600 font-medium">+91</span>
//                         </div>
//                         <input
//                           type="tel"
//                           maxLength={10}
//                           placeholder="Mobile Number"
//                           value={form.mobile}
//                           onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setForm({ ...form, mobile: v }); setErrors({ ...errors, mobile: "" }); }}
//                           className="flex-1 px-3 py-3.5 text-sm focus:outline-none bg-transparent"
//                         />
//                         {form.mobile.length === 10 && (
//                           <button
//                             onClick={() => setForm({ ...form, mobile: "" })}
//                             className="px-3 text-blue-600 text-xs font-semibold flex items-center gap-1"
//                           >
//                             ✏ Edit
//                           </button>
//                         )}
//                       </div>
//                       {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
//                     </div>

//                     {/* Submit */}
//                     <button
//                       onClick={handleSubmit}
//                       className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-4"
//                     >
//                       Check Eligibility <ArrowRight size={17} />
//                     </button>

//                     {/* Terms checkbox */}
//                     <div className="flex items-start gap-2 mt-3">
//                       <input
//                         type="checkbox"
//                         id="terms"
//                         checked={agreed}
//                         onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
//                         className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0"
//                       />
//                       <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
//                         By submitting this form, you have read and agree to the{" "}
//                         <span className="text-blue-500">Credit Report Terms of Use</span>,{" "}
//                         <span className="text-blue-500">Terms of Use</span> &{" "}
//                         <span className="text-blue-500">Privacy Policy</span>
//                       </label>
//                     </div>
//                     {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
//                   </>
//                 ) : (
//                   /* ── Success State ── */
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <CheckCircle size={32} className="text-green-500" />
//                     </div>
//                     <h3 className="text-lg font-bold text-gray-800 mb-2">Application Received!</h3>
//                     <p className="text-gray-500 text-sm mb-1">
//                       Hi <span className="font-semibold text-gray-700">{form.name}</span>,
//                     </p>
//                     <p className="text-gray-500 text-sm mb-6">
//                       Our team will call you on{" "}
//                       <span className="font-semibold text-gray-700">+91 {form.mobile}</span> within 24 hours.
//                     </p>
//                     <button
//                       onClick={() => { setForm({ name: "", mobile: "" }); setSubmitted(false); }}
//                       className="text-blue-600 text-sm font-medium hover:underline"
//                     >
//                       Submit another application
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── WHAT IS PERSONAL LOAN ── */}
//       <section className="max-w-6xl mx-auto px-4 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Personal Loan?</h2>
//         <div className="text-gray-600 leading-relaxed text-sm space-y-4">
//           <p>
//             A Personal Loan gives you quick access to funds for your urgent as well as planned needs
//             without pledging any security. With a fully digital online personal loan process, you can
//             complete your application in just a few clicks and get a quick approval.
//           </p>
//           <p>
//             Most lenders in India use automated systems to assess your credit profile, income, and basic
//             details in real time. When you apply for a personal loan online, the system can instantly
//             evaluate your basic eligibility, approximate loan amount, and an indicative EMI based on
//             your chosen tenure.
//           </p>
//           <p>An instant online Personal Loan is ideal for:</p>
//           <ul className="space-y-2">
//             {useCases.map((u) => (
//               <li key={u} className="flex items-start gap-3">
//                 <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
//                 {u}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* ── FEATURE TABLE ── */}
//       <section className="max-w-6xl mx-auto px-4 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-5">Key Personal Loan Features at Direct Paisa</h2>
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
//       <section className="max-w-6xl mx-auto px-4 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Apply for a Personal Loan on Direct Paisa?</h2>
//         <p className="text-gray-600 text-sm leading-relaxed">
//           Direct Paisa provides personal loan offers from 30+ banks & NBFCs, enabling you to compare,
//           choose and apply for the personal loan that suits your requirements the best, with the highest
//           chances of approval. Through deep integrations with India's leading Banks and NBFCs, you can
//           apply for a personal loan with ease on the Direct Paisa platform, through end-to-end digital
//           processes.
//         </p>
//       </section>

//       {/* ── BOTTOM CTA ── */}
//       <section className="max-w-6xl mx-auto px-4 pb-16">
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

// add imagec and form section same side

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
              Find the right personal loan for you from 30+ Banks and NBFCs on Direct Paisa — with just
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
                alt="Direct Paisa App"
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
                  <p className="text-xs text-gray-400">15.6L Reviews</p>
                </div>
              </div>
              {[
                { value: "5.7cr+",    sub: "Satisfied Customers" },
                { value: "65+",       sub: "Lending Partners" },
                { value: "₹65k Cr+", sub: "Loans Disbursed" },
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

                    {/* Mobile input — border-label style */}
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

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
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
                  /* ── Success ── */
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
            A Personal Loan gives you quick access to funds for your urgent as well as planned needs
            without pledging any security. With a fully digital online personal loan process, you can
            complete your application in just a few clicks and get a quick approval.
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
          Key Personal Loan Features at Direct Paisa
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
          Why Apply for a Personal Loan on Direct Paisa?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
          Direct Paisa provides personal loan offers from 30+ banks & NBFCs, enabling you to compare,
          choose and apply for the personal loan that suits your requirements the best, with the highest
          chances of approval. Through deep integrations with India's leading Banks and NBFCs, you can
          apply for a personal loan with ease on the Direct Paisa platform, through end-to-end digital
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
    </div>
  );
}

