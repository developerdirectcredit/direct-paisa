import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Home, CheckCircle, ArrowRight, Phone } from "lucide-react";

const features = ["Loan amount: ₹10 Lakh – ₹5 Crore","Interest rate from 8.50% p.a.","Tenure upto 30 years","Balance transfer facility","Top-up loan available","Tax benefit under 80C & 24B"];
const eligibility = ["Age: 21 – 65 years","Salaried or self-employed","Stable income proof","CIBIL score 700+","Property should be legally clear"];
const documents = ["PAN & Aadhaar Card","Income proof / ITR 3 years","Bank statement 12 months","Property documents","Sale agreement"];

export default function HomeLoan() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="bg-gradient-to-br from-green-700 to-green-500 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center"><Home size={24} /></div>
            <span className="text-green-200 font-medium">Loans → Home Loan</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Home Loan</h1>
          <p className="text-green-100 text-lg max-w-xl mb-8">Buy your dream home with best interest rates from top banks and NBFCs. Tenure upto 30 years.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors flex items-center gap-2">Apply Now <ArrowRight size={18} /></button>
            <button className="border border-white/40 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"><Phone size={16} /> Talk to Expert</button>
          </div>
        </div>
      </section>
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {[{label:"Max Loan",value:"₹5 Crore"},{label:"Interest From",value:"8.50%*"},{label:"Max Tenure",value:"30 Years"},{label:"Tax Benefit",value:"80C+24B"}].map((s) => (
            <div key={s.label} className="py-6 px-8 text-center">
              <div className="text-2xl font-bold text-green-600">{s.value}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-5">Key Features</h2>
          <ul className="space-y-3">{features.map((f) => <li key={f} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-green-500 mt-0.5 flex-shrink-0" />{f}</li>)}</ul>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-5">Eligibility</h2>
          <ul className="space-y-3">{eligibility.map((e) => <li key={e} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-blue-500 mt-0.5 flex-shrink-0" />{e}</li>)}</ul>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 text-lg mb-5">Documents Required</h2>
          <ul className="space-y-3">{documents.map((d) => <li key={d} className="flex items-start gap-3 text-sm text-gray-600"><CheckCircle size={17} className="text-purple-500 mt-0.5 flex-shrink-0" />{d}</li>)}</ul>
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Apna ghar, apna sapna!</h2>
          <p className="text-green-100 mb-6">Compare rates from 30+ banks and get the best deal</p>
          <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">Apply for Home Loan</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
