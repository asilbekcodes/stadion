// import React from 'react';
import Navbar from "../../components/Client/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Client/Card";
import { useEffect, useState } from "react";
import { baseUrl } from "../../helpers/api/baseUrl";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowBack, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { ImCross } from "react-icons/im";
import MapComponent from "../../components/MapComponent";
import CommitLog from "../../components/Client/CommitLog";
import { Box, TextField, Button } from "@mui/material";
import { userConfig } from "../../helpers/token/userToken";
import Footers from "./Footer";

function About() {
  const navigate = useNavigate();

  const { resultId } = useParams();

  const [result, setResult] = useState([]);

  const [reviews, setReviews] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [comment, setComment] = useState("");

  const stadionReviews = () => {
    axios
      .get(`${baseUrl}stadion/stadion-review/${resultId}/`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}stadion/${resultId}/`)
      .then((res) => setResult(res.data))
      .catch((err) => console.log(err));

    stadionReviews();
  }, [resultId]);

  const latitude = result.latitude;
  const longitude = result.longitude;

  if (latitude === undefined || longitude === undefined) {
    return;
  }

  const postComment = () => {
    axios
      .post(
        `${baseUrl}stadion/stadion-review/${resultId}/`,
        {
          comment: comment,
        },
        userConfig
      )
      .then((res) => stadionReviews())
      .catch((err) => console.log(err));
  };

  const postCommentHandler = () => {
    postComment();
    setIsEditing(false);
    setComment("");
  };

  return (
    <div className="w-full">
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="md:px-3 lg:px-40 flex flex-col md:flex-row justify-between bg-gray-50">
        <div className="w-full md:w-[500px]">
          <img
            className="w-full h-60 md:h-96 rounded-none md:rounded-md shadow-sm mb-4"
            src={result.photo}
          />
          <button
            className="absolute top-4 left-4 text-xl cursor-pointer bg-white p-2 rounded-full md:hidden"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack />
          </button>
          <div className="grid grid-cols-3 gap-2">
            {result?.images?.length > 0
              ? result.images.map((img) => (
                  <img
                    key={img.id}
                    className="h-20 w-full rounded-md"
                    src={img.image}
                    alt="Stadion rasm"
                  />
                ))
              : ""}
          </div>
        </div>

        <div className="w-full md:w-[400px] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] p-4">
          <div className="">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-red-500 text-lg">
                <FaStar />
              </span>
              <span className="text-gray-500">
                {result.star}{" "}
              </span>
            </div>
            <h2 className="text-2xl md:text-[32px] font-semibold">
              {result.title}
            </h2>
            <p className="text-base flex items-center gap-1 md:text-lg text-gray-500 my-4">
              <span className="text-green-500">
                <IoLocationOutline />
              </span>
              {result.address}
            </p>
            {/* Faqat mobil versiya uchun */}
            <div className="fixed bottom-0 left-0 right-0 w-full bg-white p-4 border-t md:hidden z-50">
              <div className="flex justify-between items-center">
                <p className="text-lg font-bold">{result.price} so`m</p>
                <Link to={`/clintBron/${result.id}`}>
                  <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300">
                    Joyni band qilish
                  </button>
                </Link>
              </div>
            </div>
            {/* Kompyuter versiyasi */}
            <div className="hidden md:block">
              <p className="text-base md:text-lg font-bold mt-8 md:mt-20 mb-4">
                {result.price} so`m
              </p>
              <div className="flex flex-col md:flex-row justify-between mt-4 md:mt-8 space-y-4 md:space-y-0">
                <Link to={`/clintBron/${result.id}`}>
                  <button className="w-full md:w-[200px] lg:w-[230px] xl:w-[280px] bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition duration-300">
                    Joyni band qilish
                  </button>
                </Link>
                <button className="text-gray-500 w-full md:w-[300px]">
                  Добавить в <span className="text-lg">🤍</span>
                </button>
              </div>
              <div className="mt-6 md:mt-[20px]">
                <button className="w-full border border-gray-300 rounded-lg py-3 px-3 text-gray-500">
                  Инвентарь
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 lg:px-40 md:pt-20 flex flex-col md:flex-row justify-between bg-gray-50">
        <div className="w-full md:w-[400px] mb-8 md:mb-0">
          <p className="font-bold">Tavsif</p>
          <p className="mt-3">{result.description}</p>
        </div>
        <div>
          <p className="font-bold ">Sport</p>
          <div className="flex gap-3 mt-3 flex-wrap mb-8 md:mb-0">
            <input
              className="border border-black rounded-lg h-10 p-2"
              type="text"
            />
            <input
              className="border border-black rounded-lg h-10 p-2"
              type="text"
            />
          </div>
        </div>
        <div className="w-full md:w-[250px]">
          <p className="font-bold">Sharoitlar</p>
          <div className="mt-3 font-sans">
            <div className="flex items-center justify-between">
              <p>Kiyinish xonasi:</p>
              {result.kiyinish_xonasi ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 text-lg" />
              ) : (
                <ImCross className="text-red-500" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <p>Dush:</p>
              {result.dush ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 text-lg" />
              ) : (
                <ImCross className="text-red-500" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <p>Yoritish:</p>
              {result.yoritish ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 text-lg" />
              ) : (
                <ImCross className="text-red-500" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <p>Parkovka:</p>
              {result.parkofka ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 text-lg" />
              ) : (
                <ImCross className="text-red-500" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <p>Forma:</p>
              {result.forma ? (
                <IoMdCheckmarkCircleOutline className="text-green-500 text-lg" />
              ) : (
                <ImCross className="text-red-500" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 lg:px-40 md:py-16 md:gap-20 gap-0 bg-gray-50 flex flex-col md:flex-row justify-between">
        <div className="w-full">
          <MapComponent
            className={"h-[300px] lg:h-[450px] w-full z-0"}
            center={[result.latitude || 0, result.longitude || 0]} // Markaz joylashuvi
            zoom={15} // Zoom darajasi
            markers={[
              {
                id: result.id || 1, // Marker ID
                latitude: result.latitude || 0, // Latitude
                longitude: result.longitude || 0, // Longitude
                title: result.title || "Noma'lum manzil", // Pop-up matni
              },
            ]}
          />
        </div>
        <div className="w-full md:w-[500px] font-sans">
          <p className="font-bold pb-1 pt-5">Vaqti</p>
          <p className="flex items-center gap-2 pb-5">
            {result.start_time && result.start_time.slice(0, 5)}
            <span> - {result.end_time && result.end_time.slice(0, 5)}</span>
          </p>
          <p className="font-bold py-1">Manzil</p>
          <p>{result.address}</p>
          <p className="font-bold py-5">Kontakt</p>
          <p>{result.user.phone_number}</p>
        </div>
      </div>
      <div className="pt-4 bg-gray-50">
        <div className="p-4 lg:px-40">
          <Box sx={{ width: "100%" }}>
            {isEditing ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  p: 2,
                  backgroundColor: "#fff",
                }}
              >
                <TextField
                  multiline
                  fullWidth
                  minRows={3}
                  variant="standard"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#1976d2",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976d2",
                      },
                    },
                    "& .MuiInputBase-input": {
                      color: "#000",
                    },
                  }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => {
                      setIsEditing(false);
                      setComment("");
                    }}
                    sx={{
                      borderColor: "#ccc",
                      color: "#555",
                      borderRadius: "25px",
                      "&:hover": {
                        backgroundColor: "#f5f5f5",
                        borderColor: "#aaa",
                      },
                    }}
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={postCommentHandler}
                    sx={{
                      backgroundColor: "#1976d2",
                      color: "#fff",
                      borderRadius: "25px",
                      "&:hover": { backgroundColor: "#1565c0" },
                    }}
                  >
                    Yuborish
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box
                onClick={() => setIsEditing(true)}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  p: 2,
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  color: "#888",
                  "&:hover": {
                    borderColor: "#1976d2",
                  },
                }}
              >
                Add a comment
              </Box>
            )}
          </Box>
        </div>
        <CommitLog reviews={reviews} />
      </div>

      <div className="px-3 pt-4 pb-24 lg:px-40 bg-gray-50 md:pb-40">
        <p className="text-[15px] md:text-[25px] font-semibold mb-4">
          Tavsif etilgan{" "}
        </p>
        <Card
          className={"overflow-x-scroll md:overflow-x-hidden"}
          classNames={
            "grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-[330px] gap-y-5 sm:gap-5"
          }
          classNm={
            "flex flex-col rounded-lg border border-gray-200 bg-white shadow-md relative w-[320px] sm:w-full"
          }
        />
      </div>
      <Footers />
    </div>
  );
}

export default About;
