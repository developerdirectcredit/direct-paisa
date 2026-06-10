import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  "/Banners/Banner.jpg",
  "/Banners/Banner-1.jpg",
  "/Banners/Banner-2.jpg",
  "/Banners/Banner-3.jpg",
  "/Banners/Banner-4.jpg",
  "/Banners/Banner-5.jpg",
  "/Banners/Banner-6.jpg",
  "/Banners/Banner-7.jpg",
];

export default function BannerSlider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full rounded-[24px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}