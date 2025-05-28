import React, { useState, useEffect } from "react";
import "../styles/AccountManagement.css";


// Giả sử bạn có sẵn CreateAccount và UpdateAccount components
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";

const demoUsers = [
  {
    id: 1,
    username: "admin01",
    fullName: "Nguyễn Văn A",
    role: "admin",
    phoneNumber: "+84123456789",
  },
  {
    id: 2,
    username: "doctor01",
    fullName: "Trần Thị B",
    role: "doctor",
    phoneNumber: "+84987654321",
  },
  {
    id: 3,
    username: "user01",
    fullName: "Lê Văn C",
    role: "user",
    phoneNumber: "+84111222333",
  },
];

export default function AccountManagement({ setCurrentPage }) {
  const [users, setUsers] = useState(demoUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("list"); // list | create | update

  // Tìm kiếm đơn giản
  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý tạo mới tài khoản
  const handleCreate = (newUser) => {
    newUser.id = users.length + 1; // giả lập id
    setUsers([...users, newUser]);
    setMode("list");
  };

  // Xử lý cập nhật tài khoản
  const handleUpdate = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setMode("list");
    setSelectedUser(null);
  };

  // Xóa tài khoản
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      setUsers(users.filter((u) => u.id !== id));
      if (selectedUser && selectedUser.id === id) setSelectedUser(null);
    }
  };

  if (mode === "create") {
    return (
      <CreateAccount
        onSave={handleCreate}
        onCancel={() => setMode("list")}
      />
    );
  }

  if (mode === "update" && selectedUser) {
    return (
      <UpdateAccount
        userToEdit={selectedUser}
        onSave={handleUpdate}
        onCancel={() => {
          setMode("list");
          setSelectedUser(null);
        }}
      />
    );
  }

  return (
    <div className="account-management">
      <h2>Quản lý tài khoản</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Tìm kiếm username hoặc tên"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: 10, width: "300px", borderRadius: 6, border: "1.5px solid #005566" }}
        />
        <button
          style={{
            marginLeft: 20,
            padding: "10px 20px",
            backgroundColor: "#005566",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
          onClick={() => setMode("create")}
        >
          Tạo mới tài khoản
        </button>
      </div>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 16,
          color: "#005566",
        }}
      >
        <thead style={{ backgroundColor: "#e6f0ff" }}>
          <tr>
            <th style={{ padding: "12px 10px", border: "1px solid #ccc" }}>Username</th>
            <th style={{ padding: "12px 10px", border: "1px solid #ccc" }}>Họ và tên</th>
            <th style={{ padding: "12px 10px", border: "1px solid #ccc" }}>Vai trò</th>
            <th style={{ padding: "12px 10px", border: "1px solid #ccc" }}>Số điện thoại</th>
            <th style={{ padding: "12px 10px", border: "1px solid #ccc" }}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{user.username}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{user.fullName}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{user.role}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>{user.phoneNumber}</td>
              <td style={{ padding: "10px", border: "1px solid #ccc" }}>
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setMode("update");
                  }}
                  style={{
                    marginRight: 10,
                    backgroundColor: "#0077cc",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  style={{
                    backgroundColor: "#cc4444",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 20, color: "#999" }}>
                Không có tài khoản phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
