


// ==== // ye code  purana hai jisem bahut sare bank ka loan amout show rha hai 

// == add loan offer a UTM link change 

import { useState, useRef, useEffect } from "react";
import {
  CheckCircle, ArrowRight, ArrowLeft, AlertCircle,
  Phone, Mail, X, ExternalLink,
} from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BAJAJ_LINK =
  "https://www.bajajfinservmarkets.in/apply-for-personal-loan-finservmarkets/?utm_source=ERefferalAffiliate&utm_medium=SOL&utm_campaign=Open&utm_content=DirectCredit&utm_term=june26SC1_";

function todayMinusYears(years) {
  const d = new Date(); //---------------- acces current date------
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().split("T")[0];
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

const STEP_LABELS = ["Basic Details", "Verify Mobile", "Verify Email", "CIBIL Check", "Loan Details", "Income Details"];

function ProgressBar({ step, totalVisible }) {
  return (
    <div className="flex items-center gap-1.5 mb-7">
      {STEP_LABELS.slice(0, totalVisible).map((label, i) => (
        <div key={label} className="flex-1">
          <div
            className={`h-1.5 rounded-full transition-colors ${
              i < step ? "bg-blue-600" : i === step ? "bg-blue-300" : "bg-gray-200"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Reusable OTP input block ─────────────────────────────────────────────────

function OtpInputBlock({ length = 4, onComplete, resendKey }) {
  const [digits, setDigits] = useState(Array(length).fill(""));
  const r0 = useRef(null), r1 = useRef(null), r2 = useRef(null), r3 = useRef(null);
  const refs = [r0, r1, r2, r3];
  const [sec, setSec] = useState(30);

  useEffect(() => {
    r0.current?.focus();
    const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [resendKey]);

  const handleChange = (val, idx) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
    if (v && idx < length - 1) refs[idx + 1].current?.focus();
    if (next.every((d) => d !== "") && next.join("").length === length) {
      onComplete(next.join(""));
    }
  };

  const handleKey = (e, idx) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) refs[idx - 1].current?.focus();
  };

  return (
    <div>
      <div className="flex gap-3 justify-center mb-4">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="tel"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKey(e, i)}
            className={`w-12 h-12 text-center text-lg font-bold rounded-xl border-2 focus:outline-none transition
              ${d ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200"}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500 text-center">
        {sec > 0 ? (
          <>Resend OTP in <span className="font-semibold text-blue-600">{sec}s</span></>
        ) : (
          <button onClick={() => setSec(30)} className="text-blue-600 font-semibold hover:underline">
            Resend OTP
          </button>
        )}
      </p>
    </div>
  );
}

// ─── STEP 1 — Basic Details ───────────────────────────────────────────────────

function StepBasicDetails({ data, setData, onNext }) {
  const [errors, setErrors] = useState({});
  const [agreed, setAgreed] = useState(false);

  const fields = {
    fullName: data.fullName || "",
    pan: data.pan || "",
    email: data.email || "",
    phone: data.phone || "",
    dob: data.dob || "",
    maritalStatus: data.maritalStatus || "",
    motherName: data.motherName || "",
  };

  const update = (key, val) => {
    setData({ ...data, [key]: val });
    setErrors({ ...errors, [key]: "" });
  };

  const validate = () => {
    const e = {};
    if (!fields.fullName.trim() || fields.fullName.trim().length < 3) e.fullName = "Enter your full name";
    if (!PAN_REGEX.test(fields.pan.toUpperCase())) e.pan = "Enter a valid PAN (e.g. ABCDE1234F)";
    if (!EMAIL_REGEX.test(fields.email)) e.email = "Enter a valid email address";
    if (!/^[6-9]\d{9}$/.test(fields.phone)) e.phone = "Enter a valid 10-digit mobile number";
    if (!fields.dob) e.dob = "Select your date of birth";
    else {
      const age = (new Date() - new Date(fields.dob)) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 21) e.dob = "You must be at least 21 years old";
      if (age > 65) e.dob = "Maximum age limit is 65 years";
    }
    if (!fields.maritalStatus) e.maritalStatus = "Select your marital status";
    if (!fields.motherName.trim() || fields.motherName.trim().length < 3) e.motherName = "Enter your mother's name";
    if (!agreed) e.agreed = "Please accept the consent to continue";
    return e;
  };

  const handleContinue = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setData({ ...data, ...fields, pan: fields.pan.toUpperCase() });
    onNext();
  };

  const inputClass = (key) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition
     ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-200"}`;

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Basic Details</h2>
      <p className="text-sm text-gray-400 mb-6">All fields are mandatory to proceed</p>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Full Name (as per PAN)</label>
          <input
            type="text"
            value={fields.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            placeholder="Enter your full name"
            className={inputClass("fullName")}
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">PAN Number</label>
          <input
            type="text"
            maxLength={10}
            value={fields.pan}
            onChange={(e) => update("pan", e.target.value.toUpperCase())}
            placeholder="ABCDE1234F"
            className={`${inputClass("pan")} uppercase`}
          />
          {errors.pan && <p className="text-red-500 text-xs mt-1">{errors.pan}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email Address</label>
          <input
            type="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClass("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mobile Number</label>
          <div className={`flex items-center border rounded-xl overflow-hidden ${errors.phone ? "border-red-400" : "border-gray-200"}`}>
            <span className="px-3 py-3 text-sm text-gray-500 font-medium border-r border-gray-200 bg-gray-50">+91</span>
            <input
              type="tel"
              maxLength={10}
              value={fields.phone}
              onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
              placeholder="Enter mobile number"
              className="flex-1 px-3 py-3 text-sm focus:outline-none bg-transparent"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Date of Birth</label>
          <input
            type="date"
            value={fields.dob}
            max={todayMinusYears(21)}
            min={todayMinusYears(65)}
            onChange={(e) => update("dob", e.target.value)}
            className={inputClass("dob")}
          />
          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Marital Status</label>
          <div className="grid grid-cols-3 gap-2">
            {["Single", "Married", "Other"].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => update("maritalStatus", opt)}
                className={`py-2.5 rounded-xl text-sm font-semibold border transition-colors
                  ${fields.maritalStatus === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{errors.maritalStatus}</p>}
        </div>

        <div>
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Mother's Name</label>
          <input
            type="text"
            value={fields.motherName}
            onChange={(e) => update("motherName", e.target.value)}
            placeholder="Enter mother's full name"
            className={inputClass("motherName")}
          />
          {errors.motherName && <p className="text-red-500 text-xs mt-1">{errors.motherName}</p>}
        </div>
      </div>

      <div className="flex items-start gap-2 mt-5">
        <input
          type="checkbox"
          id="consent"
          checked={agreed}
          onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, agreed: "" }); }}
          className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0 cursor-pointer"
        />
        <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
          I agree with the company's <span className="text-blue-600 font-medium">Privacy Policy</span> and{" "}
          <span className="text-blue-600 font-medium">Terms of Use</span>, and consent to Direct Credit
          checking my credit profile.
        </label>
      </div>
      {errors.agreed && <p className="text-red-500 text-xs mt-1">{errors.agreed}</p>}

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-6"
      >
        Continue <ArrowRight size={17} />
      </button>
    </div>
  );
}

// ─── STEP 2 — Mobile OTP ─────────────────────────────────────────────────────

function StepMobileOtp({ data, onNext, onBack }) {
  const [verifying, setVerifying] = useState(false);
  const [resendKey] = useState(0);

  const handleComplete = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); onNext(); }, 1000);
  };

  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Phone size={26} className="text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Verify Mobile Number</h2>
      <p className="text-sm text-gray-500 mb-6">
        Enter the OTP sent to <span className="font-semibold text-gray-700">+91-xxx-xxx{data.phone?.slice(-4)}</span>
      </p>

      {verifying ? (
        <div className="flex items-center justify-center gap-2 py-6 text-blue-600 font-medium text-sm">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Verifying…
        </div>
      ) : (
        <OtpInputBlock onComplete={handleComplete} resendKey={resendKey} />
      )}

      <button onClick={onBack} className="text-gray-400 text-sm mt-6 hover:text-gray-600 flex items-center gap-1 mx-auto">
        <ArrowLeft size={14} /> Back
      </button>
    </div>
  );
}

// ─── STEP 3 — Email OTP ───────────────────────────────────────────────────────

function StepEmailOtp({ data, onNext, onBack }) {
  const [verifying, setVerifying] = useState(false);
  const [resendKey] = useState(0);

  const handleComplete = () => {
    setVerifying(true);
    setTimeout(() => { setVerifying(false); onNext(); }, 1000);
  };

  return (
    <div className="text-center">
      <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail size={26} className="text-purple-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Verify Email Address</h2>
      <p className="text-sm text-gray-500 mb-6">
        Enter the OTP sent to <span className="font-semibold text-gray-700">{data.email}</span>
      </p>

      {verifying ? (
        <div className="flex items-center justify-center gap-2 py-6 text-blue-600 font-medium text-sm">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Verifying…
        </div>
      ) : (
        <OtpInputBlock onComplete={handleComplete} resendKey={resendKey} />
      )}

      <button onClick={onBack} className="text-gray-400 text-sm mt-6 hover:text-gray-600 flex items-center gap-1 mx-auto">
        <ArrowLeft size={14} /> Back
      </button>
    </div>
  );
}

// ─── STEP 4 — CIBIL Check ─────────────────────────────────────────────────────

function StepCibilCheck({ setData, onNext, onRestart }) {
  const [checking, setChecking] = useState(true);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const s = Math.floor(Math.random() * 271) + 550;
      setScore(s);
      setData((prev) => ({ ...prev, cibilScore: s }));
      setChecking(false);
    }, 1800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (checking) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-5" />
        <h2 className="text-lg font-bold text-gray-900 mb-1">Checking your CIBIL Score…</h2>
        <p className="text-sm text-gray-400">This usually takes a few seconds. Please wait.</p>
      </div>
    );
  }

  const isLow = score < 630;

  if (isLow) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={30} className="text-red-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Your CIBIL Score is {score}</h2>
        <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4">Low Score</span>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
          Unfortunately, based on your current credit score, we're unable to offer you a personal loan at this time.
          A score of <strong>630+</strong> is generally required for loan approval. We recommend improving your
          credit health and trying again later.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left mb-6">
          <p className="text-sm font-semibold text-amber-800 mb-1">Tips to improve your score:</p>
          <ul className="text-xs text-amber-700 space-y-1 list-disc pl-4">
            <li>Pay EMIs and credit card bills on time</li>
            <li>Keep credit utilisation below 30%</li>
            <li>Avoid multiple loan applications at once</li>
          </ul>
        </div>
        <button onClick={onRestart} className="text-blue-600 text-sm font-medium hover:underline">
          Start a new application
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckCircle size={30} className="text-green-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Your CIBIL Score is {score}</h2>
      <span className="inline-block bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
        {score >= 750 ? "Excellent" : "Good"}
      </span>
      <p className="text-sm text-gray-500 mb-6">
        Great news! You're eligible for a personal loan. Let's get a few more details.
      </p>
      <button
        onClick={onNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
      >
        Continue <ArrowRight size={17} />
      </button>
    </div>
  );
}

// ─── STEP 5 — Loan Amount & Tenure ───────────────────────────────────────────

function StepLoanDetails({ data, setData, onNext, onBack }) {
  const [amount, setAmount] = useState(data.loanAmount || 500000);
  const [tenure, setTenure] = useState(data.loanTenure || 36);
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    const e = {};
    if (!amount || amount < 10000) e.amount = "Enter a valid loan amount";
    if (!tenure || tenure < 6) e.tenure = "Select a valid tenure";
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setData({ ...data, loanAmount: amount, loanTenure: tenure });
    onNext();
  };

  const quickAmounts = [100000, 300000, 500000, 1000000, 2000000];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Loan Details</h2>
      <p className="text-sm text-gray-400 mb-6">Tell us how much you need and for how long</p>

      <div className="mb-6">
        <label className="text-xs font-semibold text-gray-600 mb-2 block">Loan Amount</label>
        <p className="text-2xl font-bold text-blue-600 mb-2">₹{amount.toLocaleString("en-IN")}</p>
        <input
          type="range" min="50000" max="5000000" step="10000"
          value={amount}
          onChange={(e) => { setAmount(Number(e.target.value)); setErrors({ ...errors, amount: "" }); }}
          className="w-full accent-blue-600 mb-3"
        />
        <div className="flex gap-2 flex-wrap">
          {quickAmounts.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors
                ${amount === a ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
            >
              ₹{a >= 1000000 ? `${a/1000000}Cr`.replace(".0Cr","Cr") : `${a/100000}L`}
            </button>
          ))}
        </div>
        {errors.amount && <p className="text-red-500 text-xs mt-2">{errors.amount}</p>}
      </div>

      <div className="mb-2">
        <label className="text-xs font-semibold text-gray-600 mb-2 block">Loan Tenure (months)</label>
        <p className="text-2xl font-bold text-blue-600 mb-2">{tenure} months</p>
        <input
          type="range" min="6" max="84" step="6"
          value={tenure}
          onChange={(e) => { setTenure(Number(e.target.value)); setErrors({ ...errors, tenure: "" }); }}
          className="w-full accent-blue-600 mb-3"
        />
        <div className="flex justify-between text-xs text-gray-400"><span>6 months</span><span>84 months</span></div>
        {errors.tenure && <p className="text-red-500 text-xs mt-2">{errors.tenure}</p>}
      </div>

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-6"
      >
        Continue <ArrowRight size={17} />
      </button>
      <button onClick={onBack} className="text-gray-400 text-sm mt-4 hover:text-gray-600 flex items-center gap-1 mx-auto">
        <ArrowLeft size={14} /> Back
      </button>
    </div>
  );
}

// ─── STEP 6 — Income Details ──────────────────────────────────────────────────

function StepIncomeDetails({ data, setData, onNext, onBack }) {
  const [incomeType, setIncomeType] = useState(data.incomeType || "Salaried");
  const [fields, setFields] = useState({
    monthlyIncome: data.monthlyIncome || "",
    companyName: data.companyName || "",
    companyType: data.companyType || "",
    employmentStartDate: data.employmentStartDate || "",
    currentlyWorking: data.currentlyWorking ?? true,
    employmentEndDate: data.employmentEndDate || "",
    businessName: data.businessName || "",
    businessType: data.businessType || "",
    businessStartDate: data.businessStartDate || "",
    businessCurrentlyRunning: data.businessCurrentlyRunning ?? true,
    businessEndDate: data.businessEndDate || "",
  });
  const [errors, setErrors] = useState({});

  const update = (key, val) => {
    setFields({ ...fields, [key]: val });
    setErrors({ ...errors, [key]: "" });
  };

  const inputClass = (key) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition
     ${errors[key] ? "border-red-400 bg-red-50" : "border-gray-200"}`;

  const companyTypes = ["Private Limited", "Public Limited", "Government", "Partnership", "Proprietorship", "MNC"];
  const businessTypes = ["Retail / Trading", "Manufacturing", "Services", "Freelance / Consulting", "E-commerce", "Other"];

  const validate = () => {
    const e = {};
    if (!fields.monthlyIncome || Number(fields.monthlyIncome) < 15000) e.monthlyIncome = "Minimum monthly income is ₹15,000";
    if (incomeType === "Salaried") {
      if (!fields.companyName.trim()) e.companyName = "Enter your company name";
      if (!fields.companyType) e.companyType = "Select company type";
      if (!fields.employmentStartDate) e.employmentStartDate = "Select employment start date";
      if (!fields.currentlyWorking && !fields.employmentEndDate) e.employmentEndDate = "Select employment end date";
    } else {
      if (!fields.businessName.trim()) e.businessName = "Enter your business name";
      if (!fields.businessType) e.businessType = "Select business type";
      if (!fields.businessStartDate) e.businessStartDate = "Select business start date";
      if (!fields.businessCurrentlyRunning && !fields.businessEndDate) e.businessEndDate = "Select business end date";
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setData({ ...data, incomeType, ...fields });
    onNext();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">Income Details</h2>
      <p className="text-sm text-gray-400 mb-6">Help us understand your income source</p>

      <div className="mb-5">
        <label className="text-xs font-semibold text-gray-600 mb-2 block">Income Type</label>
        <div className="grid grid-cols-2 gap-2">
          {["Salaried", "Self-Employed"].map((opt) => (
            <button
              key={opt}
              onClick={() => setIncomeType(opt)}
              className={`py-3 rounded-xl text-sm font-semibold border transition-colors
                ${incomeType === opt ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Monthly Income (₹)</label>
        <input
          type="number"
          value={fields.monthlyIncome}
          onChange={(e) => update("monthlyIncome", e.target.value)}
          placeholder="e.g. 45000"
          className={inputClass("monthlyIncome")}
        />
        {errors.monthlyIncome && <p className="text-red-500 text-xs mt-1">{errors.monthlyIncome}</p>}
      </div>

      {incomeType === "Salaried" ? (
        <>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Company Name</label>
            <input
              type="text"
              value={fields.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              placeholder="Enter your employer's name"
              className={inputClass("companyName")}
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Company Type</label>
            <select value={fields.companyType} onChange={(e) => update("companyType", e.target.value)} className={inputClass("companyType")}>
              <option value="">Select company type</option>
              {companyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.companyType && <p className="text-red-500 text-xs mt-1">{errors.companyType}</p>}
          </div>
          <div className="mb-3">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Employment Start Date</label>
            <input type="date" value={fields.employmentStartDate} max={new Date().toISOString().split("T")[0]} onChange={(e) => update("employmentStartDate", e.target.value)} className={inputClass("employmentStartDate")} />
            {errors.employmentStartDate && <p className="text-red-500 text-xs mt-1">{errors.employmentStartDate}</p>}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="currentlyWorking" checked={fields.currentlyWorking} onChange={(e) => update("currentlyWorking", e.target.checked)} className="accent-blue-600 w-4 h-4 cursor-pointer" />
            <label htmlFor="currentlyWorking" className="text-sm text-gray-600 cursor-pointer">I am currently working here</label>
          </div>
          {!fields.currentlyWorking && (
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Employment End Date</label>
              <input type="date" value={fields.employmentEndDate} max={new Date().toISOString().split("T")[0]} onChange={(e) => update("employmentEndDate", e.target.value)} className={inputClass("employmentEndDate")} />
              {errors.employmentEndDate && <p className="text-red-500 text-xs mt-1">{errors.employmentEndDate}</p>}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Business Name</label>
            <input type="text" value={fields.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Enter your business name" className={inputClass("businessName")} />
            {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Business Type</label>
            <select value={fields.businessType} onChange={(e) => update("businessType", e.target.value)} className={inputClass("businessType")}>
              <option value="">Select business type</option>
              {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.businessType && <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>}
          </div>
          <div className="mb-3">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Business Start Date</label>
            <input type="date" value={fields.businessStartDate} max={new Date().toISOString().split("T")[0]} onChange={(e) => update("businessStartDate", e.target.value)} className={inputClass("businessStartDate")} />
            {errors.businessStartDate && <p className="text-red-500 text-xs mt-1">{errors.businessStartDate}</p>}
          </div>
          <div className="flex items-center gap-2 mb-4">
            <input type="checkbox" id="businessCurrentlyRunning" checked={fields.businessCurrentlyRunning} onChange={(e) => update("businessCurrentlyRunning", e.target.checked)} className="accent-blue-600 w-4 h-4 cursor-pointer" />
            <label htmlFor="businessCurrentlyRunning" className="text-sm text-gray-600 cursor-pointer">This business is currently running</label>
          </div>
          {!fields.businessCurrentlyRunning && (
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Business End Date</label>
              <input type="date" value={fields.businessEndDate} max={new Date().toISOString().split("T")[0]} onChange={(e) => update("businessEndDate", e.target.value)} className={inputClass("businessEndDate")} />
              {errors.businessEndDate && <p className="text-red-500 text-xs mt-1">{errors.businessEndDate}</p>}
            </div>
          )}
        </>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm mt-6"
      >
        Submit Application <ArrowRight size={17} />
      </button>
      <button onClick={onBack} className="text-gray-400 text-sm mt-4 hover:text-gray-600 flex items-center gap-1 mx-auto">
        <ArrowLeft size={14} /> Back
      </button>
    </div>
  );
}

// ─── STEP 7 — Bank Offers (NEW) ───────────────────────────────────────────────

const BANK_OFFERS = [
  {
    id: "bajaj",
    name: "Bajaj Finserv",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bajaj_finserv.svg/200px-Bajaj_finserv.svg.png",
    maxAmount: "Upto ₹40 Lakhs",
    roi: "11% p.a",
    emi: "₹4,399",
    approval: "High",
    badge: "Flat 50% off on PF · till 3rd July",
    link: BAJAJ_LINK,
  },
  {
    id: "kredit",
    name: "KreditBee",
    logo: null,
    logoText: "KB",
    logoColor: "bg-yellow-400",
    maxAmount: "Upto ₹5 Lakhs",
    roi: "17% p.a",
    emi: "₹4,944",
    approval: "High",
    badge: "Flat 50% off on PF · till 3rd July",
    link: BAJAJ_LINK,
  },
  {
    id: "zype",
    name: "Zype",
    logo: null,
    logoText: "Z",
    logoColor: "bg-blue-500",
    maxAmount: "Upto ₹5 Lakhs",
    roi: "18% p.a",
    emi: "₹4,992",
    approval: "High",
    badge: null,
    link: BAJAJ_LINK,
  },
];

function ApprovalBar({ level }) {
  const pct = level === "High" ? 85 : level === "Medium" ? 50 : 25;
  const color = level === "High" ? "bg-green-500" : level === "Medium" ? "bg-yellow-400" : "bg-red-400";
  return (
    <div>
      <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold mt-0.5 block ${level === "High" ? "text-green-600" : "text-yellow-600"}`}>{level}</span>
    </div>
  );
}

function StepBankOffers({ data }) {
  return (
    <div>
      {/* Cashback banner */}
      <div className="bg-gray-900 text-white rounded-xl px-4 py-3 flex items-center gap-3 mb-5">
        <span className="text-yellow-400 font-bold text-xs border border-yellow-400 rounded px-2 py-0.5 whitespace-nowrap">Limited Period Offer</span>
        <div className="flex-1">
          <span className="text-yellow-400 font-extrabold text-lg">₹1,000</span>
          <span className="text-white text-sm ml-2">Cashback on Loan Disbursal</span>
        </div>
        <span className="text-2xl">🪙</span>
      </div>

      <h2 className="text-base font-bold text-gray-900 mb-4">
        {BANK_OFFERS.length} Personalised Loan Offers For You
      </h2>

      <div className="space-y-3">
        {BANK_OFFERS.map((offer) => (
          <div key={offer.id} className="border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-4 py-4">
              <div className="flex items-start gap-3">
                {/* Logo */}
                <div className="flex-shrink-0">
                  {offer.logo ? (
                    <img src={offer.logo} alt={offer.name} className="w-10 h-10 object-contain rounded-lg border border-gray-100 p-1" />
                  ) : (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${offer.logoColor}`}>
                      {offer.logoText}
                    </div>
                  )}
                  <p className="text-xs font-bold text-gray-800 mt-1 text-center w-10 leading-tight">{offer.name}</p>
                  <p className="text-xs text-blue-600 text-center w-10 leading-tight">{offer.maxAmount}</p>
                </div>

                {/* Details */}
                <div className="flex-1 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">ROI Starting at</p>
                    <p className="text-sm font-bold text-gray-900">{offer.roi}</p>
                    <p className="text-xs text-blue-500 underline cursor-pointer">Charges View</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Monthly EMI</p>
                    <p className="text-sm font-bold text-gray-900">{offer.emi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Approval Chance ⓘ</p>
                    <ApprovalBar level={offer.approval} />
                  </div>
                </div>

                {/* CTA */}
                <div className="flex-shrink-0">
                  <a
                    href={offer.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1 whitespace-nowrap transition-colors"
                  >
                    Apply Now <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Badge */}
            {offer.badge && (
              <div className="bg-gray-50 border-t border-gray-100 px-4 py-2">
                <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-full px-3 py-1 inline-block">
                  {offer.badge}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
        Clicking "Apply Now" will redirect you to the lender's official website. Your data is safe & secure.
      </p>
    </div>
  );
}

// ─── MAIN WIZARD CONTROLLER ───────────────────────────────────────────────────

export default function LoanAplicationFlow({ initialName = "", initialMobile = "", onClose }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState({ fullName: initialName, phone: initialMobile });

  const next = () => setStepIndex((s) => s + 1);
  const back = () => setStepIndex((s) => Math.max(0, s - 1));
  const restart = () => { setStepIndex(0); setData({ fullName: initialName, phone: initialMobile }); };

  const isLowScoreTerminal = stepIndex === 3 && data.cibilScore !== undefined && data.cibilScore < 630;
  // Show progress bar on steps 0–5, hide on CIBIL fail and bank offers (step 6)
  const showProgress = stepIndex <= 5 && !isLowScoreTerminal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 overflow-y-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 my-auto max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors z-10">
          <X size={20} />
        </button>

        {showProgress && <ProgressBar step={stepIndex} totalVisible={6} />}

        {stepIndex === 0 && <StepBasicDetails data={data} setData={setData} onNext={next} />}
        {stepIndex === 1 && <StepMobileOtp data={data} onNext={next} onBack={back} />}
        {stepIndex === 2 && <StepEmailOtp data={data} onNext={next} onBack={back} />}
        {stepIndex === 3 && <StepCibilCheck data={data} setData={setData} onNext={next} onRestart={restart} />}
        {stepIndex === 4 && <StepLoanDetails data={data} setData={setData} onNext={next} onBack={back} />}
        {stepIndex === 5 && <StepIncomeDetails data={data} setData={setData} onNext={next} onBack={back} />}
        {stepIndex === 6 && <StepBankOffers data={data} />}
      </div>
    </div>
  );
}
 