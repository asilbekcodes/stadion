import React, { useState } from "react";

// Vaqtni formatlash funksiyasi
const formatDate = (isoString) => {
  const months = [
    "yanvar",
    "fevral",
    "mart",
    "aprel",
    "may",
    "iyun",
    "iyul",
    "avgust",
    "sentyabr",
    "oktyabr",
    "noyabr",
    "dekabr",
  ];

  const date = new Date(isoString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const CommitLog = ({ reviews }) => {
  const [visibleCommits, setVisibleCommits] = useState(5); // Boshlang'ich ko'rsatilgan commitlar soni

  // Commitlarni ko'rsatishni oshirish
  const showMoreCommits = () => {
    setVisibleCommits((prev) => prev + 5); // Har safar 5 ta commit qo'shish
  };

  return (
    <div className="bg-gray-50 p-4 lg:px-40">
      {reviews.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-sm w-full ">
          {reviews.slice(0, visibleCommits).map((commit) => (
            <div key={commit.id}>
              <div className="flex items-start space-x-4 mb-4 ">
                <img
                  src={commit.user.photo}
                  alt={`${commit.user.first_name} avatar`}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-800 dark:text-gray-100 font-semibold">
                    {commit.user.first_name + " " + commit.user.last_name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                    {formatDate(commit.created_at)}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400">{commit.comment}</p>
              <hr className="my-4" />
            </div>
          ))}

          {visibleCommits < reviews.length && (
            <button
              onClick={showMoreCommits}
              className="text-blue-600 mt-4"
            >
              Boshqa commitlarni ko'rish
            </button>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default CommitLog;
