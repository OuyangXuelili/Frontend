/**
 * fetchModel - Gửi yêu cầu GET đến backend server để lấy dữ liệu model.
 *
 * @param {string} url - Đường dẫn endpoint, ví dụ: "/api/photos"
 * @returns {Promise<any>} - Promise trả về dữ liệu JSON từ backend
 */
const BASE_URL = "https://dv7rqy-5001.csb.app";

function fetchModel(url) {
  return fetch(`${BASE_URL}${url}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      throw error;
    });
}

export default fetchModel;
