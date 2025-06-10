const API_BASE_URL = "http://localhost:5050/api/doctor-list"; // Giữ nguyên đường dẫn API như bạn yêu cầu

/**
 * Lấy danh sách bác sĩ, filter theo chuyên khoa (có thể thêm phân trang)
 * @param {Object} params - { specialty, page, limit }
 */
export async function fetchDoctors(params = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}/load`, {  // Giữ endpoint load như cũ
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Lỗi khi lấy danh sách bác sĩ: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi fetchDoctors:", error);
    throw error;
  }
}

/**
 * Tìm kiếm bác sĩ theo tên và chuyên khoa
 * @param {Object} params - { name, specialty, page, limit }
 */
export async function searchDoctors(params = {}) {
  try {
    // Giữ nguyên endpoint search
    const response = await fetch(`${API_BASE_URL}/search`, {  // Giữ endpoint search như cũ
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Lỗi khi tìm kiếm bác sĩ: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi searchDoctors:", error);
    throw error;
  }
}
