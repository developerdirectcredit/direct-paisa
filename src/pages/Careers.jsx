import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Code2,
  Megaphone,
  Settings,
  TrendingUp,
  Users,
  Briefcase,
  ArrowRight,
  X,
  UploadCloud,
  CheckCircle2,
} from "lucide-react";

const teams = [
  {
    icon: Code2,
    title: "Technology Team",
    desc: "Interested in Data Science, Back-end Engineering, Full-stack development, UI/UX Design or Analytics roles?",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Megaphone,
    title: "Product & Marketing Teams",
    desc: "Enthusiastic about Product Management? Interested in Digital Marketing, PR, Brand or Content-SEO roles?",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Settings,
    title: "Operations Team",
    desc: "Looking to build a career in Customer Service, Process Excellence or Business Operations?",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: TrendingUp,
    title: "Sales Team",
    desc: "Passionate about Sales, Partnerships or Business Development and driven by targets and growth?",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Human Resources",
    desc: "Want to shape company culture and help find great talent across HR, Recruitment and People Operations?",
    color: "from-amber-500 to-amber-600",
  },
  {
    icon: Briefcase,
    title: "Finance & Legal",
    desc: "Interested in Accounting, Compliance, Risk or Legal roles within a fast-growing fintech environment?",
    color: "from-cyan-500 to-cyan-600",
  },
];

export default function Careers() {
  // Which team the user is applying for (null = modal closed)
  const [activeTeam, setActiveTeam] = useState(null);

  const openForm = (teamTitle) => setActiveTeam(teamTitle);
  const closeForm = () => setActiveTeam(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#050824] to-[#11142F] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-blue-200 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
            We are hiring
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            We make business finance easy, convenient &amp; transparent
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Using data and technology innovations, we help enterprises secure the
            right funding. From application to disbursal, Direct Credit accompanies
            you at every step of your growth journey.
          </p>
        </div>
      </section>

      {/* Commitment */}
      <section className="max-w-3xl mx-auto text-center px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          We are committed to empower our Consumers
        </h2>
        <p className="text-gray-500 text-base leading-relaxed">
          Every single member of the Direct Credit team aims to positively impact
          the lives of our consumers. If you are passionate about making a
          difference in the lives of customers,{" "}
          <span className="font-semibold text-gray-700">Join Us</span> in our
          journey.
        </p>
      </section>

      {/* Team Cards */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {teams.map((team) => {
            const Icon = team.icon;
            return (
              <div
                key={team.title}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${team.color} flex items-center justify-center mb-5`}
                >
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {team.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {team.desc}
                </p>

                <button
                  onClick={() => openForm(team.title)}
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#050824] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#11142F] transition-colors"
                >
                  Apply Now <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-gradient-to-br from-[#050824] to-[#11142F] rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Don&apos;t see your role above?
          </h2>
          <p className="text-gray-300 mb-7 max-w-xl mx-auto">
            We&apos;re always looking for talented people. Send us your application
            and we&apos;ll get in touch.
          </p>
          <button
            onClick={() => openForm("General Application")}
            className="inline-flex items-center gap-2 bg-white text-[#050824] font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Apply Now <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <Footer />

      {/* Application Form Modal */}
      {activeTeam && (
        <ApplyModal teamTitle={activeTeam} onClose={closeForm} />
      )}
    </div>
  );
}

/* ---------------- Apply Modal ---------------- */
function ApplyModal({ teamTitle, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    resume: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // NOTE: yahan abhi sirf frontend hai.
    // Email bhejne ke liye baad me Web3Forms / backend jodenge.
    console.log("Application submitted:", {
      position: teamTitle,
      ...form,
      resumeName: form.resume?.name,
    });
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {submitted ? (
          /* Success state */
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={34} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Application Received!
            </h3>
            <p className="text-gray-500 text-sm mb-7">
              Thank you for applying for{" "}
              <span className="font-semibold">{teamTitle}</span>. Our HR team will
              review your application and get back to you soon.
            </p>
            <button
              onClick={onClose}
              className="bg-[#050824] text-white font-semibold px-8 py-3 rounded-xl hover:bg-[#11142F] transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form state */
          <div className="p-7">
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              Apply Now
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Position: <span className="font-medium text-gray-700">{teamTitle}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  pattern="[0-9+\- ]{7,15}"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Upload Resume
                </label>
                <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50/40 transition-colors">
                  <UploadCloud size={20} className="text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-500 truncate">
                    {form.resume ? form.resume.name : "Choose PDF / DOC file"}
                  </span>
                  <input
                    type="file"
                    name="resume"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#050824] text-white font-semibold py-3 rounded-xl hover:bg-[#11142F] transition-colors mt-2"
              >
                Submit Application
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}