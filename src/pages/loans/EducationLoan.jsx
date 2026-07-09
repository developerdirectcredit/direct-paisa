
// src/pages/loans/EducationLoan.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ShieldCheck,
  CheckCircle2,
  CheckCircle,
  FileText,
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

// ── Eligibility criteria ─────────────────────────────────────────
const eligibilityCriteria = [
  "Age: Most lenders have a minimum and maximum age requirement for loan applicants. Typically, you need to be of legal age (18 or older) to apply for a loan.",
  "Course/Program Eligibility: Education loans are often tied to specific educational programs or courses. Lenders may have a list of eligible institutions and programs that qualify for loans.",
  "Admission Offer: Many lenders require proof of admission to an eligible educational institution before approving a loan application.",
  "Academic Performance: Some lenders might consider your academic performance as part of the eligibility criteria, including your high school or previous education grades.",
  "Co-borrower or Guarantor: If you have limited credit history or income, some lenders might require a co-borrower or guarantor (usually a parent or guardian) who will share the responsibility of repaying the loan.",
  "Credit History: The student's as well as their co-borrower/guarantor's credit history and credit score can play a significant role in determining eligibility — a good credit history can improve your chances of approval.",
  "Income/Financial Ability: Some lenders may consider your ability to repay the loan based on your income or your co-borrower's income.",
  "Loan Amount: The loan amount you're requesting in relation to the cost of the program might affect your eligibility. Lenders may have specific limits on the loan amount they are willing to offer.",
  "Collateral or Security: In some cases, lenders might require collateral or security against the loan, especially for larger loan amounts — this could be property, investments, or other valuable assets.",
  "Documentation: You will likely need to provide various documents as part of your loan application, such as proof of identity, proof of admission, income documents, and more.",
];

// ── Documents required ────────────────────────────────────────────
const documentsRequired = [
  "Student-Applicant documents (proof of identity, proof of admission, academic records, etc.)",
  "Co-applicant / Guarantor documents (proof of identity, address proof, etc.)",
  "Income Proof for Salaried Co-applicant / Guarantor (salary slips, Form 16, bank statements)",
  "Income Proof for Self-employed Co-applicant / Guarantor (ITR, business proof, bank statements)",
];

// ── Representative example of loan cost ───────────────────────────
const loanCostDetails = [
  { feature: "Loan Type", details: "Education Loan" },
  { feature: "Loan Amount", details: "₹20,00,000" },
  { feature: "Purpose", details: "Higher Education in India / Abroad" },
  { feature: "Annual Interest Rate (indicative)", details: "9.50% p.a." },
  { feature: "Loan Tenure", details: "120 months (10 years)" },
  { feature: "Moratorium Period", details: "Course Period + 12 Months (if applicable)" },
  { feature: "Monthly Installment (EMI)", details: "₹25,900 (approx.)" },
  { feature: "Total Amount Payable", details: "₹31,08,000 (approx.)" },
  { feature: "Total Interest Cost", details: "₹11,08,000 (approx.)" },
  { feature: "Processing Fee", details: "0% – 1% of loan amount" },
  { feature: "Collateral Requirement", details: "Depending upon loan amount and lender policy" },
];

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

  

  // ===== THANK YOU SCREEN =====
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ToastContainer position="top-center" />
        <Navbar />
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
        <Footer />
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
      <Navbar />

      <div className="flex flex-col md:flex-row">
        {/* ── Left panel — restyled to Agri Loan's navy/red/blue theme ── */}
        <div className="md:w-2/5 bg-[#001f54] px-8 md:px-10 py-10 md:py-14">
          <p className="text-white/70 font-semibold text-sm md:text-base">
            35,000+ Education Loans Sanctioned!
          </p>
          <p className="text-white/70 font-semibold text-sm md:text-base mb-3">
            ₹11,000+ Crore Disbursed!
          </p>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
            <span className="text-white">Secure an</span>{" "}
            <span className="text-[#e8112d]">Education Loan</span>{" "}
            <span className="text-white">— Hassle-Free</span>
          </h1>

          {/* Hero image */}
          <div className="overflow-hidden rounded-2xl mb-8">
            <img
              src="/education-loan.webp"
              alt="Education Loan"
              className="w-full h-56 md:h-64 object-cover"
            />
          </div>

          {/* Feature points — Agri-style icon boxes */}
          <div className="space-y-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Landmark size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Best Loan Offers For You</p>
                <p className="text-sm text-white/70">
                  Apply for multiple loans in one go and discover the one that
                  suits you.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Quick & Hassle Free Loans</p>
                <p className="text-sm text-white/70">
                  Get expert assistance for quick and smooth loan processing.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <BadgeCheck size={20} className="text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">Trusted by Thousands</p>
                <p className="text-sm text-white/70">
                  Backed by 15+ leading banks and a dedicated support team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right form — unchanged fields, same flow ── */}
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

      {/* ══════════════════════════════════════════════
          NEW CONTENT — sits below the hero+form section
      ══════════════════════════════════════════════ */}
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* ── ELIGIBILITY CRITERIA ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Eligibility Criteria</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Education loan eligibility criteria can vary depending on the country of study, the lender, and the
            type of loan you're applying for. However, in a general overview, the factors that often influence
            education loan eligibility are:
          </p>
          <ul className="space-y-3 pl-1">
            {eligibilityCriteria.map((e) => (
              <li key={e} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <CheckCircle size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                {e}
              </li>
            ))}
          </ul>
        </section>

        {/* ── DOCUMENTS REQUIRED ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Documents Required to Apply for Education Loan</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            You will likely need to provide various documents as part of your loan application, such as proof of
            identity, proof of admission, income documents, and more — for both the student as well as the
            guarantor or co-applicant.
          </p>
          <ul className="space-y-2 pl-1">
            {documentsRequired.map((d) => (
              <li key={d} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <FileText size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                {d}
              </li>
            ))}
          </ul>
        </section>

        {/* ── REPRESENTATIVE EXAMPLE OF LOAN COST ── */}
        <section className="py-10 border-t">
          <h2 className="text-2xl font-bold text-gray-800 mb-5">Representative Example of Loan Cost</h2>
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="text-left px-6 py-3 font-semibold text-blue-700 w-1/2">Particulars</th>
                  <th className="text-left px-6 py-3 font-semibold text-blue-700">Details</th>
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
      <Footer />
    </div>
  );
}