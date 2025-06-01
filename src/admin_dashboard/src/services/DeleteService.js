// src/services/DeleteService.js
const API_BASE_URL = "http://localhost:5050/api";

export async function deleteUser(id) {
  const response = await fetch(`${API_BASE_URL}/users/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Lỗi khi xóa tài khoản");
  }

  return result;
}
