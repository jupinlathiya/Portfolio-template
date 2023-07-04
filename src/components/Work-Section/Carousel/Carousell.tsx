import React, { useRef } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import style from "../Carousel/style.module.css";
import { useAppSelector } from "../../../Hooks/Hooks";
import Card from "../Work-Card/Card";
import Loader from "../../Comman/Loader/Loader";
SwiperCore.use([Navigation, Pagination]);
const Carousel = () => {
  const works = useAppSelector((state) => state.work.allWorks);
  const pending = useAppSelector((state) => state.work.pending);

  return (
    <>
      <div className={style.cardContainer}>
        {pending && (
          <div className={style.loader}>
            {" "}
            <Loader />
          </div>
        )}
        {!pending && works?.length == 0 && (
          <h1 className={style.loader}>Data not found</h1>
        )}
        <Swiper navigation={true} pagination={{ clickable: true }}>
          {works?.map((work, index) => (
            <SwiperSlide key={index}>
              <Card
                workTitle={work.workTitle}
                workDesc={work.workDesc}
                image={work.Image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
