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
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Warehouse Receipt Finance (Lease Rental)                          */
/*  Hero = lead capture (Name + Mobile) + 35% subsidy highlight.       */
/*  Wizard: 1 Warehouse → 2 Loan → 3 Loan Amount → 4 Tenant →          */
/*          5 Documents → 6 Review → bank offers → toast.              */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietorship", "Partnership", "Pvt Ltd", "LLP", "Others"];
const WAREHOUSE_TYPES = ["Commercial", "Industrial"];
const LOAN_TYPES = ["Fresh", "BT - Transfer"];
const TENANT_ENTITIES = ["Manufacturer", "Trader"];
const GOODS_TYPES = ["Durable", "Non-Durable"];

// CIBIL-style not required here; bank offers shown after review.
const BANK_OFFERS = [
  { name: "Instamoney", maxAmount: "₹10Cr", roi: "9.5% p.a", apr: "10.20%", emi: "—", fees: "1-2%", bestSuited: true },
  { name: "HDFC Bank", maxAmount: "₹250Cr", roi: "9.0% p.a", apr: "9.80%", emi: "—", fees: "0.5-1.5%", bestSuited: false },
  { name: "ICICI Bank", maxAmount: "₹150Cr", roi: "9.2% p.a", apr: "10.0%", emi: "—", fees: "1-2%", bestSuited: false },
  { name: "Axis Bank", maxAmount: "₹100Cr", roi: "9.8% p.a", apr: "10.6%", emi: "—", fees: "1-2.5%", bestSuited: false },
  { name: "SBI", maxAmount: "₹250Cr", roi: "8.8% p.a", apr: "9.50%", emi: "—", fees: "0.5-1%", bestSuited: false },
];

const STEP_LABELS = ["Warehouse", "Loan", "Amount", "Tenant", "Documents", "Review"];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

const initialForm = {
  // 1 — warehouse (lessor)
  entity: "",
  entityOther: "",
  warehouseAddress: "",
  warehouseType: "",
  warehouseMarketValue: "",
  warehouseMonthlyRent: "",
  warehousePicInside: "",
  warehousePicOutside: "",
  // 2 — loan
  loanType: "",
  areaAcquired: "",
  // 3 — loan amount
  loanAmount: "",
  // 4 — tenant
  tenantEntity: "",
  tenantName: "",
  lockInPeriod: "",
  goodsType: "",
  // 5 — documents
  docBankStatement: "",
  docPropertyPapers: "",
  docLeaseAgreement: "",
  docElectricityBill: "",
  // BT case only
  docSanctionLetter: "",
  docSoa: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isBT(form) {
  return form.loanType === "BT - Transfer";
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.entity) e.entity = "Select the type of entity (lessor).";
    if (form.entity === "Others" && !form.entityOther.trim())
      e.entityOther = "Please specify the entity type.";
    if (!form.warehouseAddress.trim())
      e.warehouseAddress = "Warehouse address is required.";
    if (!form.warehouseType) e.warehouseType = "Select warehouse type.";
    if (!form.warehouseMarketValue.trim())
      e.warehouseMarketValue = "Warehouse market value is required.";
    else if (!/^\d+$/.test(form.warehouseMarketValue))
      e.warehouseMarketValue = "Enter a valid amount in numbers.";
    if (!form.warehouseMonthlyRent.trim())
      e.warehouseMonthlyRent = "Warehouse monthly rent is required.";
    else if (!/^\d+$/.test(form.warehouseMonthlyRent))
      e.warehouseMonthlyRent = "Enter a valid amount in numbers.";
    if (!form.warehousePicInside)
      e.warehousePicInside = "Upload inside picture.";
    if (!form.warehousePicOutside)
      e.warehousePicOutside = "Upload outside picture.";
  }

  if (step === 2) {
    if (!form.loanType) e.loanType = "Select a loan type.";
    if (!form.areaAcquired.trim()) e.areaAcquired = "Area acquired is required.";
    else if (!/^\d+(\.\d+)?$/.test(form.areaAcquired))
      e.areaAcquired = "Enter area in sq ft (numbers only).";
  }

  if (step === 3) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount required is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
  }

  if (step === 4) {
    if (!form.tenantEntity) e.tenantEntity = "Select tenant entity type.";
    if (!form.tenantName.trim()) e.tenantName = "Tenant name is required.";
    if (!form.lockInPeriod.trim()) e.lockInPeriod = "Total lock-in period is required.";
    if (!form.goodsType) e.goodsType = "Select the type of goods stored.";
  }

  if (step === 5) {
    if (!form.docBankStatement)
      e.docBankStatement = "Bank statement (rental income) is required.";
    if (!form.docPropertyPapers)
      e.docPropertyPapers = "Property papers are required.";
    if (!form.docLeaseAgreement)
      e.docLeaseAgreement = "Lease agreement is required.";
    if (!form.docElectricityBill)
      e.docElectricityBill = "Electricity bill is required.";
    if (isBT(form)) {
      if (!form.docSanctionLetter)
        e.docSanctionLetter = "Sanction letter is required for BT cases.";
      if (!form.docSoa)
        e.docSoa = "Statement of Account (SOA) is required for BT cases.";
    }
  }

  return e;
}

export default function WarehouseFinance() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

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
    setShowOffers(true);
  };

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
    setStarted(false);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
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
/*  HERO (Name & Mobile capture) + subsidy highlight                   */
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
            {/* 35% subsidy highlight badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">
              <Sparkles className="h-4 w-4" /> 35% Subsidy Available
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              Warehouse <span className="text-blue-600">Lease Rental</span> Finance
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Unlock funding against your warehouse rental income — loans from ₹50L
              to ₹250Cr, up to 10 years tenure, with a 35% subsidy benefit.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/warehouse-finance.jpg"
                alt="Warehouse Receipt Finance"
                className="h-56 w-full object-cover"
              />
            </div>

            {/* Key highlights */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Highlight label="Max Loan" value="₹10 Cr+" />
              <Highlight label="Loan Range" value="₹50L–250Cr" />
              <Highlight label="Tenure" value="Up to 10 yrs" />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature icon={<Landmark className="h-5 w-5" />} title="Against Rental Income" text="Funding based on your warehouse lease rental income." />
              <Feature icon={<Clock3 className="h-5 w-5" />} title="Quick & Hassle Free" text="Get expert assistance for quick and smooth processing." />
              <Feature icon={<BadgeCheck className="h-5 w-5" />} title="Trusted by Thousands" text="Backed by 15+ leading banks and a dedicated support team." />
            </ul>
          </div>

          {/* Right column — lead card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
              ★ Avail 35% subsidy — start your application in a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Warehouse Finance
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund against your <span className="text-blue-600">warehouse</span>
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
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${err.name ? "border-red-400" : "border-slate-300"}`}
                />
                {err.name && <ErrorText>{err.name}</ErrorText>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
                <div className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${err.mobile ? "border-red-400" : "border-slate-300"}`}>
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Apply Now <ArrowRight className="h-4 w-4" />
              </button>

              <label className="flex items-start gap-2 text-xs text-slate-500">
                <input type="checkbox" checked={agree} onChange={(e) => { setAgree(e.target.checked); setErr((p) => ({ ...p, agree: undefined })); }} className="mt-0.5" />
                <span>By submitting this form, you agree to the Credit Report Terms of Use, Terms of Use &amp; Privacy Policy.</span>
              </label>
              {err.agree && <ErrorText>{err.agree}</ErrorText>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Highlight({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-center">
      <p className="text-base font-bold text-blue-600">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">{icon}</span>
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

function Wizard({ step, form, errors, set, setChoice, setFile, next, back, goToStep, onSubmit }) {
  const isReview = step === 6;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepWarehouse form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
        {step === 2 && <StepLoan form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 3 && <StepAmount form={form} set={set} errors={errors} />}
        {step === 4 && <StepTenant form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepDocuments form={form} setFile={setFile} errors={errors} />}
        {step === 6 && <StepReview form={form} goToStep={goToStep} />}

        <div className="mt-8 flex items-center justify-between">
          <button onClick={back} disabled={step === 1} className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-40">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          {!isReview ? (
            <button onClick={next} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              {step === 5 ? "Review details" : "Continue"} <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button onClick={onSubmit} className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              Bank Apply <Check className="h-4 w-4" />
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
              <div className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${done ? "bg-blue-600 text-white" : active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-500"}`}>
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">{label}</span>
            </div>
            {n < STEP_LABELS.length && <div className={`mx-1 h-0.5 flex-1 ${n < step ? "bg-blue-600" : "bg-slate-200"}`} />}
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
      {error ? <ErrorText>{error}</ErrorText> : hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function Text({ value, onChange, error, ...rest }) {
  return (
    <input value={value} onChange={onChange} className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`} {...rest} />
  );
}

function TextArea({ value, onChange, error, ...rest }) {
  return (
    <textarea value={value} onChange={onChange} rows={3} className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`} {...rest} />
  );
}

function Select({ value, onChange, options, placeholder, error }) {
  return (
    <select value={value} onChange={onChange} className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}>
      <option value="">{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Pills({ value, onSelect, options }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onSelect(o)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${value === o ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 text-slate-600 hover:border-slate-400"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

function FileRow({ label, required, name, onChange, error }) {
  return (
    <div>
      <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${error ? "border-red-400" : "border-slate-200"}`}>
        <div>
          <p className="text-sm font-medium text-slate-700">{label} {required && <span className="text-red-500">*</span>}</p>
          {name ? <p className="text-xs text-blue-600">{name}</p> : <p className="text-xs text-slate-400">PDF, JPG or PNG</p>}
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

const onlyDigits = (setter) => (e) => setter({ target: { value: e.target.value.replace(/\D/g, "") } });
const onlyDecimal = (setter) => (e) => setter({ target: { value: e.target.value.replace(/[^\d.]/g, "") } });

/* ---------- Step 1: Warehouse (lessor) ---------- */

function StepWarehouse({ form, set, setChoice, setFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Warehouse details (Lessor)</h2>

      <Field label="Type of entity (Lessor)" error={errors.entity}>
        <Pills value={form.entity} onSelect={setChoice("entity")} options={ENTITY_TYPES} />
      </Field>
      {form.entity === "Others" && (
        <Field label="Please specify entity type" error={errors.entityOther}>
          <Text value={form.entityOther} onChange={set("entityOther")} placeholder="Specify entity type" error={errors.entityOther} />
        </Field>
      )}

      <Field label="Warehouse address" error={errors.warehouseAddress}>
        <TextArea value={form.warehouseAddress} onChange={set("warehouseAddress")} placeholder="Full warehouse address" error={errors.warehouseAddress} />
      </Field>

      <Field label="Warehouse type" error={errors.warehouseType}>
        <Pills value={form.warehouseType} onSelect={setChoice("warehouseType")} options={WAREHOUSE_TYPES} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Warehouse market value (₹)" error={errors.warehouseMarketValue}>
          <Text value={form.warehouseMarketValue} onChange={onlyDigits(set("warehouseMarketValue"))} placeholder="₹" inputMode="numeric" error={errors.warehouseMarketValue} />
        </Field>
        <Field label="Warehouse monthly rent (₹)" error={errors.warehouseMonthlyRent}>
          <Text value={form.warehouseMonthlyRent} onChange={onlyDigits(set("warehouseMonthlyRent"))} placeholder="₹" inputMode="numeric" error={errors.warehouseMonthlyRent} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FileRow label="Warehouse picture — Inside" required name={form.warehousePicInside} onChange={setFile("warehousePicInside")} error={errors.warehousePicInside} />
        <FileRow label="Warehouse picture — Outside" required name={form.warehousePicOutside} onChange={setFile("warehousePicOutside")} error={errors.warehousePicOutside} />
      </div>
    </div>
  );
}

/* ---------- Step 2: Loan ---------- */

function StepLoan({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan details</h2>

      <Field label="Loan type" error={errors.loanType}>
        <Pills value={form.loanType} onSelect={setChoice("loanType")} options={LOAN_TYPES} />
      </Field>

      <Field label="Area acquired (sq ft)" error={errors.areaAcquired}>
        <Text value={form.areaAcquired} onChange={onlyDecimal(set("areaAcquired"))} placeholder="e.g. 25000" inputMode="decimal" error={errors.areaAcquired} />
      </Field>

      {isBT(form) && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
          BT (Balance Transfer) case — you'll be asked to upload the Sanction Letter and SOA in the documents step.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 3: Loan amount ---------- */

function StepAmount({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan amount required</h2>
      <Field label="Loan amount required (₹)" hint="Range: ₹50L – ₹250Cr" error={errors.loanAmount}>
        <Text value={form.loanAmount} onChange={onlyDigits(set("loanAmount"))} placeholder="₹" inputMode="numeric" error={errors.loanAmount} />
      </Field>
    </div>
  );
}

/* ---------- Step 4: Tenant ---------- */

function StepTenant({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Tenant details</h2>

      <Field label="Tenant entity" error={errors.tenantEntity}>
        <Pills value={form.tenantEntity} onSelect={setChoice("tenantEntity")} options={TENANT_ENTITIES} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Tenant name" error={errors.tenantName}>
          <Text value={form.tenantName} onChange={set("tenantName")} placeholder="Tenant name" error={errors.tenantName} />
        </Field>
        <Field label="Total lock-in period" error={errors.lockInPeriod}>
          <Text value={form.lockInPeriod} onChange={set("lockInPeriod")} placeholder="e.g. 5 years" error={errors.lockInPeriod} />
        </Field>
      </div>

      <Field label="Type of goods stored" error={errors.goodsType}>
        <Pills value={form.goodsType} onSelect={setChoice("goodsType")} options={GOODS_TYPES} />
      </Field>
    </div>
  );
}

/* ---------- Step 5: Documents (Accumn) ---------- */

function StepDocuments({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Document upload</h2>
      <p className="text-sm text-slate-500">Upload via Accumn or manually (PDF, JPG or PNG).</p>

      <FileRow label="Bank statement (rental income)" required name={form.docBankStatement} onChange={setFile("docBankStatement")} error={errors.docBankStatement} />
      <FileRow label="Property papers" required name={form.docPropertyPapers} onChange={setFile("docPropertyPapers")} error={errors.docPropertyPapers} />
      <FileRow label="Lease agreement" required name={form.docLeaseAgreement} onChange={setFile("docLeaseAgreement")} error={errors.docLeaseAgreement} />
      <FileRow label="Electricity bill" required name={form.docElectricityBill} onChange={setFile("docElectricityBill")} error={errors.docElectricityBill} />

      {isBT(form) && (
        <div className="space-y-4 border-t border-slate-100 pt-4">
          <h3 className="text-sm font-semibold text-slate-700">BT case documents</h3>
          <FileRow label="Sanction letter" required name={form.docSanctionLetter} onChange={setFile("docSanctionLetter")} error={errors.docSanctionLetter} />
          <FileRow label="Statement of Account (SOA)" required name={form.docSoa} onChange={setFile("docSoa")} error={errors.docSoa} />
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
        <button type="button" onClick={() => goToStep(stepNo)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
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
  const bt = isBT(form);
  const entityLabel = form.entity === "Others" && form.entityOther ? `Others — ${form.entityOther}` : form.entity;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-slate-500">Check everything below. Use “Edit” on any section to go back — your other answers stay saved.</p>
      </div>

      <ReviewBlock title="Warehouse (Lessor)" stepNo={1} goToStep={goToStep} rows={[
        ["Entity", entityLabel],
        ["Address", form.warehouseAddress],
        ["Type", form.warehouseType],
        ["Market value", form.warehouseMarketValue && `₹ ${form.warehouseMarketValue}`],
        ["Monthly rent", form.warehouseMonthlyRent && `₹ ${form.warehouseMonthlyRent}`],
        ["Pics", [form.warehousePicInside, form.warehousePicOutside].filter(Boolean).join(", ")],
      ]} />

      <ReviewBlock title="Loan" stepNo={2} goToStep={goToStep} rows={[
        ["Loan type", form.loanType],
        ["Area acquired", form.areaAcquired && `${form.areaAcquired} sq ft`],
      ]} />

      <ReviewBlock title="Loan amount" stepNo={3} goToStep={goToStep} rows={[
        ["Amount required", form.loanAmount && `₹ ${form.loanAmount}`],
      ]} />

      <ReviewBlock title="Tenant" stepNo={4} goToStep={goToStep} rows={[
        ["Tenant entity", form.tenantEntity],
        ["Tenant name", form.tenantName],
        ["Lock-in period", form.lockInPeriod],
        ["Goods stored", form.goodsType],
      ]} />

      <ReviewBlock title="Documents" stepNo={5} goToStep={goToStep} rows={[
        ["Bank statement", form.docBankStatement],
        ["Property papers", form.docPropertyPapers],
        ["Lease agreement", form.docLeaseAgreement],
        ["Electricity bill", form.docElectricityBill],
        ...(bt ? [["Sanction letter", form.docSanctionLetter], ["SOA", form.docSoa]] : []),
      ]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BANK OFFERS                                                        */
/* ------------------------------------------------------------------ */

function BankOffers({ onApply, onBack }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h2 className="text-2xl font-bold text-slate-900">Bank offers for you</h2>
      <p className="mt-1 text-sm text-slate-500">Based on your details, here are matched offers. Choose a bank to apply.</p>

      <div className="mt-6 space-y-4">
        {BANK_OFFERS.map((bank) => (
          <div key={bank.name} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {bank.bestSuited && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">★ Best Suited For You</span>
            )}
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600"><Landmark className="h-5 w-5" /></span>
              <h3 className="text-lg font-bold text-slate-900">{bank.name}</h3>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:items-end">
              <div><p className="text-xs text-slate-400">Max. Loan Amount</p><p className="text-base font-bold text-slate-800">{bank.maxAmount}</p></div>
              <div><p className="text-xs text-slate-400">ROI Starting at</p><p className="text-base font-bold text-slate-800">{bank.roi}</p><p className="text-[11px] text-slate-400">APR: {bank.apr}</p></div>
              <div><p className="text-xs text-slate-400">EMI</p><p className="text-base font-bold text-slate-800">{bank.emi}</p></div>
              <div><p className="text-xs text-slate-400">Processing Fees</p><p className="text-base font-bold text-slate-800">{bank.fees}</p></div>
              <div className="col-span-2 sm:col-span-1">
                <button onClick={() => onApply(bank.name)} className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Apply Now</button>
                <p className="mt-2 text-center text-xs font-medium text-blue-600">KFS, Charges &amp; APR</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">10,000+ people took a loan in the last 30 days</p>
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
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600"><Check className="h-8 w-8" /></div>
        <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600">Your warehouse finance application has been submitted. Our team will reach out within 24 hours.</p>
        <button onClick={onReset} className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Start a new application</button>
      </div>
    </section>
  );
}