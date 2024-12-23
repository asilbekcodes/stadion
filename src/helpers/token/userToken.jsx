function getToken() {
  const userToken = localStorage.getItem("userToken");
  return userToken ? userToken : "";
}

export const userConfig = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};


