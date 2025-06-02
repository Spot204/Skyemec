// src/services/loginService.js
const API_BASE_URL = "http://localhost:5050";

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/login/dangnhap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Lỗi đăng nhập");
  }

  return result; // chứa token và user
}
