// src/pages/loans/StartupLoan.jsx
// ─────────────────────────────────────────────────────────────────
//  Startup Loan — restructured to match Agri Loan's architecture:
//  Hero (lead capture: Name + Mobile, navy/red/blue theme, image +
//  feature list, followed by info sections) -> Wizard (centered
//  card, Stepper, Field/Pills/Select inputs) -> Review -> Success.
// ─────────────────────────────────────────────────────────────────

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useState } from "react";
import {
  Landmark,
  Clock3,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Pencil,
  CheckCircle,
  Calendar,
  Percent,
  FileText,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const tableData = [
  { feature: "Loan Amount", details: "₹50,000 – ₹2 Crore" },
  { feature: "Interest Rate", details: "11% – 30% p.a." },
  { feature: "Repayment Tenure", details: "12 – 84 months" },
  { feature: "Processing Fee", details: "0% – 3% of loan amount" },
  { feature: "Disbursal Time", details: "Within 24 – 48 hours" },
  { feature: "CIBIL Score Required", details: "685+ preferred" },
  { feature: "Collateral", details: "Not required upto ₹15L" },
  { feature: "Business Vintage", details: "0 – 3 years (early stage)" },
  { feature: "Eligible Entities", details: "DPIIT-recognised startups, Pvt Ltd, LLP" },
];

const useCases = [
  "Product development & R&D",
  "Hiring your founding team",
  "Marketing, branding & customer acquisition",
  "Buying equipment, tools or software",
  "Managing working capital & runway",
  "Office setup or co-working space",
];

// ── Repayment period & interest rate ─────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "12 months" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "120 months (10 years)" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "24% per annum" },
];

// ── Eligibility criteria for New Business / Startup Loans ────────
const eligibilityCriteria = [
  "The applicant should be between 21 years and a maximum of 65 years at the time of loan maturity",
  "Should be self-employed",
  "Should be a sole proprietorship / partnership firm / private or public limited company / a limited liability partnership (LLP)",
  "Should have a credit score of 750 or above",
  "Should not have any previous loan defaults with any bank",
  "Total annual turnover of the firm should not exceed ₹25 Crore",
];

// ── Documents required for Startup Business Loan ─────────────────
const documentsRequired = [
  "Duly filled application form with passport-sized photographs",
  "KYC documents of applicant and co-applicants, including passport, Aadhar card, voter's ID card, driving license, PAN Card and utility bills (telephone & electricity bills)",
  "Last 12 months' bank statement",
  "Last 1-year ITR",
  "Business Incorporation Certificate",
  "Proof of business address",
  "Any other document required by the lender",
];

/* ------------------------------------------------------------------ */
/*  Application-flow static data                                       */
/*  Flow: GST -> (Turnover) -> Personal -> Business -> Loan -> Review   */
/* ------------------------------------------------------------------ */

const turnoverOptions = [
  { id: "gt1cr", label: "₹1 Crore & above" },
  { id: "50l-1cr", label: "₹50 Lakhs – ₹1 Crore" },
  { id: "below50l", label: "Below ₹50 Lakhs" },
  { id: "below25l", label: "Below ₹25 Lakhs" },
  { id: "custom", label: "Enter Turnover Amount" },
];

const businessTypes = ["Sole Proprietorship", "Partnership Firm", "Private Limited", "LLP", "Public Limited", "Other"];
const industries = ["Manufacturing", "Trading / Retail", "Services", "IT & Software", "Construction", "Healthcare", "Education", "Food & Hospitality", "Other"];
const vintageOptions = ["Less than 1 year", "1 – 2 years", "2 – 5 years", "5+ years"];
const loanPurposes = ["Working Capital", "Business Expansion", "Machinery / Equipment Purchase", "Inventory Purchase", "Debt Consolidation", "Other"];
const tenureOptions = ["12 months", "24 months", "36 months", "48 months", "60 months"];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const initialForm = {
  gst: "",
  turnover: "",
  turnoverAmount: "",
  fullName: "",
  gender: "",
  dob: "",
  pan: "",
  email: "",
  maritalStatus: "",
  businessName: "",
  businessType: "",
  industry: "",
  vintage: "",
  address: "",
  amount: "",
  purpose: "",
  tenure: "",
};

// Turnover step only appears when the applicant has GST
function getStepSequence(gst) {
  return gst === "yes"
    ? [
        { key: "gst", label: "GST" },
        { key: "turnover", label: "Turnover" },
        { key: "personal", label: "Personal" },
        { key: "business", label: "Business" },
        { key: "loanReq", label: "Loan" },
        { key: "review", label: "Review" },
      ]
    : [
        { key: "gst", label: "GST" },
        { key: "personal", label: "Personal" },
        { key: "business", label: "Business" },
        { key: "loanReq", label: "Loan" },
        { key: "review", label: "Review" },
      ];
}

function calcAge(dobStr) {
  if (!dobStr) return 0;
  const diffMs = Date.now() - new Date(dobStr).getTime();
  return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
}

function validateStep(key, form) {
  const e = {};

  if (key === "gst") {
    if (!form.gst) e.gst = "Please select an option.";
  }

  if (key === "turnover") {
    if (!form.turnover) e.turnover = "Please select your annual turnover.";
    if (form.turnover === "custom" && (!form.turnoverAmount || Number(form.turnoverAmount) <= 0))
      e.turnoverAmount = "Enter a valid turnover amount.";
  }

  if (key === "personal") {
    if (!form.fullName.trim() || form.fullName.trim().length < 3) e.fullName = "Enter full name as on PAN.";
    if (!form.gender) e.gender = "Select gender.";
    if (!form.dob) e.dob = "Select date of birth.";
    else if (calcAge(form.dob) < 21) e.dob = "Applicant must be at least 21 years old.";
    if (!PAN_RE.test(form.pan.toUpperCase())) e.pan = "Enter a valid PAN number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.maritalStatus) e.maritalStatus = "Select marital status.";
  }

  if (key === "business") {
    if (!form.businessName.trim()) e.businessName = "Enter business name.";
    if (!form.businessType) e.businessType = "Select business type.";
    if (!form.industry) e.industry = "Select your industry.";
    if (!form.vintage) e.vintage = "Select business vintage.";
    if (!form.address.trim() || form.address.trim().length < 6) e.address = "Enter complete business address.";
  }

  if (key === "loanReq") {
    if (!form.amount || Number(form.amount) < 50000) e.amount = "Enter loan amount (min ₹50,000).";
    if (!form.purpose) e.purpose = "Select loan purpose.";
    if (!form.tenure) e.tenure = "Select preferred tenure.";
  }

  return e;
}

export default function StartupLoan() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState("gst");
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");

  const set = (key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const setChoice = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const sequence = getStepSequence(form.gst || "no");
  const stepIndex = sequence.findIndex((s) => s.key === step);

  const next = () => {
    if (step === "review") return;
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    const idx = sequence.findIndex((s) => s.key === step);
    setStep(sequence[idx + 1].key);
  };

  const back = () => {
    setErrors({});
    const idx = sequence.findIndex((s) => s.key === step);
    setStep(idx <= 0 ? sequence[0].key : sequence[idx - 1].key);
  };

  const goToStep = (targetKey) => {
    setErrors({});
    setStep(targetKey);
  };

  const submit = () => {
    for (const s of sequence) {
      if (s.key === "review") continue;
      const e = validateStep(s.key, form);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(s.key);
        return;
      }
    }
    setErrors({});
    const ref = String(Math.floor(1000000000 + Math.random() * 9000000000));
    setRefNo(ref);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep("gst");
    setSubmitted(false);
    setStarted(false);
    setRefNo("");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : submitted ? (
          <Success refNo={refNo} businessName={form.businessName} onReset={reset} />
        ) : (
          <Wizard
            step={step}
            sequence={sequence}
            stepIndex={stepIndex}
            form={form}
            errors={errors}
            set={set}
            setChoice={setChoice}
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
/*  HERO (Agri Loan color theme + Name & Mobile capture)               */
/* ------------------------------------------------------------------ */

function Hero({ onStart }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [agree, setAgree] = useState(true);
  const [err, setErr] = useState({});

  const handleStart = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your full name.";
    else if (!NAME_RE.test(name.trim())) e.name = "Name can contain letters and spaces only.";
    if (!mobile) e.mobile = "Please enter your mobile number.";
    else if (!MOBILE_RE.test(mobile)) e.mobile = "Enter a valid 10-digit mobile number.";
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
              Fuel Your{" "}
              <span className="text-[#e8112d]">Startup Loan</span>{" "}
              <span className="text-[#001f54]">— Hassle-Free</span>
            </h1>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/images/startup-loan-book.jpg"
                alt="How to start a startup"
                className="h-72 md:h-80 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Compare 25+ Lenders Instantly"
                text="Evaluate interest rates, tenure & more in one place."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Quick Funds in 24-48 Hours"
                text="Minimal documentation with super-fast approval."
              />
              <Feature
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Trusted by Thousands"
                text="Backed by 50+ banking partners and a dedicated support team."
              />
            </ul>
          </div>

          {/* Right column — lead card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="rounded-xl bg-[#001f54] px-4 py-3 text-sm text-white font-semibold text-center">
              Start your Startup Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Startup Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get the right loan for your{" "}
              <span className="text-[#e8112d]">venture</span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
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
                <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${
                    err.mobile ? "border-red-400" : "border-slate-300"
                  }`}
                >
                  <span className="shrink-0 border-r border-slate-200 pr-2 text-slate-700">🇮🇳 +91</span>
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
                Check Eligibility <ArrowRight className="h-4 w-4" />
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
                  By submitting this form, you agree to the Terms of Use &amp; Privacy Policy.
                </span>
              </label>
              {err.agree && <ErrorText>{err.agree}</ErrorText>}
            </div>
          </div>
        </div>

        {/* ── WHAT IS ── */}
        <section className="py-10 border-t mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is a Startup Loan?</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <p>
              A Startup Loan provides early-stage capital to new ventures and founders without pledging major
              assets. Whether you are building your product, hiring your first team, or extending your runway —
              Direct Credit connects you with the right lender in minutes.
            </p>
            <p>It is ideal for:</p>
            <ul className="space-y-2 pl-1">
              {useCases.map((u) => (
                <li key={u} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── REPAYMENT PERIOD & INTEREST RATE ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Minimum & Maximum Repayment Period, Interest Rate
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {repaymentStats.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-gray-200 p-5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── ELIGIBILITY CRITERIA ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Eligibility Criteria for New Business / Startup Loans
          </h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <ul className="space-y-2 pl-1">
              {eligibilityCriteria.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── DOCUMENTS REQUIRED ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Documents Required for Startup Business Loan</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <ul className="space-y-2 pl-1">
              {documentsRequired.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <FileText size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FEATURE TABLE ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Key Startup Loan Features at Direct Credit</h2>
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
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#001f54] text-white">{icon}</span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-slate-500">{text}</p>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  WIZARD                                                             */
/* ------------------------------------------------------------------ */

function Wizard({ step, sequence, stepIndex, form, errors, set, setChoice, next, back, goToStep, onSubmit }) {
  const isReview = step === "review";
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper sequence={sequence} stepIndex={stepIndex} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === "gst" && <StepGst form={form} setChoice={setChoice} errors={errors} />}
        {step === "turnover" && <StepTurnover form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === "personal" && <StepPersonal form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === "business" && <StepBusiness form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === "loanReq" && <StepLoan form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === "review" && <StepReview form={form} goToStep={goToStep} />}

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={back}
            disabled={stepIndex === 0}
            className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {!isReview ? (
            <button
              onClick={next}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
            >
              {step === "loanReq" ? "Review details" : "Continue"} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
            >
              Submit application <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper({ sequence, stepIndex }) {
  return (
    <div className="flex items-center justify-between overflow-x-auto">
      {sequence.map((s, i) => {
        const active = i === stepIndex;
        const done = i < stepIndex;
        return (
          <div key={s.key} className="flex flex-1 items-center">
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
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">{s.label}</span>
            </div>
            {i < sequence.length - 1 && (
              <div className={`mx-1 h-0.5 flex-1 ${i < stepIndex ? "bg-[#001f54]" : "bg-slate-200"}`} />
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

function Field({ label, children, error }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {error && <ErrorText>{error}</ErrorText>}
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
            value === o ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 text-slate-600 hover:border-slate-400"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/* ---------- Step: GST ---------- */

function StepGst({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">GST Registration</h2>
      <p className="text-sm text-slate-500">Let us know if your business is GST registered.</p>
      <Field error={errors.gst}>
        <Pills value={form.gst} onSelect={setChoice("gst")} options={["yes", "no"]} />
      </Field>
    </div>
  );
}

/* ---------- Step: Turnover ---------- */

function StepTurnover({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Annual Turnover</h2>
      <p className="text-sm text-slate-500">Select your business's annual turnover range.</p>
      <Field error={errors.turnover}>
        <Pills
          value={form.turnover}
          onSelect={setChoice("turnover")}
          options={turnoverOptions.map((o) => o.id)}
        />
      </Field>
      {form.turnover === "custom" && (
        <Field label="Enter turnover amount" error={errors.turnoverAmount}>
          <Text
            value={form.turnoverAmount}
            onChange={set("turnoverAmount")}
            placeholder="₹"
            inputMode="numeric"
            error={errors.turnoverAmount}
          />
        </Field>
      )}
    </div>
  );
}

/* ---------- Step: Personal Details ---------- */

function StepPersonal({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Personal Details</h2>
      <p className="text-sm text-slate-500">Tell us a bit about yourself.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name (as on PAN)" error={errors.fullName}>
          <Text
            value={form.fullName}
            onChange={(e) => set("fullName")({ target: { value: e.target.value.replace(/[^a-zA-Z\s]/g, "") } })}
            placeholder="Full Name"
            error={errors.fullName}
          />
        </Field>
        <Field label="Gender" error={errors.gender}>
          <Pills value={form.gender} onSelect={setChoice("gender")} options={["Male", "Female", "Other"]} />
        </Field>
        <Field label="Date of Birth" error={errors.dob}>
          <Text type="date" value={form.dob} onChange={set("dob")} error={errors.dob} />
        </Field>
        <Field label="PAN Number" error={errors.pan}>
          <Text
            value={form.pan}
            onChange={(e) => set("pan")({ target: { value: e.target.value.toUpperCase().slice(0, 10) } })}
            placeholder="ABCDE1234F"
            error={errors.pan}
          />
        </Field>
        <Field label="Email Address" error={errors.email}>
          <Text type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={errors.email} />
        </Field>
        <Field label="Marital Status" error={errors.maritalStatus}>
          <Select
            value={form.maritalStatus}
            onChange={set("maritalStatus")}
            options={["Single", "Married", "Other"]}
            placeholder="Select"
            error={errors.maritalStatus}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step: Business Details ---------- */

function StepBusiness({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Business Details</h2>
      <p className="text-sm text-slate-500">Tell us about your business.</p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business / Firm Name" error={errors.businessName}>
          <Text value={form.businessName} onChange={set("businessName")} placeholder="Business Name" error={errors.businessName} />
        </Field>
        <Field label="Business Type" error={errors.businessType}>
          <Select value={form.businessType} onChange={set("businessType")} options={businessTypes} placeholder="Select" error={errors.businessType} />
        </Field>
        <Field label="Nature of Business / Industry" error={errors.industry}>
          <Select value={form.industry} onChange={set("industry")} options={industries} placeholder="Select" error={errors.industry} />
        </Field>
        <Field label="Business Vintage" error={errors.vintage}>
          <Select value={form.vintage} onChange={set("vintage")} options={vintageOptions} placeholder="Select" error={errors.vintage} />
        </Field>
      </div>
      <Field label="Business Address" error={errors.address}>
        <textarea
          rows={2}
          value={form.address}
          onChange={set("address")}
          placeholder="Business Address"
          className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 resize-none ${
            errors.address ? "border-red-400" : "border-slate-300"
          }`}
        />
        {errors.address && <ErrorText>{errors.address}</ErrorText>}
      </Field>
    </div>
  );
}

/* ---------- Step: Loan Details ---------- */

function StepLoan({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan Details</h2>
      <p className="text-sm text-slate-500">Tell us how much you need and for how long.</p>

      <Field label="Loan amount required" error={errors.amount}>
        <Text value={form.amount} onChange={set("amount")} placeholder="₹ in INR" inputMode="numeric" error={errors.amount} />
      </Field>
      <Field label="Purpose of Loan" error={errors.purpose}>
        <Select value={form.purpose} onChange={set("purpose")} options={loanPurposes} placeholder="Select" error={errors.purpose} />
      </Field>
      <Field label="Preferred Tenure" error={errors.tenure}>
        <Pills value={form.tenure} onSelect={setChoice("tenure")} options={tenureOptions} />
      </Field>
    </div>
  );
}

/* ---------- Step: Review ---------- */

function ReviewBlock({ title, stepKey, goToStep, rows }) {
  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={() => goToStep(stepKey)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <dl className="divide-y divide-slate-50">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 px-4 py-2.5 text-sm">
            <dt className="w-44 shrink-0 text-slate-500">{label}</dt>
            <dd className="text-slate-800">{value || <span className="text-slate-400">—</span>}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StepReview({ form, goToStep }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-slate-500">
          Check everything below. Use "Edit" on any section to go back — your other answers stay saved.
        </p>
      </div>

      <ReviewBlock
        title="GST"
        stepKey="gst"
        goToStep={goToStep}
        rows={[["GST registered", form.gst === "yes" ? "Yes" : form.gst === "no" ? "No" : ""]]}
      />
      {form.gst === "yes" && (
        <ReviewBlock
          title="Turnover"
          stepKey="turnover"
          goToStep={goToStep}
          rows={[
            ["Turnover range", turnoverOptions.find((o) => o.id === form.turnover)?.label],
            ["Custom amount", form.turnoverAmount && `₹ ${form.turnoverAmount}`],
          ]}
        />
      )}
      <ReviewBlock
        title="Personal Details"
        stepKey="personal"
        goToStep={goToStep}
        rows={[
          ["Full Name", form.fullName],
          ["Gender", form.gender],
          ["Date of Birth", form.dob],
          ["PAN", form.pan],
          ["Email", form.email],
          ["Marital Status", form.maritalStatus],
        ]}
      />
      <ReviewBlock
        title="Business Details"
        stepKey="business"
        goToStep={goToStep}
        rows={[
          ["Business Name", form.businessName],
          ["Business Type", form.businessType],
          ["Industry", form.industry],
          ["Vintage", form.vintage],
          ["Address", form.address],
        ]}
      />
      <ReviewBlock
        title="Loan Details"
        stepKey="loanReq"
        goToStep={goToStep}
        rows={[
          ["Loan amount", form.amount && `₹ ${form.amount}`],
          ["Purpose", form.purpose],
          ["Tenure", form.tenure],
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUCCESS                                                            */
/* ------------------------------------------------------------------ */

function Success({ refNo, businessName, onReset }) {
  return (
    <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-100 text-blue-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-blue-900">Thank You!</h2>
        <p className="mt-2 text-slate-600">
          We have received your <strong>Startup Loan</strong> application
          {businessName ? (
            <>
              {" "}for <strong>{businessName}</strong>
            </>
          ) : null}
          .
        </p>
        <div className="mt-4 inline-block rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
          <span className="text-sm text-gray-600">Reference No. : </span>
          <span className="text-sm font-bold text-gray-800">{refNo}</span>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Our loan expert will get in touch within 24 hours to take your application forward. We thank you for
          choosing Direct Credit for your financial needs.
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