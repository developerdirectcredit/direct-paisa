
// not add bank apply section

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Landmark,
  Clock3,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Pencil,
  ShieldCheck,
  XCircle,
  CheckCircle,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Professional Loan Page                                             */
/*  Hero = lead capture (Name + Mobile), restyled to Agri Loan's       */
/*         navy (#001f54) / red (#e8112d) / blue-600 CTA theme,        */
/*         with the professional image + new eligibility/cost content. */
/*  Wizard = the full Professional loan flow (unchanged steps).        */
/*  - Step 4 (salaried docs) is shown only for Salaried; Self-Employed */
/*    skips it and goes to Step 5 (self-employed docs).                */
/*  - On eligible submit, a success toast is shown.                    */
/* ------------------------------------------------------------------ */

const ADDRESS_TYPES = ["Owned", "Rented"];
const PROFESSIONS = ["CA", "Doctor", "Lawyer", "Architect", "Other Professional"];
const EMPLOYMENT_TYPES = ["Salaried", "Self Employed"];

// CIBIL threshold below which the journey ends with a rejection.
const CIBIL_THRESHOLD = 700;

// Dummy bank offers shown after eligibility is met (demo data).
const BANK_OFFERS = [
  { name: "Instamoney", maxAmount: "₹1.0L", roi: "22% p.a", apr: "23.77%", emi: "₹7,638 p.m.", fees: "2-5%", bestSuited: true },
  { name: "HDFC Bank", maxAmount: "₹40L", roi: "10.5% p.a", apr: "11.20%", emi: "₹21,494 p.m.", fees: "1-3%", bestSuited: false },
  { name: "ICICI Bank", maxAmount: "₹25L", roi: "11.0% p.a", apr: "11.85%", emi: "₹13,775 p.m.", fees: "1.5-3%", bestSuited: false },
  { name: "Axis Bank", maxAmount: "₹15L", roi: "12.5% p.a", apr: "13.40%", emi: "₹9,021 p.m.", fees: "2-4%", bestSuited: false },
  { name: "Bajaj Finserv", maxAmount: "₹35L", roi: "13.0% p.a", apr: "14.10%", emi: "₹11,200 p.m.", fees: "2-4.5%", bestSuited: false },
];

const STEP_LABELS = [
  "Personal",
  "Professional",
  "CIBIL",
  "Salaried Docs",
  "Self-Employed Docs",
  "Review",
];

// ── Work Experience requirements ──────────────────────────────────
const workExperience = [
  "Doctors and CAs: 4 years post-qualification experience needed.",
  "Company Secretaries and Architects: 5 years post-qualification experience needed.",
  "Physiotherapists: Minimum 5 years post-qualification experience needed.",
];

// ── Other requirements ─────────────────────────────────────────────
const otherRequirements = [
  "Age: 25 – 65 years",
  "Income: Minimum ₹1 Lakh annually",
  "Profitability: Business must be profitable for the last 2 years",
];

// ── Repayment period, loan amount range & interest rate ───────────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "12 months" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "84 months (7 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹2,00,00,000" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "10% – 18% per annum" },
];

// ── Representative example of loan cost ────────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Professional Loan (Doctors, CAs, Accountants, etc)" },
  { feature: "Loan Amount", details: "₹10,00,000" },
  { feature: "Annual Interest Rate (Indicative)", details: "13.50% p.a." },
  { feature: "Loan Tenure", details: "60 months" },
  { feature: "Monthly Installment (EMI)", details: "₹23,000 (approx.)" },
  { feature: "Total Amount Payable", details: "₹13,80,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹3,80,000 (approx.)" },
  { feature: "Processing Fee", details: "1% – 3% of loan amount" },
  { feature: "Collateral Requirement", details: "Not Required (Unsecured Loan)" },
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_RE = /^\d{12}$/;
const currentYear = new Date().getFullYear();

const initialForm = {
  // 1 — personal
  name: "",
  dob: "",
  mobile: "",
  pan: "",
  aadhaar: "",
  addressType: "",
  // 2 — professional
  profession: "",
  professionOther: "",
  firmName: "",
  practiceStartDate: "",
  govtRegNumber: "",
  incorporationYear: "",
  employmentType: "",
  // 3 — CIBIL
  cibilConsent: false,
  // 4 — salaried docs
  docItr: "",
  docBankStatement6: "",
  docForm16: "",
  docSalarySlip: "",
  docEmployerLetter: "",
  docBankStatement12Salaried: "",
  // 5 — self-employed docs
  docGstReturns: "",
  docPracticeReceipts: "",
  docBankStatement12Self: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isSalaried(form) {
  return form.employmentType === "Salaried";
}
function isSelfEmployed(form) {
  return form.employmentType === "Self Employed";
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.name.trim()) e.name = "Name is required.";
    else if (!NAME_RE.test(form.name.trim()))
      e.name = "Name can contain letters and spaces only.";
    if (!form.dob) e.dob = "Date of birth is required.";
    else if (new Date(form.dob) > new Date())
      e.dob = "Date cannot be in the future.";
    if (!form.mobile.trim()) e.mobile = "Mobile number is required.";
    else if (!MOBILE_RE.test(form.mobile))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (!form.pan.trim()) e.pan = "PAN is required.";
    else if (!PAN_RE.test(form.pan.trim().toUpperCase()))
      e.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
    if (!form.aadhaar.trim()) e.aadhaar = "Aadhaar number is required.";
    else if (!AADHAAR_RE.test(form.aadhaar))
      e.aadhaar = "Enter a valid 12-digit Aadhaar number.";
    if (!form.addressType) e.addressType = "Select address type.";
  }

  if (step === 2) {
    if (!form.profession) e.profession = "Select a profession.";
    if (form.profession === "Other Professional" && !form.professionOther.trim())
      e.professionOther = "Please specify the profession.";
    if (!form.firmName.trim()) e.firmName = "Clinic / firm name is required.";
    if (!form.practiceStartDate)
      e.practiceStartDate = "Date of start of practice is required.";
    else if (new Date(form.practiceStartDate) > new Date())
      e.practiceStartDate = "Date cannot be in the future.";
    if (!form.employmentType) e.employmentType = "Select Salaried or Self Employed.";
    // Year of incorporation only relevant for self employed
    if (form.employmentType === "Self Employed") {
      if (!form.incorporationYear.trim())
        e.incorporationYear = "Year of incorporation is required.";
      else if (
        !/^\d{4}$/.test(form.incorporationYear) ||
        +form.incorporationYear < 1900 ||
        +form.incorporationYear > currentYear
      )
        e.incorporationYear = `Enter a valid year between 1900 and ${currentYear}.`;
    }
  }

  if (step === 3) {
    if (!form.cibilConsent)
      e.cibilConsent = "Consent is required to fetch your CIBIL score.";
  }

  if (step === 4) {
    // Salaried documents (only for salaried).
    if (isSalaried(form)) {
      if (!form.docItr) e.docItr = "Income proof (ITR) is required.";
      if (!form.docBankStatement6)
        e.docBankStatement6 = "Bank statements (last 6 months) are required.";
      if (!form.docForm16) e.docForm16 = "Form-16 / Form 26AS is required.";
      if (!form.docSalarySlip) e.docSalarySlip = "Salary slip is required.";
      if (!form.docBankStatement12Salaried)
        e.docBankStatement12Salaried = "Bank statement (12 months) is required.";
      // Employer letter is optional.
    }
  }

  if (step === 5) {
    // Self-employed documents (only for self employed).
    if (isSelfEmployed(form)) {
      if (!form.docPracticeReceipts)
        e.docPracticeReceipts = "Practice receipts are required.";
      if (!form.docBankStatement12Self)
        e.docBankStatement12Self = "Bank statement (12 months) is required.";
      // GST returns optional (only if registered).
    }
  }

  return e;
}

/* Simulated CIBIL fetch (consistent demo score from PAN).               */
function fetchCibilScore(pan) {
  let sum = 0;
  for (const ch of pan.toUpperCase()) sum += ch.charCodeAt(0);
  return 600 + (sum % 250); // range 600–849
}

export default function ProfessionalLoan() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [cibilScore, setCibilScore] = useState(null);

  const set = (key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const setChoice = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const setFile = (key) => (e) => {
    const fname = e.target.files?.[0]?.name || "";
    setForm((f) => ({ ...f, [key]: fname }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  // Move forward; after CIBIL, salaried → step 4, self-employed → step 5.
  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    // After CIBIL consent (step 3): fetch score and gate the journey.
    if (step === 3) {
      const score = fetchCibilScore(form.pan);
      setCibilScore(score);
      if (score < CIBIL_THRESHOLD) {
        setRejected(true);
        return;
      }
      // Self-employed skips step 4 (salaried docs).
      if (isSelfEmployed(form)) {
        setStep(5);
        return;
      }
    }

    setStep((s) => Math.min(s + 1, 6));
  };

  const back = () => {
    setErrors({});
    setStep((s) => {
      // From self-employed docs (5), self-employed goes back to CIBIL (3).
      if (s === 5 && isSelfEmployed(form)) return 3;
      return Math.max(s - 1, 1);
    });
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    for (let s = 1; s <= 5; s++) {
      if (s === 4 && !isSalaried(form)) continue; // salaried docs skipped
      if (s === 5 && !isSelfEmployed(form)) continue; // self-employed docs skipped
      const e = validateStep(s, form);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(s);
        return;
      }
    }
    setErrors({});
    // Eligibility criteria met → show the list of bank offers.
    setShowOffers(true);
  };

  // User picked a specific bank from the offers → toast + success screen.
  const applyToBank = (bankName) => {
    toast.success(`Application submitted to ${bankName}!`, { duration: 4000 });
    setShowOffers(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setSubmitted(false);
    setShowOffers(false);
    setRejected(false);
    setCibilScore(null);
    setStarted(false);
  };

  return (
    <>
      <Navbar />
      {/* Toast container — mounted here so toasts work on this page */}
      <Toaster position="top-center" />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : rejected ? (
          <Rejected score={cibilScore} onReset={reset} />
        ) : submitted ? (
          <Success onReset={reset} />
        ) : showOffers ? (
          <BankOffers onApply={applyToBank} onBack={() => setShowOffers(false)} />
        ) : (
          <Wizard
            step={step}
            form={form}
            errors={errors}
            set={set}
            setChoice={setChoice}
            setFile={setFile}
            next={next}
            back={back}
            goToStep={goToStep}
            onSubmit={submit}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO (Agri Loan navy/red theme + Name & Mobile capture)            */
/* ------------------------------------------------------------------ */

function Hero({ onStart }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [agree, setAgree] = useState(true);
  const [err, setErr] = useState({});

  const handleStart = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    else if (!NAME_RE.test(name.trim()))
      e.name = "Name can contain letters and spaces only.";
    if (!mobile) e.mobile = "Please enter your mobile number.";
    else if (!MOBILE_RE.test(mobile))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (!agree) e.agree = "Please accept the terms to continue.";
    if (Object.keys(e).length) {
      setErr(e);
      return;
    }
    setErr({});
    onStart();
  };

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left column */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              Loans for{" "}
              <span className="text-[#e8112d]">Professionals</span>{" "}
              <span className="text-[#001f54]">— Hassle-Free</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Tailored funding for CAs, doctors, lawyers, architects and other
              professionals — salaried or self-employed. Apply once and get expert
              support at every step.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/professional-loan.jpg"
                alt="Professional Loan"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Built for Professionals"
                text="Tailored eligibility for CAs, doctors, lawyers, architects and more."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Quick & Hassle Free"
                text="Get expert assistance for quick and smooth processing."
              />
              <Feature
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Trusted by Thousands"
                text="Backed by 15+ leading banks and a dedicated support team."
              />
            </ul>
          </div>

          {/* Right column — lead card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="rounded-xl bg-[#001f54] px-4 py-3 text-sm text-white font-semibold text-center">
              Start your Professional Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Professional Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Funding for your{" "}
              <span className="text-[#e8112d]">practice</span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value.replace(/[^A-Za-z\s]/g, ""));
                    setErr((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Full Name (as on your PAN)"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${
                    err.name ? "border-red-400" : "border-slate-300"
                  }`}
                />
                {err.name && <ErrorText>{err.name}</ErrorText>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Mobile Number
                </label>
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${
                    err.mobile ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <span className="shrink-0 border-r border-slate-200 pr-2 text-slate-700">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setErr((p) => ({ ...p, mobile: undefined }));
                    }}
                    placeholder="10-digit mobile number"
                    className="w-full bg-transparent outline-none"
                    inputMode="numeric"
                    maxLength={10}
                  />
                </div>
                {err.mobile && <ErrorText>{err.mobile}</ErrorText>}
              </div>

              <button
                onClick={handleStart}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </button>

              <label className="flex items-start gap-2 text-xs text-slate-500">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => {
                    setAgree(e.target.checked);
                    setErr((p) => ({ ...p, agree: undefined }));
                  }}
                  className="mt-0.5 accent-blue-600"
                />
                <span>
                  By submitting this form, you agree to the Credit Report Terms
                  of Use, Terms of Use &amp; Privacy Policy.
                </span>
              </label>
              {err.agree && <ErrorText>{err.agree}</ErrorText>}
            </div>
          </div>
        </div>

        {/* ── WORK EXPERIENCE ── */}
        <section className="py-10 border-t mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Work Experience</h2>
          <ul className="space-y-2 pl-1">
            {workExperience.map((w) => (
              <li key={w} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-0.5 flex-shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </section>

        {/* ── OTHER REQUIREMENTS ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Other Requirements</h2>
          <ul className="space-y-2 pl-1">
            {otherRequirements.map((o) => (
              <li key={o} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-0.5 flex-shrink-0" />
                {o}
              </li>
            ))}
          </ul>
        </section>

        {/* ── REPAYMENT PERIOD, LOAN AMOUNT & INTEREST RATE ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Repayment Period, Loan Amount &amp; Interest Rate
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {repaymentStats.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-[#001f54]" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── REPRESENTATIVE EXAMPLE OF LOAN COST ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Representative Example of Loan Cost</h2>
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left px-6 py-3 font-semibold text-[#001f54] w-1/2">Particulars</th>
                  <th className="text-left px-6 py-3 font-semibold text-[#001f54]">Details</th>
                </tr>
              </thead>
              <tbody>
                {loanCostDetails.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-3.5 text-gray-700 font-medium border-t border-gray-100">{row.feature}</td>
                    <td className="px-6 py-3.5 text-gray-600 border-t border-gray-100">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#001f54] text-white">
        {icon}
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  WIZARD (unchanged flow, recolored to navy)                         */
/* ------------------------------------------------------------------ */

function Wizard({
  step,
  form,
  errors,
  set,
  setChoice,
  setFile,
  next,
  back,
  goToStep,
  onSubmit,
}) {
  const isReview = step === 6;
  const lastDocStep = isSalaried(form) ? 4 : 5;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} form={form} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepPersonal form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepProfessional form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 3 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
        {step === 4 && <StepSalariedDocs form={form} setFile={setFile} errors={errors} />}
        {step === 5 && <StepSelfEmployedDocs form={form} setFile={setFile} errors={errors} />}
        {step === 6 && <StepReview form={form} goToStep={goToStep} />}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {!isReview ? (
            <button
              onClick={next}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {step === lastDocStep ? "Review details" : step === 3 ? "Check CIBIL & continue" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Bank Apply <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper({ step, form }) {
  // Hide the step that doesn't apply (salaried hides step 5, self-employed hides step 4).
  const hiddenIndex = isSalaried(form) ? 5 : isSelfEmployed(form) ? 4 : null;
  return (
    <div className="flex items-center justify-between overflow-x-auto">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        if (hiddenIndex && n === hiddenIndex) return null;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-[#001f54] text-white"
                    : active
                    ? "bg-blue-600 text-white ring-4 ring-blue-100"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">
                {label}
              </span>
            </div>
            {n < STEP_LABELS.length && (
              <div
                className={`mx-1 h-0.5 flex-1 ${
                  n < step ? "bg-[#001f54]" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Field primitives ---------- */

function ErrorText({ children }) {
  return <p className="mt-1 text-xs text-red-500">{children}</p>;
}

function Field({ label, children, hint, error }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>
      )}
    </label>
  );
}

function Text({ value, onChange, error, ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${
        error ? "border-red-400" : "border-slate-300"
      }`}
      {...rest}
    />
  );
}

function Select({ value, onChange, options, placeholder, error }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-blue-500 ${
        error ? "border-red-400" : "border-slate-300"
      }`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Pills({ value, onSelect, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onSelect(o)}
          className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
            value === o
              ? "border-blue-600 bg-blue-50 text-blue-700"
              : "border-slate-300 text-slate-600 hover:border-slate-400"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function FileRow({ label, required, name, onChange, error }) {
  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        <div>
          <p className="text-sm font-medium text-slate-700">
            {label} {required && <span className="text-[#e8112d]">*</span>}
          </p>
          {name ? (
            <p className="text-xs text-blue-600">{name}</p>
          ) : (
            <p className="text-xs text-slate-400">PDF, JPG or PNG</p>
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
          Upload
          <input type="file" className="hidden" onChange={onChange} />
        </label>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

/* ---------- Step 1: Personal details ---------- */

function StepPersonal({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Personal details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <Text
            value={form.name}
            onChange={(e) => set("name")({ target: { value: e.target.value.replace(/[^A-Za-z\s]/g, "") } })}
            placeholder="Full name"
            error={errors.name}
          />
        </Field>
        <Field label="Date of birth" error={errors.dob}>
          <Text type="date" value={form.dob} onChange={set("dob")} max={new Date().toISOString().split("T")[0]} error={errors.dob} />
        </Field>
        <Field label="Mobile number" error={errors.mobile}>
          <Text value={form.mobile} onChange={(e) => set("mobile")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 10) } })} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} error={errors.mobile} />
        </Field>
        <Field label="PAN number" error={errors.pan}>
          <Text
            value={form.pan}
            onChange={(e) =>
              set("pan")({
                target: { value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) },
              })
            }
            placeholder="ABCDE1234F"
            error={errors.pan}
          />
        </Field>
        <Field label="Aadhaar number" error={errors.aadhaar}>
          <Text value={form.aadhaar} onChange={(e) => set("aadhaar")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 12) } })} placeholder="12-digit Aadhaar" inputMode="numeric" maxLength={12} error={errors.aadhaar} />
        </Field>
      </div>

      <Field label="Address" error={errors.addressType}>
        <Pills value={form.addressType} onSelect={setChoice("addressType")} options={ADDRESS_TYPES} />
      </Field>
    </div>
  );
}

/* ---------- Step 2: Professional details ---------- */

function StepProfessional({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Professional details</h2>

      <Field label="Profession" error={errors.profession}>
        <Select
          value={form.profession}
          onChange={set("profession")}
          options={PROFESSIONS}
          placeholder="Select profession"
          error={errors.profession}
        />
      </Field>

      {form.profession === "Other Professional" && (
        <Field label="Please specify profession" error={errors.professionOther}>
          <Text value={form.professionOther} onChange={set("professionOther")} placeholder="Specify profession" error={errors.professionOther} />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Clinic / Firm name" error={errors.firmName}>
          <Text value={form.firmName} onChange={set("firmName")} placeholder="Clinic / firm name" error={errors.firmName} />
        </Field>
        <Field label="Date of start of practice" error={errors.practiceStartDate}>
          <Text type="date" value={form.practiceStartDate} onChange={set("practiceStartDate")} max={new Date().toISOString().split("T")[0]} error={errors.practiceStartDate} />
        </Field>
        <Field label="Govt registration number" hint="Where applicable (e.g. UDIN for CA)">
          <Text value={form.govtRegNumber} onChange={set("govtRegNumber")} placeholder="Registration number" />
        </Field>
      </div>

      <Field label="Salaried / Self Employed" error={errors.employmentType}>
        <Pills value={form.employmentType} onSelect={setChoice("employmentType")} options={EMPLOYMENT_TYPES} />
      </Field>

      {form.employmentType === "Self Employed" && (
        <Field label="Year of incorporation" error={errors.incorporationYear}>
          <Text
            value={form.incorporationYear}
            onChange={(e) => set("incorporationYear")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 4) } })}
            placeholder="e.g. 2015"
            inputMode="numeric"
            maxLength={4}
            error={errors.incorporationYear}
          />
        </Field>
      )}
    </div>
  );
}

/* ---------- Step 3: CIBIL consent ---------- */

function StepCibil({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Credit Bureau Check (CIBIL)</h2>
      <p className="text-sm text-slate-600">
        We use your PAN to fetch your CIBIL score. A minimum score is required to
        proceed to financial documentation.
      </p>

      <label
        className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
          form.cibilConsent ? "border-blue-600 bg-blue-50" : "border-slate-200"
        }`}
      >
        <input
          type="checkbox"
          checked={form.cibilConsent}
          onChange={(e) => setChoice("cibilConsent")(e.target.checked)}
          className="mt-0.5"
        />
        <span className="text-sm text-slate-700">
          I authorise the fetch of my credit information (CIBIL) using my PAN for
          the purpose of this loan application.
        </span>
      </label>
      {errors.cibilConsent && <ErrorText>{errors.cibilConsent}</ErrorText>}
    </div>
  );
}

/* ---------- Step 4: Salaried documents ---------- */

function StepSalariedDocs({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Income &amp; finance documents (Salaried)</h2>
      <p className="text-sm text-slate-500">Upload the documents below (PDF, JPG or PNG).</p>

      <FileRow label="Income proof — ITR" required name={form.docItr} onChange={setFile("docItr")} error={errors.docItr} />
      <FileRow label="Bank statements (last 6 months)" required name={form.docBankStatement6} onChange={setFile("docBankStatement6")} error={errors.docBankStatement6} />
      <FileRow label="Form-16 / Form 26AS" required name={form.docForm16} onChange={setFile("docForm16")} error={errors.docForm16} />
      <FileRow label="Salary slip" required name={form.docSalarySlip} onChange={setFile("docSalarySlip")} error={errors.docSalarySlip} />
      <FileRow label="Employer letter (optional)" name={form.docEmployerLetter} onChange={setFile("docEmployerLetter")} />
      <FileRow label="Bank statement — 12 months" required name={form.docBankStatement12Salaried} onChange={setFile("docBankStatement12Salaried")} error={errors.docBankStatement12Salaried} />
    </div>
  );
}

/* ---------- Step 5: Self-employed documents ---------- */

function StepSelfEmployedDocs({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Income &amp; finance documents (Self Employed)</h2>
      <p className="text-sm text-slate-500">Upload the documents below (PDF, JPG or PNG).</p>

      <FileRow label="GST returns (if registered)" name={form.docGstReturns} onChange={setFile("docGstReturns")} />
      <FileRow label="Practice receipts (invoices / fee receipts)" required name={form.docPracticeReceipts} onChange={setFile("docPracticeReceipts")} error={errors.docPracticeReceipts} />
      <FileRow label="Bank statement — 12 months" required name={form.docBankStatement12Self} onChange={setFile("docBankStatement12Self")} error={errors.docBankStatement12Self} />
    </div>
  );
}

/* ---------- Step 6: Review ---------- */

function ReviewBlock({ title, stepNo, goToStep, rows }) {
  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={() => goToStep(stepNo)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <dl className="divide-y divide-slate-50">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 px-4 py-2.5 text-sm">
            <dt className="w-44 shrink-0 text-slate-500">{label}</dt>
            <dd className="text-slate-800">
              {value || <span className="text-slate-400">—</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StepReview({ form, goToStep }) {
  const salaried = isSalaried(form);
  const professionLabel =
    form.profession === "Other Professional" && form.professionOther
      ? `Other — ${form.professionOther}`
      : form.profession;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-slate-500">
          Check everything below. Use “Edit” on any section to go back — your
          other answers stay saved.
        </p>
      </div>

      <ReviewBlock
        title="Personal details"
        stepNo={1}
        goToStep={goToStep}
        rows={[
          ["Name", form.name],
          ["Date of birth", form.dob],
          ["Mobile", form.mobile],
          ["PAN", form.pan],
          ["Aadhaar", form.aadhaar],
          ["Address", form.addressType],
        ]}
      />
      <ReviewBlock
        title="Professional details"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Profession", professionLabel],
          ["Clinic / Firm name", form.firmName],
          ["Start of practice", form.practiceStartDate],
          ["Govt reg. number", form.govtRegNumber],
          ["Employment type", form.employmentType],
          ...(form.employmentType === "Self Employed"
            ? [["Year of incorporation", form.incorporationYear]]
            : []),
        ]}
      />
      <ReviewBlock
        title="CIBIL"
        stepNo={3}
        goToStep={goToStep}
        rows={[["Consent", form.cibilConsent ? "Given" : "Not given"]]}
      />
      {salaried ? (
        <ReviewBlock
          title="Income & finance documents (Salaried)"
          stepNo={4}
          goToStep={goToStep}
          rows={[
            ["ITR", form.docItr],
            ["Bank statements (6 mo)", form.docBankStatement6],
            ["Form-16 / 26AS", form.docForm16],
            ["Salary slip", form.docSalarySlip],
            ["Employer letter", form.docEmployerLetter],
            ["Bank statement (12 mo)", form.docBankStatement12Salaried],
          ]}
        />
      ) : (
        <ReviewBlock
          title="Income & finance documents (Self Employed)"
          stepNo={5}
          goToStep={goToStep}
          rows={[
            ["GST returns", form.docGstReturns],
            ["Practice receipts", form.docPracticeReceipts],
            ["Bank statement (12 mo)", form.docBankStatement12Self],
          ]}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BANK OFFERS (shown after eligibility is met)                       */
/* ------------------------------------------------------------------ */

function BankOffers({ onApply, onBack }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h2 className="text-2xl font-bold text-slate-900">Bank offers for you</h2>
      <p className="mt-1 text-sm text-slate-500">
        Based on your details, here are matched offers. Choose a bank to apply.
      </p>

      <div className="mt-6 space-y-4">
        {BANK_OFFERS.map((bank) => (
          <div
            key={bank.name}
            className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            {bank.bestSuited && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                ★ Best Suited For You
              </span>
            )}

            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-[#001f54]">
                <Landmark className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-bold text-slate-900">{bank.name}</h3>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:items-end">
              <div>
                <p className="text-xs text-slate-400">Max. Loan Amount</p>
                <p className="text-base font-bold text-slate-800">{bank.maxAmount}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">ROI Starting at</p>
                <p className="text-base font-bold text-slate-800">{bank.roi}</p>
                <p className="text-[11px] text-slate-400">APR: {bank.apr}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">EMI</p>
                <p className="text-base font-bold text-slate-800">{bank.emi}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Processing Fees</p>
                <p className="text-base font-bold text-slate-800">{bank.fees}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <button
                  onClick={() => onApply(bank.name)}
                  className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Apply Now
                </button>
                <p className="mt-2 text-center text-xs font-medium text-blue-600">
                  KFS, Charges &amp; APR
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">
        10,000+ people took a loan in the last 30 days
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  REJECTED (CIBIL below threshold)                                   */
/* ------------------------------------------------------------------ */

function Rejected({ score, onReset }) {
  return (
    <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-100 text-red-600">
          <XCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Application not eligible</h2>
        <p className="mt-2 text-slate-600">
          Based on the credit bureau check{score ? ` (score: ${score})` : ""}, we
          are unable to proceed with your professional loan application at this
          time. You can re-apply once your credit profile improves.
        </p>
        <button  
          onClick={onReset}
          className="mt-8 rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-800"
        >
          Start over
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SUCCESS                                                            */
/* ------------------------------------------------------------------ */

function Success({ onReset }) {
  return (
    <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600">
          Eligibility met — your professional loan application has been submitted.
          Our team will reach out within 24 hours.
        </p>
        <button
          onClick={onReset}
          className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Start a new application
        </button>
      </div>
    </section>
  );
}