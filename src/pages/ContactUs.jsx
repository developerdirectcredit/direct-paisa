import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, Headphones, MapPin, Building2 } from "lucide-react";

/* Official-style WhatsApp logo as inline SVG */
const WhatsAppIcon = ({ size = 26, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.748-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const cards = [
  {
    icon: Mail,
    title: "Email",
    highlight: "contact@directcredit.in",
    href: "mailto:contact@directcredit.in",
    desc: "For queries related to loans, your application or any general enquiries.",
    color: "from-amber-400 to-amber-500",
  },
  {
    icon: Phone,
    title: "Sales Enquiry",
    highlight: "+91 90 1003 1003",
    href: "tel:+919010031003",
    desc: "Our advisors are available 7 days a week, 9:30 am to 6:30 pm to assist with the best offers.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Headphones,
    title: "Service Helpline",
    highlight: "+91 9266 9266 17",
    href: "tel:+919266926617",
    desc: "Our customer service experts are here for you. Lines are open Mon–Sun from 9:30am to 6:30pm.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    highlight: "+91 90100 31003",
    href: "https://wa.me/919010031003",
    desc: "You can even reach out to us via WhatsApp. Our service expert team will help you with your queries.",
    color: "from-green-500 to-green-600",
  },
];

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#050824] to-[#11142F] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-gray-300 text-base max-w-xl mx-auto">
            Get in touch with Direct Credit for quick business loan support and
            expert financial guidance. Call, email or message us today.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 gap-7">
          {cards.map((card) => {
            const Icon = card.icon;
            const isExternal = card.href.startsWith("http");
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-5`}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {card.title}:
                </h3>
                <a
                  href={card.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-blue-600 font-semibold text-lg hover:underline break-all"
                >
                  {card.highlight}
                </a>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Office Address */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
          {/* Heading */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#050824] to-[#11142F] flex items-center justify-center flex-shrink-0">
              <MapPin size={28} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Our Offices
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                Visit us at any of our locations across India
              </p>
            </div>
          </div>

          {/* Address cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Head Office */}
            <div className="relative bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#050824]/30 hover:shadow-md transition-all duration-300">
              <span className="inline-block bg-[#050824] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
                Head Office
              </span>
              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-[#050824] flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-[15px] leading-relaxed font-medium">
                  Vision Business Park, 2nd Floor, Tower A, I.T Square, Knowledge
                  Park – 3, Greater Noida, Gautam Buddha Nagar, Uttar Pradesh –
                  201306
                </p>
              </div>
            </div>

            {/* Lucknow Office */}
            <div className="relative bg-gray-50 rounded-2xl p-7 border border-gray-100 hover:border-[#050824]/30 hover:shadow-md transition-all duration-300">
              <span className="inline-block bg-blue-600 text-white text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full mb-4">
                Lucknow Office
              </span>
              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-gray-700 text-[15px] leading-relaxed font-medium">
                  Office No. 6, 8th Floor, BBD Viraj Tower, Vibhuti Khand, Gomti
                  Nagar, Lucknow – 226010
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}