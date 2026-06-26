// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { Home, CheckCircle, ArrowRight, Phone } from "lucide-react";

// const features = ["Loan amount: ₹10 Lakh – ₹5 Crore","Interest rate from 8.50% p.a.","Tenure upto 30 years","Balance transfer facility","Top-up loan available","Tax benefit under 80C & 24B"];
// const eligibility = ["Age: 21 – 65 years","Salaried or self-employed","Stable income proof","CIBIL score 700+","Property should be legally clear"];
// const documents = ["PAN & Aadhaar Card","Income proof / ITR 3 years","Bank statement 12 months","Property documents","Sale agreement"];

// export default function HomeLoan() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16 px-4">
//         <div className="max-w-5xl mx-auto">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Home size={24} /></div>
//             <span className="text-green-200 font-medium">Loans → Home Loan</span>
//           </div>
//           <h1 className="text-3xl md:text-5xl font-bold mb-4">Home Loan</h1>
//           <p className="text-green-100 text-lg max-w-xl mb-8">Buy your dream home with best interest rates from top banks and NBFCs. Tenure upto 30 years.</p>
//           <div className="flex flex-wrap gap-4">
//             <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2">Apply Now <ArrowRight size={18} /></button>
//             <button className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"><Phone size={16} /> Talk to Expert</button>
//           </div>
//         </div>
//       </section>
//       <section className="bg-white border-b">
//         <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
//           {[{label:"Max Loan",value:"₹5 Crore"},{label:"Interest From",value:"8.50%*"},{label:"Max Tenure",value:"30 Years"},{label:"Tax Benefit",value:"80C+24B"}].map((s) => (
//             <div key={s.label} className="py-6 px-8 text-center">
//               <div className="text-2xl font-bold text-green-600">{s.value}</div>
//               <div className="text-sm text-gray-500 mt-1">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Key Features</h2>
//           <ul className="space-y-3">{features.map((f) => <li key={f} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-green-500 mt-0.5 flex-shrink-0" />{f}</li>)}</ul>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Eligibility</h2>
//           <ul className="space-y-3">{eligibility.map((e) => <li key={e} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-blue-500 mt-0.5 flex-shrink-0" />{e}</li>)}</ul>
//         </div>
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h2 className="font-bold text-gray-800 text-lg mb-5">Documents Required</h2>
//           <ul className="space-y-3">{documents.map((d) => <li key={d} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-purple-500 mt-0.5 flex-shrink-0" />{d}</li>)}</ul>
//         </div>
//       </section>
//       <section className="max-w-5xl mx-auto px-4 pb-16">
//         <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
//           <h2 className="text-2xl font-bold mb-2">Apna ghar, apna sapna!</h2>
//           <p className="text-green-100 mb-6">Compare rates from 30+ banks and get the best deal</p>
//           <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">Apply for Home Loan</button>
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }

// 22 june ko data upload kiya 
import { useState, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ArrowLeft, ChevronLeft, ChevronDown, X, Wallet, Building2,
  IndianRupee, SlidersHorizontal, ArrowDownWideNarrow, Check,
  CheckCircle2, Upload, Camera, ShieldCheck, FileText, UserPlus, Trash2,
  Home, ArrowRight, Phone, CheckCircle,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   HOME LOAN — single-file page + full Paisabazaar-style application journey
   Landing → Loan Amount → Pincode → Income → Basic Details → Mobile OTP →
   Email OTP → KYC → Aadhaar → PAN → Co-Applicant → Property → Offers
   Everything lives in this one file (like BusinessLoan.jsx). Frontend-only;
   file uploads show a local preview with no real verification.
═══════════════════════════════════════════════════════════════════════════ */


/* ═══════════ STEP COMPONENTS ═══════════ */

/* ════════════════════════════════════════════════════════════════════
   HOME LOAN — Phase 1 step components
   basic → mobileOtp → emailOtp → kyc → aadhaar → pan → coApplicant → property
   Frontend-only. File uploads show a local preview (no real verification).
═══════════════════════════════════════════════════════════════════════ */

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const AADHAAR_REGEX = /^\d{12}$/;

const fieldWrap = (err) =>
  `relative border rounded-md ${err ? "border-red-400" : "border-gray-300 focus-within:border-green-600"}`;
const floatLabel = "absolute -top-2 left-3 bg-white px-1 text-[11px] text-green-600 font-medium";
const inputBase = "w-full px-4 py-3.5 text-sm outline-none rounded-md bg-transparent";

function Field({ label, error, children }) {
  return (
    <div>
      <div className={fieldWrap(error)}>
        <label className={floatLabel}>{label}</label>
        {children}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PrimaryBtn({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`w-full mt-8 py-4 rounded-md font-semibold text-white transition ${
        disabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
      }`}>
      {children}
    </button>
  );
}

function BackBtn({ onBack }) {
  return (
    <button onClick={onBack}
      className="hidden lg:flex absolute right-full mr-4 top-1 w-9 h-9 rounded-full border border-gray-300 items-center justify-center text-gray-500 hover:bg-gray-50">
      <ChevronLeft size={18} />
    </button>
  );
}

function StepShell({ title, subtitle, onBack, children }) {
  return (
    <div className="max-w-lg mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400 mt-1 mb-7">{subtitle}</p>}
      <div className="relative">
        {onBack && <BackBtn onBack={onBack} />}
        {children}
      </div>
    </div>
  );
}

/* ════════════════ STEP: Basic Details ════════════════ */
const maritalOptions = ["Single", "Married", "Divorced", "Widowed"];

function StepBasicDetails({ data, patch, onNext, onBack }) {
  const [err, setErr] = useState({});
  const [agreed, setAgreed] = useState(false);
  const f = data;
  const up = (k, v) => { patch({ [k]: v }); setErr((e) => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!f.fullName?.trim() || f.fullName.trim().length < 3) e.fullName = "Enter your full name as on PAN";
    if (!PAN_REGEX.test((f.pan || "").toUpperCase())) e.pan = "Enter a valid PAN (e.g. ABCDE1234F)";
    if (!EMAIL_REGEX.test(f.email || "")) e.email = "Enter a valid email address";
    if (!f.dob) e.dob = "Select your date of birth";
    else {
      const age = (Date.now() - new Date(f.dob)) / (1000 * 60 * 60 * 24 * 365.25);
      if (age < 21) e.dob = "You must be at least 21 years old";
      if (age > 70) e.dob = "Maximum age limit is 70 years";
    }
    if (!f.gender) e.gender = "Select gender";
    if (!f.maritalStatus) e.maritalStatus = "Select marital status";
    if (!f.motherName?.trim() || f.motherName.trim().length < 3) e.motherName = "Enter your mother's name";
    if (!agreed) e.agreed = "Please accept the consent to continue";
    return e;
  };

  const proceed = () => {
    const e = validate();
    if (Object.keys(e).length) { setErr(e); return; }
    patch({ pan: (f.pan || "").toUpperCase() });
    onNext();
  };

  return (
    <StepShell title="Basic Details" subtitle="All fields are mandatory to proceed" onBack={onBack}>
      <div className="space-y-5">
        <Field label="Full Name (as per PAN)" error={err.fullName}>
          <input value={f.fullName || ""} onChange={(e) => up("fullName", e.target.value)} placeholder="Enter your full name" className={inputBase} />
        </Field>
        <Field label="PAN Number" error={err.pan}>
          <input maxLength={10} value={f.pan || ""} onChange={(e) => up("pan", e.target.value.toUpperCase())} placeholder="ABCDE1234F" className={`${inputBase} uppercase`} />
        </Field>
        <Field label="Email Address" error={err.email}>
          <input type="email" value={f.email || ""} onChange={(e) => up("email", e.target.value)} placeholder="you@example.com" className={inputBase} />
        </Field>
        <Field label="Date of Birth" error={err.dob}>
          <input type="date" max={new Date().toISOString().split("T")[0]} value={f.dob || ""} onChange={(e) => up("dob", e.target.value)} className={inputBase} />
        </Field>
        <div>
          <p className="text-xs font-semibold text-gray-600 mb-2">Gender</p>
          <div className="grid grid-cols-3 gap-3">
            {["Male", "Female", "Other"].map((g) => (
              <button key={g} onClick={() => up("gender", g)}
                className={`py-2.5 rounded-lg border text-sm transition ${f.gender === g ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600"}`}>
                {g}
              </button>
            ))}
          </div>
          {err.gender && <p className="text-red-500 text-xs mt-1">{err.gender}</p>}
        </div>
        <Field label="Marital Status" error={err.maritalStatus}>
          <select value={f.maritalStatus || ""} onChange={(e) => up("maritalStatus", e.target.value)} className={`${inputBase} appearance-none`}>
            <option value="">Select marital status</option>
            {maritalOptions.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </Field>
        <Field label="Mother's Name" error={err.motherName}>
          <input value={f.motherName || ""} onChange={(e) => up("motherName", e.target.value)} placeholder="Enter your mother's name" className={inputBase} />
        </Field>

        <label className="flex items-start gap-2 cursor-pointer">
          <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setErr((x) => ({ ...x, agreed: "" })); }} className="mt-0.5 accent-green-600 w-4 h-4 flex-shrink-0" />
          <span className="text-xs text-gray-400 leading-relaxed">
            I authorise Direct Paisa to fetch my credit report &amp; agree to the{" "}
            <span className="text-green-500">Terms of Use</span> &amp; <span className="text-green-500">Privacy Policy</span>
          </span>
        </label>
        {err.agreed && <p className="text-red-500 text-xs">{err.agreed}</p>}
      </div>
      <PrimaryBtn onClick={proceed}>Continue</PrimaryBtn>
    </StepShell>
  );
}

/* ════════════════ Reusable OTP block ════════════════ */
function OtpBoxes({ value, onChange, length = 6 }) {
  const refs = useRef([]);
  const handle = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const next = value.split("");
    next[i] = v;
    const joined = next.join("").slice(0, length);
    onChange(joined);
    if (v && i < length - 1) refs.current[i + 1]?.focus();
  };
  const key = (i, e) => {
    if (e.key === "Backspace" && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  useEffect(() => { refs.current[0]?.focus(); }, []);
  return (
    <div className="flex gap-2.5 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)} type="tel" maxLength={1}
          value={value[i] || ""} onChange={(e) => handle(i, e.target.value)} onKeyDown={(e) => key(i, e)}
          className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none transition ${value[i] ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200"}`} />
      ))}
    </div>
  );
}

function OtpStep({ title, target, onNext, onBack }) {
  const [otp, setOtp] = useState("");
  const [sec, setSec] = useState(30);
  useEffect(() => {
    const t = setInterval(() => setSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const verify = () => { if (otp.length === 6) onNext(); };
  return (
    <StepShell title={title} subtitle={`Enter the 6-digit OTP sent to ${target}`} onBack={onBack}>
      <div className="mt-4">
        <OtpBoxes value={otp} onChange={setOtp} />
        <p className="text-sm text-gray-500 text-center mt-4">
          {sec > 0 ? <>Resend OTP in <span className="font-semibold text-green-600">{sec}s</span></>
            : <button onClick={() => setSec(30)} className="text-green-600 font-semibold hover:underline">Resend OTP</button>}
        </p>
        <p className="text-[11px] text-gray-300 text-center mt-2">Demo: enter any 6 digits to continue</p>
      </div>
      <PrimaryBtn onClick={verify} disabled={otp.length !== 6}>Verify &amp; Continue</PrimaryBtn>
    </StepShell>
  );
}

function StepMobileOtp({ data, onNext, onBack }) {
  return <OtpStep title="Verify Your Number" target={`+91 ${data.phone || data.cibilMobile || "XXXXXXXXXX"}`} onNext={onNext} onBack={onBack} />;
}
function StepEmailOtp({ data, onNext, onBack }) {
  return <OtpStep title="Verify Your Email" target={data.email || "your email"} onNext={onNext} onBack={onBack} />;
}

/* ════════════════ STEP: KYC intro ════════════════ */
function StepKycIntro({ onNext, onBack }) {
  return (
    <StepShell title="KYC Verification" subtitle="A quick, secure step to verify your identity" onBack={onBack}>
      <div className="flex flex-col items-center text-center py-6">
        <div className="w-24 h-24 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
          <ShieldCheck size={44} className="text-green-600" />
        </div>
        <p className="text-gray-600 text-sm max-w-xs leading-relaxed mb-2">
          To process your loan, we need to verify your <strong>Aadhaar</strong> and <strong>PAN</strong>.
        </p>
        <p className="text-xs text-gray-400 max-w-xs">Your documents are encrypted and used only for verification.</p>
      </div>
      <PrimaryBtn onClick={onNext}>Begin KYC</PrimaryBtn>
    </StepShell>
  );
}

/* ════════════════ Reusable upload box ════════════════ */
function UploadBox({ label, file, onFile, onClear }) {
  const inputRef = useRef(null);
  const isImage = file && file.type?.startsWith("image/");
  return (
    <div>
      <p className="text-xs font-semibold text-gray-600 mb-2">{label}</p>
      {!file ? (
        <button onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 rounded-xl py-7 flex flex-col items-center gap-2 text-gray-400 hover:border-green-400 hover:text-green-500 transition">
          <Upload size={22} />
          <span className="text-sm font-medium">Upload / Take Photo</span>
          <span className="text-[11px]">JPG, PNG or PDF · up to 5 MB</span>
        </button>
      ) : (
        <div className="border border-gray-200 rounded-xl p-3 flex items-center gap-3">
          {isImage ? (
            <img src={file.url} alt={label} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
              <FileText size={26} className="text-gray-400" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
            <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle2 size={13} /> Uploaded</p>
          </div>
          <button onClick={onClear} className="text-gray-400 hover:text-red-500 flex-shrink-0"><Trash2 size={18} /></button>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*,application/pdf" className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile({ name: file.name, type: file.type, url: URL.createObjectURL(file) });
        }} />
    </div>
  );
}

/* ════════════════ STEP: Aadhaar upload ════════════════ */
function StepAadhaar({ data, patch, onNext, onBack }) {
  const [err, setErr] = useState({});
  const proceed = () => {
    const e = {};
    if (!AADHAAR_REGEX.test((data.aadhaarNo || "").replace(/\s/g, ""))) e.aadhaarNo = "Enter a valid 12-digit Aadhaar number";
    if (!data.aadhaarFront) e.front = "Upload front of Aadhaar";
    if (!data.aadhaarBack) e.back = "Upload back of Aadhaar";
    if (Object.keys(e).length) { setErr(e); return; }
    onNext();
  };
  const fmtAadhaar = (v) => v.replace(/\D/g, "").slice(0, 12).replace(/(\d{4})(?=\d)/g, "$1 ");
  return (
    <StepShell title="Upload Aadhaar Card" subtitle="Upload clear photos of both sides" onBack={onBack}>
      <div className="space-y-5">
        <Field label="Aadhaar Number" error={err.aadhaarNo}>
          <input inputMode="numeric" value={data.aadhaarNo || ""} onChange={(e) => { patch({ aadhaarNo: fmtAadhaar(e.target.value) }); setErr((x) => ({ ...x, aadhaarNo: "" })); }}
            placeholder="XXXX XXXX XXXX" className={inputBase} />
        </Field>
        <UploadBox label="Front Side" file={data.aadhaarFront} onFile={(file) => { patch({ aadhaarFront: file }); setErr((x) => ({ ...x, front: "" })); }} onClear={() => patch({ aadhaarFront: null })} />
        {err.front && <p className="text-red-500 text-xs">{err.front}</p>}
        <UploadBox label="Back Side" file={data.aadhaarBack} onFile={(file) => { patch({ aadhaarBack: file }); setErr((x) => ({ ...x, back: "" })); }} onClear={() => patch({ aadhaarBack: null })} />
        {err.back && <p className="text-red-500 text-xs">{err.back}</p>}
      </div>
      <PrimaryBtn onClick={proceed}>Continue</PrimaryBtn>
    </StepShell>
  );
}

/* ════════════════ STEP: PAN upload ════════════════ */
function StepPanUpload({ data, patch, onNext, onBack }) {
  const [err, setErr] = useState({});
  const proceed = () => {
    if (!data.panCard) { setErr({ pan: "Upload your PAN card" }); return; }
    onNext();
  };
  return (
    <StepShell title="Upload PAN Card" subtitle="Upload a clear photo of your PAN" onBack={onBack}>
      <div className="space-y-5">
        <Field label="PAN Number">
          <input value={data.pan || ""} disabled className={`${inputBase} bg-gray-50 text-gray-500 uppercase`} />
        </Field>
        <UploadBox label="PAN Card" file={data.panCard} onFile={(file) => { patch({ panCard: file }); setErr({}); }} onClear={() => patch({ panCard: null })} />
        {err.pan && <p className="text-red-500 text-xs">{err.pan}</p>}
      </div>
      <PrimaryBtn onClick={proceed}>Continue</PrimaryBtn>
    </StepShell>
  );
}

/* ════════════════ STEP: Add Co-Applicant ════════════════ */
const relations = ["Spouse", "Father", "Mother", "Son", "Daughter", "Brother", "Sister"];

function StepCoApplicant({ data, patch, onNext, onBack }) {
  const [wants, setWants] = useState(data.hasCoApplicant ?? null);
  const [err, setErr] = useState({});
  const co = data.coApplicant || {};
  const upCo = (k, v) => { patch({ coApplicant: { ...co, [k]: v } }); setErr((e) => ({ ...e, [k]: "" })); };

  const proceed = () => {
    if (wants === false) { patch({ hasCoApplicant: false }); onNext(); return; }
    const e = {};
    if (!co.name?.trim() || co.name.trim().length < 3) e.name = "Enter co-applicant name";
    if (!co.gender) e.gender = "Select gender";
    if (!co.relation) e.relation = "Select relation";
    if (!co.income || Number(co.income) <= 0) e.income = "Enter monthly income";
    if (Object.keys(e).length) { setErr(e); return; }
    patch({ hasCoApplicant: true });
    onNext();
  };

  return (
    <StepShell title="Add Co-Applicant" subtitle="A co-applicant can improve your eligibility" onBack={onBack}>
      <p className="text-sm font-medium text-gray-700 mb-3">Do you want to add a co-applicant?</p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map((o) => (
          <button key={o.l} onClick={() => { setWants(o.v); setErr({}); }}
            className={`py-3 rounded-xl border-2 text-sm font-semibold transition ${wants === o.v ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600"}`}>
            {o.l}
          </button>
        ))}
      </div>

      {wants === true && (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-semibold text-gray-600 mb-2">Co-Applicant Gender</p>
            <div className="grid grid-cols-3 gap-3">
              {["Male", "Female", "Other"].map((g) => (
                <button key={g} onClick={() => upCo("gender", g)}
                  className={`py-2.5 rounded-lg border text-sm transition ${co.gender === g ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600"}`}>
                  {g}
                </button>
              ))}
            </div>
            {err.gender && <p className="text-red-500 text-xs mt-1">{err.gender}</p>}
          </div>
          <Field label="Co-Applicant Name" error={err.name}>
            <input value={co.name || ""} onChange={(e) => upCo("name", e.target.value)} placeholder="Full name" className={inputBase} />
          </Field>
          <Field label="Relation" error={err.relation}>
            <select value={co.relation || ""} onChange={(e) => upCo("relation", e.target.value)} className={`${inputBase} appearance-none`}>
              <option value="">Select relation</option>
              {relations.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </Field>
          <Field label="Co-Applicant Monthly Income" error={err.income}>
            <input inputMode="numeric" value={co.income ? Number(co.income).toLocaleString("en-IN") : ""} onChange={(e) => upCo("income", e.target.value.replace(/\D/g, ""))} placeholder="₹ Monthly income" className={inputBase} />
          </Field>
        </div>
      )}
      <PrimaryBtn onClick={proceed} disabled={wants === null}>Continue</PrimaryBtn>
    </StepShell>
  );
}

/* ════════════════ STEP: Property Details ════════════════ */
const propertyTypes = ["Apartment / Flat", "Independent House", "Villa", "Residential Plot", "Under Construction", "Builder Floor"];

function StepProperty({ data, patch, onNext, onBack }) {
  const [err, setErr] = useState({});
  const p = data.property || {};
  const up = (k, v) => { patch({ property: { ...p, [k]: v } }); setErr((e) => ({ ...e, [k]: "" })); };

  const proceed = () => {
    const e = {};
    if (p.finalised == null) e.finalised = "Please select an option";
    if (!p.type) e.type = "Select property type";
    if (!p.value || Number(p.value) <= 0) e.value = "Enter property value";
    if (!p.address?.trim() || p.address.trim().length < 6) e.address = "Enter complete property address";
    if (Object.keys(e).length) { setErr(e); return; }
    onNext();
  };

  return (
    <StepShell title="Property Details" subtitle="Tell us about the property you're buying" onBack={onBack}>
      <div className="space-y-5">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Have you finalised a property?</p>
          <div className="grid grid-cols-2 gap-3">
            {[{ v: true, l: "Yes" }, { v: false, l: "No" }].map((o) => (
              <button key={o.l} onClick={() => up("finalised", o.v)}
                className={`py-3 rounded-xl border-2 text-sm font-semibold transition ${p.finalised === o.v ? "border-green-600 bg-green-50 text-green-700" : "border-gray-200 text-gray-600"}`}>
                {o.l}
              </button>
            ))}
          </div>
          {err.finalised && <p className="text-red-500 text-xs mt-1">{err.finalised}</p>}
        </div>
        <Field label="Property Type" error={err.type}>
          <select value={p.type || ""} onChange={(e) => up("type", e.target.value)} className={`${inputBase} appearance-none`}>
            <option value="">Select property type</option>
            {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </Field>
        <Field label="Estimated Property Value" error={err.value}>
          <input inputMode="numeric" value={p.value ? Number(p.value).toLocaleString("en-IN") : ""} onChange={(e) => up("value", e.target.value.replace(/\D/g, ""))} placeholder="₹ Property value" className={inputBase} />
        </Field>
        <Field label="Property Address" error={err.address}>
          <textarea rows={3} value={p.address || ""} onChange={(e) => up("address", e.target.value)} placeholder="Flat / House no, street, area, city" className={`${inputBase} resize-none`} />
        </Field>
      </div>
      <PrimaryBtn onClick={proceed}>Submit Application</PrimaryBtn>
    </StepShell>
  );
}

/* ════════════════ STEP: Thank You (final confirmation) ════════════════ */
function StepThankYou({ data, onClose }) {
  // Generate a stable application ID once when this screen mounts.
  const [appId] = useState(() => {
    const d = new Date();
    const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `HL${ymd}${rand}`;
  });
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    try {
      navigator.clipboard?.writeText(appId);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (_) { /* ignore */ }
  };

  return (
    <div className="max-w-lg mx-auto w-full text-center py-6">
      {/* success tick */}
      <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={52} className="text-green-600" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
      <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mb-8">
        Your home loan application has been submitted successfully.
        Our team will review your details and contact you soon.
      </p>

      {/* application id card */}
      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-8">
        <p className="text-xs text-gray-500 mb-1">Your Application ID</p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl font-extrabold tracking-wide text-green-700">{appId}</p>
          <button onClick={copyId} className="text-xs font-medium text-green-600 border border-green-300 rounded-md px-2.5 py-1 hover:bg-green-100 transition">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
        <p className="text-[11px] text-gray-400 mt-3">Please save this ID for future reference.</p>
      </div>

      {/* what's next */}
      <div className="text-left bg-white border border-gray-100 rounded-2xl p-5 mb-8">
        <p className="font-semibold text-gray-800 text-sm mb-3">What happens next?</p>
        <ul className="space-y-2.5 text-sm text-gray-600">
          <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Our loan expert will verify your submitted details.</li>
          <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> You'll get a call on <span className="font-medium">+91 {data.phone || data.cibilMobile || "your number"}</span> within 24 hours.</li>
          <li className="flex items-start gap-2"><CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" /> Keep your documents handy for faster processing.</li>
        </ul>
      </div>

      <button onClick={onClose} className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-md transition">
        Back to Home
      </button>
    </div>
  );
}


/* ═══════════ JOURNEY (flow controller, filter, edit, offers) ═══════════ */

/* ════════════════════════════════════════════════════════════════════
   HOME LOAN JOURNEY — Paisabazaar-style full-page flow
   Steps:  loanAmount(25%) → pincode(50%) → income(75%) → quotes(offers)
   Built to match the uploaded reference screenshots.
═══════════════════════════════════════════════════════════════════════ */

/* ── tiny pincode → city map (demo). Extend or wire to an API later. ── */
const PINCODE_CITY = {
  "201304": "Noida, Delhi-NCR",
  "201301": "Noida, Delhi-NCR",
  "110001": "New Delhi",
  "400001": "Mumbai, Maharashtra",
  "560001": "Bengaluru, Karnataka",
  "600001": "Chennai, Tamil Nadu",
  "700001": "Kolkata, West Bengal",
  "500001": "Hyderabad, Telangana",
  "411001": "Pune, Maharashtra",
  "302001": "Jaipur, Rajasthan",
};

const loanChips = [
  { label: "Up to ₹20 Lacs", value: 2000000 },
  { label: "₹20 – ₹50 Lacs", value: 5000000 },
  { label: "₹50 – ₹75 Lacs", value: 7500000 },
  { label: "Above ₹75 Lacs", value: 10000000 },
];

const incomeChips = [
  { label: "Below ₹3 Lacs", value: 250000 },
  { label: "₹3 – ₹6 Lacs", value: 500000 },
  { label: "₹6 – ₹12 Lacs", value: 1000000 },
  { label: "₹12 – ₹18 Lacs", value: 1600000 },
  { label: "Over ₹18 Lacs", value: 2400000 },
];

/* ════════════════════ Progress bar (top of page) ════════════════════ */
function TopProgress({ percent }) {
  return (
    <div className="w-full h-5 bg-green-100 relative">
      <div
        className="h-full bg-green-600 flex items-center justify-end pr-3 transition-all duration-500"
        style={{ width: `${percent}%` }}
      >
        <span className="text-[11px] font-semibold text-white whitespace-nowrap">{percent}% Complete</span>
      </div>
    </div>
  );
}

/* ════════════════════ Shared step heading ════════════════════ */
function StepHeading({ title }) {
  return (
    <>
      <p className="text-center text-2xl md:text-3xl font-bold text-gray-800">
        Get Your <span className="text-green-600">Dream Home</span> at{" "}
        <span className="text-green-600">Lowest</span> Interest Rates
      </p>
      <p className="text-center text-xl md:text-2xl text-gray-700 mt-1">
        starting from <span className="font-bold">@7.1%</span> ✨
      </p>
      <h2 className="text-center text-2xl font-bold text-gray-900 mt-10 leading-snug whitespace-pre-line">
        {title}
      </h2>
    </>
  );
}

/* helper bubble shown to the right of the input on desktop */
function HintBubble({ children }) {
  return (
    <div className="hidden lg:flex absolute left-full ml-6 top-0 w-64 items-start gap-3 bg-white border border-gray-100 shadow-md rounded-xl p-3.5">
      <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
        <IndianRupee size={16} className="text-green-600" />
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{children}</p>
    </div>
  );
}

/* ════════════════════ STEP: Loan Amount (25%) ════════════════════ */
function StepLoanAmount({ value, setValue, onNext, onBack }) {
  const [err, setErr] = useState("");
  const display = value ? Number(value).toLocaleString("en-IN") : "";

  const proceed = () => {
    if (!value || Number(value) < 100000) { setErr("Enter a valid loan amount (min ₹1,00,000)"); return; }
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <StepHeading title={"How much Loan Amount\nDo you Require?"} />
      <div className="mt-10 relative flex justify-center">
        <button onClick={onBack} className="hidden lg:flex absolute right-full mr-4 top-4 w-9 h-9 rounded-full border border-gray-300 items-center justify-center text-gray-500 hover:bg-gray-50">
          <ChevronLeft size={18} />
        </button>
        <div className="w-full">
          <div className={`relative border rounded-md ${err ? "border-red-400" : "border-green-500"} focus-within:border-green-600`}>
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-green-600 font-medium">Loan Amount{value ? " *" : ""}</label>
            <input
              inputMode="numeric"
              value={display}
              onChange={(e) => { setValue(e.target.value.replace(/\D/g, "")); setErr(""); }}
              placeholder="Loan Amount"
              className="w-full px-4 py-4 text-base outline-none rounded-md bg-transparent"
            />
          </div>
          {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
          <div className="flex flex-wrap gap-3 mt-4">
            {loanChips.map((c) => (
              <button key={c.label} onClick={() => { setValue(String(c.value)); setErr(""); }}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  String(c.value) === value ? "border-green-500 text-green-600" : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}>
                {c.label}
              </button>
            ))}
          </div>
          <button
            onClick={proceed}
            disabled={!value}
            className={`w-full mt-8 py-4 rounded-md font-semibold text-white transition ${
              value ? "bg-green-700 hover:bg-green-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}>
            Proceed
          </button>
        </div>
        <HintBubble>Choose the desired loan amount &amp; we will find the best suitable offers for you</HintBubble>
      </div>
    </div>
  );
}

/* ════════════════════ STEP: Pincode (50%) ════════════════════ */
function StepPincode({ value, setValue, city, setCity, onNext, onBack }) {
  const [err, setErr] = useState("");
  const [showSug, setShowSug] = useState(false);

  const handleChange = (raw) => {
    const v = raw.replace(/\D/g, "").slice(0, 6);
    setValue(v);
    setErr("");
    const c = PINCODE_CITY[v] || (v.length === 6 ? "India" : "");
    setCity(c);
    setShowSug(v.length === 6);
  };

  const proceed = () => {
    if (value.length !== 6) { setErr("Enter a valid 6-digit pincode"); return; }
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <StepHeading title={"Where is Your\nProperty Located?"} />
      <div className="mt-10 relative flex justify-center">
        <button onClick={onBack} className="hidden lg:flex absolute right-full mr-4 top-4 w-9 h-9 rounded-full border border-gray-300 items-center justify-center text-gray-500 hover:bg-gray-50">
          <ChevronLeft size={18} />
        </button>
        <div className="w-full">
          <div className={`relative border rounded-md ${err ? "border-red-400" : value ? "border-green-500" : "border-gray-300"}`}>
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-green-600 font-medium">Property Pincode *</label>
            <input
              inputMode="numeric"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Property Pincode"
              className="w-full px-4 py-4 text-base outline-none rounded-md bg-transparent"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">{value.length}/6</span>
          </div>
          {!err && city && <p className="text-xs text-gray-500 mt-1.5">{city}</p>}
          {!err && !city && <p className="text-xs text-gray-400 mt-1.5">Try to be accurate for right offers</p>}
          {err && <p className="text-red-500 text-xs mt-1">{err}</p>}

          {showSug && city && (
            <button onClick={proceed} className="w-full mt-1 bg-green-600 text-white text-sm text-left px-4 py-3 rounded-md">
              {value}
            </button>
          )}

          {!city && <p className="text-center text-green-500 text-sm mt-4 cursor-pointer hover:underline">Don't know the pincode?</p>}

          <button
            onClick={proceed}
            disabled={value.length !== 6}
            className={`w-full mt-8 py-4 rounded-md font-semibold text-white transition ${
              value.length === 6 ? "bg-green-600 hover:bg-green-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}>
            Proceed
          </button>
        </div>
        <div className="hidden lg:flex absolute left-full ml-6 top-0 w-64 items-start gap-3 bg-white border border-gray-100 shadow-md rounded-xl p-3.5">
          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
            <Building2 size={16} className="text-green-600" />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">This information helps unlock best offers from loan providers for your property</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════ STEP: Annual Income (75%) ════════════════════ */
function StepIncome({ value, setValue, onNext, onBack }) {
  const [err, setErr] = useState("");
  const display = value ? Number(value).toLocaleString("en-IN") : "";

  const proceed = () => {
    if (!value || Number(value) < 100000) { setErr("Enter a valid annual income"); return; }
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <StepHeading title={"What is your\nAnnual Income?"} />
      <div className="mt-10 relative flex justify-center">
        <button onClick={onBack} className="hidden lg:flex absolute right-full mr-4 top-4 w-9 h-9 rounded-full border border-gray-300 items-center justify-center text-gray-500 hover:bg-gray-50">
          <ChevronLeft size={18} />
        </button>
        <div className="w-full">
          <div className={`relative border rounded-md ${err ? "border-red-400" : value ? "border-green-500" : "border-gray-300"}`}>
            <label className="absolute -top-2 left-3 bg-white px-1 text-[11px] text-green-600 font-medium">Annual Income{value ? " *" : ""}</label>
            <input
              inputMode="numeric"
              value={display}
              onChange={(e) => { setValue(e.target.value.replace(/\D/g, "")); setErr(""); }}
              placeholder="Annual Income"
              className="w-full px-4 py-4 text-base outline-none rounded-md bg-transparent"
            />
          </div>
          {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
          <div className="flex flex-wrap gap-3 mt-4">
            {incomeChips.map((c) => (
              <button key={c.label} onClick={() => { setValue(String(c.value)); setErr(""); }}
                className={`px-4 py-2 rounded-full border text-sm transition ${
                  String(c.value) === value ? "border-green-500 text-green-600" : "border-gray-300 text-gray-500 hover:border-gray-400"
                }`}>
                {c.label}
              </button>
            ))}
          </div>
          <button
            onClick={proceed}
            disabled={!value}
            className={`w-full mt-8 py-4 rounded-md font-semibold text-white transition ${
              value ? "bg-green-700 hover:bg-green-800" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}>
            Get Offers
          </button>
          <p className="text-center text-green-600 text-sm mt-4">Yay! You are eligible for loan offers from top banks 🎉</p>
        </div>
        <HintBubble>This information is crucial to calculate the maximum loan you might get</HintBubble>
      </div>
    </div>
  );
}

/* ════════════════════ MAIN CONTROLLER ════════════════════ */

/* Ordered journey. "quotes" is the terminal offers page (no progress bar). */
const SEQUENCE = [
  { id: "amount",      nextUp: "Property Pincode" },
  { id: "pincode",     nextUp: "Income Details" },
  { id: "income",      nextUp: "Verify Mobile" },
  { id: "mobileOtp",   nextUp: "Verify Email" },
  { id: "emailOtp",    nextUp: "Basic Details" },
  { id: "basic",       nextUp: "KYC Verification" },
  { id: "kyc",         nextUp: "Aadhaar Upload" },
  { id: "aadhaar",     nextUp: "PAN Upload" },
  { id: "pan",         nextUp: "Co-Applicant" },
  { id: "coApplicant", nextUp: "Property Details" },
  { id: "property",    nextUp: "Submit" },
  { id: "thankyou",    nextUp: "" },
];

function HomeLoanFlow({ onClose, initialMobile = "" }) {
  const [idx, setIdx] = useState(0);
  const [flowState, setFlowState] = useState({
    loanAmount: "", pincode: "", city: "", income: "", tenure: "20 yrs",
    phone: initialMobile, cibilMobile: initialMobile,
    fullName: "", pan: "", email: "", dob: "", gender: "", maritalStatus: "", motherName: "",
    aadhaarNo: "", aadhaarFront: null, aadhaarBack: null, panCard: null,
    hasCoApplicant: null, coApplicant: {}, property: {},
  });

  const set = (key) => (val) => setFlowState((s) => ({ ...s, [key]: val }));
  const patch = (obj) => setFlowState((s) => ({ ...s, ...obj }));

  const current = SEQUENCE[idx];
  const next = () => setIdx((i) => Math.min(SEQUENCE.length - 1, i + 1));
  const back = () => { if (idx === 0) { onClose(); return; } setIdx((i) => i - 1); };

  const isThankyou = current.id === "thankyou";
  // progress %: spread across the steps before the final screen
  const stepCount = SEQUENCE.length - 1; // exclude thankyou
  const percent = Math.round(((idx + 1) / stepCount) * 100);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b">
        {/* left: back */}
        <div className="flex-1">
          {!isThankyou && (
            <button onClick={back} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm">
              <ArrowLeft size={18} /> {idx === 0 ? "Back" : "Back"}
            </button>
          )}
          {isThankyou && (
            <button onClick={onClose} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 text-sm">
              <ArrowLeft size={18} /> Back to Home Loan
            </button>
          )}
        </div>

        {/* center: company logo + name */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src="/logo.png" alt="Direct Credit" className="h-9 md:h-11 object-contain" />
          <span className="text-lg md:text-xl font-extrabold text-green-700 tracking-tight hidden sm:inline">
            Direct Credit
          </span>
        </div>

        {/* right: next up */}
        <div className="flex-1 flex justify-end">
          {!isThankyou && current.nextUp && (
            <span className="text-sm text-gray-400">Next up: <span className="text-gray-600 font-medium">{current.nextUp}</span></span>
          )}
        </div>
      </div>

      {!isThankyou && <TopProgress percent={percent} />}

      <div className="flex-1 px-4 md:px-8 py-12">
        {current.id === "amount" && (
          <StepLoanAmount value={flowState.loanAmount} setValue={set("loanAmount")} onNext={next} onBack={back} />
        )}
        {current.id === "pincode" && (
          <StepPincode value={flowState.pincode} setValue={set("pincode")} city={flowState.city} setCity={set("city")}
            onNext={next} onBack={back} />
        )}
        {current.id === "income" && (
          <StepIncome value={flowState.income} setValue={set("income")} onNext={next} onBack={back} />
        )}
        {current.id === "basic" && (
          <StepBasicDetails data={flowState} patch={patch} onNext={next} onBack={back} />
        )}
        {current.id === "mobileOtp" && (
          <StepMobileOtp data={flowState} onNext={next} onBack={back} />
        )}
        {current.id === "emailOtp" && (
          <StepEmailOtp data={flowState} onNext={next} onBack={back} />
        )}
        {current.id === "kyc" && (
          <StepKycIntro onNext={next} onBack={back} />
        )}
        {current.id === "aadhaar" && (
          <StepAadhaar data={flowState} patch={patch} onNext={next} onBack={back} />
        )}
        {current.id === "pan" && (
          <StepPanUpload data={flowState} patch={patch} onNext={next} onBack={back} />
        )}
        {current.id === "coApplicant" && (
          <StepCoApplicant data={flowState} patch={patch} onNext={next} onBack={back} />
        )}
        {current.id === "property" && (
          <StepProperty data={flowState} patch={patch} onNext={next} onBack={back} />
        )}
        {current.id === "thankyou" && (
          <StepThankYou data={flowState} onClose={onClose} />
        )}
      </div>
    </div>
  );
}


/* ═══════════ LANDING PAGE (default export) — green theme + number entry ═══════════ */

const features = ["Loan amount: ₹10 Lakh – ₹5 Crore", "Interest rate from 8.50% p.a.", "Tenure upto 30 years", "Balance transfer facility", "Top-up loan available", "Tax benefit under 80C & 24B"];
const eligibility = ["Age: 21 – 65 years", "Salaried or self-employed", "Stable income proof", "CIBIL score 700+", "Property should be legally clear"];
const documentsList = ["PAN & Aadhaar Card", "Income proof / ITR 3 years", "Bank statement 12 months", "Property documents", "Sale agreement"];

export default function HomeLoan() {
  const [mobile, setMobile] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [err, setErr] = useState("");
  const [showFlow, setShowFlow] = useState(false);
  const formRef = useRef(null);

  const proceed = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) { setErr("Enter a valid 10-digit mobile number"); return; }
    if (!agreed) { setErr("Please accept the terms to continue"); return; }
    setErr("");
    setShowFlow(true);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    formRef.current?.querySelector("input")?.focus();
  };

  if (showFlow) return <HomeLoanFlow onClose={() => setShowFlow(false)} initialMobile={mobile} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          {/* left copy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Home size={24} /></div>
              <span className="text-green-200 font-medium">Loans → Home Loan</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Home Loan</h1>
            <p className="text-green-100 text-lg max-w-xl mb-8">
              Buy your dream home with best interest rates from top banks and NBFCs. Tenure upto 30 years.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={scrollToForm} className="bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2">
                Apply Now <ArrowRight size={18} />
              </button>
              <button className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
                <Phone size={16} /> Talk to Expert
              </button>
            </div>
          </div>

          {/* right number-entry card */}
          <div ref={formRef} className="bg-white rounded-2xl shadow-2xl p-7 text-gray-800">
            <h2 className="text-xl font-extrabold text-green-700 leading-snug">Unlock Best Home Loan Offers</h2>
            <div className="w-28 h-0.5 bg-green-500 mt-1 mb-5" />
            <ul className="space-y-3 mb-6">
              {["Compare Offers from 30+ Lenders", "Best Interest Rate from 7.1%", "Loan Tenure up to 30 Years"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-green-500" /> {t}
                </li>
              ))}
            </ul>

            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
            <div className={`flex items-center border rounded-xl px-3 ${err ? "border-red-400" : "border-gray-300 focus-within:border-green-500"}`}>
              <span className="text-sm text-gray-500 pr-2 border-r mr-2">🇮🇳 +91</span>
              <input
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "").slice(0, 10)); setErr(""); }}
                placeholder="Enter mobile number"
                className="flex-1 py-3 text-sm outline-none bg-transparent"
              />
            </div>
            {err && <p className="text-red-500 text-xs mt-1">{err}</p>}
            <p className="text-xs text-gray-400 mt-1.5">We will check offers against your number</p>

            <button onClick={proceed} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl mt-5 flex items-center justify-center gap-2">
              Proceed <ArrowRight size={17} />
            </button>

            <label className="flex items-start gap-2 mt-3 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); setErr(""); }} className="mt-0.5 accent-green-600 w-4 h-4" />
              <span className="text-[11px] text-gray-400 leading-relaxed">
                By clicking on proceed, you agree to the <span className="text-green-600">Terms of Use</span> &amp; <span className="text-green-600">Privacy Policy</span>
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {[{ label: "Max Loan", value: "₹5 Crore" }, { label: "Interest From", value: "8.50%*" }, { label: "Max Tenure", value: "30 Years" }, { label: "Tax Benefit", value: "80C+24B" }].map((s) => (
            <div key={s.label} className="py-6 px-8 text-center">
              <div className="text-2xl font-bold text-green-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES / ELIGIBILITY / DOCUMENTS ── */}
      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-5">Key Features</h2>
          <ul className="space-y-3">{features.map((f) => <li key={f} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-green-500 mt-0.5 flex-shrink-0" />{f}</li>)}</ul>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-5">Eligibility</h2>
          <ul className="space-y-3">{eligibility.map((e) => <li key={e} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-green-600 mt-0.5 flex-shrink-0" />{e}</li>)}</ul>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-5">Documents Required</h2>
          <ul className="space-y-3">{documentsList.map((d) => <li key={d} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-green-700 mt-0.5 flex-shrink-0" />{d}</li>)}</ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Apna ghar, apna sapna!</h2>
          <p className="text-green-100 mb-6">Compare rates from 30+ banks and get the best deal</p>
          <button onClick={scrollToForm} className="bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">
            Apply for Home Loan
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}