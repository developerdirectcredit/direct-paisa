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
    <section className="bg-[#f8fafc] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Calculators
        </h2>

        <p className="text-gray-600 text-base sm:text-lg mb-8 lg:mb-10 max-w-4xl">
          Easily calculate loan EMIs, investment returns, and tax estimates
          using our simple and user-friendly financial calculators.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">

          {data.map((item, index) => (
            <div
              key={index}
              className="
                bg-white
                border border-gray-200
                rounded-2xl
                p-5 sm:p-6
                min-h-[100px] sm:min-h-[120px]
                flex items-center justify-between
                cursor-pointer
                shadow-sm
                hover:shadow-lg
                hover:border-blue-500
                hover:-translate-y-1
                transition-all duration-300
              "
            >
              <span className="text-base sm:text-lg font-medium text-gray-800">
                {item}
              </span>

              <span className="text-xl sm:text-2xl text-blue-600 font-bold">
                →
              </span>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}