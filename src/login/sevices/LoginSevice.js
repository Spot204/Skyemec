const API_BASE_URL = "http://localhost:5050";

/**
 * Gọi API đăng nhập với username và password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} Trả về object chứa token và user nếu thành công
 * @throws {Error} Ném lỗi khi đăng nhập thất bại hoặc lỗi mạng
 */
export async function login(username, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/login/dangnhap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (!response.ok) {
      // Ném lỗi với message từ server hoặc mặc định
      throw new Error(result.message || "Lỗi đăng nhập");
    }

    // Trả về dữ liệu token và user
    return result;
  } catch (error) {
    // Có thể log lỗi hoặc xử lý khác nếu cần
    throw new Error(error.message || "Lỗi khi kết nối server");
  }
}
