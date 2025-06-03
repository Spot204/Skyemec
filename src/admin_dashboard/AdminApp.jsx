import React from "react";
import Header from "./src/components/Header";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./src/components/AdminDashboard";
import AccountManagement from "./src/components/AccountManagement";
import UpdateAccount from "./src/components/UpdateAccount";
import ManagePermissions from "./src/components/ManagePermissions";
import AppointmentManagement from "./src/components/AppointmentManagement";
import DoctorManagement from "./src/components/DoctorManagement";
import SpecialtyManagement from "./src/components/SpecialtyManagement";
import DoctorFilter from "./src/components/DoctorFilter";
import NewsManagement from "./src/components/NewsManagement";
import NewsCategoryFilter from "./src/components/NewsCategoryFilter";
import ContactList from "./src/components/ContactList";
import ReplyContact from "./src/components/ReplyContact";
import NotifyCustomer from "./src/components/NotifyCustomer";
import InvoiceManagement from "./src/components/InvoiceManagement";
import InvoiceCreate from "./src/components/InvoiceCreate"; 
import StartAppointment from "./src/components/StatsAppointments";
import RevenueStats from "./src/components/RevenueStats";


const AdminApp = () => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px", minHeight: "calc(100vh - 70px)" }}>
        <Routes>
          {/* Route mặc định /admin redirect về dashboard */}
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Các route chức năng */}
          <Route path="users" element={<AccountManagement />} />
          <Route path="users/edit" element={<UpdateAccount />} />
          <Route path="permissions" element={<ManagePermissions />} />
          <Route path="appointments" element={<AppointmentManagement />} />
          <Route path="doctors" element={<DoctorManagement />} />
          <Route path="specialties" element={<SpecialtyManagement />} />
          <Route path="doctor-filter" element={<DoctorFilter />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="news-category" element={<NewsCategoryFilter />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="contacts/reply" element={<ReplyContact />} />
          <Route path="notifications" element={<NotifyCustomer />} />
          <Route path="start-appointment" element={<StartAppointment />} />
          <Route path="revenue-stats" element={<RevenueStats />} />



          {/* Route quản lý hóa đơn */}
          <Route path="invoices" element={<InvoiceManagement />} />
          {/* Route tạo mới hóa đơn */}
           <Route path="invoices/create" element={<InvoiceCreate />} /> 

          {/* Fallback 404 */}
          <Route path="*" element={<div>Trang không tồn tại</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminApp;
