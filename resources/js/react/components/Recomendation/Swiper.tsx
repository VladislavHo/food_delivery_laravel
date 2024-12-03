import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

export default function Recomendation({ recomendation }: any) {
  console.log(recomendation);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          480: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          // 768: {
          //   slidesPerView: 4,
          //   spaceBetween: 40,
          // },
          // 1024: {
          //   slidesPerView: 5,
          //   spaceBetween: 50,
          // },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          recomendation.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <div className="swiper-slide--info">
                  <img src='./images/food.jpg' alt="" />
                  <span>{item.title}</span>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}
