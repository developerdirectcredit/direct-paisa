import {
  Percent,
  Clock3
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12">

        <div>
          <h1 className="text-6xl font-bold leading-tight">
            Loans, Cards &
            Investments
          </h1>

          <div className="flex gap-10 mt-10">

            <div className="flex gap-3">
              <Percent className="text-orange-500"/>
              <p>Financial Solutions</p>
            </div>

            <div className="flex gap-3">
              <Clock3 className="text-blue-500"/>
              <p>Quick & Easy</p>
            </div>

          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-3xl p-8 text-white">
          <h2 className="text-4xl font-bold">
            Earn upto 13%
          </h2>

          <p className="mt-4">
            Start Investing Today
          </p>

          <button className="bg-white text-blue-700 px-6 py-3 rounded-xl mt-6">
            Invest Now
          </button>
        </div>

      </div>
    </section>
  );
}