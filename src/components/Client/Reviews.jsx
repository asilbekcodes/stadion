// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

const ReviewSwiper = ({ reviews }) => {
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(date).toLocaleDateString('uz-UZ', options);
  };
  return (
    <div className="bg-gray-50 p-3 lg:px-40">
      <div className="flex items-center justify-between py-4">
        {/* <div className="flex items-center gap-2">
          <p className="text-red-500 md:text-lg text-sm font-bold">4.52</p>
          <p className="text-gray-500 md:text-sm text-[12px]">(35)</p>
        </div> */}
        {/* <div className="flex gap-3">
                <button className="swiper-button-prev bg-gray-300 rounded-full pl-2 py-1 md:pl-4 md:py-3 md:pr-2 ">
                    <MdArrowBackIos />
                </button>
                <button className="swiper-button-next bg-gray-300 rounded-full px-1 py-1 md:px-3 md:py-3">
                    <MdArrowForwardIos />
                </button>
            </div> */}
      </div>
      <div className="overflow-x-scroll md:overflow-x-hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation]}
          className="w-full"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md p-5 rounded-lg">
                {/* Foydalanuvchi haqida ma'lumot */}
                <div className="flex items-center mb-3">
                  <img
                    className="bg-gray-300 rounded-full w-10 h-10 mr-3"
                    src={review.user.photo}
                    alt=""
                  />
                  <div>
                    <div className="text-gray-800 font-bold">
                      {review.user.first_name + " " + review.user.last_name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {formatDate(review.created_at)}
                    </div>
                  </div>
                </div>

                {/* Reytinglar */}
                {/* <div className="mb-3">
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Инфраструктура:</span>
                    <span>{review.ratings.infrastructure}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Персонал:</span>
                    <span>{review.ratings.staff}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-sm">
                    <span>Покрытие:</span>
                    <span>{review.ratings.coverage}</span>
                  </div>
                </div> */}

                {/* Sharh matni */}
                <div className="text-gray-700 text-sm">{review.comment}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSwiper;
