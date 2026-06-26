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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Rupee / Foreign Currency Term Loan Page                            */
/*  Hero = lead capture (Name + Mobile), styled like the Bank          */
/*         Guarantee hero, with the foreign-currency term loan image.  */
/*  Wizard = the full term loan flow (steps combined into sections).   */
/* ------------------------------------------------------------------ */

const TURNOVER_BANDS = [
  "Below ₹1 Cr",
  "₹1–10 Cr",
  "₹10–50 Cr",
  "₹50–250 Cr",
  "Above ₹250 Cr",
];
const INDUSTRIES = [
  "Manufacturing",
  "Trading",
  "Services",
  "IT / ITeS",
  "Pharma",
  "Textiles",
  "Engineering",
  "Others",
];
const PURPOSES = [
  "Financial Capital Expenditure",
  "Refinance",
  "Overseas Investment",
  "Working Capital Requirement",
];
const CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY"];
const DOC_METHODS = ["Fetch securely via Accumn (OTP)", "Upload manually"];

// CIBIL threshold below which the journey ends with a rejection.
const CIBIL_THRESHOLD = 700;

const STEP_LABELS = [
  "Basic",
  "KYC",
  "CIBIL",
  "GST",
  "Documents",
  "Review",
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_RE = /^\d{12}$/;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

const initialForm = {
  // 1 — basic details (single combined form)
  companyName: "",
  companyPan: "",
  turnoverBand: "",
  industry: "",
  purpose: "",
  currency: "",
  exportPct: "",
  loanAmount: "",
  // 2 — KYC (company + individual PAN & Aadhaar)
  individualPan: "",
  aadhaar: "",
  aadhaarAddress: "",
  // 3 — CIBIL
  cibilConsent: false,
  // 4 — GST
  gst: "",
  gstAddressConfirmed: "", // "Yes" | "No"
  manualAddress: "",
  // 5 — financial documents
  docMethod: "",
  accumnOtpConsent: false,
  docBankStatement: "",
  docFinancials: "",
  docGstReturns: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isManualUpload(form) {
  return form.docMethod === "Upload manually";
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.companyName.trim()) e.companyName = "Company name is required.";
    if (!form.companyPan.trim()) e.companyPan = "Company PAN is required.";
    else if (!PAN_RE.test(form.companyPan.trim().toUpperCase()))
      e.companyPan = "Enter a valid PAN (e.g. AAAAA0000A).";
    if (!form.turnoverBand) e.turnoverBand = "Select a turnover band.";
    if (!form.industry) e.industry = "Select a primary industry.";
    if (!form.purpose) e.purpose = "Select the purpose of the loan.";
    if (!form.currency) e.currency = "Select a preferred currency.";
    if (!form.exportPct.trim()) e.exportPct = "Export % of revenue is required.";
    else if (
      !/^\d+(\.\d+)?$/.test(form.exportPct) ||
      +form.exportPct < 0 ||
      +form.exportPct > 100
    )
      e.exportPct = "Enter a value between 0 and 100.";
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
  }

  if (step === 2) {
    if (!form.individualPan.trim()) e.individualPan = "Individual PAN is required.";
    else if (!PAN_RE.test(form.individualPan.trim().toUpperCase()))
      e.individualPan = "Enter a valid PAN (e.g. ABCDE1234F).";
    if (!form.aadhaar.trim()) e.aadhaar = "Aadhaar number is required.";
    else if (!AADHAAR_RE.test(form.aadhaar))
      e.aadhaar = "Enter a valid 12-digit Aadhaar number.";
    if (!form.aadhaarAddress.trim())
      e.aadhaarAddress = "Current residence address (from Aadhaar) is required.";
  }

  if (step === 3) {
    if (!form.cibilConsent)
      e.cibilConsent = "Consent is required to fetch your CIBIL score.";
  }

  if (step === 4) {
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
    if (form.gst.trim() && !form.gstAddressConfirmed)
      e.gstAddressConfirmed = "Please confirm your business address.";
    if (form.gstAddressConfirmed === "No" && !form.manualAddress.trim())
      e.manualAddress = "Enter your current business address.";
  }

  if (step === 5) {
    if (!form.docMethod) e.docMethod = "Select how to share your documents.";
    if (form.docMethod === "Fetch securely via Accumn (OTP)" && !form.accumnOtpConsent)
      e.accumnOtpConsent = "OTP / Accumn consent is required.";
    if (isManualUpload(form)) {
      if (!form.docBankStatement) e.docBankStatement = "Upload bank statements.";
      if (!form.docFinancials) e.docFinancials = "Upload financials.";
      if (!form.docGstReturns) e.docGstReturns = "Upload GST returns.";
    }
  }

  return e;
}

/* Simulated CIBIL fetch. Replace with real API in production.            */
/* Returns a deterministic score from the PAN so the demo is consistent.  */
function fetchCibilScore(pan) {
  let sum = 0;
  for (const ch of pan.toUpperCase()) sum += ch.charCodeAt(0);
  return 600 + (sum % 250); // range 600–849
}

export default function ForeignCurrencyLoan() {
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

  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    // After CIBIL consent (step 3): fetch score and gate the journey.
    if (step === 3) {
      const score = fetchCibilScore(form.individualPan);
      setCibilScore(score);
      if (score < CIBIL_THRESHOLD) {
        setRejected(true);
        return;
      }
    }

    setStep((s) => Math.min(s + 1, 6));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    for (let s = 1; s <= 5; s++) {
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
              Rupee / Foreign Currency{" "}
              <span className="text-blue-600">Term Loans</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Term loans to meet your various capex requirements — in INR or
              foreign currency. For capital expenditure, refinance, overseas
              investment and working capital, with expert support at every step.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/foreign-currency-loan.jpg"
                alt="Rupee / Foreign Currency Term Loans"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="INR & Foreign Currency"
                text="Choose the currency that best suits your capex and trade needs."
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
              Start your Term Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Term Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund your <span className="text-blue-600">capex</span> with the right
              term loan
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
/*  WIZARD                                                             */
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
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepKyc form={form} set={set} errors={errors} />}
        {step === 3 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
        {step === 4 && <StepGst form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepDocuments form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
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
              {step === 5 ? "Review details" : step === 3 ? "Check CIBIL & continue" : "Continue"}{" "}
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
const onlyDecimal = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/[^\d.]/g, "") } });

/* ---------- Step 1: Basic details (single combined form) ---------- */

function StepBasic({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Basic details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" error={errors.companyName}>
          <Text
            value={form.companyName}
            onChange={set("companyName")}
            placeholder="Company name"
            error={errors.companyName}
          />
        </Field>
        <Field label="Company PAN" error={errors.companyPan}>
          <Text
            value={form.companyPan}
            onChange={(e) =>
              set("companyPan")({
                target: {
                  value: e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 10),
                },
              })
            }
            placeholder="AAAAA0000A"
            error={errors.companyPan}
          />
        </Field>
      </div>

      <Field label="Turnover band" error={errors.turnoverBand}>
        <Pills
          value={form.turnoverBand}
          onSelect={setChoice("turnoverBand")}
          options={TURNOVER_BANDS}
        />
      </Field>

      <Field label="Primary industry" error={errors.industry}>
        <Select
          value={form.industry}
          onChange={set("industry")}
          options={INDUSTRIES}
          placeholder="Select industry"
          error={errors.industry}
        />
      </Field>

      <Field label="Purpose" error={errors.purpose}>
        <Pills value={form.purpose} onSelect={setChoice("purpose")} options={PURPOSES} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Preferred currency" error={errors.currency}>
          <Select
            value={form.currency}
            onChange={set("currency")}
            options={CURRENCIES}
            placeholder="Select"
            error={errors.currency}
          />
        </Field>
        <Field label="Export % of revenue" error={errors.exportPct}>
          <Text
            value={form.exportPct}
            onChange={onlyDecimal(set("exportPct"))}
            placeholder="e.g. 40"
            inputMode="decimal"
            error={errors.exportPct}
          />
        </Field>
        <Field label="Loan amount" error={errors.loanAmount}>
          <Text
            value={form.loanAmount}
            onChange={onlyDigits(set("loanAmount"))}
            placeholder="₹ / amount"
            inputMode="numeric"
            error={errors.loanAmount}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 2: KYC (Company + Individual PAN & Aadhaar) ---------- */

function StepKyc({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">KYC — PAN &amp; Aadhaar</h2>
      <p className="text-sm text-slate-500">
        Aadhaar must carry your current residence address.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Individual PAN" hint="Used for CIBIL fetch" error={errors.individualPan}>
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
        <Field label="Aadhaar number" error={errors.aadhaar}>
          <Text
            value={form.aadhaar}
            onChange={onlyDigits(set("aadhaar"))}
            placeholder="12-digit Aadhaar"
            inputMode="numeric"
            maxLength={12}
            error={errors.aadhaar}
          />
        </Field>
      </div>

      <Field
        label="Current residence address (from Aadhaar)"
        error={errors.aadhaarAddress}
      >
        <TextArea
          value={form.aadhaarAddress}
          onChange={set("aadhaarAddress")}
          placeholder="Address as on Aadhaar"
          error={errors.aadhaarAddress}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 3: CIBIL consent ---------- */

function StepCibil({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Credit Bureau Check (CIBIL)</h2>
      <p className="text-sm text-slate-600">
        We use your Individual PAN to fetch your CIBIL score. A minimum score is
        required to proceed to financial documentation.
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

/* ---------- Step 4: GST ---------- */

function StepGst({ form, set, setChoice, errors }) {
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

      <Field
        label="Is this GST registered address your current business location?"
        error={errors.gstAddressConfirmed}
      >
        <Pills
          value={form.gstAddressConfirmed}
          onSelect={setChoice("gstAddressConfirmed")}
          options={["Yes", "No"]}
        />
      </Field>

      {form.gstAddressConfirmed === "No" && (
        <Field label="Current business address" error={errors.manualAddress}>
          <TextArea
            value={form.manualAddress}
            onChange={set("manualAddress")}
            placeholder="Enter current business address"
            error={errors.manualAddress}
          />
        </Field>
      )}
    </div>
  );
}

/* ---------- Step 5: Financial document collection ---------- */

function StepDocuments({ form, set, setChoice, setFile, errors }) {
  const manual = isManualUpload(form);
  const accumn = form.docMethod === "Fetch securely via Accumn (OTP)";
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Financial document collection</h2>

      <Field label="How would you like to share your documents?" error={errors.docMethod}>
        <Pills value={form.docMethod} onSelect={setChoice("docMethod")} options={DOC_METHODS} />
      </Field>

      {accumn && (
        <>
          <label
            className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${
              form.accumnOtpConsent ? "border-blue-600 bg-blue-50" : "border-slate-200"
            }`}
          >
            <input
              type="checkbox"
              checked={form.accumnOtpConsent}
              onChange={(e) => setChoice("accumnOtpConsent")(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-sm text-slate-700">
              I consent to a secure, OTP-based fetch of my bank statements and
              financials via Accumn.
            </span>
          </label>
          {errors.accumnOtpConsent && <ErrorText>{errors.accumnOtpConsent}</ErrorText>}

          {form.accumnOtpConsent && (
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                On submit, you'll be redirected to Accumn's secure OTP-based
                fetch to auto-import your documents.
              </span>
            </div>
          )}
        </>
      )}

      {manual && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Upload the documents below.</p>
          <FileRow
            label="Bank statements"
            required
            name={form.docBankStatement}
            onChange={setFile("docBankStatement")}
            error={errors.docBankStatement}
          />
          <FileRow
            label="Financials"
            required
            name={form.docFinancials}
            onChange={setFile("docFinancials")}
            error={errors.docFinancials}
          />
          <FileRow
            label="GST Returns"
            required
            name={form.docGstReturns}
            onChange={setFile("docGstReturns")}
            error={errors.docGstReturns}
          />
        </div>
      )}
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
          ["Company name", form.companyName],
          ["Company PAN", form.companyPan],
          ["Turnover band", form.turnoverBand],
          ["Primary industry", form.industry],
          ["Purpose", form.purpose],
          ["Preferred currency", form.currency],
          ["Export % of revenue", form.exportPct && `${form.exportPct}%`],
          ["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`],
        ]}
      />
      <ReviewBlock
        title="KYC — PAN & Aadhaar"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Individual PAN", form.individualPan],
          ["Aadhaar", form.aadhaar],
          ["Residence address", form.aadhaarAddress],
        ]}
      />
      <ReviewBlock
        title="CIBIL"
        stepNo={3}
        goToStep={goToStep}
        rows={[["Consent", form.cibilConsent ? "Given" : "Not given"]]}
      />
      <ReviewBlock
        title="GST"
        stepNo={4}
        goToStep={goToStep}
        rows={[
          ["GST Number", form.gst],
          ["Address confirmed?", form.gstAddressConfirmed],
          ...(form.gstAddressConfirmed === "No"
            ? [["Current address", form.manualAddress]]
            : []),
        ]}
      />
      <ReviewBlock
        title="Financial documents"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["Method", form.docMethod],
          ...(form.docMethod === "Fetch securely via Accumn (OTP)"
            ? [["Accumn / OTP consent", form.accumnOtpConsent ? "Given" : "Not given"]]
            : [
                ["Bank statements", form.docBankStatement],
                ["Financials", form.docFinancials],
                ["GST Returns", form.docGstReturns],
              ]),
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
          are unable to proceed with your term loan application at this time. You
          can re-apply once your credit profile improves.
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
          Our team will review your Term Loan application and reach out within 24
          hours.
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