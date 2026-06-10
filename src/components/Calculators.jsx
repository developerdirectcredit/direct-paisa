export default function Calculators() {

  const data = [
    "Personal Loan EMI",
    "Business Loan EMI",
    "Home Loan EMI",
    "FD Calculator",
    "GST Calculator",
    "NPS Calculator"
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold mb-10">
          Calculators
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {data.map((item,index)=>(
            <div key={index}
            className="border p-6 rounded-xl hover:bg-blue-50 cursor-pointer">
              {item}
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}