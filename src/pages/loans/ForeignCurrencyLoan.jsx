
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
  ShieldCheck,
  XCircle,
  CheckCircle,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Foreign Currency Term Loan (FCTL)                                  */
/*  Hero = lead capture (Name + Mobile), restyled to Agri Loan's       */
/*         navy (#001f54) / red (#e8112d) theme, with new Repayment    */
/*         Stats / Representative-example content below it.           */
/*  Wizard = the full FCTL flow (unchanged).                           */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietorship", "Partnership", "Pvt Ltd", "LLP", "Others"];
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "Others"];
const PURPOSES = [
  "Capital Expenditure",
  "Machinery Import",
  "Overseas Investment",
  "Refinancing",
  "Working Capital",
  "Others",
];
const TENURES = ["1 year", "3 years", "5 years", "7 years", "10 years", "Custom"];
const COLLATERAL_TYPES = ["Residential", "Commercial", "Industrial", "Corporate Guarantee"];

// CIBIL threshold below which the journey ends with a rejection.
const CIBIL_THRESHOLD = 700;

const STEP_LABELS = [
  "Basic",
  "PAN",
  "Entity PAN",
  "CIBIL",
  "Loan Details",
  "Turnover",
  "Collateral",
  "Documents",
  "Review",
];

// ── Repayment period, loan amount range & interest rate ─────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "12 months (1 year)" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "120 months (10 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹250,00,00,000" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "5.75% per annum" },
];

// ── Representative example ───────────────────────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Foreign Currency Term Loan (FCTL)" },
  { feature: "Loan Amount", details: "USD 500,000 (or equivalent)" },
  { feature: "Purpose", details: "Capital Expenditure, Machinery Import, Overseas Investment, Refinancing & Working Capital" },
  { feature: "Annual Interest Rate (Indicative)", details: "SOFR + 5.00% p.a. (approx.)" },
  { feature: "Loan Tenure", details: "60 months (5 years)" },
  { feature: "Monthly Installment (EMI)", details: "As per foreign currency repayment schedule" },
  { feature: "Total Amount Payable", details: "Based on applicable exchange rate and interest during the loan tenure" },
  { feature: "Processing Fee", details: "0.25% – 1% of loan amount" },
  { feature: "Collateral Requirement", details: "Property / Business Assets / Corporate Guarantee, as applicable" },
  { feature: "Repayment", details: "Monthly / Quarterly installments in foreign currency or equivalent, subject to lender terms" },
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

const initialForm = {
  // 1 — basic
  entity: "",
  entityOther: "",
  incorpDate: "",
  // 2 — PAN (Individual)
  individualPan: "",
  // 3 — PAN (Entity) — only if non-proprietorship
  entityPan: "",
  // 4 — CIBIL
  cibilConsent: false,
  // 5 — loan details
  gst: "",
  loanFcyAmount: "",
  currency: "",
  currencyOther: "",
  purpose: "",
  purposeOther: "",
  tenure: "",
  tenureCustom: "",
  // 6 — turnover
  prevTurnover: "",
  currentTurnover: "",
  projectedTurnover: "",
  // 7 — collateral (only if secured)
  collateralRequired: "", // "Secured" | "Unsecured"
  collateralType: "",
  ownershipDetails: "",
  marketValue: "",
  freeFromCharge: "",
  // 8 — documents
  docBankStatement: "",
  docFinancials: "",
  docItr: "",
  docImportOrder: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isProprietor(form) {
  return form.entity === "Proprietorship";
}
function isSecured(form) {
  return form.collateralRequired === "Secured";
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.entity) e.entity = "Select the type of entity.";
    if (form.entity === "Others" && !form.entityOther.trim())
      e.entityOther = "Please specify the entity type.";
    if (!form.incorpDate) e.incorpDate = "Date of incorporation is required.";
    else if (new Date(form.incorpDate) > new Date())
      e.incorpDate = "Date cannot be in the future.";
  }

  if (step === 2) {
    if (!form.individualPan.trim()) e.individualPan = "PAN is required for CIBIL fetch.";
    else if (!PAN_RE.test(form.individualPan.trim().toUpperCase()))
      e.individualPan = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 3) {
    if (!isProprietor(form)) {
      if (!form.entityPan.trim()) e.entityPan = "Entity PAN is required.";
      else if (!PAN_RE.test(form.entityPan.trim().toUpperCase()))
        e.entityPan = "Enter a valid PAN (e.g. AAAAA0000A).";
    }
  }

  if (step === 4) {
    if (!form.cibilConsent)
      e.cibilConsent = "Consent is required to fetch your CIBIL score.";
  }

  if (step === 5) {
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
    if (!form.loanFcyAmount.trim())
      e.loanFcyAmount = "Loan amount (foreign currency) is required.";
    else if (!/^\d+(\.\d+)?$/.test(form.loanFcyAmount))
      e.loanFcyAmount = "Enter a valid amount.";
    if (!form.currency) e.currency = "Select a currency.";
    if (form.currency === "Others" && !form.currencyOther.trim())
      e.currencyOther = "Please specify the currency.";
    if (!form.purpose) e.purpose = "Select the purpose of the loan.";
    if (form.purpose === "Others" && !form.purposeOther.trim())
      e.purposeOther = "Please specify the purpose.";
    if (!form.tenure) e.tenure = "Select a tenure.";
    if (form.tenure === "Custom") {
      if (!form.tenureCustom.trim()) e.tenureCustom = "Enter tenure in months.";
      else if (!/^\d+$/.test(form.tenureCustom))
        e.tenureCustom = "Enter a valid number of months.";
    }
  }

  if (step === 6) {
    if (!form.prevTurnover.trim())
      e.prevTurnover = "Previous FY turnover is required.";
    else if (!/^\d+$/.test(form.prevTurnover))
      e.prevTurnover = "Enter a valid amount.";
    if (!form.currentTurnover.trim())
      e.currentTurnover = "Current FY turnover is required.";
    else if (!/^\d+$/.test(form.currentTurnover))
      e.currentTurnover = "Enter a valid amount.";
    if (!form.projectedTurnover.trim())
      e.projectedTurnover = "Projected turnover is required.";
    else if (!/^\d+$/.test(form.projectedTurnover))
      e.projectedTurnover = "Enter a valid amount.";
  }

  if (step === 7) {
    if (!form.collateralRequired)
      e.collateralRequired = "Select secured or unsecured.";
    if (isSecured(form)) {
      if (!form.collateralType) e.collateralType = "Select collateral type.";
      if (!form.ownershipDetails.trim())
        e.ownershipDetails = "Ownership details are required.";
      if (!form.marketValue.trim()) e.marketValue = "Market value is required.";
      else if (!/^\d+$/.test(form.marketValue))
        e.marketValue = "Enter a valid amount.";
      if (!form.freeFromCharge)
        e.freeFromCharge = "Select whether the property is free from charge.";
    }
  }

  if (step === 8) {
    if (!form.docBankStatement)
      e.docBankStatement = "Bank statements (12 months) are required.";
    if (!form.docFinancials)
      e.docFinancials = "Financials (Balance Sheet, P&L) are required.";
    if (!form.docItr) e.docItr = "ITR is required.";
  }

  return e;
}

/* Simulated CIBIL fetch (consistent demo score from PAN).               */
function fetchCibilScore(pan) {
  let sum = 0;
  for (const ch of pan.toUpperCase()) sum += ch.charCodeAt(0);
  return 600 + (sum % 250); // range 600–849
}

export default function ForeignCurrencyTermLoan() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
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

  // Move forward; skip Entity PAN (3) when proprietor.
  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    // After CIBIL consent (step 4): fetch score and gate the journey.
    if (step === 4) {
      const score = fetchCibilScore(form.individualPan);
      setCibilScore(score);
      if (score < CIBIL_THRESHOLD) {
        setRejected(true);
        return;
      }
    }

    setStep((s) => {
      if (s === 2 && isProprietor(form)) return 4; // skip entity PAN
      return Math.min(s + 1, 9);
    });
  };

  const back = () => {
    setErrors({});
    setStep((s) => {
      if (s === 4 && isProprietor(form)) return 2; // skip entity PAN
      return Math.max(s - 1, 1);
    });
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    for (let s = 1; s <= 8; s++) {
      if (s === 3 && isProprietor(form)) continue; // entity PAN skipped
      const e = validateStep(s, form);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(s);
        return;
      }
    }
    setErrors({});
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setSubmitted(false);
    setRejected(false);
    setCibilScore(null);
    setStarted(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : rejected ? (
          <Rejected score={cibilScore} onReset={reset} />
        ) : submitted ? (
          <Success onReset={reset} />
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
              Foreign Currency{" "}
              <span className="text-[#e8112d]">Term Loan</span>{" "}
              <span className="text-[#001f54]">(FCTL)</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Fund capital expenditure, machinery imports, overseas investment,
              refinancing and working capital in foreign currency — at
              competitive rates linked to international benchmarks.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/fctl-loan.jpg"
                alt="Foreign Currency Term Loan"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Foreign Currency Funding"
                text="Competitive FCY term loans linked to international benchmarks."
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
              Start your FCTL application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              FCTL — Foreign Currency Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund your{" "}
              <span className="text-[#e8112d]">expansion</span> in FCY
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
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

        {/* ── REPAYMENT PERIOD, LOAN AMOUNT & INTEREST RATE ── */}
        <section className="py-10 border-t mt-10">
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

        {/* ── REPRESENTATIVE EXAMPLE ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Representative Example</h2>
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
  const isReview = step === 9;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepPanIndividual form={form} set={set} errors={errors} />}
        {step === 3 && <StepPanEntity form={form} set={set} errors={errors} />}
        {step === 4 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepLoanDetails form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 6 && <StepTurnover form={form} set={set} errors={errors} />}
        {step === 7 && <StepCollateral form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 8 && <StepDocuments form={form} setFile={setFile} errors={errors} />}
        {step === 9 && <StepReview form={form} goToStep={goToStep} />}

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
              {step === 8 ? "Review details" : step === 4 ? "Check CIBIL & continue" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Submit application <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper({ step }) {
  return (
    <div className="flex items-center justify-between overflow-x-auto">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
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

const onlyDigits = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/\D/g, "") } });
const onlyDecimal = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/[^\d.]/g, "") } });

/* ---------- Step 1: Basic ---------- */

function StepBasic({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Basic details</h2>

      <Field label="Type of entity" error={errors.entity}>
        <Pills value={form.entity} onSelect={setChoice("entity")} options={ENTITY_TYPES} />
      </Field>

      {form.entity === "Others" && (
        <Field label="Please specify entity type" error={errors.entityOther}>
          <Text
            value={form.entityOther}
            onChange={set("entityOther")}
            placeholder="Specify entity type"
            error={errors.entityOther}
          />
        </Field>
      )}

      <Field label="Date of incorporation" error={errors.incorpDate}>
        <Text
          type="date"
          value={form.incorpDate}
          onChange={set("incorpDate")}
          max={new Date().toISOString().split("T")[0]}
          error={errors.incorpDate}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 2: PAN (Individual) ---------- */

function StepPanIndividual({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Individual)</h2>
      <Field label="PAN Number" hint="Used for CIBIL fetch" error={errors.individualPan}>
        <Text
          value={form.individualPan}
          onChange={(e) =>
            set("individualPan")({
              target: {
                value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
              },
            })
          }
          placeholder="ABCDE1234F"
          error={errors.individualPan}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 3: PAN (Entity) — only if non-proprietorship ---------- */

function StepPanEntity({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Entity)</h2>
      <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Entity PAN is required for non-proprietorship firms.
      </p>
      <Field label="Entity PAN Number" error={errors.entityPan}>
        <Text
          value={form.entityPan}
          onChange={(e) =>
            set("entityPan")({
              target: {
                value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
              },
            })
          }
          placeholder="AAAAA0000A"
          error={errors.entityPan}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 4: CIBIL consent ---------- */

function StepCibil({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Credit Bureau Check (CIBIL)</h2>
      <p className="text-sm text-slate-600">
        We use your Individual PAN to fetch your CIBIL score. A minimum score is
        required to proceed.
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

/* ---------- Step 5: Loan details ---------- */

function StepLoanDetails({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan details</h2>

      <Field label="GST Number" error={errors.gst}>
        <Text
          value={form.gst}
          onChange={(e) =>
            set("gst")({
              target: {
                value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15),
              },
            })
          }
          placeholder="22AAAAA0000A1Z5"
          error={errors.gst}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Loan amount required (foreign currency)" error={errors.loanFcyAmount}>
          <Text
            value={form.loanFcyAmount}
            onChange={onlyDecimal(set("loanFcyAmount"))}
            placeholder="e.g. 500000"
            inputMode="decimal"
            error={errors.loanFcyAmount}
          />
        </Field>
        <Field label="Currency" error={errors.currency}>
          <Select
            value={form.currency}
            onChange={set("currency")}
            options={CURRENCIES}
            placeholder="Select currency"
            error={errors.currency}
          />
        </Field>
      </div>

      {form.currency === "Others" && (
        <Field label="Please specify currency" error={errors.currencyOther}>
          <Text
            value={form.currencyOther}
            onChange={set("currencyOther")}
            placeholder="Specify currency (e.g. AED, SGD)"
            error={errors.currencyOther}
          />
        </Field>
      )}

      <Field label="Purpose of loan" error={errors.purpose}>
        <Pills value={form.purpose} onSelect={setChoice("purpose")} options={PURPOSES} />
      </Field>

      {form.purpose === "Others" && (
        <Field label="Please specify purpose" error={errors.purposeOther}>
          <Text
            value={form.purposeOther}
            onChange={set("purposeOther")}
            placeholder="Specify purpose"
            error={errors.purposeOther}
          />
        </Field>
      )}

      <Field label="Tenure required" error={errors.tenure}>
        <Pills value={form.tenure} onSelect={setChoice("tenure")} options={TENURES} />
      </Field>

      {form.tenure === "Custom" && (
        <Field label="Custom tenure (months)" error={errors.tenureCustom}>
          <Text
            value={form.tenureCustom}
            onChange={onlyDigits(set("tenureCustom"))}
            placeholder="e.g. 84"
            inputMode="numeric"
            error={errors.tenureCustom}
          />
        </Field>
      )}
    </div>
  );
}

/* ---------- Step 6: Turnover ---------- */

function StepTurnover({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Turnover details</h2>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Previous FY turnover" error={errors.prevTurnover}>
          <Text
            value={form.prevTurnover}
            onChange={onlyDigits(set("prevTurnover"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.prevTurnover}
          />
        </Field>
        <Field label="Current FY turnover (till date)" error={errors.currentTurnover}>
          <Text
            value={form.currentTurnover}
            onChange={onlyDigits(set("currentTurnover"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.currentTurnover}
          />
        </Field>
        <Field label="Projected turnover (current FY)" error={errors.projectedTurnover}>
          <Text
            value={form.projectedTurnover}
            onChange={onlyDigits(set("projectedTurnover"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.projectedTurnover}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 7: Collateral (choose secured / unsecured) ---------- */

function StepCollateral({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Collateral</h2>
      <p className="text-sm text-slate-600">
        Depending on lender rules, FCTL may be secured or unsecured. Select your
        applicable option.
      </p>

      <Field label="Loan type" error={errors.collateralRequired}>
        <Pills
          value={form.collateralRequired}
          onSelect={setChoice("collateralRequired")}
          options={["Secured", "Unsecured"]}
        />
      </Field>

      {isSecured(form) && (
        <>
          <Field label="Collateral type" error={errors.collateralType}>
            <Pills value={form.collateralType} onSelect={setChoice("collateralType")} options={COLLATERAL_TYPES} />
          </Field>
          <Field label="Ownership details" error={errors.ownershipDetails}>
            <Text value={form.ownershipDetails} onChange={set("ownershipDetails")} placeholder="e.g. Self-owned / Co-owned" error={errors.ownershipDetails} />
          </Field>
          <Field label="Market value" error={errors.marketValue}>
            <Text value={form.marketValue} onChange={onlyDigits(set("marketValue"))} placeholder="₹ in INR" inputMode="numeric" error={errors.marketValue} />
          </Field>
          <Field label="Property free from charge?" error={errors.freeFromCharge}>
            <Pills value={form.freeFromCharge} onSelect={setChoice("freeFromCharge")} options={["Yes", "No"]} />
          </Field>
        </>
      )}

      {form.collateralRequired === "Unsecured" && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Unsecured FCTL selected — no collateral details needed.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 8: Documents ---------- */

function StepDocuments({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Financial documents</h2>
      <p className="text-sm text-slate-500">Upload the documents below (manual upload).</p>

      <FileRow
        label="Bank Statements (12 months)"
        required
        name={form.docBankStatement}
        onChange={setFile("docBankStatement")}
        error={errors.docBankStatement}
      />
      <FileRow
        label="Financials (Balance Sheet, P&L)"
        required
        name={form.docFinancials}
        onChange={setFile("docFinancials")}
        error={errors.docFinancials}
      />
      <FileRow
        label="ITR"
        required
        name={form.docItr}
        onChange={setFile("docItr")}
        error={errors.docItr}
      />
      <FileRow
        label="Import order / overseas invoice (if applicable)"
        name={form.docImportOrder}
        onChange={setFile("docImportOrder")}
      />
    </div>
  );
}

/* ---------- Step 9: Review ---------- */

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
  const proprietor = isProprietor(form);
  const secured = isSecured(form);
  const entityLabel =
    form.entity === "Others" && form.entityOther
      ? `Others — ${form.entityOther}`
      : form.entity;
  const currencyLabel =
    form.currency === "Others" && form.currencyOther
      ? `Others — ${form.currencyOther}`
      : form.currency;
  const purposeLabel =
    form.purpose === "Others" && form.purposeOther
      ? `Others — ${form.purposeOther}`
      : form.purpose;
  const tenureLabel =
    form.tenure === "Custom"
      ? form.tenureCustom && `${form.tenureCustom} months`
      : form.tenure;

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
        title="Basic details"
        stepNo={1}
        goToStep={goToStep}
        rows={[
          ["Type of entity", entityLabel],
          ["Date of incorporation", form.incorpDate],
        ]}
      />
      <ReviewBlock
        title="PAN (Individual)"
        stepNo={2}
        goToStep={goToStep}
        rows={[["PAN", form.individualPan]]}
      />
      {!proprietor && (
        <ReviewBlock
          title="PAN (Entity)"
          stepNo={3}
          goToStep={goToStep}
          rows={[["Entity PAN", form.entityPan]]}
        />
      )}
      <ReviewBlock
        title="CIBIL"
        stepNo={4}
        goToStep={goToStep}
        rows={[["Consent", form.cibilConsent ? "Given" : "Not given"]]}
      />
      <ReviewBlock
        title="Loan details"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["GST Number", form.gst],
          ["Loan amount (FCY)", form.loanFcyAmount && `${form.loanFcyAmount} ${form.currency}`],
          ["Purpose", purposeLabel],
          ["Tenure", tenureLabel],
        ]}
      />
      <ReviewBlock
        title="Turnover"
        stepNo={6}
        goToStep={goToStep}
        rows={[
          ["Previous FY turnover", form.prevTurnover && `₹ ${form.prevTurnover}`],
          ["Current FY turnover", form.currentTurnover && `₹ ${form.currentTurnover}`],
          ["Projected turnover", form.projectedTurnover && `₹ ${form.projectedTurnover}`],
        ]}
      />
      <ReviewBlock
        title="Collateral"
        stepNo={7}
        goToStep={goToStep}
        rows={[
          ["Loan type", form.collateralRequired],
          ...(secured
            ? [
                ["Collateral type", form.collateralType],
                ["Ownership details", form.ownershipDetails],
                ["Market value", form.marketValue && `₹ ${form.marketValue}`],
                ["Free from charge?", form.freeFromCharge],
              ]
            : []),
        ]}
      />
      <ReviewBlock
        title="Financial documents"
        stepNo={8}
        goToStep={goToStep}
        rows={[
          ["Bank statements", form.docBankStatement],
          ["Financials", form.docFinancials],
          ["ITR", form.docItr],
          ["Import order", form.docImportOrder],
        ]}
      />
    </div>
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
          are unable to proceed with your FCTL application at this time. You can
          re-apply once your credit profile improves.
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
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-100 text-blue-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600">
          Our team will review your Foreign Currency Term Loan application and
          reach out within 24 hours.
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