import React, { useState } from "react";
import Header from "./components/Header";
import AccountManagement from "./components/AccountManagement";
import CreateAccount from "./components/CreateAccount";
import UpdateAccount from "./components/UpdateAccount";
import ManagePermissions from "./components/ManagePermissions";
import AppointmentManagement from "./components/AppointmentManagement";
import DoctorManagement from "./components/DoctorManagement";
import SpecialtyManagement from "./components/SpecialtyManagement";
import DoctorFilter from "./components/DoctorFilter";
import NewsManagement from "./components/NewsManagement";

// Import 3 component liên hệ mới
import ContactList from "./components/ContactList";
import ReplyContact from "./components/ReplyContact";
import NotifyCustomer from "./components/NotifyCustomer";

import "./styles/App.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("user_list");
  const [editUser, setEditUser] = useState(null);

  // Dùng để lưu liên hệ đang chọn để chuyển cho ReplyContact
  const [selectedContact, setSelectedContact] = useState(null);

  // Quản lý chung tin tức
  const [newsList, setNewsList] = useState([
    { id: 1, content: "Chương trình ưu đãi tháng 6", category: "Ưu đãi" },
    { id: 2, content: "Cập nhật lịch khám bác sĩ", category: "Sự kiện" },
  ]);

  // Hàm gửi phản hồi
  const handleSendReply = (contact, reply) => {
    alert(`Đã gửi phản hồi tới ${contact.name}:\n${reply}`);
    // Thêm logic gửi mail hoặc cập nhật trạng thái ở đây
  };

  const renderContent = () => {
    switch (currentPage) {
      case "user_list":
        return (
          <AccountManagement
            onEditUser={(user) => {
              setEditUser(user);
              setCurrentPage("edit_user");
            }}
          />
        );
      case "create_account":
        return (
          <CreateAccount
            onSave={() => setCurrentPage("user_list")}
            onCancel={() => setCurrentPage("user_list")}
          />
        );
      case "edit_user":
        return (
          <UpdateAccount
            userToEdit={editUser}
            onSave={() => {
              setCurrentPage("user_list");
              setEditUser(null);
            }}
            onCancel={() => {
              setCurrentPage("user_list");
              setEditUser(null);
            }}
          />
        );
      case "permissions":
        return <ManagePermissions onBack={() => setCurrentPage("user_list")} />;
      case "appointment_management":
        return <AppointmentManagement />;
      case "doctor_management":
        return <DoctorManagement />;
      case "specialty_management":
        return <SpecialtyManagement />;
      case "doctor_filter":
        return <DoctorFilter />;
      case "news_management":
        return <NewsManagement newsList={newsList} setNewsList={setNewsList} />;

      // Phần quản lý liên hệ
      case "contact_list":
        return (
          <ContactList
            onSelectContact={(contact) => {
              setSelectedContact(contact);
              setCurrentPage("reply_contact"); // Tự chuyển sang trang trả lời khi chọn
            }}
          />
        );

      case "reply_contact":
        return (
          <ReplyContact
            contact={selectedContact}
            onSendReply={handleSendReply}
          />
        );

      case "notify_customer":
        return <NotifyCustomer />;

      default:
        return <div>Trang chưa có nội dung</div>;
    }
  };

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      <main style={{ padding: "20px" }}>{renderContent()}</main>
    </div>
  );
};

export default App;
