import React, { useState } from "react";
import { createInvoice } from "../services/InvoiceService";
import "../styles/InvoiceCreate.css";

const InvoiceCreate = () => {
  const [formData, setFormData] = useState({
    appointmentId: "",
    invoiceNumber: "",
    issueDate: "",
    items: [{ description: "", quantity: 1, unitPrice: 0, amount: 0 }],
    status: "pending",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Cập nhật form data cơ bản
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cập nhật từng item dịch vụ
  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    if (field === "description") {
      newItems[index][field] = value;
    } else {
      // Chuyển thành số nguyên hoặc số thực, tránh NaN
      const numValue = Number(value);
      newItems[index][field] = isNaN(numValue) || numValue < 0 ? 0 : numValue;
    }
    // Tính lại amount
    newItems[index].amount = newItems[index].quantity * newItems[index].unitPrice;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  // Thêm dòng dịch vụ mới
  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0, amount: 0 }],
    }));
  };

  // Xóa dòng dịch vụ
  const handleRemoveItem = (index) => {
    if (formData.items.length === 1) return; // Ít nhất 1 dòng
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  // Tính tổng tiền
  const totalAmount = formData.items.reduce((sum, item) => sum + item.amount, 0);

  // Submit form tạo hóa đơn
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await createInvoice({
        ...formData,
        totalAmount,
        issueDate: formData.issueDate || new Date().toISOString().slice(0, 10),
      });
      setSuccessMsg("Tạo hóa đơn thành công!");
      // Reset form hoặc chuyển hướng tuỳ bạn
      setFormData({
        appointmentId: "",
        invoiceNumber: "",
        issueDate: "",
        items: [{ description: "", quantity: 1, unitPrice: 0, amount: 0 }],
        status: "pending",
        notes: "",
      });
    } catch (err) {
      setError(err.message || "Lỗi khi tạo hóa đơn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invoice-create-container">
      <h2>Tạo mới hóa đơn</h2>

      {error && <div className="error-msg">{error}</div>}
      {successMsg && <div className="success-msg">{successMsg}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          ID lịch khám:
          <input
            type="text"
            name="appointmentId"
            value={formData.appointmentId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Mã hóa đơn:
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Ngày phát hành:
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
          />
        </label>

        <h3>Dịch vụ</h3>
        {formData.items.map((item, index) => (
          <div key={index} className="invoice-item-row">
            <input
              type="text"
              placeholder="Mô tả"
              value={item.description}
              onChange={(e) => handleItemChange(index, "description", e.target.value)}
              required
            />
            <input
              type="number"
              min="1"
              placeholder="Số lượng"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
              required
            />
            <input
              type="number"
              min="0"
              placeholder="Đơn giá"
              value={item.unitPrice}
              onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
              required
            />
            <input
              type="number"
              readOnly
              placeholder="Thành tiền"
              value={item.amount}
            />
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              disabled={formData.items.length === 1}
            >
              Xóa
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddItem} className="add-item-btn">
          Thêm dịch vụ
        </button>

        <div className="total-amount">
          <strong>Tổng tiền: </strong> {totalAmount.toLocaleString()} đ
        </div>

        <label>
          Ghi chú:
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
          />
        </label>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Đang tạo..." : "Tạo hóa đơn"}
        </button>
      </form>
    </div>
  );
};

export default InvoiceCreate;
