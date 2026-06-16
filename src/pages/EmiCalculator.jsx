import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmiCalculator({ loanType = "Personal Loan" }) {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11);
  const [tenure, setTenure] = useState(5);
  const [tenureType, setTenureType] = useState("years");

  const months = tenureType === "years" ? tenure * 12 : tenure;
  const r = interestRate / 12 / 100;

  const emi = Math.round(
    (loanAmount * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1)
  );

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [{
      data: [loanAmount, totalInterest],
      backgroundColor: ["#2563eb", "#93c5fd"],
      borderWidth: 0,
    }],
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-50 min-h-screen">
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-5xl font-bold">{loanType} EMI Calculator</h1>
          <p className="mt-4 text-gray-600">
            Calculate EMI, compare repayment options and plan better.
          </p>
        </section>

        <section className="max-w-7xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow">
              <h2 className="text-2xl font-bold mb-6">Calculate EMI</h2>

              <label>Loan Amount</label>
              <input type="range" min="100000" max="10000000" step="50000"
                value={loanAmount}
                onChange={(e)=>setLoanAmount(Number(e.target.value))}
                className="w-full mb-2" />
              <div className="mb-6 font-bold">₹ {loanAmount.toLocaleString()}</div>

              <label>Interest Rate</label>
              <input type="range" min="1" max="30" step="0.1"
                value={interestRate}
                onChange={(e)=>setInterestRate(Number(e.target.value))}
                className="w-full mb-2" />
              <div className="mb-6 font-bold">{interestRate}%</div>

              <div className="flex gap-2 mb-3">
                <button onClick={()=>setTenureType("years")} className="border px-3 py-2 rounded">Years</button>
                <button onClick={()=>setTenureType("months")} className="border px-3 py-2 rounded">Months</button>
              </div>

              <input type="range"
                min={tenureType==="years"?1:6}
                max={tenureType==="years"?30:360}
                value={tenure}
                onChange={(e)=>setTenure(Number(e.target.value))}
                className="w-full mb-2" />
              <div className="font-bold">{tenure} {tenureType}</div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow">
              <div className="max-w-xs mx-auto">
                <Doughnut data={chartData} />
              </div>

              <div className="space-y-3 mt-6">
                <div className="flex justify-between"><span>EMI</span><span>₹ {emi.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Principal</span><span>₹ {loanAmount.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Interest</span><span>₹ {totalInterest.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold"><span>Total</span><span>₹ {totalPayment.toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
