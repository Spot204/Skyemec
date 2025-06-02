const API_BASE_URL = "http://localhost:5050/api/doctor-list/load";

export async function fetchDoctors(specialty = "") {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(specialty ? { specialty } : {}),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Lỗi khi lấy danh sách bác sĩ: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(" Lỗi fetchDoctors:", error);
    throw error;
  }
}
export async function searchDoctors(name, specialty = "") {
  try {
    const response = await fetch(`${API_BASE_URL}sreach`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, specialty }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Lỗi khi tìm kiếm bác sĩ: ${response.status} - ${errorText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(" Lỗi searchDoctors:", error);
    throw error;
  }
}
