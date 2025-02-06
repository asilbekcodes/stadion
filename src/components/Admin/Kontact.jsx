import React from "react";

function Kontact() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl dark:text-blue-400 mb-4">
        Qo'shimcha tel raqamlar
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Bu yerda qo'shimcha telfon raqamlar qushishingiz mumkun.
      </p>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="first_tel"
            className="block text-sm font-medium dark:text-gray-100"
          >
            1-raqam
          </label>
          <input
            type="number"
            id="first_tel"
            // ref={first_name}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            // defaultValue={getProfil?.first_name || ""}
          />
        </div>

        <div>
          <label
            htmlFor="second_tel"
            className="block text-sm font-medium dark:text-gray-100"
          >
            2-raqam
          </label>
          <input
            type="number"
            id="second_tel"
            // ref={last_name}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            // defaultValue={getProfil?.last_name || ""}
          />
        </div>

        <div>
          <label
            htmlFor="phone_number"
            className="block text-sm font-medium dark:text-gray-100"
          >
            3-raqam
          </label>
          <input
            type="number"
            id="phone_number"
            // value={newPhoneNumber}
            // onChange={(e) => setNewPhoneNumber(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
        //   disabled={isLoading}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 disabled:bg-blue-300"
        >
            Saqlash
          {/* {isLoading ? "Yuklanmoqda..." : "O'zgartirish"} */}
        </button>
      </form>
    </div>
  );
}

export default Kontact;
