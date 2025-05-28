import React from "react";
import "../styles/AppointmentList.css";

const statusVN = {
  Pending: "Đang chờ",
  Confirmed: "Đã xác nhận",
  Cancelled: "Đã hủy",
};

const AppointmentList = ({ appointments, onStatusChange, onSelect }) => {
  return (
    <table className="AppointmentList-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Bệnh nhân</th>
          <th>Thời gian</th>
          <th>Trạng thái</th>
          <th>Hành động</th>
          <th>Thông tin khách hàng</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((app) => (
          <tr key={app.id}>
            <td>{app.id}</td>
            <td>{app.patientName}</td>
            <td>{app.time}</td>
            <td
              className={
                app.status === "Pending"
                  ? "status-pending"
                  : app.status === "Confirmed"
                  ? "status-confirmed"
                  : app.status === "Cancelled"
                  ? "status-cancelled"
                  : ""
              }
            >
              {statusVN[app.status] || app.status}
            </td>
            <td>
              {app.status !== "Đã xác nhận" && app.status !== "Đã huỷ" && (
                <>
                  <button
                    className="btn btn-confirm"
                    onClick={() => onStatusChange(app.id, "Đã xác nhận")}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => onStatusChange(app.id, "Đã huỷ")}
                  >
                    Hủy
                  </button>
                </>
              )}
              {app.status === "Đã xác nhận" && (
                <button
                  className="btn btn-cancel"
                  onClick={() => onStatusChange(app.id, "Đã huỷ")}
                >
                  Hủy
                </button>
              )}
              {app.status === "Đã huỷ" && (
                <button
                  className="btn btn-restore"
                  onClick={() => onStatusChange(app.id, "Chờ duyệt")}
                >
                  Khôi phục
                </button>
              )}
            </td>
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
