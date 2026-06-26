

// // vaidation used nhi hai 

// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// import { useState } from "react";
// import {
//   Building2,
//   ShieldCheck,
//   Clock3,
//   BadgeCheck,
//   Upload,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   Pencil,
// } from "lucide-react";

// /* ------------------------------------------------------------------ */
// /*  Lease Rental Discounting — Loan Page                               */
// /*  Step 1 = the hero + lead form (matches the screenshot you sent)    */
// /*  Steps 1–5 (wizard) = the application flow, each with validation    */
// /* ------------------------------------------------------------------ */

// const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
// const PROPERTY_TYPES = [
//   "Residential",
//   "Commercial",
//   "Industrial",
//   "Plot",
//   "School",
//   "College",
//   "Nursing Home",
//   "Others",
// ];
// const TENANT_TYPES = ["Company", "Proprietor", "LLP", "Partnership"];
// const LOAN_TYPES = ["Fresh", "BT Transfer"];

// const STEP_LABELS = ["Lessor", "Tenant", "Loan Amount", "Loan Type", "Documents"];

// /* Name = letters and spaces only, at least 3 characters */
// const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
// const MOBILE_RE = /^[6-9]\d{9}$/;

// const initialForm = {
//   // Step 1 — Lessor
//   lessorEntity: "",
//   lessorName: "",
//   propertyAddress: "",
//   propertyType: "",
//   propertyValue: "",
//   rentalAmount: "",
//   // Step 2 — Tenant
//   tenantEntity: "",
//   tenantName: "",
//   leasePeriod: "",
//   leaseStartDate: "",
//   // Step 3 — Loan amount
//   loanAmount: "",
//   // Step 4 — Loan type
//   loanType: "",
//   // Step 5 — Documents
//   files: {},
// };

// /* ------------------------------------------------------------------ */
// /*  Validation: returns an object of { fieldName: errorMessage }       */
// /* ------------------------------------------------------------------ */

// function validateStep(step, form) {
//   const e = {};

//   if (step === 1) {
//     if (!form.lessorEntity) e.lessorEntity = "Select the lessor entity type.";
//     if (!form.lessorName.trim()) e.lessorName = "Lessor name is required.";
//     else if (!NAME_RE.test(form.lessorName.trim()))
//       e.lessorName = "Name can contain letters and spaces only.";
//     if (!form.propertyAddress.trim())
//       e.propertyAddress = "Property address is required.";
//     if (!form.propertyType) e.propertyType = "Select a property type.";
//     if (!form.propertyValue.trim())
//       e.propertyValue = "Property value is required.";
//     else if (!/^\d+$/.test(form.propertyValue))
//       e.propertyValue = "Enter a valid amount in numbers.";
//     if (!form.rentalAmount.trim())
//       e.rentalAmount = "Monthly rental amount is required.";
//     else if (!/^\d+$/.test(form.rentalAmount))
//       e.rentalAmount = "Enter a valid amount in numbers.";
//   }

//   if (step === 2) {
//     if (!form.tenantEntity) e.tenantEntity = "Select the tenant entity type.";
//     if (!form.tenantName.trim()) e.tenantName = "Tenant name is required.";
//     else if (!NAME_RE.test(form.tenantName.trim()))
//       e.tenantName = "Name can contain letters and spaces only.";
//     if (!form.leasePeriod.trim())
//       e.leasePeriod = "Total lease period is required.";
//     if (!form.leaseStartDate)
//       e.leaseStartDate = "Lease commencement date is required.";
//   }

//   if (step === 3) {
//     if (!form.loanAmount.trim())
//       e.loanAmount = "Loan amount is required.";
//     else if (!/^\d+$/.test(form.loanAmount))
//       e.loanAmount = "Enter a valid amount in numbers.";
//   }

//   if (step === 4) {
//     if (!form.loanType) e.loanType = "Select a loan type.";
//   }

//   if (step === 5) {
//     if (!form.files?.bankStatement)
//       e.bankStatement = "Bank statement is required.";
//     if (!form.files?.propertyPapers)
//       e.propertyPapers = "Property papers are required.";
//     if (form.loanType === "BT Transfer") {
//       if (!form.files?.sanctionLetter)
//         e.sanctionLetter = "Sanction letter is required for balance transfer.";
//       if (!form.files?.soa)
//         e.soa = "Statement of account is required for balance transfer.";
//     }
//   }

//   return e;
// }

// export default function LeaseRentalLoan() {
//   const [started, setStarted] = useState(false);
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState(initialForm);
//   const [errors, setErrors] = useState({});
//   const [submitted, setSubmitted] = useState(false);

//   const set = (key) => (e) => {
//     const value = e.target?.value ?? e;
//     setForm((f) => ({ ...f, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: undefined }));
//   };

//   const setChoice = (key) => (value) => {
//     setForm((f) => ({ ...f, [key]: value }));
//     setErrors((prev) => ({ ...prev, [key]: undefined }));
//   };

//   const setFile = (key) => (e) => {
//     const fname = e.target.files?.[0]?.name || "";
//     setForm((f) => ({ ...f, files: { ...f.files, [key]: fname } }));
//     setErrors((prev) => ({ ...prev, [key]: undefined }));
//   };

//   const next = () => {
//     const e = validateStep(step, form);
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }
//     setErrors({});
//     setStep((s) => Math.min(s + 1, 5));
//   };

//   const back = () => {
//     setErrors({});
//     setStep((s) => Math.max(s - 1, 1));
//   };

//   const submit = () => {
//     const e = validateStep(5, form);
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }
//     setErrors({});
//     setSubmitted(true);
//   };

//   const reset = () => {
//     setForm(initialForm);
//     setErrors({});
//     setStep(1);
//     setSubmitted(false);
//     setStarted(false);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-slate-50 text-slate-900">
//         {!started ? (
//           <Hero onStart={() => setStarted(true)} />
//         ) : submitted ? (
//           <Success onReset={reset} />
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
//             onSubmit={submit}
//           />
//         )}
//       </div>
//       <Footer />
//     </>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  HERO (lead capture — validates name + mobile before starting)     */
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
//     <section className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
//       <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
//         {/* Left column */}
//         <div>
//           <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
//             Lease Rental Discounting
//           </h1>
//           <p className="mt-4 max-w-xl text-slate-600">
//             Unlock the value of your rent-generating property. Get a loan
//             against your future rental income from 30+ Banks and NBFCs — one
//             application, customized offers, and fast disbursal. 100% digital
//             process with expert assistance.
//           </p>

//           <ul className="mt-8 space-y-5">
//             <Feature
//               icon={<Building2 className="h-5 w-5" />}
//               title="Loan against rent"
//               text="Borrow up to 145% of property value based on your lease."
//             />
//             <Feature
//               icon={<Clock3 className="h-5 w-5" />}
//               title="Quick turnaround"
//               text="Fast sanction with minimal physical paperwork."
//             />
//             <Feature
//               icon={<BadgeCheck className="h-5 w-5" />}
//               title="Fresh or balance transfer"
//               text="Switch an existing loan or apply for a new one."
//             />
//             <Feature
//               icon={<ShieldCheck className="h-5 w-5" />}
//               title="RBI-approved lenders"
//               text="Bank-grade security and no spam calls."
//             />
//           </ul>
//         </div>

//         {/* Right column — lead card */}
//         <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
//           <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
//             Get cashback up to <span className="font-semibold">₹1,000*</span> on
//             loan disbursal · <span className="text-xs">*T&amp;C apply</span>
//           </div>

//           <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
//             Lease Rental Loan
//           </p>
//           <p className="mt-1 text-center text-2xl font-bold">
//             Get up to <span className="text-blue-600">₹50 Lakhs</span> starting
//             at <span className="text-blue-600 underline">9.98%</span>
//           </p>

//           <div className="mt-6 space-y-4">
//             <div>
//               <input
//                 value={name}
//                 onChange={(e) => {
//                   // letters and spaces only — block digits as the user types
//                   setName(e.target.value.replace(/[^A-Za-z\s]/g, ""));
//                   setErr((p) => ({ ...p, name: undefined }));
//                 }}
//                 placeholder="Full Name (as on your PAN)"
//                 className={`w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500 ${
//                   err.name ? "border-red-400" : "border-slate-300"
//                 }`}
//               />
//               {err.name && <ErrorText>{err.name}</ErrorText>}
//             </div>

//             <div>
//               <div
//                 className={`rounded-lg border px-3 py-2 ${
//                   err.mobile ? "border-red-400" : "border-blue-500"
//                 }`}
//               >
//                 <label className="text-xs text-blue-600">Mobile Number</label>
//                 <div className="flex items-center gap-2">
//                   <span className="text-slate-700">🇮🇳 +91</span>
//                   <input
//                     value={mobile}
//                     onChange={(e) => {
//                       setMobile(e.target.value.replace(/\D/g, "").slice(0, 10));
//                       setErr((p) => ({ ...p, mobile: undefined }));
//                     }}
//                     placeholder="10-digit mobile number"
//                     className="w-full bg-transparent py-1 outline-none"
//                     inputMode="numeric"
//                   />
//                   <Pencil className="h-4 w-4 text-slate-400" />
//                 </div>
//               </div>
//               {err.mobile && <ErrorText>{err.mobile}</ErrorText>}
//             </div>

//             <button
//               onClick={handleStart}
//               className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
//             >
//               Check Eligibility <ArrowRight className="h-4 w-4" />
//             </button>

//             <label className="flex items-start gap-2 text-xs text-slate-500">
//               <input
//                 type="checkbox"
//                 checked={agree}
//                 onChange={(e) => {
//                   setAgree(e.target.checked);
//                   setErr((p) => ({ ...p, agree: undefined }));
//                 }}
//                 className="mt-0.5"
//               />
//               <span>
//                 By submitting this form, you agree to the Credit Report Terms of
//                 Use, Terms of Use &amp; Privacy Policy.
//               </span>
//             </label>
//             {err.agree && <ErrorText>{err.agree}</ErrorText>}
//           </div>
//         </div>
//       </div>

//       {/* Trust strip */}
//       <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center">
//         <Stat value="5.7cr+" label="Customers served" />
//         <Stat value="65+" label="Partner lenders" />
//         <Stat value="₹65k Cr+" label="Loans disbursed" />
//       </div>
//     </section>
//   );
// }

// function Feature({ icon, title, text }) {
//   return (
//     <li className="flex gap-3">
//       <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600">
//         {icon}
//       </span>
//       <div>
//         <p className="font-semibold">{title}</p>
//         <p className="text-sm text-slate-500">{text}</p>
//       </div>
//     </li>
//   );
// }

// function Stat({ value, label }) {
//   return (
//     <div>
//       <p className="text-2xl font-bold">{value}</p>
//       <p className="text-sm text-slate-500">{label}</p>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  WIZARD (Steps 1–5)                                                 */
// /* ------------------------------------------------------------------ */

// function Wizard({ step, form, errors, set, setChoice, setFile, next, back, onSubmit }) {
//   return (
//     <section className="mx-auto max-w-3xl px-5 py-10">
//       <Stepper step={step} />

//       <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
//         {step === 1 && <StepLessor form={form} set={set} setChoice={setChoice} errors={errors} />}
//         {step === 2 && <StepTenant form={form} set={set} setChoice={setChoice} errors={errors} />}
//         {step === 3 && <StepLoanAmount form={form} set={set} errors={errors} />}
//         {step === 4 && <StepLoanType form={form} setChoice={setChoice} errors={errors} />}
//         {step === 5 && <StepDocuments form={form} setFile={setFile} errors={errors} />}

//         <div className="mt-8 flex items-center justify-between">
//           <button
//             onClick={back}
//             disabled={step === 1}
//             className="flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 disabled:opacity-40"
//           >
//             <ArrowLeft className="h-4 w-4" /> Back
//           </button>

//           {step < 5 ? (
//             <button
//               onClick={next}
//               className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//             >
//               Continue <ArrowRight className="h-4 w-4" />
//             </button>
//           ) : (
//             <button
//               onClick={onSubmit}
//               className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
//             >
//               Submit application <Check className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// function Stepper({ step }) {
//   return (
//     <div className="flex items-center justify-between">
//       {STEP_LABELS.map((label, i) => {
//         const n = i + 1;
//         const active = n === step;
//         const done = n < step;
//         return (
//           <div key={label} className="flex flex-1 items-center">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
//                   done
//                     ? "bg-emerald-600 text-white"
//                     : active
//                     ? "bg-blue-600 text-white"
//                     : "bg-slate-200 text-slate-500"
//                 }`}
//               >
//                 {done ? <Check className="h-4 w-4" /> : n}
//               </div>
//               <span className="mt-2 hidden text-xs text-slate-500 sm:block">
//                 {label}
//               </span>
//             </div>
//             {n < STEP_LABELS.length && (
//               <div
//                 className={`mx-1 h-0.5 flex-1 ${
//                   n < step ? "bg-emerald-600" : "bg-slate-200"
//                 }`}
//               />
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
//       <span className="mb-1.5 block text-sm font-medium text-slate-700">
//         {label}
//       </span>
//       {children}
//       {error ? (
//         <ErrorText>{error}</ErrorText>
//       ) : (
//         hint && <span className="mt-1 block text-xs text-slate-400">{hint}</span>
//       )}
//     </label>
//   );
// }

// function Text({ value, onChange, error, ...rest }) {
//   return (
//     <input
//       value={value}
//       onChange={onChange}
//       className={`w-full rounded-lg border px-4 py-2.5 outline-none focus:border-blue-500 ${
//         error ? "border-red-400" : "border-slate-300"
//       }`}
//       {...rest}
//     />
//   );
// }

// function Select({ value, onChange, options, placeholder, error }) {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       className={`w-full rounded-lg border bg-white px-4 py-2.5 outline-none focus:border-blue-500 ${
//         error ? "border-red-400" : "border-slate-300"
//       }`}
//     >
//       <option value="">{placeholder}</option>
//       {options.map((o) => (
//         <option key={o} value={o}>
//           {o}
//         </option>
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
//             value === o
//               ? "border-blue-600 bg-blue-50 text-blue-700"
//               : "border-slate-300 text-slate-600 hover:border-slate-400"
//           }`}
//         >
//           {o}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ---------- Step 1: Lessor ---------- */

// function StepLessor({ form, set, setChoice, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Lessor (property owner) details</h2>

//       <Field label="Type of entity (Lessor)" error={errors.lessorEntity}>
//         <Pills
//           value={form.lessorEntity}
//           onSelect={setChoice("lessorEntity")}
//           options={ENTITY_TYPES}
//         />
//       </Field>

//       <Field label="Lessor name" error={errors.lessorName}>
//         <Text
//           value={form.lessorName}
//           onChange={(e) =>
//             set("lessorName")({
//               target: { value: e.target.value.replace(/[^A-Za-z\s]/g, "") },
//             })
//           }
//           placeholder="Name as per records"
//           error={errors.lessorName}
//         />
//       </Field>

//       <Field label="Property address" error={errors.propertyAddress}>
//         <Text
//           value={form.propertyAddress}
//           onChange={set("propertyAddress")}
//           placeholder="Current property address"
//           error={errors.propertyAddress}
//         />
//       </Field>

//       <Field label="Property type" error={errors.propertyType}>
//         <Select
//           value={form.propertyType}
//           onChange={set("propertyType")}
//           options={PROPERTY_TYPES}
//           placeholder="Select property type"
//           error={errors.propertyType}
//         />
//       </Field>

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field
//           label="Property value (market)"
//           hint="LTV up to 145% as per property"
//           error={errors.propertyValue}
//         >
//           <Text
//             value={form.propertyValue}
//             onChange={(e) =>
//               set("propertyValue")({
//                 target: { value: e.target.value.replace(/\D/g, "") },
//               })
//             }
//             placeholder="₹ in INR"
//             inputMode="numeric"
//             error={errors.propertyValue}
//           />
//         </Field>
//         <Field label="Monthly rental amount" error={errors.rentalAmount}>
//           <Text
//             value={form.rentalAmount}
//             onChange={(e) =>
//               set("rentalAmount")({
//                 target: { value: e.target.value.replace(/\D/g, "") },
//               })
//             }
//             placeholder="₹ in INR"
//             inputMode="numeric"
//             error={errors.rentalAmount}
//           />
//         </Field>
//       </div>
//     </div>
//   );
// }

// /* ---------- Step 2: Tenant ---------- */

// function StepTenant({ form, set, setChoice, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Tenant &amp; lease details</h2>

//       <Field label="Tenant entity" error={errors.tenantEntity}>
//         <Pills
//           value={form.tenantEntity}
//           onSelect={setChoice("tenantEntity")}
//           options={TENANT_TYPES}
//         />
//       </Field>

//       <Field label="Tenant name" error={errors.tenantName}>
//         <Text
//           value={form.tenantName}
//           onChange={(e) =>
//             set("tenantName")({
//               target: { value: e.target.value.replace(/[^A-Za-z\s]/g, "") },
//             })
//           }
//           placeholder="Tenant / lessee name"
//           error={errors.tenantName}
//         />
//       </Field>

//       <div className="grid gap-5 sm:grid-cols-2">
//         <Field label="Total lease period" error={errors.leasePeriod}>
//           <Text
//             value={form.leasePeriod}
//             onChange={set("leasePeriod")}
//             placeholder="e.g. 9 years"
//             error={errors.leasePeriod}
//           />
//         </Field>
//         <Field label="Lease commencement date" error={errors.leaseStartDate}>
//           <Text
//             type="date"
//             value={form.leaseStartDate}
//             onChange={set("leaseStartDate")}
//             error={errors.leaseStartDate}
//           />
//         </Field>
//       </div>
//     </div>
//   );
// }

// /* ---------- Step 3: Loan amount ---------- */

// function StepLoanAmount({ form, set, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Loan requirement</h2>
//       <Field
//         label="Loan amount required"
//         hint="Subject to eligibility and property valuation"
//         error={errors.loanAmount}
//       >
//         <Text
//           value={form.loanAmount}
//           onChange={(e) =>
//             set("loanAmount")({
//               target: { value: e.target.value.replace(/\D/g, "") },
//             })
//           }
//           placeholder="₹ in INR"
//           inputMode="numeric"
//           error={errors.loanAmount}
//         />
//       </Field>
//     </div>
//   );
// }

// /* ---------- Step 4: Loan type ---------- */

// function StepLoanType({ form, setChoice, errors }) {
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Loan type</h2>
//       <Field label="Select loan type" error={errors.loanType}>
//         <Pills
//           value={form.loanType}
//           onSelect={setChoice("loanType")}
//           options={LOAN_TYPES}
//         />
//       </Field>
//       {form.loanType === "BT Transfer" && (
//         <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
//           For balance transfer, you'll need to upload your existing Sanction
//           Letter and Statement of Account in the next step.
//         </p>
//       )}
//     </div>
//   );
// }

// /* ---------- Step 5: Documents ---------- */

// function StepDocuments({ form, setFile, errors }) {
//   const isBT = form.loanType === "BT Transfer";
//   return (
//     <div className="space-y-5">
//       <h2 className="text-lg font-semibold">Document upload</h2>

//       <FileRow
//         label="Bank Statement"
//         required
//         name={form.files.bankStatement}
//         onChange={setFile("bankStatement")}
//         error={errors.bankStatement}
//       />
//       <FileRow
//         label="Property Papers"
//         required
//         name={form.files.propertyPapers}
//         onChange={setFile("propertyPapers")}
//         error={errors.propertyPapers}
//       />
//       <FileRow
//         label="Lease Agreement"
//         name={form.files.leaseAgreement}
//         onChange={setFile("leaseAgreement")}
//       />
//       <FileRow
//         label="Electricity Bill"
//         name={form.files.electricityBill}
//         onChange={setFile("electricityBill")}
//       />

//       {isBT && (
//         <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
//           <p className="mb-3 text-sm font-semibold text-amber-800">
//             Balance transfer documents
//           </p>
//           <div className="space-y-3">
//             <FileRow
//               label="Sanction Letter"
//               required
//               name={form.files.sanctionLetter}
//               onChange={setFile("sanctionLetter")}
//               error={errors.sanctionLetter}
//             />
//             <FileRow
//               label="Statement of Account (SOA)"
//               required
//               name={form.files.soa}
//               onChange={setFile("soa")}
//               error={errors.soa}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function FileRow({ label, required, name, onChange, error }) {
//   return (
//     <div>
//       <div
//         className={`flex items-center justify-between rounded-lg border px-4 py-3 ${
//           error ? "border-red-400" : "border-slate-200"
//         }`}
//       >
//         <div>
//           <p className="text-sm font-medium text-slate-700">
//             {label} {required && <span className="text-red-500">*</span>}
//           </p>
//           {name ? (
//             <p className="text-xs text-emerald-600">{name}</p>
//           ) : (
//             <p className="text-xs text-slate-400">PDF, JPG or PNG</p>
//           )}
//         </div>
//         <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
//           <Upload className="h-4 w-4" /> Upload
//           <input type="file" className="hidden" onChange={onChange} />
//         </label>
//       </div>
//       {error && <ErrorText>{error}</ErrorText>}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  SUCCESS                                                            */
// /* ------------------------------------------------------------------ */

// function Success({ onReset }) {
//   return (
//     <section className="mx-auto grid min-h-screen max-w-xl place-items-center px-5 text-center">
//       <div>
//         <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
//           <Check className="h-8 w-8" />
//         </div>
//         <h2 className="mt-6 text-2xl font-bold">Application submitted</h2>
//         <p className="mt-2 text-slate-600">
//           Our team will review your lease rental discounting application and
//           reach out within 24 hours with matched offers.
//         </p>
//         <button
//           onClick={onReset}
//           className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
//         >
//           Start a new application
//         </button>
//       </div>
//     </section>
//   );
// }

// == modify code add previous 

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { useState } from "react";
import {
  Building2,
  ShieldCheck,
  Clock3,
  BadgeCheck,
  Upload,
  ArrowRight,
  ArrowLeft,
  Check,
  Pencil,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Lease Rental Discounting — Loan Page                               */
/*  Hero = lead capture (name + mobile)                                */
/*  Wizard steps 1–5 = application flow, each with validation          */
/*  Step 6 = Review (check / edit any previous step before submitting) */
/* ------------------------------------------------------------------ */

const ENTITY_TYPES = ["Proprietor", "Partnership", "Pvt Ltd", "LLP", "Others"];
const PROPERTY_TYPES = [
  "Residential",
  "Commercial",
  "Industrial",
  "Plot",
  "School",
  "College",
  "Nursing Home",
  "Others",
];
const TENANT_TYPES = ["Company", "Proprietor", "LLP", "Partnership"];
const LOAN_TYPES = ["Fresh", "BT Transfer"];

const STEP_LABELS = [
  "Lessor",
  "Tenant",
  "Loan Amount",
  "Loan Type",
  "Documents",
  "Review",
];

/* Name = letters and spaces only, at least 3 characters */
const NAME_RE = /^[A-Za-z][A-Za-z\s]{2,}$/;
const MOBILE_RE = /^[6-9]\d{9}$/;

const initialForm = {
  // Step 1 — Lessor
  lessorEntity: "",
  lessorName: "",
  propertyAddress: "",
  propertyType: "",
  propertyValue: "",
  rentalAmount: "",
  // Step 2 — Tenant
  tenantEntity: "",
  tenantName: "",
  leasePeriod: "",
  leaseStartDate: "",
  // Step 3 — Loan amount
  loanAmount: "",
  // Step 4 — Loan type
  loanType: "",
  // Step 5 — Documents
  files: {},
};

/* ------------------------------------------------------------------ */
/*  Validation: returns { fieldName: errorMessage }                    */
/* ------------------------------------------------------------------ */

function validateStep(step, form) {
  const e = {};

  if (step === 1) {
    if (!form.lessorEntity) e.lessorEntity = "Select the lessor entity type.";
    if (!form.lessorName.trim()) e.lessorName = "Lessor name is required.";
    else if (!NAME_RE.test(form.lessorName.trim()))
      e.lessorName = "Name can contain letters and spaces only.";
    if (!form.propertyAddress.trim())
      e.propertyAddress = "Property address is required.";
    if (!form.propertyType) e.propertyType = "Select a property type.";
    if (!form.propertyValue.trim())
      e.propertyValue = "Property value is required.";
    else if (!/^\d+$/.test(form.propertyValue))
      e.propertyValue = "Enter a valid amount in numbers.";
    if (!form.rentalAmount.trim())
      e.rentalAmount = "Monthly rental amount is required.";
    else if (!/^\d+$/.test(form.rentalAmount))
      e.rentalAmount = "Enter a valid amount in numbers.";
  }

  if (step === 2) {
    if (!form.tenantEntity) e.tenantEntity = "Select the tenant entity type.";
    if (!form.tenantName.trim()) e.tenantName = "Tenant name is required.";
    else if (!NAME_RE.test(form.tenantName.trim()))
      e.tenantName = "Name can contain letters and spaces only.";
    if (!form.leasePeriod.trim())
      e.leasePeriod = "Total lease period is required.";
    if (!form.leaseStartDate)
      e.leaseStartDate = "Lease commencement date is required.";
  }

  if (step === 3) {
    if (!form.loanAmount.trim()) e.loanAmount = "Loan amount is required.";
    else if (!/^\d+$/.test(form.loanAmount))
      e.loanAmount = "Enter a valid amount in numbers.";
  }

  if (step === 4) {
    if (!form.loanType) e.loanType = "Select a loan type.";
  }

  if (step === 5) {
    if (!form.files?.bankStatement)
      e.bankStatement = "Bank statement is required.";
    if (!form.files?.propertyPapers)
      e.propertyPapers = "Property papers are required.";
    if (form.loanType === "BT Transfer") {
      if (!form.files?.sanctionLetter)
        e.sanctionLetter = "Sanction letter is required for balance transfer.";
      if (!form.files?.soa)
        e.soa = "Statement of account is required for balance transfer.";
    }
  }

  return e;
}

export default function LeaseRentalLoan() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => {
    const value = e.target?.value ?? e;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setChoice = (key) => (value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const setFile = (key) => (e) => {
    const fname = e.target.files?.[0]?.name || "";
    setForm((f) => ({ ...f, files: { ...f.files, [key]: fname } }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

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

  // Jump straight to a specific step (used by the Review screen's Edit links)
  const goToStep = (target) => {
    setErrors({});
    setStep(target);
  };

  const submit = () => {
    const e = validateStep(5, form);
    if (Object.keys(e).length) {
      setErrors(e);
      setStep(5); // send them back to fix the missing documents
      return;
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
/*  HERO (lead capture — validates name + mobile before starting)     */
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
    <section className="mx-auto max-w-6xl px-5 py-10 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        {/* Left column */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Lease Rental Discounting
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Unlock the value of your rent-generating property. Get a loan
            against your future rental income from 30+ Banks and NBFCs — one
            application, customized offers, and fast disbursal. 100% digital
            process with expert assistance.
          </p>

          <ul className="mt-8 space-y-5">
            <Feature
              icon={<Building2 className="h-5 w-5" />}
              title="Loan against rent"
              text="Borrow up to 145% of property value based on your lease."
            />
            <Feature
              icon={<Clock3 className="h-5 w-5" />}
              title="Quick turnaround"
              text="Fast sanction with minimal physical paperwork."
            />
            <Feature
              icon={<BadgeCheck className="h-5 w-5" />}
              title="Fresh or balance transfer"
              text="Switch an existing loan or apply for a new one."
            />
            <Feature
              icon={<ShieldCheck className="h-5 w-5" />}
              title="RBI-approved lenders"
              text="Bank-grade security and no spam calls."
            />
          </ul>
        </div>

        {/* Right column — lead card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Get cashback up to <span className="font-semibold">₹1,000*</span> on
            loan disbursal · <span className="text-xs">*T&amp;C apply</span>
          </div>

          <p className="mt-6 text-center text-sm uppercase tracking-widest text-slate-400">
            Lease Rental Loan
          </p>
          <p className="mt-1 text-center text-2xl font-bold">
            Get up to <span className="text-blue-600">₹50 Lakhs</span> starting
            at <span className="text-blue-600 underline">9.98%</span>
          </p>

          <div className="mt-6 space-y-4">
            <div>
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
              <label className="mb-1 block text-xs font-medium text-blue-600">
                Mobile Number
              </label>
              <div
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${
                  err.mobile ? "border-red-400" : "border-blue-500"
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
                <Pencil className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
              {err.mobile && <ErrorText>{err.mobile}</ErrorText>}
            </div>

            <button
              onClick={handleStart}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Check Eligibility <ArrowRight className="h-4 w-4" />
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
                By submitting this form, you agree to the Credit Report Terms of
                Use, Terms of Use &amp; Privacy Policy.
              </span>
            </label>
            {err.agree && <ErrorText>{err.agree}</ErrorText>}
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="mt-12 grid grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-white p-6 text-center">
        <Stat value="5.7cr+" label="Customers served" />
        <Stat value="65+" label="Partner lenders" />
        <Stat value="₹65k Cr+" label="Loans disbursed" />
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

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
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
        {step === 1 && (
          <StepLessor form={form} set={set} setChoice={setChoice} errors={errors} />
        )}
        {step === 2 && (
          <StepTenant form={form} set={set} setChoice={setChoice} errors={errors} />
        )}
        {step === 3 && <StepLoanAmount form={form} set={set} errors={errors} />}
        {step === 4 && <StepLoanType form={form} setChoice={setChoice} errors={errors} />}
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

function Stepper({ step }) {
  return (
    <div className="flex items-center justify-between">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const active = n === step;
        const done = n < step;
        return (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`grid h-9 w-9 place-items-center rounded-full text-sm font-semibold ${
                  done
                    ? "bg-emerald-600 text-white"
                    : active
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {done ? <Check className="h-4 w-4" /> : n}
              </div>
              <span className="mt-2 hidden text-xs text-slate-500 sm:block">
                {label}
              </span>
            </div>
            {n < STEP_LABELS.length && (
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
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
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

/* numbers-only change helper */
const onlyDigits = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/\D/g, "") } });
/* letters/spaces-only change helper */
const onlyLetters = (setter) => (e) =>
  setter({ target: { value: e.target.value.replace(/[^A-Za-z\s]/g, "") } });

/* ---------- Step 1: Lessor ---------- */

function StepLessor({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Lessor (property owner) details</h2>

      <Field label="Type of entity (Lessor)" error={errors.lessorEntity}>
        <Pills
          value={form.lessorEntity}
          onSelect={setChoice("lessorEntity")}
          options={ENTITY_TYPES}
        />
      </Field>

      <Field label="Lessor name" error={errors.lessorName}>
        <Text
          value={form.lessorName}
          onChange={onlyLetters(set("lessorName"))}
          placeholder="Name as per records"
          error={errors.lessorName}
        />
      </Field>

      <Field label="Property address" error={errors.propertyAddress}>
        <Text
          value={form.propertyAddress}
          onChange={set("propertyAddress")}
          placeholder="Current property address"
          error={errors.propertyAddress}
        />
      </Field>

      <Field label="Property type" error={errors.propertyType}>
        <Select
          value={form.propertyType}
          onChange={set("propertyType")}
          options={PROPERTY_TYPES}
          placeholder="Select property type"
          error={errors.propertyType}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Property value (market)"
          hint="LTV up to 145% as per property"
          error={errors.propertyValue}
        >
          <Text
            value={form.propertyValue}
            onChange={onlyDigits(set("propertyValue"))}
            placeholder="₹ in INR"
            inputMode="numeric"
            error={errors.propertyValue}
          />
        </Field>
        <Field label="Monthly rental amount" error={errors.rentalAmount}>
          <Text
            value={form.rentalAmount}
            onChange={onlyDigits(set("rentalAmount"))}
            placeholder="₹ in INR"
            inputMode="numeric"
            error={errors.rentalAmount}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 2: Tenant ---------- */

function StepTenant({ form, set, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Tenant &amp; lease details</h2>

      <Field label="Tenant entity" error={errors.tenantEntity}>
        <Pills
          value={form.tenantEntity}
          onSelect={setChoice("tenantEntity")}
          options={TENANT_TYPES}
        />
      </Field>

      <Field label="Tenant name" error={errors.tenantName}>
        <Text
          value={form.tenantName}
          onChange={onlyLetters(set("tenantName"))}
          placeholder="Tenant / lessee name"
          error={errors.tenantName}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Total lease period" error={errors.leasePeriod}>
          <Text
            value={form.leasePeriod}
            onChange={set("leasePeriod")}
            placeholder="e.g. 9 years"
            error={errors.leasePeriod}
          />
        </Field>
        <Field label="Lease commencement date" error={errors.leaseStartDate}>
          <Text
            type="date"
            value={form.leaseStartDate}
            onChange={set("leaseStartDate")}
            error={errors.leaseStartDate}
          />
        </Field>
      </div>
    </div>
  );
}

/* ---------- Step 3: Loan amount ---------- */

function StepLoanAmount({ form, set, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan requirement</h2>
      <Field
        label="Loan amount required"
        hint="Subject to eligibility and property valuation"
        error={errors.loanAmount}
      >
        <Text
          value={form.loanAmount}
          onChange={onlyDigits(set("loanAmount"))}
          placeholder="₹ in INR"
          inputMode="numeric"
          error={errors.loanAmount}
        />
      </Field>
    </div>
  );
}

/* ---------- Step 4: Loan type ---------- */

function StepLoanType({ form, setChoice, errors }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Loan type</h2>
      <Field label="Select loan type" error={errors.loanType}>
        <Pills
          value={form.loanType}
          onSelect={setChoice("loanType")}
          options={LOAN_TYPES}
        />
      </Field>
      {form.loanType === "BT Transfer" && (
        <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          For balance transfer, you'll need to upload your existing Sanction
          Letter and Statement of Account in the next step.
        </p>
      )}
    </div>
  );
}

/* ---------- Step 5: Documents ---------- */

function StepDocuments({ form, setFile, errors }) {
  const isBT = form.loanType === "BT Transfer";
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Document upload</h2>

      <FileRow
        label="Bank Statement"
        required
        name={form.files.bankStatement}
        onChange={setFile("bankStatement")}
        error={errors.bankStatement}
      />
      <FileRow
        label="Property Papers"
        required
        name={form.files.propertyPapers}
        onChange={setFile("propertyPapers")}
        error={errors.propertyPapers}
      />
      <FileRow
        label="Lease Agreement"
        name={form.files.leaseAgreement}
        onChange={setFile("leaseAgreement")}
      />
      <FileRow
        label="Electricity Bill"
        name={form.files.electricityBill}
        onChange={setFile("electricityBill")}
      />

      {isBT && (
        <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-4">
          <p className="mb-3 text-sm font-semibold text-amber-800">
            Balance transfer documents
          </p>
          <div className="space-y-3">
            <FileRow
              label="Sanction Letter"
              required
              name={form.files.sanctionLetter}
              onChange={setFile("sanctionLetter")}
              error={errors.sanctionLetter}
            />
            <FileRow
              label="Statement of Account (SOA)"
              required
              name={form.files.soa}
              onChange={setFile("soa")}
              error={errors.soa}
            />
          </div>
        </div>
      )}
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
            <p className="text-xs text-emerald-600">{name}</p>
          ) : (
            <p className="text-xs text-slate-400">PDF, JPG or PNG</p>
          )}
        </div>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
          <Upload className="h-4 w-4" /> Upload
          <input type="file" className="hidden" onChange={onChange} />
        </label>
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
}

/* ---------- Step 6: Review (check / edit previous steps) ---------- */

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
            <dt className="w-40 shrink-0 text-slate-500">{label}</dt>
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
  const f = form.files || {};
  const isBT = form.loanType === "BT Transfer";

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">Review your application</h2>
        <p className="mt-1 text-sm text-slate-500">
          Check everything below. Use “Edit” on any section to go back and
          change it — your other answers stay saved.
        </p>
      </div>

      <ReviewBlock
        title="Lessor details"
        stepNo={1}
        goToStep={goToStep}
        rows={[
          ["Entity type", form.lessorEntity],
          ["Lessor name", form.lessorName],
          ["Property address", form.propertyAddress],
          ["Property type", form.propertyType],
          ["Property value", form.propertyValue && `₹ ${form.propertyValue}`],
          ["Monthly rental", form.rentalAmount && `₹ ${form.rentalAmount}`],
        ]}
      />

      <ReviewBlock
        title="Tenant & lease"
        stepNo={2}
        goToStep={goToStep}
        rows={[
          ["Tenant entity", form.tenantEntity],
          ["Tenant name", form.tenantName],
          ["Lease period", form.leasePeriod],
          ["Commencement", form.leaseStartDate],
        ]}
      />

      <ReviewBlock
        title="Loan requirement"
        stepNo={3}
        goToStep={goToStep}
        rows={[["Loan amount", form.loanAmount && `₹ ${form.loanAmount}`]]}
      />

      <ReviewBlock
        title="Loan type"
        stepNo={4}
        goToStep={goToStep}
        rows={[["Type", form.loanType]]}
      />

      <ReviewBlock
        title="Documents"
        stepNo={5}
        goToStep={goToStep}
        rows={[
          ["Bank statement", f.bankStatement],
          ["Property papers", f.propertyPapers],
          ["Lease agreement", f.leaseAgreement],
          ["Electricity bill", f.electricityBill],
          ...(isBT
            ? [
                ["Sanction letter", f.sanctionLetter],
                ["Statement of account", f.soa],
              ]
            : []),
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
          Our team will review your lease rental discounting application and
          reach out within 24 hours with matched offers.
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