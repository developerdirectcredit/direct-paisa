


// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// import { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Landmark,
//   Clock3,
//   BadgeCheck,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   Pencil,
//   ShieldCheck,
//   XCircle,
//   Plus,
//   Trash2,
// } from "lucide-react";

// /* ------------------------------------------------------------------ */
// /*  Project Loan — full flow                                          */
// /*  Hero (login) → Eligibility → e-KYC → CIBIL → Accumn → Financial   */
// /*  Docs → Project Details → Collateral & Title → Permissions →       */
// /*  Review → Bank offers → toast.                                     */
// /* ------------------------------------------------------------------ */

// const APPLICANT_TYPES = [
//   "Individual",
//   "Proprietor",
//   "Partnership",
//   "Pvt Ltd",
//   "LLP",
//   "Company",
// ];
// const SECTORS = [
//   "Construction",
//   "Manufacturing",
//   "Renewable",
//   "Healthcare",
//   "Education",
//   "Agribusiness",
//   "Other",
// ];
// const COLLATERAL_TYPES = ["Land", "Building", "Hypothecation", "Other"];
// const KYC_METHODS = ["Verify via DigiLocker", "Upload manually"];

// // CIBIL threshold below which the journey ends with a rejection.
// const CIBIL_THRESHOLD = 700;

// // Dummy bank offers shown after eligibility is met (demo data).
// const BANK_OFFERS = [
//   { name: "Instamoney", maxAmount: "₹1.0L", roi: "22% p.a", apr: "23.77%", emi: "₹7,638 p.m.", fees: "2-5%", bestSuited: true },
//   { name: "HDFC Bank", maxAmount: "₹5Cr", roi: "10.5% p.a", apr: "11.20%", emi: "—", fees: "1-3%", bestSuited: false },
//   { name: "ICICI Bank", maxAmount: "₹3Cr", roi: "11.0% p.a", apr: "11.85%", emi: "—", fees: "1.5-3%", bestSuited: false },
//   { name: "Axis Bank", maxAmount: "₹2Cr", roi: "12.5% p.a", apr: "13.40%", emi: "—", fees: "2-4%", bestSuited: false },
//   { name: "SBI", maxAmount: "₹10Cr", roi: "9.8% p.a", apr: "10.50%", emi: "—", fees: "1-2.5%", bestSuited: false },
// ];

// const STEP_LABELS = [
//   "Eligibility",
//   "e-KYC",
//   "CIBIL",
//   "Bank Fetch",
//   "Financial Docs",
//   "Project Details",
//   "Collateral",
//   "Permissions",
//   "Review",
// ];

// const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
// const MOBILE_RE = /^[6-9]\d{9}$/;
// const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
// const AADHAAR_RE = /^\d{12}$/;

// const initialForm = {
//   // B — eligibility
//   applicantType: "",
//   sector: "",
//   sectorOther: "",
//   projectCost: "",
//   preferredLoanAmount: "",
//   collateralType: "",
//   collateralValue: "",
//   collateralPicInternal: "",
//   collateralPicExternal: "",
//   background: "", // up to ~1000 words
//   // questionnaire (if no project report)
//   hasProjectReport: "", // "Yes" | "No"
//   qFamilyBackground: "",
//   qNetWorth: "",
//   qJobPackage: "",
//   qExistingProfile: "",
//   qAboutProject: "",
//   // projections
//   vendorsList: "",
//   paymentDays: "",
//   turnoverY1: "",
//   turnoverY2: "",
//   turnoverY3: "",
//   // political
//   politicalBackground: "", // "Yes" | "No"
//   politicalDetail: "",
//   // C — e-KYC
//   kycMethod: "",
//   pan: "",
//   aadhaar: "",
//   panFile: "",
//   aadhaarFile: "",
//   // D — CIBIL
//   cibilConsent: false,
//   // E — Accumn
//   accumnConsent: "", // "Yes" | "No"
//   // F — financial documents
//   docGstReturns: "",
//   docPracticeReceipts: "",
//   docBankStatement12: "",
//   // G — project details
//   projectTitle: "",
//   projectDescription: "",
//   projectStart: "",
//   projectEnd: "",
//   costLand: "",
//   costCivil: "",
//   costPlant: "",
//   costWorkingCapital: "",
//   costContingency: "",
//   fundingDebt: "",
//   fundingEquity: "",
//   projRevenueY1: "",
//   projRevenueY2: "",
//   projRevenueY3: "",
//   milestones: "",
//   offtakeAgreements: "",
//   docCaProjections: "",
//   // H — collateral & title
//   securityType: "",
//   ownerName: "",
//   marketValue: "",
//   encumbranceStatus: "",
//   docTitleDeed: "",
//   docEncumbranceCert: "",
//   docPropertyTax: "",
//   docValuationReport: "",
//   docNoc: "",
//   docLandUseCert: "",
//   docLeaseAgreement: "",
//   // I — permissions & licenses
//   docBuildingPlan: "",
//   docEnvClearance: "",
//   docPowerApproval: "",
//   docTradeLicense: "",
//   docConcessionAgreement: "",
//   docGovtApprovals: "",
// };

// /* ------------------------------------------------------------------ */
// /*  Helpers                                                            */
// /* ------------------------------------------------------------------ */

// function usesAccumn(form) {
//   return form.accumnConsent === "Yes";
// }
// function usesManualKyc(form) {
//   return form.kycMethod === "Upload manually";
// }
// function wordCount(text) {
//   return text.trim() ? text.trim().split(/\s+/).length : 0;
// }

// /* ------------------------------------------------------------------ */
// /*  Validation per step                                                */
// /* ------------------------------------------------------------------ */

// function validateStep(step, form) {
//   const e = {};

//   if (step === 1) {
//     if (!form.applicantType) e.applicantType = "Select applicant type.";
//     if (!form.sector) e.sector = "Select a sector.";
//     if (form.sector === "Other" && !form.sectorOther.trim())
//       e.sectorOther = "Please specify the sector.";
//     if (!form.projectCost.trim()) e.projectCost = "Estimated project cost is required.";
//     else if (!/^\d+$/.test(form.projectCost))
//       e.projectCost = "Enter a valid amount in numbers.";
//     if (!form.preferredLoanAmount.trim())
//       e.preferredLoanAmount = "Preferred loan amount is required.";
//     else if (!/^\d+$/.test(form.preferredLoanAmount))
//       e.preferredLoanAmount = "Enter a valid amount in numbers.";
//     if (!form.collateralType) e.collateralType = "Select collateral type.";
//     if (!form.collateralValue.trim())
//       e.collateralValue = "Collateral value is required.";
//     else if (!/^\d+$/.test(form.collateralValue))
//       e.collateralValue = "Enter a valid amount in numbers.";
//     if (!form.collateralPicInternal)
//       e.collateralPicInternal = "Upload internal picture.";
//     if (!form.collateralPicExternal)
//       e.collateralPicExternal = "Upload external picture.";
//     if (!form.background.trim()) e.background = "Please describe your background.";
//     else if (wordCount(form.background) > 1000)
//       e.background = "Please keep it within 1000 words.";
//     if (!form.hasProjectReport)
//       e.hasProjectReport = "Do you have a project report?";
//     if (form.hasProjectReport === "No") {
//       if (!form.qFamilyBackground.trim())
//         e.qFamilyBackground = "Family background is required.";
//       if (!form.qNetWorth.trim()) e.qNetWorth = "Net worth is required.";
//       if (!form.qAboutProject.trim())
//         e.qAboutProject = "About the project is required.";
//     }
//     if (!form.turnoverY1.trim()) e.turnoverY1 = "Year 1 turnover is required.";
//     else if (!/^\d+$/.test(form.turnoverY1))
//       e.turnoverY1 = "Enter a valid amount.";
//     if (!form.turnoverY2.trim()) e.turnoverY2 = "Year 2 turnover is required.";
//     else if (!/^\d+$/.test(form.turnoverY2))
//       e.turnoverY2 = "Enter a valid amount.";
//     if (!form.turnoverY3.trim()) e.turnoverY3 = "Year 3 turnover is required.";
//     else if (!/^\d+$/.test(form.turnoverY3))
//       e.turnoverY3 = "Enter a valid amount.";
//     if (!form.politicalBackground)
//       e.politicalBackground = "Please answer the political background question.";
//     if (form.politicalBackground === "Yes" && !form.politicalDetail.trim())
//       e.politicalDetail = "Please provide details.";
//   }

//   if (step === 2) {
//     if (!form.kycMethod) e.kycMethod = "Select a KYC method.";
//     if (!form.pan.trim()) e.pan = "PAN is required.";
//     else if (!PAN_RE.test(form.pan.trim().toUpperCase()))
//       e.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
//     if (!form.aadhaar.trim()) e.aadhaar = "Aadhaar number is required.";
//     else if (!AADHAAR_RE.test(form.aadhaar))
//       e.aadhaar = "Enter a valid 12-digit Aadhaar number.";
//     if (usesManualKyc(form)) {
//       if (!form.panFile) e.panFile = "Upload PAN card.";
//       if (!form.aadhaarFile) e.aadhaarFile = "Upload Aadhaar card.";
//     }
//   }

//   if (step === 3) {
//     if (!form.cibilConsent)
//       e.cibilConsent = "Consent is required to fetch your CIBIL score.";
//   }

//   if (step === 4) {
//     if (!form.accumnConsent)
//       e.accumnConsent = "Please choose whether to fetch via Accumn.";
//   }

//   if (step === 5) {
//     if (!usesAccumn(form)) {
//       if (!form.docPracticeReceipts)
//         e.docPracticeReceipts = "Practice receipts are required.";
//       if (!form.docBankStatement12)
//         e.docBankStatement12 = "Bank statement (12 months) is required.";
//     }
//   }

//   if (step === 6) {
//     if (!form.projectTitle.trim()) e.projectTitle = "Project title is required.";
//     if (!form.projectDescription.trim())
//       e.projectDescription = "Short description is required.";
//     if (!form.projectStart) e.projectStart = "Start date is required.";
//     if (!form.projectEnd) e.projectEnd = "End date is required.";
//     else if (form.projectStart && new Date(form.projectEnd) <= new Date(form.projectStart))
//       e.projectEnd = "End date must be after the start date.";
//     if (!form.fundingDebt.trim()) e.fundingDebt = "Debt portion is required.";
//     else if (!/^\d+$/.test(form.fundingDebt))
//       e.fundingDebt = "Enter a valid amount.";
//     if (!form.fundingEquity.trim()) e.fundingEquity = "Equity portion is required.";
//     else if (!/^\d+$/.test(form.fundingEquity))
//       e.fundingEquity = "Enter a valid amount.";
//     if (!form.milestones.trim()) e.milestones = "Key milestones are required.";
//   }

//   if (step === 7) {
//     if (!form.securityType) e.securityType = "Select the type of security.";
//     if (!form.ownerName.trim()) e.ownerName = "Owner name is required.";
//     if (!form.marketValue.trim()) e.marketValue = "Estimated market value is required.";
//     else if (!/^\d+$/.test(form.marketValue))
//       e.marketValue = "Enter a valid amount.";
//     if (!form.encumbranceStatus.trim())
//       e.encumbranceStatus = "Encumbrance status is required.";
//     if (!form.docTitleDeed) e.docTitleDeed = "Title deed / sale deed is required.";
//     if (!form.docEncumbranceCert)
//       e.docEncumbranceCert = "Encumbrance certificate is required.";
//   }

//   if (step === 8) {
//     if (!form.docBuildingPlan)
//       e.docBuildingPlan = "Building plan approval is required.";
//     if (!form.docTradeLicense)
//       e.docTradeLicense = "Trade / factory license is required.";
//   }

//   return e;
// }

// /* Simulated CIBIL fetch (consistent demo score from PAN).               */
// function fetchCibilScore(pan) {
//   let sum = 0;
//   for (const ch of pan.toUpperCase()) sum += ch.charCodeAt(0);
//   return 600 + (sum % 250); // range 600–849
// }

// export default function ProjectLoanFull() {
//   const [started, setStarted] = useState(false);
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [showOffers, setShowOffers] = useState(false);
//   const [rejected, setRejected] = useState(false);
//   const [cibilScore, setCibilScore] = useState(null);

//   const set = (key) => (e) => {
//     const value = e.target?.value ?? e;
//     setForm((f) => ({ ...f, [key]: value }));
//     setErrors((p) => ({ ...p, [key]: undefined }));
//   };

//   const setChoice = (key) => (value) => {
//     setForm((f) => ({ ...f, [key]: value }));
//     setErrors((p) => ({ ...p, [key]: undefined }));
//   };

//   const setFile = (key) => (e) => {
//     const fname = e.target.files?.[0]?.name || "";
//     setForm((f) => ({ ...f, [key]: fname }));
//     setErrors((p) => ({ ...p, [key]: undefined }));
//   };

//   const next = () => {
//     const e = validateStep(step, form);
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }
//     setErrors({});

//     // After CIBIL consent (step 3): fetch score and gate the journey.
//     if (step === 3) {
//       const score = fetchCibilScore(form.pan);
//       setCibilScore(score);
//       if (score < CIBIL_THRESHOLD) {
//         setRejected(true);
//         return;
//       }
//       setStep(4); // Accumn consent
//       return;
//     }

//     // After Accumn consent (step 4): Yes → skip financial docs (5) → project details (6).
//     if (step === 4) {
//       setStep(usesAccumn(form) ? 6 : 5);
//       return;
//     }

//     setStep((s) => Math.min(s + 1, 9));
//   };

//   const back = () => {
//     setErrors({});
//     setStep((s) => {
//       if (s === 6 && usesAccumn(form)) return 4; // project details → accumn
//       return Math.max(s - 1, 1);
//     });
//   };

//   const goToStep = (target) => {
//     setErrors({});
//     setStep(target);
//   };

//   const submit = () => {
//     const stepsToCheck = [1, 2, 3, 4];
//     if (!usesAccumn(form)) stepsToCheck.push(5);
//     stepsToCheck.push(6, 7, 8);
//     for (const s of stepsToCheck) {
//       const e = validateStep(s, form);
//       if (Object.keys(e).length) {
//         setErrors(e);
//         setStep(s);
//         return;
//       }
//     }
//     setErrors({});
//     setShowOffers(true);
//   };

//   const applyToBank = (bankName) => {
//     toast.success(`Application submitted to ${bankName}!`, { duration: 4000 });
//     setShowOffers(false);
//     setSubmitted(true);
//   };

//   const reset = () => {
//     setForm(initialForm);
//     setErrors({});
//     setStep(1);
//     setSubmitted(false);
//     setShowOffers(false);
//     setRejected(false);
//     setCibilScore(null);
//     setStarted(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <Toaster position="top-center" />
//       <div className="min-h-screen bg-slate-50 text-slate-900">
//         {!started ? (
//           <Hero onStart={() => setStarted(true)} />
//         ) : rejected ? (
//           <Rejected score={cibilScore} onReset={reset} />
//         ) : submitted ? (
//           <Success onReset={reset} />
//         ) : showOffers ? (
//           <BankOffers onApply={applyToBank} onBack={() => setShowOffers(false)} />
//         ) : (
//           <Wizard
//             step={step}
//             form={form}
//             errors={errors}
//             set={set}
//             setChoice={setChoice}
//             setFile={setFile}
//             next={next}
//             back={back}
//             goToStep={goToStep}
//             onSubmit={submit}
//           />
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  HERO (login) — Step image                                          */
// /* ------------------------------------------------------------------ */

// function Hero({ onStart }) {
//   const [name, setName] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [agree, setAgree] = useState(true);
//   const [err, setErr] = useState({});

//   const handleStart = () => {
//     const e = {};
//     if (!name.trim()) e.name = "Please enter your full name.";
//     else if (!NAME_RE.test(name.trim()))
//       e.name = "Name can contain letters and spaces only.";
//     if (!mobile) e.mobile = "Please enter your mobile number.";
//     else if (!MOBILE_RE.test(mobile))
//       e.mobile = "Enter a valid 10-digit mobile number.";
//     if (!agree) e.agree = "Please accept the terms to continue.";
//     if (Object.keys(e).length) {
//       setErr(e);
//       return;
//     }
//     setErr({});
//     onStart();
//   };

//   return (
//     <section className="bg-gradient-to-b from-blue-50 to-white">
//       <div className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
//         <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
//           <div>
//             <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
//               <span className="text-blue-600">Project Loans</span> for Every Sector
//             </h1>
//             <p className="mt-4 max-w-xl text-slate-600">
//               End-to-end project financing for construction, manufacturing,
//               renewable, healthcare, education and more — from eligibility to
//               sanction, with expert support at every step.
//             </p>

//             <div className="mt-6 overflow-hidden rounded-2xl">
//               <img
//                 src="/project-loan.jpg"
//                 alt="Project Loan"
//                 className="h-56 w-full object-cover"
//               />
//             </div>

//             <ul className="mt-8 space-y-5">
//               <Feature icon={<Landmark className="h-5 w-5" />} title="For Every Sector" text="Construction, manufacturing, renewable, healthcare, education & more." />
//               <Feature icon={<Clock3 className="h-5 w-5" />} title="Quick & Hassle Free" text="Secure Accumn auto-fetch or simple manual upload — your choice." />
//               <Feature icon={<BadgeCheck className="h-5 w-5" />} title="Trusted by Thousands" text="Backed by 15+ leading banks and a dedicated support team." />
//             </ul>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
//             <div className="rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-800">
//               Apply for a Project Loan — it only takes a minute to start.
//             </div>

//             <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
//               Project Loan
//             </p>
//             <p className="mt-1 text-center text-2xl font-bold">
//               Fund your <span className="text-blue-600">project</span>
//             </p>

//             <div className="mt-6 space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
//                 <input
//                   value={name}
//                   onChange={(e) => {
//                     setName(e.target.value.replace(/[^A-Za-z\s]/g, ""));
//                     setErr((p) => ({ ...p, name: undefined }));
//                   }}
//                   placeholder="Full Name (as on your PAN)"
//                   className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${err.name ? "border-red-400" : "border-slate-300"}`}
//                 />
//                 {err.name && <ErrorText>{err.name}</ErrorText>}
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
//                 <div className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${err.mobile ? "border-red-400" : "border-slate-300"}`}>
//                   <span className="shrink-0 border-r border-slate-200 pr-2 text-slate-700">🇮🇳 +91</span>
//                   <input
//                     type="tel"
//                     value={mobile}
//                     onChange={(e) => {
//                       setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
//                       setErr((p) => ({ ...p, mobile: undefined }));
//                     }}
//                     placeholder="10-digit mobile number"
//                     className="w-full bg-transparent outline-none"
//                     inputMode="numeric"
//                     maxLength={10}
//                   />
//                 </div>
//                 {err.mobile && <ErrorText>{err.mobile}</ErrorText>}
//               </div>

//               <button
//                 onClick={handleStart}
//                 className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
//               >
//                 Apply Project Loan <ArrowRight className="h-4 w-4" />
//               </button>

//               <label className="flex items-start gap-2 text-xs text-slate-500">
//                 <input
//                   type="checkbox"
//                   checked={agree}
//                   onChange={(e) => {
//                     setAgree(e.target.checked);
//                     setErr((p) => ({ ...p, agree: undefined }));
//                   }}
//                   className="mt-0.5"
//                 />
//                 <span>By submitting this form, you agree to the Credit Report Terms of Use, Terms of Use &amp; Privacy Policy.</span>
//               </label>
//               {err.agree && <ErrorText>{err.agree}</ErrorText>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Feature({ icon, title, text }) {
//   return (
//     <li className="flex gap-3">
//       <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">{icon}</span>
//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-sm text-slate-500">{text}</p>
//       </div>
//     </li>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  WIZARD                                                             */
// /* ------------------------------------------------------------------ */

// function Wizard({ step, form, errors, set, setChoice, setFile, next, back, goToStep, onSubmit }) {
//   const isReview = step === 9;
//   const lastBeforeReview = 8;
//   return (
//     <section className="mx-auto max-w-3xl px-5 py-10">
//       <Stepper step={step} form={form} />

//       <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
//         {step === 1 && <StepEligibility form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
//         {step === 2 && <StepKyc form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
//         {step === 3 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
//         {step === 4 && <StepAccumn form={form} setChoice={setChoice} errors={errors} />}
//         {step === 5 && <StepFinancialDocs form={form} setFile={setFile} errors={errors} />}
//         {step === 6 && <StepProjectDetails form={form} set={set} setFile={setFile} errors={errors} />}
//         {step === 7 && <StepCollateral form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
//         {step === 8 && <StepPermissions form={form} setFile={setFile} errors={errors} />}
//         {step === 9 && <StepReview form={form} goToStep={goToStep} />}

//         <div className="mt-8 flex items-center justify-between">
//           <button
//             onClick={back}
//             disabled={step === 1}
//             className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-40"
//           >
//             <ArrowLeft className="h-4 w-4" /> Back
//           </button>

//           {!isReview ? (
//             <button
//               onClick={next}
//               className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//             >
//               {step === lastBeforeReview ? "Review details" : step === 3 ? "Check CIBIL & continue" : "Continue"}{" "}
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           ) : (
//             <button
//               onClick={onSubmit}
//               className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//             >
//               Bank Apply <Check className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Stepper({ step, form }) {
//   let visible = [1, 2, 3, 4];
//   if (!usesAccumn(form)) visible.push(5);
//   visible.push(6, 7, 8, 9);

//   return (
//     <div className="flex items-center justify-between overflow-x-auto">
//       {visible.map((n, idx) => {
//         const label = STEP_LABELS[n - 1];
//         const active = n === step;
//         const done = visible.indexOf(step) > idx;
//         return (
//           <div key={label} className="flex flex-1 items-center">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
//                   done ? "bg-blue-600 text-white" : active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-500"
//                 }`}
//               >
//                 {done ? <Check className="h-4 w-4" /> : idx + 1}
//               </div>
//               <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">{label}</span>
//             </div>
//             {idx < visible.length - 1 && (
//               <div className={`mx-1 h-0.5 flex-1 ${done ? "bg-blue-600" : "bg-slate-200"}`} />
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ---------- Field primitives ---------- */

// function ErrorText({ children }) {
//   return <p className="mt-1 text-xs text-red-500">{children}</p>;
// }

// function Field({ label, children, hint, error }) {
//   return (
//     <label className="block">
//       <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
//       {children}
//       {error ? <ErrorText>{error}</ErrorText> : hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
//     </label>
//   );
// }

// function Text({ value, onChange, error, ...rest }) {
//   return (
//     <input
//       value={value}
//       onChange={onChange}
//       className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}
//       {...rest}
//     />
//   );
// }

// function TextArea({ value, onChange, error, rows = 3, ...rest }) {
//   return (
//     <textarea
//       value={value}
//       onChange={onChange}
//       rows={rows}
//       className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}
//       {...rest}
//     />
//   );
// }

// function Select({ value, onChange, options, placeholder, error }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((o) => (
//         <option key={o} value={o}>{o}</option>
//       ))}
//     </select>
//   );
// }

// function Pills({ value, onSelect, options }) {
//   return (
//     <div className="flex flex-wrap gap-2">
//       {options.map((o) => (
//         <button
//           key={o}
//           type="button"
//           onClick={() => onSelect(o)}
//           className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
//             value === o ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 text-slate-600 hover:border-slate-400"
//           }`}
//         >
//           {o}
//         </button>
//       ))}
//     </div>
//   );
// }

// function FileRow({ label, required, name, onChange, error }) {
//   return (
//     <div>
//       <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${error ? "border-red-400" : "border-slate-200"}`}>
//         <div>
//           <p className="text-sm font-medium text-slate-700">{label} {required && <span className="text-red-500">*</span>}</p>
//           {name ? <p className="text-xs text-blue-600">{name}</p> : <p className="text-xs text-slate-400">PDF, JPG or PNG</p>}
//         </div>
//         <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
//           Upload
//           <input type="file" className="hidden" onChange={onChange} />
//         </label>
//       </div>
//       {error && <ErrorText>{error}</ErrorText>}
//     </div>
//   );
// }

// const onlyDigits = (setter) => (e) => setter({ target: { value: e.target.value.replace(/\D/g, "") } });

// /* ---------- Step 1: Eligibility ---------- */

// function StepEligibility({ form, set, setChoice, setFile, errors }) {
//   const words = wordCount(form.background);
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Quick eligibility</h2>

//       <Field label="Applicant type" error={errors.applicantType}>
//         <Pills value={form.applicantType} onSelect={setChoice("applicantType")} options={APPLICANT_TYPES} />
//       </Field>

//       <Field label="Sector" error={errors.sector}>
//         <Pills value={form.sector} onSelect={setChoice("sector")} options={SECTORS} />
//       </Field>
//       {form.sector === "Other" && (
//         <Field label="Please specify sector" error={errors.sectorOther}>
//           <Text value={form.sectorOther} onChange={set("sectorOther")} placeholder="Specify sector" error={errors.sectorOther} />
//         </Field>
//       )}

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field label="Estimated project cost (₹)" error={errors.projectCost}>
//           <Text value={form.projectCost} onChange={onlyDigits(set("projectCost"))} placeholder="₹" inputMode="numeric" error={errors.projectCost} />
//         </Field>
//         <Field label="Preferred loan amount (₹)" error={errors.preferredLoanAmount}>
//           <Text value={form.preferredLoanAmount} onChange={onlyDigits(set("preferredLoanAmount"))} placeholder="₹" inputMode="numeric" error={errors.preferredLoanAmount} />
//         </Field>
//         <Field label="Type of collateral" error={errors.collateralType}>
//           <Select value={form.collateralType} onChange={set("collateralType")} options={COLLATERAL_TYPES} placeholder="Select" error={errors.collateralType} />
//         </Field>
//         <Field label="Value of collateral (₹)" error={errors.collateralValue}>
//           <Text value={form.collateralValue} onChange={onlyDigits(set("collateralValue"))} placeholder="₹" inputMode="numeric" error={errors.collateralValue} />
//         </Field>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2">
//         <FileRow label="Collateral picture — Internal" required name={form.collateralPicInternal} onChange={setFile("collateralPicInternal")} error={errors.collateralPicInternal} />
//         <FileRow label="Collateral picture — External" required name={form.collateralPicExternal} onChange={setFile("collateralPicExternal")} error={errors.collateralPicExternal} />
//       </div>

//       <Field
//         label="Current profession / background"
//         hint={`${words}/1000 words`}
//         error={errors.background}
//       >
//         <TextArea rows={6} value={form.background} onChange={set("background")} placeholder="Describe your current profession and background (up to 1000 words)" error={errors.background} />
//       </Field>

//       <Field label="Do you have a project report?" error={errors.hasProjectReport}>
//         <Pills value={form.hasProjectReport} onSelect={setChoice("hasProjectReport")} options={["Yes", "No"]} />
//       </Field>

//       {form.hasProjectReport === "No" && (
//         <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-4">
//           <h3 className="text-sm font-semibold text-blue-800">Questionnaire</h3>
//           <Field label="Family background" error={errors.qFamilyBackground}>
//             <TextArea value={form.qFamilyBackground} onChange={set("qFamilyBackground")} placeholder="Family background" error={errors.qFamilyBackground} />
//           </Field>
//           <div className="grid gap-4 sm:grid-cols-2">
//             <Field label="Net worth" error={errors.qNetWorth}>
//               <Text value={form.qNetWorth} onChange={set("qNetWorth")} placeholder="Approx net worth" error={errors.qNetWorth} />
//             </Field>
//             <Field label="Job / package" hint="If applicable">
//               <Text value={form.qJobPackage} onChange={set("qJobPackage")} placeholder="Job & package" />
//             </Field>
//           </div>
//           <Field label="Existing profile" hint="Existing business / profile">
//             <TextArea value={form.qExistingProfile} onChange={set("qExistingProfile")} placeholder="Existing profile" />
//           </Field>
//           <Field
//             label="About project"
//             hint="Vendors, breakup of building, plot purchase, equipment, working capital, moratorium"
//             error={errors.qAboutProject}
//           >
//             <TextArea value={form.qAboutProject} onChange={set("qAboutProject")} placeholder="About the project — vendors, building & plot, equipment, working capital, moratorium" error={errors.qAboutProject} />
//           </Field>
//         </div>
//       )}

//       <div className="rounded-xl border border-slate-200 p-4 space-y-4">
//         <h3 className="text-sm font-semibold text-slate-700">Projections</h3>
//         <Field label="List of vendors & supply details" hint="Who you'll supply to, how much, turnover">
//           <TextArea value={form.vendorsList} onChange={set("vendorsList")} placeholder="Vendors, supply quantity, turnover" />
//         </Field>
//         <Field label="Payment days" hint="Average payment cycle">
//           <Text value={form.paymentDays} onChange={onlyDigits(set("paymentDays"))} placeholder="e.g. 45" inputMode="numeric" />
//         </Field>
//         <div>
//           <p className="mb-2 text-sm font-medium text-slate-700">Estimated turnover (3 years)</p>
//           <div className="grid gap-4 sm:grid-cols-3">
//             <Field label="Year 1" error={errors.turnoverY1}>
//               <Text value={form.turnoverY1} onChange={onlyDigits(set("turnoverY1"))} placeholder="₹" inputMode="numeric" error={errors.turnoverY1} />
//             </Field>
//             <Field label="Year 2" error={errors.turnoverY2}>
//               <Text value={form.turnoverY2} onChange={onlyDigits(set("turnoverY2"))} placeholder="₹" inputMode="numeric" error={errors.turnoverY2} />
//             </Field>
//             <Field label="Year 3" error={errors.turnoverY3}>
//               <Text value={form.turnoverY3} onChange={onlyDigits(set("turnoverY3"))} placeholder="₹" inputMode="numeric" error={errors.turnoverY3} />
//             </Field>
//           </div>
//         </div>
//       </div>

//       <Field label="Political background in family?" error={errors.politicalBackground}>
//         <Pills value={form.politicalBackground} onSelect={setChoice("politicalBackground")} options={["Yes", "No"]} />
//       </Field>
//       {form.politicalBackground === "Yes" && (
//         <Field label="Political background details" error={errors.politicalDetail}>
//           <TextArea value={form.politicalDetail} onChange={set("politicalDetail")} placeholder="Provide details" error={errors.politicalDetail} />
//         </Field>
//       )}
//     </div>
//   );
// }

// /* ---------- Step 2: e-KYC ---------- */

// function StepKyc({ form, set, setChoice, setFile, errors }) {
//   const manual = usesManualKyc(form);
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Sign in / e-KYC</h2>
//       <p className="text-sm text-slate-600">
//         Verify PAN &amp; Aadhaar via DigiLocker, or upload them manually.
//       </p>

//       <Field label="KYC method" error={errors.kycMethod}>
//         <Pills value={form.kycMethod} onSelect={setChoice("kycMethod")} options={KYC_METHODS} />
//       </Field>

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field label="PAN number" error={errors.pan}>
//           <Text
//             value={form.pan}
//             onChange={(e) => set("pan")({ target: { value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) } })}
//             placeholder="ABCDE1234F"
//             error={errors.pan}
//           />
//         </Field>
//         <Field label="Aadhaar number" error={errors.aadhaar}>
//           <Text value={form.aadhaar} onChange={(e) => set("aadhaar")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 12) } })} placeholder="12-digit Aadhaar" inputMode="numeric" maxLength={12} error={errors.aadhaar} />
//         </Field>
//       </div>

//       {form.kycMethod === "Verify via DigiLocker" && (
//         <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
//           <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
//           <span>On submit, you'll be redirected to DigiLocker to verify your PAN &amp; Aadhaar securely.</span>
//         </div>
//       )}

//       {manual && (
//         <div className="grid gap-4 sm:grid-cols-2">
//           <FileRow label="PAN card" required name={form.panFile} onChange={setFile("panFile")} error={errors.panFile} />
//           <FileRow label="Aadhaar card" required name={form.aadhaarFile} onChange={setFile("aadhaarFile")} error={errors.aadhaarFile} />
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Step 3: CIBIL ---------- */

// function StepCibil({ form, setChoice, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Credit Bureau Check (CIBIL)</h2>
//       <p className="text-sm text-slate-600">We use your PAN to fetch your CIBIL score. A minimum score is required to proceed.</p>

//       <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${form.cibilConsent ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}>
//         <input type="checkbox" checked={form.cibilConsent} onChange={(e) => setChoice("cibilConsent")(e.target.checked)} className="mt-0.5" />
//         <span className="text-sm text-slate-700">I authorise the fetch of my credit information (CIBIL) using my PAN for the purpose of this loan application.</span>
//       </label>
//       {errors.cibilConsent && <ErrorText>{errors.cibilConsent}</ErrorText>}
//     </div>
//   );
// }

// /* ---------- Step 4: Accumn ---------- */

// function StepAccumn({ form, setChoice, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Bank statement &amp; financials fetch</h2>
//       <p className="text-sm text-slate-600">Do you consent to fetch your bank statements and financials directly via Accumn?</p>

//       <div className="grid gap-3 sm:grid-cols-2">
//         <ConsentCard active={form.accumnConsent === "Yes"} onClick={() => setChoice("accumnConsent")("Yes")} title="Yes, fetch securely" text="You'll be redirected to Accumn's OTP-based flow to auto-fetch statements & financials." />
//         <ConsentCard active={form.accumnConsent === "No"} onClick={() => setChoice("accumnConsent")("No")} title="No, I'll upload manually" text="Continue to manual upload of your financial documents." />
//       </div>
//       {errors.accumnConsent && <ErrorText>{errors.accumnConsent}</ErrorText>}

//       {form.accumnConsent === "Yes" && (
//         <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
//           <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
//           <span>On submit, you'll be redirected to Accumn's secure OTP-based fetch to auto-import your bank statements & financials.</span>
//         </div>
//       )}
//     </div>
//   );
// }

// function ConsentCard({ active, onClick, title, text }) {
//   return (
//     <button type="button" onClick={onClick} className={`rounded-xl border p-4 text-left transition ${active ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
//       <div className="flex items-center justify-between">
//         <p className="font-semibold text-slate-800">{title}</p>
//         <span className={`grid h-5 w-5 place-items-center rounded-full border ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}>{active && <Check className="h-3 w-3" />}</span>
//       </div>
//       <p className="mt-1 text-sm text-slate-500">{text}</p>
//     </button>
//   );
// }

// /* ---------- Step 5: Financial documents ---------- */

// function StepFinancialDocs({ form, setFile, errors }) {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">Financial documents</h2>
//       <p className="text-sm text-slate-500">Upload the documents below (PDF, JPG or PNG).</p>
//       <FileRow label="GST returns (if registered)" name={form.docGstReturns} onChange={setFile("docGstReturns")} />
//       <FileRow label="Practice receipts (invoices / fee receipts)" required name={form.docPracticeReceipts} onChange={setFile("docPracticeReceipts")} error={errors.docPracticeReceipts} />
//       <FileRow label="Bank statement — 12 months" required name={form.docBankStatement12} onChange={setFile("docBankStatement12")} error={errors.docBankStatement12} />
//     </div>
//   );
// }

// /* ---------- Step 6: Project details ---------- */

// function StepProjectDetails({ form, set, setFile, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Project details</h2>

//       <Field label="Project title" error={errors.projectTitle}>
//         <Text value={form.projectTitle} onChange={set("projectTitle")} placeholder="Project title" error={errors.projectTitle} />
//       </Field>
//       <Field label="Short description" error={errors.projectDescription}>
//         <TextArea value={form.projectDescription} onChange={set("projectDescription")} placeholder="Short description of the project" error={errors.projectDescription} />
//       </Field>

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field label="Start date" error={errors.projectStart}>
//           <Text type="date" value={form.projectStart} onChange={set("projectStart")} error={errors.projectStart} />
//         </Field>
//         <Field label="End date" error={errors.projectEnd}>
//           <Text type="date" value={form.projectEnd} onChange={set("projectEnd")} error={errors.projectEnd} />
//         </Field>
//       </div>

//       <div className="rounded-xl border border-slate-200 p-4 space-y-4">
//         <h3 className="text-sm font-semibold text-slate-700">Total cost — line items (₹)</h3>
//         <div className="grid gap-4 sm:grid-cols-2">
//           <Field label="Land"><Text value={form.costLand} onChange={onlyDigits(set("costLand"))} placeholder="₹" inputMode="numeric" /></Field>
//           <Field label="Civil"><Text value={form.costCivil} onChange={onlyDigits(set("costCivil"))} placeholder="₹" inputMode="numeric" /></Field>
//           <Field label="Plant & machinery"><Text value={form.costPlant} onChange={onlyDigits(set("costPlant"))} placeholder="₹" inputMode="numeric" /></Field>
//           <Field label="Working capital"><Text value={form.costWorkingCapital} onChange={onlyDigits(set("costWorkingCapital"))} placeholder="₹" inputMode="numeric" /></Field>
//           <Field label="Contingency"><Text value={form.costContingency} onChange={onlyDigits(set("costContingency"))} placeholder="₹" inputMode="numeric" /></Field>
//         </div>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field label="Funding — Debt (₹)" error={errors.fundingDebt}>
//           <Text value={form.fundingDebt} onChange={onlyDigits(set("fundingDebt"))} placeholder="₹" inputMode="numeric" error={errors.fundingDebt} />
//         </Field>
//         <Field label="Funding — Equity (₹)" error={errors.fundingEquity}>
//           <Text value={form.fundingEquity} onChange={onlyDigits(set("fundingEquity"))} placeholder="₹" inputMode="numeric" error={errors.fundingEquity} />
//         </Field>
//       </div>

//       <div>
//         <p className="mb-2 text-sm font-medium text-slate-700">Projected revenue / cashflow (3 years)</p>
//         <div className="grid gap-4 sm:grid-cols-3">
//           <Field label="Year 1"><Text value={form.projRevenueY1} onChange={onlyDigits(set("projRevenueY1"))} placeholder="₹" inputMode="numeric" /></Field>
//           <Field label="Year 2"><Text value={form.projRevenueY2} onChange={onlyDigits(set("projRevenueY2"))} placeholder="₹" inputMode="numeric" /></Field>
//           <Field label="Year 3"><Text value={form.projRevenueY3} onChange={onlyDigits(set("projRevenueY3"))} placeholder="₹" inputMode="numeric" /></Field>
//         </div>
//       </div>

//       <Field label="Key milestones & estimated costs" error={errors.milestones}>
//         <TextArea value={form.milestones} onChange={set("milestones")} placeholder="Key milestones and estimated cost per milestone" error={errors.milestones} />
//       </Field>
//       <Field label="Buyers / offtake agreements" hint="If any">
//         <TextArea value={form.offtakeAgreements} onChange={set("offtakeAgreements")} placeholder="Buyers / offtake agreements" />
//       </Field>
//       <FileRow label="CA-certified projections" name={form.docCaProjections} onChange={setFile("docCaProjections")} />
//     </div>
//   );
// }

// /* ---------- Step 7: Collateral & Title ---------- */

// function StepCollateral({ form, set, setChoice, setFile, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Collateral &amp; land / title</h2>

//       <Field label="Type of security" error={errors.securityType}>
//         <Pills value={form.securityType} onSelect={setChoice("securityType")} options={["Land", "Building", "Hypothecation"]} />
//       </Field>

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field label="Owner name" error={errors.ownerName}>
//           <Text value={form.ownerName} onChange={set("ownerName")} placeholder="Owner name" error={errors.ownerName} />
//         </Field>
//         <Field label="Estimated market value (₹)" error={errors.marketValue}>
//           <Text value={form.marketValue} onChange={onlyDigits(set("marketValue"))} placeholder="₹" inputMode="numeric" error={errors.marketValue} />
//         </Field>
//       </div>

//       <Field label="Encumbrance status" error={errors.encumbranceStatus}>
//         <Text value={form.encumbranceStatus} onChange={set("encumbranceStatus")} placeholder="e.g. Free from encumbrance / Mortgaged" error={errors.encumbranceStatus} />
//       </Field>

//       <div className="space-y-4 border-t border-slate-100 pt-4">
//         <h3 className="text-sm font-semibold text-slate-700">Documents</h3>
//         <FileRow label="Title deed / Sale deed" required name={form.docTitleDeed} onChange={setFile("docTitleDeed")} error={errors.docTitleDeed} />
//         <FileRow label="Encumbrance certificate (EC)" required name={form.docEncumbranceCert} onChange={setFile("docEncumbranceCert")} error={errors.docEncumbranceCert} />
//         <FileRow label="Property tax receipts" name={form.docPropertyTax} onChange={setFile("docPropertyTax")} />
//         <FileRow label="Valuation report (if done)" name={form.docValuationReport} onChange={setFile("docValuationReport")} />
//         <FileRow label="NOCs" name={form.docNoc} onChange={setFile("docNoc")} />
//         <FileRow label="Land-use certificate" name={form.docLandUseCert} onChange={setFile("docLandUseCert")} />
//         <FileRow label="Lease agreement (if leased)" name={form.docLeaseAgreement} onChange={setFile("docLeaseAgreement")} />
//       </div>
//     </div>
//   );
// }

// /* ---------- Step 8: Permissions & Licenses ---------- */

// function StepPermissions({ form, setFile, errors }) {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">Permissions, licenses &amp; approvals</h2>
//       <p className="text-sm text-slate-500">Upload the documents below (PDF, JPG or PNG).</p>
//       <FileRow label="Building plan approval" required name={form.docBuildingPlan} onChange={setFile("docBuildingPlan")} error={errors.docBuildingPlan} />
//       <FileRow label="Environmental clearance (if needed)" name={form.docEnvClearance} onChange={setFile("docEnvClearance")} />
//       <FileRow label="Power connection / utility approval" name={form.docPowerApproval} onChange={setFile("docPowerApproval")} />
//       <FileRow label="Trade / factory license" required name={form.docTradeLicense} onChange={setFile("docTradeLicense")} error={errors.docTradeLicense} />
//       <FileRow label="Concession agreement (BOT/PPP)" name={form.docConcessionAgreement} onChange={setFile("docConcessionAgreement")} />
//       <FileRow label="Other government approvals" name={form.docGovtApprovals} onChange={setFile("docGovtApprovals")} />
//     </div>
//   );
// }

// /* ---------- Step 9: Review ---------- */

// function ReviewBlock({ title, stepNo, goToStep, rows }) {
//   return (
//     <div className="rounded-xl border border-slate-200">
//       <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
//         <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
//         <button type="button" onClick={() => goToStep(stepNo)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
//           <Pencil className="h-3.5 w-3.5" /> Edit
//         </button>
//       </div>
//       <dl className="divide-y divide-slate-50">
//         {rows.map(([label, value]) => (
//           <div key={label} className="flex gap-4 px-4 py-2.5 text-sm">
//             <dt className="w-44 shrink-0 text-slate-500">{label}</dt>
//             <dd className="text-slate-800">{value || <span className="text-slate-400">—</span>}</dd>
//           </div>
//         ))}
//       </dl>
//     </div>
//   );
// }

// function StepReview({ form, goToStep }) {
//   const accumn = usesAccumn(form);
//   const sectorLabel = form.sector === "Other" && form.sectorOther ? `Other — ${form.sectorOther}` : form.sector;
//   return (
//     <div className="space-y-5">
//       <div>
//         <h2 className="text-lg font-semibold">Review your application</h2>
//         <p className="mt-1 text-sm text-slate-500">Check everything below. Use “Edit” on any section to go back — your other answers stay saved.</p>
//       </div>

//       <ReviewBlock title="Eligibility" stepNo={1} goToStep={goToStep} rows={[
//         ["Applicant type", form.applicantType],
//         ["Sector", sectorLabel],
//         ["Project cost", form.projectCost && `₹ ${form.projectCost}`],
//         ["Preferred loan", form.preferredLoanAmount && `₹ ${form.preferredLoanAmount}`],
//         ["Collateral type", form.collateralType],
//         ["Collateral value", form.collateralValue && `₹ ${form.collateralValue}`],
//         ["Project report?", form.hasProjectReport],
//         ["Turnover Y1/Y2/Y3", [form.turnoverY1, form.turnoverY2, form.turnoverY3].filter(Boolean).join(" / ")],
//         ["Political background", form.politicalBackground],
//       ]} />

//       <ReviewBlock title="e-KYC" stepNo={2} goToStep={goToStep} rows={[
//         ["Method", form.kycMethod],
//         ["PAN", form.pan],
//         ["Aadhaar", form.aadhaar],
//       ]} />

//       <ReviewBlock title="CIBIL" stepNo={3} goToStep={goToStep} rows={[["Consent", form.cibilConsent ? "Given" : "Not given"]]} />

//       <ReviewBlock title="Bank fetch" stepNo={4} goToStep={goToStep} rows={[["Accumn fetch", form.accumnConsent === "Yes" ? "Yes (auto-fetch)" : form.accumnConsent === "No" ? "No (manual upload)" : ""]]} />

//       {!accumn && (
//         <ReviewBlock title="Financial documents" stepNo={5} goToStep={goToStep} rows={[
//           ["GST returns", form.docGstReturns],
//           ["Practice receipts", form.docPracticeReceipts],
//           ["Bank statement (12 mo)", form.docBankStatement12],
//         ]} />
//       )}

//       <ReviewBlock title="Project details" stepNo={6} goToStep={goToStep} rows={[
//         ["Title", form.projectTitle],
//         ["Duration", [form.projectStart, form.projectEnd].filter(Boolean).join(" → ")],
//         ["Funding (D/E)", [form.fundingDebt && `₹${form.fundingDebt}`, form.fundingEquity && `₹${form.fundingEquity}`].filter(Boolean).join(" / ")],
//         ["CA projections", form.docCaProjections],
//       ]} />

//       <ReviewBlock title="Collateral & title" stepNo={7} goToStep={goToStep} rows={[
//         ["Security type", form.securityType],
//         ["Owner name", form.ownerName],
//         ["Market value", form.marketValue && `₹ ${form.marketValue}`],
//         ["Encumbrance", form.encumbranceStatus],
//         ["Title deed", form.docTitleDeed],
//         ["EC", form.docEncumbranceCert],
//       ]} />

//       <ReviewBlock title="Permissions & licenses" stepNo={8} goToStep={goToStep} rows={[
//         ["Building plan", form.docBuildingPlan],
//         ["Trade license", form.docTradeLicense],
//         ["Env. clearance", form.docEnvClearance],
//         ["Power approval", form.docPowerApproval],
//       ]} />
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  BANK OFFERS                                                        */
// /* ------------------------------------------------------------------ */

// function BankOffers({ onApply, onBack }) {
//   return (
//     <section className="mx-auto max-w-3xl px-5 py-10">
//       <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800">
//         <ArrowLeft className="h-4 w-4" /> Back
//       </button>

//       <h2 className="text-2xl font-bold text-slate-900">Bank offers for you</h2>
//       <p className="mt-1 text-sm text-slate-500">Based on your details, here are matched offers. Choose a bank to apply.</p>

//       <div className="mt-6 space-y-4">
//         {BANK_OFFERS.map((bank) => (
//           <div key={bank.name} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//             {bank.bestSuited && (
//               <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">★ Best Suited For You</span>
//             )}
//             <div className="flex items-center gap-2">
//               <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-600"><Landmark className="h-5 w-5" /></span>
//               <h3 className="text-lg font-bold text-slate-900">{bank.name}</h3>
//             </div>
//             <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:items-end">
//               <div><p className="text-xs text-slate-400">Max. Loan Amount</p><p className="text-base font-bold text-slate-800">{bank.maxAmount}</p></div>
//               <div><p className="text-xs text-slate-400">ROI Starting at</p><p className="text-base font-bold text-slate-800">{bank.roi}</p><p className="text-[11px] text-slate-400">APR: {bank.apr}</p></div>
//               <div><p className="text-xs text-slate-400">EMI</p><p className="text-base font-bold text-slate-800">{bank.emi}</p></div>
//               <div><p className="text-xs text-slate-400">Processing Fees</p><p className="text-base font-bold text-slate-800">{bank.fees}</p></div>
//               <div className="col-span-2 sm:col-span-1">
//                 <button onClick={() => onApply(bank.name)} className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Apply Now</button>
//                 <p className="mt-2 text-center text-xs font-medium text-blue-600">KFS, Charges &amp; APR</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">10,000+ people took a loan in the last 30 days</p>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  REJECTED / SUCCESS                                                 */
// /* ------------------------------------------------------------------ */

// function Rejected({ score, onReset }) {
//   return (
//     <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
//       <div>
//         <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-100 text-red-600"><XCircle className="h-8 w-8" /></div>
//         <h2 className="mt-6 text-2xl font-bold">Application not eligible</h2>
//         <p className="mt-2 text-slate-600">Based on the credit bureau check{score ? ` (score: ${score})` : ""}, we are unable to proceed with your project loan application at this time. You can re-apply once your credit profile improves.</p>
//         <button onClick={onReset} className="mt-8 rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-800">Start over</button>
//       </div>
//     </section>
//   );
// }

// function Success({ onReset }) {
//   return (
//     <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
//       <div>
//         <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600"><Check className="h-8 w-8" /></div>
//         <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
//         <p className="mt-2 text-slate-600">Your project loan application has been submitted. Our team will reach out within 24 hours.</p>
//         <button onClick={onReset} className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Start a new application</button>
//       </div>
//     </section>
//   );
// }


import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
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
/*  Project Loan — full flow                                          */
/*  Hero (login) restyled to Agri Loan's navy (#001f54) / red          */
/*  (#e8112d) theme, with new Eligibility / Key Features / Repayment   */
/*  stats / Representative-cost-table content below it.                */
/*  Eligibility → e-KYC → CIBIL → Accumn → Financial Docs →            */
/*  Project Details → Collateral & Title → Permissions →               */
/*  Review → Bank offers → toast.  (Wizard flow unchanged.)            */
/* ------------------------------------------------------------------ */

const APPLICANT_TYPES = [
  "Individual",
  "Proprietor",
  "Partnership",
  "Pvt Ltd",
  "LLP",
  "Company",
];
const SECTORS = [
  "Construction",
  "Manufacturing",
  "Renewable",
  "Healthcare",
  "Education",
  "Agribusiness",
  "Other",
];
const COLLATERAL_TYPES = ["Land", "Building", "Hypothecation", "Other"];
const KYC_METHODS = ["Verify via DigiLocker", "Upload manually"];

// CIBIL threshold below which the journey ends with a rejection.
const CIBIL_THRESHOLD = 700;

// Dummy bank offers shown after eligibility is met (demo data).
const BANK_OFFERS = [
  { name: "Instamoney", maxAmount: "₹1.0L", roi: "22% p.a", apr: "23.77%", emi: "₹7,638 p.m.", fees: "2-5%", bestSuited: true },
  { name: "HDFC Bank", maxAmount: "₹5Cr", roi: "10.5% p.a", apr: "11.20%", emi: "—", fees: "1-3%", bestSuited: false },
  { name: "ICICI Bank", maxAmount: "₹3Cr", roi: "11.0% p.a", apr: "11.85%", emi: "—", fees: "1.5-3%", bestSuited: false },
  { name: "Axis Bank", maxAmount: "₹2Cr", roi: "12.5% p.a", apr: "13.40%", emi: "—", fees: "2-4%", bestSuited: false },
  { name: "SBI", maxAmount: "₹10Cr", roi: "9.8% p.a", apr: "10.50%", emi: "—", fees: "1-2.5%", bestSuited: false },
];

const STEP_LABELS = [
  "Eligibility",
  "e-KYC",
  "CIBIL",
  "Bank Fetch",
  "Financial Docs",
  "Project Details",
  "Collateral",
  "Permissions",
  "Review",
];

// ── Eligibility (info section, distinct from the wizard's step-1 form) ──
const eligibilityCriteria = [
  "Minimum two years of operations along with audited accounts",
  "Cash profit in last audited financial results",
  "No defaults to Bank/FIs",
];

// ── Key Features ────────────────────────────────────────────────────
const keyFeatures = [
  "Loan for purchase of land & construction of factory building, purchase of plant & machinery, miscellaneous fixed assets, installation of rooftop solar projects, acquisition of other energy efficiency devices, etc.",
  "Assistance to existing entities for expansion / modernization / technology upgradation in the same line of business.",
  "Financing upto ₹50 Crore subject to maximum of 80% of the project cost.",
  "MCLR-linked attractive rate of interest.",
  "Repayment upto 7 years with moratorium upto 2 years.",
];

// ── Repayment period, loan amount range & interest rate ────────────
const repaymentStats = [
  { icon: Calendar, title: "Minimum Repayment Period", desc: "36 months" },
  { icon: Calendar, title: "Maximum Repayment Period", desc: "180 months (7 years)" },
  { icon: IndianRupee, title: "Minimum Loan Amount", desc: "₹50,00,000" },
  { icon: IndianRupee, title: "Maximum Loan Amount", desc: "₹250,00,00,000" },
  { icon: Percent, title: "Annual Interest Rate (AIR)", desc: "8% – 16% per annum" },
];

// ── Representative example of loan cost ─────────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Project Loan / Project Finance" },
  { feature: "Loan Amount", details: "₹5,00,00,000" },
  { feature: "Annual Interest Rate (Indicative)", details: "10.25% p.a." },
  { feature: "Loan Tenure", details: "120 months" },
  { feature: "Moratorium Period", details: "12 months (included in tenure)" },
  { feature: "Monthly Installment (EMI)", details: "₹6,68,000" },
  { feature: "Total Amount Payable", details: "₹8,01,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹3,01,000 (approx.)" },
  { feature: "Processing Fee", details: "0.25% – 1% of loan amount" },
  { feature: "Collateral Requirement", details: "Project assets + additional security (as applicable)" },
];

const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const AADHAAR_RE = /^\d{12}$/;

const initialForm = {
  // B — eligibility
  applicantType: "",
  sector: "",
  sectorOther: "",
  projectCost: "",
  preferredLoanAmount: "",
  collateralType: "",
  collateralValue: "",
  collateralPicInternal: "",
  collateralPicExternal: "",
  background: "", // up to ~1000 words
  // questionnaire (if no project report)
  hasProjectReport: "", // "Yes" | "No"
  qFamilyBackground: "",
  qNetWorth: "",
  qJobPackage: "",
  qExistingProfile: "",
  qAboutProject: "",
  // projections
  vendorsList: "",
  paymentDays: "",
  turnoverY1: "",
  turnoverY2: "",
  turnoverY3: "",
  // political
  politicalBackground: "", // "Yes" | "No"
  politicalDetail: "",
  // C — e-KYC
  kycMethod: "",
  pan: "",
  aadhaar: "",
  panFile: "",
  aadhaarFile: "",
  // D — CIBIL
  cibilConsent: false,
  // E — Accumn
  accumnConsent: "", // "Yes" | "No"
  // F — financial documents
  docGstReturns: "",
  docPracticeReceipts: "",
  docBankStatement12: "",
  // G — project details
  projectTitle: "",
  projectDescription: "",
  projectStart: "",
  projectEnd: "",
  costLand: "",
  costCivil: "",
  costPlant: "",
  costWorkingCapital: "",
  costContingency: "",
  fundingDebt: "",
  fundingEquity: "",
  projRevenueY1: "",
  projRevenueY2: "",
  projRevenueY3: "",
  milestones: "",
  offtakeAgreements: "",
  docCaProjections: "",
  // H — collateral & title
  securityType: "",
  ownerName: "",
  marketValue: "",
  encumbranceStatus: "",
  docTitleDeed: "",
  docEncumbranceCert: "",
  docPropertyTax: "",
  docValuationReport: "",
  docNoc: "",
  docLandUseCert: "",
  docLeaseAgreement: "",
  // I — permissions & licenses
  docBuildingPlan: "",
  docEnvClearance: "",
  docPowerApproval: "",
  docTradeLicense: "",
  docConcessionAgreement: "",
  docGovtApprovals: "",
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function usesAccumn(form) {
  return form.accumnConsent === "Yes";
}
function usesManualKyc(form) {
  return form.kycMethod === "Upload manually";
}
function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

/* ------------------------------------------------------------------ */
/*  Validation per step                                                */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.applicantType) e.applicantType = "Select applicant type.";
    if (!form.sector) e.sector = "Select a sector.";
    if (form.sector === "Other" && !form.sectorOther.trim())
      e.sectorOther = "Please specify the sector.";
    if (!form.projectCost.trim()) e.projectCost = "Estimated project cost is required.";
    else if (!/^\d+$/.test(form.projectCost))
      e.projectCost = "Enter a valid amount in numbers.";
    if (!form.preferredLoanAmount.trim())
      e.preferredLoanAmount = "Preferred loan amount is required.";
    else if (!/^\d+$/.test(form.preferredLoanAmount))
      e.preferredLoanAmount = "Enter a valid amount in numbers.";
    if (!form.collateralType) e.collateralType = "Select collateral type.";
    if (!form.collateralValue.trim())
      e.collateralValue = "Collateral value is required.";
    else if (!/^\d+$/.test(form.collateralValue))
      e.collateralValue = "Enter a valid amount in numbers.";
    if (!form.collateralPicInternal)
      e.collateralPicInternal = "Upload internal picture.";
    if (!form.collateralPicExternal)
      e.collateralPicExternal = "Upload external picture.";
    if (!form.background.trim()) e.background = "Please describe your background.";
    else if (wordCount(form.background) > 1000)
      e.background = "Please keep it within 1000 words.";
    if (!form.hasProjectReport)
      e.hasProjectReport = "Do you have a project report?";
    if (form.hasProjectReport === "No") {
      if (!form.qFamilyBackground.trim())
        e.qFamilyBackground = "Family background is required.";
      if (!form.qNetWorth.trim()) e.qNetWorth = "Net worth is required.";
      if (!form.qAboutProject.trim())
        e.qAboutProject = "About the project is required.";
    }
    if (!form.turnoverY1.trim()) e.turnoverY1 = "Year 1 turnover is required.";
    else if (!/^\d+$/.test(form.turnoverY1))
      e.turnoverY1 = "Enter a valid amount.";
    if (!form.turnoverY2.trim()) e.turnoverY2 = "Year 2 turnover is required.";
    else if (!/^\d+$/.test(form.turnoverY2))
      e.turnoverY2 = "Enter a valid amount.";
    if (!form.turnoverY3.trim()) e.turnoverY3 = "Year 3 turnover is required.";
    else if (!/^\d+$/.test(form.turnoverY3))
      e.turnoverY3 = "Enter a valid amount.";
    if (!form.politicalBackground)
      e.politicalBackground = "Please answer the political background question.";
    if (form.politicalBackground === "Yes" && !form.politicalDetail.trim())
      e.politicalDetail = "Please provide details.";
  }

  if (step === 2) {
    if (!form.kycMethod) e.kycMethod = "Select a KYC method.";
    if (!form.pan.trim()) e.pan = "PAN is required.";
    else if (!PAN_RE.test(form.pan.trim().toUpperCase()))
      e.pan = "Enter a valid PAN (e.g. ABCDE1234F).";
    if (!form.aadhaar.trim()) e.aadhaar = "Aadhaar number is required.";
    else if (!AADHAAR_RE.test(form.aadhaar))
      e.aadhaar = "Enter a valid 12-digit Aadhaar number.";
    if (usesManualKyc(form)) {
      if (!form.panFile) e.panFile = "Upload PAN card.";
      if (!form.aadhaarFile) e.aadhaarFile = "Upload Aadhaar card.";
    }
  }

  if (step === 3) {
    if (!form.cibilConsent)
      e.cibilConsent = "Consent is required to fetch your CIBIL score.";
  }

  if (step === 4) {
    if (!form.accumnConsent)
      e.accumnConsent = "Please choose whether to fetch via Accumn.";
  }

  if (step === 5) {
    if (!usesAccumn(form)) {
      if (!form.docPracticeReceipts)
        e.docPracticeReceipts = "Practice receipts are required.";
      if (!form.docBankStatement12)
        e.docBankStatement12 = "Bank statement (12 months) is required.";
    }
  }

  if (step === 6) {
    if (!form.projectTitle.trim()) e.projectTitle = "Project title is required.";
    if (!form.projectDescription.trim())
      e.projectDescription = "Short description is required.";
    if (!form.projectStart) e.projectStart = "Start date is required.";
    if (!form.projectEnd) e.projectEnd = "End date is required.";
    else if (form.projectStart && new Date(form.projectEnd) <= new Date(form.projectStart))
      e.projectEnd = "End date must be after the start date.";
    if (!form.fundingDebt.trim()) e.fundingDebt = "Debt portion is required.";
    else if (!/^\d+$/.test(form.fundingDebt))
      e.fundingDebt = "Enter a valid amount.";
    if (!form.fundingEquity.trim()) e.fundingEquity = "Equity portion is required.";
    else if (!/^\d+$/.test(form.fundingEquity))
      e.fundingEquity = "Enter a valid amount.";
    if (!form.milestones.trim()) e.milestones = "Key milestones are required.";
  }

  if (step === 7) {
    if (!form.securityType) e.securityType = "Select the type of security.";
    if (!form.ownerName.trim()) e.ownerName = "Owner name is required.";
    if (!form.marketValue.trim()) e.marketValue = "Estimated market value is required.";
    else if (!/^\d+$/.test(form.marketValue))
      e.marketValue = "Enter a valid amount.";
    if (!form.encumbranceStatus.trim())
      e.encumbranceStatus = "Encumbrance status is required.";
    if (!form.docTitleDeed) e.docTitleDeed = "Title deed / sale deed is required.";
    if (!form.docEncumbranceCert)
      e.docEncumbranceCert = "Encumbrance certificate is required.";
  }

  if (step === 8) {
    if (!form.docBuildingPlan)
      e.docBuildingPlan = "Building plan approval is required.";
    if (!form.docTradeLicense)
      e.docTradeLicense = "Trade / factory license is required.";
  }

  return e;
}

/* Simulated CIBIL fetch (consistent demo score from PAN).               */
function fetchCibilScore(pan) {
  let sum = 0;
  for (const ch of pan.toUpperCase()) sum += ch.charCodeAt(0);
  return 600 + (sum % 250); // range 600–849
}

export default function ProjectLoanFull() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
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

  const next = () => {
    const e = validateStep(step, form);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});

    // After CIBIL consent (step 3): fetch score and gate the journey.
    if (step === 3) {
      const score = fetchCibilScore(form.pan);
      setCibilScore(score);
      if (score < CIBIL_THRESHOLD) {
        setRejected(true);
        return;
      }
      setStep(4); // Accumn consent
      return;
    }

    // After Accumn consent (step 4): Yes → skip financial docs (5) → project details (6).
    if (step === 4) {
      setStep(usesAccumn(form) ? 6 : 5);
      return;
    }

    setStep((s) => Math.min(s + 1, 9));
  };

  const back = () => {
    setErrors({});
    setStep((s) => {
      if (s === 6 && usesAccumn(form)) return 4; // project details → accumn
      return Math.max(s - 1, 1);
    });
  };

  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    const stepsToCheck = [1, 2, 3, 4];
    if (!usesAccumn(form)) stepsToCheck.push(5);
    stepsToCheck.push(6, 7, 8);
    for (const s of stepsToCheck) {
      const e = validateStep(s, form);
      if (Object.keys(e).length) {
        setErrors(e);
        setStep(s);
        return;
      }
    }
    setErrors({});
    setShowOffers(true);
  };

  const applyToBank = (bankName) => {
    toast.success(`Application submitted to ${bankName}!`, { duration: 4000 });
    setShowOffers(false);
    setSubmitted(true);
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setSubmitted(false);
    setShowOffers(false);
    setRejected(false);
    setCibilScore(null);
    setStarted(false);
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-center" />
      <div className="min-h-screen bg-slate-50 text-slate-900">
        {!started ? (
          <Hero onStart={() => setStarted(true)} />
        ) : rejected ? (
          <Rejected score={cibilScore} onReset={reset} />
        ) : submitted ? (
          <Success onReset={reset} />
        ) : showOffers ? (
          <BankOffers onApply={applyToBank} onBack={() => setShowOffers(false)} />
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
/*  HERO (login) — Agri Loan navy/red theme                            */
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
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              <span className="text-[#e8112d]">Project Loans</span>{" "}
              <span className="text-[#001f54]">for Every Sector</span>
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              End-to-end project financing for construction, manufacturing,
              renewable, healthcare, education and more — from eligibility to
              sanction, with expert support at every step.
            </p>

            <div className="mt-6 overflow-hidden rounded-2xl">
              <img
                src="/project-loan.jpg"
                alt="Project Loan"
                className="h-56 w-full object-cover"
              />
            </div>

            <ul className="mt-8 space-y-5">
              <Feature icon={<Landmark className="h-5 w-5" />} title="For Every Sector" text="Construction, manufacturing, renewable, healthcare, education & more." />
              <Feature icon={<Clock3 className="h-5 w-5" />} title="Quick & Hassle Free" text="Secure Accumn auto-fetch or simple manual upload — your choice." />
              <Feature icon={<BadgeCheck className="h-5 w-5" />} title="Trusted by Thousands" text="Backed by 15+ leading banks and a dedicated support team." />
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <div className="rounded-xl bg-[#001f54] px-4 py-3 text-sm text-white font-semibold text-center">
              Apply for a Project Loan — it only takes a minute to start.
            </div>

            <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
              Project Loan
            </p>
            <p className="mt-1 text-center text-2xl font-bold">
              Fund your{" "}
              <span className="text-[#e8112d]">project</span>
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Full Name</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value.replace(/[^A-Za-z\s]/g, ""));
                    setErr((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Full Name (as on your PAN)"
                  className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${err.name ? "border-red-400" : "border-slate-300"}`}
                />
                {err.name && <ErrorText>{err.name}</ErrorText>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Mobile Number</label>
                <div className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${err.mobile ? "border-red-400" : "border-slate-300"}`}>
                  <span className="shrink-0 border-r border-slate-200 pr-2 text-slate-700">🇮🇳 +91</span>
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
                Apply Project Loan <ArrowRight className="h-4 w-4" />
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
                <span>By submitting this form, you agree to the Credit Report Terms of Use, Terms of Use &amp; Privacy Policy.</span>
              </label>
              {err.agree && <ErrorText>{err.agree}</ErrorText>}
            </div>
          </div>
        </div>

        {/* ── ELIGIBILITY ── */}
        <section className="py-10 border-t mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility</h2>
          <ul className="space-y-2 pl-1">
            {eligibilityCriteria.map((e) => (
              <li key={e} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-0.5 flex-shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </section>

        {/* ── KEY FEATURES ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
          <ul className="space-y-2 pl-1">
            {keyFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-[#001f54] mt-0.5 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
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
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <li className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#001f54] text-white">{icon}</span>
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

function Wizard({ step, form, errors, set, setChoice, setFile, next, back, goToStep, onSubmit }) {
  const isReview = step === 9;
  const lastBeforeReview = 8;
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <Stepper step={step} form={form} />

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        {step === 1 && <StepEligibility form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
        {step === 2 && <StepKyc form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
        {step === 3 && <StepCibil form={form} setChoice={setChoice} errors={errors} />}
        {step === 4 && <StepAccumn form={form} setChoice={setChoice} errors={errors} />}
        {step === 5 && <StepFinancialDocs form={form} setFile={setFile} errors={errors} />}
        {step === 6 && <StepProjectDetails form={form} set={set} setFile={setFile} errors={errors} />}
        {step === 7 && <StepCollateral form={form} set={set} setChoice={setChoice} setFile={setFile} errors={errors} />}
        {step === 8 && <StepPermissions form={form} setFile={setFile} errors={errors} />}
        {step === 9 && <StepReview form={form} goToStep={goToStep} />}

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
              {step === lastBeforeReview ? "Review details" : step === 3 ? "Check CIBIL & continue" : "Continue"}{" "}
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Bank Apply <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Stepper({ step, form }) {
  let visible = [1, 2, 3, 4];
  if (!usesAccumn(form)) visible.push(5);
  visible.push(6, 7, 8, 9);

  return (
    <div className="flex items-center justify-between overflow-x-auto">
      {visible.map((n, idx) => {
        const label = STEP_LABELS[n - 1];
        const active = n === step;
        const done = visible.indexOf(step) > idx;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                  done ? "bg-[#001f54] text-white" : active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : idx + 1}
              </div>
              <span className="mt-2 hidden whitespace-nowrap text-[11px] text-slate-500 sm:block">{label}</span>
            </div>
            {idx < visible.length - 1 && (
              <div className={`mx-1 h-0.5 flex-1 ${done ? "bg-[#001f54]" : "bg-slate-200"}`} />
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
      {error ? <ErrorText>{error}</ErrorText> : hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>}
    </label>
  );
}

function Text({ value, onChange, error, ...rest }) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}
      {...rest}
    />
  );
}

function TextArea({ value, onChange, error, rows = 3, ...rest }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}
      {...rest}
    />
  );
}

function Select({ value, onChange, options, placeholder, error }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-blue-500 ${error ? "border-red-400" : "border-slate-300"}`}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
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
            value === o ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-300 text-slate-600 hover:border-slate-400"
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
      <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${error ? "border-red-400" : "border-slate-200"}`}>
        <div>
          <p className="text-sm font-medium text-slate-700">{label} {required && <span className="text-[#e8112d]">*</span>}</p>
          {name ? <p className="text-xs text-blue-600">{name}</p> : <p className="text-xs text-slate-400">PDF, JPG or PNG</p>}
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

const onlyDigits = (setter) => (e) => setter({ target: { value: e.target.value.replace(/\D/g, "") } });

/* ---------- Step 1: Eligibility ---------- */

function StepEligibility({ form, set, setChoice, setFile, errors }) {
  const words = wordCount(form.background);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Quick eligibility</h2>

      <Field label="Applicant type" error={errors.applicantType}>
        <Pills value={form.applicantType} onSelect={setChoice("applicantType")} options={APPLICANT_TYPES} />
      </Field>

      <Field label="Sector" error={errors.sector}>
        <Pills value={form.sector} onSelect={setChoice("sector")} options={SECTORS} />
      </Field>
      {form.sector === "Other" && (
        <Field label="Please specify sector" error={errors.sectorOther}>
          <Text value={form.sectorOther} onChange={set("sectorOther")} placeholder="Specify sector" error={errors.sectorOther} />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Estimated project cost (₹)" error={errors.projectCost}>
          <Text value={form.projectCost} onChange={onlyDigits(set("projectCost"))} placeholder="₹" inputMode="numeric" error={errors.projectCost} />
        </Field>
        <Field label="Preferred loan amount (₹)" error={errors.preferredLoanAmount}>
          <Text value={form.preferredLoanAmount} onChange={onlyDigits(set("preferredLoanAmount"))} placeholder="₹" inputMode="numeric" error={errors.preferredLoanAmount} />
        </Field>
        <Field label="Type of collateral" error={errors.collateralType}>
          <Select value={form.collateralType} onChange={set("collateralType")} options={COLLATERAL_TYPES} placeholder="Select" error={errors.collateralType} />
        </Field>
        <Field label="Value of collateral (₹)" error={errors.collateralValue}>
          <Text value={form.collateralValue} onChange={onlyDigits(set("collateralValue"))} placeholder="₹" inputMode="numeric" error={errors.collateralValue} />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FileRow label="Collateral picture — Internal" required name={form.collateralPicInternal} onChange={setFile("collateralPicInternal")} error={errors.collateralPicInternal} />
        <FileRow label="Collateral picture — External" required name={form.collateralPicExternal} onChange={setFile("collateralPicExternal")} error={errors.collateralPicExternal} />
      </div>

      <Field
        label="Current profession / background"
        hint={`${words}/1000 words`}
        error={errors.background}
      >
        <TextArea rows={6} value={form.background} onChange={set("background")} placeholder="Describe your current profession and background (up to 1000 words)" error={errors.background} />
      </Field>

      <Field label="Do you have a project report?" error={errors.hasProjectReport}>
        <Pills value={form.hasProjectReport} onSelect={setChoice("hasProjectReport")} options={["Yes", "No"]} />
      </Field>

      {form.hasProjectReport === "No" && (
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 space-y-4">
          <h3 className="text-sm font-semibold text-blue-800">Questionnaire</h3>
          <Field label="Family background" error={errors.qFamilyBackground}>
            <TextArea value={form.qFamilyBackground} onChange={set("qFamilyBackground")} placeholder="Family background" error={errors.qFamilyBackground} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Net worth" error={errors.qNetWorth}>
              <Text value={form.qNetWorth} onChange={set("qNetWorth")} placeholder="Approx net worth" error={errors.qNetWorth} />
            </Field>
            <Field label="Job / package" hint="If applicable">
              <Text value={form.qJobPackage} onChange={set("qJobPackage")} placeholder="Job & package" />
            </Field>
          </div>
          <Field label="Existing profile" hint="Existing business / profile">
            <TextArea value={form.qExistingProfile} onChange={set("qExistingProfile")} placeholder="Existing profile" />
          </Field>
          <Field
            label="About project"
            hint="Vendors, breakup of building, plot purchase, equipment, working capital, moratorium"
            error={errors.qAboutProject}
          >
            <TextArea value={form.qAboutProject} onChange={set("qAboutProject")} placeholder="About the project — vendors, building & plot, equipment, working capital, moratorium" error={errors.qAboutProject} />
          </Field>
        </div>
      )}

      <div className="rounded-xl border border-slate-200 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Projections</h3>
        <Field label="List of vendors & supply details" hint="Who you'll supply to, how much, turnover">
          <TextArea value={form.vendorsList} onChange={set("vendorsList")} placeholder="Vendors, supply quantity, turnover" />
        </Field>
        <Field label="Payment days" hint="Average payment cycle">
          <Text value={form.paymentDays} onChange={onlyDigits(set("paymentDays"))} placeholder="e.g. 45" inputMode="numeric" />
        </Field>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">Estimated turnover (3 years)</p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Year 1" error={errors.turnoverY1}>
              <Text value={form.turnoverY1} onChange={onlyDigits(set("turnoverY1"))} placeholder="₹" inputMode="numeric" error={errors.turnoverY1} />
            </Field>
            <Field label="Year 2" error={errors.turnoverY2}>
              <Text value={form.turnoverY2} onChange={onlyDigits(set("turnoverY2"))} placeholder="₹" inputMode="numeric" error={errors.turnoverY2} />
            </Field>
            <Field label="Year 3" error={errors.turnoverY3}>
              <Text value={form.turnoverY3} onChange={onlyDigits(set("turnoverY3"))} placeholder="₹" inputMode="numeric" error={errors.turnoverY3} />
            </Field>
          </div>
        </div>
      </div>

      <Field label="Political background in family?" error={errors.politicalBackground}>
        <Pills value={form.politicalBackground} onSelect={setChoice("politicalBackground")} options={["Yes", "No"]} />
      </Field>
      {form.politicalBackground === "Yes" && (
        <Field label="Political background details" error={errors.politicalDetail}>
          <TextArea value={form.politicalDetail} onChange={set("politicalDetail")} placeholder="Provide details" error={errors.politicalDetail} />
        </Field>
      )}
    </div>
  );
}

/* ---------- Step 2: e-KYC ---------- */

function StepKyc({ form, set, setChoice, setFile, errors }) {
  const manual = usesManualKyc(form);
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Sign in / e-KYC</h2>
      <p className="text-sm text-slate-600">
        Verify PAN &amp; Aadhaar via DigiLocker, or upload them manually.
      </p>

      <Field label="KYC method" error={errors.kycMethod}>
        <Pills value={form.kycMethod} onSelect={setChoice("kycMethod")} options={KYC_METHODS} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="PAN number" error={errors.pan}>
          <Text
            value={form.pan}
            onChange={(e) => set("pan")({ target: { value: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) } })}
            placeholder="ABCDE1234F"
            error={errors.pan}
          />
        </Field>
        <Field label="Aadhaar number" error={errors.aadhaar}>
          <Text value={form.aadhaar} onChange={(e) => set("aadhaar")({ target: { value: e.target.value.replace(/\D/g, "").slice(0, 12) } })} placeholder="12-digit Aadhaar" inputMode="numeric" maxLength={12} error={errors.aadhaar} />
        </Field>
      </div>

      {form.kycMethod === "Verify via DigiLocker" && (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <span>On submit, you'll be redirected to DigiLocker to verify your PAN &amp; Aadhaar securely.</span>
        </div>
      )}

      {manual && (
        <div className="grid gap-4 sm:grid-cols-2">
          <FileRow label="PAN card" required name={form.panFile} onChange={setFile("panFile")} error={errors.panFile} />
          <FileRow label="Aadhaar card" required name={form.aadhaarFile} onChange={setFile("aadhaarFile")} error={errors.aadhaarFile} />
        </div>
      )}
    </div>
  );
}

/* ---------- Step 3: CIBIL ---------- */

function StepCibil({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Credit Bureau Check (CIBIL)</h2>
      <p className="text-sm text-slate-600">We use your PAN to fetch your CIBIL score. A minimum score is required to proceed.</p>

      <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer transition ${form.cibilConsent ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}>
        <input type="checkbox" checked={form.cibilConsent} onChange={(e) => setChoice("cibilConsent")(e.target.checked)} className="mt-0.5" />
        <span className="text-sm text-slate-700">I authorise the fetch of my credit information (CIBIL) using my PAN for the purpose of this loan application.</span>
      </label>
      {errors.cibilConsent && <ErrorText>{errors.cibilConsent}</ErrorText>}
    </div>
  );
}

/* ---------- Step 4: Accumn ---------- */

function StepAccumn({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Bank statement &amp; financials fetch</h2>
      <p className="text-sm text-slate-600">Do you consent to fetch your bank statements and financials directly via Accumn?</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <ConsentCard active={form.accumnConsent === "Yes"} onClick={() => setChoice("accumnConsent")("Yes")} title="Yes, fetch securely" text="You'll be redirected to Accumn's OTP-based flow to auto-fetch statements & financials." />
        <ConsentCard active={form.accumnConsent === "No"} onClick={() => setChoice("accumnConsent")("No")} title="No, I'll upload manually" text="Continue to manual upload of your financial documents." />
      </div>
      {errors.accumnConsent && <ErrorText>{errors.accumnConsent}</ErrorText>}

      {form.accumnConsent === "Yes" && (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <span>On submit, you'll be redirected to Accumn's secure OTP-based fetch to auto-import your bank statements & financials.</span>
        </div>
      )}
    </div>
  );
}

function ConsentCard({ active, onClick, title, text }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl border p-4 text-left transition ${active ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}>
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-800">{title}</p>
        <span className={`grid h-5 w-5 place-items-center rounded-full border ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300"}`}>{active && <Check className="h-3 w-3" />}</span>
      </div>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </button>
  );
}

/* ---------- Step 5: Financial documents ---------- */

function StepFinancialDocs({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Financial documents</h2>
      <p className="text-sm text-slate-500">Upload the documents below (PDF, JPG or PNG).</p>
      <FileRow label="GST returns (if registered)" name={form.docGstReturns} onChange={setFile("docGstReturns")} />
      <FileRow label="Practice receipts (invoices / fee receipts)" required name={form.docPracticeReceipts} onChange={setFile("docPracticeReceipts")} error={errors.docPracticeReceipts} />
      <FileRow label="Bank statement — 12 months" required name={form.docBankStatement12} onChange={setFile("docBankStatement12")} error={errors.docBankStatement12} />
    </div>
  );
}

/* ---------- Step 6: Project details ---------- */

function StepProjectDetails({ form, set, setFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Project details</h2>

      <Field label="Project title" error={errors.projectTitle}>
        <Text value={form.projectTitle} onChange={set("projectTitle")} placeholder="Project title" error={errors.projectTitle} />
      </Field>
      <Field label="Short description" error={errors.projectDescription}>
        <TextArea value={form.projectDescription} onChange={set("projectDescription")} placeholder="Short description of the project" error={errors.projectDescription} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Start date" error={errors.projectStart}>
          <Text type="date" value={form.projectStart} onChange={set("projectStart")} error={errors.projectStart} />
        </Field>
        <Field label="End date" error={errors.projectEnd}>
          <Text type="date" value={form.projectEnd} onChange={set("projectEnd")} error={errors.projectEnd} />
        </Field>
      </div>

      <div className="rounded-xl border border-slate-200 p-4 space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Total cost — line items (₹)</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Land"><Text value={form.costLand} onChange={onlyDigits(set("costLand"))} placeholder="₹" inputMode="numeric" /></Field>
          <Field label="Civil"><Text value={form.costCivil} onChange={onlyDigits(set("costCivil"))} placeholder="₹" inputMode="numeric" /></Field>
          <Field label="Plant & machinery"><Text value={form.costPlant} onChange={onlyDigits(set("costPlant"))} placeholder="₹" inputMode="numeric" /></Field>
          <Field label="Working capital"><Text value={form.costWorkingCapital} onChange={onlyDigits(set("costWorkingCapital"))} placeholder="₹" inputMode="numeric" /></Field>
          <Field label="Contingency"><Text value={form.costContingency} onChange={onlyDigits(set("costContingency"))} placeholder="₹" inputMode="numeric" /></Field>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Funding — Debt (₹)" error={errors.fundingDebt}>
          <Text value={form.fundingDebt} onChange={onlyDigits(set("fundingDebt"))} placeholder="₹" inputMode="numeric" error={errors.fundingDebt} />
        </Field>
        <Field label="Funding — Equity (₹)" error={errors.fundingEquity}>
          <Text value={form.fundingEquity} onChange={onlyDigits(set("fundingEquity"))} placeholder="₹" inputMode="numeric" error={errors.fundingEquity} />
        </Field>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Projected revenue / cashflow (3 years)</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Year 1"><Text value={form.projRevenueY1} onChange={onlyDigits(set("projRevenueY1"))} placeholder="₹" inputMode="numeric" /></Field>
          <Field label="Year 2"><Text value={form.projRevenueY2} onChange={onlyDigits(set("projRevenueY2"))} placeholder="₹" inputMode="numeric" /></Field>
          <Field label="Year 3"><Text value={form.projRevenueY3} onChange={onlyDigits(set("projRevenueY3"))} placeholder="₹" inputMode="numeric" /></Field>
        </div>
      </div>

      <Field label="Key milestones & estimated costs" error={errors.milestones}>
        <TextArea value={form.milestones} onChange={set("milestones")} placeholder="Key milestones and estimated cost per milestone" error={errors.milestones} />
      </Field>
      <Field label="Buyers / offtake agreements" hint="If any">
        <TextArea value={form.offtakeAgreements} onChange={set("offtakeAgreements")} placeholder="Buyers / offtake agreements" />
      </Field>
      <FileRow label="CA-certified projections" name={form.docCaProjections} onChange={setFile("docCaProjections")} />
    </div>
  );
}

/* ---------- Step 7: Collateral & Title ---------- */

function StepCollateral({ form, set, setChoice, setFile, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Collateral &amp; land / title</h2>

      <Field label="Type of security" error={errors.securityType}>
        <Pills value={form.securityType} onSelect={setChoice("securityType")} options={["Land", "Building", "Hypothecation"]} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Owner name" error={errors.ownerName}>
          <Text value={form.ownerName} onChange={set("ownerName")} placeholder="Owner name" error={errors.ownerName} />
        </Field>
        <Field label="Estimated market value (₹)" error={errors.marketValue}>
          <Text value={form.marketValue} onChange={onlyDigits(set("marketValue"))} placeholder="₹" inputMode="numeric" error={errors.marketValue} />
        </Field>
      </div>

      <Field label="Encumbrance status" error={errors.encumbranceStatus}>
        <Text value={form.encumbranceStatus} onChange={set("encumbranceStatus")} placeholder="e.g. Free from encumbrance / Mortgaged" error={errors.encumbranceStatus} />
      </Field>

      <div className="space-y-4 border-t border-slate-100 pt-4">
        <h3 className="text-sm font-semibold text-slate-700">Documents</h3>
        <FileRow label="Title deed / Sale deed" required name={form.docTitleDeed} onChange={setFile("docTitleDeed")} error={errors.docTitleDeed} />
        <FileRow label="Encumbrance certificate (EC)" required name={form.docEncumbranceCert} onChange={setFile("docEncumbranceCert")} error={errors.docEncumbranceCert} />
        <FileRow label="Property tax receipts" name={form.docPropertyTax} onChange={setFile("docPropertyTax")} />
        <FileRow label="Valuation report (if done)" name={form.docValuationReport} onChange={setFile("docValuationReport")} />
        <FileRow label="NOCs" name={form.docNoc} onChange={setFile("docNoc")} />
        <FileRow label="Land-use certificate" name={form.docLandUseCert} onChange={setFile("docLandUseCert")} />
        <FileRow label="Lease agreement (if leased)" name={form.docLeaseAgreement} onChange={setFile("docLeaseAgreement")} />
      </div>
    </div>
  );
}

/* ---------- Step 8: Permissions & Licenses ---------- */

function StepPermissions({ form, setFile, errors }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Permissions, licenses &amp; approvals</h2>
      <p className="text-sm text-slate-500">Upload the documents below (PDF, JPG or PNG).</p>
      <FileRow label="Building plan approval" required name={form.docBuildingPlan} onChange={setFile("docBuildingPlan")} error={errors.docBuildingPlan} />
      <FileRow label="Environmental clearance (if needed)" name={form.docEnvClearance} onChange={setFile("docEnvClearance")} />
      <FileRow label="Power connection / utility approval" name={form.docPowerApproval} onChange={setFile("docPowerApproval")} />
      <FileRow label="Trade / factory license" required name={form.docTradeLicense} onChange={setFile("docTradeLicense")} error={errors.docTradeLicense} />
      <FileRow label="Concession agreement (BOT/PPP)" name={form.docConcessionAgreement} onChange={setFile("docConcessionAgreement")} />
      <FileRow label="Other government approvals" name={form.docGovtApprovals} onChange={setFile("docGovtApprovals")} />
    </div>
  );
}

/* ---------- Step 9: Review ---------- */

function ReviewBlock({ title, stepNo, goToStep, rows }) {
  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <button type="button" onClick={() => goToStep(stepNo)} className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
      <dl className="divide-y divide-slate-50">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 px-4 py-2.5 text-sm">
            <dt className="w-44 shrink-0 text-slate-500">{label}</dt>
            <dd className="text-slate-800">{value || <span className="text-slate-400">—</span>}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StepReview({ form, goToStep }) {
  const accumn = usesAccumn(form);
  const sectorLabel = form.sector === "Other" && form.sectorOther ? `Other — ${form.sectorOther}` : form.sector;
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-slate-500">Check everything below. Use “Edit” on any section to go back — your other answers stay saved.</p>
      </div>

      <ReviewBlock title="Eligibility" stepNo={1} goToStep={goToStep} rows={[
        ["Applicant type", form.applicantType],
        ["Sector", sectorLabel],
        ["Project cost", form.projectCost && `₹ ${form.projectCost}`],
        ["Preferred loan", form.preferredLoanAmount && `₹ ${form.preferredLoanAmount}`],
        ["Collateral type", form.collateralType],
        ["Collateral value", form.collateralValue && `₹ ${form.collateralValue}`],
        ["Project report?", form.hasProjectReport],
        ["Turnover Y1/Y2/Y3", [form.turnoverY1, form.turnoverY2, form.turnoverY3].filter(Boolean).join(" / ")],
        ["Political background", form.politicalBackground],
      ]} />

      <ReviewBlock title="e-KYC" stepNo={2} goToStep={goToStep} rows={[
        ["Method", form.kycMethod],
        ["PAN", form.pan],
        ["Aadhaar", form.aadhaar],
      ]} />

      <ReviewBlock title="CIBIL" stepNo={3} goToStep={goToStep} rows={[["Consent", form.cibilConsent ? "Given" : "Not given"]]} />

      <ReviewBlock title="Bank fetch" stepNo={4} goToStep={goToStep} rows={[["Accumn fetch", form.accumnConsent === "Yes" ? "Yes (auto-fetch)" : form.accumnConsent === "No" ? "No (manual upload)" : ""]]} />

      {!accumn && (
        <ReviewBlock title="Financial documents" stepNo={5} goToStep={goToStep} rows={[
          ["GST returns", form.docGstReturns],
          ["Practice receipts", form.docPracticeReceipts],
          ["Bank statement (12 mo)", form.docBankStatement12],
        ]} />
      )}

      <ReviewBlock title="Project details" stepNo={6} goToStep={goToStep} rows={[
        ["Title", form.projectTitle],
        ["Duration", [form.projectStart, form.projectEnd].filter(Boolean).join(" → ")],
        ["Funding (D/E)", [form.fundingDebt && `₹${form.fundingDebt}`, form.fundingEquity && `₹${form.fundingEquity}`].filter(Boolean).join(" / ")],
        ["CA projections", form.docCaProjections],
      ]} />

      <ReviewBlock title="Collateral & title" stepNo={7} goToStep={goToStep} rows={[
        ["Security type", form.securityType],
        ["Owner name", form.ownerName],
        ["Market value", form.marketValue && `₹ ${form.marketValue}`],
        ["Encumbrance", form.encumbranceStatus],
        ["Title deed", form.docTitleDeed],
        ["EC", form.docEncumbranceCert],
      ]} />

      <ReviewBlock title="Permissions & licenses" stepNo={8} goToStep={goToStep} rows={[
        ["Building plan", form.docBuildingPlan],
        ["Trade license", form.docTradeLicense],
        ["Env. clearance", form.docEnvClearance],
        ["Power approval", form.docPowerApproval],
      ]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  BANK OFFERS                                                        */
/* ------------------------------------------------------------------ */

function BankOffers({ onApply, onBack }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-10">
      <button onClick={onBack} className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <h2 className="text-2xl font-bold text-slate-900">Bank offers for you</h2>
      <p className="mt-1 text-sm text-slate-500">Based on your details, here are matched offers. Choose a bank to apply.</p>

      <div className="mt-6 space-y-4">
        {BANK_OFFERS.map((bank) => (
          <div key={bank.name} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {bank.bestSuited && (
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">★ Best Suited For You</span>
            )}
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-[#001f54]"><Landmark className="h-5 w-5" /></span>
              <h3 className="text-lg font-bold text-slate-900">{bank.name}</h3>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:items-end">
              <div><p className="text-xs text-slate-400">Max. Loan Amount</p><p className="text-base font-bold text-slate-800">{bank.maxAmount}</p></div>
              <div><p className="text-xs text-slate-400">ROI Starting at</p><p className="text-base font-bold text-slate-800">{bank.roi}</p><p className="text-[11px] text-slate-400">APR: {bank.apr}</p></div>
              <div><p className="text-xs text-slate-400">EMI</p><p className="text-base font-bold text-slate-800">{bank.emi}</p></div>
              <div><p className="text-xs text-slate-400">Processing Fees</p><p className="text-base font-bold text-slate-800">{bank.fees}</p></div>
              <div className="col-span-2 sm:col-span-1">
                <button onClick={() => onApply(bank.name)} className="w-full rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">Apply Now</button>
                <p className="mt-2 text-center text-xs font-medium text-blue-600">KFS, Charges &amp; APR</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-center text-sm font-medium text-green-700">10,000+ people took a loan in the last 30 days</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  REJECTED / SUCCESS                                                 */
/* ------------------------------------------------------------------ */

function Rejected({ score, onReset }) {
  return (
    <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-100 text-red-600"><XCircle className="h-8 w-8" /></div>
        <h2 className="mt-6 text-2xl font-bold">Application not eligible</h2>
        <p className="mt-2 text-slate-600">Based on the credit bureau check{score ? ` (score: ${score})` : ""}, we are unable to proceed with your project loan application at this time. You can re-apply once your credit profile improves.</p>
        <button onClick={onReset} className="mt-8 rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white hover:bg-slate-800">Start over</button>
      </div>
    </section>
  );
}

function Success({ onReset }) {
  return (
    <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600"><Check className="h-8 w-8" /></div>
        <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
        <p className="mt-2 text-slate-600">Your project loan application has been submitted. Our team will reach out within 24 hours.</p>
        <button onClick={onReset} className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Start a new application</button>
      </div>
    </section>
  );
}