

// ─────────────────────────────────────────────────────────────────
//  Loan Against Property — restructured to match Agri Loan's
//  architecture: Hero (lead capture: Name + Mobile, navy/red/blue
//  theme, image + feature list) -> Wizard (centered card, Stepper,
//  Pills/Field/Select inputs) -> Review -> Success (lender offers).
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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const LOAN_AMOUNTS = ["Upto ₹15 Lacs", "₹15 - ₹20 Lacs", "₹20 - ₹30 Lacs", "₹30 - ₹50 Lacs", "₹50 - ₹75 Lacs", "₹75 Lacs +"];
const PROPERTY_TYPES = ["Residential", "Commercial", "Industrial", "Agricultural", "Gram panchayat", "Lal Dora", "Khasra/khtauni", "Others"];
const EMPLOYMENT = [
  { title: "Salaried", desc: "Receive fixed amount of income every month" },
  { title: "Self-Employed Business", desc: "Run a business" },
  { title: "Self-Employed Professional", desc: "Engage in a profession (Eg: Doctor, C.A., Lawyer, etc)" },
];
const INCOMES = ["Below 3 Lacs", "3 Lacs - 6 Lacs", "6 Lacs - 12 Lacs", "12 Lacs - 18 Lacs", "Over 18 Lacs"];
const EXPERIENCE = ["0 - 1 years", "1 - 2 years", "2 - 3 years", "3+ years"];

const STEP_LABELS = ["Loan Amount", "Pin Code", "Property Type", "Employment", "Income", "Experience", "Review"];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

const initialForm = {
  amount: "",
  pin: "",
  propertyType: "",
  employment: "",
  income: "",
  experience: "",
};

// ── Direct Credit lender quotes ─────────────────────────────────
const lenderQuotes = [
  {
    id: "lt",
    name: "L&T Financial Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/L%26T_Finance_logo.svg/200px-L%26T_Finance_logo.svg.png",
    maxAmount: "₹116 Lacs",
    rate: "9.45%",
    fee: "₹10,000",
    emi: "₹51,650",
  },
  {
    id: "muthoot",
    name: "Muthoot Fincorp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Muthoot_Fincorp_logo.png/200px-Muthoot_Fincorp_logo.png",
    maxAmount: "₹90 Lacs",
    rate: "16.00%",
    fee: "₹1,20,000",
    emi: "₹67,005",
  },
];

// ── Eligibility criteria ───────────────────────────────────────────
const eligibilityCriteria = [
  "Nationality: You need to be a Citizen of India with documents to prove your claim.",
  "Occupation and Income: Your lender will require you to furnish details regarding your occupation and income to prove your professional and financial stability to determine your creditworthiness.",
  "Credit History: Your three-digit Credit Score, indicative of your track record in respect of repayment of loans, and other forms of credit will be a deciding factor to prove your eligibility for a LAP.",
  "Banking Relationship: Should you have a healthy relationship with your lender, you will not be disapproved for a LAP. Additionally, your lender will offer you better terms and conditions in respect of loan value, interest rates, period of the loan, hidden charges, and processing fees.",
  "Market Value of Property: Your lender retains the right to decide the loan amount and terms and conditions of your mortgage loan based on the market value of your collateral property. Besides, the market value of the mortgaged property must be higher than the loan amount calculated on the current value of your property.",
  "Title of Property: Your lender will require you to be the current existent owner of the property, and in case of a co-application, you will require to prove multiple ownership clear title. Besides, the property must not be mortgaged with any other financial institution.",
];

// ── Representative loan-cost example (feature table) ─────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Loan Against Property (LAP)" },
  { feature: "Loan Amount (Sample)", details: "₹75,00,000" },
  { feature: "Purpose", details: "Business Expansion / Financial Requirement" },
  { feature: "Annual Interest Rate (Sample)", details: "10.50% p.a." },
  { feature: "Loan Tenure", details: "180 months (15 years)" },
  { feature: "Monthly Installment (EMI)", details: "₹82,900 (approx.)" },
  { feature: "Total Amount Payable", details: "₹1,49,22,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹74,22,000 (approx.)" },
  { feature: "Processing Fee", details: "0.50% – 3% of loan amount" },
  { feature: "Insurance Fee", details: "1% - 2% of loan amount" },
  { feature: "Collateral Requirement", details: "Mortgage of residential/commercial property" },
];



// ── Why Choose Direct Credit ─────────────────────────────────────
const whyChooseFeatures = [
  "Get large loan amounts at low interest rates",
  "Long tenures — up to 25 years",
  "Ideal for business expansion, education, or medical needs",
  "We cover all types of property including residential",
];

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};
  if (step === 1 && !form.amount) e.amount = "Select your desired loan amount.";
  if (step === 2) {
    if (!/^\d{6}$/.test(form.pin)) e.pin = "Enter a valid 6-digit pin code.";
  }
  if (step === 3 && !form.propertyType) e.propertyType = "Select the type of property.";
  if (step === 4 && !form.employment) e.employment = "Select your employment type.";
  if (step === 5 && !form.income) e.income = "Select your net annual income.";
  if (step === 6 && !form.experience) e.experience = "Select your total years of work experience.";
  return e;
}

export default function LoanAgainstProperty() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [selectedLender, setSelectedLender] = useState(null);
  const [refNo] = useState(() => Math.floor(1000000000 + Math.random() * 8999999999));

  const setChoice = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const set = (key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, 7));
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
    for (let s = 1; s <= 6; s++) {
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
    setSelectedLender(null);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : submitted ? (
          <Success
            selectedLender={selectedLender}
            onSelectLender={setSelectedLender}
            refNo={refNo}
            data={form}
            onReset={reset}
          />
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
              Unlock the Best{" "}
              <span className="text-[#e8112d]">Loan Against Property</span>{" "}
              <span className="text-[#001f54]">— Hassle-Free</span>
            </h1>

            {/* 👇 New hero image (replaces old HERO_ICON / lap-illustration.png) */}
            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/images/lap-house-money.jpg"
                alt="Loan Against Property"
                className="h-72 md:h-80 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Compare Offers from Top Banks & HFCs"
                text="Interest rates starting at 7.90% onwards, from 20+ lenders."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Long Tenures — up to 20 Years"
                text="Flexible repayment that fits your business or personal needs."
              />
              <Feature
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Trusted by Thousands"
                text="We cover all types of property, backed by a dedicated support team."
              />
            </ul>
          </div>

          {/* Right column — lead card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="rounded-xl bg-[#001f54] px-4 py-3 text-sm text-white font-semibold text-center">
              Start your Loan Against Property application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Loan Against Property
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get the right loan against your{" "}
              <span className="text-[#e8112d]">property</span>
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
                  By submitting this form, you agree to the Credit Report Terms of Use, Terms of Use &amp; Privacy
                  Policy.
                </span>
              </label>
              {err.agree && <ErrorText>{err.agree}</ErrorText>}
            </div>
          </div>
        </div>
        
   {/* ── ELIGIBILITY CRITERIA ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility Criteria for Loan against Property</h2>
          <div className="text-gray-600 text-sm leading-relaxed space-y-4">
            <ul className="space-y-3 pl-1">
              {eligibilityCriteria.map((e) => (
                <li key={e} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-blue-500 mt-1 flex-shrink-0" />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>
        {/* ── FEATURE TABLE — Representative Example of Loan Cost ── */}
        <section className="py-10 border-t mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Representative Example</h2>
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left px-6 py-3 font-semibold text-blue-700 w-1/2">Particulars</th>
                  <th className="text-left px-6 py-3 font-semibold text-blue-700">Details</th>
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

     

        {/* ── WHY CHOOSE DIRECT CREDIT ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Direct Credit</h2>
          <ul className="space-y-2 pl-1">
            {whyChooseFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
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

function Wizard({ step, form, errors, set, setChoice, next, back, goToStep, onSubmit }) {
  const isReview = step === 7;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepAmount form={form} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepPin form={form} set={set} errors={errors} />}
        {step === 3 && <StepPropertyType form={form} setChoice={setChoice} errors={errors} />}
        {step === 4 && <StepEmployment form={form} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepIncome form={form} setChoice={setChoice} errors={errors} />}
        {step === 6 && <StepExperience form={form} setChoice={setChoice} errors={errors} />}
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
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
            >
              {step === 6 ? "Review details" : "Continue"} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800"
            >
              View my offers <Check className="h-4 w-4" />
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
                  done ? "bg-[#001f54] text-white" : active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">{label}</span>
            </div>
            {n < STEP_LABELS.length && (
              <div className={`mx-1 h-0.5 flex-1 ${n < step ? "bg-[#001f54]" : "bg-slate-200"}`} />
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

const onlyDigits = (setter) => (e) => setter({ target: { value: e.target.value.replace(/\D/g, "") } });

/* ---------- Step 1: Loan Amount ---------- */

function StepAmount({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Select your desired loan amount</h2>
      <Field error={errors.amount}>
        <Pills value={form.amount} onSelect={setChoice("amount")} options={LOAN_AMOUNTS} />
      </Field>
      <p className="text-xs text-gray-500 leading-relaxed">
        I authorize Direct Credit to share details of my Property Loan enquiry with Direct Credit affiliated lending
        partners.
      </p>
    </div>
  );
}

/* ---------- Step 2: Pin Code ---------- */

function StepPin({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Where is your property located?</h2>
      <Field label="Pin Code" error={errors.pin}>
        <Text
          value={form.pin}
          onChange={onlyDigits(set("pin"))}
          placeholder="Enter your area postal code"
          inputMode="numeric"
          maxLength={6}
          error={errors.pin}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 3: Property Type ---------- */

function StepPropertyType({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">What is the type of property?</h2>
      <Field error={errors.propertyType}>
        <Pills value={form.propertyType} onSelect={setChoice("propertyType")} options={PROPERTY_TYPES} />
      </Field>
    </div>
  );
}

/* ---------- Step 4: Employment Type ---------- */

function StepEmployment({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Employment Type</h2>
      <div className="space-y-3">
        {EMPLOYMENT.map(({ title, desc }) => (
          <button
            key={title}
            type="button"
            onClick={() => setChoice("employment")(title)}
            className={`w-full flex items-center justify-between rounded-xl border px-5 py-4 text-left transition ${
              form.employment === title ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">{title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
            <span
              className={`grid h-5 w-5 place-items-center rounded-full border flex-shrink-0 ml-3 ${
                form.employment === title ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"
              }`}
            >
              {form.employment === title && <Check className="h-3 w-3" />}
            </span>
          </button>
        ))}
      </div>
      {errors.employment && <ErrorText>{errors.employment}</ErrorText>}
    </div>
  );
}

/* ---------- Step 5: Net Annual Income ---------- */

function StepIncome({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Select Your Net Annual Income</h2>
      <Field error={errors.income}>
        <Pills value={form.income} onSelect={setChoice("income")} options={INCOMES} />
      </Field>
    </div>
  );
}

/* ---------- Step 6: Work Experience ---------- */

function StepExperience({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Total Years of Work Experience</h2>
      <Field error={errors.experience}>
        <Pills value={form.experience} onSelect={setChoice("experience")} options={EXPERIENCE} />
      </Field>
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

      <ReviewBlock title="Loan Amount" stepNo={1} goToStep={goToStep} rows={[["Desired amount", form.amount]]} />
      <ReviewBlock title="Property Location" stepNo={2} goToStep={goToStep} rows={[["Pin Code", form.pin]]} />
      <ReviewBlock title="Property Type" stepNo={3} goToStep={goToStep} rows={[["Type", form.propertyType]]} />
      <ReviewBlock title="Employment" stepNo={4} goToStep={goToStep} rows={[["Employment type", form.employment]]} />
      <ReviewBlock title="Income" stepNo={5} goToStep={goToStep} rows={[["Net annual income", form.income]]} />
      <ReviewBlock title="Experience" stepNo={6} goToStep={goToStep} rows={[["Work experience", form.experience]]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SUCCESS — lender offers, then thank-you once one is picked         */
/* ------------------------------------------------------------------ */

function Success({ selectedLender, onSelectLender, refNo, data, onReset }) {
  if (!selectedLender) {
    return (
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 flex flex-wrap items-center gap-8 mb-6">
          <div>
            <p className="text-xs text-gray-500">Required Amount</p>
            <p className="text-sm font-bold text-gray-800">{data.amount || "₹40 Lacs"}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Loan Tenure</p>
            <p className="text-sm font-bold text-gray-800">10 years</p>
          </div>
        </div>

        <div className="space-y-4">
          {lenderQuotes.map((l) => (
            <div
              key={l.id}
              className="border border-gray-200 rounded-xl px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition"
            >
              <div className="w-32 flex-shrink-0">
                <img
                  src={l.logo}
                  alt={l.name}
                  className="h-8 object-contain"
                  onError={(e) => {
                    e.currentTarget.replaceWith(
                      Object.assign(document.createElement("span"), {
                        className: "text-sm font-bold text-gray-700",
                        innerText: l.name,
                      })
                    );
                  }}
                />
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Max. Loan Amount</p>
                  <p className="text-sm font-bold text-gray-800">{l.maxAmount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Interest Rate</p>
                  <p className="text-sm font-bold text-gray-800">{l.rate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Processing Fee</p>
                  <p className="text-sm font-bold text-gray-800">{l.fee}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">EMI</p>
                  <p className="text-sm font-bold text-gray-800">{l.emi}</p>
                </div>
              </div>
              <button
                onClick={() => onSelectLender(l)}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2.5 rounded-lg transition text-sm whitespace-nowrap"
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto grid min-h-[70vh] max-w-xl place-items-center px-5 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-blue-900">Thank You!</h2>
        <p className="mt-2 text-slate-600">
          We have received your Loan Against Property application for <strong>{selectedLender.name}</strong>.
        </p>
        <div className="mt-4 inline-block rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
          <span className="text-sm text-gray-600">Reference No. : </span>
          <span className="text-sm font-bold text-gray-800">{refNo}</span>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Our loan expert will get in touch within 24 hours to take your application forward.
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