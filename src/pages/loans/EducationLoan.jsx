

// // == poora details add nhi tha 

// // src/pages/loans/EducationLoan.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   ArrowLeft,
//   GraduationCap,
//   ShieldCheck,
//   CheckCircle2,
// } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EMPTY_FORM = {
//   fullName: "",
//   mobile: "",
//   email: "",
//   gender: "",
//   courseName: "",
//   degreeType: "",
//   college: "",
//   country: "",
//   address: "",
//   authorize: false,
//   agreeTerms: false,
// };

// export default function EducationLoan() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState(EMPTY_FORM);
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [refNo, setRefNo] = useState("");

//   const update = (field, value) =>
//     setForm((prev) => ({ ...prev, [field]: value }));

//   // ── Validations ──
//   const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
//   const mobileValid = form.mobile.length === 10;
//   const nameValid = form.fullName.trim().length >= 2;

//   const formValid =
//     nameValid &&
//     mobileValid &&
//     emailValid &&
//     form.gender &&
//     form.courseName.trim() &&
//     form.degreeType.trim() &&
//     form.college.trim() &&
//     form.country &&
//     form.address.trim() &&
//     form.authorize &&
//     form.agreeTerms;

//   const handleSubmit = () => {
//     if (!formValid) {
//       toast.error("Please fill all required fields correctly");
//       return;
//     }

//     setSubmitting(true);

//     // (Real app me yahan API call hogi.)
//     setTimeout(() => {
//       // Random 10-digit reference number (screenshot jaisa)
//       const ref = String(Math.floor(1000000000 + Math.random() * 9000000000));
//       setRefNo(ref);
//       setSubmitted(true);
//       setSubmitting(false);
//       toast.success("Application submitted successfully!", { autoClose: 4000 });
//     }, 800);
//   };

//   const Header = (
//     <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-2 flex items-center gap-3 sticky top-0 z-50">
//       <button
//         onClick={() => navigate(-1)}
//         aria-label="Go back"
//         className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
//       >
//         <ArrowLeft size={22} />
//       </button>
//       <img
//         src="/logo.png"
//         alt="Direct Credit Logo"
//         className="h-10 md:h-14 object-contain cursor-pointer"
//         onClick={() => navigate("/")}
//       />
//     </div>
//   );

//   // ===== THANK YOU SCREEN (submit ke baad) =====
//   if (submitted) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <ToastContainer position="top-center" />
//         {Header}
//         <div className="max-w-2xl mx-auto px-6 py-12">
//           <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
//             <CheckCircle2 size={36} className="text-green-500" />
//           </div>

//           <h1 className="text-4xl font-bold text-blue-900 mb-4">Thank You!</h1>

//           <p className="text-gray-600 mb-2">
//             We have received your <b>Education Loan</b> application for{" "}
//             <b>{form.country === "India" ? "studies in India" : "studies abroad"}</b>.
//           </p>

//           <div className="bg-gray-100 rounded-lg px-5 py-4 inline-block my-4">
//             <span className="text-gray-600">Reference No. : </span>
//             <span className="font-bold text-gray-800">{refNo}</span>
//           </div>

//           <p className="text-gray-600 mb-3">
//             Our loan expert will get in touch within 24 hours to take your
//             application forward.
//           </p>
//           <p className="text-gray-600 mb-8">
//             We thank you for choosing <b>Direct Credit</b> for your financial
//             needs and would be keen to serve you in future as well.
//           </p>

//           <div className="flex gap-3 flex-wrap">
//             <button
//               onClick={() => navigate("/")}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
//             >
//               Back to Home
//             </button>
//             <button
//               onClick={() => {
//                 setForm(EMPTY_FORM);
//                 setSubmitted(false);
//                 setRefNo("");
//               }}
//               className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition"
//             >
//               Submit Another Application
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ===== FORM SCREEN =====
//   const inputClass =
//     "w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 outline-none transition-colors";
//   const labelClass = "text-xs text-blue-600 font-medium";
//   const req = <span className="text-red-500">*</span>;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer position="top-center" />
//       {Header}

//       <div className="flex flex-col md:flex-row">
//         {/* Left info panel */}
//         <div className="hidden md:flex md:w-2/5 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex-col justify-center p-12">
//           <GraduationCap size={56} className="mb-6" />
//           <h2 className="text-3xl font-bold mb-4">Education Loan</h2>
//           <p className="text-blue-100 mb-8 leading-relaxed">
//             Fund your dreams — study in India or abroad. Get the best rates from
//             top banks with flexible repayment options.
//           </p>
//           <ul className="space-y-3 text-sm">
//             <li>🎓 Loans for graduate, post-graduate & professional courses</li>
//             <li>🏦 Match with 15+ leading banks</li>
//             <li>💰 Cover tuition, travel, books & more</li>
//             <li>📅 Flexible repayment up to 15 years</li>
//           </ul>
//         </div>

//         {/* Right form */}
//         <div className="flex-1 flex justify-center p-6">
//           <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl border">
//             <h1 className="text-2xl font-bold text-gray-800 mb-2">
//               Education Loan Application
//             </h1>
//             <p className="text-sm text-gray-500 mb-6">
//               Fill in your details and our team will get in touch within 24 hours.
//             </p>

//             <div className="space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className={labelClass}>Student Full Name {req}</label>
//                 <input
//                   value={form.fullName}
//                   onChange={(e) =>
//                     update("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))
//                   }
//                   placeholder="Enter full name"
//                   className={inputClass + " mt-1"}
//                 />
//               </div>

//               {/* Mobile + Email (2 col on desktop) */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClass}>Mobile Number {req}</label>
//                   <div className="flex items-center border-2 border-gray-300 focus-within:border-blue-500 rounded-lg px-3 py-3 mt-1 transition-colors">
//                     <span className="mr-2 text-gray-600 text-sm">+91</span>
//                     <input
//                       type="tel"
//                       maxLength={10}
//                       value={form.mobile}
//                       onChange={(e) =>
//                         update("mobile", e.target.value.replace(/\D/g, ""))
//                       }
//                       placeholder="10-digit"
//                       className="flex-1 outline-none w-full"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className={labelClass}>Email Address {req}</label>
//                   <input
//                     type="email"
//                     value={form.email}
//                     onChange={(e) => update("email", e.target.value)}
//                     placeholder="you@example.com"
//                     className={inputClass + " mt-1"}
//                   />
//                   {form.email && !emailValid && (
//                     <p className="text-xs text-red-500 mt-1">
//                       Please enter a valid email
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Gender */}
//               <div>
//                 <label className={labelClass}>Gender</label>
//                 <select
//                   value={form.gender}
//                   onChange={(e) => update("gender", e.target.value)}
//                   className={`${inputClass} mt-1 bg-white ${
//                     form.gender ? "text-gray-800" : "text-gray-400"
//                   }`}
//                 >
//                   <option value="" disabled>Select gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>

//               {/* Course + Degree */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className={labelClass}>Course Name {req}</label>
//                   <input
//                     value={form.courseName}
//                     onChange={(e) => update("courseName", e.target.value)}
//                     placeholder="e.g. Computer Science"
//                     className={inputClass + " mt-1"}
//                   />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Degree Type {req}</label>
//                   <input
//                     value={form.degreeType}
//                     onChange={(e) => update("degreeType", e.target.value)}
//                     placeholder="B.Tech, MBA, MBBS, MSc..."
//                     className={inputClass + " mt-1"}
//                   />
//                 </div>
//               </div>

//               {/* College */}
//               <div>
//                 <label className={labelClass}>College/University Name {req}</label>
//                 <input
//                   value={form.college}
//                   onChange={(e) => update("college", e.target.value)}
//                   placeholder="Enter institution name"
//                   className={inputClass + " mt-1"}
//                 />
//               </div>

//               {/* Country of Study */}
//               <div>
//                 <label className={labelClass}>Country of Study {req}</label>
//                 <select
//                   value={form.country}
//                   onChange={(e) => update("country", e.target.value)}
//                   className={`${inputClass} mt-1 bg-white ${
//                     form.country ? "text-gray-800" : "text-gray-400"
//                   }`}
//                 >
//                   <option value="" disabled>Select country</option>
//                   <option value="India">India</option>
//                   <option value="Abroad">Abroad</option>
//                 </select>
//               </div>

//               {/* Address */}
//               <div>
//                 <label className={labelClass}>Address {req}</label>
//                 <textarea
//                   rows={2}
//                   value={form.address}
//                   onChange={(e) => update("address", e.target.value)}
//                   placeholder="Your current address"
//                   className={inputClass + " mt-1 resize-none"}
//                 />
//               </div>

//               {/* Checkboxes */}
//               <div className="space-y-2 pt-2">
//                 <label className="flex items-start gap-2 text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     checked={form.authorize}
//                     onChange={(e) => update("authorize", e.target.checked)}
//                     className="mt-1"
//                   />
//                   <span>
//                     I authorize Direct Credit to contact me via Call, SMS,
//                     WhatsApp and Email.
//                   </span>
//                 </label>
//                 <label className="flex items-start gap-2 text-sm text-gray-600">
//                   <input
//                     type="checkbox"
//                     checked={form.agreeTerms}
//                     onChange={(e) => update("agreeTerms", e.target.checked)}
//                     className="mt-1"
//                   />
//                   <span>I agree to Terms &amp; Privacy Policy</span>
//                 </label>
//               </div>

//               {/* Submit */}
//               <button
//                 onClick={handleSubmit}
//                 disabled={!formValid || submitting}
//                 className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-2"
//               >
//                 {submitting ? "Submitting..." : "Submit Application"}
//               </button>

//               <p className="flex items-center justify-center gap-1 text-green-600 text-xs">
//                 <ShieldCheck size={14} /> Your details are 100% secured with us
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/pages/loans/EducationLoan.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Landmark,
  Clock,
  BadgeCheck,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EMPTY_FORM = {
  fullName: "",
  mobile: "",
  email: "",
  gender: "",
  courseName: "",
  degreeType: "",
  college: "",
  country: "",
  address: "",
  authorize: false,
  agreeTerms: false,
};

export default function EducationLoan() {
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo] = useState("");

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // ── Validations ──
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
  const mobileValid = form.mobile.length === 10;
  const nameValid = form.fullName.trim().length >= 2;

  const formValid =
    nameValid &&
    mobileValid &&
    emailValid &&
    form.gender &&
    form.courseName.trim() &&
    form.degreeType.trim() &&
    form.college.trim() &&
    form.country &&
    form.address.trim() &&
    form.authorize &&
    form.agreeTerms;

  const handleSubmit = () => {
    if (!formValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const ref = String(Math.floor(1000000000 + Math.random() * 9000000000));
      setRefNo(ref);
      setSubmitted(true);
      setSubmitting(false);
      toast.success("Application submitted successfully!", { autoClose: 4000 });
    }, 800);
  };

  // ── Header with adjusted logo size ──
  const Header = (
    <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 sticky top-0 z-50">
      <button
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
      >
        <ArrowLeft size={22} />
      </button>
      <img
        src="/logo.png"
        alt="Direct Credit Logo"
        className="h-9 md:h-11 w-auto object-contain cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );

  // ===== THANK YOU SCREEN =====
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ToastContainer position="top-center" />
        {Header}
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={36} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-2">
            We have received your <b>Education Loan</b> application for{" "}
            <b>{form.country === "India" ? "studies in India" : "studies abroad"}</b>.
          </p>
          <div className="bg-gray-100 rounded-lg px-5 py-4 inline-block my-4">
            <span className="text-gray-600">Reference No. : </span>
            <span className="font-bold text-gray-800">{refNo}</span>
          </div>
          <p className="text-gray-600 mb-3">
            Our loan expert will get in touch within 24 hours to take your
            application forward.
          </p>
          <p className="text-gray-600 mb-8">
            We thank you for choosing <b>Direct Credit</b> for your financial
            needs and would be keen to serve you in future as well.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => {
                setForm(EMPTY_FORM);
                setSubmitted(false);
                setRefNo("");
              }}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== FORM SCREEN =====
  const inputClass =
    "w-full border-2 border-gray-300 focus:border-blue-500 rounded-lg px-4 py-3 outline-none transition-colors";
  const labelClass = "text-xs text-blue-600 font-medium";
  const req = <span className="text-red-500">*</span>;

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-center" />
      {Header}

      <div className="flex flex-col md:flex-row">
        {/* ── Left panel (gyandhan-style: light green hero) ── */}
        <div className="md:w-2/5 bg-gradient-to-b from-green-50 to-green-100 px-8 md:px-10 py-10 md:py-14">
          <p className="text-green-700 font-semibold text-sm md:text-base">
            35,000+ Education Loans Sanctioned!
          </p>
          <p className="text-green-700 font-semibold text-sm md:text-base mb-3">
            ₹11,000+ Crore Disbursed!
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight mb-6">
            Secure an Education Loan&nbsp;– Hassle-Free
          </h1>

          {/* Hero image (upload ki hui webp) */}
          <div className="flex justify-center mb-8">
            <img
              src="/education-loan.webp"
              alt="Education Loan"
              className="w-56 md:w-64 object-contain drop-shadow-md"
            />
          </div>

          {/* Feature points */}
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Landmark size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Best Loan Offers For You</p>
                <p className="text-sm text-gray-500">
                  Apply for multiple loans in one go and discover the one that
                  suits you.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Clock size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Quick & Hassle Free Loans</p>
                <p className="text-sm text-gray-500">
                  Get expert assistance for quick and smooth loan processing.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <BadgeCheck size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Trusted by Thousands</p>
                <p className="text-sm text-gray-500">
                  Backed by 15+ leading banks and a dedicated support team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right form ── */}
        <div className="flex-1 flex justify-center p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl border">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Education Loan Application
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Fill in your details and our team will get in touch within 24 hours.
            </p>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Student Full Name {req}</label>
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    update("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))
                  }
                  placeholder="Enter full name"
                  className={inputClass + " mt-1"}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Mobile Number {req}</label>
                  <div className="flex items-center border-2 border-gray-300 focus-within:border-blue-500 rounded-lg px-3 py-3 mt-1 transition-colors">
                    <span className="mr-2 text-gray-600 text-sm">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={form.mobile}
                      onChange={(e) =>
                        update("mobile", e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="10-digit"
                      className="flex-1 outline-none w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Email Address {req}</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass + " mt-1"}
                  />
                  {form.email && !emailValid && (
                    <p className="text-xs text-red-500 mt-1">
                      Please enter a valid email
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                  className={`${inputClass} mt-1 bg-white ${
                    form.gender ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Course Name {req}</label>
                  <input
                    value={form.courseName}
                    onChange={(e) => update("courseName", e.target.value)}
                    placeholder="e.g. Computer Science"
                    className={inputClass + " mt-1"}
                  />
                </div>
                <div>
                  <label className={labelClass}>Degree Type {req}</label>
                  <input
                    value={form.degreeType}
                    onChange={(e) => update("degreeType", e.target.value)}
                    placeholder="B.Tech, MBA, MBBS, MSc..."
                    className={inputClass + " mt-1"}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>College/University Name {req}</label>
                <input
                  value={form.college}
                  onChange={(e) => update("college", e.target.value)}
                  placeholder="Enter institution name"
                  className={inputClass + " mt-1"}
                />
              </div>

              <div>
                <label className={labelClass}>Country of Study {req}</label>
                <select
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={`${inputClass} mt-1 bg-white ${
                    form.country ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  <option value="" disabled>Select country</option>
                  <option value="India">India</option>
                  <option value="Abroad">Abroad</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Address {req}</label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="Your current address"
                  className={inputClass + " mt-1 resize-none"}
                />
              </div>

              <div className="space-y-2 pt-2">
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={form.authorize}
                    onChange={(e) => update("authorize", e.target.checked)}
                    className="mt-1"
                  />
                  <span>
                    I authorize Direct Credit to contact me via Call, SMS,
                    WhatsApp and Email.
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={form.agreeTerms}
                    onChange={(e) => update("agreeTerms", e.target.checked)}
                    className="mt-1"
                  />
                  <span>I agree to Terms &amp; Privacy Policy</span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!formValid || submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition mt-2"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>

              <p className="flex items-center justify-center gap-1 text-green-600 text-xs">
                <ShieldCheck size={14} /> Your details are 100% secured with us
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}