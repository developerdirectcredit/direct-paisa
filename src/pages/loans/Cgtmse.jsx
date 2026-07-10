

// =========== not add poster dc maine dc ka poster add kiya hai

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
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CGTMSE Page                                                        */
/*  Hero = lead capture (Name + Mobile), restyled to Agri Loan's       */
/*         navy (#001f54) / red (#e8112d) theme — heading, paragraph,  */
/*         poster image and feature list in the left column, plus new */
/*         Repayment Stats / Representative-cost-table content below. */
/*  Wizard = the full CGTMSE flow (unchanged).                         */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
const BUSINESS_TYPES = ["Trader", "Manufacturer", "Service Provider"];
const LOAN_TYPES = ["Fresh", "Balance Transfer"];

const STEP_LABELS = [
  "Basic",
  "PAN",
  "Udyam",
  "Entity PAN",
  "GST",
  "Loan Details",
  "Review",
];

// ── Repayment period, loan amount range & interest rate ─────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "12 months" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "120 months (10 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹200CR" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "Up to 12% per annum" },
];

// ── Representative example of loan cost ────────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "CGTMSE Loan" },
  { feature: "Loan Amount", details: "₹1,00,00,000" },
  { feature: "Purpose", details: "MSME Business Expansion / Working Capital / Machinery Purchase" },
  { feature: "Annual Interest Rate (Indicative)", details: "10.25% p.a." },
  { feature: "Loan Tenure", details: "84 months (7 years)" },
  { feature: "Monthly Installment (EMI)", details: "₹1,65,000 (approx.)" },
  { feature: "Total Amount Payable", details: "₹1,38,60,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹38,60,000 (approx.)" },
  { feature: "Processing Fee", details: "0.50% – 1.50% of loan amount" },
  { feature: "Collateral Requirement", details: "Generally covered under CGTMSE Guarantee Scheme (subject to eligibility)" },
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
// Udyam Registration No. format: UDYAM-XX-00-0000000
const UDYAM_RE = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;

const initialForm = {
  // 1 — basic
  entity: "",
  businessType: "",
  incorpDate: "",
  // 2 — PAN (Individual)
  panIndividual: "",
  // 3 — Udyam
  udyam: "",
  // 4 — PAN (Entity) — only if non-proprietorship
  panEntity: "",
  // 5 — GST
  gst: "",
  gstAddressConfirmed: "", // "Yes" | "No"
  manualAddress: "",
  // 6 — loan details
  loanAmount: "",
  loanType: "",
  prevTurnover: "",
  currentTurnover: "",
  projectedTurnover: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isProprietor(form) {
  return form.entity === "Proprietor";
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.entity) e.entity = "Select the type of entity.";
    if (!form.businessType) e.businessType = "Select the type of business.";
    if (!form.incorpDate) e.incorpDate = "Date of incorporation is required.";
    else if (new Date(form.incorpDate) > new Date())
      e.incorpDate = "Date cannot be in the future.";
  }

  if (step === 2) {
    if (!form.panIndividual.trim()) e.panIndividual = "PAN is required.";
    else if (!PAN_RE.test(form.panIndividual.trim().toUpperCase()))
      e.panIndividual = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 3) {
    if (!form.udyam.trim()) e.udyam = "Udyam Registration No. is required.";
    else if (!UDYAM_RE.test(form.udyam.trim().toUpperCase()))
      e.udyam = "Enter a valid Udyam No. (e.g. UDYAM-UP-00-0000000).";
  }

  if (step === 4) {
    // Only when non-proprietorship; proprietor skips this step.
    if (!isProprietor(form)) {
      if (!form.panEntity.trim()) e.panEntity = "Entity PAN is required.";
      else if (!PAN_RE.test(form.panEntity.trim().toUpperCase()))
        e.panEntity = "Enter a valid PAN (e.g. AAAAA0000A).";
    }
  }

  if (step === 5) {
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
    if (form.gst.trim() && !form.gstAddressConfirmed)
      e.gstAddressConfirmed = "Please confirm your business address.";
    if (form.gstAddressConfirmed === "No" && !form.manualAddress.trim())
      e.manualAddress = "Enter your current business address.";
  }

  if (step === 6) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
    if (!form.loanType) e.loanType = "Select a loan type.";
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
  }

  return e;
}

export default function Cgtmse() {
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

  // Move forward; skip Entity PAN (step 4) when proprietor.
  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => {
      if (s === 3 && isProprietor(form)) return 5; // skip entity PAN
      return Math.min(s + 1, 7);
    });
  };

  // Move back; skip Entity PAN (step 4) when proprietor.
  const back = () => {
    setErrors({});
    setStep((s) => {
      if (s === 5 && isProprietor(form)) return 3; // skip entity PAN
      return Math.max(s - 1, 1);
    });
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    // re-validate every data step before final submit
    for (let s = 1; s <= 6; s++) {
      if (s === 4 && isProprietor(form)) continue; // entity PAN skipped
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
          <Hero onStart={() => setStarted(true)} />
        ) : submitted ? (
          <Success onReset={reset} />
        ) : (
          <Wizard
            step={step}
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
/*  HERO — Agri Loan text+image layout (navy/red theme)                */
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
          {/* Left column — heading, paragraph, poster image, feature list */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              Collateral-Free{" "}
              <span className="text-[#e8112d]">CGTMSE Loan</span>{" "}
              <span className="text-[#001f54]">— Hassle-Free</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Unlock collateral-free financing for your MSME through the Government-backed CGTMSE scheme. 
              Compare customized loan offers from leading Banks and NBFCs, enjoy quicker approvals, 
              and receive dedicated expert support from application to disbursal. 

            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/cgtmse-poster.jpg"
                alt="CGTMSE Loan — Get the financial help you need"
                className="h-72 md:h-80 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="No Collateral Required"
                text="Backed by the Credit Guarantee Fund Trust for MSMEs."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Quick & Hassle Free"
                text="Get expert assistance for quick and smooth loan processing."
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
              Start your CGTMSE application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              CGTMSE
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get a collateral-free{" "}
              <span className="text-[#e8112d]">MSME loan</span>
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
                Continue <ArrowRight className="h-4 w-4" />
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
          <p className="mt-3 text-xs text-gray-400">*Subject to Credit Assessment / Profile</p>
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
  next,
  back,
  goToStep,
  onSubmit,
}) {
  const isReview = step === 7;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepPanIndividual form={form} set={set} errors={errors} />}
        {step === 3 && <StepUdyam form={form} set={set} errors={errors} />}
        {step === 4 && <StepPanEntity form={form} set={set} errors={errors} />}
        {step === 5 && <StepGst form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 6 && <StepLoanDetails form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 7 && <StepReview form={form} goToStep={goToStep} />}

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
              {step === 6 ? "Review details" : "Continue"}{" "}
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
    </div>
  );
}

/* ---------- Step 2: PAN (Individual) ---------- */

function StepPanIndividual({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Individual)</h2>
      <Field label="PAN Number" hint="Used for CIBIL fetch" error={errors.panIndividual}>
        <Text
          value={form.panIndividual}
          onChange={(e) =>
            set("panIndividual")({
              target: {
                value: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10),
              },
            })
          }
          placeholder="ABCDE1234F"
          error={errors.panIndividual}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 3: Udyam ---------- */

function StepUdyam({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Udyam Registration</h2>
      <Field
        label="Udyam Registration No."
        hint="Mandatory for CGTMSE (e.g. UDYAM-UP-00-0000000)"
        error={errors.udyam}
      >
        <Text
          value={form.udyam}
          onChange={(e) =>
            set("udyam")({
              target: { value: e.target.value.toUpperCase().slice(0, 19) },
            })
          }
          placeholder="UDYAM-UP-00-0000000"
          error={errors.udyam}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 4: PAN (Entity) — only if non-proprietorship ---------- */

function StepPanEntity({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Entity)</h2>
      <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Entity PAN is required for non-proprietorship businesses.
      </p>
      <Field label="Entity PAN Number" error={errors.panEntity}>
        <Text
          value={form.panEntity}
          onChange={(e) =>
            set("panEntity")({
              target: {
                value: e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z0-9]/g, "")
                  .slice(0, 10),
              },
            })
          }
          placeholder="AAAAA0000A"
          error={errors.panEntity}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 5: GST ---------- */

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

/* ---------- Step 6: Loan details ---------- */

function StepLoanDetails({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan details</h2>

      <Field label="Loan amount required" error={errors.loanAmount}>
        <Text
          value={form.loanAmount}
          onChange={onlyDigits(set("loanAmount"))}
          placeholder="₹ in INR"
          inputMode="numeric"
          error={errors.loanAmount}
        />
      </Field>

      <Field label="Loan type" error={errors.loanType}>
        <Pills value={form.loanType} onSelect={setChoice("loanType")} options={LOAN_TYPES} />
      </Field>

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

/* ---------- Step 7: Review ---------- */

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
          ["Type of entity", form.entity],
          ["Type of business", form.businessType],
          ["Date of incorporation", form.incorpDate],
        ]}
      />
      <ReviewBlock
        title="PAN (Individual)"
        stepNo={2}
        goToStep={goToStep}
        rows={[["PAN", form.panIndividual]]}
      />
      <ReviewBlock
        title="Udyam Registration"
        stepNo={3}
        goToStep={goToStep}
        rows={[["Udyam No.", form.udyam]]}
      />
      {!proprietor && (
        <ReviewBlock
          title="PAN (Entity)"
          stepNo={4}
          goToStep={goToStep}
          rows={[["Entity PAN", form.panEntity]]}
        />
      )}
      <ReviewBlock
        title="GST"
        stepNo={5}
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
        title="Loan details"
        stepNo={6}
        goToStep={goToStep}
        rows={[
          ["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`],
          ["Loan type", form.loanType],
          ["Previous FY turnover", form.prevTurnover && `₹ ${form.prevTurnover}`],
          ["Current FY turnover", form.currentTurnover && `₹ ${form.currentTurnover}`],
          ["Projected turnover", form.projectedTurnover && `₹ ${form.projectedTurnover}`],
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
          Our team will review your CGTMSE application and reach out within 24
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