  

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useState } from "react";
import {
  Building2,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  Check,
  Pencil,
  CheckCircle,
  Calendar,
  Percent,
   IndianRupee,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Lease Rental Discounting — Loan Page                               */
/*  Hero = lead capture (name + mobile), restyled to Agri Loan's       */
/*         navy (#001f54) / red (#e8112d) theme, with new How-It-Works /*/
/*         Eligibility & Documentation / Key Benefits / Repayment      */
/*         stats / Representative-cost-table content below it.        */
/*  Wizard steps 1–5 = application flow, each with validation          */
/*  Step 6 = Review (check / edit any previous step before submitting) */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Plot",
  "School",
  "College",
  "Nursing Home",
  "Others",
];
const TENANT_TYPES = ["Company", "Proprietor", "LLP", "Partnership"];
const LOAN_TYPES = ["Fresh", "BT Transfer"];

const STEP_LABELS = [
  "Lessor",
  "Tenant",
  "Loan Amount",
  "Loan Type",
  "Documents",
  "Review",
];

/* Name = letters and spaces only, at least 3 characters */
const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

// ── How LRD Works ──────────────────────────────────────────────────
const howItWorks = [
  "Assessment: The lender evaluates the property's market value, the tenant's financial stability, and the duration of the lease agreement.",
  "Loan Disbursal: The bank sanctions a loan that is a percentage (typically up to 85%) of the discounted present value of the future rental streams.",
  "Repayment: An escrow account is set up. The tenant deposits their rent directly into this account, out of which the lender automatically deducts the EMI. Any surplus is transferred to the property owner.",
];

// ── Eligibility & Documentation ─────────────────────────────────────
const eligibilityDocumentation = [
  "Property Type: Predominantly applicable to commercial properties, office spaces, warehouses, and retail outlets with stable, creditworthy corporate tenants.",
  "Tenant Profile: Lenders prioritize tenants that are established banks, MNCs, or reputed public limited companies.",
  "Required Documents: You will need proof of property ownership, original lease agreements, recent Income Tax Returns (ITR), bank statements, and standard KYC documents.",
];

// ── Key Benefits ─────────────────────────────────────────────────────
const keyBenefits = [
  "High Liquidity: Unlocks large sums of capital for business expansion, buying new properties, or debt consolidation without selling the existing asset.",
  "Lower Interest Rates: Because the rent serves as assured collateral, LRD loans generally offer more competitive interest rates than unsecured business or personal loans.",
  "No Strain on Personal Income: Since the rental income services the EMIs directly, it doesn't burden the borrower's personal or active business cash flow.",
  "Long Tenures: Lenders frequently offer flexible, extended repayment terms ranging from 5 to 15 years.",
];

// ── Repayment period & interest rate ────────────────────────────────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "5 years (60 months)" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "15 years (180 months)" },
   { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹200CR" },
  { icon: Percent, title: "Applicable Interest Rate", desc: "Up to 12% per annum" },
  
];

// ── Representative example of loan cost ─────────────────────────────
const loanCostDetails = [
  { feature: "Facility Type", details: "Lease Rental Discounting (LRD)" },
  { feature: "Loan Amount", details: "₹1,00,00,000" },
  { feature: "Purpose", details: "Discounting of future lease rentals from commercial property" },
  { feature: "Tenure", details: "120 months (10 years)" },
  { feature: "Moratorium Period", details: "Up to 6–12 months (if applicable)" },
  { feature: "Interest Rate (Indicative)", details: "9.75% p.a." },
  { feature: "Monthly Installment (EMI)", details: "₹1,31,000 (approx.)" },
  { feature: "Total Amount Payable", details: "₹1,57,40,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹57,40,000 (approx.)" },
  { feature: "Processing / Bank Fee", details: "0.25% – 1% of loan amount" },
  { feature: "Collateral Requirement", details: "Commercial property + assignment of lease rentals" },
  { feature: "Repayment", details: "Monthly EMI from rental cash flows" },
];

const initialForm = {
  // Step 1 — Lessor
  lessorEntity: "",
  lessorName: "",
  propertyAddress: "",
  propertyType: "",
  propertyValue: "",
  rentalAmount: "",
  // Step 2 — Tenant
  tenantEntity: "",
  tenantName: "",
  leasePeriod: "",
  leaseStartDate: "",
  // Step 3 — Loan amount
  loanAmount: "",
  // Step 4 — Loan type
  loanType: "",
  // Step 5 — Documents
  files: {},
};

/* ------------------------------------------------------------------ */
/*  Validation: returns { fieldName: errorMessage }                    */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.lessorEntity) e.lessorEntity = "Select the lessor entity type.";
    if (!form.lessorName.trim()) e.lessorName = "Lessor name is required.";
    else if (!NAME_RE.test(form.lessorName.trim()))
      e.lessorName = "Name can contain letters and spaces only.";
    if (!form.propertyAddress.trim())
      e.propertyAddress = "Property address is required.";
    if (!form.propertyType) e.propertyType = "Select a property type.";
    if (!form.propertyValue.trim())
      e.propertyValue = "Property value is required.";
    else if (!/^\d+$/.test(form.propertyValue))
      e.propertyValue = "Enter a valid amount in numbers.";
    if (!form.rentalAmount.trim())
      e.rentalAmount = "Monthly rental amount is required.";
    else if (!/^\d+$/.test(form.rentalAmount))
      e.rentalAmount = "Enter a valid amount in numbers.";
  }

  if (step === 2) {
    if (!form.tenantEntity) e.tenantEntity = "Select the tenant entity type.";
    if (!form.tenantName.trim()) e.tenantName = "Tenant name is required.";
    else if (!NAME_RE.test(form.tenantName.trim()))
      e.tenantName = "Name can contain letters and spaces only.";
    if (!form.leasePeriod.trim())
      e.leasePeriod = "Total lease period is required.";
    if (!form.leaseStartDate)
      e.leaseStartDate = "Lease commencement date is required.";
  }

  if (step === 3) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
  }

  if (step === 4) {
    if (!form.loanType) e.loanType = "Select a loan type.";
  }

  if (step === 5) {
    if (!form.files?.bankStatement)
      e.bankStatement = "Bank statement is required.";
    if (!form.files?.propertyPapers)
      e.propertyPapers = "Property papers are required.";
    if (form.loanType === "BT Transfer") {
      if (!form.files?.sanctionLetter)
        e.sanctionLetter = "Sanction letter is required for balance transfer.";
      if (!form.files?.soa)
        e.soa = "Statement of account is required for balance transfer.";
    }
  }

  return e;
}

export default function LeaseRentalLoan() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setChoice = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setFile = (key) => (e) => {
    const fname = e.target.files?.[0]?.name || "";
    setForm((f) => ({ ...f, files: { ...f.files, [key]: fname } }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 6));
  };

  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  // Jump straight to a specific step (used by the Review screen's Edit links)
  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    const e = validateStep(5, form);
    if (Object.keys(e).length) {
      setErrors(e);
      setStep(5); // send them back to fix the missing documents
      return;
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
/*  HERO (Agri Loan navy/red theme, lead capture)                      */
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
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left column */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              <span className="text-[#e8112d]">Lease Rental</span>{" "}
              <span className="text-[#001f54]">Discounting</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
             Unlock the financial potential of your income-generating commercial property.
              Secure funding against future lease rentals through our network of 30+ leading Banks and NBFCs. 
              Benefit from a single application, personalized loan offers, expert guidance and a seamless 100% digital process with quick approvals and fast disbursal. 

            </p>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Building2 className="h-5 w-5" />}
                title="Loan against rent"
                text="Borrow up to 90% of rent value based on your lease."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Quick turnaround"
                text="Fast sanction with minimal physical paperwork."
              />
              <Feature
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Fresh or balance transfer"
                text="Switch an existing loan or apply for a new one."
              />
              <Feature
                icon={<ShieldCheck className="h-5 w-5" />}
                title="RBI-approved lenders"
                text="Bank-grade security and no spam calls."
              />
            </ul>
          </div>

          {/* Right column — lead card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="rounded-xl bg-[#001f54] px-4 py-3 text-sm font-semibold text-white text-center">
              Get cashback up to ₹1,000* on loan disbursal ·{" "}
              <span className="text-xs font-normal">*T&amp;C apply</span>
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Lease Rental Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get up to <span className="text-[#e8112d]">₹200CR</span> starting
              at <span className="text-[#001f54] underline">8.75%</span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
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
                <label className="mb-1 block text-xs font-medium text-[#001f54]">
                  Mobile Number
                </label>
                <div
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${
                    err.mobile ? "border-red-400" : "border-blue-500"
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
                  <Pencil className="h-4 w-4 shrink-0 text-slate-400" />
                </div>
                {err.mobile && <ErrorText>{err.mobile}</ErrorText>}
              </div>

              <button
                onClick={handleStart}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
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
                  By submitting this form, you agree to the Credit Report Terms of
                  Use, Terms of Use &amp; Privacy Policy.
                </span>
              </label>
              {err.agree && <ErrorText>{err.agree}</ErrorText>}
            </div>
          </div>
        </div>

        {/* Trust strip
        <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <Stat value="5.7cr+" label="Customers served" />
          <Stat value="65+" label="Partner lenders" />
          <Stat value="₹65k Cr+" label="Loans disbursed" />
        </div> */}

        {/* ── HOW LRD WORKS ── */}
        <section className="py-10 border-t mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How LRD Works</h2>
          <ol className="space-y-3 pl-1">
            {howItWorks.map((w, i) => (
              <li key={w} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#001f54] text-white text-xs font-bold">
                  {i + 1}
                </span>
                {w}
              </li>
            ))}
          </ol>
        </section>

        {/* ── ELIGIBILITY & DOCUMENTATION ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility &amp; Documentation</h2>
          <ul className="space-y-3 pl-1">
            {eligibilityDocumentation.map((e) => (
              <li key={e} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-1 flex-shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </section>

        {/* ── KEY BENEFITS ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Benefits</h2>
          <ul className="space-y-3 pl-1">
            {keyBenefits.map((k) => (
              <li key={k} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-1 flex-shrink-0" />
                {k}
              </li>
            ))}
          </ul>
        </section>

        {/* ── REPAYMENT PERIOD & INTEREST RATE ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Repayment Period &amp; Interest Rate</h2>
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

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold text-[#001f54]">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
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

  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && (
          <StepLessor form={form} set={set} setChoice={setChoice} errors={errors} />
        )}
        {step === 2 && (
          <StepTenant form={form} set={set} setChoice={setChoice} errors={errors} />
        )}
        {step === 3 && <StepLoanAmount form={form} set={set} errors={errors} />}
        {step === 4 && <StepLoanType form={form} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepDocuments form={form} setFile={setFile} errors={errors} />}
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
              {step === 5 ? "Review details" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-[#001f54] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#00133a]"
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
    <div className="flex items-center justify-between">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                  done
                    ? "bg-[#001f54] text-white"
                    : active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span className="mt-2 hidden text-xs text-slate-500 sm:block">
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
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
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

/* numbers-only change helper */
const onlyDigits = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/\D/g, "") } });
/* letters/spaces-only change helper */
const onlyLetters = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/[^A-Za-z\s]/g, "") } });

/* ---------- Step 1: Lessor ---------- */

function StepLessor({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Lessor (property owner) details</h2>

      <Field label="Type of entity (Lessor)" error={errors.lessorEntity}>
        <Pills
          value={form.lessorEntity}
          onSelect={setChoice("lessorEntity")}
          options={ENTITY_TYPES}
        />
      </Field>

      <Field label="Lessor name" error={errors.lessorName}>
        <Text
          value={form.lessorName}
          onChange={onlyLetters(set("lessorName"))}
          placeholder="Name as per records"
          error={errors.lessorName}
        />
      </Field>

      <Field label="Property address" error={errors.propertyAddress}>
        <Text
          value={form.propertyAddress}
          onChange={set("propertyAddress")}
          placeholder="Current property address"
          error={errors.propertyAddress}
        />
      </Field>

      <Field label="Property type" error={errors.propertyType}>
        <Select
          value={form.propertyType}
          onChange={set("propertyType")}
          options={PROPERTY_TYPES}
          placeholder="Select property type"
          error={errors.propertyType}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Property value (market)"
          hint="LTV up to 145% as per property"
          error={errors.propertyValue}
        >
          <Text
            value={form.propertyValue}
            onChange={onlyDigits(set("propertyValue"))}
            placeholder="₹ in INR"
            inputMode="numeric"
            error={errors.propertyValue}
          />
        </Field>
        <Field label="Monthly rental amount" error={errors.rentalAmount}>
          <Text
            value={form.rentalAmount}
            onChange={onlyDigits(set("rentalAmount"))}
            placeholder="₹ in INR"
            inputMode="numeric"
            error={errors.rentalAmount}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 2: Tenant ---------- */

function StepTenant({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Tenant &amp; lease details</h2>

      <Field label="Tenant entity" error={errors.tenantEntity}>
        <Pills
          value={form.tenantEntity}
          onSelect={setChoice("tenantEntity")}
          options={TENANT_TYPES}
        />
      </Field>

      <Field label="Tenant name" error={errors.tenantName}>
        <Text
          value={form.tenantName}
          onChange={onlyLetters(set("tenantName"))}
          placeholder="Tenant / lessee name"
          error={errors.tenantName}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Total lease period" error={errors.leasePeriod}>
          <Text
            value={form.leasePeriod}
            onChange={set("leasePeriod")}
            placeholder="e.g. 9 years"
            error={errors.leasePeriod}
          />
        </Field>
        <Field label="Lease commencement date" error={errors.leaseStartDate}>
          <Text
            type="date"
            value={form.leaseStartDate}
            onChange={set("leaseStartDate")}
            error={errors.leaseStartDate}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 3: Loan amount ---------- */

function StepLoanAmount({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan requirement</h2>
      <Field
        label="Loan amount required"
        hint="Subject to eligibility and property valuation"
        error={errors.loanAmount}
      >
        <Text
          value={form.loanAmount}
          onChange={onlyDigits(set("loanAmount"))}
          placeholder="₹ in INR"
          inputMode="numeric"
          error={errors.loanAmount}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 4: Loan type ---------- */

function StepLoanType({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan type</h2>
      <Field label="Select loan type" error={errors.loanType}>
        <Pills
          value={form.loanType}
          onSelect={setChoice("loanType")}
          options={LOAN_TYPES}
        />
      </Field>
      {form.loanType === "BT Transfer" && (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          For balance transfer, you'll need to upload your existing Sanction
          Letter and Statement of Account in the next step.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 5: Documents ---------- */

function StepDocuments({ form, setFile, errors }) {
  const isBT = form.loanType === "BT Transfer";
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Document upload</h2>

      <FileRow
        label="Bank Statement"
        required
        name={form.files.bankStatement}
        onChange={setFile("bankStatement")}
        error={errors.bankStatement}
      />
      <FileRow
        label="Property Papers"
        required
        name={form.files.propertyPapers}
        onChange={setFile("propertyPapers")}
        error={errors.propertyPapers}
      />
      <FileRow
        label="Lease Agreement"
        name={form.files.leaseAgreement}
        onChange={setFile("leaseAgreement")}
      />
      <FileRow
        label="Electricity Bill"
        name={form.files.electricityBill}
        onChange={setFile("electricityBill")}
      />

      {isBT && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
          <p className="mb-3 text-sm font-semibold text-amber-800">
            Balance transfer documents
          </p>
          <div className="space-y-3">
            <FileRow
              label="Sanction Letter"
              required
              name={form.files.sanctionLetter}
              onChange={setFile("sanctionLetter")}
              error={errors.sanctionLetter}
            />
            <FileRow
              label="Statement of Account (SOA)"
              required
              name={form.files.soa}
              onChange={setFile("soa")}
              error={errors.soa}
            />
          </div>
        </div>
      )}
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
          <Upload className="h-4 w-4" /> Upload
          <input type="file" className="hidden" onChange={onChange} />
        </label>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

/* ---------- Step 6: Review (check / edit previous steps) ---------- */

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
            <dt className="w-40 shrink-0 text-slate-500">{label}</dt>
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
  const f = form.files || {};
  const isBT = form.loanType === "BT Transfer";

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-slate-500">
          Check everything below. Use “Edit” on any section to go back and
          change it — your other answers stay saved.
        </p>
      </div>

      <ReviewBlock
        title="Lessor details"
        stepNo={1}
        goToStep={goToStep}
        rows={[
          ["Entity type", form.lessorEntity],
          ["Lessor name", form.lessorName],
          ["Property address", form.propertyAddress],
          ["Property type", form.propertyType],
          ["Property value", form.propertyValue && `₹ ${form.propertyValue}`],
          ["Monthly rental", form.rentalAmount && `₹ ${form.rentalAmount}`],
        ]}
      />

      <ReviewBlock
        title="Tenant & lease"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Tenant entity", form.tenantEntity],
          ["Tenant name", form.tenantName],
          ["Lease period", form.leasePeriod],
          ["Commencement", form.leaseStartDate],
        ]}
      />

      <ReviewBlock
        title="Loan requirement"
        stepNo={3}
        goToStep={goToStep}
        rows={[["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`]]}
      />

      <ReviewBlock
        title="Loan type"
        stepNo={4}
        goToStep={goToStep}
        rows={[["Type", form.loanType]]}
      />

      <ReviewBlock
        title="Documents"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["Bank statement", f.bankStatement],
          ["Property papers", f.propertyPapers],
          ["Lease agreement", f.leaseAgreement],
          ["Electricity bill", f.electricityBill],
          ...(isBT
            ? [
                ["Sanction letter", f.sanctionLetter],
                ["Statement of account", f.soa],
              ]
            : []),
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
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-100 text-[#001f54]">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600">
          Our team will review your lease rental discounting application and
          reach out within 24 hours with matched offers.
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