import React, { useState } from "react";
import Header from "./src/components/Header";

import AdminDashboard from "./src/components/AdminDashboard";
import AccountManagement from "./src/components/AccountManagement";

import AppointmentManagement from "./src/components/AppointmentManagement";
import DoctorManagement from "./src/components/DoctorManagement";
import SpecialtyManagement from "./src/components/SpecialtyManagement";
import DoctorFilter from "./src/components/DoctorFilter";
import NewsManagement from "./src/components/NewsManagement";
import NewsCategoryFilter from "./src/components/NewsCategoryFilter";
import ContactList from "./src/components/ContactList";
import ReplyContact from "./src/components/ReplyContact";
import NotifyCustomer from "./src/components/NotifyCustomer";
import ManagePermissions from "./src/components/ManagePermissions";
import UpdateAccount from "./src/components/UpdateAccount";
import AppointmentList from "./src/components/AppointmentList";

const AdminApp = () => {
  const [currentPage, setCurrentPage] = useState("admin_dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "admin_dashboard":
        return <AdminDashboard />;
      case "user_list":
        return <AccountManagement />;
      case "edit_user":
        return <UpdateAccount />;
      case "permissions":
        return <ManagePermissions />;
      case "appointment_management":
        return <AppointmentManagement />;
      case "doctor_management":
        return <DoctorManagement />;
      case "specialty_management":
        return <SpecialtyManagement />;
      case "doctor_filter":
        return <DoctorFilter />;
      case "news_management":
        return <NewsManagement />;
      case "news_category":
        return <NewsCategoryFilter />;
      case "contact_list":
        return <ContactList />;
      case "reply_contact":
        return <ReplyContact />;
      case "notify_customer":
        return <NotifyCustomer />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div>
      <Header setCurrentPage={setCurrentPage} />
      <main style={{ padding: "20px" }}>{renderPage()}</main>
    </div>
  );
};

export default AdminApp;
