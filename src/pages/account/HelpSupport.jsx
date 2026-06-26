import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

// const faqs = [
//   "Credit Score",
//   "Business Loan",
//   "Credit Card",
//   "Savings Account",
//   "Home Loan",
//   "Loan Against Property",
//   "Application Related",
// ];
const faqs = [
  {
    title: "Credit Score",
    content:
      "A credit score is a three-digit number that represents your creditworthiness. A higher score increases your chances of loan and credit card approval with better interest rates.",
  },
  {
    title: "Business Loan",
    content:
      "Business loans help businesses meet working capital requirements, purchase machinery, expand operations, or manage cash flow.",
  },
  {
    title: "Credit Card",
    content:
      "A credit card allows you to make purchases on credit. Timely repayment helps improve your credit score and avoid interest charges.",
  },
  {
    title: "Savings Account",
    content:
      "A savings account is a secure place to deposit your money while earning interest. It also provides online banking, debit cards, and fund transfer facilities.",
  },
  {
    title: "Home Loan",
    content:
      "A home loan helps you purchase, construct, or renovate a house. The loan is repaid through monthly EMIs over the selected tenure.",
  },
  {
    title: "Loan Against Property",
    content:
      "A Loan Against Property (LAP) allows you to borrow funds by mortgaging your residential or commercial property.",
  },
  {
    title: "Application Related",
    content:
      "Track your application status, upload documents, update personal details, or contact support for any application-related assistance.",
  },
];

const products = [
  "Credit Report",
  "Personal Loan",
  "Business Loan",
  "Credit Card",
  "Savings Account",
  "Mutual Fund",
  "Gold Loan",
  "Home Loan",
  "Loan Against Property",
  "Car Loan",
  "Education Loan",
  "Others",
];

export default function HelpSupport() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "faqs";

  const setTab = (t) => setSearchParams({ tab: t });

  return (
    <DashboardLayout>
      <div className="bg-white rounded-2xl shadow-sm">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {[
            { id: "faqs", label: "FAQs" },
            { id: "query", label: "Submit A Query" },
            { id: "contact", label: "Contact Us" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-blue-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {tab === "faqs" && <FaqsTab />}
          {tab === "query" && <QueryTab />}
          {tab === "contact" && <ContactTab />}
        </div>
      </div>
    </DashboardLayout>
  );
}
function FaqsTab() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h3 className="text-2xl font-bold text-blue-900 mb-6">
        Frequently Asked Questions
      </h3>

      <input
        type="text"
        placeholder="Search your question..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-blue-500"
      />

      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl overflow-hidden"
          >
            <button
              onClick={() =>
                setOpenIndex(openIndex === index ? -1 : index)
              }
              className="w-full flex justify-between items-center px-5 py-4 bg-white hover:bg-blue-50 transition"
            >
              <span className="font-semibold text-gray-800">
                {faq.title}
              </span>

              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-5 py-4 bg-gray-50 border-t text-gray-600 leading-7">
                {faq.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
// function FaqsTab() {
//   return (
//     <div>
//       <h3 className="text-xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1">
//         Frequently Asked Questions
//       </h3>
//       <div className="mt-6 space-y-3">
//         {faqs.map((f, i) => (
//           <div
//             key={i}
//             className="flex items-center justify-between border-b border-gray-100 py-4 cursor-pointer hover:text-blue-600"
//           >
//             <span className="font-medium text-gray-700">
//               {i + 1}. {f}
//             </span>
//             <span className="text-gray-400">›</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

function QueryTab() {
  const [product, setProduct] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!product || !email || !issue) {
      alert("Please fill all fields");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-blue-900">Query Submitted!</h3>
        <p className="text-gray-600 mt-2">
          We will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1">
        You can write to us !
      </h3>
      <p className="text-gray-600 mt-4">
        For any queries or feedback, you can write to us by submitting the form
        below. We will get back to you within 24 hours.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email Address*"
          className="border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500"
        />
      </div>

      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Describe the issue here*"
        rows={5}
        className="w-full mt-4 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-blue-500"
      />

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Submit Query
        </button>
      </div>
    </div>
  );
}

function ContactTab() {
  return (
    <div>
      <h3 className="text-xl font-bold text-blue-900 border-b-2 border-pink-500 inline-block pb-1">
        How can we help you?
      </h3>
      <p className="text-gray-600 mt-4 leading-7">
        It looks like you are experiencing problem with our service. Don't
        worry! We're here to help. For any query, you can write to us and we
        will get back to you within 24 hours. Alternatively, you can speak to
        our customer care team on the number below, between 09:30 AM to 6:30 PM
        (Mon-Sat).
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <ContactItem
          icon="📞"
          title="Call Now"
          highlight="9266926617"
          sub="Lines are open Mon-Sun from 9:30 am – 6:30 pm"
        />
        <ContactItem
          icon="🟢"
          title="Whatsapp"
          highlight="9010031003"
          sub="You can even reach out to us via WhatsApp."
        />
        <ContactItem
          icon="📍"
          title="Visit Us"
          sub="Direct Credit, Tower A ,Vision Buisness Park,Knowledge Park III,Greater-Noida, 201306, India"
        />
        <ContactItem
          icon="✉️"
          title="Email"
          highlight="contact@directcredit.in"
          sub="email to us related to your Credit Report"
        />
      </div>
    </div>
  );
}

function ContactItem({ icon, title, highlight, sub }) {
  return (
    <div className="flex gap-3">
      <span className="text-xl">{icon}</span>
      <div>
        <p className="font-bold text-blue-900">
          {title} {highlight && <span className="text-blue-600">: {highlight}</span>}
        </p>
        <p className="text-gray-600 text-sm mt-1">{sub}</p>
      </div>
    </div>
  );
}