// "use client"

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../helpers/api/baseUrl"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

const BannerCarousel = () => {
  const [img, setImg] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  function getImg() {
    axios
      .get(`${baseUrl}stadion/stadion-images/`)
      .then((res) => {
        setImg(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    getImg()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (img.length === 0) {
    return <div>No images available</div>
  }

  return (
    <div className="relative w-full h-[450px] xl:h-[550px] mb-10 group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: "bg-purple-600 !opacity-100",
          bulletClass: "inline-block w-2 h-2 rounded-full bg-gray-400 mx-1 cursor-pointer transition-all duration-300",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        slidesPerView={1}
        className="h-[450px] xl:h-full rounded-lg"
      >
        {img.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/about/${slide.id}`)} // Yo'naltirish
          >
            <div className="w-full h-[450px] xl:w-full xl:h-full">
              {slide.photo ? (
                <img
                  className="w-full h-full object-cover rounded-[20px]"
                  src={slide.photo || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center">Image not available</div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="swiper-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

export default BannerCarousel
