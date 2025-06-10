import React from "react";
import "../styles/AppointmentList.css";

const AppointmentList = ({ appointments, onSelect, onDelete }) => {
  return (
    <table className="AppointmentList-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Cơ sở khám</th>
          <th>Số điện thoại</th>
          <th>Chi tiết</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((app) => {
          // Map fallback cho hospital
          const hospital = app.hospital || app.registeredHospital || "—";

          return (
            <tr key={app._id}>
              <td>{app._id}</td>
              <td>{app.name || "—"}</td>
              <td>{hospital}</td>
              <td>{app.phone || "—"}</td>
              <td>
                <button className="btn btn-view" onClick={() => onSelect(app)}>
                  Xem
                </button>
              </td>
              <td>
                <button
                  className="btn btn-delete"
                  onClick={() => onDelete(app._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AppointmentList;
