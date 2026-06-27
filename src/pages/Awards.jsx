import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Awards() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // ───────────────────────────────────────────────────────────────
  //  TOP STATS — quick credibility numbers (edit freely)
  // ───────────────────────────────────────────────────────────────
  const stats = [
    { value: "₹500Cr+", label: "Funding Facilitated for MSMEs" },
    { value: "10,000+", label: "Businesses Empowered" },
    { value: "PAN India", label: "Presence Across Cities" },
    { value: "4.8★", label: "Average Customer Rating" },
  ];

  // ───────────────────────────────────────────────────────────────
  //  AWARDS LIST
  //  👉 Apni real award images "public/awards/" folder me daalo
  //     aur neeche "image" path update kar do. Agar image nahi milti
  //     to ek clean placeholder apne aap dikh jayega.
  // ───────────────────────────────────────────────────────────────
  const awards = [
    {
      title: "Excellence in MSME Funding",
      org: "Honoured by Shri Jitan Ram Manjhi — Union Minister of MSME, Government of India",
      image: "/awards/manjhi-award.jpg",
      desc: "Direct Credit was recognised for its outstanding contribution to MSME growth, receiving the honour from the Hon'ble Union Minister for Micro, Small & Medium Enterprises — a proud acknowledgement of our mission to empower India's enterprises with accessible funding.",
    },
    {
      title: "Times Power Icons — North",
      org: "Presented at the Times Power Icons Awards by The Times Group",
      image: "/awards/times-power-icons.jpg",
      desc: "Felicitated at the prestigious Times Power Icons (North) for being a powerful force in financial services — celebrating our impact, leadership, and the trust of the thousands of businesses we serve.",
    },
    {
      title: "Viksit Bharat — Vision of New India",
      org: "Honoured by Shri Nitin Gadkari — Union Minister, Government of India",
      image: "/awards/gadkari-award.jpg",
      desc: "Recognised at the Viksit Bharat — Vision of New India summit and felicitated by the Hon'ble Union Minister for our role in fuelling enterprise growth and contributing to the nation's vision of a developed India.",
    },
  ];

  // ───────────────────────────────────────────────────────────────
  //  PRESS / MEDIA MENTIONS (optional — edit or remove)
  // ───────────────────────────────────────────────────────────────
  const press = [
    "Economic Times",
    "Business Standard",
    "YourStory",
    "Inc42",
    "Mint",
    "Financial Express",
  ];

  const openImage = (images, idx) => {
    setAllImages(images);
    setCurrentIndex(idx);
    setSelectedImage(images[idx]);
  };

  const nextImage = () => {
    const next = (currentIndex + 1) % allImages.length;
    setCurrentIndex(next);
    setSelectedImage(allImages[next]);
  };

  const prevImage = () => {
    const prev = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prev);
    setSelectedImage(allImages[prev]);
  };

  return (
    <>
      <Navbar />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white">
        {/* soft gold glow accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-1.5 text-sm font-medium text-amber-200">
            🏆 Awards &amp; Recognition
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            Recognised for the
            <span className="block bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
              Difference We Make
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300 leading-8">
            Every award reflects the trust of the businesses we serve. From
            industry forums to leadership summits, Direct Credit has been
            celebrated for making MSME funding faster, simpler, and more
            transparent across India.
          </p>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-amber-300">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-gray-300 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom wave */}
        <svg
          className="block w-full text-white"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,40 C360,90 1080,-10 1440,40 L1440,80 L0,80 Z"
          />
        </svg>
      </section>

      {/* ───────── AWARDS GRID ───────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950">
              Our Awards &amp; Honours
            </h2>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              A growing collection of recognitions earned through consistency,
              integrity, and a relentless focus on our customers.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a, i) => {
              const images = awards.map((x) => x.image);
              return (
                <article
                  key={i}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                    <img
                      src={a.image}
                      alt={a.title}
                      onClick={() => openImage(images, i)}
                      className="h-full w-full cursor-pointer object-contain transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x450/0f172a/fbbf24?text=${encodeURIComponent(
                          a.title
                        )}`;
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold text-blue-950 leading-snug">
                      {a.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-semibold text-amber-600">
                      {a.org}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {a.desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────── PRESS / MEDIA ───────── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-950">
            As Featured In
          </h2>
          <p className="mt-3 text-gray-500">
            Our work and milestones, covered by India's leading publications.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {press.map((name, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-6 text-sm font-semibold text-gray-500 transition hover:border-amber-300 hover:text-blue-900"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-700 py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Funding Your Business Deserves an Award-Winning Partner
          </h2>
          <p className="mt-5 text-lg text-blue-100">
            Join thousands of enterprises that trusted Direct Credit to fuel
            their growth — from ₹50 Lakh to ₹200 Crore.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/loans/business"
              className="rounded-xl bg-amber-400 px-8 py-4 font-bold text-blue-950 transition hover:bg-amber-300"
            >
              Apply for a Loan
            </a>
            <a
              href="/contact-us"
              className="rounded-xl border border-white/40 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </section>

      {/* ───────── LIGHTBOX ───────── */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <button
            className="absolute right-6 top-4 text-5xl text-white"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="absolute left-4 text-5xl text-white"
            onClick={prevImage}
            aria-label="Previous"
          >
            ❮
          </button>
          <img
            src={selectedImage}
            alt="Award preview"
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x600/0f172a/fbbf24?text=Award";
            }}
          />
          <button
            className="absolute right-4 text-5xl text-white"
            onClick={nextImage}
            aria-label="Next"
          >
            ❯
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}