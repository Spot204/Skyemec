const API_BASE_URL = "http://localhost:5050/api/revenue";

/**
 * Lấy thống kê doanh thu
 * @param {Object} params - { mode: "week"|"month", hospital }
 * @returns {Promise<Array>}
 */
export async function getRevenueStats(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Lỗi khi lấy thống kê doanh thu");
  }
  return response.json();
}
