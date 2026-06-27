
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  CheckCircle,
  ArrowRight,
  Shield,
  RefreshCw,
  Globe,
  BarChart2,
  Star,
  ChevronDown,
  X,
  AlertCircle,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

// ─── Static Data ─────────────────────────────────────────────────────────────

const whyCheck = [
  {
    icon: BarChart2,
    title: "Check Credit Score from All 4 Bureaus",
    desc: "Get your score from CIBIL, Experian, Equifax & CRIF — all in one place.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: RefreshCw,
    title: "Track Credit Score Seamlessly Every Month",
    desc: "Receive monthly updates so you always know where you stand.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Globe,
    title: "Read Credit Report in Multiple Languages",
    desc: "Understand your credit report in Hindi, Tamil, Telugu & more.",
    color: "bg-purple-50 text-purple-600",
  },
];

const scoreRanges = [
  { range: "300 – 549", label: "Poor", color: "bg-red-500", textColor: "text-red-600", desc: "High risk — loan approval unlikely" },
  { range: "550 – 649", label: "Fair", color: "bg-orange-400", textColor: "text-orange-500", desc: "Below average — limited options" },
  { range: "650 – 749", label: "Good", color: "bg-yellow-400", textColor: "text-yellow-600", desc: "Decent — eligible for most loans" },
  { range: "750 – 799", label: "Very Good", color: "bg-lime-500", textColor: "text-lime-600", desc: "Low risk — good rates available" },
  { range: "800 – 900", label: "Excellent", color: "bg-green-500", textColor: "text-green-600", desc: "Best rates & highest approval chances" },
];

const bureauLogos = [
  { name: "CIBIL", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200" },
  { name: "Experian", color: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200" },
  { name: "Equifax", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  { name: "CRIF", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
];

const howItWorks = [
  { step: "01", title: "Enter Mobile Number", desc: "Provide your registered mobile number to get started instantly." },
  { step: "02", title: "Verify with OTP", desc: "Enter the OTP sent to your mobile to securely verify your identity." },
  { step: "03", title: "View Your Score", desc: "Instantly see your credit score across all 4 bureaus with full report." },
];

const lowScoreReasons = [
  "Missed or late payments of credit cards and loan EMIs",
  "Maxing out your credit limit or having a high credit utilisation ratio regularly",
  "Errors in your credit report can also lower your score significantly",
  "Frequent or multiple hard inquiries for credit can also damage your score",
  "Closing the oldest credit account if other accounts are relatively new",
  "Settling a loan or credit card instead of paying it in full and closing the account",
];

const calculationFactors = [
  { factor: "Repayment History", impact: "High Impact", impactColor: "bg-red-100 text-red-700", desc: "Timely payments can boost your credit score significantly, whereas defaulting on EMIs or making late payments negatively affects your score." },
  { factor: "Credit Utilisation Ratio", impact: "High Impact", impactColor: "bg-red-100 text-red-700", desc: "Keeping your credit utilisation below 30% of your total limit is recommended for maintaining a healthy credit score." },
  { factor: "Duration of Credit History", impact: "Moderate Impact", impactColor: "bg-yellow-100 text-yellow-700", desc: "The age of your credit history also affects your score. Responsible repayment over the long run represents consistent good credit behaviour." },
  { factor: "Number of Hard Inquiries", impact: "Moderate Impact", impactColor: "bg-yellow-100 text-yellow-700", desc: "Every time you apply for new credit, the lender makes a hard inquiry. Multiple hard inquiries in a short span may negatively impact your score." },
  { factor: "Credit Mix", impact: "Low Impact", impactColor: "bg-green-100 text-green-700", desc: "Having a healthy mix of secured (home/car loan) and unsecured (personal loan/credit card) credit reflects responsible behaviour." },
];

const faqs = [
  {
    q: "Does checking my credit score affect it?",
    a: "No. Checking your own credit score is a 'soft inquiry' and does not impact your score in any way. You can check it as many times as you want.",
  },
  {
    q: "How often is my credit score updated?",
    a: "Credit scores are typically updated once every 15-45 days based on information reported by banks and financial institutions to the bureaus.",
  },
  {
    q: "What is a good credit score to get a loan?",
    a: "A score of 750 or above is generally considered good. Most lenders prefer scores of 750+ for quick loan approval at the best interest rates.",
  },
  {
    q: "Why do scores differ across the 4 bureaus?",
    a: "Each bureau (CIBIL, Experian, Equifax, CRIF) uses a slightly different scoring algorithm and may have access to different lender data, leading to minor variations.",
  },
  {
    q: "Is my personal data safe on Direct Credit?",
    a: "Yes, absolutely. Direct Credit uses 256-bit SSL encryption and is RBI-compliant. Your data is never shared with third parties without your consent.",
  },
];

// ─── OTP Modal ────────────────────────────────────────────────────────────────

function OtpModal({ mobile, onClose, onVerified }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resendSec, setResendSec] = useState(30);
  const [loading, setLoading] = useState(false);

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inputRefs = [ref0, ref1, ref2, ref3];

  useEffect(() => {
    ref0.current?.focus();
    const t = setInterval(() => setResendSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const handleOtpChange = (val, idx) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[idx] = v;
    setOtp(next);
    setError("");
    if (v && idx < 3) inputRefs[idx + 1].current?.focus();
  };

  const handleKey = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs[idx - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 4) { setError("Please enter the 4-digit OTP."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onVerified(); }, 1200);
  };

  const handleResend = () => {
    if (resendSec > 0) return;
    setOtp(["", "", "", ""]);
    setResendSec(30);
    ref0.current?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield size={28} className="text-blue-600" />
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Verify Mobile Number</h2>
        <p className="text-sm text-gray-500 mb-6">
          OTP sent on Mobile Number{" "}
          <span className="font-semibold text-gray-700">+91-xxx-xxx{mobile.slice(-4)}</span>
        </p>

        <div className="flex gap-3 justify-center mb-5">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={inputRefs[idx]}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              onKeyDown={(e) => handleKey(e, idx)}
              className={`w-14 h-14 text-center text-xl font-bold rounded-xl border-2 focus:outline-none transition
                ${digit ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-800"}
                ${error ? "border-red-400 bg-red-50" : ""}
              `}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-500 text-xs mb-3 flex items-center justify-center gap-1">
            <AlertCircle size={13} /> {error}
          </p>
        )}

        <p className="text-sm text-gray-500 mb-5">
          {resendSec > 0 ? (
            <>Resend OTP in <span className="font-semibold text-blue-600">{resendSec} seconds</span></>
          ) : (
            <button onClick={handleResend} className="text-blue-600 font-semibold hover:underline">
              Resend OTP
            </button>
          )}
        </p>

        <label className="flex items-center gap-2 justify-center mb-5 cursor-pointer">
          <input type="checkbox" defaultChecked className="accent-blue-600 w-4 h-4" />
          <span className="text-sm text-gray-600">Remember Me</span>
        </label>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Verifying…
            </span>
          ) : (
            <>Verify & Login <ArrowRight size={17} /></>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── Score Result Card ────────────────────────────────────────────────────────

function ScoreResult({ onReset }) {
  const [score] = useState(() => Math.floor(Math.random() * 141) + 680);
  const [bureauScores] = useState(() =>
    bureauLogos.map((b) => ({
      name: b.name,
      score: score + Math.floor(Math.random() * 21) - 10,
    }))
  );

  const pct = ((score - 300) / 600) * 100;
  const band =
    scoreRanges.find((r) => {
      const [min, max] = r.range.split(" – ").map(Number);
      return score >= min && score <= max;
    }) || scoreRanges[2];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white">
        <p className="text-blue-100 text-sm mb-1">Your Credit Score</p>
        <h2 className="text-4xl font-extrabold">{score}</h2>
        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-white ${band.textColor}`}>
          {band.label}
        </span>
      </div>

      <div className="px-6 pt-5">
        <div className="relative h-4 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full overflow-hidden">
          <div
            className="absolute top-0 h-full w-1 bg-white shadow-lg rounded-full transition-all duration-700"
            style={{ left: `calc(${pct}% - 2px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>300</span><span>900</span>
        </div>
      </div>

      <div className="px-6 pb-4 mt-3">
        <p className="text-sm text-gray-600">{band.desc}</p>
      </div>

      <div className="px-6 pb-5 grid grid-cols-2 gap-3">
        {bureauLogos.map((b, idx) => (
          <div key={b.name} className={`border rounded-xl p-3 ${b.bg} ${b.border}`}>
            <p className={`text-xs font-bold ${b.color}`}>{b.name}</p>
            <p className={`text-xl font-extrabold ${b.color}`}>{bureauScores[idx].score}</p>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 flex flex-col gap-3">
        <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
          <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
          <p className="text-xs text-green-700 font-medium">
            You're eligible for Personal Loans at <strong>best rates!</strong>
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-blue-600 text-sm font-medium hover:underline text-center"
        >
          Check another number
        </button>
      </div>
    </div>
  );
}

// ─── Bureau Compare Table ──────────────────────────────────────────────────────

function BureauTable() {
  const ds = { CIBIL: 809, Experian: 752, Equifax: 855, CRIF: 840 };
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-blue-900 text-white text-center py-3 font-semibold text-sm flex items-center justify-center gap-2">
        <span className="text-yellow-400">◆</span> Exclusively on Direct Credit <span className="text-yellow-400">◆</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-3 text-gray-600 font-semibold w-40">Bureau</th>
              {bureauLogos.map((b) => (
                <th key={b.name} className={`px-4 py-3 font-bold text-center ${b.color}`}>{b.name}</th>
              ))}
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50">
              <td className="px-4 py-2 text-xs text-gray-400">Last Refresh Date</td>
              {bureauLogos.map((b) => (
                <td key={b.name} className="px-4 py-2 text-xs text-gray-500 text-center">20 Mar '26</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-semibold text-gray-700">Score</td>
              {bureauLogos.map((b) => (
                <td key={b.name} className={`px-4 py-3 text-xl font-extrabold text-center ${b.color}`}>{ds[b.name]}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3">
                <p className="font-semibold text-gray-700">Score Change</p>
                <p className="text-xs text-gray-400">Since last refresh</p>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-green-500 font-bold flex items-center justify-center gap-1">
                  <TrendingUp size={14} /> 1
                </span>
              </td>
              {["Experian", "Equifax", "CRIF"].map((b) => (
                <td key={b} className="px-4 py-3 text-center text-gray-400">–</td>
              ))}
            </tr>
            <tr>
              <td className="px-4 py-4">
                <p className="font-bold text-gray-800">Credit Score Insights</p>
                <p className="text-xs text-gray-400 mt-0.5">A deeper look into the factors behind your score</p>
              </td>
              <td colSpan={4} className="px-4 py-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 ml-auto transition-colors">
                  <Shield size={15} /> Download Full Report <ArrowRight size={14} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CreditScore() {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [step, setStep] = useState("form"); // "form" | "otp" | "result"
  const [openFaq, setOpenFaq] = useState(null);

  const handleGetScore = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    }
    if (!agreed) {
      setMobileError("Please accept the terms to continue");
      return;
    }
    setStep("otp");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {step === "otp" && (
        <OtpModal
          mobile={mobile}
          onClose={() => setStep("form")}
          onVerified={() => setStep("result")}
        />
      )}

      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-10 pb-12">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* LEFT — Content */}
            <div className="flex-1">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">
                Free Credit Report
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Check Free Credit<br />
                <span className="text-blue-600">Score & Report</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed max-w-xl mb-8">
                Check your credit score free across all 4 credit bureaus, including CIBIL, only on
                Direct Credit. Get your free credit score online with monthly updates and take steps
                to become financially stronger.
              </p>

              <div className="space-y-4 mb-8">
                {whyCheck.map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon size={19} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{title}</p>
                      <p className="text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 grid grid-cols-3 gap-4 items-center">
                <div className="flex items-center gap-2 col-span-1">
                  <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z" fill="#4CAF50" />
                      <path d="M3 3.5l9.5 9.5L3 22.5V3.5z" fill="#8BC34A" />
                      <path d="M12.5 13l6 3.5-6-3.5z" fill="#FF9800" />
                      <path d="M12.5 11L3 3.5l9.5 7.5z" fill="#F44336" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex gap-0.5 mb-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} size={9} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-xs font-bold text-gray-800">4.5/5</p>
                    <p className="text-xs text-gray-400">15.6L Reviews</p>
                  </div>
                </div>
                {[
                  { value: "5.7Cr+", sub: "Satisfied Customers" },
                  { value: "4 Bureaus", sub: "Coverage" },
                ].map((s) => (
                  <div key={s.value} className="text-center">
                    <p className="text-lg font-bold text-blue-600">{s.value}</p>
                    <p className="text-xs text-gray-400">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Form Card or Score Result */}
            <div className="w-full lg:w-[400px] flex-shrink-0 lg:sticky lg:top-24">
              {step === "result" ? (
                <ScoreResult onReset={() => { setStep("form"); setMobile(""); }} />
              ) : (
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 text-white text-center">
                    <p className="font-bold text-lg">Check Credit Score & Report</p>
                    <p className="text-blue-100 text-sm">
                      Worth <span className="line-through">₹1,200</span>{" "}
                      <span className="text-yellow-300 font-bold text-lg">Absolutely FREE</span>
                    </p>
                    <p className="text-xs text-blue-200 mt-0.5">
                      Chance to get Accidental Cover up to ₹1Lakh & more
                    </p>
                  </div>

                  <div className="px-6 py-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">Let's Get Started</h2>
                    <p className="text-xs text-gray-400 text-center mb-5">
                      Enter your mobile number to receive OTP
                    </p>

                    <div className="mb-1 relative">
                      <span className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-blue-500 font-medium z-10">
                        Mobile Number
                      </span>
                      <div
                        className={`flex items-center border-2 rounded-xl overflow-hidden transition
                          ${mobileError ? "border-red-400" : "border-blue-400"}`}
                      >
                        <div className="flex items-center gap-1.5 px-3 py-3.5 border-r border-gray-200 bg-gray-50 flex-shrink-0">
                          <span>🇮🇳</span>
                          <span className="text-sm text-gray-600 font-medium">+91</span>
                        </div>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter mobile number"
                          value={mobile}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "");
                            setMobile(v);
                            setMobileError("");
                          }}
                          className="flex-1 px-3 py-3.5 text-sm focus:outline-none bg-transparent"
                        />
                        {mobile.length === 10 && (
                          <button
                            onClick={() => setMobile("")}
                            className="px-3 text-blue-600 text-xs font-semibold whitespace-nowrap"
                          >
                            ✏ Edit
                          </button>
                        )}
                      </div>
                      {mobileError && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {mobileError}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-gray-400 mt-2 mb-4">
                      You will receive an OTP on mentioned number
                    </p>

                    <button
                      onClick={handleGetScore}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      Get Free Credit Score <ArrowRight size={17} />
                    </button>

                    <div className="mt-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-xs text-gray-400 whitespace-nowrap">Powered by</span>
                        <div className="h-px flex-1 bg-gray-200" />
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {bureauLogos.map((b) => (
                          <div
                            key={b.name}
                            className={`border rounded-lg py-1.5 px-2 text-center ${b.bg} ${b.border}`}
                          >
                            <span className={`text-xs font-bold ${b.color}`}>{b.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="cs-terms"
                        checked={agreed}
                        onChange={(e) => { setAgreed(e.target.checked); setMobileError(""); }}
                        className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0 cursor-pointer"
                      />
                      <label htmlFor="cs-terms" className="text-xs text-gray-400 leading-relaxed cursor-pointer">
                        By logging in, you agree to the following{" "}
                        <span className="text-blue-500">Credit Report Terms of Use</span>,{" "}
                        <span className="text-blue-500">Terms of Use</span> and{" "}
                        <span className="text-blue-500">Privacy Policy</span>{" "}
                        <span className="text-blue-500 font-medium">More</span>
                      </label>
                    </div>

                    <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
                      <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      <p className="text-xs text-green-700 font-medium">
                        <strong>5.7 Crore</strong> reports checked so far
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT IS CREDIT SCORE
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 border-b border-gray-100">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Credit Score?</h2>
            <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
              <p>
                Credit Score is a 3-digit numeric summary of your credit history that represents your
                creditworthiness. It is commonly known as CIBIL Score (provided by TransUnion CIBIL),
                and ranges between 300 and 900.
              </p>
              <p>
                CIBIL is one of the <strong className="text-gray-800">4 Credit Bureaus</strong> in
                India — alongside Experian, Equifax and CRIF — that calculate and maintain your credit
                score based on information reported by lenders.
              </p>
              <p>
                A score of <strong className="text-blue-600">750 or above</strong> is considered excellent
                and greatly increases your chances of loan approval at competitive interest rates.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-4 text-sm">Credit Score Range</h3>
            <div className="space-y-3">
              {scoreRanges.map((r) => (
                <div key={r.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${r.color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`text-sm font-semibold ${r.textColor}`}>{r.label}</span>
                      <span className="text-xs text-gray-500 font-mono">{r.range}</span>
                    </div>
                    <p className="text-xs text-gray-400">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════════ */}
      <section className="bg-blue-50 py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">How to Check Credit Score</h2>
          <p className="text-gray-500 text-sm text-center mb-10">3 easy steps — takes less than 2 minutes</p>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-3 z-10 text-blue-300">
                    <ArrowRight size={20} />
                  </div>
                )}
                <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          COMPARE ACROSS BUREAUS
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Compare your Credit Report across 4 Bureaus</h2>
        <p className="text-gray-500 text-sm mb-8">
          Direct Credit gives you a unified view of your credit scores from all 4 bureaus — for free.
        </p>
        <BureauTable />
      </section>

      {/* ══════════════════════════════════════════════
          REASONS FOR LOW SCORE
      ══════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-14 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reasons for a Low Credit Score</h2>
          <p className="text-gray-500 text-sm mb-8">
            Avoid these common mistakes that can lower your credit score.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {lowScoreReasons.map((reason, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100">
                <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-500 font-bold text-xs">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          HOW CALCULATED
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How is Credit Score Calculated?</h2>
        <p className="text-gray-500 text-sm mb-8">
          These factors depict your past credit behaviour and are checked by banks and NBFCs.
        </p>
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <BarChart2 size={18} className="text-blue-600" />
              Factors that Affect your Credit Score
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {calculationFactors.map((f, i) => (
              <div key={i} className="px-6 py-5 flex items-start gap-4">
                <CheckCircle size={18} className="text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-gray-800 text-sm">{f.factor}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${f.impactColor}`}>
                      {f.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Checking your own score is a soft inquiry and doesn't affect
            your credit score. Only loan/card applications create hard inquiries.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-14 border-b border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openFaq === i ? "rotate-180 text-blue-600" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50">
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16 pt-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Know Your Credit Score — It's Free!</h2>
            <p className="text-blue-100 text-sm">
              Join 5.7 Crore+ Indians who check their score on Direct Credit every month.
            </p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap shadow"
          >
            Check My Score Free <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}