export default function AppPromo() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto rounded-3xl border p-10 grid md:grid-cols-2 gap-8">

        <img
          src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c"
          className="rounded-xl"
        />

        <div>
          <h2 className="text-4xl font-bold">
            Get Credit Score FREE
          </h2>

          <ul className="mt-6 space-y-3">
            <li>✓ Exclusive Offers</li>
            <li>✓ Instant Loans</li>
            <li>✓ Rewards</li>
          </ul>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-6">
            Download App
          </button>
        </div>

      </div>
    </section>
  );
}