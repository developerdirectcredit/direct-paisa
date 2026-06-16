import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  CheckCircle, ArrowRight, ChevronUp, ChevronDown,
  Star, Phone, Gift, Handshake,
} from "lucide-react";

// ─── Static Data ─────────────────────────────────────────────────────────────

const featureBullets = [
  "No end-usage restriction",
  "Loan amount of up to Rs. 50 lakh, which can exceed depending on lenders' discretion",
  "Repayment tenure usually ranges between 1 year and 7 years, with some banks/NBFCs offering longer tenures",
  "Minimal documentation",
  "The interest rates usually start from 9.98% p.a. with some PSU banks offering lower interest rates",
  "Quick disbursals",
  "Applicants having excellent credit profiles may also qualify for preapproved/prequalified personal loans with instant disbursal",
];

const stats = [
  { value: "6 Crore", sub: "Registered Consumers" },
  { value: "30+", sub: "Lending Partners" },
  { value: "₹65k Crore+", sub: "Loans Disbursed" },
];

// ─── Eligibility / Disclaimer accordion content ──────────────────────────────
function DisclaimerPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Personal Loan Features &amp; Benefits</h3>
        <ul className="space-y-2.5">
          {featureBullets.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <CheckCircle size={15} className="text-blue-500 mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Personal Loan Eligibility</h3>
        <div className="space-y-1.5 text-sm text-gray-600">
          <p><span className="font-semibold text-gray-800">Age:</span> 21 – 60 years</p>
          <p><span className="font-semibold text-gray-800">Income:</span> Minimum Rs 15,000/month for salaried applicants</p>
          <p><span className="font-semibold text-gray-800">Credit Score:</span> Preferably 750 and above as having higher credit scores increase the chances of your loan approval at lower interest rates</p>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p><span className="font-semibold text-gray-800">Address:</span> Direct Credit, 4th Floor, Cyber Tower, Sector 21, Gurugram (HR) 122016</p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Disclaimer:</h3>
        <div className="text-sm text-gray-500 leading-relaxed space-y-3">
          <p>Direct Credit is a loan aggregator and is authorized to provide services on behalf of its lending partners.</p>
          <p>
            The APR (Annual Percentage Rate) of a personal loan is its annualised cost of borrowing, which
            includes the interest rate as well as the processing fees, documentation fees and other fees
            charged during the loan origination. The APR is expressed in the form of a percentage and thus
            allows personal loan applicants to detect personal loan schemes offered at lower interest rates
            but with higher processing fees and/or other charges.
          </p>
          <p>
            The APR of personal loans usually ranges between 10.50% to 36%. For example, assume that you
            have availed a personal loan of Rs. 5 lakhs @ 9.98% p.a. with a repayment tenure of 5 years.
            The processing fee charged for this loan is 1.5% of the loan amount, which amounts to Rs. 7,500.
            Therefore, the total borrowing cost of your personal loan will be Rs. 1,49,820 and its APR will
            be 10.64%.
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
        Direct Credit Marketing &amp; Consulting Pvt. Ltd., 4th Floor, Cyber Tower, Sector 21, Gurugram (HR) 122016
      </p>
    </div>
  );
}

// ─── Trust ratings strip ─────────────────────────────────────────────────────
function RatingsStrip() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8">
      <p className="text-gray-700 text-base max-w-xs">
        Direct Credit is one of <span className="font-bold">India's leading digital</span> credit platforms.
      </p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4].map((i) => (
          <Star key={i} size={26} className="fill-yellow-400 text-yellow-400" />
        ))}
        <div className="relative w-[26px] h-[26px]">
          <Star size={26} className="fill-gray-200 text-gray-200 absolute" />
          <div className="overflow-hidden w-[60%] absolute">
            <Star size={26} className="fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-8">
        {stats.map((s) => (
          <div key={s.sub} className="text-center">
            <p className="text-xl font-bold text-blue-700">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PersonalLoanQuote() {
  const [form, setForm] = useState({ name: "", mobile: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3) e.name = "Enter your full name as on PAN card";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    return e;
  };

  const handleProceed = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Top bar — logo + talk to expert (mini header inside page, like PaisaBazaar) */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">DC</span>
            </div>
            <span className="font-extrabold text-lg text-gray-900">direct<span className="text-blue-600">credit</span></span>
          </div>
          <button className="flex items-center gap-2 border border-blue-200 text-blue-600 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors">
            <Phone size={15} /> Talk to Expert
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          HERO — Headline + Form
      ══════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 pt-10 pb-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug mb-6">
          Up to <span className="text-blue-700 font-extrabold">₹50 Lakhs</span> personal loan{" "}
          <span className="text-blue-600">starting @ 9.98% per annum</span>
        </h1>

        {/* Promise badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 border border-green-200 bg-green-50 rounded-xl px-4 py-2.5">
            <Gift size={20} className="text-green-600" />
            <div className="text-left">
              <p className="text-xs text-gray-500 leading-none">Get Cashback of</p>
              <p className="text-sm font-bold text-green-700 leading-tight">₹1000</p>
            </div>
          </div>
          <div className="flex items-center gap-2 border border-amber-200 bg-amber-50 rounded-xl px-4 py-2.5">
            <Handshake size={20} className="text-amber-600" />
            <div className="text-left">
              <p className="text-xs text-gray-500 leading-none">Direct Credit Promise</p>
              <p className="text-sm font-bold text-amber-700 leading-tight">Quick Disbursal &amp; Low EMI</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-md mx-auto">
          {!submitted ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter your name (as per PAN Card)"
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  className={`w-full border rounded-xl px-4 py-3.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400 transition
                    ${errors.name ? "border-red-400 bg-red-50" : "border-gray-300"}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 text-left">{errors.name}</p>}
              </div>

              <div className="mb-2">
                <div className={`flex items-center border rounded-xl overflow-hidden transition
                  ${errors.mobile ? "border-red-400" : "border-gray-300"}`}>
                  <span className="px-3 py-3.5 text-sm text-gray-500 font-medium border-r border-gray-200 bg-gray-50">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="Enter Mobile Number"
                    value={form.mobile}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, mobile: v }); setErrors({ ...errors, mobile: "" });
                    }}
                    className="flex-1 px-3 py-3.5 text-sm text-center focus:outline-none bg-transparent"
                  />
                </div>
                {errors.mobile && <p className="text-red-500 text-xs mt-1 text-left">{errors.mobile}</p>}
              </div>

              <button
                onClick={handleProceed}
                className="w-full bg-gradient-to-r from-indigo-700 to-blue-700 hover:from-indigo-800 hover:to-blue-800 text-white font-bold py-4 rounded-xl transition-colors mt-3 text-base"
              >
                Proceed
              </button>

              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                By clicking on proceed, you have read and agree to the Direct Credit's{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Credit Report Terms of Use</span>,{" "}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Direct Credit's Terms of Use</span>{" "}
                &amp; <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
              </p>
            </>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={28} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">Thanks, {form.name.split(" ")[0]}!</h3>
              <p className="text-gray-500 text-sm mb-4">
                We've received your details. Our loan expert will call you on{" "}
                <span className="font-semibold text-gray-700">+91 {form.mobile}</span> shortly with personalized offers.
              </p>
              <button
                onClick={() => { setForm({ name: "", mobile: "" }); setSubmitted(false); }}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                Submit another application
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          RATINGS STRIP
      ══════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 border-t border-gray-100">
        <RatingsStrip />
      </section>

      {/* ══════════════════════════════════════════════
          DISCLAIMERS ACCORDION
      ══════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="border border-gray-200 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowDisclaimer(!showDisclaimer)}
            className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="font-bold text-gray-800">
              Disclaimers<sup className="text-blue-600">+</sup>
            </span>
            {showDisclaimer ? (
              <ChevronUp size={20} className="text-gray-500" />
            ) : (
              <ChevronDown size={20} className="text-gray-500" />
            )}
          </button>
          {showDisclaimer && (
            <div className="px-6 pb-6 pt-2 border-t border-gray-100">
              <DisclaimerPanel />
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Need funds instantly?</h2>
            <p className="text-blue-100 text-sm">Apply in 5 minutes — money in your account in 24 hours</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-white text-blue-700 font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm whitespace-nowrap"
          >
            Apply Now <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}