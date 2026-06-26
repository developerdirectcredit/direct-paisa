

// add vaidation in form section


// src/pages/CreditCards.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCardsByIncome } from "../data/cardsData";

const STEPS = {
  LANDING: "landing",
  OTP: "otp",
  EMPLOYMENT: "employment",
  BANK: "bank",
  INCOME: "income",
  PINCODE: "pincode",
  PERSONAL: "personal",
  PROCESSING: "processing",
  OFFERS: "offers",
};

// Step order (back navigation ke liye)
const STEP_ORDER = [
  STEPS.LANDING,
  STEPS.OTP,
  STEPS.EMPLOYMENT,
  STEPS.BANK,
  STEPS.INCOME,
  STEPS.PINCODE,
  STEPS.PERSONAL,
  STEPS.PROCESSING,
  STEPS.OFFERS,
];

// ─── Company Header (har page par logo + back icon) ──────────────────────────
function CompanyHeader({ onBack, navigate }) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-2 flex items-center gap-3 sticky top-0 z-50">
      {/* Back icon */}
      <button
        onClick={onBack}
        aria-label="Go back"
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
      >
        <ArrowLeft size={22} />
      </button>

      {/* Logo (click par home) */}
      <img
        src="/logo.png"
        alt="Direct Credit Logo"
        className="h-10 md:h-14 object-contain cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

// Left side promo panel (steps 3-7 me dikhta hai)
function SidePanel({ emoji, title, subtitle }) {
  return (
    <div className="hidden md:flex md:w-2/5 flex-col bg-white">
      <div className="bg-blue-600 text-white px-8 py-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-white/90 rounded text-xs font-bold px-2 py-1 text-blue-700">
            Direct Credit
          </div>
        </div>
        <div className="text-5xl mb-4">{emoji}</div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-sm text-blue-100 max-w-xs mx-auto">{subtitle}</p>
        <div className="bg-white text-gray-800 rounded-xl mt-6 p-4 flex items-center gap-3 max-w-xs mx-auto">
          <div className="text-blue-600 text-2xl">🛡️</div>
          <div className="text-left">
            <div className="font-bold text-sm">India's Most Trusted</div>
            <div className="text-xs text-gray-500">Credit Card Platform</div>
          </div>
        </div>
      </div>
      <div className="px-8 py-8 text-sm text-gray-600 space-y-3">
        <p className="font-semibold text-gray-700">Why take a card from us:</p>
        <p>💵 Trusted by over <b>2 Million</b> happy customers</p>
        <p>🏦 Match you with <b>15+ leading banks</b></p>
        <p>👤 Filter through <b>100+ card options</b></p>
      </div>
    </div>
  );
}

// Progress bar (right side header)
function Progress({ percent }) {
  return (
    <div className="mb-6">
      <p className="text-blue-600 font-semibold text-sm mb-2">{percent}% Completed</p>
      <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function CreditCards() {
  const navigate = useNavigate();
  const [step, setStep] = useState(STEPS.LANDING);
  const [form, setForm] = useState({
    mobile: "",
    otp: ["", "", "", ""],
    employmentType: "Salaried",
    primaryBank: "",
    annualIncome: "",
    pincode: "",
    fullName: "",
    email: "",
  });
  const [offers, setOffers] = useState([]);

  // OTP timer + refs
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const otpRefs = useRef([]);

  // Bank "View All" toggle
  const [showAllBanks, setShowAllBanks] = useState(false);

  const update = (field, value) => setForm((p) => ({ ...p, [field]: value }));

  // ── Back navigation: ek step peeche jao, LANDING par ho to home ──
  const goBack = () => {
    const idx = STEP_ORDER.indexOf(step);
    if (idx <= 0) {
      navigate("/"); // already landing -> home
    } else {
      setOtpError("");
      setStep(STEP_ORDER[idx - 1]);
    }
  };

  // ── OTP countdown timer ──
  useEffect(() => {
    if (step !== STEPS.OTP) return;
    if (otpTimer <= 0) return;
    const id = setInterval(() => {
      setOtpTimer((t) => (t <= 1 ? 0 : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [step, otpTimer]);

  // ── OTP step par aate hi timer start + first box focus ──
  useEffect(() => {
    if (step === STEPS.OTP) {
      setOtpTimer(30);
      setOtpError("");
      update("otp", ["", "", "", ""]);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ── OTP input change: auto-shift to next box ──
  const handleOtpChange = (i, value) => {
    const digit = value.replace(/\D/g, "").slice(-1); // sirf last digit
    const next = [...form.otp];
    next[i] = digit;
    update("otp", next);
    setOtpError("");

    // agar digit aaya hai to next box par focus
    if (digit && i < form.otp.length - 1) {
      otpRefs.current[i + 1]?.focus();
    }
  };

  // ── OTP keydown: backspace par peeche jao ──
  const handleOtpKeyDown = (i, e) => {
    if (e.key === "Backspace" && !form.otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  // ── OTP paste support (4 digits ek saath) ──
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const next = ["", "", "", ""];
    pasted.split("").forEach((d, idx) => (next[idx] = d));
    update("otp", next);
    const focusIdx = Math.min(pasted.length, 3);
    otpRefs.current[focusIdx]?.focus();
  };

  // ── Resend OTP ──
  const resendOtp = () => {
    if (otpTimer > 0) return;
    setOtpTimer(30);
    setOtpError("");
    update("otp", ["", "", "", ""]);
    otpRefs.current[0]?.focus();
  };

  // ── OTP verify (validation) ──
  const verifyOtp = () => {
    const code = form.otp.join("");
    if (code.length !== 4) {
      setOtpError("Please enter the complete 4-digit OTP");
      return;
    }
    // (Real app me yahan API se OTP verify hoga. Demo me sahi maan lete hain.)
    setOtpError("");
    setStep(STEPS.EMPLOYMENT);
  };

  // Processing ke baad income ke according offers nikaalo
  useEffect(() => {
    if (step === STEPS.PROCESSING) {
      const timer = setTimeout(() => {
        setOffers(getCardsByIncome(form.annualIncome));
        setStep(STEPS.OFFERS);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, form.annualIncome]);

  // ===== STEP 1: LANDING =====
  if (step === STEPS.LANDING) {
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex flex-1">
          {/* Left gold panel */}
          <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-yellow-600 to-yellow-800 text-white flex-col items-center justify-center p-10">
            <h2 className="text-3xl font-bold mb-2">Get up to</h2>
            <p className="text-5xl font-extrabold text-yellow-200 mb-4">10% CASHBACK</p>
            <div className="border border-yellow-300 rounded-full px-5 py-2 text-sm">
              🎁 Every spend is rewarding
            </div>
          </div>
          {/* Right form */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Get your perfect Credit Card Now!
              </h1>
              <label className="text-xs text-blue-600 font-medium">Enter Mobile Number</label>
              <div className="flex items-center border-2 border-blue-500 rounded-lg px-3 py-3 mt-1 mb-2">
                <span className="mr-2">🇮🇳 +91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={form.mobile}
                  onChange={(e) => update("mobile", e.target.value.replace(/\D/g, ""))}
                  className="flex-1 outline-none"
                  placeholder=""
                />
                <span className="text-gray-400 text-sm">{form.mobile.length} / 10</span>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                We'll check credit card offers against your number
              </p>
              <div className="border border-blue-300 rounded-lg text-center text-blue-600 text-sm py-2 mb-3">
                + Get Assured ₹200 Cashback on every card +
              </div>
              <button
                disabled={form.mobile.length !== 10}
                onClick={() => setStep(STEPS.OTP)}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition"
              >
                Unlock Card Offers
              </button>
              <p className="text-[11px] text-gray-400 text-center mt-3">
                By submitting this form, you agree to the Terms of Use & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 2: OTP =====
  if (step === STEPS.OTP) {
    const otpComplete = form.otp.join("").length === 4;
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
            <button
              onClick={() => setStep(STEPS.LANDING)}
              className="absolute top-4 right-4 text-gray-400 text-xl"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-2">
              Verify Mobile Number
            </h2>
            <p className="text-center text-xs bg-gray-100 rounded py-1 mb-6">
              OTP sent on Mobile Number +91-xxx{form.mobile.slice(-4)}
            </p>
            <div className="flex justify-center gap-4 mb-2">
              {form.otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  type="tel"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  onPaste={handleOtpPaste}
                  className={`w-12 h-12 border-b-2 text-center text-xl outline-none transition-colors ${
                    otpError ? "border-red-400" : "border-gray-300 focus:border-blue-500"
                  }`}
                />
              ))}
            </div>

            {/* Error message */}
            {otpError && (
              <p className="text-center text-xs text-red-500 mb-2">{otpError}</p>
            )}

            {/* Timer / Resend */}
            <p className="text-center text-xs text-gray-500 mb-4">
              {otpTimer > 0 ? (
                <>
                  Resend OTP in{" "}
                  <span className="font-semibold text-blue-600">
                    {otpTimer < 10 ? `0${otpTimer}` : otpTimer}
                  </span>{" "}
                  seconds
                </>
              ) : (
                <button
                  onClick={resendOtp}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </p>

            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" defaultChecked /> Remember Me
            </label>
            <button
              onClick={verifyOtp}
              disabled={!otpComplete}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
            >
              Verify & Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 3: EMPLOYMENT =====
  if (step === STEPS.EMPLOYMENT) {
    const options = [
      { value: "Salaried", label: "Salaried", desc: "Receives fixed monthly income", icon: "💼" },
      { value: "Self-Employed", label: "Self-Employed", desc: "Working professional (Doctor, CA, etc.)", icon: "👨‍⚕️" },
      { value: "Business Owner", label: "Business Owner", desc: "Runs a business", icon: "🏢" },
    ];
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex flex-1">
          <SidePanel
            emoji="💳"
            title="Let's find your best card!"
            subtitle="Your work profile helps us unlock cards with the best approval odds for you."
          />
          <div className="flex-1 p-8 md:p-16 bg-white">
            <Progress percent={17} />
            <h1 className="text-3xl font-bold mb-8">Employment Type</h1>
            <div className="space-y-4 max-w-xl">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => update("employmentType", opt.value)}
                  className={`w-full flex items-center gap-4 border-2 rounded-xl p-5 text-left transition ${
                    form.employmentType === opt.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div className="flex-1">
                    <p className={`font-semibold ${form.employmentType === opt.value ? "text-blue-600" : ""}`}>
                      {opt.label}
                    </p>
                    <p className="text-sm text-gray-500">{opt.desc}</p>
                  </div>
                  <span className={`w-5 h-5 rounded-full border-2 ${
                    form.employmentType === opt.value ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(STEPS.BANK)}
              className="mt-8 w-full max-w-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              Continue
            </button>
            <p className="text-green-600 text-sm mt-4 text-center max-w-xl">🛡️ Your details are secured with us</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 4: BANK =====
  if (step === STEPS.BANK) {
    // Pehle 8 banks default dikhte hain, View All par baaki bhi
    const allBanks = [
      "HDFC", "Axis", "SBI", "ICICI", "Kotak", "Citi", "IndusInd", "Yes",
      "PNB", "Bank of Baroda", "Canara", "Union Bank", "IDFC First",
      "RBL", "Standard Chartered", "AU Small Finance", "Federal", "Bandhan",
    ];
    const banks = showAllBanks ? allBanks : allBanks.slice(0, 8);
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex flex-1">
          <SidePanel
            emoji="🏛️"
            title=""
            subtitle="Your bank choice helps us see if you have any 'hidden' relationship perks"
          />
          <div className="flex-1 p-8 md:p-16 bg-white">
            <Progress percent={33} />
            <h1 className="text-3xl font-bold mb-8">Choose Your Primary Bank</h1>
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => update("primaryBank", bank)}
                  className={`flex items-center justify-between border-2 rounded-xl px-5 py-4 transition ${
                    form.primaryBank === bank ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="font-medium">{bank}</span>
                  <span className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                    form.primaryBank === bank ? "border-blue-500 bg-blue-500" : "border-gray-300"
                  }`} />
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAllBanks((p) => !p)}
              className="text-blue-600 font-semibold mt-4 block"
            >
              {showAllBanks ? "Show Less" : "View All Banks"}
            </button>
            <button
              disabled={!form.primaryBank}
              onClick={() => setStep(STEPS.INCOME)}
              className="mt-8 w-full max-w-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg"
            >
              Continue
            </button>
            <p className="text-green-600 text-sm mt-4 text-center max-w-xl">🛡️ Your details are secured with us</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 5: INCOME =====
  if (step === STEPS.INCOME) {
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex flex-1">
          <SidePanel
            emoji="🪙"
            title="We need your monthly income"
            subtitle="We need your income to calculate exactly how much you can save every month"
          />
          <div className="flex-1 p-8 md:p-16 bg-white">
            <Progress percent={50} />
            <h1 className="text-3xl font-bold mb-8">Your Gross Annual Income</h1>
            <div className="max-w-xl">
              <label className="text-xs text-gray-500">Gross Annual Income</label>
              <div className="flex items-center border-2 border-blue-500 rounded-lg px-4 py-3 mt-1">
                <span className="mr-2 text-gray-600">₹</span>
                <input
                  type="number"
                  value={form.annualIncome}
                  onChange={(e) => update("annualIncome", e.target.value)}
                  className="flex-1 outline-none"
                  placeholder="0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Enter your Annual Income as per your latest ITR</p>
            </div>
            <button
              disabled={!form.annualIncome}
              onClick={() => setStep(STEPS.PINCODE)}
              className="mt-8 w-full max-w-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg"
            >
              Continue
            </button>
            <p className="text-green-600 text-sm mt-4 text-center max-w-xl">🛡️ Your details are secured with us</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 6: PINCODE =====
  if (step === STEPS.PINCODE) {
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex flex-1">
          <SidePanel
            emoji="📍"
            title="Just a few more taps!"
            subtitle="We use your pincode to ensure we only show cards available in your city."
          />
          <div className="flex-1 p-8 md:p-16 bg-white">
            <Progress percent={67} />
            <h1 className="text-3xl font-bold mb-8">Current Address PIN Code</h1>
            <div className="max-w-xl">
              <label className="text-xs text-gray-500">Present Pin Code</label>
              <div className="flex items-center border-2 border-gray-300 rounded-lg px-4 py-3 mt-1">
                <input
                  type="tel"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) => update("pincode", e.target.value.replace(/\D/g, ""))}
                  className="flex-1 outline-none"
                />
                <span className="text-gray-400 text-sm">{form.pincode.length}/6</span>
              </div>
            </div>
            <button
              disabled={form.pincode.length !== 6}
              onClick={() => setStep(STEPS.PERSONAL)}
              className="mt-8 w-full max-w-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg"
            >
              Continue
            </button>
            <p className="text-green-600 text-sm mt-4 text-center max-w-xl">🛡️ Your details are secured with us</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 7: PERSONAL DETAILS =====
  if (step === STEPS.PERSONAL) {
    const domains = ["@gmail.com", "@hotmail.com", "@yahoo.com", "@yahoo.in"];
    // Simple email validation
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex flex-1">
          <SidePanel
            emoji="🧑"
            title="Almost there!"
            subtitle="We need a few more details to fetch your best card offers"
          />
          <div className="flex-1 p-8 md:p-16 bg-white">
            <Progress percent={83} />
            <h1 className="text-3xl font-bold mb-8">Personal Details</h1>
            <div className="max-w-xl space-y-5">
              <div>
                <label className="text-xs text-blue-600">Full Name (as on PAN)</label>
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    update("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))
                  }
                  className="w-full border-2 border-blue-500 rounded-lg px-4 py-3 mt-1 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Please enter your Full Name as per PAN card (letters only)</p>
              </div>
              <div>
                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
                {form.email && !emailValid && (
                  <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                )}
                <div className="flex gap-2 mt-2 flex-wrap">
                  {domains.map((d) => (
                    <button
                      key={d}
                      onClick={() => {
                        const base = form.email.split("@")[0];
                        update("email", base + d);
                      }}
                      className="border border-blue-400 text-blue-600 text-xs rounded px-3 py-1"
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              disabled={!form.fullName || !emailValid}
              onClick={() => setStep(STEPS.PROCESSING)}
              className="mt-8 w-full max-w-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg"
            >
              Unlock Offers
            </button>
            <p className="text-green-600 text-sm mt-4 text-center max-w-xl">🛡️ Your details are secured with us</p>
          </div>
        </div>
      </div>
    );
  }

  // ===== STEP 8: PROCESSING =====
  if (step === STEPS.PROCESSING) {
    return (
      <div className="min-h-screen flex flex-col">
        <CompanyHeader onBack={goBack} navigate={navigate} />
        <div className="flex-1 flex flex-col items-center justify-center bg-white">
          <div className="bg-green-100 text-green-700 rounded-lg px-5 py-2 text-sm mb-10">
            🪙 Apply today to get ₹200 Cashback
          </div>
          <div className="text-7xl mb-8 animate-pulse">💳</div>
          <h2 className="text-xl font-bold text-gray-800">Processing Your Profile</h2>
          <p className="text-sm text-gray-500 mt-2">Trusted by over 2 million happy users.</p>
        </div>
      </div>
    );
  }

  // ===== STEP 9: OFFERS =====
  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader onBack={goBack} navigate={navigate} />
      {/* top bar */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="font-bold text-blue-700">Direct Credit</div>
        <button onClick={() => navigate("/")} className="text-blue-600 border rounded px-4 py-1 text-sm">
          Sign Out
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* cashback banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-5 mb-6 flex items-center justify-between">
          <span className="font-bold">Apply & EARN HUGE CASHBACKS</span>
          <span className="text-sm">₹200 + ₹750 Cashback</span>
        </div>

        <h2 className="text-lg font-semibold mb-4">{offers.length} Card Offer{offers.length !== 1 ? "s" : ""}</h2>

        <div className="space-y-5">
          {offers.map((card) => (
            <div key={card.id} className="bg-white border rounded-xl p-5">
              <span className="inline-block border border-orange-400 text-orange-500 text-xs rounded px-2 py-0.5 mb-3">
                {card.tag}
              </span>
              <div className="flex gap-5 flex-col sm:flex-row">
                <div className="w-40 h-24 bg-gradient-to-br from-gray-800 to-gray-600 rounded-lg flex items-center justify-center text-white text-xs">
                  {card.image ? <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded-lg" /> : "CARD"}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{card.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">1st Year Fee: {card.firstYearFee}</p>
                  <p className="text-sm text-gray-600 mt-1">{card.joiningBenefit}</p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    {card.benefits.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                  <div className="flex gap-3 mt-4">
                    <button className="text-blue-600 text-sm">+ More Details</button>
                    <button className="bg-blue-600 text-white text-sm rounded px-4 py-2">Check Eligibility ›</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}