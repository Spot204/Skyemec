import React, { useState } from "react";
import "../styles/ContactList.css";

const sampleContacts = [
  { id: 1, name: "John Smith", email: "john@example.com", subject: "Question about service", date: "05/20/2025", status: "New" },
  { id: 2, name: "Mary Johnson", email: "mary@example.com", subject: "Feedback on product", date: "05/18/2025", status: "Replied" },
  { id: 3, name: "Bob Williams", email: "bob@example.com", subject: "Request for information", date: "05/15/2025", status: "Pending" },
];

const ContactList = ({ onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(sampleContacts);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredContacts(sampleContacts);
      return;
    }
    const filtered = sampleContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term.toLowerCase()) ||
        c.email.toLowerCase().includes(term.toLowerCase()) ||
        c.subject.toLowerCase().includes(term.toLowerCase()) ||
        c.status.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  return (
    <div className="container">
      <h2 className="title">Danh sách liên hệ</h2>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên, email, chủ đề..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
      <ul className="list">
        {filteredContacts.length === 0 && <li className="noResult">Không tìm thấy liên hệ phù hợp.</li>}
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            className="listItem"
            onClick={() => onSelectContact(contact)}
          >
            <div className="contactHeader">
              <span className="contactName">{contact.name}</span>
              <span className={`status ${contact.status.toLowerCase()}`}>
                {contact.status}
              </span>
            </div>
            <div className="contactSubject">{contact.subject}</div>
            <div className="contactEmailDate">
              <span>{contact.email}</span>
              <span>{contact.date}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
