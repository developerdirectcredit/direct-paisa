

// src/pages/loans/StartupLoan.jsx
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  CheckCircle, CheckCircle2, ArrowRight, ArrowLeft, X, Zap, Clock, Search, Shield, Star,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ════════════════════════════════════════════════════════════
   LANDING-PAGE CONTENT
════════════════════════════════════════════════════════════ */
const features = [
  { icon: Zap,    title: "Compare 25+ Lenders Instantly",  desc: "Evaluate interest rates, tenure & more in one place." },
  { icon: Clock,  title: "Quick Funds in 24-48 Hours",     desc: "Minimal documentation with super-fast approval." },
  { icon: Search, title: "Check Eligibility for Free",     desc: "No impact on credit score. 100% secure." },
  { icon: Shield, title: "Safe, Secure & Compliant",       desc: "RBI-compliant partners. Your data is always protected." },
];

const tableData = [
  {feature:"Loan Type",details:"Startup Loan"},
  { feature: "Loan Amount", details: "₹20,00,000" },
  {feature:"Purpose",details:"Higher Education in India / Abroad"},
  { feature: "Annual Interest Rate (Indicative)", details: "9.50% p.a." },
  { feature: "Loan Tenure", details: "120 months (10 Years)" },
  {feature:"Moratarium Period",details:"Course Period + 12 Months (if applicable)"},
  {feature:"Monthly Installment (EMI)",details:"₹25,900 (approx.)"},
  { feature: "Total Amount Payable", details: "₹31,08,000 (approx.) " },
  {feature:"Total Interest Cost",details:"₹11,08,000 (approx.) "},
  { feature: "Processing Fee", details: "0% - 1% of loan amount " },
  //{ feature: "Insurance Fee", details: "1% - 2% of loan amount" },
  { feature: "Collateral Requirement", details: "Depending upon loan amount and lender policy " },
];

const useCases = [
  "Product development & R&D",
  "Hiring your founding team",
  "Marketing, branding & customer acquisition",
  "Buying equipment, tools or software",
  "Managing working capital & runway",
  "Office setup or co-working space",
];

/* ════════════════════════════════════════════════════════════
   APPLICATION-FLOW STATIC DATA
   Flow: GST → (Turnover) → Personal → Business → Loan Details → Thank You
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

const STEP_TITLES = {
  gst: "GST Registration",
  turnover: "Annual Turnover",
  personal: "Personal Details",
  business: "Business Details",
  loanReq: "Loan Details",
};
const STEP_SUBTITLES = {
  gst: "Let us know if your business is GST registered",
  turnover: "Select your business's annual turnover range",
  personal: "Tell us a bit about yourself",
  business: "Tell us about your business",
  loanReq: "Tell us how much you need and for how long",
};

// Turnover step is only part of the flow when the user has GST
function getStepSequence(gst) {
  return gst === "yes"
    ? ["gst", "turnover", "personal", "business", "loanReq"]
    : ["gst", "personal", "business", "loanReq"];
}

export default function StartupLoan() {
  /* ── Hero form ── */
  const [form, setForm] = useState({ name: "", mobile: "" });
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState({});

  /* ── Flow controller — "hero" = popup closed, "done" = thank you ── */
  const [step, setStep] = useState("hero");

  /* ── Application-flow state ── */
  const [gst, setGst] = useState("");
  const [turnover, setTurnover] = useState("");
  const [turnoverAmount, setTurnoverAmount] = useState("");

  const [personal, setPersonal] = useState({ fullName: "", gender: "", dob: "", pan: "", email: "", maritalStatus: "" });
  const [business, setBusiness] = useState({ businessName: "", businessType: "", industry: "", vintage: "", address: "" });
  const [loan, setLoan] = useState({ amount: "", purpose: "", tenure: "" });

  const [refNo, setRefNo] = useState("");

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

  /* ── Navigation ── */
  const goNext = () => {
    let e = {};
    if (step === "gst") e = validateGst();
    else if (step === "turnover") e = validateTurnover();
    else if (step === "personal") e = validatePersonal();
    else if (step === "business") e = validateBusiness();
    else if (step === "loanReq") e = validateLoan();

    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});

    // Loan Details is the LAST step → submit + show Thank You + toast
    if (step === "loanReq") {
      const ref = String(Math.floor(1000000000 + Math.random() * 9000000000));
      setRefNo(ref);
      setStep("done");
      toast.success("Application submitted successfully!", { autoClose: 4000 });
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
    setStep("gst");
  };

  const closeModal = () => { setErrors({}); setStep("hero"); };

  const resetAll = () => {
    setForm({ name: "", mobile: "" });
    setGst(""); setTurnover(""); setTurnoverAmount("");
    setPersonal({ fullName: "", gender: "", dob: "", pan: "", email: "", maritalStatus: "" });
    setBusiness({ businessName: "", businessType: "", industry: "", vintage: "", address: "" });
    setLoan({ amount: "", purpose: "", tenure: "" });
    setRefNo(""); setErrors({}); setStep("hero");
  };

  const inputCls = (err) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
      err ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    }`;

  /* ── Step body content ── */
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
                onChange={(e) => { setPersonal({ ...personal, fullName: e.target.value.replace(/[^a-zA-Z\s]/g, "") }); setErrors({ ...errors, fullName: "" }); }}
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

      default:
        return null;
    }
  };

  /* ════════════════════════════════════════════════════════════
     THANK YOU PAGE (Education Loan style) — submit ke baad
  ════════════════════════════════════════════════════════════ */
  if (step === "done") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <ToastContainer position="top-center" />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-2">
            We have received your <b>Startup Loan</b> application
            {business.businessName ? <> for <b>{business.businessName}</b></> : null}.
          </p>
          <div className="bg-gray-100 rounded-lg px-5 py-4 inline-block my-4">
            <span className="text-gray-600">Reference No. : </span>
            <span className="font-bold text-gray-800">{refNo}</span>
          </div>
          <p className="text-gray-600 mb-3">
            Our loan expert will get in touch within 24 hours to take your
            application forward.
          </p>
          <p className="text-gray-600 mb-8">
            We thank you for choosing <b>Direct Credit</b> for your financial
            needs and would be keen to serve you in future as well.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => window.location.assign("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Back to Home
            </button>
            <button
              onClick={resetAll}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition"
            >
              Submit Another Application
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ToastContainer position="top-center" />

      {/* ══════════════════════════════════════
          HERO — left: content  |  right: form
      ══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* ── LEFT ── */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Startup Loan
            </h1>
            <p className="text-gray-500 text-base mb-8 max-w-lg leading-relaxed">
              Fuel your new venture with flexible funding from 25+ trusted banks and NBFCs.
              One simple application.{" "}
              <span className="text-green-600 font-semibold">Multiple offers.</span>{" "}
              Maximum runway.
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
                alt="Direct Credit App"
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
                <span className="text-2xl">🚀</span>
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
                    ✦ Instant Startup Loan ✦
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* Headline */}
                <p className="text-center text-xl font-extrabold text-gray-900 mb-5 leading-snug">
                  Get up to{" "}
                  <span className="text-green-600">₹2 Crore</span>{" "}
                  starting at{" "}
                  <span className="text-green-600 underline decoration-green-400 decoration-2 underline-offset-2">
                    11%
                  </span>
                </p>

                {/* Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full Name (as on your PAN)"
                    value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value.replace(/[^a-zA-Z\s]/g, "") }); setErrors({ ...errors, name: "" }); }}
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Startup Loan?</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-4">
          <p>A Startup Loan provides early-stage capital to new ventures and founders without pledging major assets. Whether you are building your product, hiring your first team, or extending your runway — Direct Credit connects you with the right lender in minutes.</p>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-5"> Representative Example of Loan Cost </h2>
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
            <h2 className="text-xl font-bold mb-1">Ready to launch your startup?</h2>
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
          APPLICATION-FLOW POPUP (until Loan Details)
      ══════════════════════════════════════ */}
      {step !== "hero" && step !== "done" && (
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
            <div className="mt-7">
              <button onClick={goNext}
                className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                {step === "loanReq" ? "Submit Application" : "Continue"} <ArrowRight size={16} />
              </button>
              <button onClick={goBack}
                className="w-full text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1.5 hover:text-gray-700 transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}