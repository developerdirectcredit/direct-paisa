export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto py-20">

      <h2 className="text-4xl font-bold mb-10">
        Customer Reviews
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {[1,2,3].map((item)=>(
          <div
            key={item}
            className="bg-white p-6 rounded-xl shadow"
          >
            ⭐⭐⭐⭐⭐

            <p className="mt-4">
              Amazing experience with quick approval.
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}