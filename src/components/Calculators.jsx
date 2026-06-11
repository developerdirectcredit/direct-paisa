export default function Calculators() {
  const data = [
    "Personal Loan EMI",
    "Business Loan EMI",
    "Home Loan EMI",
    "FD Calculator",
    "GST Calculator",
    "NPS Calculator",
  ];

  return (
    <section className="bg-[#f8fafc] py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Calculators
        </h2>

        <p className="text-gray-600 text-lg mb-10 max-w-4xl">
          Easily calculate loan EMIs, investment returns, and tax estimates
          using our simple and user-friendly financial calculators.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[120px]
                         flex items-center justify-between cursor-pointer
                         shadow-sm hover:shadow-lg hover:border-blue-500
                         transition-all duration-300"
            >
              <span className="text-lg font-medium text-gray-800">
                {item}
              </span>

              <span className="text-2xl text-blue-600">
                →
              </span>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}