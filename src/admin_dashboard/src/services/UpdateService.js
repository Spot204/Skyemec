const API_BASE_URL = "http://localhost:5050/api";

export async function updateUser(id, data) {
  try {
    const response = await fetch(`${API_BASE_URL}/update-account/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Lỗi khi cập nhật tài khoản");
    }

    return result.user; // Trả về user đã được cập nhật
  } catch (error) {
    console.error("Lỗi khi gọi API cập nhật tài khoản:", error);
    throw error;
  }
}
