


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
  XCircle,
  CheckCircle,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Hospital Loan Page                                                 */
/*  Hero = lead capture (Name + Mobile), restyled to Agri Loan's       */
/*         navy (#001f54) / red (#e8112d) theme, with the hospital     */
/*         image + new Repayment Stats / Representative-cost-table     */
/*         content below it.                                          */
/*  Wizard = the full Hospital Loan flow (unchanged).                  */
/* ------------------------------------------------------------------ */

const LOAN_TYPES = [
  "Construction / Project Loan",
  "Equipment Loan",
  "LAP (Hospital)",
  "Working Capital (CC / OD / BG / WCTL / Other)",
];
const TENURES = ["1 year", "3 years", "5 years", "7 years", "10 years", "Custom"];

const STEP_LABELS = ["Basic", "KYC", "CIBIL", "Documents", "Review"];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_RE = /^\d{12}$/;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;

// CIBIL threshold below which the journey ends with a rejection.
const CIBIL_THRESHOLD = 700;

// ── Repayment period, loan amount range & interest rate ─────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "24 months (2 years)" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "180 months (15 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹2,50,00,00,000" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "Up to 20% per annum" },
];

// ── Representative example of loan cost ────────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Hospital Loan" },
  { feature: "Loan Amount", details: "₹2,00,00,000" },
  { feature: "Purpose", details: "Hospital Setup / Expansion / Medical Equipment Purchase" },
  { feature: "Annual Interest Rate (Indicative)", details: "10.00% p.a." },
  { feature: "Loan Tenure", details: "120 months (10 years)" },
  { feature: "Monthly Installment (EMI)", details: "₹2,64,000 (approx.)" },
  { feature: "Total Amount Payable", details: "₹3,16,80,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹1,16,80,000 (approx.)" },
  { feature: "Processing Fee", details: "0.50% – 1.50% of loan amount" },
  { feature: "Collateral Requirement", details: "Mortgage of Hospital Property / Medical Equipment / Additional Security" },
];

const initialForm = {
  // 1 — basic
  loanAmount: "",
  tenure: "",
  tenureCustom: "",
  loanType: "",
  // 2 — KYC (company + individual PAN & Aadhaar)
  companyPan: "",
  individualPan: "",
  aadhaar: "",
  aadhaarAddress: "",
  // 3 — CIBIL
  cibilConsent: false,
  // 4 — financial documents
  docBankStatement: "",
  docItr: "",
  gst: "",
  gstAddressConfirmed: "", // "Yes" | "No"
  manualAddress: "",
  docFinancialStatement: "",
  // 4 — medical / additional (always)
  docHospitalEstimate: "",
  docHospitalLicense: "",
  patientTieUp: "", // "Yes" | "No"
  tieUpDetails: "",
  // 4 — conditional by loan type
  // Equipment Loan
  docEquipmentSpecs: "",
  docEquipmentInsurance: "",
  // Construction Loan
  docTitleDeed: "",
  docNoc: "",
  docAuthorityApprovals: "",
  docProjectCostEstimate: "",
  docContractorAgreement: "",
  docPropertyPicsInterior: "",
  docPropertyPicsExterior: "",
  // Working Capital (Medical Store)
  isMedicalStore: "", // "Yes" | "No"
  docStockStatement: "",
  // LAP
  docLapTitleDeed: "",
  docPropertyTax: "",
  docApprovedPlan: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers — which conditional doc blocks to show                     */
/* ------------------------------------------------------------------ */

function isEquipment(form) {
  return form.loanType === "Equipment Loan";
}
function isConstruction(form) {
  return form.loanType === "Construction / Project Loan";
}
function isWorkingCapital(form) {
  return form.loanType.startsWith("Working Capital");
}
function isLap(form) {
  return form.loanType === "LAP (Hospital)";
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
    if (!form.tenure) e.tenure = "Select a tenure.";
    if (form.tenure === "Custom") {
      if (!form.tenureCustom.trim()) e.tenureCustom = "Enter tenure in months.";
      else if (!/^\d+$/.test(form.tenureCustom))
        e.tenureCustom = "Enter a valid number of months.";
    }
    if (!form.loanType) e.loanType = "Select a type of loan.";
  }

  if (step === 2) {
    if (!form.companyPan.trim()) e.companyPan = "Company PAN is required.";
    else if (!PAN_RE.test(form.companyPan.trim().toUpperCase()))
      e.companyPan = "Enter a valid PAN (e.g. AAAAA0000A).";
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
    // Financial docs (always)
    if (!form.docBankStatement)
      e.docBankStatement = "Bank statements (12 months) are required.";
    if (!form.docItr) e.docItr = "ITR is required.";
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
    if (form.gst.trim() && !form.gstAddressConfirmed)
      e.gstAddressConfirmed = "Please confirm your business address.";
    if (form.gstAddressConfirmed === "No" && !form.manualAddress.trim())
      e.manualAddress = "Enter your current business address.";
    if (!form.docFinancialStatement)
      e.docFinancialStatement = "Financial statement is required.";

    // Medical / additional (always)
    if (!form.docHospitalEstimate)
      e.docHospitalEstimate = "Hospital estimate letter is required.";
    if (!form.docHospitalLicense)
      e.docHospitalLicense = "Hospital license is required.";
    if (!form.patientTieUp)
      e.patientTieUp = "Please select whether you have a tie-up.";
    if (form.patientTieUp === "Yes" && !form.tieUpDetails.trim())
      e.tieUpDetails = "Provide the tie-up detail break-up.";

    // Conditional by loan type
    if (isEquipment(form)) {
      if (!form.docEquipmentSpecs)
        e.docEquipmentSpecs = "Equipment specs are required.";
      if (!form.docEquipmentInsurance)
        e.docEquipmentInsurance = "Insurance proof is required.";
    }
    if (isConstruction(form)) {
      if (!form.docTitleDeed) e.docTitleDeed = "Title deed is required.";
      if (!form.docNoc) e.docNoc = "NOC is required.";
      if (!form.docAuthorityApprovals)
        e.docAuthorityApprovals = "Authority approvals are required.";
      if (!form.docProjectCostEstimate)
        e.docProjectCostEstimate = "Project cost estimate is required.";
      if (!form.docContractorAgreement)
        e.docContractorAgreement = "Contractor agreement is required.";
      if (!form.docPropertyPicsInterior)
        e.docPropertyPicsInterior = "Interior pictures are required.";
      if (!form.docPropertyPicsExterior)
        e.docPropertyPicsExterior = "Exterior pictures are required.";
    }
    if (isWorkingCapital(form)) {
      if (!form.isMedicalStore)
        e.isMedicalStore = "Please select whether this is a medical store.";
      if (form.isMedicalStore === "Yes" && !form.docStockStatement)
        e.docStockStatement = "Stock statement is required for a medical store.";
    }
    if (isLap(form)) {
      if (!form.docLapTitleDeed) e.docLapTitleDeed = "Title deed is required.";
      if (!form.docPropertyTax) e.docPropertyTax = "Property tax receipt is required.";
      if (!form.docApprovedPlan) e.docApprovedPlan = "Approved plan is required.";
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

export default function HospitalLoan() {
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

    setStep((s) => Math.min(s + 1, 5));
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
    for (let s = 1; s <= 4; s++) {
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
              Grow Your{" "}
              <span className="text-[#e8112d]">Hospital</span>{" "}
              <span className="text-[#001f54]">with the Right Loan</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Accelerate your healthcare infrastructure with financing tailored to your needs.
               Whether you're constructing a new hospital, upgrading medical technology, purchasing property, or managing working capital, 
               receive expert guidance and competitive loan offers from 30+ trusted Banks and NBFCs. 

            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/hospital-loan.jpg"
                alt="Hospital Loan"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Tailored for Healthcare"
                text="Construction, equipment, LAP and working capital — all in one place."
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
              Start your Hospital Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Hospital Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund your{" "}
              <span className="text-[#e8112d]">healthcare</span> business
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
  const isReview = step === 5;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepKyc form={form} set={set} errors={errors} />}
        {step === 3 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
        {step === 4 && (
          <StepDocuments form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />
        )}
        {step === 5 && <StepReview form={form} goToStep={goToStep} />}

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
              {step === 4 ? "Review details" : step === 3 ? "Check CIBIL & continue" : "Continue"}{" "}
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

/* ---------- Step 1: Basic details ---------- */

function StepBasic({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Basic details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Loan amount" error={errors.loanAmount}>
          <Text
            value={form.loanAmount}
            onChange={onlyDigits(set("loanAmount"))}
            placeholder="₹ in INR"
            inputMode="numeric"
            error={errors.loanAmount}
          />
        </Field>
        <Field label="Tenure" error={errors.tenure}>
          <Select
            value={form.tenure}
            onChange={set("tenure")}
            options={TENURES}
            placeholder="Select tenure"
            error={errors.tenure}
          />
        </Field>
      </div>

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

      <Field label="Type of loan" error={errors.loanType}>
        <Pills value={form.loanType} onSelect={setChoice("loanType")} options={LOAN_TYPES} />
      </Field>
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
        required to proceed to documentation.
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

/* ---------- Step 4: Financial & Medical document collection ---------- */

function StepDocuments({ form, set, setChoice, setFile, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Financial &amp; medical documents</h2>
        <p className="mt-1 text-sm text-slate-500">Manual upload (PDF, JPG or PNG).</p>
      </div>

      {/* Financial */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Financial documents</h3>
        <FileRow
          label="Bank statements (12 months)"
          required
          name={form.docBankStatement}
          onChange={setFile("docBankStatement")}
          error={errors.docBankStatement}
        />
        <FileRow
          label="ITR"
          required
          name={form.docItr}
          onChange={setFile("docItr")}
          error={errors.docItr}
        />
        <Field
          label="GST Number"
          hint="Current office address is captured via GST"
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
        <FileRow
          label="Financial statement"
          required
          name={form.docFinancialStatement}
          onChange={setFile("docFinancialStatement")}
          error={errors.docFinancialStatement}
        />
      </div>

      {/* Medical / additional (always) */}
      <div className="space-y-4 border-t border-slate-100 pt-5">
        <h3 className="text-sm font-semibold text-slate-700">Medical requirements</h3>
        <FileRow
          label="Hospital estimate letter"
          required
          name={form.docHospitalEstimate}
          onChange={setFile("docHospitalEstimate")}
          error={errors.docHospitalEstimate}
        />
        <FileRow
          label="License for hospital"
          required
          name={form.docHospitalLicense}
          onChange={setFile("docHospitalLicense")}
          error={errors.docHospitalLicense}
        />
        <Field
          label="Are patients coming directly, or via tie-up with companies / Govt?"
          error={errors.patientTieUp}
        >
          <Pills
            value={form.patientTieUp}
            onSelect={setChoice("patientTieUp")}
            options={["Direct", "Yes"]}
          />
        </Field>
        {form.patientTieUp === "Yes" && (
          <Field label="Tie-up detail break-up" error={errors.tieUpDetails}>
            <TextArea
              value={form.tieUpDetails}
              onChange={set("tieUpDetails")}
              placeholder="Provide details of the tie-up (companies / Govt) and break-up"
              error={errors.tieUpDetails}
            />
          </Field>
        )}
      </div>

      {/* Conditional: Equipment Loan */}
      {isEquipment(form) && (
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-700">Equipment loan documents</h3>
          <FileRow
            label="Equipment specs"
            required
            name={form.docEquipmentSpecs}
            onChange={setFile("docEquipmentSpecs")}
            error={errors.docEquipmentSpecs}
          />
          <FileRow
            label="Insurance proof"
            required
            name={form.docEquipmentInsurance}
            onChange={setFile("docEquipmentInsurance")}
            error={errors.docEquipmentInsurance}
          />
        </div>
      )}

      {/* Conditional: Construction Loan */}
      {isConstruction(form) && (
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-700">Construction loan documents</h3>
          <FileRow
            label="Title deed"
            required
            name={form.docTitleDeed}
            onChange={setFile("docTitleDeed")}
            error={errors.docTitleDeed}
          />
          <FileRow
            label="NOC"
            required
            name={form.docNoc}
            onChange={setFile("docNoc")}
            error={errors.docNoc}
          />
          <FileRow
            label="Authority approvals"
            required
            name={form.docAuthorityApprovals}
            onChange={setFile("docAuthorityApprovals")}
            error={errors.docAuthorityApprovals}
          />
          <FileRow
            label="Project cost estimate"
            required
            name={form.docProjectCostEstimate}
            onChange={setFile("docProjectCostEstimate")}
            error={errors.docProjectCostEstimate}
          />
          <FileRow
            label="Contractor agreement"
            required
            name={form.docContractorAgreement}
            onChange={setFile("docContractorAgreement")}
            error={errors.docContractorAgreement}
          />
          <FileRow
            label="Property pictures — Interior"
            required
            name={form.docPropertyPicsInterior}
            onChange={setFile("docPropertyPicsInterior")}
            error={errors.docPropertyPicsInterior}
          />
          <FileRow
            label="Property pictures — Exterior"
            required
            name={form.docPropertyPicsExterior}
            onChange={setFile("docPropertyPicsExterior")}
            error={errors.docPropertyPicsExterior}
          />
        </div>
      )}

      {/* Conditional: Working Capital */}
      {isWorkingCapital(form) && (
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-700">Working capital documents</h3>
          <Field label="Is this a medical store?" error={errors.isMedicalStore}>
            <Pills
              value={form.isMedicalStore}
              onSelect={setChoice("isMedicalStore")}
              options={["Yes", "No"]}
            />
          </Field>
          {form.isMedicalStore === "Yes" && (
            <FileRow
              label="Stock statement"
              required
              name={form.docStockStatement}
              onChange={setFile("docStockStatement")}
              error={errors.docStockStatement}
            />
          )}
        </div>
      )}

      {/* Conditional: LAP */}
      {isLap(form) && (
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <h3 className="text-sm font-semibold text-slate-700">LAP property documents</h3>
          <FileRow
            label="Title deed"
            required
            name={form.docLapTitleDeed}
            onChange={setFile("docLapTitleDeed")}
            error={errors.docLapTitleDeed}
          />
          <FileRow
            label="Property tax receipt"
            required
            name={form.docPropertyTax}
            onChange={setFile("docPropertyTax")}
            error={errors.docPropertyTax}
          />
          <FileRow
            label="Approved plan"
            required
            name={form.docApprovedPlan}
            onChange={setFile("docApprovedPlan")}
            error={errors.docApprovedPlan}
          />
        </div>
      )}
    </div>
  );
}

/* ---------- Step 5: Review ---------- */

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
  const tenure =
    form.tenure === "Custom"
      ? form.tenureCustom && `${form.tenureCustom} months`
      : form.tenure;

  const docRows = [
    ["Bank statements", form.docBankStatement],
    ["ITR", form.docItr],
    ["GST Number", form.gst],
    ["Address confirmed?", form.gstAddressConfirmed],
    ...(form.gstAddressConfirmed === "No"
      ? [["Current address", form.manualAddress]]
      : []),
    ["Financial statement", form.docFinancialStatement],
    ["Hospital estimate", form.docHospitalEstimate],
    ["Hospital license", form.docHospitalLicense],
    ["Patients", form.patientTieUp],
    ...(form.patientTieUp === "Yes" ? [["Tie-up details", form.tieUpDetails]] : []),
    ...(isEquipment(form)
      ? [
          ["Equipment specs", form.docEquipmentSpecs],
          ["Insurance proof", form.docEquipmentInsurance],
        ]
      : []),
    ...(isConstruction(form)
      ? [
          ["Title deed", form.docTitleDeed],
          ["NOC", form.docNoc],
          ["Authority approvals", form.docAuthorityApprovals],
          ["Project cost estimate", form.docProjectCostEstimate],
          ["Contractor agreement", form.docContractorAgreement],
          ["Pics — Interior", form.docPropertyPicsInterior],
          ["Pics — Exterior", form.docPropertyPicsExterior],
        ]
      : []),
    ...(isWorkingCapital(form)
      ? [
          ["Medical store?", form.isMedicalStore],
          ...(form.isMedicalStore === "Yes"
            ? [["Stock statement", form.docStockStatement]]
            : []),
        ]
      : []),
    ...(isLap(form)
      ? [
          ["Title deed", form.docLapTitleDeed],
          ["Property tax", form.docPropertyTax],
          ["Approved plan", form.docApprovedPlan],
        ]
      : []),
  ];

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
          ["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`],
          ["Tenure", tenure],
          ["Type of loan", form.loanType],
        ]}
      />
      <ReviewBlock
        title="KYC — PAN & Aadhaar"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Company PAN", form.companyPan],
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
        title="Financial & medical documents"
        stepNo={4}
        goToStep={goToStep}
        rows={docRows}
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
          are unable to proceed with your hospital loan application at this time.
          You can re-apply once your credit profile improves.
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
          Our team will review your Hospital Loan application and reach out within
          24 hours.
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