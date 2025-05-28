import React, { useState } from "react";
import Header from "./components/Header";
import AccountManagement from "./components/AccountManagement";
import CreateAccount from "./components/CreateAccount";
import UpdateAccount from "./components/UpdateAccount";
import ManagePermissions from "./components/ManagePermissions";
import "./styles/App.css"; // ✅ Import CSS đúng cách

const App = () => {
  const [currentPage, setCurrentPage] = useState("user_list");
  const [editUser, setEditUser] = useState(null);

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
            onSave={(newUser) => {
              setCurrentPage("user_list");
            }}
            onCancel={() => setCurrentPage("user_list")}
          />
        );
      case "edit_user":
        return (
          <UpdateAccount
            userToEdit={editUser}
            onSave={(updatedUser) => {
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
        return (
          <ManagePermissions
            onBack={() => setCurrentPage("user_list")}
          />
        );
      default:
        return <div>Trang chưa có nội dung</div>;
    }
  };

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      <main style={{ padding: "20px" }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
