import React, { useState } from "react";

import Header from "./Header"; // Header của bạn
import AccountManagement from "./AccountManagement";
import UpdateAccount from "./UpdateAccount";
import ManagePermissions from "./ManagePermissions";
// Import thêm các component con khác nếu có

export default function AdminDashboard() {
  // State lưu trang hiện tại, mặc định hiển thị danh sách người dùng
  const [currentPage, setCurrentPage] = useState("user_list");

  // State lưu user đang chỉnh sửa (cho trang edit_user)
  const [editUser, setEditUser] = useState(null);

  // Hàm render nội dung trang theo currentPage
  const renderContent = () => {
    switch (currentPage) {
      case "user_list":
        return (
          <AccountManagement
            onEditUser={(user) => {
              setEditUser(user);     // lưu user cần sửa
              setCurrentPage("edit_user"); // chuyển sang trang edit
            }}
          />
        );

      case "edit_user":
        return (
          <UpdateAccount
            userToEdit={editUser}
            onCancel={() => setCurrentPage("user_list")}
            onSave={(updatedUser) => {
              // Xử lý lưu user
              // Ví dụ gọi API hoặc cập nhật state users bên trên
              setCurrentPage("user_list");
              setEditUser(null);
            }}
          />
        );

      case "permissions":
        return <ManagePermissions onBack={() => setCurrentPage("user_list")} />;

      // Thêm các trang khác tương tự
      default:
        return <div>Trang chưa có nội dung</div>;
    }
  };

  return (
    <>
      {/* Header nhận props setCurrentPage để gọi thay đổi trang */}
      <Header setCurrentPage={setCurrentPage} />

      {/* Phần nội dung thay đổi theo trang */}
      <main style={{ padding: "20px" }}>
        {renderContent()}
      </main>
    </>
  );
}
