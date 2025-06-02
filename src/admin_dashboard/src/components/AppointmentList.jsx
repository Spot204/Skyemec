import React from "react";
import "../styles/AppointmentList.css";

const AppointmentList = ({ appointments, onSelect }) => {
  return (
    <table className="AppointmentList-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Cơ sở khám</th>
          <th>Số điện thoại</th> {/* Thêm tiêu đề cột */}
          <th>Chi tiết</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((app) => (
          <tr key={app._id}>
            <td>{app._id}</td>
            <td>{app.name || "—"}</td>
            <td>{app.hospital || "—"}</td>
            <td>{app.phone || "—"}</td> {/* Hiển thị số điện thoại */}
            <td>
              <button className="btn btn-view" onClick={() => onSelect(app)}>
                Xem
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentList;
