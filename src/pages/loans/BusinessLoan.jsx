// import { useState, useRef, useEffect } from "react";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import {
//   CheckCircle, CheckCircle2, ArrowRight, ArrowLeft, Zap, Clock, Search, Shield, Star,
//   Building2, User, CreditCard, TrendingUp, Smartphone, KeyRound, RefreshCw, XCircle,
//   FileText, IndianRupee,
// } from "lucide-react";

// /* ════════════════════════════════════════════════════════════
//    EXISTING LANDING-PAGE CONTENT (unchanged)
// ════════════════════════════════════════════════════════════ */
// const features = [
//   { icon: Zap,    title: "Compare 25+ Lenders Instantly",  desc: "Evaluate interest rates, tenure & more in one place." },
//   { icon: Clock,  title: "Quick Funds in 24-48 Hours",     desc: "Minimal documentation with super-fast approval." },
//   { icon: Search, title: "Check Eligibility for Free",     desc: "No impact on credit score. 100% secure." },
//   { icon: Shield, title: "Safe, Secure & Compliant",       desc: "RBI-compliant partners. Your data is always protected." },
// ];

// const tableData = [
//   { feature: "Loan Amount",          details: "₹1 Lakh – ₹50 Lakh" },
//   { feature: "Interest Rate",        details: "10.5% – 36% p.a." },
//   { feature: "Repayment Tenure",     details: "12 – 60 months" },
//   { feature: "Processing Fee",       details: "0% – 3% of loan amount" },
//   { feature: "Disbursal Time",       details: "Within 24 – 48 hours" },
//   { feature: "CIBIL Score Required", details: "700+ preferred" },
//   { feature: "Collateral",           details: "Not required upto ₹10L" },
//   { feature: "Business Vintage",     details: "Minimum 2 years" },
//   { feature: "Min Annual Turnover",  details: "₹10 Lakh+" },
// ];

// const useCases = [
//   "Purchasing new machinery or equipment",
//   "Expanding your business premises",
//   "Managing working capital & cash flow",
//   "Hiring staff or scaling operations",
//   "Marketing & digital transformation",
//   "Inventory purchase or raw material",
// ];

// /* ════════════════════════════════════════════════════════════
//    NEW — APPLICATION FLOW: STATIC DATA
//    (GST → Turnover → Personal → Business → Loan → CIBIL → OTP → Result)
// ════════════════════════════════════════════════════════════ */
// const turnoverOptions = [
//   { id: "gt1cr",    label: "₹1 Crore & above" },
//   { id: "50l-1cr",  label: "₹50 Lakhs – ₹1 Crore" },
//   { id: "below50l", label: "Below ₹50 Lakhs" },
//   { id: "below25l", label: "Below ₹25 Lakhs" },
//   { id: "custom",   label: "Enter Turnover Amount" },
// ];

// const businessTypes = ["Sole Proprietorship", "Partnership Firm", "Private Limited", "LLP", "Public Limited", "Other"];
// const industries     = ["Manufacturing", "Trading / Retail", "Services", "IT & Software", "Construction", "Healthcare", "Education", "Food & Hospitality", "Other"];
// const vintageOptions = ["Less than 1 year", "1 – 2 years", "2 – 5 years", "5+ years"];
// const loanPurposes   = ["Working Capital", "Business Expansion", "Machinery / Equipment Purchase", "Inventory Purchase", "Debt Consolidation", "Other"];
// const tenureOptions  = ["12 months", "24 months", "36 months", "48 months", "60 months"];

// const lenders = [
//   { name: "HDFC Bank",     rate: "10.50% – 14.00% p.a.", amount: "Up to ₹40 Lakh", color: "bg-blue-50 text-blue-700",     emoji: "🏦" },
//   { name: "ICICI Bank",    rate: "11.00% – 15.50% p.a.", amount: "Up to ₹35 Lakh", color: "bg-orange-50 text-orange-700", emoji: "🏛️" },
//   { name: "Axis Bank",     rate: "10.75% – 16.00% p.a.", amount: "Up to ₹50 Lakh", color: "bg-pink-50 text-pink-700",     emoji: "🏦" },
//   { name: "Bajaj Finserv", rate: "13.00% – 22.00% p.a.", amount: "Up to ₹30 Lakh", color: "bg-indigo-50 text-indigo-700", emoji: "💼" },
//   { name: "Tata Capital",  rate: "12.50% – 18.00% p.a.", amount: "Up to ₹45 Lakh", color: "bg-teal-50 text-teal-700",     emoji: "🏢" },
// ];

// // Step label shown in the progress header
// const STEP_LABELS = {
//   gst: "GST Details", turnover: "Annual Turnover", personal: "Personal Details",
//   business: "Business Details", loanReq: "Loan Requirement", cibilIntro: "CIBIL Check",
//   mobileOtp: "Verify Number", otp: "Enter OTP", result: "Your Result",
// };

// // Turnover step is only part of the flow when the user has GST
// function getStepSequence(gst) {
//   return gst === "yes"
//     ? ["gst", "turnover", "personal", "business", "loanReq", "cibilIntro", "mobileOtp", "otp", "result"]
//     : ["gst", "personal", "business", "loanReq", "cibilIntro", "mobileOtp", "otp", "result"];
// }

// export default function BusinessLoan() {
//   /* ── Hero form (existing) ── */
//   const [form, setForm] = useState({ name: "", mobile: "" });
//   const [agreed, setAgreed] = useState(true);
//   const [errors, setErrors] = useState({});

//   /* ── Flow controller ── */
//   const [step, setStep] = useState("hero"); // hero | gst | turnover | personal | business | loanReq | cibilIntro | mobileOtp | otp | result

//   /* ── New: application-flow state ── */
//   const [gst, setGst] = useState("");
//   const [turnover, setTurnover] = useState("");
//   const [turnoverAmount, setTurnoverAmount] = useState("");

//   const [personal, setPersonal] = useState({ fullName: "", gender: "", dob: "", pan: "", email: "", maritalStatus: "" });
//   const [business, setBusiness] = useState({ businessName: "", businessType: "", industry: "", vintage: "", address: "" });
//   const [loan, setLoan] = useState({ amount: "", purpose: "", tenure: "" });

//   const [cibilMobile, setCibilMobile] = useState("");
//   const [otp, setOtp] = useState(Array(6).fill(""));
//   const [otpTimer, setOtpTimer] = useState(0);
//   const [cibilScore, setCibilScore] = useState(null);
//   const [appliedLenders, setAppliedLenders] = useState({});
//   const otpRefs = useRef([]);

//   useEffect(() => {
//     if (otpTimer <= 0) return;
//     const t = setTimeout(() => setOtpTimer((s) => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [otpTimer]);

//   const sequence   = getStepSequence(gst || "no");
//   const stepIndex  = sequence.indexOf(step);
//   const progressPct = step === "hero" ? 0 : Math.round(((stepIndex + 1) / sequence.length) * 100);

//   const calcAge = (dobStr) => {
//     if (!dobStr) return 0;
//     const diffMs = Date.now() - new Date(dobStr).getTime();
//     return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
//   };

//   /* ── Validation per step ── */
//   const validateHero = () => {
//     const e = {};
//     if (!form.name.trim() || form.name.trim().length < 3) e.name = "Enter your full name as on PAN";
//     if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
//     if (!agreed) e.agreed = "Please accept terms to continue";
//     return e;
//   };
//   const validateGst = () => (gst ? {} : { gst: "Please select an option" });
//   const validateTurnover = () => {
//     const e = {};
//     if (!turnover) e.turnover = "Please select your annual turnover";
//     if (turnover === "custom" && (!turnoverAmount || Number(turnoverAmount) <= 0)) e.turnoverAmount = "Enter a valid turnover amount";
//     return e;
//   };
//   const validatePersonal = () => {
//     const e = {}; const p = personal;
//     if (!p.fullName.trim() || p.fullName.trim().length < 3) e.fullName = "Enter full name as on PAN";
//     if (!p.gender) e.gender = "Select gender";
//     if (!p.dob) e.dob = "Select date of birth";
//     else if (calcAge(p.dob) < 21) e.dob = "Applicant must be at least 21 years old";
//     if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(p.pan.toUpperCase())) e.pan = "Enter a valid PAN number";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) e.email = "Enter a valid email address";
//     if (!p.maritalStatus) e.maritalStatus = "Select marital status";
//     return e;
//   };
//   const validateBusiness = () => {
//     const e = {}; const b = business;
//     if (!b.businessName.trim()) e.businessName = "Enter business name";
//     if (!b.businessType) e.businessType = "Select business type";
//     if (!b.industry) e.industry = "Select your industry";
//     if (!b.vintage) e.vintage = "Select business vintage";
//     if (!b.address.trim() || b.address.trim().length < 6) e.address = "Enter complete business address";
//     return e;
//   };
//   const validateLoan = () => {
//     const e = {}; const l = loan;
//     if (!l.amount || Number(l.amount) < 50000) e.amount = "Enter loan amount (min ₹50,000)";
//     if (!l.purpose) e.purpose = "Select loan purpose";
//     if (!l.tenure) e.tenure = "Select preferred tenure";
//     return e;
//   };
//   const validateCibilMobile = () => (/^[6-9]\d{9}$/.test(cibilMobile) ? {} : { cibilMobile: "Enter valid 10-digit mobile number linked with PAN" });
//   const validateOtp = () => (otp.join("").length === 6 ? {} : { otp: "Enter the complete 6-digit OTP" });

//   /* ── Navigation ── */
//   const goNext = () => {
//     let e = {};
//     if (step === "gst") e = validateGst();
//     else if (step === "turnover") e = validateTurnover();
//     else if (step === "personal") e = validatePersonal();
//     else if (step === "business") e = validateBusiness();
//     else if (step === "loanReq") e = validateLoan();
//     else if (step === "mobileOtp") e = validateCibilMobile();
//     else if (step === "otp") e = validateOtp();

//     if (Object.keys(e).length) { setErrors(e); return; }
//     setErrors({});

//     if (step === "otp") {
//       // Mock CIBIL pull — frontend-only demo. Wire this up to the real bureau API later.
//       const score = Math.floor(Math.random() * 251) + 600; // 600 – 850
//       setCibilScore(score);
//       setStep("result");
//       return;
//     }
//     if (step === "mobileOtp") {
//       setOtp(Array(6).fill(""));
//       setOtpTimer(30);
//       setStep("otp");
//       return;
//     }

//     const seq = getStepSequence(gst);
//     const idx = seq.indexOf(step);
//     setStep(seq[idx + 1]);
//   };

//   const goBack = () => {
//     setErrors({});
//     const seq = getStepSequence(gst);
//     const idx = seq.indexOf(step);
//     setStep(idx <= 0 ? "hero" : seq[idx - 1]);
//   };

//   const handleHeroSubmit = () => {
//     const e = validateHero();
//     if (Object.keys(e).length) { setErrors(e); return; }
//     setErrors({});
//     setPersonal((p) => ({ ...p, fullName: form.name }));
//     setCibilMobile(form.mobile);
//     setStep("gst");
//   };

//   const resetAll = () => {
//     setForm({ name: "", mobile: "" });
//     setGst(""); setTurnover(""); setTurnoverAmount("");
//     setPersonal({ fullName: "", gender: "", dob: "", pan: "", email: "", maritalStatus: "" });
//     setBusiness({ businessName: "", businessType: "", industry: "", vintage: "", address: "" });
//     setLoan({ amount: "", purpose: "", tenure: "" });
//     setCibilMobile(""); setOtp(Array(6).fill("")); setCibilScore(null);
//     setAppliedLenders({}); setErrors({}); setStep("hero");
//   };

//   const handleOtpChange = (idx, val) => {
//     if (!/^\d?$/.test(val)) return;
//     const next = [...otp]; next[idx] = val; setOtp(next);
//     if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
//   };
//   const handleOtpKeyDown = (idx, e) => {
//     if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
//   };

//   const continueLabel = {
//     cibilIntro: "Check CIBIL Score",
//     mobileOtp: "Send OTP",
//     otp: "Verify & View CIBIL",
//   }[step] || "Continue";

//   /* ── Reusable bits ── */
//   const inputCls = (err) =>
//     `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
//       err ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
//     }`;

//   const renderProgress = () => (
//     <div className="mb-5">
//       <div className="flex items-center justify-between mb-1.5">
//         <span className="text-xs font-semibold text-green-700">{STEP_LABELS[step]}</span>
//         <span className="text-xs text-gray-400">Step {stepIndex + 1} of {sequence.length}</span>
//       </div>
//       <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
//         <div className="h-full bg-green-600 rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
//       </div>
//     </div>
//   );

//   const renderStepContent = () => {
//     switch (step) {
//       case "gst":
//         return (
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <FileText size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">GST Registration</h3>
//             </div>
//             <p className="text-sm text-gray-500 mb-5">Do you have a GST number for your business?</p>
//             <div className="grid grid-cols-2 gap-3">
//               {["yes", "no"].map((opt) => (
//                 <button key={opt} onClick={() => { setGst(opt); setErrors({}); }}
//                   className={`py-3.5 rounded-xl border-2 text-sm font-semibold capitalize transition ${
//                     gst === opt ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
//                   }`}>
//                   {opt}
//                 </button>
//               ))}
//             </div>
//             {errors.gst && <p className="text-red-500 text-xs mt-2">{errors.gst}</p>}
//           </div>
//         );

//       case "turnover":
//         return (
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <TrendingUp size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">Annual Turnover</h3>
//             </div>
//             <p className="text-sm text-gray-500 mb-5">Select your business's annual turnover range</p>
//             <div className="space-y-2.5">
//               {turnoverOptions.map((o) => (
//                 <label key={o.id} className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition ${
//                   turnover === o.id ? "border-green-600 bg-green-50" : "border-gray-200"
//                 }`}>
//                   <input type="radio" name="turnover" className="accent-green-600 w-4 h-4"
//                     checked={turnover === o.id} onChange={() => { setTurnover(o.id); setErrors({}); }} />
//                   <span className="text-sm font-medium text-gray-700">{o.label}</span>
//                 </label>
//               ))}
//             </div>
//             {turnover === "custom" && (
//               <div className="mt-3">
//                 <div className="flex items-center border-2 border-green-400 rounded-xl overflow-hidden">
//                   <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3">₹</span>
//                   <input type="number" placeholder="Enter turnover amount" value={turnoverAmount}
//                     onChange={(e) => { setTurnoverAmount(e.target.value); setErrors({ ...errors, turnoverAmount: "" }); }}
//                     className="flex-1 px-3 py-3 text-sm focus:outline-none" />
//                 </div>
//                 {errors.turnoverAmount && <p className="text-red-500 text-xs mt-1">{errors.turnoverAmount}</p>}
//               </div>
//             )}
//             {errors.turnover && <p className="text-red-500 text-xs mt-2">{errors.turnover}</p>}
//           </div>
//         );

//       case "personal":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 mb-1">
//               <User size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">Personal Details</h3>
//             </div>

//             <div>
//               <input type="text" placeholder="Full Name (as on PAN)" value={personal.fullName}
//                 onChange={(e) => { setPersonal({ ...personal, fullName: e.target.value }); setErrors({ ...errors, fullName: "" }); }}
//                 className={inputCls(errors.fullName)} />
//               {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
//             </div>

//             <div>
//               <p className="text-xs text-gray-500 mb-2 font-medium">Gender</p>
//               <div className="grid grid-cols-3 gap-2">
//                 {["Male", "Female", "Other"].map((g) => (
//                   <button key={g} onClick={() => { setPersonal({ ...personal, gender: g }); setErrors({ ...errors, gender: "" }); }}
//                     className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition ${
//                       personal.gender === g ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600"
//                     }`}>
//                     {g}
//                   </button>
//                 ))}
//               </div>
//               {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
//             </div>

//             <div>
//               <label className="text-xs text-gray-500 mb-1 block font-medium">Date of Birth</label>
//               <input type="date" value={personal.dob}
//                 onChange={(e) => { setPersonal({ ...personal, dob: e.target.value }); setErrors({ ...errors, dob: "" }); }}
//                 className={inputCls(errors.dob)} />
//               {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
//             </div>

//             <div>
//               <input type="text" placeholder="PAN Number (e.g. ABCDE1234F)" maxLength={10} value={personal.pan}
//                 onChange={(e) => { setPersonal({ ...personal, pan: e.target.value.toUpperCase() }); setErrors({ ...errors, pan: "" }); }}
//                 className={`${inputCls(errors.pan)} uppercase`} />
//               {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
//             </div>

//             <div>
//               <input type="email" placeholder="Email Address" value={personal.email}
//                 onChange={(e) => { setPersonal({ ...personal, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
//                 className={inputCls(errors.email)} />
//               {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <select value={personal.maritalStatus}
//                 onChange={(e) => { setPersonal({ ...personal, maritalStatus: e.target.value }); setErrors({ ...errors, maritalStatus: "" }); }}
//                 className={inputCls(errors.maritalStatus)}>
//                 <option value="">Marital Status</option>
//                 <option>Single</option><option>Married</option><option>Other</option>
//               </select>
//               {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
//             </div>
//           </div>
//         );

//       case "business":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 mb-1">
//               <Building2 size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">Business Details</h3>
//             </div>

//             <div>
//               <input type="text" placeholder="Business / Firm Name" value={business.businessName}
//                 onChange={(e) => { setBusiness({ ...business, businessName: e.target.value }); setErrors({ ...errors, businessName: "" }); }}
//                 className={inputCls(errors.businessName)} />
//               {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
//             </div>

//             <div>
//               <select value={business.businessType}
//                 onChange={(e) => { setBusiness({ ...business, businessType: e.target.value }); setErrors({ ...errors, businessType: "" }); }}
//                 className={inputCls(errors.businessType)}>
//                 <option value="">Business Type</option>
//                 {businessTypes.map((t) => <option key={t}>{t}</option>)}
//               </select>
//               {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
//             </div>

//             <div>
//               <select value={business.industry}
//                 onChange={(e) => { setBusiness({ ...business, industry: e.target.value }); setErrors({ ...errors, industry: "" }); }}
//                 className={inputCls(errors.industry)}>
//                 <option value="">Nature of Business / Industry</option>
//                 {industries.map((t) => <option key={t}>{t}</option>)}
//               </select>
//               {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
//             </div>

//             <div>
//               <select value={business.vintage}
//                 onChange={(e) => { setBusiness({ ...business, vintage: e.target.value }); setErrors({ ...errors, vintage: "" }); }}
//                 className={inputCls(errors.vintage)}>
//                 <option value="">Business Vintage</option>
//                 {vintageOptions.map((t) => <option key={t}>{t}</option>)}
//               </select>
//               {errors.vintage && <p className="text-red-500 text-xs mt-1">{errors.vintage}</p>}
//             </div>

//             <div>
//               <textarea rows={2} placeholder="Business Address" value={business.address}
//                 onChange={(e) => { setBusiness({ ...business, address: e.target.value }); setErrors({ ...errors, address: "" }); }}
//                 className={`${inputCls(errors.address)} resize-none`} />
//               {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
//             </div>
//           </div>
//         );

//       case "loanReq":
//         return (
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 mb-1">
//               <IndianRupee size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">Loan Requirement</h3>
//             </div>

//             <div>
//               <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.amount ? "border-red-400" : "border-gray-200"}`}>
//                 <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
//                 <input type="number" placeholder="Loan amount required" value={loan.amount}
//                   onChange={(e) => { setLoan({ ...loan, amount: e.target.value }); setErrors({ ...errors, amount: "" }); }}
//                   className="flex-1 px-3 py-3 text-sm focus:outline-none" />
//               </div>
//               {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
//             </div>

//             <div>
//               <select value={loan.purpose}
//                 onChange={(e) => { setLoan({ ...loan, purpose: e.target.value }); setErrors({ ...errors, purpose: "" }); }}
//                 className={inputCls(errors.purpose)}>
//                 <option value="">Purpose of Loan</option>
//                 {loanPurposes.map((t) => <option key={t}>{t}</option>)}
//               </select>
//               {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
//             </div>

//             <div>
//               <select value={loan.tenure}
//                 onChange={(e) => { setLoan({ ...loan, tenure: e.target.value }); setErrors({ ...errors, tenure: "" }); }}
//                 className={inputCls(errors.tenure)}>
//                 <option value="">Preferred Tenure</option>
//                 {tenureOptions.map((t) => <option key={t}>{t}</option>)}
//               </select>
//               {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
//             </div>
//           </div>
//         );

//       case "cibilIntro":
//         return (
//           <div className="text-center py-2">
//             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
//               <CreditCard size={28} className="text-green-600" />
//             </div>
//             <h3 className="font-bold text-gray-800 mb-2">Check Your CIBIL Score</h3>
//             <p className="text-sm text-gray-500 mb-5 leading-relaxed">
//               We'll run a quick, secure check on your credit profile to match you with lenders likely to approve you.
//               This is a soft-pull and won't affect your credit score.
//             </p>
//             <div className="bg-gray-50 rounded-xl p-3 text-left text-xs text-gray-500 flex items-start gap-2">
//               <Shield size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
//               100% secure & RBI-compliant. Your data is never shared without consent.
//             </div>
//           </div>
//         );

//       case "mobileOtp":
//         return (
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <Smartphone size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">Verify Your Number</h3>
//             </div>
//             <p className="text-sm text-gray-500 mb-5">Enter the mobile number linked with your PAN to fetch your CIBIL score</p>
//             <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.cibilMobile ? "border-red-400" : "border-green-400"}`}>
//               <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50 flex-shrink-0">
//                 <span className="text-base">🇮🇳</span><span className="text-sm text-gray-600 font-medium">+91</span>
//               </div>
//               <input type="tel" maxLength={10} placeholder="Mobile number linked with PAN" value={cibilMobile}
//                 onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setCibilMobile(v); setErrors({ ...errors, cibilMobile: "" }); }}
//                 className="flex-1 px-3 py-3.5 text-sm focus:outline-none bg-transparent" />
//             </div>
//             {errors.cibilMobile && <p className="text-red-500 text-xs mt-1">{errors.cibilMobile}</p>}
//           </div>
//         );

//       case "otp":
//         return (
//           <div>
//             <div className="flex items-center gap-2 mb-1">
//               <KeyRound size={18} className="text-green-600" />
//               <h3 className="font-bold text-gray-800">Enter OTP</h3>
//             </div>
//             <p className="text-sm text-gray-500 mb-5">We've sent a 6-digit OTP to +91 {cibilMobile}</p>
//             <div className="flex justify-between gap-2 mb-3">
//               {otp.map((d, i) => (
//                 <input key={i} ref={(el) => (otpRefs.current[i] = el)} type="text" inputMode="numeric" maxLength={1} value={d}
//                   onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
//                   className={`w-10 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
//                     errors.otp ? "border-red-400" : "border-gray-200"
//                   }`} />
//               ))}
//             </div>
//             {errors.otp && <p className="text-red-500 text-xs mb-2">{errors.otp}</p>}
//             <div className="flex justify-center">
//               {otpTimer > 0 ? (
//                 <p className="text-xs text-gray-400">Resend OTP in {otpTimer}s</p>
//               ) : (
//                 <button onClick={() => setOtpTimer(30)} className="text-xs text-green-600 font-semibold flex items-center gap-1">
//                   <RefreshCw size={12} /> Resend OTP
//                 </button>
//               )}
//             </div>
//           </div>
//         );

//       case "result":
//         return (
//           <div>
//             {cibilScore < 720 ? (
//               <div className="text-center py-6">
//                 <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <XCircle size={30} className="text-red-500" />
//                 </div>
//                 <h3 className="font-bold text-gray-800 mb-1">CIBIL Score: {cibilScore}</h3>
//                 <p className="text-sm text-gray-500 mb-6 leading-relaxed">
//                   We're unable to move forward with your profile at this time. A higher credit score will improve your chances of approval.
//                 </p>
//                 <button onClick={resetAll} className="text-green-600 text-sm font-semibold hover:underline">Start a New Application</button>
//               </div>
//             ) : (
//               <div>
//                 <div className="text-center mb-5">
//                   <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2">
//                     <CheckCircle2 size={26} className="text-green-600" />
//                   </div>
//                   <h3 className="font-bold text-gray-800">Your CIBIL Score: <span className="text-green-600">{cibilScore}</span></h3>
//                   <p className="text-xs text-gray-400 mt-0.5">You're eligible for offers from these lenders</p>
//                 </div>
//                 <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
//                   {lenders.map((l) => (
//                     <div key={l.name} className="border border-gray-200 rounded-xl p-3.5 flex items-center gap-3">
//                       <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${l.color}`}>{l.emoji}</div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm font-bold text-gray-800">{l.name}</p>
//                         <p className="text-xs text-gray-400">{l.rate} &middot; {l.amount}</p>
//                       </div>
//                       <button onClick={() => setAppliedLenders({ ...appliedLenders, [l.name]: true })}
//                         disabled={appliedLenders[l.name]}
//                         className={`text-xs font-semibold px-3.5 py-2 rounded-lg flex-shrink-0 transition ${
//                           appliedLenders[l.name] ? "bg-green-100 text-green-700" : "bg-green-600 text-white hover:bg-green-700"
//                         }`}>
//                         {appliedLenders[l.name] ? "Applied ✓" : "Apply"}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <button onClick={resetAll} className="w-full text-center text-xs text-gray-400 mt-4 hover:underline">Start a New Application</button>
//               </div>
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />

//       {/* ══════════════════════════════════════
//           HERO — left: content  |  right: form
//       ══════════════════════════════════════ */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
//         <div className="flex flex-col lg:flex-row gap-10 items-start">

//           {/* ── LEFT ── */}
//           <div className="flex-1">
//             <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
//               Business Loan
//             </h1>
//             <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">
//               Power your business growth with flexible loans from 25+ trusted banks and NBFCs.
//               One simple application.{" "}
//               <span className="text-green-600 font-semibold">Multiple offers.</span>{" "}
//               Maximum growth.
//             </p>

//             {/* Feature list */}
//             <div className="space-y-5 mb-10">
//               {features.map(({ icon: Icon, title, desc }) => (
//                 <div key={title} className="flex items-start gap-4">
//                   <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
//                     <Icon size={20} className="text-green-600" />
//                   </div>
//                   <div>
//                     <p className="font-bold text-gray-800 text-sm">{title}</p>
//                     <p className="text-gray-400 text-sm">{desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* App image */}
//             <div className="hidden md:block">
//               <img
//                 src="/images/direct-credit-app.png"
//                 alt="Direct Paisa App"
//                 className="w-72 mx-auto drop-shadow-2xl"
//               />
//             </div>

//             {/* Stats bar */}
//             <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4 mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
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
//                     {[1,2,3,4].map(i => <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />)}
//                     <Star size={9} className="fill-yellow-200 text-yellow-400" />
//                   </div>
//                   <p className="text-xs font-bold text-gray-800">4.6/5</p>
//                   <p className="text-xs text-gray-400">18.2K Reviews</p>
//                 </div>
//               </div>
//               {[
//                 { value: "6.2L+",       sub: "Happy Customers",   color: "text-green-600" },
//                 { value: "50+",         sub: "Banking Partners",  color: "text-green-600" },
//                 { value: "₹10,000 Cr+", sub: "Loans Disbursed",   color: "text-green-600" },
//               ].map(s => (
//                 <div key={s.value} className="text-center">
//                   <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
//                   <p className="text-xs text-gray-400">{s.sub}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── RIGHT — Sticky form / application flow ── */}
//           <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24">
//             <div className="border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

//               {/* Cashback banner — only on the entry screen, to give the flow more room */}
//               {step === "hero" && (
//                 <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
//                   <span className="text-2xl">💼</span>
//                   <div>
//                     <p className="text-sm font-semibold text-gray-800">
//                       Get Cashback of <span className="text-green-600 font-bold">₹2,000*</span> on Loan Disbursal
//                     </p>
//                     <p className="text-xs text-gray-400">Valid till 30th June '26 &nbsp;·&nbsp; *T&C Apply</p>
//                   </div>
//                 </div>
//               )}

//               <div className="px-6 py-6">
//                 {step === "hero" && (
//                   <>
//                     {/* Divider label */}
//                     <div className="flex items-center gap-2 mb-4 justify-center">
//                       <div className="h-px flex-1 bg-gray-200" />
//                       <span className="text-xs text-gray-500 font-medium whitespace-nowrap px-1">
//                         ✦ Instant Business Loan ✦
//                       </span>
//                       <div className="h-px flex-1 bg-gray-200" />
//                     </div>

//                     {/* Headline */}
//                     <p className="text-center text-xl font-extrabold text-gray-900 mb-5 leading-snug">
//                       Get up to{" "}
//                       <span className="text-green-600">₹50 Lakhs</span>{" "}
//                       starting at{" "}
//                       <span className="text-green-600 underline decoration-green-400 decoration-2 underline-offset-2">
//                         10.5%
//                       </span>
//                     </p>

//                     {/* Name */}
//                     <div className="mb-4">
//                       <input
//                         type="text"
//                         placeholder="Full Name (as on your PAN)"
//                         value={form.name}
//                         onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
//                         className={`w-full border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition
//                           ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
//                       />
//                       {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                     </div>

//                     {/* Mobile */}
//                     <div className="mb-1 relative">
//                       <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-green-600 font-medium z-10">
//                         Mobile Number
//                       </span>
//                       <div className={`flex items-center border-2 rounded-xl overflow-hidden transition
//                         ${errors.mobile ? "border-red-400" : "border-green-400"}`}>
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
//                             className="px-3 text-green-600 text-xs font-semibold whitespace-nowrap"
//                           >
//                             ✏ Edit
//                           </button>
//                         )}
//                       </div>
//                       {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
//                     </div>

//                     {/* Submit — kicks off the application flow below */}
//                     <button
//                       onClick={handleHeroSubmit}
//                       className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-5"
//                     >
//                       Check Eligibility <ArrowRight size={17} />
//                     </button>

//                     {/* Terms */}
//                     <div className="flex items-start gap-2 mt-3">
//                       <input
//                         type="checkbox" id="terms" checked={agreed}
//                         onChange={e => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
//                         className="mt-0.5 accent-green-600 w-4 h-4 flex-shrink-0 cursor-pointer"
//                       />
//                       <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
//                         By submitting this form, you have read and agree to the{" "}
//                         <span className="text-green-500">Terms of Use</span> &{" "}
//                         <span className="text-green-500">Privacy Policy</span>
//                       </label>
//                     </div>
//                     {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}
//                   </>
//                 )}

//                 {/* ── New multi-step application flow ── */}
//                 {step !== "hero" && (
//                   <>
//                     {renderProgress()}
//                     {renderStepContent()}

//                     {step !== "result" && (
//                       <div className="flex gap-3 mt-6">
//                         <button onClick={goBack}
//                           className="flex items-center justify-center gap-1.5 border border-gray-200 text-gray-600 font-semibold py-3.5 px-4 rounded-xl text-sm hover:bg-gray-50 transition-colors">
//                           <ArrowLeft size={15} /> Back
//                         </button>
//                         <button onClick={goNext}
//                           className="flex-1 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
//                           {continueLabel} <ArrowRight size={15} />
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── WHAT IS ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Business Loan?</h2>
//         <div className="text-gray-600 text-sm leading-relaxed space-y-4">
//           <p>A Business Loan provides working capital and growth funds to MSMEs, startups, and established businesses without pledging major assets. Whether you need to expand, buy equipment, or manage cash flow — Direct Paisa connects you with the right lender in minutes.</p>
//           <p>It is ideal for:</p>
//           <ul className="space-y-2 pl-1">
//             {useCases.map(u => (
//               <li key={u} className="flex items-start gap-3">
//                 <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />{u}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </section>

//       {/* ── TABLE ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
//         <h2 className="text-2xl font-bold text-gray-800 mb-5">Key Business Loan Features at Direct Paisa</h2>
//         <div className="rounded-2xl border border-gray-200 overflow-hidden">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="bg-green-50">
//                 <th className="text-left px-6 py-3 font-semibold text-green-700 w-1/2">Feature</th>
//                 <th className="text-left px-6 py-3 font-semibold text-green-700">Details</th>
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

//       {/* ── BOTTOM CTA ── */}
//       <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
//         <div className="bg-green-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h2 className="text-xl font-bold mb-1">Ready to grow your business?</h2>
//             <p className="text-green-100 text-sm">Apply in 5 minutes — approval in 24–48 hours</p>
//           </div>
//           <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="bg-white text-green-700 font-semibold px-7 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
//             Apply Now <ArrowRight size={16} />
//           </button>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  CheckCircle, CheckCircle2, ArrowRight, ArrowLeft, X, Zap, Clock, Search, Shield, Star,
  Building2, User, CreditCard, TrendingUp, Smartphone, KeyRound, RefreshCw, XCircle,
  FileText, IndianRupee,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   EXISTING LANDING-PAGE CONTENT (unchanged)
════════════════════════════════════════════════════════════ */
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

/* ════════════════════════════════════════════════════════════
   APPLICATION-FLOW STATIC DATA
   (GST → Turnover → Personal → Business → Loan → CIBIL → OTP → Score → Lenders)
   Flow now opens as a centered popup/modal on top of the page,
   matching the reference screenshots.
════════════════════════════════════════════════════════════ */
const turnoverOptions = [
  { id: "gt1cr",    label: "₹1 Crore & above" },
  { id: "50l-1cr",  label: "₹50 Lakhs – ₹1 Crore" },
  { id: "below50l", label: "Below ₹50 Lakhs" },
  { id: "below25l", label: "Below ₹25 Lakhs" },
  { id: "custom",   label: "Enter Turnover Amount" },
];

const businessTypes = ["Sole Proprietorship", "Partnership Firm", "Private Limited", "LLP", "Public Limited", "Other"];
const industries     = ["Manufacturing", "Trading / Retail", "Services", "IT & Software", "Construction", "Healthcare", "Education", "Food & Hospitality", "Other"];
const vintageOptions = ["Less than 1 year", "1 – 2 years", "2 – 5 years", "5+ years"];
const loanPurposes   = ["Working Capital", "Business Expansion", "Machinery / Equipment Purchase", "Inventory Purchase", "Debt Consolidation", "Other"];
const tenureOptions  = ["12 months", "24 months", "36 months", "48 months", "60 months"];

const lenders = [
  { name: "HDFC Bank",     rate: "10.50% – 14.00% p.a.", amount: "Up to ₹40 Lakh", color: "bg-blue-50 text-blue-700",     emoji: "🏦" },
  { name: "ICICI Bank",    rate: "11.00% – 15.50% p.a.", amount: "Up to ₹35 Lakh", color: "bg-orange-50 text-orange-700", emoji: "🏛️" },
  { name: "Axis Bank",     rate: "10.75% – 16.00% p.a.", amount: "Up to ₹50 Lakh", color: "bg-pink-50 text-pink-700",     emoji: "🏦" },
  { name: "Bajaj Finserv", rate: "13.00% – 22.00% p.a.", amount: "Up to ₹30 Lakh", color: "bg-indigo-50 text-indigo-700", emoji: "💼" },
  { name: "Tata Capital",  rate: "12.50% – 18.00% p.a.", amount: "Up to ₹45 Lakh", color: "bg-teal-50 text-teal-700",     emoji: "🏢" },
];

// Title + subtitle shown inside the modal header for each step.
// "scoreReveal" and "lenders" intentionally have no entry — those steps use their own centered layout.
const STEP_TITLES = {
  gst: "GST Registration",
  turnover: "Annual Turnover",
  personal: "Personal Details",
  business: "Business Details",
  loanReq: "Loan Details",
  cibilIntro: "Check Your CIBIL Score",
  mobileOtp: "Verify Your Number",
  otp: "Enter OTP",
};
const STEP_SUBTITLES = {
  gst: "Let us know if your business is GST registered",
  turnover: "Select your business's annual turnover range",
  personal: "Tell us a bit about yourself",
  business: "Tell us about your business",
  loanReq: "Tell us how much you need and for how long",
  cibilIntro: "A quick, secure check — this won't affect your credit score",
  mobileOtp: "Enter the mobile number linked with your PAN",
};

// "Continue" button label changes on a few steps
const CONTINUE_LABELS = {
  cibilIntro: "Check CIBIL Score",
  mobileOtp: "Send OTP",
  otp: "Verify & View CIBIL",
};

// Turnover step is only part of the flow when the user has GST
function getStepSequence(gst) {
  return gst === "yes"
    ? ["gst", "turnover", "personal", "business", "loanReq", "cibilIntro", "mobileOtp", "otp", "scoreReveal", "lenders"]
    : ["gst", "personal", "business", "loanReq", "cibilIntro", "mobileOtp", "otp", "scoreReveal", "lenders"];
}

export default function BusinessLoan() {
  /* ── Hero form (existing) ── */
  const [form, setForm] = useState({ name: "", mobile: "" });
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState({});

  /* ── Flow controller — "hero" means the popup is closed ── */
  const [step, setStep] = useState("hero");

  /* ── Application-flow state ── */
  const [gst, setGst] = useState("");
  const [turnover, setTurnover] = useState("");
  const [turnoverAmount, setTurnoverAmount] = useState("");

  const [personal, setPersonal] = useState({ fullName: "", gender: "", dob: "", pan: "", email: "", maritalStatus: "" });
  const [business, setBusiness] = useState({ businessName: "", businessType: "", industry: "", vintage: "", address: "" });
  const [loan, setLoan] = useState({ amount: "", purpose: "", tenure: "" });

  const [cibilMobile, setCibilMobile] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpTimer, setOtpTimer] = useState(0);
  const [cibilScore, setCibilScore] = useState(null);
  const [appliedLenders, setAppliedLenders] = useState({});
  const otpRefs = useRef([]);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  const sequence  = getStepSequence(gst || "no");
  const stepIndex = sequence.indexOf(step);

  const calcAge = (dobStr) => {
    if (!dobStr) return 0;
    const diffMs = Date.now() - new Date(dobStr).getTime();
    return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  };

  /* ── Validation per step ── */
  const validateHero = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Enter your full name as on PAN";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
    if (!agreed) e.agreed = "Please accept terms to continue";
    return e;
  };
  const validateGst = () => (gst ? {} : { gst: "Please select an option" });
  const validateTurnover = () => {
    const e = {};
    if (!turnover) e.turnover = "Please select your annual turnover";
    if (turnover === "custom" && (!turnoverAmount || Number(turnoverAmount) <= 0)) e.turnoverAmount = "Enter a valid turnover amount";
    return e;
  };
  const validatePersonal = () => {
    const e = {}; const p = personal;
    if (!p.fullName.trim() || p.fullName.trim().length < 3) e.fullName = "Enter full name as on PAN";
    if (!p.gender) e.gender = "Select gender";
    if (!p.dob) e.dob = "Select date of birth";
    else if (calcAge(p.dob) < 21) e.dob = "Applicant must be at least 21 years old";
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(p.pan.toUpperCase())) e.pan = "Enter a valid PAN number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) e.email = "Enter a valid email address";
    if (!p.maritalStatus) e.maritalStatus = "Select marital status";
    return e;
  };
  const validateBusiness = () => {
    const e = {}; const b = business;
    if (!b.businessName.trim()) e.businessName = "Enter business name";
    if (!b.businessType) e.businessType = "Select business type";
    if (!b.industry) e.industry = "Select your industry";
    if (!b.vintage) e.vintage = "Select business vintage";
    if (!b.address.trim() || b.address.trim().length < 6) e.address = "Enter complete business address";
    return e;
  };
  const validateLoan = () => {
    const e = {}; const l = loan;
    if (!l.amount || Number(l.amount) < 50000) e.amount = "Enter loan amount (min ₹50,000)";
    if (!l.purpose) e.purpose = "Select loan purpose";
    if (!l.tenure) e.tenure = "Select preferred tenure";
    return e;
  };
  const validateCibilMobile = () => (/^[6-9]\d{9}$/.test(cibilMobile) ? {} : { cibilMobile: "Enter valid 10-digit mobile number linked with PAN" });
  const validateOtp = () => (otp.join("").length === 6 ? {} : { otp: "Enter the complete 6-digit OTP" });

  /* ── Navigation ── */
  const goNext = () => {
    let e = {};
    if (step === "gst") e = validateGst();
    else if (step === "turnover") e = validateTurnover();
    else if (step === "personal") e = validatePersonal();
    else if (step === "business") e = validateBusiness();
    else if (step === "loanReq") e = validateLoan();
    else if (step === "mobileOtp") e = validateCibilMobile();
    else if (step === "otp") e = validateOtp();

    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});

    if (step === "otp") {
      // Mock CIBIL pull — frontend-only demo. Wire this up to the real bureau API later.
      const score = Math.floor(Math.random() * 251) + 600; // 600 – 850
      setCibilScore(score);
      setStep("scoreReveal");
      return;
    }
    if (step === "mobileOtp") {
      setOtp(Array(6).fill(""));
      setOtpTimer(30);
      setStep("otp");
      return;
    }

    const seq = getStepSequence(gst);
    const idx = seq.indexOf(step);
    setStep(seq[idx + 1]);
  };

  const goBack = () => {
    setErrors({});
    const seq = getStepSequence(gst);
    const idx = seq.indexOf(step);
    setStep(idx <= 0 ? "hero" : seq[idx - 1]);
  };

  const handleHeroSubmit = () => {
    const e = validateHero();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setPersonal((p) => ({ ...p, fullName: form.name }));
    setCibilMobile(form.mobile);
    setStep("gst");
  };

  const closeModal = () => { setErrors({}); setStep("hero"); };

  const resetAll = () => {
    setForm({ name: "", mobile: "" });
    setGst(""); setTurnover(""); setTurnoverAmount("");
    setPersonal({ fullName: "", gender: "", dob: "", pan: "", email: "", maritalStatus: "" });
    setBusiness({ businessName: "", businessType: "", industry: "", vintage: "", address: "" });
    setLoan({ amount: "", purpose: "", tenure: "" });
    setCibilMobile(""); setOtp(Array(6).fill("")); setCibilScore(null);
    setAppliedLenders({}); setErrors({}); setStep("hero");
  };

  const handleOtpChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[idx] = val; setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };
  const handleOtpKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) otpRefs.current[idx - 1]?.focus();
  };

  const inputCls = (err) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
      err ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    }`;

  /* ── Step body content (header/title is rendered by the modal shell) ── */
  const renderStepContent = () => {
    switch (step) {
      case "gst":
        return (
          <div>
            <div className="grid grid-cols-2 gap-3">
              {["yes", "no"].map((opt) => (
                <button key={opt} onClick={() => { setGst(opt); setErrors({}); }}
                  className={`py-3.5 rounded-xl border-2 text-sm font-semibold capitalize transition ${
                    gst === opt ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}>
                  {opt}
                </button>
              ))}
            </div>
            {errors.gst && <p className="text-red-500 text-xs mt-2">{errors.gst}</p>}
          </div>
        );

      case "turnover":
        return (
          <div>
            <div className="space-y-2.5">
              {turnoverOptions.map((o) => (
                <label key={o.id} className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition ${
                  turnover === o.id ? "border-green-600 bg-green-50" : "border-gray-200"
                }`}>
                  <input type="radio" name="turnover" className="accent-green-600 w-4 h-4"
                    checked={turnover === o.id} onChange={() => { setTurnover(o.id); setErrors({}); }} />
                  <span className="text-sm font-medium text-gray-700">{o.label}</span>
                </label>
              ))}
            </div>
            {turnover === "custom" && (
              <div className="mt-3">
                <div className="flex items-center border-2 border-green-400 rounded-xl overflow-hidden">
                  <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3">₹</span>
                  <input type="number" placeholder="Enter turnover amount" value={turnoverAmount}
                    onChange={(e) => { setTurnoverAmount(e.target.value); setErrors({ ...errors, turnoverAmount: "" }); }}
                    className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                </div>
                {errors.turnoverAmount && <p className="text-red-500 text-xs mt-1">{errors.turnoverAmount}</p>}
              </div>
            )}
            {errors.turnover && <p className="text-red-500 text-xs mt-2">{errors.turnover}</p>}
          </div>
        );

      case "personal":
        return (
          <div className="space-y-4">
            <div>
              <input type="text" placeholder="Full Name (as on PAN)" value={personal.fullName}
                onChange={(e) => { setPersonal({ ...personal, fullName: e.target.value }); setErrors({ ...errors, fullName: "" }); }}
                className={inputCls(errors.fullName)} />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Gender</p>
              <div className="grid grid-cols-3 gap-2">
                {["Male", "Female", "Other"].map((g) => (
                  <button key={g} onClick={() => { setPersonal({ ...personal, gender: g }); setErrors({ ...errors, gender: "" }); }}
                    className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition ${
                      personal.gender === g ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600"
                    }`}>
                    {g}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block font-medium">Date of Birth</label>
              <input type="date" value={personal.dob}
                onChange={(e) => { setPersonal({ ...personal, dob: e.target.value }); setErrors({ ...errors, dob: "" }); }}
                className={inputCls(errors.dob)} />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>

            <div>
              <input type="text" placeholder="PAN Number (e.g. ABCDE1234F)" maxLength={10} value={personal.pan}
                onChange={(e) => { setPersonal({ ...personal, pan: e.target.value.toUpperCase() }); setErrors({ ...errors, pan: "" }); }}
                className={`${inputCls(errors.pan)} uppercase`} />
              {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
            </div>

            <div>
              <input type="email" placeholder="Email Address" value={personal.email}
                onChange={(e) => { setPersonal({ ...personal, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                className={inputCls(errors.email)} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
              <select value={personal.maritalStatus}
                onChange={(e) => { setPersonal({ ...personal, maritalStatus: e.target.value }); setErrors({ ...errors, maritalStatus: "" }); }}
                className={inputCls(errors.maritalStatus)}>
                <option value="">Marital Status</option>
                <option>Single</option><option>Married</option><option>Other</option>
              </select>
              {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
            </div>
          </div>
        );

      case "business":
        return (
          <div className="space-y-4">
            <div>
              <input type="text" placeholder="Business / Firm Name" value={business.businessName}
                onChange={(e) => { setBusiness({ ...business, businessName: e.target.value }); setErrors({ ...errors, businessName: "" }); }}
                className={inputCls(errors.businessName)} />
              {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
            </div>

            <div>
              <select value={business.businessType}
                onChange={(e) => { setBusiness({ ...business, businessType: e.target.value }); setErrors({ ...errors, businessType: "" }); }}
                className={inputCls(errors.businessType)}>
                <option value="">Business Type</option>
                {businessTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
            </div>

            <div>
              <select value={business.industry}
                onChange={(e) => { setBusiness({ ...business, industry: e.target.value }); setErrors({ ...errors, industry: "" }); }}
                className={inputCls(errors.industry)}>
                <option value="">Nature of Business / Industry</option>
                {industries.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.industry && <p className="text-red-500 text-xs mt-1">{errors.industry}</p>}
            </div>

            <div>
              <select value={business.vintage}
                onChange={(e) => { setBusiness({ ...business, vintage: e.target.value }); setErrors({ ...errors, vintage: "" }); }}
                className={inputCls(errors.vintage)}>
                <option value="">Business Vintage</option>
                {vintageOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.vintage && <p className="text-red-500 text-xs mt-1">{errors.vintage}</p>}
            </div>

            <div>
              <textarea rows={2} placeholder="Business Address" value={business.address}
                onChange={(e) => { setBusiness({ ...business, address: e.target.value }); setErrors({ ...errors, address: "" }); }}
                className={`${inputCls(errors.address)} resize-none`} />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>
          </div>
        );

      case "loanReq":
        return (
          <div className="space-y-4">
            <div>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.amount ? "border-red-400" : "border-gray-200"}`}>
                <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                <input type="number" placeholder="Loan amount required" value={loan.amount}
                  onChange={(e) => { setLoan({ ...loan, amount: e.target.value }); setErrors({ ...errors, amount: "" }); }}
                  className="flex-1 px-3 py-3 text-sm focus:outline-none" />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>

            <div>
              <select value={loan.purpose}
                onChange={(e) => { setLoan({ ...loan, purpose: e.target.value }); setErrors({ ...errors, purpose: "" }); }}
                className={inputCls(errors.purpose)}>
                <option value="">Purpose of Loan</option>
                {loanPurposes.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
            </div>

            <div>
              <select value={loan.tenure}
                onChange={(e) => { setLoan({ ...loan, tenure: e.target.value }); setErrors({ ...errors, tenure: "" }); }}
                className={inputCls(errors.tenure)}>
                <option value="">Preferred Tenure</option>
                {tenureOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
            </div>
          </div>
        );

      case "cibilIntro":
        return (
          <div className="text-center py-1">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
              <CreditCard size={28} className="text-green-600" />
            </div>
            <div className="bg-gray-50 rounded-xl p-3 text-left text-xs text-gray-500 flex items-start gap-2">
              <Shield size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
              100% secure & RBI-compliant. Your data is never shared without consent.
            </div>
          </div>
        );

      case "mobileOtp":
        return (
          <div>
            <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.cibilMobile ? "border-red-400" : "border-green-400"}`}>
              <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                <span className="text-base">🇮🇳</span><span className="text-sm text-gray-600 font-medium">+91</span>
              </div>
              <input type="tel" maxLength={10} placeholder="Mobile number linked with PAN" value={cibilMobile}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setCibilMobile(v); setErrors({ ...errors, cibilMobile: "" }); }}
                className="flex-1 px-3 py-3.5 text-sm focus:outline-none bg-transparent" />
            </div>
            {errors.cibilMobile && <p className="text-red-500 text-xs mt-1">{errors.cibilMobile}</p>}
          </div>
        );

      case "otp":
        return (
          <div>
            <p className="text-sm text-gray-500 mb-5">We've sent a 6-digit OTP to +91 {cibilMobile}</p>
            <div className="flex justify-between gap-2 mb-3">
              {otp.map((d, i) => (
                <input key={i} ref={(el) => (otpRefs.current[i] = el)} type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={`w-10 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    errors.otp ? "border-red-400" : "border-gray-200"
                  }`} />
              ))}
            </div>
            {errors.otp && <p className="text-red-500 text-xs mb-2">{errors.otp}</p>}
            <div className="flex justify-center">
              {otpTimer > 0 ? (
                <p className="text-xs text-gray-400">Resend OTP in {otpTimer}s</p>
              ) : (
                <button onClick={() => setOtpTimer(30)} className="text-xs text-green-600 font-semibold flex items-center gap-1">
                  <RefreshCw size={12} /> Resend OTP
                </button>
              )}
            </div>
          </div>
        );

      case "scoreReveal": {
        const good = cibilScore >= 720;
        return (
          <div className="text-center py-2">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${good ? "bg-green-50" : "bg-red-50"}`}>
              {good ? <CheckCircle2 size={32} className="text-green-600" /> : <XCircle size={32} className="text-red-500" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your CIBIL Score is {cibilScore}</h3>
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
              good ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
            }`}>
              {good ? (cibilScore >= 750 ? "Excellent" : "Good") : "Needs Improvement"}
            </span>
            <p className="text-sm text-gray-500 leading-relaxed">
              {good
                ? "Great news! You're eligible for a business loan. Let's show you your offers."
                : "We're unable to move forward with your profile at this time. A higher credit score will improve your chances of approval."}
            </p>
          </div>
        );
      }

      case "lenders":
        return (
          <div>
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Your Best Offers</h3>
              <p className="text-xs text-gray-400 mt-0.5">Pick a lender to apply</p>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {lenders.map((l) => (
                <div key={l.name} className="border border-gray-200 rounded-xl p-3.5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${l.color}`}>{l.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800">{l.name}</p>
                    <p className="text-xs text-gray-400">{l.rate} &middot; {l.amount}</p>
                  </div>
                  <button onClick={() => setAppliedLenders({ ...appliedLenders, [l.name]: true })}
                    disabled={appliedLenders[l.name]}
                    className={`text-xs font-semibold px-3.5 py-2 rounded-lg flex-shrink-0 transition ${
                      appliedLenders[l.name] ? "bg-green-100 text-green-700" : "bg-green-600 text-white hover:bg-green-700"
                    }`}>
                    {appliedLenders[l.name] ? "Applied ✓" : "Apply"}
                  </button>
                </div>
              ))}
            </div>
            <button onClick={resetAll} className="w-full text-center text-xs text-gray-400 mt-4 hover:underline">Start a New Application</button>
          </div>
        );

      default:
        return null;
    }
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

          {/* ── RIGHT — Sticky form (stays visible, dims behind the popup) ── */}
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

                {/* Submit — opens the application flow as a popup */}
                <button
                  onClick={handleHeroSubmit}
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

      {/* ══════════════════════════════════════
          APPLICATION-FLOW POPUP
          Opens centered on top of the page once "Check Eligibility" is clicked.
      ══════════════════════════════════════ */}
      {step !== "hero" && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-7 sm:p-8">

            {/* Progress bar + close */}
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-1.5 flex-1 mr-4">
                {sequence.map((s, i) => (
                  <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i < stepIndex ? "bg-green-600" : i === stepIndex ? "bg-green-300" : "bg-gray-200"
                  }`} />
                ))}
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                <X size={20} />
              </button>
            </div>

            {/* Title + subtitle */}
            {STEP_TITLES[step] && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">{STEP_TITLES[step]}</h2>
                {STEP_SUBTITLES[step] && <p className="text-sm text-gray-500">{STEP_SUBTITLES[step]}</p>}
              </div>
            )}

            {/* Step body */}
            {renderStepContent()}

            {/* Footer actions */}
            {step !== "lenders" && (
              <div className="mt-7">
                {step === "scoreReveal" ? (
                  cibilScore >= 720 ? (
                    <button onClick={goNext}
                      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                      Continue <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button onClick={resetAll}
                      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                      Start a New Application <ArrowRight size={16} />
                    </button>
                  )
                ) : (
                  <>
                    <button onClick={goNext}
                      className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                      {CONTINUE_LABELS[step] || "Continue"} <ArrowRight size={16} />
                    </button>
                    <button onClick={goBack}
                      className="w-full text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1.5 hover:text-gray-700 transition-colors">
                      <ArrowLeft size={14} /> Back
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}