

// add start samne name

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { UserCircle } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Amitesh Anand",
    date: "20 Jan 2026",
    title: "Best Advisor for Personal Loan",
    review:
      "I would like to share my feedback regarding my recent interaction with Mr. Vipin Singh. He explained everything clearly, handled the discussion patiently, and ensured all concerns were addressed effectively. His communication skills and dedication truly reflect his commitment.",
  },
  {
    name: "Lalit Mavi",
    date: "22 Jan 2026",
    title: "My Trust in direct credit has Increased",
    review:
      "The executive who assisted me was extremely professional, polite, and knowledgeable. They patiently understood my concern, explained the process clearly, and guided me step by step. My trust has increased even more because of this positive experience.",
  },
  {
    name: "Rahul Sharma",
    date: "25 Jan 2026",
    title: "Excellent Customer Support",
    review:
      "The entire process was smooth and transparent. The support team was very responsive and helped me at every stage. I received timely updates and excellent guidance throughout my loan application journey.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Customer Reviews
        </h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-2xl shadow-lg p-6 h-[380px] flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border hover:border-blue-200 cursor-pointer">

                {/* Review Title */}
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                  {item.title}
                </h3>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed flex-1">
                  {item.review}
                </p>

                {/* User Info Bottom */}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center gap-3">

                    <UserCircle
                      size={48}
                      className="text-blue-600"
                    />

                    <div className="flex-1">
                      <div className="flex items-center justify-between">

                        <h4 className="font-semibold text-gray-900">
                          {item.name}
                        </h4>

                        <div className="text-yellow-500 text-sm">
                          ⭐⭐⭐⭐⭐
                        </div>

                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.date}
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}