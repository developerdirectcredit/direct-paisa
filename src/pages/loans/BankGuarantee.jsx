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
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Bank Guarantee (BG) Page                                           */
/*  Hero = lead capture (Name + Mobile), styled like the Agri loan     */
/*         hero, with the bank guarantee image.                        */
/*  Wizard = the full Bank Guarantee flow.                             */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
const BUSINESS_TYPES = [
  "Trader",
  "Manufacturer",
  "Service Provider",
  "Contractor",
  "Exporter",
];

const BG_TYPES = [
  "Financial BG",
  "Performance BG",
  "Advance Payment BG",
  "Bid Bond",
  "EMD",
  "Customs Guarantee",
];
const BG_VALIDITY = ["3 months", "6 months", "12 months", "Custom"];
const BG_PURPOSES = [
  "Tender participation",
  "Contract execution",
  "Supply contract",
  "Advance payment",
  "Customs / import-export",
  "Others",
];
const BG_SECURITY = ["Secured (with Collateral)", "Unsecured"];
const COLLATERAL_TYPES = ["Residential", "Commercial", "Industrial", "Land", "Others"];
const YES_NO = ["Yes", "No"];

const STEP_LABELS = [
  "Basic",
  "PAN",
  "GST",
  "BG Details",
  "Beneficiary",
  "Collateral",
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
  businessType: "",
  incorpDate: "",
  // 2 — PAN
  pan: "",
  // 3 — GST
  gst: "",
  // 4 — BG details
  bgType: "",
  bgAmount: "",
  bgValidity: "",
  bgValidityCustom: "",
  bgPurpose: "",
  bgSecurity: "",
  // 5 — beneficiary
  beneficiaryName: "",
  beneficiaryAddress: "",
  workOrder: "", // filename
  // 6 — collateral (only if secured)
  collateralType: "",
  ownershipDetails: "",
  marketValue: "",
  freeFromCharge: "",
  // 7 — financial documents (manual upload)
  docBankStatement: "",
  docItr: "",
  docFinancials: "",
  docNetWorth: "",
  docExistingBg: "",
  docWorkOrder: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isSecured(form) {
  return (form.bgSecurity || "").startsWith("Secured");
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
    if (!form.pan.trim()) e.pan = "PAN is required.";
    else if (!PAN_RE.test(form.pan.trim().toUpperCase()))
      e.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 3) {
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
  }

  if (step === 4) {
    if (!form.bgType) e.bgType = "Select the type of bank guarantee.";
    if (!form.bgAmount.trim()) e.bgAmount = "Guarantee amount is required.";
    else if (!/^\d+$/.test(form.bgAmount))
      e.bgAmount = "Enter a valid amount in numbers.";
    if (!form.bgValidity) e.bgValidity = "Select a validity period.";
    if (form.bgValidity === "Custom") {
      if (!form.bgValidityCustom.trim())
        e.bgValidityCustom = "Enter validity in months.";
      else if (!/^\d+$/.test(form.bgValidityCustom))
        e.bgValidityCustom = "Enter a valid number of months.";
    }
    if (!form.bgPurpose) e.bgPurpose = "Select the purpose of the BG.";
    if (!form.bgSecurity) e.bgSecurity = "Select secured or unsecured.";
  }

  if (step === 5) {
    if (!form.beneficiaryName.trim())
      e.beneficiaryName = "Beneficiary name is required.";
    if (!form.beneficiaryAddress.trim())
      e.beneficiaryAddress = "Beneficiary address is required.";
    if (!form.workOrder)
      e.workOrder = "Upload work order / tender / contract copy.";
  }

  if (step === 6) {
    // Only validated when secured; unsecured skips this step entirely.
    if (isSecured(form)) {
      if (!form.collateralType) e.collateralType = "Select collateral type.";
      if (!form.ownershipDetails.trim())
        e.ownershipDetails = "Ownership details are required.";
      if (!form.marketValue.trim())
        e.marketValue = "Approx market value is required.";
      else if (!/^\d+$/.test(form.marketValue))
        e.marketValue = "Enter a valid amount in numbers.";
      if (!form.freeFromCharge)
        e.freeFromCharge = "Select whether the property is free from charge.";
    }
  }

  if (step === 7) {
    if (!form.docBankStatement)
      e.docBankStatement = "Bank statements (12 months) are required.";
    if (!form.docItr) e.docItr = "ITR is required.";
    if (!form.docFinancials)
      e.docFinancials = "Financials (Balance Sheet, P&L) are required.";
  }

  return e;
}

export default function BankGuarantee() {
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

  // Move forward; skip collateral (step 6) when unsecured.
  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => {
      if (s === 5 && !isSecured(form)) return 7; // skip collateral
      return Math.min(s + 1, 8);
    });
  };

  // Move back; skip collateral (step 6) when unsecured.
  const back = () => {
    setErrors({});
    setStep((s) => {
      if (s === 7 && !isSecured(form)) return 5; // skip collateral
      return Math.max(s - 1, 1);
    });
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    // re-validate every data step before final submit
    for (let s = 1; s <= 7; s++) {
      if (s === 6 && !isSecured(form)) continue; // collateral skipped
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
              Get a <span className="text-blue-600">Bank Guarantee</span> — Fast &amp;
              Hassle-Free
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Financial, Performance, Advance Payment, Bid Bond, EMD &amp; Customs
              guarantees from leading banks. Secured &amp; unsecured options with
              expert support at every step.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/bank-guarantee.jpg"
                alt="Bank Guarantee"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Best BG Offers For You"
                text="Apply once and pick the guarantee option that suits your business."
              />
              <Feature
                icon={<Clock3 className="h-5 w-5" />}
                title="Quick & Hassle Free"
                text="Get expert assistance for quick and smooth BG processing."
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
              Start your Bank Guarantee application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Bank Guarantee
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get the right <span className="text-blue-600">guarantee</span> for your
              business
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
  const isReview = step === 8;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepPan form={form} set={set} errors={errors} />}
        {step === 3 && <StepGst form={form} set={set} errors={errors} />}
        {step === 4 && <StepBgDetails form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepBeneficiary form={form} set={set} setFile={setFile} errors={errors} />}
        {step === 6 && <StepCollateral form={form} set={set} setChoice={setChoice} errors={errors} />}
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

/* ---------- Step 2: PAN ---------- */

function StepPan({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN details</h2>
      <Field label="PAN Number" hint="Used for verification" error={errors.pan}>
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
  );
}

/* ---------- Step 3: GST ---------- */

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
    </div>
  );
}

/* ---------- Step 4: Bank Guarantee details ---------- */

function StepBgDetails({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Bank Guarantee details</h2>

      <Field label="Type of bank guarantee required" error={errors.bgType}>
        <Pills value={form.bgType} onSelect={setChoice("bgType")} options={BG_TYPES} />
      </Field>

      <Field label="Guarantee amount required" error={errors.bgAmount}>
        <Text
          value={form.bgAmount}
          onChange={onlyDigits(set("bgAmount"))}
          placeholder="₹ in INR"
          inputMode="numeric"
          error={errors.bgAmount}
        />
      </Field>

      <Field label="BG validity period" error={errors.bgValidity}>
        <Pills
          value={form.bgValidity}
          onSelect={setChoice("bgValidity")}
          options={BG_VALIDITY}
        />
      </Field>

      {form.bgValidity === "Custom" && (
        <Field label="Custom validity (months)" error={errors.bgValidityCustom}>
          <Text
            value={form.bgValidityCustom}
            onChange={onlyDigits(set("bgValidityCustom"))}
            placeholder="e.g. 18"
            inputMode="numeric"
            error={errors.bgValidityCustom}
          />
        </Field>
      )}

      <Field label="Purpose of bank guarantee" error={errors.bgPurpose}>
        <Select
          value={form.bgPurpose}
          onChange={set("bgPurpose")}
          options={BG_PURPOSES}
          placeholder="Select purpose"
          error={errors.bgPurpose}
        />
      </Field>

      <Field label="BG type" error={errors.bgSecurity}>
        <Pills
          value={form.bgSecurity}
          onSelect={setChoice("bgSecurity")}
          options={BG_SECURITY}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 5: Beneficiary details ---------- */

function StepBeneficiary({ form, set, setFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Beneficiary details</h2>

      <Field label="Beneficiary name" error={errors.beneficiaryName}>
        <Text
          value={form.beneficiaryName}
          onChange={set("beneficiaryName")}
          placeholder="Beneficiary name"
          error={errors.beneficiaryName}
        />
      </Field>

      <Field label="Beneficiary address" error={errors.beneficiaryAddress}>
        <TextArea
          value={form.beneficiaryAddress}
          onChange={set("beneficiaryAddress")}
          placeholder="Beneficiary address"
          error={errors.beneficiaryAddress}
        />
      </Field>

      <FileRow
        label="Work Order / Tender Document / Contract Copy"
        required
        name={form.workOrder}
        onChange={setFile("workOrder")}
        error={errors.workOrder}
      />
    </div>
  );
}

/* ---------- Step 6: Collateral (only if secured) ---------- */

function StepCollateral({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Collateral details</h2>
      <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
        You selected a secured BG, so please provide your collateral details.
      </p>

      <Field label="Collateral type" error={errors.collateralType}>
        <Pills
          value={form.collateralType}
          onSelect={setChoice("collateralType")}
          options={COLLATERAL_TYPES}
        />
      </Field>

      <Field label="Ownership details" error={errors.ownershipDetails}>
        <Text
          value={form.ownershipDetails}
          onChange={set("ownershipDetails")}
          placeholder="e.g. Self-owned / Co-owned"
          error={errors.ownershipDetails}
        />
      </Field>

      <Field label="Approx market value" error={errors.marketValue}>
        <Text
          value={form.marketValue}
          onChange={onlyDigits(set("marketValue"))}
          placeholder="₹ in INR"
          inputMode="numeric"
          error={errors.marketValue}
        />
      </Field>

      <Field label="Is property free from charge?" error={errors.freeFromCharge}>
        <Pills
          value={form.freeFromCharge}
          onSelect={setChoice("freeFromCharge")}
          options={YES_NO}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 7: Financial documents (manual upload) ---------- */

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
        label="ITR"
        required
        name={form.docItr}
        onChange={setFile("docItr")}
        error={errors.docItr}
      />
      <FileRow
        label="Financials (Balance Sheet, P&L)"
        required
        name={form.docFinancials}
        onChange={setFile("docFinancials")}
        error={errors.docFinancials}
      />
      <FileRow
        label="Net Worth Certificate"
        name={form.docNetWorth}
        onChange={setFile("docNetWorth")}
      />
      <FileRow
        label="Existing BGs (if any)"
        name={form.docExistingBg}
        onChange={setFile("docExistingBg")}
      />
      <FileRow
        label="Work Order / Tender Document"
        name={form.docWorkOrder}
        onChange={setFile("docWorkOrder")}
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
  const secured = isSecured(form);
  const validity =
    form.bgValidity === "Custom"
      ? form.bgValidityCustom && `${form.bgValidityCustom} months`
      : form.bgValidity;
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
        title="PAN"
        stepNo={2}
        goToStep={goToStep}
        rows={[["PAN", form.pan]]}
      />
      <ReviewBlock
        title="GST"
        stepNo={3}
        goToStep={goToStep}
        rows={[["GST Number", form.gst]]}
      />
      <ReviewBlock
        title="Bank Guarantee details"
        stepNo={4}
        goToStep={goToStep}
        rows={[
          ["BG type", form.bgType],
          ["Guarantee amount", form.bgAmount && `₹ ${form.bgAmount}`],
          ["Validity", validity],
          ["Purpose", form.bgPurpose],
          ["Security", form.bgSecurity],
        ]}
      />
      <ReviewBlock
        title="Beneficiary details"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["Beneficiary name", form.beneficiaryName],
          ["Beneficiary address", form.beneficiaryAddress],
          ["Work order / tender", form.workOrder],
        ]}
      />
      {secured && (
        <ReviewBlock
          title="Collateral details"
          stepNo={6}
          goToStep={goToStep}
          rows={[
            ["Collateral type", form.collateralType],
            ["Ownership details", form.ownershipDetails],
            ["Approx market value", form.marketValue && `₹ ${form.marketValue}`],
            ["Free from charge?", form.freeFromCharge],
          ]}
        />
      )}
      <ReviewBlock
        title="Financial documents"
        stepNo={7}
        goToStep={goToStep}
        rows={[
          ["Bank statements", form.docBankStatement],
          ["ITR", form.docItr],
          ["Financials", form.docFinancials],
          ["Net worth certificate", form.docNetWorth],
          ["Existing BGs", form.docExistingBg],
          ["Work order / tender", form.docWorkOrder],
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
          Our team will review your Bank Guarantee application and reach out
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