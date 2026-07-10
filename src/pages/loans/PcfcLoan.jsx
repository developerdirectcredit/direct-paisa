


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
  CheckCircle,
  Calendar,
  IndianRupee,
  Percent,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  PCFC — Packing Credit in Foreign Currency (Pre-Shipment Export)    */
/*  Hero = lead capture (Name + Mobile), restyled to Agri Loan's       */
/*         navy (#001f54) / red (#e8112d) theme, with new How-It-Works/*/
/*         Key-Advantages / Application-Process / Repayment stats /    */
/*         Representative-cost-table / Repayment-Term content below.  */
/*  Wizard = the full PCFC flow (unchanged).                           */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietorship", "Partnership", "Pvt Ltd", "LLP", "Others"];
const BUSINESS_NATURES = [
  "Merchant Exporter",
  "Manufacturer Exporter",
  "Service Exporter",
];
const PAYMENT_TERMS = ["FOB", "CIF", "Advance", "LC", "DA", "DP"];
const CURRENCIES = ["USD", "EUR", "GBP", "JPY", "Others"];
const PURPOSES = [
  "Purchase of Raw Materials",
  "Processing / Manufacturing",
  "Packing & Pre-Shipment Expenses",
  "Other export-related purposes",
];
const TENURES = ["30 days", "60 days", "90 days", "120 days", "180 days"];
const LOAN_TYPES = [
  "Fresh PCFC",
  "Liquidation by Exchange Bills",
  "Roll-over / Renewal",
];
const COLLATERAL_TYPES = ["Residential", "Commercial", "Industrial"];
const DOC_METHODS = ["Fetch securely via Accumn (OTP)", "Upload manually"];

// Indicative FX rates to INR for the transparency estimate (demo only).
const FX_TO_INR = { USD: 86, EUR: 93, GBP: 109, JPY: 0.55, Others: 1 };

// CIBIL threshold below which the journey ends with a rejection.
const CIBIL_THRESHOLD = 700;

const STEP_LABELS = [
  "Basic",
  "PAN",
  "Entity PAN",
  "CIBIL",
  "Trade",
  "Loan",
  "Turnover",
  "Collateral",
  "Documents",
  "Review",
];

// ── How PCFC Works ───────────────────────────────────────────────────
const howItWorks = [
  "Eligibility: Exporters must have a confirmed export order or a valid Letter of Credit (LC) from an overseas buyer.",
  "Currency Choice: You can borrow in the currency that matches your export invoice, which provides a natural hedge against exchange rate fluctuations.",
  "Tenure: The loan is typically sanctioned for a period of up to 180 days (6 months) depending on the production cycle.",
  "Repayment: The loan is self-liquidating; it is paid off using the export proceeds received from your international buyer.",
];

// ── Key Advantages ────────────────────────────────────────────────────
const keyAdvantages = [
  "Lower Interest Rates: Because PCFC rates are linked to international benchmarks (like SOFR or EURIBOR), they are often cheaper than domestic Rupee loans.",
  "Natural Hedge: Borrowing and earning in the same foreign currency protects profit margins from sudden currency swings.",
  "Flexible Drawing: Facilities can be provided on an \"order-based\" or \"running account\" basis to suit your specific business operations.",
];

// ── Application Process and Requirements ─────────────────────────────
const applicationProcess =
  "To secure PCFC, banks typically require you to submit the underlying export orders, open an operative account, and provide a margin (usually between 10% to 25% of the order value). Primary security involves the hypothecation of current assets, while collateral like fixed assets or bank deposits may also be requested.";

// ── Repayment period, loan amount range & interest rate ─────────────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "30 days" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "180 days" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹10,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹10,00,00,000" },
  { icon: Percent, title: "Applicable Interest Rate", desc: "Up to LIBOR / EURIBOR + 1.0% – 3.0% (approx.) p.a." },
];

// ── Representative example of loan cost ───────────────────────────────
const loanCostDetails = [
  { feature: "Facility Type", details: "PCFC" },
  { feature: "Loan Amount", details: "USD 1,00,000" },
  { feature: "Purpose", details: "Export pre-shipment working capital" },
  { feature: "Tenure / Discounting Period", details: "90 days" },
  { feature: "Interest Rate (Indicative)", details: "5.50% p.a. (LIBOR + Bank Margin)" },
  { feature: "Interest Cost for Period", details: "USD 1,360 (approx.)" },
  { feature: "Processing / Bank Fee", details: "0.25% – 1% of loan amount" },
  { feature: "Collateral / Margin Requirement", details: "0% – 25% FD / Collateral Based" },
  { feature: "Repayment", details: "Upon export invoice realisation / LC settlement" },
  { feature: "Subsidy", details: "Interest subsidy available to eligible MSME exporter" },
];

// ── Repayment Term ────────────────────────────────────────────────────
const repaymentTerm = [
  "Full repayment period aligned with export invoice settlement.",
  "Typically 30–180 days, depending on export contract terms.",
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const GST_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
// IEC is a 10-character alphanumeric code (PAN-based since 2017).
const IEC_RE = /^[A-Z0-9]{10}$/;

const initialForm = {
  // 1 — basic
  entity: "",
  entityOther: "",
  businessNature: "",
  incorpDate: "",
  // 2 — PAN (Individual)
  individualPan: "",
  // 3 — PAN (Entity) — only if non-proprietorship
  entityPan: "",
  // 4 — CIBIL
  cibilConsent: false,
  // 5 — trade details (GST, IEC, export order, currency, purpose)
  gst: "",
  iec: "",
  exportDocType: "", // "Export Order" | "Letter of Credit"
  exportDocFile: "",
  buyerName: "",
  buyerCountry: "",
  orderValue: "",
  shipmentTimeline: "",
  paymentTerms: "",
  exportCurrency: "",
  exportCurrencyOther: "",
  purpose: "",
  purposeOther: "",
  // 6 — loan details
  loanFcyAmount: "",
  tenure: "",
  loanType: "",
  // 7 — turnover
  prevExportTurnover: "",
  prevDomesticTurnover: "",
  currExportTurnover: "",
  currDomesticTurnover: "",
  projectedExportTurnover: "",
  // 8 — collateral (only if secured)
  collateralRequired: "", // "Secured" | "Unsecured"
  collateralType: "",
  ownershipDetails: "",
  marketValue: "",
  freeFromCharge: "",
  // 9 — documents
  docMethod: "",
  accumnOtpConsent: false,
  docBankStatement: "",
  docAuditedFinancials: "",
  docStockDebtors: "",
  docExportInvoices: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isProprietor(form) {
  return form.entity === "Proprietorship";
}
function isSecured(form) {
  return form.collateralRequired === "Secured";
}
function isManualUpload(form) {
  return form.docMethod === "Upload manually";
}
function inrEquivalent(form) {
  const amt = Number(form.loanFcyAmount);
  const rate = FX_TO_INR[form.exportCurrency];
  if (!amt || !rate) return null;
  return Math.round(amt * rate);
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.entity) e.entity = "Select the type of entity.";
    if (form.entity === "Others" && !form.entityOther.trim())
      e.entityOther = "Please specify the entity type.";
    if (!form.businessNature) e.businessNature = "Select the nature of business.";
    if (!form.incorpDate) e.incorpDate = "Date of incorporation is required.";
    else if (new Date(form.incorpDate) > new Date())
      e.incorpDate = "Date cannot be in the future.";
  }

  if (step === 2) {
    if (!form.individualPan.trim()) e.individualPan = "PAN is required for CIBIL fetch.";
    else if (!PAN_RE.test(form.individualPan.trim().toUpperCase()))
      e.individualPan = "Enter a valid PAN (e.g. ABCDE1234F).";
  }

  if (step === 3) {
    if (!isProprietor(form)) {
      if (!form.entityPan.trim()) e.entityPan = "Entity PAN is required.";
      else if (!PAN_RE.test(form.entityPan.trim().toUpperCase()))
        e.entityPan = "Enter a valid PAN (e.g. AAAAA0000A).";
    }
  }

  if (step === 4) {
    if (!form.cibilConsent)
      e.cibilConsent = "Consent is required to fetch your CIBIL score.";
  }

  if (step === 5) {
    if (!form.gst.trim()) e.gst = "GST number is required.";
    else if (!GST_RE.test(form.gst.trim().toUpperCase()))
      e.gst = "Enter a valid 15-digit GST number.";
    if (!form.iec.trim()) e.iec = "IEC is required.";
    else if (!IEC_RE.test(form.iec.trim().toUpperCase()))
      e.iec = "Enter a valid 10-character IEC.";
    if (!form.exportDocType) e.exportDocType = "Select Export Order or Letter of Credit.";
    if (!form.exportDocFile) e.exportDocFile = "Upload the document.";
    if (!form.buyerName.trim()) e.buyerName = "Buyer name is required.";
    if (!form.buyerCountry.trim()) e.buyerCountry = "Buyer country is required.";
    if (!form.orderValue.trim()) e.orderValue = "Order value is required.";
    else if (!/^\d+(\.\d+)?$/.test(form.orderValue))
      e.orderValue = "Enter a valid amount.";
    if (!form.shipmentTimeline.trim())
      e.shipmentTimeline = "Shipment timeline is required.";
    if (!form.paymentTerms) e.paymentTerms = "Select payment terms.";
    if (!form.exportCurrency) e.exportCurrency = "Select the export currency.";
    if (form.exportCurrency === "Others" && !form.exportCurrencyOther.trim())
      e.exportCurrencyOther = "Please specify the export currency.";
    if (!form.purpose) e.purpose = "Select the purpose of PCFC.";
    if (form.purpose === "Other export-related purposes" && !form.purposeOther.trim())
      e.purposeOther = "Please specify the purpose.";
  }

  if (step === 6) {
    if (!form.loanFcyAmount.trim())
      e.loanFcyAmount = "Loan amount (foreign currency) is required.";
    else if (!/^\d+(\.\d+)?$/.test(form.loanFcyAmount))
      e.loanFcyAmount = "Enter a valid amount.";
    if (!form.tenure) e.tenure = "Select a tenure.";
    if (!form.loanType) e.loanType = "Select a loan type.";
  }

  if (step === 7) {
    if (!form.prevExportTurnover.trim())
      e.prevExportTurnover = "Previous FY export turnover is required.";
    else if (!/^\d+$/.test(form.prevExportTurnover))
      e.prevExportTurnover = "Enter a valid amount.";
    if (!form.prevDomesticTurnover.trim())
      e.prevDomesticTurnover = "Previous FY domestic turnover is required.";
    else if (!/^\d+$/.test(form.prevDomesticTurnover))
      e.prevDomesticTurnover = "Enter a valid amount.";
    if (!form.currExportTurnover.trim())
      e.currExportTurnover = "Current FY export turnover is required.";
    else if (!/^\d+$/.test(form.currExportTurnover))
      e.currExportTurnover = "Enter a valid amount.";
    if (!form.currDomesticTurnover.trim())
      e.currDomesticTurnover = "Current FY domestic turnover is required.";
    else if (!/^\d+$/.test(form.currDomesticTurnover))
      e.currDomesticTurnover = "Enter a valid amount.";
    if (!form.projectedExportTurnover.trim())
      e.projectedExportTurnover = "Projected export turnover is required.";
    else if (!/^\d+$/.test(form.projectedExportTurnover))
      e.projectedExportTurnover = "Enter a valid amount.";
  }

  if (step === 8) {
    if (!form.collateralRequired)
      e.collateralRequired = "Select secured or unsecured PCFC.";
    if (isSecured(form)) {
      if (!form.collateralType) e.collateralType = "Select collateral type.";
      if (!form.ownershipDetails.trim())
        e.ownershipDetails = "Ownership details are required.";
      if (!form.marketValue.trim()) e.marketValue = "Market value is required.";
      else if (!/^\d+$/.test(form.marketValue))
        e.marketValue = "Enter a valid amount.";
      if (!form.freeFromCharge)
        e.freeFromCharge = "Select whether the property is free from charge.";
    }
  }

  if (step === 9) {
    if (!form.docMethod) e.docMethod = "Select how to share your documents.";
    if (form.docMethod === "Fetch securely via Accumn (OTP)" && !form.accumnOtpConsent)
      e.accumnOtpConsent = "OTP / Accumn consent is required.";
    if (isManualUpload(form)) {
      if (!form.docBankStatement)
        e.docBankStatement = "Bank statements (last 12 months) are required.";
      if (!form.docAuditedFinancials)
        e.docAuditedFinancials = "Audited financials (last 2 years) are required.";
      if (!form.docStockDebtors)
        e.docStockDebtors = "Stock / Debtors / Creditors data is required.";
      if (!form.docExportInvoices)
        e.docExportInvoices = "Export invoices (past 6–12 months) are required.";
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

export default function PcfcLoan() {
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

  // Steps: skip Entity PAN (3) when proprietor; skip Collateral (8) when unsecured.
  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    // After CIBIL consent (step 4): fetch score and gate the journey.
    if (step === 4) {
      const score = fetchCibilScore(form.individualPan);
      setCibilScore(score);
      if (score < CIBIL_THRESHOLD) {
        setRejected(true);
        return;
      }
    }

    setStep((s) => {
      if (s === 2 && isProprietor(form)) return 4; // skip entity PAN
      if (s === 7 && !isSecured(form)) {
        // collateral choice lives on step 8; but if already chosen unsecured earlier,
        // we still need step 8 to let them pick. So always go to 8 here.
        return 8;
      }
      return Math.min(s + 1, 10);
    });
  };

  const back = () => {
    setErrors({});
    setStep((s) => {
      if (s === 4 && isProprietor(form)) return 2; // skip entity PAN
      if (s === 9 && !isSecured(form)) return 8; // collateral screen still shown to choose
      return Math.max(s - 1, 1);
    });
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    for (let s = 1; s <= 9; s++) {
      if (s === 3 && isProprietor(form)) continue; // entity PAN skipped
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
              Pre-Shipment Export Finance{" "}
              <span className="text-[#e8112d]">(PCFC)</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Packing Credit in Foreign Currency for exporters — fund raw
              materials, processing and pre-shipment expenses at competitive
              foreign-currency rates, with expert support at every step.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/pcfc-loan.png"
                alt="Pre-Shipment Credit in Foreign Currency (PCFC)"
                className="h-64 w-full object-cover lg:h-72"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature
                icon={<Landmark className="h-5 w-5" />}
                title="Foreign Currency Pre-Shipment Credit"
                text="Competitive FCY funding against your export orders and LCs."
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
            <div className="rounded-xl bg-[#001f54] px-4 py-3 text-sm font-semibold text-white text-center">
              Start your PCFC export finance application — it only takes a minute.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              PCFC — Export Finance
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund your{" "}
              <span className="text-[#e8112d]">exports</span> pre-shipment
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

        {/* ── HOW PCFC WORKS ── */}
        <section className="py-10 border-t mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How PCFC Works</h2>
          <ul className="space-y-3 pl-1">
            {howItWorks.map((w) => (
              <li key={w} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-1 flex-shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </section>

        {/* ── KEY ADVANTAGES ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Advantages</h2>
          <ul className="space-y-3 pl-1">
            {keyAdvantages.map((k) => (
              <li key={k} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-1 flex-shrink-0" />
                {k}
              </li>
            ))}
          </ul>
        </section>

        {/* ── APPLICATION PROCESS AND REQUIREMENTS ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Process and Requirements</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{applicationProcess}</p>
        </section>

        {/* ── REPAYMENT PERIOD, LOAN AMOUNT & INTEREST RATE ── */}
        <section className="py-10 border-t">
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

        {/* ── REPAYMENT TERM ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Repayment Term</h2>
          <ul className="space-y-2 pl-1">
            {repaymentTerm.map((r) => (
              <li key={r} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-0.5 flex-shrink-0" />
                {r}
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
  const isReview = step === 10;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepBasic form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 2 && <StepPanIndividual form={form} set={set} errors={errors} />}
        {step === 3 && <StepPanEntity form={form} set={set} errors={errors} />}
        {step === 4 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepTrade form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
        {step === 6 && <StepLoan form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 7 && <StepTurnover form={form} set={set} errors={errors} />}
        {step === 8 && <StepCollateral form={form} set={set} setChoice={setChoice} errors={errors} />}
        {step === 9 && <StepDocuments form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
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
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              {step === 9 ? "Review details" : step === 4 ? "Check CIBIL & continue" : "Continue"}{" "}
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
const onlyDecimal = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/[^\d.]/g, "") } });

/* ---------- Step 1: Basic ---------- */

function StepBasic({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Basic business details</h2>

      <Field label="Type of entity" error={errors.entity}>
        <Pills value={form.entity} onSelect={setChoice("entity")} options={ENTITY_TYPES} />
      </Field>

      {form.entity === "Others" && (
        <Field label="Please specify entity type" error={errors.entityOther}>
          <Text
            value={form.entityOther}
            onChange={set("entityOther")}
            placeholder="Specify entity type"
            error={errors.entityOther}
          />
        </Field>
      )}

      <Field label="Nature of business" error={errors.businessNature}>
        <Pills
          value={form.businessNature}
          onSelect={setChoice("businessNature")}
          options={BUSINESS_NATURES}
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
      <Field label="PAN Number" hint="Used for CIBIL fetch" error={errors.individualPan}>
        <Text
          value={form.individualPan}
          onChange={(e) =>
            set("individualPan")({
              target: {
                value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
              },
            })
          }
          placeholder="ABCDE1234F"
          error={errors.individualPan}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 3: PAN (Entity) — only if non-proprietorship ---------- */

function StepPanEntity({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">PAN (Entity)</h2>
      <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
        Entity PAN is required for non-proprietorship firms.
      </p>
      <Field label="Entity PAN Number" error={errors.entityPan}>
        <Text
          value={form.entityPan}
          onChange={(e) =>
            set("entityPan")({
              target: {
                value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
              },
            })
          }
          placeholder="AAAAA0000A"
          error={errors.entityPan}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 4: CIBIL consent ---------- */

function StepCibil({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Credit Bureau Check (CIBIL)</h2>
      <p className="text-sm text-slate-600">
        We use your Individual PAN to fetch your CIBIL score. A minimum score is
        required to proceed.
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

/* ---------- Step 5: Trade details (GST, IEC, export order, currency, purpose) ---------- */

function StepTrade({ form, set, setChoice, setFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Trade &amp; export order details</h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="GST Number" error={errors.gst}>
          <Text
            value={form.gst}
            onChange={(e) =>
              set("gst")({
                target: {
                  value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15),
                },
              })
            }
            placeholder="22AAAAA0000A1Z5"
            error={errors.gst}
          />
        </Field>
        <Field label="IEC (Importer Exporter Code)" error={errors.iec}>
          <Text
            value={form.iec}
            onChange={(e) =>
              set("iec")({
                target: {
                  value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
                },
              })
            }
            placeholder="ABCDE1234F"
            error={errors.iec}
          />
        </Field>
      </div>

      <Field label="Export Order / Letter of Credit" error={errors.exportDocType}>
        <Pills
          value={form.exportDocType}
          onSelect={setChoice("exportDocType")}
          options={["Export Order", "Letter of Credit"]}
        />
      </Field>

      <FileRow
        label={
          form.exportDocType === "Letter of Credit"
            ? "Upload Letter of Credit"
            : "Upload Export Order / Purchase Order"
        }
        required
        name={form.exportDocFile}
        onChange={setFile("exportDocFile")}
        error={errors.exportDocFile}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Buyer name" error={errors.buyerName}>
          <Text value={form.buyerName} onChange={set("buyerName")} placeholder="Buyer name" error={errors.buyerName} />
        </Field>
        <Field label="Buyer country" error={errors.buyerCountry}>
          <Text value={form.buyerCountry} onChange={set("buyerCountry")} placeholder="Country" error={errors.buyerCountry} />
        </Field>
        <Field label="Order value (foreign currency)" error={errors.orderValue}>
          <Text value={form.orderValue} onChange={onlyDecimal(set("orderValue"))} placeholder="e.g. 50000" inputMode="decimal" error={errors.orderValue} />
        </Field>
        <Field label="Shipment timeline" error={errors.shipmentTimeline}>
          <Text value={form.shipmentTimeline} onChange={set("shipmentTimeline")} placeholder="e.g. 60 days" error={errors.shipmentTimeline} />
        </Field>
      </div>

      <Field label="Payment terms" error={errors.paymentTerms}>
        <Pills value={form.paymentTerms} onSelect={setChoice("paymentTerms")} options={PAYMENT_TERMS} />
      </Field>

      <Field label="Export currency required" error={errors.exportCurrency}>
        <Pills value={form.exportCurrency} onSelect={setChoice("exportCurrency")} options={CURRENCIES} />
      </Field>

      {form.exportCurrency === "Others" && (
        <Field label="Please specify export currency" error={errors.exportCurrencyOther}>
          <Text
            value={form.exportCurrencyOther}
            onChange={set("exportCurrencyOther")}
            placeholder="Specify currency (e.g. AED, SGD)"
            error={errors.exportCurrencyOther}
          />
        </Field>
      )}

      <Field label="Purpose of PCFC" error={errors.purpose}>
        <Pills value={form.purpose} onSelect={setChoice("purpose")} options={PURPOSES} />
      </Field>

      {form.purpose === "Other export-related purposes" && (
        <Field label="Please specify purpose" error={errors.purposeOther}>
          <Text
            value={form.purposeOther}
            onChange={set("purposeOther")}
            placeholder="Specify purpose"
            error={errors.purposeOther}
          />
        </Field>
      )}
    </div>
  );
}

/* ---------- Step 6: Loan details ---------- */

function StepLoan({ form, set, setChoice, errors }) {
  const inr = inrEquivalent(form);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan details</h2>

      <Field
        label={`Loan amount required (${form.exportCurrency || "FCY"})`}
        error={errors.loanFcyAmount}
      >
        <Text
          value={form.loanFcyAmount}
          onChange={onlyDecimal(set("loanFcyAmount"))}
          placeholder="Foreign currency amount"
          inputMode="decimal"
          error={errors.loanFcyAmount}
        />
      </Field>

      {inr !== null && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Approx INR equivalent:{" "}
          <span className="font-semibold">₹{inr.toLocaleString("en-IN")}</span>{" "}
          <span className="text-blue-500">(indicative, for transparency)</span>
        </p>
      )}

      <Field label="Tenure required" hint="Max 180 days as per PCFC guidelines" error={errors.tenure}>
        <Pills value={form.tenure} onSelect={setChoice("tenure")} options={TENURES} />
      </Field>

      <Field label="Loan type" error={errors.loanType}>
        <Pills value={form.loanType} onSelect={setChoice("loanType")} options={LOAN_TYPES} />
      </Field>
    </div>
  );
}

/* ---------- Step 7: Turnover ---------- */

function StepTurnover({ form, set, errors }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Turnover details</h2>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Previous FY turnover</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Export turnover" error={errors.prevExportTurnover}>
            <Text value={form.prevExportTurnover} onChange={onlyDigits(set("prevExportTurnover"))} placeholder="₹" inputMode="numeric" error={errors.prevExportTurnover} />
          </Field>
          <Field label="Domestic turnover" error={errors.prevDomesticTurnover}>
            <Text value={form.prevDomesticTurnover} onChange={onlyDigits(set("prevDomesticTurnover"))} placeholder="₹" inputMode="numeric" error={errors.prevDomesticTurnover} />
          </Field>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <h3 className="mb-3 text-sm font-semibold text-slate-700">Current FY turnover (till date)</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Export turnover" error={errors.currExportTurnover}>
            <Text value={form.currExportTurnover} onChange={onlyDigits(set("currExportTurnover"))} placeholder="₹" inputMode="numeric" error={errors.currExportTurnover} />
          </Field>
          <Field label="Domestic turnover" error={errors.currDomesticTurnover}>
            <Text value={form.currDomesticTurnover} onChange={onlyDigits(set("currDomesticTurnover"))} placeholder="₹" inputMode="numeric" error={errors.currDomesticTurnover} />
          </Field>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <Field label="Projected export turnover (current FY)" error={errors.projectedExportTurnover}>
          <Text value={form.projectedExportTurnover} onChange={onlyDigits(set("projectedExportTurnover"))} placeholder="₹" inputMode="numeric" error={errors.projectedExportTurnover} />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 8: Collateral (choose secured / unsecured) ---------- */

function StepCollateral({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Collateral</h2>
      <p className="text-sm text-slate-600">
        Depending on lender rules, PCFC may be secured or unsecured. Select your
        applicable option.
      </p>

      <Field label="PCFC type" error={errors.collateralRequired}>
        <Pills
          value={form.collateralRequired}
          onSelect={setChoice("collateralRequired")}
          options={["Secured", "Unsecured"]}
        />
      </Field>

      {isSecured(form) && (
        <>
          <Field label="Collateral type" error={errors.collateralType}>
            <Pills value={form.collateralType} onSelect={setChoice("collateralType")} options={COLLATERAL_TYPES} />
          </Field>
          <Field label="Ownership details" error={errors.ownershipDetails}>
            <Text value={form.ownershipDetails} onChange={set("ownershipDetails")} placeholder="e.g. Self-owned / Co-owned" error={errors.ownershipDetails} />
          </Field>
          <Field label="Market value" error={errors.marketValue}>
            <Text value={form.marketValue} onChange={onlyDigits(set("marketValue"))} placeholder="₹ in INR" inputMode="numeric" error={errors.marketValue} />
          </Field>
          <Field label="Property free from charge?" error={errors.freeFromCharge}>
            <Pills value={form.freeFromCharge} onSelect={setChoice("freeFromCharge")} options={["Yes", "No"]} />
          </Field>
        </>
      )}

      {form.collateralRequired === "Unsecured" && (
        <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-800">
          Unsecured PCFC selected — no collateral details needed.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 9: Documents (Accumn auto-fetch or manual) ---------- */

function StepDocuments({ form, set, setChoice, setFile, errors }) {
  const manual = isManualUpload(form);
  const accumn = form.docMethod === "Fetch securely via Accumn (OTP)";
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Bank &amp; financial documents</h2>

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
              I consent to a secure, OTP-based fetch of my bank statements,
              financials, GST returns and existing PCFC/WC limits via Accumn.
            </span>
          </label>
          {errors.accumnOtpConsent && <ErrorText>{errors.accumnOtpConsent}</ErrorText>}

          {form.accumnOtpConsent && (
            <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <span>
                On submit, you'll be redirected to Accumn's secure OTP-based fetch
                to auto-import your last 12 months bank statements, GST returns and
                existing PCFC / WC limits.
              </span>
            </div>
          )}
        </>
      )}

      {manual && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">Upload the documents below.</p>
          <FileRow label="Bank statements (last 12 months)" required name={form.docBankStatement} onChange={setFile("docBankStatement")} error={errors.docBankStatement} />
          <FileRow label="Audited financials (last 2 years)" required name={form.docAuditedFinancials} onChange={setFile("docAuditedFinancials")} error={errors.docAuditedFinancials} />
          <FileRow label="Stock / Debtors / Creditors data" required name={form.docStockDebtors} onChange={setFile("docStockDebtors")} error={errors.docStockDebtors} />
          <FileRow label="Export invoices (past 6–12 months)" required name={form.docExportInvoices} onChange={setFile("docExportInvoices")} error={errors.docExportInvoices} />
        </div>
      )}
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
  const secured = isSecured(form);
  const inr = inrEquivalent(form);
  const entityLabel =
    form.entity === "Others" && form.entityOther
      ? `Others — ${form.entityOther}`
      : form.entity;
  const currencyLabel =
    form.exportCurrency === "Others" && form.exportCurrencyOther
      ? `Others — ${form.exportCurrencyOther}`
      : form.exportCurrency;
  const purposeLabel =
    form.purpose === "Other export-related purposes" && form.purposeOther
      ? `Other — ${form.purposeOther}`
      : form.purpose;
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
        title="Basic business details"
        stepNo={1}
        goToStep={goToStep}
        rows={[
          ["Type of entity", entityLabel],
          ["Nature of business", form.businessNature],
          ["Date of incorporation", form.incorpDate],
        ]}
      />
      <ReviewBlock
        title="PAN (Individual)"
        stepNo={2}
        goToStep={goToStep}
        rows={[["PAN", form.individualPan]]}
      />
      {!proprietor && (
        <ReviewBlock
          title="PAN (Entity)"
          stepNo={3}
          goToStep={goToStep}
          rows={[["Entity PAN", form.entityPan]]}
        />
      )}
      <ReviewBlock
        title="CIBIL"
        stepNo={4}
        goToStep={goToStep}
        rows={[["Consent", form.cibilConsent ? "Given" : "Not given"]]}
      />
      <ReviewBlock
        title="Trade & export order"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["GST Number", form.gst],
          ["IEC", form.iec],
          ["Document", form.exportDocType],
          ["Uploaded file", form.exportDocFile],
          ["Buyer", [form.buyerName, form.buyerCountry].filter(Boolean).join(", ")],
          ["Order value", form.orderValue && `${form.orderValue} ${form.exportCurrency}`],
          ["Shipment timeline", form.shipmentTimeline],
          ["Payment terms", form.paymentTerms],
          ["Export currency", currencyLabel],
          ["Purpose", purposeLabel],
        ]}
      />
      <ReviewBlock
        title="Loan details"
        stepNo={6}
        goToStep={goToStep}
        rows={[
          ["Loan amount (FCY)", form.loanFcyAmount && `${form.loanFcyAmount} ${form.exportCurrency}`],
          ["INR equivalent", inr !== null ? `₹ ${inr.toLocaleString("en-IN")}` : ""],
          ["Tenure", form.tenure],
          ["Loan type", form.loanType],
        ]}
      />
      <ReviewBlock
        title="Turnover"
        stepNo={7}
        goToStep={goToStep}
        rows={[
          ["Prev FY export", form.prevExportTurnover && `₹ ${form.prevExportTurnover}`],
          ["Prev FY domestic", form.prevDomesticTurnover && `₹ ${form.prevDomesticTurnover}`],
          ["Curr FY export", form.currExportTurnover && `₹ ${form.currExportTurnover}`],
          ["Curr FY domestic", form.currDomesticTurnover && `₹ ${form.currDomesticTurnover}`],
          ["Projected export", form.projectedExportTurnover && `₹ ${form.projectedExportTurnover}`],
        ]}
      />
      <ReviewBlock
        title="Collateral"
        stepNo={8}
        goToStep={goToStep}
        rows={[
          ["PCFC type", form.collateralRequired],
          ...(secured
            ? [
                ["Collateral type", form.collateralType],
                ["Ownership details", form.ownershipDetails],
                ["Market value", form.marketValue && `₹ ${form.marketValue}`],
                ["Free from charge?", form.freeFromCharge],
              ]
            : []),
        ]}
      />
      <ReviewBlock
        title="Bank & financial documents"
        stepNo={9}
        goToStep={goToStep}
        rows={[
          ["Method", form.docMethod],
          ...(form.docMethod === "Fetch securely via Accumn (OTP)"
            ? [["Accumn / OTP consent", form.accumnOtpConsent ? "Given" : "Not given"]]
            : [
                ["Bank statements", form.docBankStatement],
                ["Audited financials", form.docAuditedFinancials],
                ["Stock / Debtors / Creditors", form.docStockDebtors],
                ["Export invoices", form.docExportInvoices],
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
          are unable to proceed with your PCFC application at this time. You can
          re-apply once your credit profile improves.
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
          Our team will review your PCFC export finance application and reach out
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