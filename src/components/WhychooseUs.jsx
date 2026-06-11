import {
  ShieldCheck,
  Users,
  BadgeCheck
} from "lucide-react";

export default function WhyChooseUs() {

  const items = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your personal and financial information is protected through advanced security standards, encrypted systems, and strict privacy controls to ensure complete peace of mind."
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Our experienced and customer-focused team is always available to guide you, answer your queries, and help you make informed financial choices with confidence."
  },
  {
    icon: BadgeCheck,
    title: "Wide Choice",
    description:
      "Access a broad network of trusted banks, NBFCs, and financial institutions, giving you the flexibility to compare and choose products that best suit your needs."
  }
];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {items.map((item, index) => {

            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <Icon
                  size={50}
                  className="text-pink-500"
                />

                <h3 className="text-2xl font-bold mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}