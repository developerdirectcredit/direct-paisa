import { useState } from "react";
import Navbar from "../components/Navbar";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EmiCalculator({
     loanType = "Personal Loan",
}) {
  const loanDefaults = {
  "Personal Loan": {
    amount: 500000,
    rate: 11,
    tenure: 5,
  },
  "Home Loan": {
    amount: 3000000,
    rate: 7.5,
    tenure: 20,
  },
  "Business Loan": {
    amount: 1000000,
    rate: 14,
    tenure: 10,
  },
  "Gold Loan": {
    amount: 300000,
    rate: 9,
    tenure: 3,
  },
  "Mudra Loan": {
    amount: 500000,
    rate: 10,
    tenure: 5,
  },
  "Tractor Loan": {
    amount: 800000,
    rate: 10.5,
    tenure: 7,
  },
  "Term Loan": {
    amount: 1500000,
    rate: 12,
    tenure: 8,
  },
  "Loan Against Property": {
    amount: 2500000,
    rate: 10,
    tenure: 15,
  },
};

const defaults =
  loanDefaults[loanType] ||
  loanDefaults["Personal Loan"];

const [loanAmount, setLoanAmount] = useState(
  defaults.amount
);

const [interestRate, setInterestRate] = useState(
  defaults.rate
);

const [tenure, setTenure] = useState(
  defaults.tenure
);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;

    const emi =
      (loanAmount *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    return Math.round(emi);
  };

  const emi = calculateEMI();

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const chartData = {
    labels: ["Principal", "Interest"],
    datasets: [
      {
        data: [loanAmount, totalInterest],
        backgroundColor: ["#2563eb", "#93c5fd"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
               {loanType} EMI Calculator
            </h1>

            <p className="text-gray-500 mt-2">
                Calculate your {loanType.toLowerCase()} EMI instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">

            {/* Left */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              {/* Loan Amount */}
              <div className="mb-8">
                <label className="font-semibold block mb-3">
                  Loan Amount
                </label>

                <div className="text-2xl font-bold text-blue-600 mb-3">
                  ₹ {loanAmount.toLocaleString()}
                </div>

                <input
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) =>
                    setLoanAmount(Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              {/* Interest */}
              <div className="mb-8">
                <label className="font-semibold block mb-3">
                  Interest Rate
                </label>

                <div className="text-2xl font-bold text-blue-600 mb-3">
                  {interestRate}%
                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) =>
                    setInterestRate(Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              {/* Tenure */}
              <div className="mb-8">
                <label className="font-semibold block mb-3">
                  Loan Tenure
                </label>

                <div className="text-2xl font-bold text-blue-600 mb-3">
                  {tenure} Years
                </div>

                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenure}
                  onChange={(e) =>
                    setTenure(Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold">
                Calculate EMI
              </button>
            </div>

            {/* Right */}
            <div className="bg-white rounded-3xl shadow-md p-8">

              <h2 className="text-2xl font-bold mb-8">
                EMI Breakdown
              </h2>

              <div className="max-w-[280px] mx-auto">
                <Doughnut
                  data={chartData}
                  options={{
                    cutout: "70%",
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </div>

              <div className="mt-10 space-y-5">

                <div className="flex justify-between border-b pb-3">
                  <span>Monthly EMI</span>
                  <span className="font-bold text-blue-600">
                    ₹ {emi.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Total Interest</span>
                  <span className="font-semibold">
                    ₹ {totalInterest.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <span>Principal Amount</span>
                  <span className="font-semibold">
                    ₹ {loanAmount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Total Payment</span>
                  <span className="font-bold text-green-600">
                    ₹ {totalPayment.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="mt-8 w-full border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50">
                Request Callback
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}