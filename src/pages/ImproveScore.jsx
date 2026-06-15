



// src/pages/ImproveScore.jsx

// add footer section and with code cluade Ai

import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const steps = [
  {
    id: 1,
    title: "Check Your Credit Report to Find the Root Cause",
    content: `Your credit score is influenced by multiple factors and each factor requires a different remedial action. Before taking any corrective action, the first step is to review your credit report in detail to find the root cause.`,
    list: [
      "Missed or delayed credit card or EMI payments",
      "Settled or written-off loan accounts",
      "Too many loan or credit card applications in a short time",
      "Errors or outdated information in the credit report",
      "Having no or very limited credit history",
      "High credit utilisation and late repayment of dues",
    ],
    extra: "Once you identify which issue applies to you, work on improving your score in a focused manner by taking the necessary corrective steps.",
  },
  {
    id: 2,
    title: "Pay Your Dues on Time",
    content: `Your payment history has one of the highest impacts on your credit score. Missed EMIs or delayed credit card bill payments are recorded in your credit report and stay for up to 36 months, negatively affecting your score.`,
    list: [
      "Clear all overdue EMIs and credit card dues immediately",
      "Set up auto-debit instructions or payment reminders",
      "Always pay at least the minimum due if full payment isn't possible",
      "Consistent on-time payments can significantly improve your score fast",
    ],
  },
  {
    id: 3,
    title: "Reduce High Credit Utilisation",
    content: `Regularly maxing out your credit limit makes you look credit hungry and lowers your score. Reducing your credit utilisation ratio (CUR) to below 30% signals responsible credit behaviour and helps boost your score gradually.`,
    list: [
      "Avoid high-ticket purchases on credit cards for some time",
      "Request a credit limit increase on your existing cards",
      "Get a new credit card to increase overall available limit",
      "But do not utilise the additional limit",
    ],
  },
  {
    id: 4,
    title: "Limit Multiple Credit Applications in a Short Duration",
    content: `When you apply for a loan or credit card, lenders initiate a hard enquiry on your credit profile which can temporarily decrease your score. Multiple hard enquiries in a short span indicate credit-hungry behaviour.`,
    list: [
      "Pause new credit applications for a few months",
      "Check and compare offers through soft-enquiry platforms before applying",
      "Apply only when you meet the eligibility criteria",
      "Fewer credit enquiries help stabilise and improve your score",
    ],
  },
  {
    id: 5,
    title: "Correct Errors in Your Credit Report",
    content: `Even if you have maintained a good credit history, an unnoticed error in your credit report can cause major damage to your score. This could include loans shown as active after closure, incorrect personal info, wrong account details, etc.`,
    list: [
      "Review your detailed credit report every month",
      "Raise a dispute online with the respective lender or credit bureau",
      "Submit supporting documents if required",
      "Follow up until corrections are reflected in your report",
    ],
  },
  {
    id: 6,
    title: "Build Credit If You Have Limited Credit History",
    content: `Consumers with a longer credit history and consistent timely repayments are trusted by banks and bureaus. If you are new-to-credit or have a poor score, start early and build a positive track record.`,
    list: [
      "Use a credit card or small personal loan responsibly",
      "Make all payments on time without fail",
      "Keep credit usage low and consistent",
      "Do not close older credit cards to maintain a longer credit history",
    ],
  },
];

const faqData = [
  {
    q: "How long does it take to improve a credit score?",
    a: "Visible improvement can take a few months of consistent corrective action. Severe issues like defaults may take longer, but disciplined behaviour always works in your favour.",
  },
  {
    q: "Does checking my own credit score affect it?",
    a: "No. Checking your own score is a soft enquiry and has absolutely no impact on your credit score. Only lender-initiated hard enquiries affect your score.",
  },
  {
    q: "What is a good credit score range in India?",
    a: "A score of 750 and above is considered excellent. Scores between 700–749 are good, 650–699 are fair, and below 650 is considered poor.",
  },
  {
    q: "Can I improve my CIBIL score from 600 to 750?",
    a: "Yes, it is possible. By following the 6 steps mentioned above consistently — paying dues on time, reducing credit utilisation, and correcting errors — you can improve your score from 600 to 750+ within 12–18 months.",
  },
];

export default function ImproveScore() {
  const [mobile, setMobile] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
         <Navbar />
      {/* ========== HERO SECTION ========== */}
      <div className="px-4 py-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">

          {/* LEFT SIDE */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              How to Improve Your Credit Score Fast
            </h1>
            <p className="text-gray-600 mb-2 leading-relaxed">
              A strong credit score opens doors to better loans, lower interest rates, and higher credit limits.
              Follow these proven steps to improve your score quickly and effectively.{" "}
              {!expanded && (
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setExpanded(true)}
                >
                  ...Read more
                </span>
              )}
            </p>
            {expanded && (
              <p className="text-gray-600 mb-2 leading-relaxed">
                Improving your credit score is not an overnight process. It requires identifying the root cause of a low score and taking targeted corrective steps. Consistent discipline always works in your favour and visible improvement can be seen within a few months.{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setExpanded(false)}
                >
                  Read less
                </span>
              </p>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-4">
              Why Check Credit Score with Us?
            </h2>

            {/* Feature Bullets */}
            <div className="space-y-3 mb-8">
              {[
                "Check Credit Score from All 4 Major Bureaus",
                "Get Personalized Score Improvement Tips",
                "Track Your Credit Progress Every Month",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-full px-5 py-3 w-fit"
                >
                  <span className="text-green-500 text-lg font-bold">✓</span>
                  <span className="font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            {/* Stats Bar */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden divide-x divide-gray-200 shadow-sm">
              {[
                { value: "5.7Cr+", label: "Satisfied Customers" },
                { value: "4", label: "Bureau Coverage" },
                { value: "800+", label: "Cities across India" },
              ].map((s) => (
                <div key={s.label} className="flex-1 p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE — FORM CARD */}
          <div className="w-full lg:w-96 border border-gray-200 rounded-2xl p-6 shadow-lg h-fit sticky top-6">
            {/* Free badge */}
            <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 mb-4">
              <span className="text-orange-500 text-sm">🎁</span>
              <p className="text-xs text-gray-700">
                Check Credit Score worth <span className="font-bold text-orange-600">₹1,200</span>{" "}
                <span className="text-green-600 font-bold">Absolutely FREE</span>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-5">Let's Get Started</h2>

            <label className="text-xs text-blue-600 font-medium">Mobile Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mt-1 mb-2 focus-within:border-blue-500 transition-colors">
              <span className="mr-2 text-sm">🇮🇳 +91</span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
                placeholder="Enter mobile number"
                className="outline-none flex-1 text-sm"
                maxLength={10}
              />
              {mobile.length > 0 && (
                <span className="text-blue-500 text-xs cursor-pointer hover:underline">Edit</span>
              )}
            </div>

            <p className="text-xs text-gray-400 mb-4">
              You will receive an OTP on mentioned number
            </p>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2">
              Check Your Credit Score →
            </button>

            <p className="text-xs text-gray-400 mt-3 text-center leading-relaxed">
              By logging in, you agree to the{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Terms of Use</span>{" "}
              and{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
            </p>

            {/* Powered By */}
            <div className="mt-5 flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">Powered by</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="flex justify-center gap-2 mt-3 flex-wrap">
              {["CIBIL", "Experian", "Equifax", "CRIF"].map((b) => (
                <span
                  key={b}
                  className="border border-gray-300 rounded px-3 py-1 text-xs font-bold text-gray-600 bg-white"
                >
                  {b}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-1 text-xs text-green-600 font-medium">
              <span>✅</span>
              <span>5.7 Crore reports checked so far</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== TIPS QUICK LIST ========== */}
      <div className="bg-blue-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How to Increase Your Credit Score Quickly and Effectively?
          </h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Discover practical tips to increase your credit score from 600 to 800 fast, fix common credit mistakes,
            and build a stronger financial profile for the best loan and credit card offers.
          </p>
          <div className="space-y-3">
            {[
              "Pay your bills on time for improving credit score fast",
              "Keep your credit utilization ratio below 30%",
              "Avoid multiple loan / credit card applications in a short span of time",
              "Check your credit report regularly for errors and rectify at the earliest",
              "Maintain a long credit history — it signals reliability to banks",
              "Monitor your Co-signed, Guaranteed or Joint Loan Accounts regularly",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-blue-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-gray-800 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== 6 STEPS SECTION ========== */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            6 Step-by-Step Ways to Increase Your Credit Score from 600 to 750
          </h2>
          <p className="text-gray-600 mb-8 text-sm leading-relaxed">
            The only way to rebuild and improve your credit score is through correcting financial mistakes and making
            responsible choices going forward. Here are 6 proven methods to increase a low credit score naturally:
          </p>

          <div className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
                    {step.id}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Step {step.id}: {step.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.content}</p>
                {step.list && (
                  <ul className="space-y-2">
                    {step.list.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-blue-500 mt-0.5 flex-shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                {step.extra && (
                  <p className="text-gray-500 text-sm mt-3 italic">{step.extra}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== BOTTOMLINE SECTION ========== */}
      <div className="bg-gray-50 py-10 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Bottomline</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Improving your credit score fast is not possible through quick shortcuts — it requires identifying the root
            cause and taking targeted corrective steps. Visible improvement can take a few months of consistent action.
            Severe issues like defaults or settlements may take longer, but disciplined behaviour always works in your favour.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            A better credit score doesn't just improve loan approvals — it also helps you secure lower interest rates,
            higher credit card limits, and faster approvals in the long run. Check your free credit score regularly to
            track your improvement journey from 600 to 800.
          </p>
        </div>
      </div>

      {/* ========== HOW TO CHECK — STEPS ========== */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How to Check Credit Score for Free?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", text: "Enter your mobile number" },
              { step: "02", text: "Verify using the OTP sent to you" },
              { step: "03", text: "Enter your PAN and basic details" },
              { step: "04", text: "View your free credit score & report" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center p-5 border border-gray-200 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <p className="text-sm text-gray-700 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm">
              Check Your Free Credit Score →
            </button>
          </div>
        </div>
      </div>

      {/* ========== FAQ SECTION ========== */}
      <div className="bg-gray-50 py-12 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="space-y-3">
            {faqData.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  <span className={`text-blue-500 text-xl transition-transform duration-200 flex-shrink-0 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== FOOTER ========== */}
      <Footer />

    </div>
  );
}
