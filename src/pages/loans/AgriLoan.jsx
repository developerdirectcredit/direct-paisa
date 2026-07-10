

// add another image match to the left column of the agri loan section, below the existing image, with a caption that reads "Empowering Farmers for a Sustainable Future".

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
  CheckCircle,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Agri Loan Page                                                     */
/*  Hero = lead capture (Name + Mobile), styled like the Instant       */
/*         Personal Loan page (navy #001f54 / red #e8112d / blue-600   */
/*         CTA), with the agri family image, plus new Repayment Stats  */
/*         / Representative-example content below it.                 */
/*  Wizard = the full Agri Loan flow, recolored to match.              */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];

const AGRI_ACTIVITIES = [
  {
    group: "Crop Cultivation",
    options: [
      "Seeds/Fertilizers",
      "Plantation Crops",
      "Horticulture",
      "Organic Farming",
      "Greenhouse",
    ],
    isCrop: true,
  },
  {
    group: "Farm Mechanization",
    options: [
      "Tractor",
      "Harvester",
      "Power Tillers",
      "Drip Irrigation",
      "Solar Pumps",
      "Post-Harvest",
    ],
  },
  {
    group: "Livestock & Allied",
    options: ["Dairy", "Poultry", "Goat/Sheep", "Fishery", "Beekeeping", "Sericulture"],
  },
  {
    group: "Agri Infrastructure",
    options: [
      "Farm Godowns",
      "Cold Storage",
      "Waste Processing",
      "Seed Processing",
      "Agri Clinics",
    ],
  },
  {
    group: "Allied Agri Business",
    options: [
      "Agro-Processing",
      "Input Supply",
      "Produce Marketing",
      "Machinery Rental",
      "Rural Godowns",
    ],
  },
];

const LAND_OWNERSHIP = ["Owned", "Leased", "Both"];
const LOAN_TYPES = ["Fresh", "Topup", "Balance Transfer"];
const CROP_SEASONS = ["Kharif", "Rabi", "Annual"];

const STEP_LABELS = [
  "Entity",
  "Activity",
  "KYC & Land",
  "Land Details",
  "Loan",
  "Income & Crop",
  "Bank Fetch",
  "Review",
];

// ── Repayment period, loan amount range & interest rate ─────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "12 months (1 year)" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "180 months (15 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹250,00,00,000" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "7% per annum" },
];

// ── Representative example of loan cost ────────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Agri Business Loan" },
  { feature: "Loan Amount", details: "₹2,00,00,000" },
  { feature: "Purpose", details: "Agri Infrastructure, Food Processing, Dairy, Poultry, Fisheries, Cold Storage, Warehousing & Working Capital" },
  { feature: "Annual Interest Rate (Indicative)", details: "7.25% p.a." },
  { feature: "Loan Tenure", details: "120 months (10 years)" },
  { feature: "Moratorium Period", details: "Up to 12 months (if applicable)" },
  { feature: "Monthly Installment (EMI)", details: "₹2,70,000 (approx.)" },
  { feature: "Total Amount Payable", details: "₹3,24,00,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹1,24,00,000 (approx.)" },
  { feature: "Processing Fee", details: "0.50% – 1.50% of loan amount" },
  { feature: "Collateral Requirement", details: "Property / Agri Assets / Additional Security as per lender policy" },
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const currentYear = new Date().getFullYear();

const initialForm = {
  // 1
  entity: "",
  // 2
  activityGroup: "",
  activitySub: "",
  // 3
  startYear: "",
  pan: "",
  landOwnership: "",
  landDocs: "", // khasra-khatauni filename
  leaseAgreement: "", // lease filename
  // 4 — farm/land details
  village: "",
  district: "",
  state: "",
  surveyNo: "",
  khasraNo: "",
  landArea: "",
  // 5
  loanAmount: "",
  loanType: "",
  // 6 — income
  prevFyIncome: "",
  currentFyIncome: "",
  expectedFyIncome: "",
  // 6 — crop (only when crop loan)
  cropType: "",
  cropSeason: "",
  cultivationCost: "",
  // 7 — bank fetch
  bankConsent: "", // "yes" | "no"
};

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function isCropLoan(form) {
  const grp = AGRI_ACTIVITIES.find((a) => a.group === form.activityGroup);
  return !!grp?.isCrop;
}

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.entity) e.entity = "Select the type of entity.";
  }

  if (step === 2) {
    if (!form.activityGroup) e.activityGroup = "Select an agriculture activity.";
    if (form.activityGroup && !form.activitySub)
      e.activitySub = "Select a sub-activity.";
  }

  if (step === 3) {
    if (!form.startYear.trim()) e.startYear = "Year of start is required.";
    else if (
      !/^\d{4}$/.test(form.startYear) ||
      +form.startYear < 1900 ||
      +form.startYear > currentYear
    )
      e.startYear = `Enter a valid year between 1900 and ${currentYear}.`;
    if (!form.pan.trim()) e.pan = "PAN is required for CIBIL check.";
    else if (!PAN_RE.test(form.pan.trim().toUpperCase()))
      e.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
    if (!form.landOwnership) e.landOwnership = "Select land ownership type.";
    else if (form.landOwnership === "Owned" && !form.landDocs)
      e.landDocs = "Upload land documents (Khasra–Khatauni).";
    else if (form.landOwnership === "Leased" && !form.leaseAgreement)
      e.leaseAgreement = "Upload the lease agreement.";
    else if (form.landOwnership === "Both") {
      if (!form.landDocs) e.landDocs = "Upload land documents (Khasra–Khatauni).";
      if (!form.leaseAgreement) e.leaseAgreement = "Upload the lease agreement.";
    }
  }

  if (step === 4) {
    if (!form.village.trim()) e.village = "Village is required.";
    if (!form.district.trim()) e.district = "District is required.";
    if (!form.state.trim()) e.state = "State is required.";
    if (!form.landArea.trim()) e.landArea = "Land area is required.";
    else if (!/^\d+(\.\d+)?$/.test(form.landArea))
      e.landArea = "Enter land area in acres (numbers only).";
  }

  if (step === 5) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
    if (!form.loanType) e.loanType = "Select a loan type.";
  }

  if (step === 6) {
    if (!form.prevFyIncome.trim())
      e.prevFyIncome = "Previous FY income is required.";
    else if (!/^\d+$/.test(form.prevFyIncome))
      e.prevFyIncome = "Enter a valid amount in numbers.";
    if (!form.currentFyIncome.trim())
      e.currentFyIncome = "Current FY income is required.";
    else if (!/^\d+$/.test(form.currentFyIncome))
      e.currentFyIncome = "Enter a valid amount in numbers.";
    if (!form.expectedFyIncome.trim())
      e.expectedFyIncome = "Expected FY income is required.";
    else if (!/^\d+$/.test(form.expectedFyIncome))
      e.expectedFyIncome = "Enter a valid amount in numbers.";

    if (isCropLoan(form)) {
      if (!form.cropType.trim()) e.cropType = "Crop type is required.";
      if (!form.cropSeason) e.cropSeason = "Select a crop season.";
      if (!form.cultivationCost.trim())
        e.cultivationCost = "Estimated cost of cultivation is required.";
      else if (!/^\d+$/.test(form.cultivationCost))
        e.cultivationCost = "Enter a valid amount in numbers.";
    }
  }

  if (step === 7) {
    if (!form.bankConsent)
      e.bankConsent = "Please choose whether to fetch bank statements.";
  }

  return e;
}

export default function AgriLoan() {
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
    setStep((s) => Math.min(s + 1, 8));
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
    // re-validate every data step before final submit
    for (let s = 1; s <= 7; s++) {
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
/*  HERO (Instant Personal Loan color theme + Name & Mobile capture)   */
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
              Grow More with an{" "}
              <span className="text-[#e8112d]">Agri Loan</span>{" "}
              <span className="text-[#001f54]">— Hassle-Free</span>
            </h1>
            {/* <p className="mt-4 max-w-xl text-slate-600">
              Funding for crops, machinery, livestock, infrastructure and agri
              business. Apply once and discover the best offer matched to your
              farm — with expert support at every step.
            </p> */}

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/agri_loan-image.webp"
                alt="Farming family"
                className="h-72 md:h-80 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Best Loan Offers For You"
                text="Apply for multiple loans in one go and pick the one that suits you."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Quick & Hassle Free Loans"
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
              Start your Agri Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Agri Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get the right loan for your{" "}
              <span className="text-[#e8112d]">farm</span>
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
  const isReview = step === 8;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepEntity form={form} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepActivity form={form} setChoice={setChoice} errors={errors} />}
        {step === 3 && (
          <StepKycLand form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />
        )}
        {step === 4 && <StepLandDetails form={form} set={set} errors={errors} />}
        {step === 5 && <StepLoan form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 6 && <StepIncomeCrop form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 7 && <StepBankFetch form={form} setChoice={setChoice} errors={errors} />}
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
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
            >
              {step === 7 ? "Review details" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
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

/* ---------- Step 1: Entity ---------- */

function StepEntity({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Type of entity</h2>
      <Field label="Who is applying?" error={errors.entity}>
        <Pills value={form.entity} onSelect={setChoice("entity")} options={ENTITY_TYPES} />
      </Field>
    </div>
  );
}

/* ---------- Step 2: Agri activity ---------- */

function StepActivity({ form, setChoice, errors }) {
  const selectedGroup = AGRI_ACTIVITIES.find((a) => a.group === form.activityGroup);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Type of agriculture activity</h2>

      <Field label="Main activity" error={errors.activityGroup}>
        <Pills
          value={form.activityGroup}
          onSelect={(v) => {
            setChoice("activityGroup")(v);
            setChoice("activitySub")("");
          }}
          options={AGRI_ACTIVITIES.map((a) => a.group)}
        />
      </Field>

      {selectedGroup && (
        <Field label="Sub-activity" error={errors.activitySub}>
          <Pills
            value={form.activitySub}
            onSelect={setChoice("activitySub")}
            options={selectedGroup.options}
          />
        </Field>
      )}

      {selectedGroup?.isCrop && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-[#001f54]">
          Since this is a crop activity, you'll also fill crop details later.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 3: KYC & land ownership ---------- */

function StepKycLand({ form, set, setChoice, setFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">KYC &amp; land ownership</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Year of start of farming / operations" error={errors.startYear}>
          <Text
            value={form.startYear}
            onChange={onlyDigits(set("startYear"))}
            placeholder="e.g. 2015"
            inputMode="numeric"
            maxLength={4}
            error={errors.startYear}
          />
        </Field>
        <Field label="PAN (Individual)" hint="Used for CIBIL fetch" error={errors.pan}>
          <Text
            value={form.pan}
            onChange={(e) =>
              set("pan")({
                target: {
                  value: e.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")
                    .slice(0, 10),
                },
              })
            }
            placeholder="ABCDE1234F"
            error={errors.pan}
          />
        </Field>
      </div>

      <Field label="Land ownership type" error={errors.landOwnership}>
        <Pills
          value={form.landOwnership}
          onSelect={setChoice("landOwnership")}
          options={LAND_OWNERSHIP}
        />
      </Field>

      {(form.landOwnership === "Owned" || form.landOwnership === "Both") && (
        <FileRow
          label="Land documents (Khasra–Khatauni)"
          required
          name={form.landDocs}
          onChange={setFile("landDocs")}
          error={errors.landDocs}
        />
      )}
      {(form.landOwnership === "Leased" || form.landOwnership === "Both") && (
        <FileRow
          label="Lease agreement"
          required
          name={form.leaseAgreement}
          onChange={setFile("leaseAgreement")}
          error={errors.leaseAgreement}
        />
      )}
    </div>
  );
}

/* ---------- Step 4: Farm / land details ---------- */

function StepLandDetails({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Farm / land details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Village" error={errors.village}>
          <Text value={form.village} onChange={set("village")} placeholder="Village" error={errors.village} />
        </Field>
        <Field label="District" error={errors.district}>
          <Text value={form.district} onChange={set("district")} placeholder="District" error={errors.district} />
        </Field>
        <Field label="State" error={errors.state}>
          <Text value={form.state} onChange={set("state")} placeholder="State" error={errors.state} />
        </Field>
        <Field label="Land area (acres)" error={errors.landArea}>
          <Text
            value={form.landArea}
            onChange={onlyDecimal(set("landArea"))}
            placeholder="e.g. 5.5"
            inputMode="decimal"
            error={errors.landArea}
          />
        </Field>
        <Field label="Survey No." hint="Optional">
          <Text value={form.surveyNo} onChange={set("surveyNo")} placeholder="Survey number" />
        </Field>
        <Field label="Khasra No." hint="Optional">
          <Text value={form.khasraNo} onChange={set("khasraNo")} placeholder="Khasra number" />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 5: Loan ---------- */

function StepLoan({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan requirement</h2>

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
    </div>
  );
}

/* ---------- Step 6: Income + (crop only) ---------- */

function StepIncomeCrop({ form, set, setChoice, errors }) {
  const cropLoan = isCropLoan(form);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Agri income details</h2>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Previous FY farm income" error={errors.prevFyIncome}>
          <Text
            value={form.prevFyIncome}
            onChange={onlyDigits(set("prevFyIncome"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.prevFyIncome}
          />
        </Field>
        <Field label="Current FY income (till date)" error={errors.currentFyIncome}>
          <Text
            value={form.currentFyIncome}
            onChange={onlyDigits(set("currentFyIncome"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.currentFyIncome}
          />
        </Field>
        <Field label="Expected income (current FY)" error={errors.expectedFyIncome}>
          <Text
            value={form.expectedFyIncome}
            onChange={onlyDigits(set("expectedFyIncome"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.expectedFyIncome}
          />
        </Field>
      </div>

      {cropLoan ? (
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4">
          <h3 className="mb-4 text-sm font-semibold text-[#001f54]">Crop details</h3>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Crop type" error={errors.cropType}>
              <Text value={form.cropType} onChange={set("cropType")} placeholder="e.g. Wheat" error={errors.cropType} />
            </Field>
            <Field label="Crop season" error={errors.cropSeason}>
              <Select
                value={form.cropSeason}
                onChange={set("cropSeason")}
                options={CROP_SEASONS}
                placeholder="Select season"
                error={errors.cropSeason}
              />
            </Field>
            <Field label="Est. cost of cultivation" error={errors.cultivationCost}>
              <Text
                value={form.cultivationCost}
                onChange={onlyDigits(set("cultivationCost"))}
                placeholder="₹"
                inputMode="numeric"
                error={errors.cultivationCost}
              />
            </Field>
          </div>
        </div>
      ) : (
        <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-500">
          Crop details are not needed for a non-crop loan, so this section is
          skipped.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 7: Accumn bank fetch consent ---------- */

function StepBankFetch({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Bank statement fetch</h2>
      <p className="text-sm text-slate-600">
        Do you consent to fetch your bank statements directly via Accumn? This
        speeds up your application using a secure, OTP-based fetch.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <ConsentCard
          active={form.bankConsent === "yes"}
          onClick={() => setChoice("bankConsent")("yes")}
          title="Yes, fetch securely"
          text="You'll be redirected to Accumn's OTP-based flow to auto-fetch statements."
        />
        <ConsentCard
          active={form.bankConsent === "no"}
          onClick={() => setChoice("bankConsent")("no")}
          title="No, I'll upload later"
          text="Our team will guide you to share statements manually."
        />
      </div>
      {errors.bankConsent && <ErrorText>{errors.bankConsent}</ErrorText>}

      {form.bankConsent === "yes" && (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-[#001f54]">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <span>
            On submit, you'll be redirected to Accumn's secure OTP-based fetch
            to auto-import your bank statements.
          </span>
        </div>
      )}
    </div>
  );
}

function ConsentCard({ active, onClick, title, text }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border p-4 text-left transition ${
        active
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-800">{title}</p>
        <span
          className={`grid h-5 w-5 place-items-center rounded-full border ${
            active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
          }`}
        >
          {active && <Check className="h-3 w-3" />}
        </span>
      </div>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </button>
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
  const cropLoan = isCropLoan(form);
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
        title="Entity"
        stepNo={1}
        goToStep={goToStep}
        rows={[["Type of entity", form.entity]]}
      />
      <ReviewBlock
        title="Agriculture activity"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Activity", form.activityGroup],
          ["Sub-activity", form.activitySub],
        ]}
      />
      <ReviewBlock
        title="KYC & land ownership"
        stepNo={3}
        goToStep={goToStep}
        rows={[
          ["Start year", form.startYear],
          ["PAN", form.pan],
          ["Ownership", form.landOwnership],
          ["Land documents", form.landDocs],
          ["Lease agreement", form.leaseAgreement],
        ]}
      />
      <ReviewBlock
        title="Farm / land details"
        stepNo={4}
        goToStep={goToStep}
        rows={[
          ["Village", form.village],
          ["District", form.district],
          ["State", form.state],
          ["Land area", form.landArea && `${form.landArea} acres`],
          ["Survey No.", form.surveyNo],
          ["Khasra No.", form.khasraNo],
        ]}
      />
      <ReviewBlock
        title="Loan"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`],
          ["Loan type", form.loanType],
        ]}
      />
      <ReviewBlock
        title="Income & crop"
        stepNo={6}
        goToStep={goToStep}
        rows={[
          ["Previous FY income", form.prevFyIncome && `₹ ${form.prevFyIncome}`],
          ["Current FY income", form.currentFyIncome && `₹ ${form.currentFyIncome}`],
          ["Expected FY income", form.expectedFyIncome && `₹ ${form.expectedFyIncome}`],
          ...(cropLoan
            ? [
                ["Crop type", form.cropType],
                ["Crop season", form.cropSeason],
                ["Cultivation cost", form.cultivationCost && `₹ ${form.cultivationCost}`],
              ]
            : []),
        ]}
      />
      <ReviewBlock
        title="Bank statement fetch"
        stepNo={7}
        goToStep={goToStep}
        rows={[
          ["Consent (Accumn)", form.bankConsent === "yes" ? "Yes" : form.bankConsent === "no" ? "No" : ""],
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
          Our team will review your Agri Loan application and reach out within 24
          hours with matched offers.
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