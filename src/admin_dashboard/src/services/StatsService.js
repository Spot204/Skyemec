const API_BASE_URL = "http://localhost:5050/api/appointments/stats";

/**
 * Lấy thống kê số lượng lịch khám theo ngày trong khoảng thời gian và bệnh viện
 * @param {Object} params - Tham số để lấy thống kê
 * @param {string} params.hospital - Tên bệnh viện (optional)
 * @param {string} params.startDate - Ngày bắt đầu (optional)
 * @param {string} params.endDate - Ngày kết thúc (optional)
 * @returns {Promise<Array>} Mảng thống kê
 */
export async function getAppointmentStatsByHospital({ hospital, startDate, endDate }) {
  try {
    // Xử lý tham số và tạo queryParams
    const queryParams = new URLSearchParams();
    if (hospital) queryParams.append('hospital', hospital);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);

    // Kiểm tra mã trạng thái phản hồi
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Lỗi khi lấy dữ liệu thống kê: ${errorText}`);
    }

    // Trả về dữ liệu JSON
    return response.json();
  } catch (error) {
    console.error("Error fetching appointment stats:", error);
    throw new Error(`Lỗi: ${error.message}`);
  }
}
