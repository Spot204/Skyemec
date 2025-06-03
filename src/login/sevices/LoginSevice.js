const API_BASE_URL = "http://localhost:5050";

/**
 * Gọi API đăng nhập với username và password
 * @param {string} username
 * @param {string} password
 * @returns {Promise<Object>} Trả về object chứa user nếu thành công
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
      throw new Error(result.message || "Lỗi đăng nhập");
    }

    // Trả về dữ liệu user (không có token)
    return result;
  } catch (error) {
    throw new Error(error.message || "Lỗi khi kết nối server");
  }
}
