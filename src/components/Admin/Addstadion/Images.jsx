import { useState } from "react";

const Images = () => {
  const [images, setImages] = useState([""]);

  const handleAddImage = () => {
    if (images.length < 4) {
      setImages([...images, ""]);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 rounded-lg bg-gray-800">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between font-semibold">
          <span>Image</span>
          <span>Delete?</span>
        </div>
        {images.map((_, index) => (
          <div key={index} className="flex items-center gap-3 border-b pb-2">
            <button
              className="text-green-500 text-lg font-bold"
              onClick={handleAddImage}
              disabled={images.length >= 4}
            >
              +
            </button>
            <input type="file" className="border p-1" />
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleRemoveImage(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {images.length < 4 && (
        <button
          className="mt-3 px-4 py-2 bg-gray-200 rounded"
          onClick={handleAddImage}
        >
          Add another Image
        </button>
      )}
    </div>
  );
};

export default Images;
