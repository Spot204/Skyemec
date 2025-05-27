import React, { useState } from "react";
import AppointmentList from "./AppointmentList";
import AppointmentDetails from "./AppointmentDetails";
import "../styles/AppointmentManagement.css";

const initialAppointments = [
  {
    id: 1,
    patientName: "Nguyễn Văn A",
    time: "2025-06-01 09:00",
    status: "Pending",
    phone: "0909123456",
    email: "vana@example.com",
    notes: "Mệt mỏi, ho kéo dài",
  },
  {
    id: 2,
    patientName: "Trần Thị B",
    time: "2025-06-01 10:30",
    status: "Confirmed",
    phone: "0987654321",
    email: "thib@example.com",
    notes: "Khám tổng quát",
  },
  {
    id: 3,
    patientName: "Lê Văn C",
    time: "2025-06-02 14:00",
    status: "Cancelled",
    phone: "0911222333",
    email: "vanc@example.com",
    notes: "Đau đầu thường xuyên",
  },
];

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="AppointmentManagement-container">
      <h2 className="title">Quản lý lịch khám</h2>

      <AppointmentList
        appointments={appointments}
        onStatusChange={handleStatusChange}
        onSelect={handleSelect}
      />

      <AppointmentDetails
        appointment={selectedAppointment}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default AppointmentManagement;
