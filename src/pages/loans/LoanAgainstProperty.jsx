// ─────────────────────────────────────────────────────────────────
//  Loan Against Property — multi-step flow (Direct Credit)
//  Steps:  Loan Amount → Pin Code → Property Type → Employment
//          → Net Income → Work Experience → Quotes → Thank You
//
//  NOTE on the home icon:
//  The left-panel icon is controlled by ONE variable — HERO_ICON.
//  Change it to any image URL (or local /images/... path) and the
//  whole flow updates. Set it to "" to fall back to the Home lucide icon.
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ChevronLeft, Home, CheckCircle, ArrowRight, Download, Phone, Mail,
} from "lucide-react";

// ── CHANGEABLE HOME / HERO ICON ──────────────────────────────────
//  👇 isko apni image se replace kar sakte ho (URL ya /images/xyz.png)
//  agar "" rakhoge to default <Home/> lucide icon dikhega.
const HERO_ICON = "/images/lap-illustration.png";

// ── Direct Credit lender quotes (Paisabazaar ki jagah Direct Credit) ──
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

// ── Step option data ─────────────────────────────────────────────
const LOAN_AMOUNTS  = ["Upto ₹15 Lacs", "₹15 - ₹20 Lacs", "₹20 - ₹30 Lacs", "₹30 - ₹50 Lacs", "₹50 - ₹75 Lacs", "₹75 Lacs +"];
const PROPERTY_TYPES = ["Residential", "Commercial", "Industrial", "Agricultural", "Gram panchayat", "Lal Dora", "Khasra/khtauni", "Others"];
const EMPLOYMENT = [
  { title: "Salaried",                 desc: "Receive fixed amount of income every month" },
  { title: "Self-Employed Business",   desc: "Run a business" },
  { title: "Self-Employed Professional", desc: "Engage in a profession (Eg: Doctor, C.A., Lawyer, etc)" },
];
const INCOMES   = ["Below 3 Lacs", "3 Lacs - 6 Lacs", "6 Lacs - 12 Lacs", "12 Lacs - 18 Lacs", "Over 18 Lacs"];
const EXPERIENCE = ["0 - 1 years", "1 - 2 years", "2 - 3 years", "3+ years"];

const TOTAL_STEPS = 7;

export default function LoanAgainstProperty() {
  // step: 0..5 = the 6 questions, "quotes" = offers list, "thankyou" = done
  const [step, setStep] = useState(0);

  const [data, setData] = useState({
    mobile: "",
    amount: "",
    pin: "",
    propertyType: "",
    employment: "",
    income: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [selectedLender, setSelectedLender] = useState(null);
  const [refNo] = useState(() => Math.floor(1000000000 + Math.random() * 8999999999));

  const update = (key, val) => {
    setData(d => ({ ...d, [key]: val }));
    setError("");
  };

  const goNext = () => { setError(""); setStep(s => s + 1); };
  const goBack = () => { setError(""); setStep(s => Math.max(0, s - 1)); };

  // Auto-advance for single-select steps
  const pickAndNext = (key, val) => {
    update(key, val);
    setTimeout(() => setStep(s => s + 1), 180);
  };

  // ── LEFT PANEL (shared across all steps) ───────────────────────
  const LeftPanel = (
    <div className="bg-blue-50 lg:w-1/2 px-6 md:px-12 py-10 flex flex-col">
        {/*  ye left side me logo lga tha vhi hta diye hai */}
      {/* {/* <img src="/images/direct-credit-logo.png" alt="Direct Credit"
        className="h-14 w-auto mb-12" 
       onError={(e) => { e.currentTarget.style.display = "none"; }} /> */}

      <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-5">
        Loan Against Property
      </h2>
      <p className="text-blue-900/70 text-base leading-relaxed max-w-md mb-10">
        Let your property finance your business, education, health or other
        personal requirements. Access to the best loan offers against property
        at lowest interest rates from Direct Credit.
      </p>

      {/* Changeable hero / home icon */}
      <div className="mt-auto flex justify-center">
        {HERO_ICON ? (
          <img src={HERO_ICON} alt="Loan Against Property"
            className="w-64 h-auto"
            onError={(e) => { e.currentTarget.style.display = "none"; }} />
        ) : (
          <div className="w-40 h-40 rounded-3xl bg-white flex items-center justify-center shadow-lg">
            <Home size={64} className="text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );

  // ── Progress + back header (steps 0..5) ────────────────────────
  const StepHeader = (
    <div>
      <div className="flex items-center justify-between mb-6">
        {step > 0 ? (
          <button onClick={goBack}
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition">
            <ChevronLeft size={18} className="text-gray-600" />
          </button>
        ) : (
          <div className="flex items-center gap-2">
            {/* small home icon next to label — uses same changeable source */}
            {HERO_ICON ? (
              <img src={HERO_ICON} alt="" className="w-5 h-5 object-contain"
                onError={(e) => { e.currentTarget.style.display = "none"; }} />
            ) : (
              <Home size={16} className="text-gray-500" />
            )}
            <span className="text-xs font-bold text-gray-500 tracking-wide uppercase">
              Loan Against Property
            </span>
          </div>
        )}
        <span className="text-sm text-gray-500 font-medium">Step {step + 1}/{TOTAL_STEPS}</span>
      </div>

      {/* thin progress bar */}
      <div className="h-1 w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
      </div>
    </div>
  );

  // reusable option card (single-select pill)
  const OptionCard = ({ label, selected, onClick }) => (
    <button onClick={onClick}
      className={`flex items-center justify-between border rounded-xl px-4 py-3.5 text-sm font-medium transition text-left
        ${selected
          ? "border-blue-600 text-blue-700 bg-blue-50/40"
          : "border-gray-200 text-gray-700 hover:border-blue-300"}`}>
      <span>{label}</span>
      <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ml-2
        ${selected ? "border-blue-600 bg-blue-600" : "border-gray-300"}`} />
    </button>
  );

  // ── RIGHT PANEL CONTENT per step ───────────────────────────────
  const renderStep = () => {
    switch (step) {
// == step- 1
        case 0:
  return (
    <>
      {/* Company Logo */}
       <img
        src="/images/direct-credit-logo.png"
        alt="Direct Credit"
        className="h-20 w-auto mb-8"
      />
      <h2 className="text-3xl font-bold text-blue-700 mb-4 leading-snug">
        Unlock the Best Loan Offers Against Property
      </h2>
        <p className="text-3xl font-bold text-blue-700 mb-6">
        from 20+ lenders, Anytime & Anywhere
      </p>
      <div className="space-y-3 mb-8">
        <p>✓ Compare Offers from Top Banks & HFCs</p>
        <p>✓ Interest Rates @ 7.90% onwards</p>
        <p>✓ Loan Tenure up to 20 Years</p>
      </div>

      <label className="block text-sm mb-2">
        Mobile Number
      </label>

      <input
        type="tel"
        maxLength={10}
        value={data.mobile}
        onChange={(e) =>
          update(
            "mobile",
            e.target.value.replace(/\D/g, "")
          )
        }
        placeholder="Enter Mobile Number"
        className="w-full border-b-2 border-gray-300 py-3 focus:outline-none"
      />

      {error && (
        <p className="text-red-500 text-xs mt-2">
          {error}
        </p>
      )}

      <button
        onClick={() => {
          if (!/^[6-9]\d{9}$/.test(data.mobile)) {
            setError("Enter valid mobile number");
            return;
          }

          setStep(1);
        }}
        className="w-full mt-8 bg-blue-700 text-white py-4 rounded-xl"
      >
        Proceed
      </button>
    </>
  );
      // STEP 2 — Loan Amount
      case 1:
        return (
          <>
            {StepHeader}
            <h3 className="text-2xl font-bold text-blue-900 mb-1">Select your desired</h3>
            <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1 mb-6">Loan Amount</h3>
            <div className="grid grid-cols-2 gap-3">
              {LOAN_AMOUNTS.map(a => (
                <OptionCard key={a} label={a} selected={data.amount === a}
                  onClick={() => pickAndNext("amount", a)} />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-5 leading-relaxed">
              I authorize Direct Credit to share details of my Property Loan enquiry
              with Direct Credit affiliated lending partners
            </p>
          </>
        );

      // STEP 3 — Pin Code
      case 2:
        return (
          <>
            {StepHeader}
            <h3 className="text-2xl font-bold text-blue-900 mb-1">Where is your</h3>
            <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1 mb-8">Property Located?</h3>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pin Code</label>
            <div className="relative border-b-2 border-gray-200 focus-within:border-blue-500 transition">
              <input
                type="tel"
                maxLength={6}
                placeholder="Enter your area postal code"
                value={data.pin}
                onChange={e => update("pin", e.target.value.replace(/\D/g, ""))}
                className="w-full py-2 pr-20 text-sm focus:outline-none bg-transparent"
              />
              <span className="absolute right-0 top-2 text-xs text-gray-400">Digits Only</span>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <button
              onClick={() => {
                if (!/^\d{6}$/.test(data.pin)) { setError("Enter a valid 6-digit pin code"); return; }
                goNext();
              }}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 text-sm">
              Continue <ArrowRight size={16} />
            </button>
          </>
        );

      // STEP 4 — Property Type
      case 3:
        return (
          <>
            {StepHeader}
            <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1 mb-6">What is the type of property?</h3>
            <div className="grid grid-cols-2 gap-3">
              {PROPERTY_TYPES.map(t => (
                <OptionCard key={t} label={t} selected={data.propertyType === t}
                  onClick={() => pickAndNext("propertyType", t)} />
              ))}
            </div>
          </>
        );

      // STEP 5 — Employment Type
      case 4:
        return (
          <>
            {StepHeader}
            <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1 mb-6">Employment Type</h3>
            <div className="space-y-3">
              {EMPLOYMENT.map(({ title, desc }) => (
                <button key={title} onClick={() => pickAndNext("employment", title)}
                  className={`w-full flex items-center justify-between border rounded-xl px-5 py-4 text-left transition
                    ${data.employment === title ? "border-blue-600 bg-blue-50/40" : "border-gray-200 hover:border-blue-300"}`}>
                  <div>
                    <p className="text-sm font-semibold text-blue-900">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                  <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ml-3
                    ${data.employment === title ? "border-blue-600 bg-blue-600" : "border-gray-300"}`} />
                </button>
              ))}
            </div>
          </>
        );

      // STEP 6 — Net Annual Income
      case 5:
        return (
          <>
            {StepHeader}
            <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1 mb-6">Select Your Net Annual Income</h3>
            <div className="grid grid-cols-2 gap-3">
              {INCOMES.map(i => (
                <OptionCard key={i} label={i} selected={data.income === i}
                  onClick={() => pickAndNext("income", i)} />
              ))}
            </div>
          </>
        );

      // STEP 7 — Work Experience
      case 6:
        return (
          <>
            {StepHeader}
            <h3 className="text-2xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1 mb-6">Total Years of Work Experience</h3>
            <div className="grid grid-cols-2 gap-3">
              {EXPERIENCE.map(x => (
                <OptionCard key={x} label={x} selected={data.experience === x}
                  onClick={() => { update("experience", x); setTimeout(() => setStep("quotes"), 180); }} />
              ))}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  // ── QUOTES PAGE (full width, white) ────────────────────────────
  if (step === "quotes") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
            {/* summary bar */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 flex flex-wrap items-center gap-8 mb-6">
              <div>
                <p className="text-xs text-gray-500">Required Amount</p>
                <p className="text-sm font-bold text-gray-800">{data.amount || "₹40 Lacs"}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Loan Tenure</p>
                <p className="text-sm font-bold text-gray-800">10 years</p>
              </div>
              <button onClick={() => setStep(0)}
                className="ml-auto text-xs text-blue-600 font-semibold hover:underline">
                ← Edit details
              </button>
            </div>

            {/* lender cards */}
            <div className="space-y-4">
              {lenderQuotes.map(l => (
                <div key={l.id}
                  className="border border-gray-200 rounded-xl px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-md transition">
                  <div className="w-32 flex-shrink-0">
                    <img src={l.logo} alt={l.name} className="h-8 object-contain"
                      onError={(e) => { e.currentTarget.replaceWith(Object.assign(document.createElement("span"), { className: "text-sm font-bold text-gray-700", innerText: l.name })); }} />
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
                    onClick={() => { setSelectedLender(l); setStep("thankyou"); window.scrollTo({ top: 0 }); }}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-2.5 rounded-lg transition text-sm whitespace-nowrap">
                    Apply
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── THANK YOU PAGE ─────────────────────────────────────────────
  if (step === "thankyou") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col lg:flex-row">
          {LeftPanel}
          <div className="lg:w-1/2 px-6 md:px-12 py-12 flex flex-col">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle size={32} className="text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Thank You!</h2>
            <p className="text-sm text-gray-700 leading-relaxed mb-5 max-w-md">
              We have received your <strong>Loan Against Property</strong> application
              {selectedLender ? <> for <strong>{selectedLender.name}</strong></> : null}.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 inline-block mb-5 w-fit">
              <span className="text-sm text-gray-600">Reference No. : </span>
              <span className="text-sm font-bold text-gray-800">{refNo}</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Our loan expert will get in touch within 24 hours to take your application forward.
            </p>
            <p className="text-sm text-gray-700 mb-8 max-w-md">
              We thank you for choosing <strong>Direct Credit</strong> for your financial needs
              and would be keen to serve you in future as well.
            </p>

            <div className="bg-gray-50 rounded-xl p-5 max-w-md">
              <p className="text-sm text-gray-600 mb-3">For more credit needs</p>
              <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm mb-4">
                <Download size={16} /> Download App
              </button>
              <p className="text-xs text-gray-500 mb-2">In case of any queries, reach out to Direct Credit on:</p>
              <div className="flex flex-wrap gap-5 text-xs text-gray-600">
                <span className="flex items-center gap-1.5"><Phone size={13} /> 1800 - 200 - 3467</span>
                <span className="flex items-center gap-1.5"><Mail size={13} /> support@directcredit.com</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ── DEFAULT — split layout with current step ───────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row">
        {LeftPanel}
        <div className="lg:w-1/2 px-6 md:px-12 py-10 flex flex-col">
          <div className="max-w-md w-full">
            {renderStep()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
