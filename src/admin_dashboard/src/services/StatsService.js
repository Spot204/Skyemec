const API_BASE_URL = "http://localhost:5050/api/stats";

/**
 * Lấy thống kê số lượng lịch khám theo bệnh viện, theo tuần hoặc tháng
 * @param {Object} params - Tham số truy vấn { mode: 'week' | 'month' }
 * @returns {Promise<Array>} Mảng dữ liệu thống kê [{ hospital, year, month?, week?, count }]
 */
export async function getAppointmentStatsByHospital(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/appointments/hospital${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Lỗi khi lấy thống kê lịch khám: ${errText}`);
  }
  return response.json();
}
