import React, { useState, useEffect } from "react";
import AppointmentList from "./AppointmentList";
import AppointmentDetails from "./AppointmentDetails";
import "../styles/AppointmentManagement.css";
import { getAllReports } from "../services/GetreportsService";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllReports();
        console.log("📦 Lịch khám từ API:", data); // 👈 Kiểm tra kết quả tại Console
        setAppointments(data);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách lịch khám:", error);
      }
    };

    fetchData();
  }, []);

  const handleSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  return (
    <div className="AppointmentManagement-container">
      <h2 className="title">Quản lý lịch khám</h2>

      <AppointmentList appointments={appointments} onSelect={handleSelect} />

      {selectedAppointment && (
        <AppointmentDetails
          appointment={selectedAppointment}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default AppointmentManagement;
