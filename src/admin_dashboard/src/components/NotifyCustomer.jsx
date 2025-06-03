import React, { useState } from "react";
import "../styles/NotifyCustomer.css";

const NotifyCustomer = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendNotification = () => {
    if (!subject.trim() || !message.trim()) return;

    setIsSending(true);

    // Giả lập gửi thông báo
    setTimeout(() => {
      alert(`Thông báo đã gửi:\nTiêu đề: ${subject}\nNội dung: ${message}`);
      setSubject("");
      setMessage("");
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="login-container">
      <h2>Gửi thông báo cho khách hàng</h2>
      <label htmlFor="subject" className="label">
        Tiêu đề thông báo
      </label>
      <input
        id="subject"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Nhập tiêu đề thông báo"
        className="input"
      />

      <label htmlFor="message" className="label">
        Nội dung thông báo
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Nhập nội dung thông báo"
        rows={6}
        className="textarea"
      />

      <button
        className="button"
        onClick={handleSendNotification}
        disabled={isSending || !subject.trim() || !message.trim()}
      >
        {isSending ? "Đang gửi..." : "Gửi thông báo"}
      </button>
    </div>
  );
};

export default NotifyCustomer;
