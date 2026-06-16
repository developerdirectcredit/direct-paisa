

export default function CreditCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">

      {/* Heading */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          How Direct Credit Helps
        </h2>

        <p className="mt-3 text-gray-600 text-lg">
          From initial inquiry to final disbursement, we simplify the lending
          journey with expert guidance and seamless support.
        </p>
      </div>

      {/* Poster */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <img
          src="/images/how-direct-credit-helps.png"
          alt="How Direct Credit Helps"
          className="w-full h-auto"
        />
      </div>

    </section>
  );
}