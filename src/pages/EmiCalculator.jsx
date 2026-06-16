
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

  const loanOffers = [
    {
      bank: "HDFC Bank",
      rate: "10.50% onwards",
      amount: "Up to ₹40 Lakhs",
      tenure: "1 - 5 Years",
    },
    {
      bank: "ICICI Bank",
      rate: "10.75% onwards",
      amount: "Up to ₹50 Lakhs",
      tenure: "1 - 6 Years",
    },
    {
      bank: "Axis Bank",
      rate: "10.49% onwards",
      amount: "Up to ₹40 Lakhs",
      tenure: "1 - 7 Years",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="bg-slate-50 min-h-screen">

        {/* HERO */}

        <section className="max-w-7xl mx-auto px-4 py-14">

          <h1 className="text-5xl font-bold text-gray-900 mb-5">
            {loanType} EMI Calculator
          </h1>

          <p className="text-lg text-gray-600 max-w-4xl leading-8">
            Calculate your monthly EMI instantly and make
            smarter borrowing decisions. Compare repayment
            options, estimate interest costs, and choose
            the perfect loan tenure for your financial goals.
          </p>

        </section>

        {/* CALCULATOR */}

        <section className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-2 gap-8">

            {/* LEFT */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-8">
                Calculate Your EMI
              </h2>

              {/* LOAN AMOUNT */}

              <div className="mb-10">

                <div className="flex justify-between mb-3">

                  <label className="font-semibold">
                    Loan Amount
                  </label>

                  <span className="font-bold text-blue-600">
                    ₹ {loanAmount.toLocaleString()}
                  </span>

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

              {/* INTEREST RATE */}

              <div className="mb-10">

                <div className="flex justify-between mb-3">

                  <label className="font-semibold">
                    Interest Rate
                  </label>

                  <span className="font-bold text-blue-600">
                    {interestRate}%
                  </span>

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

              {/* TENURE */}

              <div className="mb-10">

                <div className="flex justify-between mb-3">

                  <label className="font-semibold">
                    Loan Tenure
                  </label>

                  <span className="font-bold text-blue-600">
                    {tenure} Years
                  </span>

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

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition">
                Calculate EMI
              </button>

            </div>

            {/* RIGHT */}

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <div className="bg-blue-50 rounded-2xl p-6 text-center mb-8">

                <p className="text-gray-500 mb-2">
                  Estimated Monthly EMI
                </p>

                <h3 className="text-5xl font-bold text-blue-600">
                  ₹ {emi.toLocaleString()}
                </h3>

              </div>

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
                Check Eligibility
              </button>

            </div>

          </div>

        </section>

        {/* LOAN OFFERS */}

        <section className="max-w-7xl mx-auto px-4 py-20">

          <h2 className="text-4xl font-bold mb-10">
            Top {loanType} Offers
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {loanOffers.map((loan, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-md p-6"
              >
                <h3 className="text-xl font-bold mb-4">
                  {loan.bank}
                </h3>

                <p className="mb-2">
                  Interest Rate: {loan.rate}
                </p>

                <p className="mb-2">
                  Loan Amount: {loan.amount}
                </p>

                <p className="mb-5">
                  Tenure: {loan.tenure}
                </p>

                <button className="w-full bg-blue-600 text-white py-3 rounded-xl">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
                {/* BENEFITS */}

        <section className="max-w-7xl mx-auto px-4 pb-20">

          <h2 className="text-4xl font-bold mb-10">
            Why Use Our EMI Calculator?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-3">
                Instant Results
              </h3>

              <p className="text-gray-600">
                Calculate your EMI within seconds with accurate results.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-3">
                Compare Scenarios
              </h3>

              <p className="text-gray-600">
                Adjust loan amount, interest rate and tenure easily.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-3">
                Better Planning
              </h3>

              <p className="text-gray-600">
                Understand repayment obligations before borrowing.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-lg mb-3">
                100% Free
              </h3>

              <p className="text-gray-600">
                Unlimited EMI calculations with no registration.
              </p>
            </div>

          </div>

        </section>

        {/* WHAT IS EMI */}

        <section className="max-w-7xl mx-auto px-4 pb-16">

          <div className="bg-white rounded-3xl shadow-md p-10">

            <h2 className="text-4xl font-bold mb-6">
              What is {loanType} EMI?
            </h2>

            <p className="text-gray-600 leading-8">
              EMI (Equated Monthly Installment) is the fixed amount paid every
              month by a borrower towards loan repayment. It consists of both
              principal repayment and interest charged by the lender.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              The EMI remains constant throughout the repayment period for
              fixed-rate loans, making financial planning easier and more
              predictable.
            </p>

          </div>

        </section>

        {/* EMI CALCULATOR GUIDE */}

        <section className="max-w-7xl mx-auto px-4 pb-16">

          <div className="bg-white rounded-3xl shadow-md p-10">

            <h2 className="text-4xl font-bold mb-6">
              What is a {loanType} EMI Calculator?
            </h2>

            <p className="text-gray-600 leading-8">
              A {loanType.toLowerCase()} EMI calculator is an online financial
              tool that helps borrowers estimate monthly loan repayments before
              applying. It calculates EMI based on loan amount, interest rate,
              and repayment tenure.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-10">

              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="font-bold mb-2">
                  Loan Amount
                </h3>
                <p className="text-gray-600">
                  Total amount borrowed from lender.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="font-bold mb-2">
                  Interest Rate
                </h3>
                <p className="text-gray-600">
                  Annual rate charged on the loan.
                </p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-5">
                <h3 className="font-bold mb-2">
                  Loan Tenure
                </h3>
                <p className="text-gray-600">
                  Duration chosen for repayment.
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* FACTORS */}

        <section className="max-w-7xl mx-auto px-4 pb-16">

          <div className="bg-white rounded-3xl shadow-md p-10">

            <h2 className="text-4xl font-bold mb-8">
              Factors Affecting EMI
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded-2xl p-5">
                Loan Amount
              </div>

              <div className="border rounded-2xl p-5">
                Interest Rate
              </div>

              <div className="border rounded-2xl p-5">
                Loan Tenure
              </div>

              <div className="border rounded-2xl p-5">
                Part Prepayments
              </div>

              <div className="border rounded-2xl p-5">
                Balance Transfer
              </div>

              <div className="border rounded-2xl p-5">
                Fixed vs Floating Rates
              </div>

            </div>

          </div>

        </section>

        {/* INTEREST RATE TABLE */}

        <section className="max-w-7xl mx-auto px-4 pb-20">

          <h2 className="text-4xl font-bold mb-8">
            Compare Interest Rates
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full bg-white rounded-3xl overflow-hidden shadow-md">

              <thead>

                <tr className="bg-blue-600 text-white">

                  <th className="p-5 text-left">
                    Bank
                  </th>

                  <th className="p-5 text-left">
                    Interest Rate
                  </th>

                  <th className="p-5 text-left">
                    Processing Fee
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="p-5">HDFC Bank</td>
                  <td className="p-5">10.50% onwards</td>
                  <td className="p-5">₹6,500</td>
                </tr>

                <tr className="border-b">
                  <td className="p-5">ICICI Bank</td>
                  <td className="p-5">10.75% onwards</td>
                  <td className="p-5">Up to 2%</td>
                </tr>

                <tr className="border-b">
                  <td className="p-5">Axis Bank</td>
                  <td className="p-5">10.49% onwards</td>
                  <td className="p-5">Up to 2%</td>
                </tr>

                <tr>
                  <td className="p-5">Kotak Mahindra Bank</td>
                  <td className="p-5">10.99% onwards</td>
                  <td className="p-5">Up to 3%</td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* FAQ */}

        <section className="max-w-5xl mx-auto px-4 pb-20">

          <h2 className="text-4xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">

            <details className="bg-white rounded-2xl p-5 shadow-md">
              <summary className="font-semibold cursor-pointer">
                What details are required to calculate EMI?
              </summary>

              <p className="mt-4 text-gray-600">
                You need loan amount, interest rate and tenure.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-5 shadow-md">
              <summary className="font-semibold cursor-pointer">
                Does EMI calculation affect credit score?
              </summary>

              <p className="mt-4 text-gray-600">
                No, EMI calculations do not impact your credit score.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-5 shadow-md">
              <summary className="font-semibold cursor-pointer">
                Can I compare different loan tenures?
              </summary>

              <p className="mt-4 text-gray-600">
                Yes, adjust the tenure slider to compare repayment options.
              </p>
            </details>

            <details className="bg-white rounded-2xl p-5 shadow-md">
              <summary className="font-semibold cursor-pointer">
                Is this calculator free?
              </summary>

              <p className="mt-4 text-gray-600">
                Yes, it is completely free and unlimited.
              </p>
            </details>

          </div>

        </section>

        {/* ARTICLES */}

        <section className="max-w-7xl mx-auto px-4 pb-20">

          <h2 className="text-4xl font-bold mb-10">
            Related Loan Guides
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                How To Improve Loan Eligibility
              </h3>

              <p className="text-gray-600">
                Learn strategies to improve approval chances.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                Ways To Reduce Interest Cost
              </h3>

              <p className="text-gray-600">
                Practical tips to lower total repayment burden.
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6">
              <h3 className="font-bold text-xl mb-3">
                Personal Loan vs Credit Card
              </h3>

              <p className="text-gray-600">
                Understand which option suits your needs.
              </p>
            </div>

          </div>

        </section>

        {/* CTA */}

        <section className="max-w-7xl mx-auto px-4 pb-20">

          <div className="bg-blue-600 rounded-3xl text-white text-center p-12">

            <h2 className="text-4xl font-bold">
              Ready To Apply For A Loan?
            </h2>

            <p className="mt-4 text-blue-100">
              Compare offers from leading banks and lenders.
            </p>

            <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold">
              Check Eligibility
            </button>

          </div>

        </section>

      </div>
    </>
  );
}
