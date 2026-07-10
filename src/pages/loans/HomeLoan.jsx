

// ─────────────────────────────────────────────────────────────────
//  Home Loan page
//  Route suggestion:  /loans/home-loan
//  File location:     src/pages/loans/HomeLoan.jsx
//
//  Flow:
//   1) Hero — Name + Mobile
//   2) If NOT logged in  -> Mobile OTP verify step
//      If logged in      -> skip straight to the application flow
//   3) Loan Purpose (property type + New Purchase / Balance Transfer / Top-up)
//   4) Mode-specific steps (per loan type)
//   5) Property Details -> Applicant Profile -> Banking -> Offers
//   6) Confirmation + Next Steps guidance
// ─────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/useAuth";
import {
  CheckCircle, CheckCircle2, ArrowRight, ArrowLeft, X, Home, Clock, Search, Shield, Star,
  Building2, CreditCard, RefreshCw, IndianRupee, Landmark, FileCheck2, ClipboardList,
  UserCheck, PhoneCall,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════
   LANDING-PAGE CONTENT
════════════════════════════════════════════════════════════ */
const features = [
  { icon: Search, title: "Compare 20+ Bank & NBFC Offers", desc: "Best ROI, tenure & processing fee — all in one place." },
  { icon: Clock, title: "Disbursal in Just 2 Days", desc: "Fast property evaluation & credit approval." },
  { icon: CheckCircle, title: "Check Eligibility for Free", desc: "No impact on credit score. 100% secure." },
  { icon: Shield, title: "Safe, Secure & Compliant", desc: "RBI-compliant partners. Your data is always protected." },
];

/* Poster highlight strips — text version of the reference banner */
const posterHighlights = [
  "Best ROI",
  "Quick Approval",
  "Flexible EMI",
  "30 Year Tenure",
  "0% Processing Fee*",
];

const tableData = [
  {feature:"Loan Type",details:"Home Loan"},
  { feature: "Loan Amount", details: "₹50,00,000" },
  {feature:"Purpose",details:"Purchase / Construction / Renovation of Residential Property /Balance Transfer of Existing Housing Loan"},
  { feature: "Annual Interest Rate (Indicative)", details: "7.50% p.a." },
  { feature: "Loan Tenure", details: "120 months (10 Years) / 360 months (30 Years)" },
  {feature:"Monthly Installment (EMI)",details:"₹59,351/ ₹40,289 (approx)"},
  { feature: "Total Amount Payable", details: "₹71,22,106 / ₹96,67,118 (approx) " },
  {feature:"Total Interest Cost",details:"₹21,22,106 / 46,67,118 (approx.)"},
  { feature: "Processing Fee", details: "0.25% – 1% of loan amount " },
  { feature: "Insurance Fee", details: "1% - 2% of loan amount" },
  { feature: "Collateral Requirement", details: "Mortgage of residential property" },
];

const useCases = [
  "Buying a new flat, villa or plot",
  "Constructing a house on owned land",
  "Transferring an existing home loan for a lower rate",
  "Topping up an existing home loan for renovation",
  "Purchasing commercial or resale property",
  "Consolidating debt with a top-up loan",
];

/* ════════════════════════════════════════════════════════════
   APPLICATION-FLOW STATIC DATA
════════════════════════════════════════════════════════════ */
const propertyTypesStep1 = ["Flat", "Villa", "Plot", "Plot + Construction", "Independent Floor"];
const loanTypes = ["New Purchase", "Balance Transfer", "Top-up", "Renovation"];

const loanAmountRanges = [
  { id: "u20l", label: "Up to ₹20 Lakhs" },
  { id: "20-60l", label: "₹20 – 60 Lakhs" },
  { id: "60l-1cr", label: "₹60 Lakhs – 1 Cr" },
  { id: "1-3cr", label: "₹1 Cr – 3 Cr" },
  { id: "3-5cr", label: "₹3 Cr – 5 Cr" },
  { id: "5crplus", label: "₹5 Cr+" },
];

const btAmountRanges = [
  { id: "u20l", label: "Up to ₹20 Lakhs" },
  { id: "20-50l", label: "₹20 – 50 Lakhs" },
  { id: "50l-1cr", label: "₹50 Lakhs – 1 Cr" },
  { id: "1-5cr", label: "₹1 Cr – 5 Cr" },
  { id: "5-15cr", label: "₹5 Cr – 15 Cr" },
  { id: "15crplus", label: "₹15 Cr+" },
];

const propertyCategoryOptions = ["Residential", "Commercial", "Industrial", "Agricultural", "Gram Panchayat", "Lal Dora", "Khasra/Khtauni", "Other"];
const constructionStatusOptions = ["Ready-to-move Property", "Under Construction", "Home Construction", "Plot + Construction", "Resale Purchase"];

const employmentTypes = ["Salaried", "Self-Employed – Business", "Self-Employed – Professional"];
const salariedIncomeRanges = ["Below ₹3 Lakhs", "₹3–6 Lakhs", "₹6–12 Lakhs", "₹12–18 Lakhs", "Over ₹18 Lakhs"];
const turnoverRanges = ["Below ₹25 Lakhs", "₹25–50 Lakhs", "₹50–75 Lakhs", "₹75 Lakhs–1 Cr", "₹1 Cr+"];

const popularBanks = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra", "Bajaj Housing Finance", "Other"];

const topupPurposes = ["Home Renovation", "Education", "Medical Expenses", "Debt Consolidation", "Business Expansion", "Other"];

const homeLoanOffers = [
  { name: "HDFC Bank", rate: "8.35% – 9.10% p.a.", amount: "Up to ₹5 Cr", color: "bg-blue-50 text-blue-700", emoji: "🏦" },
  { name: "SBI", rate: "8.40% – 9.15% p.a.", amount: "Up to ₹10 Cr", color: "bg-teal-50 text-teal-700", emoji: "🏛️" },
  { name: "ICICI Bank", rate: "8.50% – 9.25% p.a.", amount: "Up to ₹5 Cr", color: "bg-blue-50 text-blue-700", emoji: "🏦" },
  { name: "Bajaj Housing Finance", rate: "8.60% – 10.50% p.a.", amount: "Up to ₹15 Cr", color: "bg-indigo-50 text-indigo-700", emoji: "🏠" },
];

const btOffers = [
  { name: "SBI", rate: "8.40% p.a.", amount: "Refinance up to ₹5 Cr", color: "bg-teal-50 text-teal-700", emoji: "🏛️" },
  { name: "HDFC Bank", rate: "8.45% p.a.", amount: "Refinance up to ₹5 Cr", color: "bg-blue-50 text-blue-700", emoji: "🏦" },
  { name: "Axis Bank", rate: "8.55% p.a.", amount: "Refinance up to ₹5 Cr", color: "bg-pink-50 text-pink-700", emoji: "🏦" },
];

const topupOffersList = [
  { name: "HDFC Bank", rate: "9.10% p.a.", amount: "Top-up up to ₹50 Lakh", color: "bg-blue-50 text-blue-700", emoji: "🏦" },
  { name: "Bajaj Housing Finance", rate: "9.75% p.a.", amount: "Top-up up to ₹75 Lakh", color: "bg-indigo-50 text-indigo-700", emoji: "🏠" },
];

// Title + subtitle for each step's modal header
const STEP_TITLES = {
  mobileOtp: "Verify Your Number",
  otp: "Enter OTP",
  purpose: "Loan Purpose",
  loanDetails: "Loan Details",
  transferOrTopup: "Transfer Details",
  propertyDetails: "Property Details",
  applicantProfile: "Applicant Profile",
  banking: "Banking Relationship",
};
const STEP_SUBTITLES = {
  mobileOtp: "Enter your mobile number to continue",
  purpose: "Tell us what kind of home loan you need",
  loanDetails: "Tell us about the loan amount or your existing loan",
  transferOrTopup: "Tell us how much you'd like to transfer or top-up",
  propertyDetails: "Tell us about the property",
  applicantProfile: "Tell us a bit about yourself",
  banking: "Select your primary bank account",
};

const CONTINUE_LABELS = {
  mobileOtp: "Send OTP",
  otp: "Verify OTP",
};

function getStepSequence(loanType, isLoggedIn) {
  const authSteps = isLoggedIn ? [] : ["mobileOtp", "otp"];
  const modeSteps =
    loanType === "Balance Transfer" || loanType === "Top-up"
      ? ["loanDetails", "transferOrTopup"]
      : ["loanDetails"]; // New Purchase / Renovation

  return [...authSteps, "purpose", ...modeSteps, "propertyDetails", "applicantProfile", "banking", "offers"];
}

export default function HomeLoan() {
  const { isLoggedIn, user } = useAuth?.() || { isLoggedIn: false, user: null };

  /* ── Hero form ── */
  const [form, setForm] = useState({ name: user?.fullName || "", mobile: user?.mobile || "" });
  const [agreed, setAgreed] = useState(true);
  const [errors, setErrors] = useState({});

  /* ── Flow controller — "hero" means popup closed ── */
  const [step, setStep] = useState("hero");

  /* ── OTP ── */
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [otpTimer, setOtpTimer] = useState(0);
  const otpRefs = useRef([]);

  /* ── Application-flow state ── */
  const [loanType, setLoanType] = useState("New Purchase");
  const [propertyPurposeType, setPropertyPurposeType] = useState("");

  const [loanAmountRange, setLoanAmountRange] = useState("");

  const [btExisting, setBtExisting] = useState({ outstanding: "", emi: "", tenure: "", lender: "" });
  const [btTransfer, setBtTransfer] = useState({ amountRange: "", tenureYears: "", wantTopup: "no", topupAmount: "" });

  const [topupExisting, setTopupExisting] = useState({ accountNo: "", outstanding: "", emi: "", tenure: "", lender: "" });
  const [topupReq, setTopupReq] = useState({ amount: "", purpose: "" });

  const [property, setProperty] = useState({ pincode: "", category: "", downPayment: "", constructionStatus: "" });

  const [applicant, setApplicant] = useState({
    employmentType: "Salaried", incomeRange: "", turnoverRange: "",
    companyName: "", workExp: "", officePincode: "", activeEmi: "",
  });

  const [banking, setBanking] = useState({ primaryBank: "", currentLenderAccountNo: "" });

  const [appliedOffer, setAppliedOffer] = useState(null);
  const [referenceNo, setReferenceNo] = useState("");

  useEffect(() => {
    if (otpTimer <= 0) return;
    const t = setTimeout(() => setOtpTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [otpTimer]);

  const sequence = getStepSequence(loanType, isLoggedIn);
  const stepIndex = sequence.indexOf(step);

  const offersForMode = loanType === "Balance Transfer" ? btOffers : loanType === "Top-up" ? topupOffersList : homeLoanOffers;

  /* ── Validation per step ── */
  const validateHero = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter valid 10-digit mobile number";
    if (!agreed) e.agreed = "Please accept terms to continue";
    return e;
  };
  const validateOtp = () => (otp.join("").length === 6 ? {} : { otp: "Enter the complete 6-digit OTP" });

  const validatePurpose = () => {
    const e = {};
    if (loanType === "New Purchase" || loanType === "Renovation") {
      if (!propertyPurposeType) e.propertyPurposeType = "Select a property type";
    }
    return e;
  };

  const validateLoanDetails = () => {
    const e = {};
    if (loanType === "New Purchase" || loanType === "Renovation") {
      if (!loanAmountRange) e.loanAmountRange = "Select desired loan amount";
    } else if (loanType === "Balance Transfer") {
      if (!btExisting.outstanding) e.outstanding = "Enter current outstanding amount";
      if (!btExisting.emi) e.emi = "Enter current EMI amount";
      if (!btExisting.tenure) e.tenure = "Enter remaining tenure";
      if (!btExisting.lender) e.lender = "Select current lender";
    } else if (loanType === "Top-up") {
      if (!topupExisting.accountNo) e.accountNo = "Enter current loan account number";
      if (!topupExisting.outstanding) e.outstanding = "Enter current outstanding amount";
      if (!topupExisting.lender) e.lender = "Select current lender";
    }
    return e;
  };

  const validateTransferOrTopup = () => {
    const e = {};
    if (loanType === "Balance Transfer") {
      if (!btTransfer.amountRange) e.amountRange = "Select desired loan amount range";
      if (!btTransfer.tenureYears) e.tenureYears = "Enter desired tenure";
    } else if (loanType === "Top-up") {
      if (!topupReq.amount || Number(topupReq.amount) <= 0) e.amount = "Enter desired top-up amount";
      if (!topupReq.purpose) e.purpose = "Select purpose of top-up";
    }
    return e;
  };

  const validateProperty = () => {
    const e = {};
    if (!/^\d{6}$/.test(property.pincode)) e.pincode = "Enter a valid 6-digit pincode";
    if (!property.category) e.category = "Select property type";
    if (loanType === "New Purchase" || loanType === "Renovation") {
      if (!property.downPayment) e.downPayment = "Select down payment status";
      if (!property.constructionStatus) e.constructionStatus = "Select construction status";
    }
    return e;
  };

  const validateApplicant = () => {
    const e = {}; const a = applicant;
    if (!a.employmentType) e.employmentType = "Select employment type";
    if (a.employmentType === "Salaried") {
      if (!a.incomeRange) e.incomeRange = "Select annual income range";
      if (!a.companyName.trim()) e.companyName = "Enter company name";
      if (!a.workExp.trim()) e.workExp = "Enter total work experience";
      if (!/^\d{6}$/.test(a.officePincode)) e.officePincode = "Enter a valid 6-digit office pincode";
    } else {
      if (!a.turnoverRange) e.turnoverRange = "Select annual turnover range";
    }
    if (!a.activeEmi.trim()) e.activeEmi = "Enter active EMI total (0 if none)";
    return e;
  };

  const validateBanking = () => {
    const e = {};
    if (!banking.primaryBank) e.primaryBank = "Select your primary bank account";
    if (loanType === "Balance Transfer" && !banking.currentLenderAccountNo.trim()) {
      e.currentLenderAccountNo = "Enter current lender's loan account number";
    }
    return e;
  };

  /* ── Navigation ── */
  const goNext = () => {
    let e = {};
    if (step === "otp") e = validateOtp();
    else if (step === "purpose") e = validatePurpose();
    else if (step === "loanDetails") e = validateLoanDetails();
    else if (step === "transferOrTopup") e = validateTransferOrTopup();
    else if (step === "propertyDetails") e = validateProperty();
    else if (step === "applicantProfile") e = validateApplicant();
    else if (step === "banking") e = validateBanking();

    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});

    if (step === "mobileOtp") {
      setOtp(Array(6).fill(""));
      setOtpTimer(30);
      setStep("otp");
      return;
    }

    const idx = sequence.indexOf(step);
    setStep(sequence[idx + 1]);
  };

  const goBack = () => {
    setErrors({});
    const idx = sequence.indexOf(step);
    setStep(idx <= 0 ? "hero" : sequence[idx - 1]);
  };

  const handleHeroSubmit = () => {
    const e = validateHero();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    const seq = getStepSequence(loanType, isLoggedIn);
    setStep(seq[0]); // "mobileOtp" if not logged in, else "purpose"
  };

  const closeModal = () => { setErrors({}); setStep("hero"); };

  const resetAll = () => {
    setForm({ name: user?.fullName || "", mobile: user?.mobile || "" });
    setLoanType("New Purchase"); setPropertyPurposeType(""); setLoanAmountRange("");
    setBtExisting({ outstanding: "", emi: "", tenure: "", lender: "" });
    setBtTransfer({ amountRange: "", tenureYears: "", wantTopup: "no", topupAmount: "" });
    setTopupExisting({ accountNo: "", outstanding: "", emi: "", tenure: "", lender: "" });
    setTopupReq({ amount: "", purpose: "" });
    setProperty({ pincode: "", category: "", downPayment: "", constructionStatus: "" });
    setApplicant({ employmentType: "Salaried", incomeRange: "", turnoverRange: "", companyName: "", workExp: "", officePincode: "", activeEmi: "" });
    setBanking({ primaryBank: "", currentLenderAccountNo: "" });
    setAppliedOffer(null); setReferenceNo(""); setErrors({}); setStep("hero");
  };

  const handleApplyOffer = (offer) => {
    setAppliedOffer(offer);
    setReferenceNo("DC" + Math.floor(100000 + Math.random() * 900000));
    setStep("confirmation");
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
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${err ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
    }`;

  const confirmationCopy = () => {
    if (loanType === "Balance Transfer") {
      return {
        heading: "Home Loan Balance Transfer Application Received",
        steps: [
          { icon: ClipboardList, text: "Document Collection — sanction letter, repayment track record & property papers" },
          { icon: Building2, text: "Property Valuation & Legal Verification — re-check valuation and title" },
          { icon: FileCheck2, text: "Final Approval — lender approves BT + Top-up (if any)" },
          { icon: IndianRupee, text: "Loan Closure & Disbursal — new lender pays off old loan; balance to you" },
          { icon: UserCheck, text: "Auto Payment Setup — new EMI mandate set up" },
        ],
      };
    }
    if (loanType === "Top-up") {
      return {
        heading: "Top-up Loan Application Received",
        steps: [
          { icon: ClipboardList, text: "Document Collection — updated income & property docs (if required)" },
          { icon: Building2, text: "Property Revaluation — only if top-up amount is high" },
          { icon: FileCheck2, text: "Credit Assessment — income & FOIR check for incremental eligibility" },
          { icon: IndianRupee, text: "Sanction & Disbursal — top-up amount credited to your account" },
          { icon: UserCheck, text: "Auto Payment Setup — EMI mandate updated for revised EMI" },
        ],
      };
    }
    return {
      heading: "Home Loan Application Received",
      steps: [
        { icon: PhoneCall, text: "Sales Executive Visit — collects your financial & property documents" },
        { icon: Building2, text: "Property Evaluation — certified partner conducts a valuation visit" },
        { icon: FileCheck2, text: "Final Credit Approval — document + valuation assessment by lender" },
        { icon: UserCheck, text: "Auto Payment Setup — EMI auto-debit mandate for smooth repayment" },
      ],
    };
  };

  /* ── Step body content ── */
  const renderStepContent = () => {
    switch (step) {
      case "mobileOtp":
        return (
          <div>
            <div className="flex items-center border-2 border-blue-400 rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                <span className="text-base">🇮🇳</span><span className="text-sm text-gray-600 font-medium">+91</span>
              </div>
              <input type="tel" maxLength={10} value={form.mobile} disabled
                className="flex-1 px-3 py-3.5 text-sm bg-gray-50 text-gray-600" />
            </div>
            <p className="text-xs text-gray-400 mt-2">We'll send a 6-digit OTP to verify this number.</p>
          </div>
        );

      case "otp":
        return (
          <div>
            <p className="text-sm text-gray-500 mb-5">We've sent a 6-digit OTP to +91 {form.mobile}</p>
            <div className="flex justify-between gap-2 mb-3">
              {otp.map((d, i) => (
                <input key={i} ref={(el) => (otpRefs.current[i] = el)} type="text" inputMode="numeric" maxLength={1} value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)} onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className={`w-10 h-12 text-center text-lg font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.otp ? "border-red-400" : "border-gray-200"
                    }`} />
              ))}
            </div>
            {errors.otp && <p className="text-red-500 text-xs mb-2">{errors.otp}</p>}
            <div className="flex justify-center">
              {otpTimer > 0 ? (
                <p className="text-xs text-gray-400">Resend OTP in {otpTimer}s</p>
              ) : (
                <button onClick={() => setOtpTimer(30)} className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                  <RefreshCw size={12} /> Resend OTP
                </button>
              )}
            </div>
          </div>
        );

      case "purpose":
        return (
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Type of Loan</p>
              <div className="grid grid-cols-2 gap-2">
                {loanTypes.map((t) => (
                  <button key={t} onClick={() => { setLoanType(t); setErrors({}); }}
                    className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition ${loanType === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                      }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {(loanType === "New Purchase" || loanType === "Renovation") && (
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Property Type</p>
                <div className="grid grid-cols-2 gap-2">
                  {propertyTypesStep1.map((t) => (
                    <button key={t} onClick={() => { setPropertyPurposeType(t); setErrors({}); }}
                      className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition ${propertyPurposeType === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                        }`}>
                      {t}
                    </button>
                  ))}
                </div>
                {errors.propertyPurposeType && <p className="text-red-500 text-xs mt-2">{errors.propertyPurposeType}</p>}
              </div>
            )}
          </div>
        );

      case "loanDetails":
        if (loanType === "New Purchase" || loanType === "Renovation") {
          return (
            <div>
              <div className="space-y-2.5">
                {loanAmountRanges.map((o) => (
                  <label key={o.id} className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition ${loanAmountRange === o.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                    }`}>
                    <input type="radio" name="loanAmountRange" className="accent-blue-600 w-4 h-4"
                      checked={loanAmountRange === o.id} onChange={() => { setLoanAmountRange(o.id); setErrors({}); }} />
                    <span className="text-sm font-medium text-gray-700">{o.label}</span>
                  </label>
                ))}
              </div>
              {errors.loanAmountRange && <p className="text-red-500 text-xs mt-2">{errors.loanAmountRange}</p>}
            </div>
          );
        }
        if (loanType === "Balance Transfer") {
          return (
            <div className="space-y-4">
              <div>
                <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.outstanding ? "border-red-400" : "border-gray-200"}`}>
                  <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                  <input type="number" placeholder="Current outstanding loan amount" value={btExisting.outstanding}
                    onChange={(e) => { setBtExisting({ ...btExisting, outstanding: e.target.value }); setErrors({ ...errors, outstanding: "" }); }}
                    className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                </div>
                {errors.outstanding && <p className="text-red-500 text-xs mt-1">{errors.outstanding}</p>}
              </div>
              <div>
                <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.emi ? "border-red-400" : "border-gray-200"}`}>
                  <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                  <input type="number" placeholder="Current EMI amount" value={btExisting.emi}
                    onChange={(e) => { setBtExisting({ ...btExisting, emi: e.target.value }); setErrors({ ...errors, emi: "" }); }}
                    className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                </div>
                {errors.emi && <p className="text-red-500 text-xs mt-1">{errors.emi}</p>}
              </div>
              <div>
                <input type="text" placeholder="Remaining tenure (e.g. 12 years)" value={btExisting.tenure}
                  onChange={(e) => { setBtExisting({ ...btExisting, tenure: e.target.value }); setErrors({ ...errors, tenure: "" }); }}
                  className={inputCls(errors.tenure)} />
                {errors.tenure && <p className="text-red-500 text-xs mt-1">{errors.tenure}</p>}
              </div>
              <div>
                <select value={btExisting.lender}
                  onChange={(e) => { setBtExisting({ ...btExisting, lender: e.target.value }); setErrors({ ...errors, lender: "" }); }}
                  className={inputCls(errors.lender)}>
                  <option value="">Current Lender</option>
                  {popularBanks.map((b) => <option key={b}>{b}</option>)}
                </select>
                {errors.lender && <p className="text-red-500 text-xs mt-1">{errors.lender}</p>}
              </div>
            </div>
          );
        }
        // Top-up
        return (
          <div className="space-y-4">
            <div>
              <input type="text" placeholder="Current loan account number" value={topupExisting.accountNo}
                onChange={(e) => { setTopupExisting({ ...topupExisting, accountNo: e.target.value }); setErrors({ ...errors, accountNo: "" }); }}
                className={inputCls(errors.accountNo)} />
              {errors.accountNo && <p className="text-red-500 text-xs mt-1">{errors.accountNo}</p>}
            </div>
            <div>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.outstanding ? "border-red-400" : "border-gray-200"}`}>
                <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                <input type="number" placeholder="Current outstanding loan amount" value={topupExisting.outstanding}
                  onChange={(e) => { setTopupExisting({ ...topupExisting, outstanding: e.target.value }); setErrors({ ...errors, outstanding: "" }); }}
                  className="flex-1 px-3 py-3 text-sm focus:outline-none" />
              </div>
              {errors.outstanding && <p className="text-red-500 text-xs mt-1">{errors.outstanding}</p>}
            </div>
            <div>
              <input type="text" placeholder="Current EMI & tenure" value={topupExisting.emi}
                onChange={(e) => setTopupExisting({ ...topupExisting, emi: e.target.value })}
                className={inputCls()} />
            </div>
            <div>
              <select value={topupExisting.lender}
                onChange={(e) => { setTopupExisting({ ...topupExisting, lender: e.target.value }); setErrors({ ...errors, lender: "" }); }}
                className={inputCls(errors.lender)}>
                <option value="">Current Lender</option>
                {popularBanks.map((b) => <option key={b}>{b}</option>)}
              </select>
              {errors.lender && <p className="text-red-500 text-xs mt-1">{errors.lender}</p>}
            </div>
          </div>
        );

      case "transferOrTopup":
        if (loanType === "Balance Transfer") {
          return (
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Desired Loan Amount Range</p>
                <div className="space-y-2.5">
                  {btAmountRanges.map((o) => (
                    <label key={o.id} className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition ${btTransfer.amountRange === o.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                      }`}>
                      <input type="radio" name="btAmountRange" className="accent-blue-600 w-4 h-4"
                        checked={btTransfer.amountRange === o.id}
                        onChange={() => { setBtTransfer({ ...btTransfer, amountRange: o.id }); setErrors({ ...errors, amountRange: "" }); }} />
                      <span className="text-sm font-medium text-gray-700">{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.amountRange && <p className="text-red-500 text-xs mt-2">{errors.amountRange}</p>}
              </div>

              <div>
                <input type="number" placeholder="Desired tenure (in years)" value={btTransfer.tenureYears}
                  onChange={(e) => { setBtTransfer({ ...btTransfer, tenureYears: e.target.value }); setErrors({ ...errors, tenureYears: "" }); }}
                  className={inputCls(errors.tenureYears)} />
                {errors.tenureYears && <p className="text-red-500 text-xs mt-1">{errors.tenureYears}</p>}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Want a Top-up along with BT?</p>
                <div className="grid grid-cols-2 gap-3">
                  {["yes", "no"].map((opt) => (
                    <button key={opt} onClick={() => setBtTransfer({ ...btTransfer, wantTopup: opt })}
                      className={`py-2.5 rounded-xl border-2 text-sm font-semibold capitalize transition ${btTransfer.wantTopup === opt ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                        }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {btTransfer.wantTopup === "yes" && (
                <div className={`flex items-center border-2 rounded-xl overflow-hidden border-gray-200`}>
                  <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                  <input type="number" placeholder="Required top-up amount" value={btTransfer.topupAmount}
                    onChange={(e) => setBtTransfer({ ...btTransfer, topupAmount: e.target.value })}
                    className="flex-1 px-3 py-3 text-sm focus:outline-none" />
                </div>
              )}
            </div>
          );
        }
        // Top-up requirement
        return (
          <div className="space-y-4">
            <div>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.amount ? "border-red-400" : "border-gray-200"}`}>
                <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                <input type="number" placeholder="Desired top-up amount" value={topupReq.amount}
                  onChange={(e) => { setTopupReq({ ...topupReq, amount: e.target.value }); setErrors({ ...errors, amount: "" }); }}
                  className="flex-1 px-3 py-3 text-sm focus:outline-none" />
              </div>
              {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
            </div>
            <div>
              <select value={topupReq.purpose}
                onChange={(e) => { setTopupReq({ ...topupReq, purpose: e.target.value }); setErrors({ ...errors, purpose: "" }); }}
                className={inputCls(errors.purpose)}>
                <option value="">Purpose of Top-up</option>
                {topupPurposes.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
            </div>
          </div>
        );

      case "propertyDetails":
        return (
          <div className="space-y-4">
            <div>
              <input type="text" maxLength={6} placeholder="Property Pincode" value={property.pincode}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setProperty({ ...property, pincode: v }); setErrors({ ...errors, pincode: "" }); }}
                className={inputCls(errors.pincode)} />
              {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>

            <div>
              <select value={property.category}
                onChange={(e) => { setProperty({ ...property, category: e.target.value }); setErrors({ ...errors, category: "" }); }}
                className={inputCls(errors.category)}>
                <option value="">Property Type</option>
                {propertyCategoryOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>

            {(loanType === "New Purchase" || loanType === "Renovation") && (
              <>
                <div>
                  <p className="text-xs text-gray-500 mb-2 font-medium">Down Payment Status</p>
                  <div className="grid grid-cols-2 gap-3">
                    {["Yes (completed)", "No (pending)"].map((opt) => (
                      <button key={opt} onClick={() => { setProperty({ ...property, downPayment: opt }); setErrors({ ...errors, downPayment: "" }); }}
                        className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition ${property.downPayment === opt ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                          }`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {errors.downPayment && <p className="text-red-500 text-xs mt-1">{errors.downPayment}</p>}
                </div>

                <div>
                  <select value={property.constructionStatus}
                    onChange={(e) => { setProperty({ ...property, constructionStatus: e.target.value }); setErrors({ ...errors, constructionStatus: "" }); }}
                    className={inputCls(errors.constructionStatus)}>
                    <option value="">Construction Status</option>
                    {constructionStatusOptions.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  {errors.constructionStatus && <p className="text-red-500 text-xs mt-1">{errors.constructionStatus}</p>}
                </div>
              </>
            )}
          </div>
        );

      case "applicantProfile":
        return (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-2 font-medium">Employment Type</p>
              <div className="grid grid-cols-1 gap-2">
                {employmentTypes.map((t) => (
                  <button key={t} onClick={() => { setApplicant({ ...applicant, employmentType: t }); setErrors({}); }}
                    className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition ${applicant.employmentType === t ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600"
                      }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {applicant.employmentType === "Salaried" ? (
              <>
                <div>
                  <select value={applicant.incomeRange}
                    onChange={(e) => { setApplicant({ ...applicant, incomeRange: e.target.value }); setErrors({ ...errors, incomeRange: "" }); }}
                    className={inputCls(errors.incomeRange)}>
                    <option value="">Annual Income</option>
                    {salariedIncomeRanges.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  {errors.incomeRange && <p className="text-red-500 text-xs mt-1">{errors.incomeRange}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Company Name" value={applicant.companyName}
                    onChange={(e) => { setApplicant({ ...applicant, companyName: e.target.value }); setErrors({ ...errors, companyName: "" }); }}
                    className={inputCls(errors.companyName)} />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <input type="text" placeholder="Total Work Experience (e.g. 5 years)" value={applicant.workExp}
                    onChange={(e) => { setApplicant({ ...applicant, workExp: e.target.value }); setErrors({ ...errors, workExp: "" }); }}
                    className={inputCls(errors.workExp)} />
                  {errors.workExp && <p className="text-red-500 text-xs mt-1">{errors.workExp}</p>}
                </div>
                <div>
                  <input type="text" maxLength={6} placeholder="Office Pincode" value={applicant.officePincode}
                    onChange={(e) => { const v = e.target.value.replace(/\D/g, ""); setApplicant({ ...applicant, officePincode: v }); setErrors({ ...errors, officePincode: "" }); }}
                    className={inputCls(errors.officePincode)} />
                  {errors.officePincode && <p className="text-red-500 text-xs mt-1">{errors.officePincode}</p>}
                </div>
              </>
            ) : (
              <div>
                <select value={applicant.turnoverRange}
                  onChange={(e) => { setApplicant({ ...applicant, turnoverRange: e.target.value }); setErrors({ ...errors, turnoverRange: "" }); }}
                  className={inputCls(errors.turnoverRange)}>
                  <option value="">Annual / Net Turnover</option>
                  {turnoverRanges.map((t) => <option key={t}>{t}</option>)}
                </select>
                {errors.turnoverRange && <p className="text-red-500 text-xs mt-1">{errors.turnoverRange}</p>}
              </div>
            )}

            <div>
              <div className={`flex items-center border-2 rounded-xl overflow-hidden ${errors.activeEmi ? "border-red-400" : "border-gray-200"}`}>
                <span className="px-3 text-gray-500 text-sm bg-gray-50 border-r border-gray-200 py-3.5">₹</span>
                <input type="number" placeholder="Total active EMIs currently paid (0 if none)" value={applicant.activeEmi}
                  onChange={(e) => { setApplicant({ ...applicant, activeEmi: e.target.value }); setErrors({ ...errors, activeEmi: "" }); }}
                  className="flex-1 px-3 py-3 text-sm focus:outline-none" />
              </div>
              {errors.activeEmi && <p className="text-red-500 text-xs mt-1">{errors.activeEmi}</p>}
            </div>
          </div>
        );

      case "banking":
        return (
          <div className="space-y-4">
            <div>
              <select value={banking.primaryBank}
                onChange={(e) => { setBanking({ ...banking, primaryBank: e.target.value }); setErrors({ ...errors, primaryBank: "" }); }}
                className={inputCls(errors.primaryBank)}>
                <option value="">Select Primary Bank Account</option>
                {popularBanks.map((b) => <option key={b}>{b}</option>)}
              </select>
              {errors.primaryBank && <p className="text-red-500 text-xs mt-1">{errors.primaryBank}</p>}
            </div>

            {loanType === "Balance Transfer" && (
              <div>
                <input type="text" placeholder="Current lender's loan account number" value={banking.currentLenderAccountNo}
                  onChange={(e) => { setBanking({ ...banking, currentLenderAccountNo: e.target.value }); setErrors({ ...errors, currentLenderAccountNo: "" }); }}
                  className={inputCls(errors.currentLenderAccountNo)} />
                {errors.currentLenderAccountNo && <p className="text-red-500 text-xs mt-1">{errors.currentLenderAccountNo}</p>}
              </div>
            )}
          </div>
        );

      case "offers":
        return (
          <div>
            <div className="text-center mb-5">
              <h3 className="text-lg font-bold text-gray-900">Your Eligible Offers</h3>
              <p className="text-xs text-gray-400 mt-0.5">Pick a lender to apply</p>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {offersForMode.map((l) => (
                <div key={l.name} className="border border-gray-200 rounded-xl p-3.5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg ${l.color}`}>{l.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800">{l.name}</p>
                    <p className="text-xs text-gray-400">{l.rate} &middot; {l.amount}</p>
                  </div>
                  <button onClick={() => handleApplyOffer(l)}
                    className="text-xs font-semibold px-3.5 py-2 rounded-lg flex-shrink-0 transition bg-blue-600 text-white hover:bg-blue-700">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case "confirmation": {
        const copy = confirmationCopy();
        return (
          <div className="text-center py-1">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{copy.heading}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-1">
              Thank you — we've received your application with partner bank{appliedOffer ? ` ${appliedOffer.name}` : ""}.
            </p>
            <p className="text-sm font-semibold text-gray-800 mb-4">Reference No: {referenceNo}</p>
            <p className="text-xs text-gray-400 mb-6">
              Our loan expert will get in touch within 24 hours. For queries call 90 1003 1003 or write to support@directcredit.in
            </p>

            <div className="text-left bg-gray-50 rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-1">Next Steps</p>
              {copy.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <s.icon size={15} className="text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-600 pt-1.5">{s.text}</p>
                </div>
              ))}
            </div>

            <button onClick={resetAll} className="w-full text-center text-xs text-gray-400 mt-5 hover:underline">
              Start a New Application
            </button>
          </div>
        );
      }

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
            {/* Hero banner image — bigger now: max-w-md -> max-w-xl, h-56/64 -> h-72/80 */}
            <div className="mb-6 rounded-2xl overflow-hidden shadow-lg max-w-xl">
              <img
                src="/images/home-loan-hero.jpg"
                alt="Home Loan - Direct Credit"
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight mb-1">
              <span className="text-[#e8112d]">HOME</span>{" "}
              <span className="text-[#001f54]">LOAN</span>
            </h1>
            <p className="text-lg md:text-xl font-extrabold text-[#e8112d] mb-5">
              0% Processing Fee*
            </p>

            {/* Poster highlight strips */}
            <div className="space-y-2 mb-8 max-w-md">
              {posterHighlights.map((text) => (
                <div
                  key={text}
                  className="rounded-md bg-[#001f54] px-4 py-2 text-center text-sm font-semibold text-white"
                >
                  {text}
                </div>
              ))}
            </div>

            {/* Feature list */}
            <div className="space-y-5 mb-10">
              {features.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#001f54] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-white" />
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
                  <Home size={18} className="text-[#001f54]" />
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />)}
                    <Star size={9} className="fill-yellow-200 text-yellow-400" />
                  </div>
                  <p className="text-xs font-bold text-gray-800">4.6/5</p>
                  <p className="text-xs text-gray-400">12.4K Reviews</p>
                </div>
              </div>
              {[
                { value: "3.1L+", sub: "Homes Financed", color: "text-blue-600" },
                { value: "20+", sub: "Banking Partners", color: "text-blue-600" },
                { value: "₹8,500 Cr+", sub: "Loans Disbursed", color: "text-blue-600" },
              ].map(s => (
                <div key={s.value} className="text-center">
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-gray-400">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Sticky login/eligibility form — widened: 400px -> 460px, padding 6 -> 8 ── */}
          <div className="w-full lg:w-[460px] flex-shrink-0 lg:sticky lg:top-24">
            <div className="border border-gray-200 rounded-2xl shadow-xl overflow-hidden">

              {/* Cashback banner */}
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-4 flex items-center gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    <span className="text-blue-600 font-bold">0% Processing Fee*</span> on Home Loans
                  </p>
                  {/* <p className="text-xs text-gray-400">Valid till 30th June '26 &nbsp;·&nbsp; *T&C Apply</p> */}
                </div>
              </div>

              <div className="px-8 py-8">
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-500 font-medium whitespace-nowrap px-1">
                    ✦ Instant Home Loan ✦
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                <p className="text-center text-xl font-extrabold text-gray-900 mb-5 leading-snug">
                  Get up to{" "}
                  <span className="text-blue-600">₹15 Crore</span>{" "}
                  starting at{" "}
                  <span className="text-blue-600 underline decoration-blue-400 decoration-2 underline-offset-2">
                    7.10%
                  </span>
                </p>

                {isLoggedIn && (
                  <p className="text-center text-xs text-green-600 font-semibold mb-4 flex items-center justify-center gap-1.5">
                    <CheckCircle size={13} /> Logged in as {user?.fullName || "member"} — no OTP needed
                  </p>
                )}

                {/* Name */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Full Name (as on your PAN)"
                    value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    className={`w-full border rounded-xl px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition
                      ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Mobile */}
                <div className="mb-1 relative">
                  <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-blue-600 font-medium z-10">
                    Mobile Number
                  </span>
                  <div className={`flex items-center border-2 rounded-xl overflow-hidden transition
                    ${errors.mobile ? "border-red-400" : "border-blue-400"}`}>
                    <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                      <span className="text-base">🇮🇳</span>
                      <span className="text-sm text-gray-600 font-medium">+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="Enter mobile number"
                      value={form.mobile}
                      disabled={isLoggedIn}
                      onChange={e => {
                        const v = e.target.value.replace(/\D/g, "");
                        setForm({ ...form, mobile: v });
                        setErrors({ ...errors, mobile: "" });
                      }}
                      className="flex-1 px-3 py-3.5 text-sm focus:outline-none bg-transparent disabled:text-gray-500"
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                </div>

                {/* Submit — logged in: skip OTP, straight to purpose step; else -> OTP flow */}
                <button
                  onClick={handleHeroSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-5"
                >
                  {isLoggedIn ? "Continue Application" : "Check Eligibility"} <ArrowRight size={17} />
                </button>

                {/* Terms */}
                <div className="flex items-start gap-2 mt-3">
                  <input
                    type="checkbox" id="terms" checked={agreed}
                    onChange={e => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
                    className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0 cursor-pointer"
                  />
                  <label htmlFor="terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                    By submitting this form, you have read and agree to the{" "}
                    <span className="text-blue-500">Terms of Use</span> &{" "}
                    <span className="text-blue-500">Privacy Policy</span>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Home Loan?</h2>
        <div className="text-gray-600 text-sm leading-relaxed space-y-4">
          <p>A Home Loan helps you buy, construct, or transfer financing on residential or commercial property, with tenures up to 30 years and competitive interest rates. Direct Credit connects you with the right lender for New Purchase, Balance Transfer, or Top-up needs.</p>
          <p>It is ideal for:</p>
          <ul className="space-y-2 pl-1">
            {useCases.map(u => (
              <li key={u} className="flex items-start gap-3">
                <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />{u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TABLE ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 border-t">
        <h2 className="text-2xl font-bold text-gray-800 mb-5">Representative Example </h2>
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

      {/* ── BOTTOM CTA ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Ready to own your dream home?</h2>
            <p className="text-blue-100 text-sm">Apply in 5 minutes — disbursal in 2 days</p>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-700 font-semibold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap">
            Apply Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />

      {/* ══════════════════════════════════════
          APPLICATION-FLOW POPUP
      ══════════════════════════════════════ */}
      {step !== "hero" && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-7 sm:p-8">

            {/* Progress bar + close (hidden on confirmation) */}
            {step !== "confirmation" && (
              <div className="flex items-center mb-6">
                <div className="flex items-center gap-1.5 flex-1 mr-4">
                  {sequence.map((s, i) => (
                    <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i < stepIndex ? "bg-blue-600" : i === stepIndex ? "bg-blue-300" : "bg-gray-200"
                      }`} />
                  ))}
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                  <X size={20} />
                </button>
              </div>
            )}
            {step === "confirmation" && (
              <div className="flex justify-end mb-2">
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0">
                  <X size={20} />
                </button>
              </div>
            )}

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
            {step !== "offers" && step !== "confirmation" && (
              <div className="mt-7">
                <button onClick={goNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors">
                  {CONTINUE_LABELS[step] || "Continue"} <ArrowRight size={16} />
                </button>
                <button onClick={goBack}
                  className="w-full text-center text-sm text-gray-500 mt-4 flex items-center justify-center gap-1.5 hover:text-gray-700 transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

  