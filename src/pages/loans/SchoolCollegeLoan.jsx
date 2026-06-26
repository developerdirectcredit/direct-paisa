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
  Plus,
  Trash2,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Funding against Schools & Colleges                                 */
/*  Hero = lead capture (Name + Mobile), with a larger image section.  */
/*  Wizard = the full School / College loan flow.                      */
/* ------------------------------------------------------------------ */

const INSTITUTION_TYPES = ["School", "College"];
const PURPOSES = ["Infrastructure", "Land", "Working Capital"];
const COLLATERAL_TYPES = ["School", "Other"];
const PROMOTER_COUNTS = ["1", "2", "3", "4", "5", "6+"];

const STEP_LABELS = [
  "Institution",
  "School Details",
  "Co-applicants",
  "KYC Uploads",
  "Documents",
  "Review",
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emptyCoapplicant() {
  return {
    name: "",
    dob: "",
    mobile: "",
    email: "",
    creditScore: "",
    experience: "",
    pan: "",
    aadhaar: "",
    selfie: "",
  };
}

const initialForm = {
  // 1 — institution basic details
  institutionName: "",
  trustEntity: "",
  institutionType: "",
  cityDistrict: "",
  numStudents: "",
  purpose: "",
  contactPerson: "",
  phone: "",
  email: "",
  // 2 — school details
  collateralType: "",
  collateralOther: "",
  incorpDate: "",
  promoters: "",
  turnover: "",
  feeStructure: "",
  // 3 — co-applicants (dynamic)
  coapplicants: [emptyCoapplicant()],
  // 5 — financial documents
  docSchoolBankStatement: "",
  docPromotersBankStatement: "",
  docSchoolFinancials: "",
};

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.institutionName.trim()) e.institutionName = "Institution name is required.";
    if (!form.trustEntity.trim()) e.trustEntity = "Trust / entity name is required.";
    if (!form.institutionType) e.institutionType = "Select School or College.";
    if (!form.cityDistrict.trim()) e.cityDistrict = "City / district is required.";
    if (!form.numStudents.trim()) e.numStudents = "Number of students is required.";
    else if (!/^\d+$/.test(form.numStudents))
      e.numStudents = "Enter a valid number.";
    if (!form.purpose) e.purpose = "Select a purpose.";
    if (!form.contactPerson.trim()) e.contactPerson = "Contact person is required.";
    if (!form.phone.trim()) e.phone = "Phone is required.";
    else if (!MOBILE_RE.test(form.phone))
      e.phone = "Enter a valid 10-digit mobile number.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!EMAIL_RE.test(form.email)) e.email = "Enter a valid email address.";
  }

  if (step === 2) {
    if (!form.collateralType) e.collateralType = "Select the collateral property type.";
    if (form.collateralType === "Other" && !form.collateralOther.trim())
      e.collateralOther = "Please specify the collateral property.";
    if (!form.incorpDate) e.incorpDate = "Date of incorporation is required.";
    else if (new Date(form.incorpDate) > new Date())
      e.incorpDate = "Date cannot be in the future.";
    if (!form.promoters) e.promoters = "Select the number of promoters.";
    if (!form.turnover.trim()) e.turnover = "Financial summary (turnover) is required.";
    else if (!/^\d+$/.test(form.turnover))
      e.turnover = "Enter a valid amount in numbers.";
    if (!form.feeStructure.trim()) e.feeStructure = "Fee structure is required.";
  }

  if (step === 3) {
    form.coapplicants.forEach((c, i) => {
      if (!c.name.trim()) e[`co_${i}_name`] = "Name is required.";
      if (!c.dob) e[`co_${i}_dob`] = "Date of birth is required.";
      if (!c.mobile.trim()) e[`co_${i}_mobile`] = "Mobile is required.";
      else if (!MOBILE_RE.test(c.mobile))
        e[`co_${i}_mobile`] = "Enter a valid 10-digit mobile number.";
      if (!c.email.trim()) e[`co_${i}_email`] = "Email is required.";
      else if (!EMAIL_RE.test(c.email)) e[`co_${i}_email`] = "Enter a valid email.";
      if (!c.creditScore.trim()) e[`co_${i}_creditScore`] = "Credit score is required.";
      else if (!/^\d{3}$/.test(c.creditScore) || +c.creditScore < 300 || +c.creditScore > 900)
        e[`co_${i}_creditScore`] = "Enter a score between 300 and 900.";
      if (!c.experience.trim()) e[`co_${i}_experience`] = "Experience is required.";
    });
  }

  if (step === 4) {
    form.coapplicants.forEach((c, i) => {
      if (!c.pan) e[`co_${i}_pan`] = "Upload PAN.";
      if (!c.aadhaar) e[`co_${i}_aadhaar`] = "Upload Aadhaar.";
      if (!c.selfie) e[`co_${i}_selfie`] = "Upload selfie.";
    });
  }

  if (step === 5) {
    if (!form.docSchoolBankStatement)
      e.docSchoolBankStatement = "School / College bank statement (12 months) is required.";
    if (!form.docPromotersBankStatement)
      e.docPromotersBankStatement = "Promoters' bank statement (12 months) is required.";
    if (!form.docSchoolFinancials)
      e.docSchoolFinancials = "School financials are required.";
  }

  return e;
}

export default function SchoolCollegeLoan() {
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

  // ----- co-applicant helpers -----
  const setCoField = (index, key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => {
      const coapplicants = f.coapplicants.map((c, i) =>
        i === index ? { ...c, [key]: value } : c
      );
      return { ...f, coapplicants };
    });
    setErrors((p) => ({ ...p, [`co_${index}_${key}`]: undefined }));
  };

  const setCoFile = (index, key) => (e) => {
    const fname = e.target.files?.[0]?.name || "";
    setForm((f) => {
      const coapplicants = f.coapplicants.map((c, i) =>
        i === index ? { ...c, [key]: fname } : c
      );
      return { ...f, coapplicants };
    });
    setErrors((p) => ({ ...p, [`co_${index}_${key}`]: undefined }));
  };

  const addCoapplicant = () =>
    setForm((f) => ({ ...f, coapplicants: [...f.coapplicants, emptyCoapplicant()] }));

  const removeCoapplicant = (index) =>
    setForm((f) => ({
      ...f,
      coapplicants: f.coapplicants.filter((_, i) => i !== index),
    }));

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
            setCoField={setCoField}
            setCoFile={setCoFile}
            addCoapplicant={addCoapplicant}
            removeCoapplicant={removeCoapplicant}
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
/*  HERO (Name & Mobile capture) — larger image section                */
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
              Funding for <span className="text-blue-600">Schools &amp; Colleges</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Loans for infrastructure, land and working capital for educational
              institutions. Apply once and get expert support at every step.
            </p>

            {/* Larger image section */}
            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/school-college-loan.jpg"
                alt="School & College Loan"
                className="h-72 w-full object-cover lg:h-80"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="For Educational Institutions"
                text="Infrastructure, land and working capital — tailored for schools & colleges."
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
              Start your School &amp; College Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              School &amp; College Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund your <span className="text-blue-600">institution</span>
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
  setCoField,
  setCoFile,
  addCoapplicant,
  removeCoapplicant,
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
        {step === 1 && <StepInstitution form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepSchoolDetails form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 3 && (
          <StepCoapplicants
            form={form}
            setCoField={setCoField}
            addCoapplicant={addCoapplicant}
            removeCoapplicant={removeCoapplicant}
            errors={errors}
          />
        )}
        {step === 4 && <StepKycUploads form={form} setCoFile={setCoFile} errors={errors} />}
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

/* ---------- Step 1: Institution basic details ---------- */

function StepInstitution({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Institution basic details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Institution name" error={errors.institutionName}>
          <Text value={form.institutionName} onChange={set("institutionName")} placeholder="Institution name" error={errors.institutionName} />
        </Field>
        <Field label="Trust / Entity" error={errors.trustEntity}>
          <Text value={form.trustEntity} onChange={set("trustEntity")} placeholder="Trust / entity name" error={errors.trustEntity} />
        </Field>
      </div>

      <Field label="Type" error={errors.institutionType}>
        <Pills value={form.institutionType} onSelect={setChoice("institutionType")} options={INSTITUTION_TYPES} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="City / District" error={errors.cityDistrict}>
          <Text value={form.cityDistrict} onChange={set("cityDistrict")} placeholder="City / district" error={errors.cityDistrict} />
        </Field>
        <Field label="Number of students" error={errors.numStudents}>
          <Text value={form.numStudents} onChange={onlyDigits(set("numStudents"))} placeholder="e.g. 1200" inputMode="numeric" error={errors.numStudents} />
        </Field>
      </div>

      <Field label="Purpose" error={errors.purpose}>
        <Pills value={form.purpose} onSelect={setChoice("purpose")} options={PURPOSES} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Contact person" error={errors.contactPerson}>
          <Text value={form.contactPerson} onChange={set("contactPerson")} placeholder="Contact person" error={errors.contactPerson} />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <Text value={form.phone} onChange={onlyDigits(set("phone"))} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} error={errors.phone} />
        </Field>
        <Field label="Email" error={errors.email}>
          <Text type="email" value={form.email} onChange={set("email")} placeholder="name@example.com" error={errors.email} />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 2: School details ---------- */

function StepSchoolDetails({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">School / College details</h2>

      <Field label="Property given as collateral" error={errors.collateralType}>
        <Pills value={form.collateralType} onSelect={setChoice("collateralType")} options={COLLATERAL_TYPES} />
      </Field>

      {form.collateralType === "Other" && (
        <Field label="Specify collateral property" error={errors.collateralOther}>
          <Text value={form.collateralOther} onChange={set("collateralOther")} placeholder="Specify property" error={errors.collateralOther} />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Date of incorporation" error={errors.incorpDate}>
          <Text type="date" value={form.incorpDate} onChange={set("incorpDate")} max={new Date().toISOString().split("T")[0]} error={errors.incorpDate} />
        </Field>
        <Field label="Number of promoters" error={errors.promoters}>
          <Select value={form.promoters} onChange={set("promoters")} options={PROMOTER_COUNTS} placeholder="Select" error={errors.promoters} />
        </Field>
      </div>

      <Field label="Financial summary (turnover)" error={errors.turnover}>
        <Text value={form.turnover} onChange={onlyDigits(set("turnover"))} placeholder="₹ annual turnover" inputMode="numeric" error={errors.turnover} />
      </Field>

      <Field label="Fee structure" error={errors.feeStructure}>
        <TextArea value={form.feeStructure} onChange={set("feeStructure")} placeholder="Describe the fee structure (per class / course, annual, etc.)" error={errors.feeStructure} />
      </Field>
    </div>
  );
}

/* ---------- Step 3: Co-applicants (dynamic) ---------- */

function StepCoapplicants({ form, setCoField, addCoapplicant, removeCoapplicant, errors }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Co-applicant details</h2>
        <button
          type="button"
          onClick={addCoapplicant}
          className="flex items-center gap-1 rounded-lg border border-blue-600 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" /> Add co-applicant
        </button>
      </div>

      {form.coapplicants.map((c, i) => (
        <div key={i} className="rounded-xl border border-slate-200 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Co-applicant {i + 1}</h3>
            {form.coapplicants.length > 1 && (
              <button
                type="button"
                onClick={() => removeCoapplicant(i)}
                className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors[`co_${i}_name`]}>
              <Text value={c.name} onChange={setCoField(i, "name")} placeholder="Full name" error={errors[`co_${i}_name`]} />
            </Field>
            <Field label="Date of birth" error={errors[`co_${i}_dob`]}>
              <Text type="date" value={c.dob} onChange={setCoField(i, "dob")} max={new Date().toISOString().split("T")[0]} error={errors[`co_${i}_dob`]} />
            </Field>
            <Field label="Mobile" error={errors[`co_${i}_mobile`]}>
              <Text value={c.mobile} onChange={(e) => setCoField(i, "mobile")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 10) } })} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} error={errors[`co_${i}_mobile`]} />
            </Field>
            <Field label="Email" error={errors[`co_${i}_email`]}>
              <Text type="email" value={c.email} onChange={setCoField(i, "email")} placeholder="name@example.com" error={errors[`co_${i}_email`]} />
            </Field>
            <Field label="Credit score" error={errors[`co_${i}_creditScore`]}>
              <Text value={c.creditScore} onChange={(e) => setCoField(i, "creditScore")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 3) } })} placeholder="300–900" inputMode="numeric" maxLength={3} error={errors[`co_${i}_creditScore`]} />
            </Field>
            <Field label="Experience in education" error={errors[`co_${i}_experience`]}>
              <Text value={c.experience} onChange={setCoField(i, "experience")} placeholder="e.g. 10 years" error={errors[`co_${i}_experience`]} />
            </Field>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Step 4: KYC uploads (PAN, Aadhaar, Selfie) — all ---------- */

function StepKycUploads({ form, setCoFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">KYC uploads — PAN, Aadhaar &amp; Selfie</h2>
      <p className="text-sm text-slate-500">Upload for all co-applicants.</p>

      {form.coapplicants.map((c, i) => (
        <div key={i} className="rounded-xl border border-slate-200 p-4 space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">
            {c.name ? c.name : `Co-applicant ${i + 1}`}
          </h3>
          <FileRow label="PAN" required name={c.pan} onChange={setCoFile(i, "pan")} error={errors[`co_${i}_pan`]} />
          <FileRow label="Aadhaar" required name={c.aadhaar} onChange={setCoFile(i, "aadhaar")} error={errors[`co_${i}_aadhaar`]} />
          <FileRow label="Selfie" required name={c.selfie} onChange={setCoFile(i, "selfie")} error={errors[`co_${i}_selfie`]} />
        </div>
      ))}
    </div>
  );
}

/* ---------- Step 5: Financial document collection ---------- */

function StepDocuments({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Financial document collection</h2>
      <p className="text-sm text-slate-500">Manual upload (PDF, JPG or PNG).</p>

      <FileRow
        label="School / College bank statement — 12 months"
        required
        name={form.docSchoolBankStatement}
        onChange={setFile("docSchoolBankStatement")}
        error={errors.docSchoolBankStatement}
      />
      <FileRow
        label="All promoters' bank statement — 12 months"
        required
        name={form.docPromotersBankStatement}
        onChange={setFile("docPromotersBankStatement")}
        error={errors.docPromotersBankStatement}
      />
      <FileRow
        label="Financials — School"
        required
        name={form.docSchoolFinancials}
        onChange={setFile("docSchoolFinancials")}
        error={errors.docSchoolFinancials}
      />
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
  const collateral =
    form.collateralType === "Other" && form.collateralOther
      ? `Other — ${form.collateralOther}`
      : form.collateralType;
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
        title="Institution"
        stepNo={1}
        goToStep={goToStep}
        rows={[
          ["Institution name", form.institutionName],
          ["Trust / Entity", form.trustEntity],
          ["Type", form.institutionType],
          ["City / District", form.cityDistrict],
          ["Number of students", form.numStudents],
          ["Purpose", form.purpose],
          ["Contact person", form.contactPerson],
          ["Phone", form.phone],
          ["Email", form.email],
        ]}
      />
      <ReviewBlock
        title="School / College details"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Collateral", collateral],
          ["Date of incorporation", form.incorpDate],
          ["Promoters", form.promoters],
          ["Turnover", form.turnover && `₹ ${form.turnover}`],
          ["Fee structure", form.feeStructure],
        ]}
      />

      <div className="rounded-xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <h3 className="text-sm font-semibold text-slate-800">
            Co-applicants ({form.coapplicants.length})
          </h3>
          <button
            type="button"
            onClick={() => goToStep(3)}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {form.coapplicants.map((c, i) => (
            <div key={i} className="px-4 py-3 text-sm">
              <p className="font-medium text-slate-800">
                {c.name || `Co-applicant ${i + 1}`}
              </p>
              <p className="text-slate-500">
                {[c.mobile, c.email, c.creditScore && `Score ${c.creditScore}`, c.experience]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                PAN: {c.pan || "—"} · Aadhaar: {c.aadhaar || "—"} · Selfie: {c.selfie || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ReviewBlock
        title="Financial documents"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["School bank statement", form.docSchoolBankStatement],
          ["Promoters' bank statement", form.docPromotersBankStatement],
          ["School financials", form.docSchoolFinancials],
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
          Our team will review your School &amp; College Loan application and reach
          out within 24 hours.
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