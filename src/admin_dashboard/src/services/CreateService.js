// src/services/CreateService.js

const API_BASE_URL = "http://localhost:5050/api/create-account";

/**
 * Gửi yêu cầu tạo tài khoản mới
 * @param {Object} data - Dữ liệu người dùng
 * @returns {Object} user - Người dùng vừa được tạo
 */
export async function createUser(data) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Tạo tài khoản thất bại");
    }

    return result.user;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API tạo tài khoản:", error);
    throw new Error("Không thể kết nối tới server hoặc server trả về lỗi.");
  }
}
