const API_BASE = "http://localhost:5050/api/users";

export async function getAllUsers() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Lỗi khi gọi API danh sách user");
  return res.json();
}

// Bạn có thể thêm các hàm này sau nếu cần
// export async function createUser(data) { ... }
// export async function updateUser(id, data) { ... }
// export async function deleteUser(id) { ... }
