import { useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';


import 'swiper/css';
import 'swiper/css/pagination';



import { Pagination } from 'swiper/modules';
import { getFoodsFilterByApi } from '../../api/foods';

export default function Recomendation() {
  const [recomendation, setRecomendation] = useState<any>([])
  useEffect(() => {
    getRecomendation()
  }, [])
  async function getRecomendation() {
    try {
      const response = await getFoodsFilterByApi({ d: 1, r: 1, all: 1 })
      if (response.status !== 200) return
      setRecomendation(response.data)

    } catch (error) {
      console.log(error)
    }
  }
  console.log(recomendation, 'recomendation');

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
          recomendation.foods && recomendation?.foods.map((item: any, index: number) => {
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
