// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// const banners = [
//  // "/Banners/Banner.jpg",
//  "/Banners/banner graphic 5.png",
//   "/Banners/banner graphic 1.png",
//   "/Banners/banner graphic 2.png",
//   "/Banners/banner graphic 3.png",
//   "/Banners/banner graphic 4.png",
//  // "/Banners/banner graphic 5.png",
//   // "/Banners/Banner-6.jpg",
//   // "/Banners/Banner-7.jpg",
// ];

// export default function BannerSlider() {
//   return (
//     <div className="w-full">
//       <Swiper
//         modules={[Autoplay, Pagination]}
//         slidesPerView={1}
//         loop={true}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//       >
//         {banners.map((banner, index) => (
//           <SwiperSlide key={index}>
//             <img
//               src={banner}
//               alt={`Banner ${index + 1}`}
//               className="w-full rounded-[24px] object-cover"
              
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }  esme slider me start click ka option nhi hai date 30.6.2026

// jo code mai likha niche esme slider banner click karne next page open hoga

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

const banners = [
  { img: "/Banners/banner graphic 5.png", link: "/cibil-score" },
  { img: "/Banners/banner graphic 1.png", link: "/loans/business" },
  { img: "/Banners/banner graphic 2.png", link: "/loans/personal" },
  { img: "/Banners/banner graphic 3.png", link: "/credit-cards" },
  { img: "/Banners/banner graphic 4.png", link: "/loans/warehouse-finance" },
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
            <Link to={banner.link}>
              <img
                src={banner.img}
                alt={`Banner ${index + 1}`}
                className="w-full rounded-[24px] object-cover cursor-pointer"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}