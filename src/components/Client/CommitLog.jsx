import React, { useState } from "react";

// Sana formatlash funksiyasi
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
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

const CommitLog = ({ reviews }) => {
  const [visibleCommits, setVisibleCommits] = useState(5); // Boshlang'ich commitlar soni
  const [expandedComments, setExpandedComments] = useState({}); // Izohlarni ochish uchun holat

  // Izohlarni qisqartirish yoki kengaytirish
  const toggleComment = (id) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="bg-white px-4 py-8 lg:px-40 flex flex-wrap gap-4">
      {reviews.length > 0 ? (
        <>
          {reviews.slice(0, visibleCommits).map((commit) => {
            const isExpanded = expandedComments[commit.id];
            const shortComment = commit.comment.slice(0, 120); // Qisqa izoh

            return (
              <div
                key={commit.id}
                className="bg-white p-5 rounded-lg shadow-md w-full sm:w-[320px]"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={commit.user.photo}
                    alt={`${commit.user.first_name} avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-gray-800 font-semibold text-sm">
                      {commit.user.first_name} {commit.user.last_name}
                    </p>
                    <p className="text-[16px] text-gray-500">
                      {formatDate(commit.created_at)}
                    </p>
                  </div>
                </div>

                {/* <div className="text-xs text-gray-600 flex space-x-2 mb-2">
                  <span>Infratuzilma: {commit.infrastructure}/5</span>
                  <span>Personal: {commit.staff}/5</span>
                  <span>Qoplama: {commit.cover}/5</span>
                </div> */}

                <p className="text-[#292929] text-[18px] mt-5">
                  {isExpanded ? commit.comment : `${shortComment}`}
                </p>

                {/* <button
                  onClick={() => toggleComment(commit.id)}
                  className="text-blue-500 text-xs mt-1"
                >
                  {isExpanded ? "Yopish" : "Ko‘proq"}
                </button> */}
              </div>
            );
          })}

          {visibleCommits < reviews.length && (
            <button
              onClick={() => setVisibleCommits((prev) => prev + 5)}
              className="text-blue-600 mt-4 py-2 px-4 rounded border border-blue-600 hover:bg-blue-600 hover:text-white"
            >
              Boshqa commitlarni ko'rish
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-500">Hech qanday commit mavjud emas.</p>
      )}
    </div>
  );
};

export default CommitLog;
