export default function Partners() {

  return (
    <section className="max-w-7xl mx-auto py-20">

      <h2 className="text-4xl font-bold mb-10">
        Our Partners
      </h2>

      <div className="flex flex-wrap gap-4">

        {[
          "HDFC",
          "ICICI",
          "Axis",
          "SBI",
          "Kotak",
          "IDFC"
        ].map((bank,index)=>(
          <button
            key={index}
            className="border px-6 py-3 rounded-xl hover:bg-blue-600 hover:text-white"
          >
            {bank}
          </button>
        ))}

      </div>

    </section>
  )
}