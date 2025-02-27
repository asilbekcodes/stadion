import React, { useState } from "react";

const User = ({ data }) => {
  const [showAll, setShowAll] = useState(false);
  const users = data?.users || [];

  // Foydalanuvchilar sonini cheklash
  const visibleUsers = showAll ? users : users.slice(0, 5);

  return (
    <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-bold mb-4">Foydalanuvchilar</h2>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 border-t border-gray-200 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" className="pr-2 md:pr-2 py-3">
              ID
            </th>
            <th scope="col" className="pr-2 md:pr-2 py-3">
              Ism
            </th>
            <th scope="col" className="pr-2 md:pr-2 py-3">
              Familiya
            </th>
            <th scope="col" className="pr-2 md:pr-2 py-3">
              Tel
            </th>
            <th scope="col" className="pr-2 md:pr-2 py-3">
              Bron soni
            </th>
          </tr>
        </thead>
        <tbody className="border-b border-gray-200">
          {visibleUsers.length > 0 ? (
            visibleUsers.map((user, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } dark:bg-gray-700`}
              >
                <th scope="row" className="pr-2 md:pr-6 py-3">
                  {index + 1}
                </th>
                <td className="pr-2 md:pr-6 py-3">
                  {user?.user?.first_name || "Noma'lum"}
                </td>
                <td className="pr-2 md:pr-6 py-3">
                  {user?.user?.last_name.length > 5
                    ? user?.user?.last_name.slice(0, 5) + "..."
                    : user?.user?.last_name || "Noma'lum"}
                </td>
                <td className="pr-2 md:pr-6 py-3">
                  {user?.user?.phone_number || "Noma'lum"}
                </td>
                <td className="pr-2 md:pr-6 py-3">{user?.bron || "0"} ta</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                Ma'lumot yo'q
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Tugma */}
      {users.length > 5 && (
        <div className="text-end">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="dark:text-white  rounded focus:outline-none"
          >
            {showAll ? "Kamroq ko'rsatish" : "Hammasini ko'rish"}
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
