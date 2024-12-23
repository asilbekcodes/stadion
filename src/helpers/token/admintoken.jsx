function getToken() {
    const token = localStorage.getItem('adminToken');
    return token ? token : '';
  }
  
  export const Adminconfig = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };