import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../helpers/api/baseUrl";
import { Adminconfig } from "../../../helpers/token/admintoken";

const Images = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/stadion/stadion-images/${id}/`, Adminconfig());
      setImages(response.data);
    } catch (err) {
      setError("Rasmlarni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError("Iltimos, rasm tanlang.");
      return;
    }

    const formData = new FormData();
    formData.append("stadion_id", id);
    formData.append("images", selectedFile);

    try {
      setLoading(true);
      await axios.post(`${baseUrl}/stadion/stadion-images/all-add/`, formData, Adminconfig());
      setSelectedFile(null);
      fetchImages(); // UI'ni yangilash
    } catch (err) {
      setError("Rasmni yuklashda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async (imageId) => {
    try {
      setLoading(true);
      await axios.post(`${baseUrl}stadion/stadion-images/${id}/delete/${imageId}/`, '', Adminconfig());
      setImages(images.filter((image) => image.id !== imageId)); // UI'dan o‘chirish
    } catch (err) {
      setError("Rasmni o‘chirishda xatolik yuz berdi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 rounded-lg dark:bg-gray-800 bg-white">
      <div className="flex flex-col gap-3 dark:text-white">
        <div className="flex justify-between font-semibold border-b pb-4">
          <input
            type="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="w-48 md:w-64 border dark:border-gray-300 border-gray-700 p-1"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleImageUpload}
          >
            Rasm qo‘shish
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {loading ? (
          <p>Yuklanmoqda...</p>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="flex justify-between items-center gap-2 border-b pb-5"
            >
              <div className="flex gap-2 items-center">
                <img src={image.image} alt={`stadion-${image.id}`} className="w-16 h-16 object-cover rounded" />
              </div>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => handleRemoveImage(image.id)}
              >
                Rasmni o‘chirish
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Images;
