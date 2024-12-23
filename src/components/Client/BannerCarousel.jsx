import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../helpers/api/baseUrl";

const BannerCarousel = () => {
  const [img, setImg] = useState([]); // Dastlab bo'sh massiv
  const [loading, setLoading] = useState(true); // Yuklashni kuzatish uchun

  function getImg() {
    axios
      .get(`${baseUrl}stadion/stadion-images/`)
      .then((res) => {
        setImg(res.data);
        setLoading(false); // Yuklash tugadi
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Xatoda ham yuklash tugadi
      });
  }

  useEffect(() => {
    getImg();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Yuklash holati
  }

  if (img.length === 0) {
    return <div>No images available</div>; // Ma'lumot bo'lmasa
  }

  return (
    <div className="w-full h-[450px] xl:h-[550px] mb-10">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        className="h-[450px] xl:h-full rounded-lg"
      >
        {img.map((slide, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <div className="w-full h-[450px] xl:w-full xl:h-full">
              {slide.photo ? (
                <img className="w-full h-full" src={slide.photo} alt={`Slide ${index + 1}`} />
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  Image not available
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
