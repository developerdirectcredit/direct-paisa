export default function CreditCards() {
  const cards = [
    {
      name:"PaisaSave Card",
      cashback:"6% Cashback"
    },
    {
      name:"DUET Card",
      cashback:"1% Cashback"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto py-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        Featured Credit Cards
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {cards.map((card,index)=>(
          <div key={index}
          className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-2xl font-bold">
              {card.name}
            </h3>

            <p className="mt-4">
              {card.cashback}
            </p>

            <button className="text-blue-600 mt-4">
              Know More →
            </button>
          </div>
        ))}

      </div>
    </section>
  )
}