import React, { useState, useEffect } from "react";
import "../styles/ReplyContact.css";

const ReplyContact = ({ contact, onSendReply }) => {
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    setReplyText("");
  }, [contact]);

  if (!contact) {
    return (
      <div className="container">
        <p>Vui lòng chọn một liên hệ từ danh sách để trả lời.</p>
      </div>
    );
  }

  const handleSend = () => {
    if (!replyText.trim()) return;
    onSendReply(contact, replyText.trim());
    setReplyText("");
  };

  return (
    <div className="container">
      <h2>Trả lời liên hệ</h2>
      <div className="info">
        <p><strong>Tên:</strong> {contact.name}</p>
        <p><strong>Email:</strong> {contact.email}</p>
        <p><strong>Tiêu đề:</strong> {contact.subject}</p>
      </div>

      <textarea
        placeholder="Nhập phản hồi tại đây..."
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        className="textarea"
        rows={8}
      />

      <button
        className="button"
        onClick={handleSend}
        disabled={!replyText.trim()}
      >
        Gửi phản hồi
      </button>
    </div>
  );
};

export default ReplyContact;
