import {
  ShieldCheck,
  Users,
  BadgeCheck
} from "lucide-react";

export default function WhyChooseUs() {

  const items = [
    {
      icon:ShieldCheck,
      title:"Safe & Secure"
    },
    {
      icon:Users,
      title:"Customer First"
    },
    {
      icon:BadgeCheck,
      title:"Wide Choice"
    }
  ];

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {items.map((item,index)=>{

            const Icon=item.icon;

            return (
              <div key={index}
              className="p-8 rounded-xl shadow">

                <Icon size={50}
                className="text-pink-500"/>

                <h3 className="text-2xl font-bold mt-4">
                  {item.title}
                </h3>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  )
}