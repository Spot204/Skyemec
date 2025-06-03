const API_BASE_URL = "http://localhost:5050/api";

/**
 * Lấy danh sách lịch hẹn với tùy chọn tìm kiếm, lọc, phân trang
 * @param {Object} params - Các tham số query (name, phone, date, doctor, hospital, status, page, limit)
 * @returns {Promise<Object>} - { data: [...], total, page, limit, totalPages }
 */
export async function getAppointments(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/appointments${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy danh sách lịch hẹn");
  }
  return response.json();
}

/**
 * Lấy chi tiết lịch hẹn theo ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getAppointmentById(id) {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy chi tiết lịch hẹn");
  }
  return response.json();
}

/**
 * Xóa lịch hẹn theo ID
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function deleteAppointmentById(id) {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}`, {
    method: "DELETE",
  });

  // Một số API trả về body, một số không
  if (!response.ok) {
    let errorMsg = "Lỗi khi xóa lịch hẹn";
    try {
      const errorData = await response.json();
      if (errorData.message) errorMsg = errorData.message;
    } catch {
      // ignore parse error
    }
    throw new Error(errorMsg);
  }

  // Có thể API trả về {message: "..."} hoặc không trả về body
  try {
    return await response.json();
  } catch {
    return {};
  }
}
