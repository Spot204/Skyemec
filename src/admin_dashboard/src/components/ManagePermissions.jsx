
import React, { useState } from "react";
import "../styles/ManagePermissions.css";



const roles = ["Admin", "Doctor", "User"];
const allPermissions = [
  "read",
  "write",
  "delete",
  "manage_users",
  "view_reports",
];

// Dữ liệu demo user
const demoUsers = [
  { id: 1, username: "admin01", fullName: "Nguyễn Văn A", role: "Admin", permissions: ["read", "write", "manage_users"] },
  { id: 2, username: "doctor01", fullName: "Trần Thị B", role: "Doctor", permissions: [] },
  { id: 3, username: "user01", fullName: "Lê Văn C", role: "User", permissions: [] },
];

export default function ManagePermissions({ onBack }) {
  const [users, setUsers] = useState(demoUsers);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const handleSelectUser = (user) => {
    setSelectedUserId(user.id);
    setSelectedRole(user.role);
    setSelectedPermissions(user.permissions || []);
  };

  const togglePermission = (perm) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  const handleSave = () => {
    if (selectedUserId === null) {
      alert("Vui lòng chọn người dùng để phân quyền");
      return;
    }
    setUsers((prev) =>
      prev.map((u) =>
        u.id === selectedUserId
          ? { ...u, role: selectedRole, permissions: selectedPermissions }
          : u
      )
    );
    alert("Phân quyền thành công!");
  };

  return (
    <div className="manage-permissions">
      <h2>Phân quyền người dùng</h2>

      {/* Danh sách người dùng */}
      <div className="mp-user-list">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Họ và tên</th>
              <th>Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={selectedUserId === user.id ? "selected" : ""}
                onClick={() => handleSelectUser(user)}
              >
                <td>{user.username}</td>
                <td>{user.fullName}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form phân quyền */}
      <div className="mp-form">
        <h3>Chỉnh sửa vai trò và phân quyền</h3>
        {selectedUserId === null ? (
          <p className="mp-message">Vui lòng chọn người dùng bên trên.</p>
        ) : (
          <>
            <label className="mp-label">Vai trò:</label>
            <select
              className="mp-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {selectedRole.toLowerCase() === "admin" && (
              <>
                <label className="mp-label">Phân quyền:</label>
                <div className="mp-permissions-list">
                  {allPermissions.map((perm) => (
                    <label key={perm} className="mp-permission-item">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm)}
                        onChange={() => togglePermission(perm)}
                      />
                      {perm.charAt(0).toUpperCase() + perm.slice(1)}
                    </label>
                  ))}
                </div>
              </>
            )}

            <div className="mp-buttons">
              <button className="mp-btn mp-btn-save" onClick={handleSave}>
                Lưu phân quyền
              </button>
              <button className="mp-btn mp-btn-cancel" onClick={onBack}>
                Quay lại
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
