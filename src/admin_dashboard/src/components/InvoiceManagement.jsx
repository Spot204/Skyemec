import React, { useState, useEffect } from "react";
import { getInvoices, deleteInvoiceById, updateInvoice } from "../services/InvoiceService";
import "../styles/InvoiceManagement.css";

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    page: 1,
    limit: 10,
  });
  const [pagination, setPagination] = useState({
    totalPages: 1,
    total: 0,
  });
  const [loadingStatusId, setLoadingStatusId] = useState(null); // để show loading trạng thái riêng

  useEffect(() => {
    fetchInvoices();
  }, [filters]);

  const fetchInvoices = async () => {
    try {
      const result = await getInvoices(filters);
      setInvoices(result.data);
      setPagination({
        totalPages: result.totalPages,
        total: result.total,
      });
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hóa đơn:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) return;

    try {
      await deleteInvoiceById(id);
      alert("Xóa hóa đơn thành công!");
      fetchInvoices();
      if (selectedInvoice && selectedInvoice._id === id) setSelectedInvoice(null);
    } catch (error) {
      alert("Lỗi khi xóa hóa đơn: " + error.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoadingStatusId(id);
    try {
      await updateInvoice(id, { status: newStatus });
      // Cập nhật trạng thái trên state ngay mà không cần load lại toàn bộ
      setInvoices((prev) =>
        prev.map((inv) => (inv._id === id ? { ...inv, status: newStatus } : inv))
      );
      // Nếu đang xem chi tiết hóa đơn đó, cập nhật luôn
      if (selectedInvoice && selectedInvoice._id === id) {
        setSelectedInvoice((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      alert("Lỗi khi cập nhật trạng thái: " + error.message);
    } finally {
      setLoadingStatusId(null);
    }
  };

  return (
    <div className="invoice-management-container" style={{ maxWidth: 1100, margin: "auto", padding: 20 }}>
      <h2>Quản lý hóa đơn</h2>

      {/* Filter trạng thái */}
      <div style={{ marginBottom: 20 }}>
        <select name="status" value={filters.status} onChange={handleFilterChange}>
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chưa thanh toán</option>
          <option value="paid">Đã thanh toán</option>
          <option value="canceled">Đã hủy</option>
        </select>
      </div>

      {/* Danh sách hóa đơn */}
      <table border={1} cellPadding={10} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Mã hóa đơn</th>
            <th>Ngày phát hành</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Liên kết lịch khám</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>Không có hóa đơn</td>
            </tr>
          ) : (
            invoices.map((inv) => (
              <tr key={inv._id}>
                <td>{inv.invoiceNumber}</td>
                <td>{new Date(inv.issueDate).toLocaleDateString()}</td>
                <td>{inv.totalAmount.toLocaleString()} đ</td>
                <td>
                  <select
                    value={inv.status}
                    onChange={(e) => handleStatusChange(inv._id, e.target.value)}
                    disabled={loadingStatusId === inv._id}
                  >
                    <option value="pending">Chưa thanh toán</option>
                    <option value="paid">Đã thanh toán</option>
                    <option value="canceled">Đã hủy</option>
                  </select>
                </td>
                <td>{inv.appointmentId ? inv.appointmentId._id : "-"}</td>
                <td>
                  <button onClick={() => setSelectedInvoice(inv)}>Xem</button>{" "}
                  <button onClick={() => handleDelete(inv._id)} style={{ color: "red" }}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Phân trang */}
      <div style={{ marginTop: 20, textAlign: "center" }}>
        {Array.from({ length: pagination.totalPages }, (_, i) => (
          <button
            key={i + 1}
            disabled={filters.page === i + 1}
            onClick={() => handlePageChange(i + 1)}
            style={{ margin: "0 5px" }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Chi tiết hóa đơn */}
      {selectedInvoice && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            padding: 20,
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            zIndex: 1000,
            maxWidth: 600,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <h3>Chi tiết hóa đơn: {selectedInvoice.invoiceNumber}</h3>
          <p><strong>Ngày phát hành:</strong> {new Date(selectedInvoice.issueDate).toLocaleDateString()}</p>
          <p><strong>Trạng thái:</strong> {selectedInvoice.status}</p>
          <p><strong>Tổng tiền:</strong> {selectedInvoice.totalAmount.toLocaleString()} đ</p>
          <p><strong>Ghi chú:</strong> {selectedInvoice.notes || "-"}</p>

          <h4>Dịch vụ</h4>
          <table border={1} cellPadding={5} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Mô tả</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice.toLocaleString()} đ</td>
                  <td>{item.amount.toLocaleString()} đ</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => setSelectedInvoice(null)} style={{ marginTop: 10 }}>
            Đóng
          </button>
        </div>
      )}

      {/* Background overlay khi mở chi tiết */}
      {selectedInvoice && (
        <div
          onClick={() => setSelectedInvoice(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
};

export default InvoiceManagement;
