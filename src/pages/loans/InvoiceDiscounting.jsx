

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
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Invoice Discounting Page                                           */
/*  Hero = lead capture (Name + Mobile), styled like the previous      */
/*         loan heroes, with the invoice discounting image.            */
/*  Wizard = the full Invoice Discounting flow.                        */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
const BUSINESS_TYPES = ["Trader", "Manufacturer", "Service Provider"];
const FACILITY_TYPES = ["Fresh", "Renewable", "Enhancement"];
const ID_FACILITY_TYPES = ["Invoice Discounting", "Bill Discounting", "Factoring"];

// Eligible disbursement is 80–90% of invoice value as per lender rules.
const ELIGIBLE_MIN = 0.8;
const ELIGIBLE_MAX = 0.9;
// Invoice date must be within the last N days.
const INVOICE_MAX_AGE_DAYS = 60;

const STEP_LABELS = [
  "Basic",
  "PAN",
  "Entity PAN",
  "GST",
  "Invoice",
  "Turnover",
  "Documents",
  "Review",
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

const initialForm = {
  // 1 — basic
  entity: "",
  entityOther: "",
  facilityType: "",
  businessType: "",
  incorpDate: "",
  idFacilityType: "",
  // 2 — PAN (Individual)
  individualPan: "",
  // 3 — PAN (Entity) — only if non-proprietorship
  entityPan: "",
  // 4 — GST
  gst: "",
  legalName: "",
  tradeName: "",
  businessAddress: "",
  constitution: "",
  gstStatus: "",
  // 5 — invoice details
  invoiceAmount: "",
  invoiceDate: "",
  dueDate: "",
  invoiceFile: "", // filename (duplicates rejected)
  // 6 — turnover + loan
  prevTurnover: "",
  currentTurnover: "",
  projectedTurnover: "",
  loanAmount: "",
  // 7 — financial documents
  docBankStatement: "",
  docGstReturns: "",
  docFinancials: "",
  docBuyerLedger: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isProprietor(form) {
  return form.entity === "Proprietor";
}

function daysBetween(a, b) {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

// Tenor = Due Date − Today (in days).
function tenorDays(form) {
  if (!form.dueDate) return null;
  const today = new Date().toISOString().split("T")[0];
  return daysBetween(today, form.dueDate);
}

function eligibleRange(amount) {
  const amt = Number(amount);
  if (!amt) return null;
  return {
    min: Math.round(amt * ELIGIBLE_MIN),
    max: Math.round(amt * ELIGIBLE_MAX),
  };
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
    if (!form.facilityType) e.facilityType = "Select a facility type.";
    if (!form.businessType) e.businessType = "Select the type of business.";
    if (!form.incorpDate) e.incorpDate = "Date of incorporation is required.";
    else if (new Date(form.incorpDate) > new Date())
      e.incorpDate = "Date cannot be in the future.";
    if (!form.idFacilityType)
      e.idFacilityType = "Select the invoice discounting facility type.";
  }

  if (step === 2) {
    if (!form.individualPan.trim()) e.individualPan = "PAN is required for CIBIL pull.";
    else if (!PAN_RE.test(form.individualPan.trim().toUpperCase()))
      e.individualPan = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 3) {
    // Only when non-proprietorship; proprietor skips this step.
    if (!isProprietor(form)) {
      if (!form.entityPan.trim()) e.entityPan = "Entity PAN is required.";
      else if (!PAN_RE.test(form.entityPan.trim().toUpperCase()))
        e.entityPan = "Enter a valid PAN (e.g. AAAAA0000A).";
    }
  }

  if (step === 4) {
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
    if (!form.legalName.trim()) e.legalName = "Legal name is required.";
    if (!form.businessAddress.trim())
      e.businessAddress = "Business address is required.";
  }

  if (step === 5) {
    if (!form.invoiceAmount.trim()) e.invoiceAmount = "Invoice amount is required.";
    else if (!/^\d+$/.test(form.invoiceAmount))
      e.invoiceAmount = "Enter a valid amount in numbers.";
    if (!form.invoiceDate) e.invoiceDate = "Invoice date is required.";
    else {
      const today = new Date().toISOString().split("T")[0];
      const age = daysBetween(form.invoiceDate, today);
      if (age < 0) e.invoiceDate = "Invoice date cannot be in the future.";
      else if (age > INVOICE_MAX_AGE_DAYS)
        e.invoiceDate = `Invoice must be within the last ${INVOICE_MAX_AGE_DAYS} days.`;
    }
    if (!form.dueDate) e.dueDate = "Due date is required.";
    else if (form.invoiceDate && new Date(form.dueDate) <= new Date(form.invoiceDate))
      e.dueDate = "Due date must be after the invoice date.";
    if (!form.invoiceFile) e.invoiceFile = "Upload the invoice.";
  }

  if (step === 6) {
    if (!form.prevTurnover.trim())
      e.prevTurnover = "Previous FY turnover is required.";
    else if (!/^\d+$/.test(form.prevTurnover))
      e.prevTurnover = "Enter a valid amount in numbers.";
    if (!form.currentTurnover.trim())
      e.currentTurnover = "Current FY turnover is required.";
    else if (!/^\d+$/.test(form.currentTurnover))
      e.currentTurnover = "Enter a valid amount in numbers.";
    if (!form.projectedTurnover.trim())
      e.projectedTurnover = "Projected turnover is required.";
    else if (!/^\d+$/.test(form.projectedTurnover))
      e.projectedTurnover = "Enter a valid amount in numbers.";
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount required is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
  }

  if (step === 7) {
    if (!form.docBankStatement)
      e.docBankStatement = "Last 12 months bank statements are required.";
    if (!form.docFinancials) e.docFinancials = "Financials are required.";
    if (!form.docBuyerLedger) e.docBuyerLedger = "Buyer ledger is required.";
  }

  return e;
}

export default function InvoiceDiscounting() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const setChoice = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  // Reject duplicate invoice uploads (same filename).
  const setInvoiceFile = (e) => {
    const fname = e.target.files?.[0]?.name || "";
    if (fname && fname === form.invoiceFile) {
      setErrors((p) => ({ ...p, invoiceFile: "Duplicate invoice — this file is already uploaded." }));
      return;
    }
    setForm((f) => ({ ...f, invoiceFile: fname }));
    setErrors((p) => ({ ...p, invoiceFile: undefined }));
  };

  const setFile = (key) => (e) => {
    const fname = e.target.files?.[0]?.name || "";
    setForm((f) => ({ ...f, [key]: fname }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  // Move forward; skip Entity PAN (step 3) when proprietor.
  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => {
      if (s === 2 && isProprietor(form)) return 4; // skip entity PAN
      return Math.min(s + 1, 8);
    });
  };

  // Move back; skip Entity PAN (step 3) when proprietor.
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
    for (let s = 1; s <= 7; s++) {
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
    setStarted(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <>
            <Hero onStart={() => setStarted(true)} />
            <RepaymentStats />
            <LoanCostTable />
          </>
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
            setInvoiceFile={setInvoiceFile}
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
/*  HERO (Name & Mobile capture) — Step 1 image                        */
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
              Unlock Cash with{" "}
              <span className="text-blue-600">Invoice Discounting</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Unlock up to 80–90% of your invoice value through fast and flexible invoice financing. Compare customized offers from leading Banks and NBFCs with expert support at every step. 

            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/invoice-discounting.jpg"
                alt="Invoice Discounting"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Up to 80–90% of Invoice Value"
                text="Fast access to working capital against your receivables."
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
            <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
              Start your Invoice Discounting application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Invoice Discounting
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Turn invoices into <span className="text-blue-600">working capital</span>
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
                  className="mt-0.5"
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
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
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
/*  Repayment Period, Loan Amount Range & Interest Rate                */
/* ------------------------------------------------------------------ */

const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "07 months" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "180 months (7 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹10,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹20,00,00,000" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "12% – 24% per annum" },
];

function RepaymentStats() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 border-t border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-5">
        Repayment Period, Loan Amount &amp; Interest Rate
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {repaymentStats.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Icon size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">{title}</p>
              <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Representative Example of Loan Cost                                 */
/* ------------------------------------------------------------------ */

const tableData = [
  { feature: "Loan Type", details: "Invoice Discounting / Bill Discounting" },
  { feature: "Invoice Amount", details: "₹50,00,000" },
  { feature: "Advance Percentage", details: "Up to 90% of invoice value" },
  { feature: "Amount Disbursed", details: "₹45,00,000" },
  { feature: "Annual Interest Rate (indicative)", details: "12% p.a" },
  { feature: "Discounting Period / Tenure", details: "60 days" },
  { feature: "Interest Cost for the Period", details: "₹88,800 (approx.)" },
  { feature: "Processing / Platform Fee", details: "0.25% – 2% of invoice value" },
  { feature: "Collateral Requirement", details: "Not Required (invoice-backed facility)" },
];

function LoanCostTable() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 border-t border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-5">
        Representative Example of Loan Cost
      </h2>
      <div className="rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-blue-50">
              <th className="text-left px-6 py-3 font-semibold text-blue-700 w-1/2">
                Feature
              </th>
              <th className="text-left px-6 py-3 font-semibold text-blue-700">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, i) => (
              <tr
                key={row.feature}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className="px-6 py-3.5 text-slate-700 font-medium border-t border-slate-100">
                  {row.feature}
                </td>
                <td className="px-6 py-3.5 text-slate-600 border-t border-slate-100">
                  {row.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  WIZARD                                                             */
/* ------------------------------------------------------------------ */

function Wizard({
  step,
  form,
  errors,
  set,
  setChoice,
  setFile,
  setInvoiceFile,
  next,
  back,
  goToStep,
  onSubmit,
}) {
  const isReview = step === 8;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepPanIndividual form={form} set={set} errors={errors} />}
        {step === 3 && <StepPanEntity form={form} set={set} errors={errors} />}
        {step === 4 && <StepGst form={form} set={set} errors={errors} />}
        {step === 5 && <StepInvoice form={form} set={set} setInvoiceFile={setInvoiceFile} errors={errors} />}
        {step === 6 && <StepTurnover form={form} set={set} errors={errors} />}
        {step === 7 && <StepDocuments form={form} setFile={setFile} errors={errors} />}
        {step === 8 && <StepReview form={form} goToStep={goToStep} />}

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
              {step === 7 ? "Review details" : "Continue"}{" "}
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
                    ? "bg-blue-600 text-white"
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
                  n < step ? "bg-blue-600" : "bg-slate-200"
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

function TextArea({ value, onChange, error, ...rest }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={3}
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
            {label} {required && <span className="text-red-500">*</span>}
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

/* ---------- Step 1: Basic details ---------- */

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

      <Field label="Facility type" error={errors.facilityType}>
        <Pills
          value={form.facilityType}
          onSelect={setChoice("facilityType")}
          options={FACILITY_TYPES}
        />
      </Field>

      <Field label="Type of business" error={errors.businessType}>
        <Pills
          value={form.businessType}
          onSelect={setChoice("businessType")}
          options={BUSINESS_TYPES}
        />
      </Field>

      <Field label="Date of incorporation" error={errors.incorpDate}>
        <Text
          type="date"
          value={form.incorpDate}
          onChange={set("incorpDate")}
          max={new Date().toISOString().split("T")[0]}
          error={errors.incorpDate}
        />
      </Field>

      <Field label="Type of invoice discounting facility" error={errors.idFacilityType}>
        <Pills
          value={form.idFacilityType}
          onSelect={setChoice("idFacilityType")}
          options={ID_FACILITY_TYPES}
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
      <Field label="PAN Number" hint="Mandatory for CIBIL pull" error={errors.individualPan}>
        <Text
          value={form.individualPan}
          onChange={(e) =>
            set("individualPan")({
              target: {
                value: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10),
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
        Entity PAN is required for non-proprietorship businesses.
      </p>
      <Field label="Entity PAN Number" error={errors.entityPan}>
        <Text
          value={form.entityPan}
          onChange={(e) =>
            set("entityPan")({
              target: {
                value: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10),
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

/* ---------- Step 4: GST ---------- */

function StepGst({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">GST details</h2>
      <Field
        label="GST Number"
        hint="Business details are verified against your GST"
        error={errors.gst}
      >
        <Text
          value={form.gst}
          onChange={(e) =>
            set("gst")({
              target: {
                value: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 15),
              },
            })
          }
          placeholder="22AAAAA0000A1Z5"
          error={errors.gst}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Legal name" error={errors.legalName}>
          <Text value={form.legalName} onChange={set("legalName")} placeholder="Legal name" error={errors.legalName} />
        </Field>
        <Field label="Trade name" hint="Optional">
          <Text value={form.tradeName} onChange={set("tradeName")} placeholder="Trade name" />
        </Field>
        <Field label="Constitution" hint="Optional">
          <Text value={form.constitution} onChange={set("constitution")} placeholder="e.g. Private Limited" />
        </Field>
        <Field label="Status" hint="Optional">
          <Text value={form.gstStatus} onChange={set("gstStatus")} placeholder="e.g. Active" />
        </Field>
      </div>

      <Field label="Business address" error={errors.businessAddress}>
        <TextArea
          value={form.businessAddress}
          onChange={set("businessAddress")}
          placeholder="Business address (you can edit manually)"
          error={errors.businessAddress}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 5: Invoice details ---------- */

function StepInvoice({ form, set, setInvoiceFile, errors }) {
  const tenor = tenorDays(form);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Invoice details</h2>

      <Field label="Invoice amount (₹)" error={errors.invoiceAmount}>
        <Text
          value={form.invoiceAmount}
          onChange={onlyDigits(set("invoiceAmount"))}
          placeholder="₹ invoice value"
          inputMode="numeric"
          error={errors.invoiceAmount}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Invoice date"
          hint={`Must be within the last ${INVOICE_MAX_AGE_DAYS} days`}
          error={errors.invoiceDate}
        >
          <Text
            type="date"
            value={form.invoiceDate}
            onChange={set("invoiceDate")}
            max={new Date().toISOString().split("T")[0]}
            error={errors.invoiceDate}
          />
        </Field>
        <Field label="Due date" error={errors.dueDate}>
          <Text
            type="date"
            value={form.dueDate}
            onChange={set("dueDate")}
            error={errors.dueDate}
          />
        </Field>
      </div>

      {tenor !== null && tenor >= 0 && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Tenor (auto-calculated): <span className="font-semibold">{tenor} days</span> (Due
          Date − Today)
        </p>
      )}

      <FileRow
        label="Upload invoice"
        required
        name={form.invoiceFile}
        onChange={setInvoiceFile}
        error={errors.invoiceFile}
      />
      <p className="text-xs text-slate-400">
        Duplicate invoice uploads are rejected. E-invoice auto-fetch can be enabled by
        your lender.
      </p>
    </div>
  );
}

/* ---------- Step 6: Turnover + loan ---------- */

function StepTurnover({ form, set, errors }) {
  const range = eligibleRange(form.invoiceAmount);
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

      <Field label="Loan amount required" error={errors.loanAmount}>
        <Text
          value={form.loanAmount}
          onChange={onlyDigits(set("loanAmount"))}
          placeholder="₹"
          inputMode="numeric"
          error={errors.loanAmount}
        />
      </Field>

      {range && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Eligible disbursement is up to 80–90% of invoice value as per lender rules —
          approx <span className="font-semibold">₹{range.min.toLocaleString("en-IN")}</span> to{" "}
          <span className="font-semibold">₹{range.max.toLocaleString("en-IN")}</span> for your
          invoice of ₹{Number(form.invoiceAmount).toLocaleString("en-IN")}.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 7: Financial document collection ---------- */

function StepDocuments({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Financial document collection</h2>
      <p className="text-sm text-slate-500">Manual upload (PDF, JPG or PNG).</p>

      <FileRow
        label="Last 12 months bank statements"
        required
        name={form.docBankStatement}
        onChange={setFile("docBankStatement")}
        error={errors.docBankStatement}
      />
      <FileRow
        label="GST returns"
        name={form.docGstReturns}
        onChange={setFile("docGstReturns")}
      />
      <FileRow
        label="Financials"
        required
        name={form.docFinancials}
        onChange={setFile("docFinancials")}
        error={errors.docFinancials}
      />
      <FileRow
        label="Buyer ledger"
        required
        name={form.docBuyerLedger}
        onChange={setFile("docBuyerLedger")}
        error={errors.docBuyerLedger}
      />
    </div>
  );
}

/* ---------- Step 8: Review ---------- */

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
  const tenor = tenorDays(form);
  const entityLabel =
    form.entity === "Others" && form.entityOther
      ? `Others — ${form.entityOther}`
      : form.entity;
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
          ["Facility type", form.facilityType],
          ["Type of business", form.businessType],
          ["Date of incorporation", form.incorpDate],
          ["ID facility type", form.idFacilityType],
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
        title="GST"
        stepNo={4}
        goToStep={goToStep}
        rows={[
          ["GST Number", form.gst],
          ["Legal name", form.legalName],
          ["Trade name", form.tradeName],
          ["Constitution", form.constitution],
          ["Status", form.gstStatus],
          ["Business address", form.businessAddress],
        ]}
      />
      <ReviewBlock
        title="Invoice details"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["Invoice amount", form.invoiceAmount && `₹ ${form.invoiceAmount}`],
          ["Invoice date", form.invoiceDate],
          ["Due date", form.dueDate],
          ["Tenor", tenor !== null && tenor >= 0 ? `${tenor} days` : ""],
          ["Invoice file", form.invoiceFile],
        ]}
      />
      <ReviewBlock
        title="Turnover details"
        stepNo={6}
        goToStep={goToStep}
        rows={[
          ["Previous FY turnover", form.prevTurnover && `₹ ${form.prevTurnover}`],
          ["Current FY turnover", form.currentTurnover && `₹ ${form.currentTurnover}`],
          ["Projected turnover", form.projectedTurnover && `₹ ${form.projectedTurnover}`],
          ["Loan amount required", form.loanAmount && `₹ ${form.loanAmount}`],
        ]}
      />
      <ReviewBlock
        title="Financial documents"
        stepNo={7}
        goToStep={goToStep}
        rows={[
          ["Bank statements", form.docBankStatement],
          ["GST returns", form.docGstReturns],
          ["Financials", form.docFinancials],
          ["Buyer ledger", form.docBuyerLedger],
        ]}
      />
    </div>
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
          Our team will review your Invoice Discounting application and reach out
          within 24 hours.
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