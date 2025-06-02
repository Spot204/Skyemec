const API_BASE_URL = "http://localhost:5050/api";

/**
 * Lấy danh sách tất cả lịch hẹn từ server
 * @returns {Promise<Array>} - Danh sách lịch hẹn
 */
export async function getAllReports() {
  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra lỗi HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi lấy danh sách lịch hẹn");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API danh sách lịch hẹn:", error.message);
    throw error;
  }
}

/**
 * Lấy chi tiết lịch hẹn theo ID từ server
 * @param {string} id - ID của lịch hẹn
 * @returns {Promise<Object>} - Chi tiết lịch hẹn
 */
export async function getReportById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Kiểm tra lỗi HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Lỗi khi lấy chi tiết lịch hẹn");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Lỗi khi gọi API chi tiết lịch hẹn:", error.message);
    throw error;
  }
}
