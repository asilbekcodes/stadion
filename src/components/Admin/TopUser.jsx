const TopUsers = ({ data }) => {
    // Ma'lumotlarni faqat 3 ta bilan cheklash
    const topUser = data?.users?.slice(0, 3);
  
    return (
      <div className="dark:bg-gray-700 bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">Eng yaxshi foydalanuvchilar</h2>
        {topUser && topUser.length > 0 ? (
          <div className="flex gap-5 justify-center flex-wrap">
            {topUser.map((user, index) => (
              <div
                key={index}
                className={`w-36 md:w-40 p-4 rounded-lg shadow-md text-center text-white ${
                  index === 0
                    ? "bg-green-500"
                    : index === 1
                    ? "bg-purple-500"
                    : "bg-yellow-500"
                }`}
              >
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-2 bg-gray-200 text-black flex items-center justify-center font-serif text-xl border-white mt-3">
                  {user?.user?.first_name?.charAt(0) +
                    " " +
                    user?.user?.last_name?.charAt(0)}
                </div>
  
                <h3 className="mt-5 font-bold text-lg">
                  {user?.user?.first_name + " " + user?.user?.last_name}
                </h3>
  
                <p className="text-2xl font-bold mt-2">{user.bron} ta</p>
  
                <div
                  className={`mt-7 px-4 py-1 rounded-lg text-sm ${
                    index === 0
                      ? "bg-green-700"
                      : index === 1
                      ? "bg-purple-700"
                      : "bg-yellow-700"
                  }`}
                >
                  {index + 1}-o‘rin
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Ma'lumot yo'q</p>
        )}
      </div>
    );
  };
  
  export default TopUsers;
  