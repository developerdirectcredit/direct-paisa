import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Culture() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [allImages, setAllImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Core culture values shown as cards (Continuous Learning ko alag bada section bana diya)
  const values = [
    {
      title: "Trust & Inclusivity",
      desc: "By fostering a culture of trust and inclusivity, we create an environment where challenges are met head-on and everyone feels valued.",
    },
    {
      title: "Innovation",
      desc: "Our culture drives innovation and fuels creativity, inspiring every team member to do their best work, every single day.",
    },
  ];

  // Quick highlight stats / achievements
  const highlights = [
    {
      stat: "4.7 / 4.9",
      label: "AmbitionBox & Google Reviews ratings",
    },
    {
      stat: "₹20Cr+",
      label: "Disbursed with Piramal Finance",
    },
    {
      stat: "Faster",
      label: "Approvals & smooth processing by a committed team",
    },
    {
      stat: "Hands-on",
      label: "Training in practical skills & financial sector knowledge",
    },
  ];

  // Photo gallery — har image ka direct path yahan likha hai.
  const gallery = [
    {
      year: "2026",
      events: [
        {
          title: "Sales & Credit Training Session",
          images: [
            "/culture/2026/Sales-Credit-Training-1.jpg",
            "/culture/2026/Sales-Credit-Training-2.jpg",
            "/culture/2026/Sales-Credit-Training-3.jpg",
          ],
        },
        {
          title: "Direct Credit Premier League",
          images: [
            "/culture/2026/Direct-Credit-Premier-League-1.png",
            "/culture/2026/Direct-Credit-Premier-League-2.png",
            "/culture/2026/Direct-Credit-Premier-League-3.png",
            "/culture/2026/Direct-Credit-Premier-League-4.png",
            "/culture/2026/Direct-Credit-Premier-League-5.png",
            "/culture/2026/Direct-Credit-Premier-League-6.png",
            "/culture/2026/Direct-Credit-Premier-League-7.png",
            "/culture/2026/Direct-Credit-Premier-League-8.png",
          ],
        },
        {
          title: "International Women's Day",
          images: [
            "/culture/2026/International-Womens-Day-1.jpg",
            "/culture/2026/International-Womens-Day-3.jpg",
            "/culture/2026/International-Womens-Day-4.jpg",
            "/culture/2026/International-Womens-Day-5.jpg",
            "/culture/2026/International-Womens-Day-6.jpg",
          ],
        },
        {
          title: "Holi Celebration",
          images: [
            "/culture/2026/Holi-2026-1.png",
            "/culture/2026/Holi-2026-2.png",
            "/culture/2026/Holi-2026-3.png",
            "/culture/2026/Holi-2026-4.png",
          ],
        },
        {
          title: "Annual Day Celebration",
          images: [
            "/culture/2026/Annual-Day-2026-1.png",
            "/culture/2026/Annual-Day-2026-2.png",
            "/culture/2026/Annual-Day-2026-3.png",
            "/culture/2026/Annual-Day-2026-4.png",
            "/culture/2026/Annual-Day-2026-5.png",
            "/culture/2026/Annual-Day-2026-6.png",
            "/culture/2026/Annual-Day-2026-7.png",
            "/culture/2026/Annual-Day-2026-8.png",
            "/culture/2026/Annual-Day-2026-9.png",
          ],
        },
        {
          title: "New Office Inauguration",
          images: [
            "/culture/2026/New-Office-Inauguration-1.png",
            "/culture/2026/New-Office-Inauguration-2.png",
            "/culture/2026/New-Office-Inauguration-3.png",
            "/culture/2026/New-Office-Inauguration-4.png",
            "/culture/2026/New-Office-Inauguration.png",
            "/culture/2026/New-Office-Inauguration-6.png",
            "/culture/2026/New-Office-Inauguration-7.png",
            "/culture/2026/New-Office-Inauguration-8.png",
            "/culture/2026/New-Office-Inauguration-9.png",
            "/culture/2026/New-Office-Inauguration-10.png",
            "/culture/2026/New-Office-Inauguration-11.png",
            "/culture/2026/New-Office-Inauguration-12.png",
          ],
        },
        {
          title: "Birthday Celebrations",
          images: [
            "/culture/2026/Birthday-Celebrations-1.jpg",
            "/culture/2026/Bharat-Birthday.jpg",
          ],
        },
      ],
    },
  ];

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

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold leading-tight">
            Team Direct Credit
          </h1>

          {/* Hero image */}
          <div className="mt-6">
            <img
              src="/culture/team-dc.jpg"
              alt="Team Direct Credit"
              className="w-full max-w-4xl mx-auto rounded-3xl shadow-2xl object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/1024x500/0f172a/94a3b8?text=Team+Direct+Credit";
              }}
            />
          </div>

          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto leading-8">
            At Direct Credit, we believe our culture is the foundation of our
            success. It drives innovation, fuels creativity, and creates a
            supportive environment where everyone can thrive. We're committed to
            building a workplace where people feel valued, empowered, and
            inspired to do their best work.
          </p>
        </div>
      </section>

      {/* Intro Quote — LEFT image, RIGHT text */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: image (apna path yahan daalo) */}
            <div>
              <img
                src="/culture/2026/Yogendra-sir-1.jpg"
                alt="United by purpose, stronger as a team"
                className="w-full rounded-3xl shadow-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x450/1e293b/94a3b8?text=Yogendra+sir+1";
                }}
              />
            </div>

            {/* Right: text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-snug">
                “United by purpose, stronger as a team.”
              </h2>

              <p className="mt-6 text-gray-600 leading-8 text-lg">
                We know that when we work together, we can achieve anything. By
                fostering a culture of trust and inclusivity, we create an
                environment where ideas flow freely, challenges are met
                head-on, and every team member's contribution makes a
                difference.
              </p>
            </div>
          </div>
        </div>
      </section>

     {/* Continuous Learning — LEFT text, RIGHT image */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900 leading-snug">
                Continuous Learning
              </h2>

              <p className="mt-6 text-gray-600 leading-8 text-lg">
                At Direct Credit, we don't just build careers, we nurture a
                culture that encourages continuous learning, helping our people
                grow and succeed together.
              </p>

              <p className="mt-6 text-gray-600 leading-8 text-lg">
                Through hands-on training in practical skills and financial
                sector knowledge, every team member gets the support they need
                to keep growing — both personally and professionally.
              </p>
            </div>

            {/* Right: image (apna path yahan daalo) */}
            <div>
              <img
                src="/culture/2026/Naina-mam.png"
                alt="Continuous Learning at Direct Credit"
                className="w-full rounded-3xl shadow-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/600x450/1e293b/94a3b8?text=Continuous+Learning";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Teamwork fuels success — heading + full-width images */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 italic leading-snug">
              “Teamwork fuels success — let's engage and elevate each other!”
            </h2>
          </div>

          {/*
            Full-width images — yahan jitni chaho utni image add kar sakte ho.
            Bas neeche array mein ek aur line add kar do:
              "/culture/your-image.jpg",
          */}
          <div className="mt-12 space-y-8">
            {[
              "/culture/2026/Team-DC-2.png",
              // "/culture/Team-DC-3.png",   ← aur image add karne ke liye comment hatao / nayi line daalo
              // "/culture/Team-DC-4.png",
            ].map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Teamwork fuels success ${idx + 1}`}
                className="w-full rounded-3xl shadow-xl object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/1200x450/1e293b/94a3b8?text=Teamwork+DC";
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Defines Our Culture
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-white border rounded-3xl p-8 hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold mb-4 text-blue-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-7">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights / Stats */}
      <section className="bg-blue-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            The Vibrant Team Spirit Drives Our Success
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 rounded-2xl p-8 text-center"
              >
                <h3 className="text-3xl font-bold mb-3">{item.stat}</h3>
                <p className="text-gray-300 leading-7">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Photo Gallery</h2>
          <p className="text-center text-gray-500 mb-16">
            Moments from our celebrations, trainings, and team events.
          </p>

          {gallery.map((yearBlock, yi) => (
            <div key={yi} className="mb-20">
              <h3 className="text-3xl font-bold text-blue-900 mb-10 border-b pb-4">
                {yearBlock.year}
              </h3>

              {yearBlock.events.map((event, ei) => (
                <div key={ei} className="mb-12">
                  <h4 className="text-xl font-semibold mb-6 text-gray-800">
                    {event.title}
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {event.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`${event.title} ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-2xl shadow hover:scale-105 transition cursor-pointer"
                        onClick={() => {
                          setAllImages(event.images);
                          setCurrentIndex(idx);
                          setSelectedImage(src);
                        }}
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/400x300/1e293b/94a3b8?text=${encodeURIComponent(
                            event.title
                          )}`;
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Want To Be Part Of Our Story?
          </h2>

          <p className="mt-6 text-xl">
            Join a team that grows together, celebrates together, and succeeds
            together.
          </p>

          <a
            href="/careers"
            className="inline-block mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition"
          >
            View Careers
          </a>
        </div>
      </section>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-white text-5xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white text-5xl"
            onClick={prevImage}
          >
            ❮
          </button>

          {/* Full Image */}
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl"
          />

          {/* Next Button */}
          <button
            className="absolute right-4 text-white text-5xl"
            onClick={nextImage}
          >
            ❯
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}