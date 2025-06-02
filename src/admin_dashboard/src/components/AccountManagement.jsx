import React, { useState, useEffect } from "react";
import "../styles/AccountManagement.css";
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";
import { getAllUsers } from "../services/userService";
import { deleteUser } from "../services/DeleteService";

export default function AccountManagement({ setCurrentPage }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [mode, setMode] = useState("list");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách người dùng:", err);
      alert("Không thể tải danh sách người dùng từ server.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const username = u.username?.toLowerCase() || "";
    const fullName = u.fullName?.toLowerCase() || "";
    return (
      username.includes(searchTerm.toLowerCase()) ||
      fullName.includes(searchTerm.toLowerCase())
    );
  });

  const handleCreate = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setMode("list");
  };

  const handleUpdate = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === updatedUser._id ? updatedUser : u))
    );
    setMode("list");
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tài khoản này?")) {
      try {
        await deleteUser(id); // Gọi đúng API delete
        setUsers((prev) => prev.filter((u) => u._id !== id));
        alert("Đã xóa tài khoản thành công");
      } catch (err) {
        console.error("Lỗi khi xóa tài khoản:", err);
        alert("Không thể xóa tài khoản");
      }
    }
  };

  if (mode === "create") {
    return <CreateAccount onSave={handleCreate} onCancel={() => setMode("list")} />;
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
          style={{
            padding: 10,
            width: "300px",
            borderRadius: 6,
            border: "1.5px solid #005566",
          }}
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
          ➕ Tạo mới tài khoản
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
            <th style={cellStyle}>Username</th>
            <th style={cellStyle}>Họ và tên</th>
            <th style={cellStyle}>Vai trò</th>
            <th style={cellStyle}>Số điện thoại</th>
            <th style={cellStyle}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user._id}>
                <td style={cellStyle}>{user.username}</td>
                <td style={cellStyle}>{user.fullName}</td>
                <td style={cellStyle}>{user.role}</td>
                <td style={cellStyle}>{user.phoneNumber || "—"}</td>
                <td style={cellStyle}>
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setMode("update");
                    }}
                    style={buttonStyle("#0077cc")}
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    style={buttonStyle("#cc4444")}
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
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

// Styles phụ trợ
const cellStyle = {
  padding: "12px 10px",
  border: "1px solid #ccc",
};

const buttonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
  marginRight: 10,
});
