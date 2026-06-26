import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useState } from "react";
import {
  ShieldCheck,
  Clock3,
  BadgeCheck,
  ArrowRight,
  ArrowLeft,
  Check,
  Pencil,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  CGTMSE Loan Page                                                   */
/*  Hero = lead capture (Name + Mobile), with the CGTMSE image.        */
/*  Wizard = full CGTMSE flow.                                         */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
const BUSINESS_TYPES = ["Trader", "Manufacturer", "Service Provider"];
const LOAN_TYPES = ["Fresh", "Balance Transfer"];

const STEP_LABELS = [
  "Entity",
  "Business",
  "Incorporation",
  "PAN (Individual)",
  "Udyam",
  "PAN (Entity)",
  "GST",
  "Loan",
  "Turnover",
  "Review",
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const UDYAM_RE = /^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/;
const GST_RE = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;

function isoToday() {
  return new Date().toISOString().slice(0, 10);
}

const initialForm = {
  // 1
  entity: "",
  // 2
  businessType: "",
  // 3
  incorporationDate: "",
  // 4
  panIndividual: "",
  // 5
  udyam: "",
  // 6
  panEntity: "",
  // 7
  gst: "",
  gstAddressSameAsCurrent: "", // "yes" | "no"
  currentAddress: "",
  // 8
  loanAmount: "",
  loanType: "",
  // 9
  prevFyTurnover: "",
  currentFyTurnover: "",
  projectedFyTurnover: "",
};

/* ------------------------------------------------------------------ */
/*  Step sequencing — Step 6 (PAN Entity) is skipped for Proprietor    */
/* ------------------------------------------------------------------ */

function isProprietor(form) {
  return form.entity === "Proprietor";
}

function nextStepAfter(step, form) {
  let s = step + 1;
  if (s === 6 && isProprietor(form)) s += 1;
  return Math.min(s, 10);
}

function prevStepBefore(step, form) {
  let s = step - 1;
  if (s === 6 && isProprietor(form)) s -= 1;
  return Math.max(s, 1);
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.entity) e.entity = "Select the type of entity.";
  }

  if (step === 2) {
    if (!form.businessType) e.businessType = "Select the type of business.";
  }

  if (step === 3) {
    if (!form.incorporationDate)
      e.incorporationDate = "Date of incorporation is required.";
    else if (form.incorporationDate > isoToday())
      e.incorporationDate = "Date cannot be in the future.";
  }

  if (step === 4) {
    if (!form.panIndividual.trim())
      e.panIndividual = "PAN is required for CIBIL check.";
    else if (!PAN_RE.test(form.panIndividual.trim().toUpperCase()))
      e.panIndividual = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 5) {
    if (!form.udyam.trim())
      e.udyam = "Udyam Registration No. is mandatory for CGTMSE.";
    else if (!UDYAM_RE.test(form.udyam.trim().toUpperCase()))
      e.udyam = "Enter a valid Udyam number (e.g. UDYAM-UP-03-1234567).";
  }

  if (step === 6 && !isProprietor(form)) {
    if (!form.panEntity.trim()) e.panEntity = "Entity PAN is required.";
    else if (!PAN_RE.test(form.panEntity.trim().toUpperCase()))
      e.panEntity = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 7) {
    if (!form.gst.trim()) e.gst = "GST number is mandatory.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-character GST number.";
    if (!form.gstAddressSameAsCurrent)
      e.gstAddressSameAsCurrent =
        "Please confirm if this is your current business location.";
    else if (
      form.gstAddressSameAsCurrent === "no" &&
      !form.currentAddress.trim()
    )
      e.currentAddress = "Enter your current business address.";
  }

  if (step === 8) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
    if (!form.loanType) e.loanType = "Select a loan type.";
  }

  if (step === 9) {
    if (!form.prevFyTurnover.trim())
      e.prevFyTurnover = "Previous FY turnover is required.";
    else if (!/^\d+$/.test(form.prevFyTurnover))
      e.prevFyTurnover = "Enter a valid amount in numbers.";
    if (!form.currentFyTurnover.trim())
      e.currentFyTurnover = "Current FY turnover is required.";
    else if (!/^\d+$/.test(form.currentFyTurnover))
      e.currentFyTurnover = "Enter a valid amount in numbers.";
    if (!form.projectedFyTurnover.trim())
      e.projectedFyTurnover = "Projected FY turnover is required.";
    else if (!/^\d+$/.test(form.projectedFyTurnover))
      e.projectedFyTurnover = "Enter a valid amount in numbers.";
  }

  return e;
}

export default function CGTMSE() {
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

  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => nextStepAfter(s, form));
  };

  const back = () => {
    setErrors({});
    setStep((s) => prevStepBefore(s, form));
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    for (let s = 1; s <= 9; s++) {
      if (s === 6 && isProprietor(form)) continue;
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
/*  HERO (Name & Mobile capture)                                       */
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
    <section className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Left column */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              Collateral-Free Business Loans with{" "}
              <span className="text-emerald-600">CGTMSE</span> Cover
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Get government-backed credit guarantee support for your MSME —
              no collateral, faster approvals, and expert assistance at every
              step of your CGTMSE loan application.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/cgtmse_image.png"
                alt="Secure business funding"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<ShieldCheck className="h-5 w-5" />}
                title="No Collateral Required"
                text="Credit Guarantee Fund Trust cover means you don't pledge assets."
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
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              Start your CGTMSE Loan application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              CGTMSE Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Get the right loan for your{" "}
              <span className="text-emerald-600">business</span>
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
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-emerald-500 ${
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
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
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
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
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

function Wizard({ step, form, errors, set, setChoice, next, back, goToStep, onSubmit }) {
  const isReview = step === 10;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} form={form} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepEntity form={form} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepBusinessType form={form} setChoice={setChoice} errors={errors} />}
        {step === 3 && <StepIncorporation form={form} set={set} errors={errors} />}
        {step === 4 && <StepPanIndividual form={form} set={set} errors={errors} />}
        {step === 5 && <StepUdyam form={form} set={set} errors={errors} />}
        {step === 6 && <StepPanEntity form={form} set={set} errors={errors} />}
        {step === 7 && <StepGst form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 8 && <StepLoan form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 9 && <StepTurnover form={form} set={set} errors={errors} />}
        {step === 10 && <StepReview form={form} goToStep={goToStep} />}

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
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              {step === 9 ? "Review details" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Submit application <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper({ step, form }) {
  const labels = STEP_LABELS.filter(
    (_, i) => !(i === 5 && isProprietor(form)) // hide "PAN (Entity)" label for proprietor
  );
  // Map visual position back to actual step numbers for active/done state
  const visibleSteps = STEP_LABELS.map((_, i) => i + 1).filter(
    (n) => !(n === 6 && isProprietor(form))
  );

  return (
    <div className="flex items-center justify-between overflow-x-auto">
      {visibleSteps.map((n, idx) => {
        const label = STEP_LABELS[n - 1];
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-emerald-600 text-white"
                    : active
                    ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">
                {label}
              </span>
            </div>
            {idx < visibleSteps.length - 1 && (
              <div
                className={`mx-1 h-0.5 flex-1 ${
                  n < step ? "bg-emerald-600" : "bg-slate-200"
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
      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-emerald-500 ${
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
            value === o
              ? "border-emerald-600 bg-emerald-50 text-emerald-700"
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

/* ---------- Step 2: Business type ---------- */

function StepBusinessType({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Type of business</h2>
      <Field label="What does your business do?" error={errors.businessType}>
        <Pills
          value={form.businessType}
          onSelect={setChoice("businessType")}
          options={BUSINESS_TYPES}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 3: Date of incorporation ---------- */

function StepIncorporation({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Date of incorporation</h2>
      <Field label="When was the business incorporated / started?" error={errors.incorporationDate}>
        <Text
          type="date"
          value={form.incorporationDate}
          onChange={set("incorporationDate")}
          max={isoToday()}
          error={errors.incorporationDate}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 4: PAN Individual ---------- */

function StepPanIndividual({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Individual)</h2>
      <Field label="PAN (Individual)" hint="Used for CIBIL fetch" error={errors.panIndividual}>
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

/* ---------- Step 5: Udyam ---------- */

function StepUdyam({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Udyam Registration</h2>
      <Field
        label="Udyam Registration No."
        hint="Mandatory for CGTMSE"
        error={errors.udyam}
      >
        <Text
          value={form.udyam}
          onChange={(e) =>
            set("udyam")({ target: { value: e.target.value.toUpperCase() } })
          }
          placeholder="UDYAM-UP-03-1234567"
          error={errors.udyam}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 6: PAN Entity (skipped for Proprietor) ---------- */

function StepPanEntity({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Entity)</h2>
      <Field label="PAN of the business entity" error={errors.panEntity}>
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
          placeholder="ABCDE1234F"
          error={errors.panEntity}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 7: GST ---------- */

function StepGst({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">GST details</h2>
      <Field
        label="GST Number"
        hint="Mandatory — auto fetch business details from GST"
        error={errors.gst}
      >
        <Text
          value={form.gst}
          onChange={(e) =>
            set("gst")({
              target: { value: e.target.value.toUpperCase().slice(0, 15) },
            })
          }
          placeholder="22AAAAA0000A1Z5"
          error={errors.gst}
        />
      </Field>

      {form.gst && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
          <Field
            label="Is this GST registered address your current business location?"
            error={errors.gstAddressSameAsCurrent}
          >
            <Pills
              value={form.gstAddressSameAsCurrent}
              onSelect={setChoice("gstAddressSameAsCurrent")}
              options={["Yes", "No"]}
            />
          </Field>

          {form.gstAddressSameAsCurrent === "No" && (
            <div className="mt-4">
              <Field label="Current business address" error={errors.currentAddress}>
                <Text
                  value={form.currentAddress}
                  onChange={set("currentAddress")}
                  placeholder="Enter your current business address"
                  error={errors.currentAddress}
                />
              </Field>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Step 8: Loan ---------- */

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

/* ---------- Step 9: Turnover ---------- */

function StepTurnover({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Turnover details</h2>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Previous FY turnover" error={errors.prevFyTurnover}>
          <Text
            value={form.prevFyTurnover}
            onChange={onlyDigits(set("prevFyTurnover"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.prevFyTurnover}
          />
        </Field>
        <Field label="Current FY turnover (till date)" error={errors.currentFyTurnover}>
          <Text
            value={form.currentFyTurnover}
            onChange={onlyDigits(set("currentFyTurnover"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.currentFyTurnover}
          />
        </Field>
        <Field label="Projected turnover (current FY)" error={errors.projectedFyTurnover}>
          <Text
            value={form.projectedFyTurnover}
            onChange={onlyDigits(set("projectedFyTurnover"))}
            placeholder="₹"
            inputMode="numeric"
            error={errors.projectedFyTurnover}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 10: Review ---------- */

function ReviewBlock({ title, stepNo, goToStep, rows }) {
  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <button
          type="button"
          onClick={() => goToStep(stepNo)}
          className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-700"
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
        title="Entity"
        stepNo={1}
        goToStep={goToStep}
        rows={[["Type of entity", form.entity]]}
      />
      <ReviewBlock
        title="Business"
        stepNo={2}
        goToStep={goToStep}
        rows={[["Type of business", form.businessType]]}
      />
      <ReviewBlock
        title="Incorporation"
        stepNo={3}
        goToStep={goToStep}
        rows={[["Date of incorporation", form.incorporationDate]]}
      />
      <ReviewBlock
        title="PAN (Individual)"
        stepNo={4}
        goToStep={goToStep}
        rows={[["PAN", form.panIndividual]]}
      />
      <ReviewBlock
        title="Udyam Registration"
        stepNo={5}
        goToStep={goToStep}
        rows={[["Udyam Registration No.", form.udyam]]}
      />
      {!proprietor && (
        <ReviewBlock
          title="PAN (Entity)"
          stepNo={6}
          goToStep={goToStep}
          rows={[["Entity PAN", form.panEntity]]}
        />
      )}
      <ReviewBlock
        title="GST"
        stepNo={7}
        goToStep={goToStep}
        rows={[
          ["GST Number", form.gst],
          [
            "Current location same as GST",
            form.gstAddressSameAsCurrent,
          ],
          ...(form.gstAddressSameAsCurrent === "No"
            ? [["Current address", form.currentAddress]]
            : []),
        ]}
      />
      <ReviewBlock
        title="Loan"
        stepNo={8}
        goToStep={goToStep}
        rows={[
          ["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`],
          ["Loan type", form.loanType],
        ]}
      />
      <ReviewBlock
        title="Turnover"
        stepNo={9}
        goToStep={goToStep}
        rows={[
          ["Previous FY turnover", form.prevFyTurnover && `₹ ${form.prevFyTurnover}`],
          ["Current FY turnover", form.currentFyTurnover && `₹ ${form.currentFyTurnover}`],
          ["Projected FY turnover", form.projectedFyTurnover && `₹ ${form.projectedFyTurnover}`],
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
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600">
          Our team will review your CGTMSE Loan application and reach out
          within 24 hours with matched offers.
        </p>
        <button
          onClick={onReset}
          className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Start a new application
        </button>
      </div>
    </section>
  );
}