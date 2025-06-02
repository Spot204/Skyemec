import "../styles/Contact.css"; // Assuming you have a CSS file for styling

const hospitalContacts = [
  { name: "Skyemec Hà Đông", phone: "0123 456 789" },
  { name: "Skyemec Thanh Xuân", phone: "0234 567 890" },
  { name: "Skyemec Cầu Giấy", phone: "0345 678 901" },
  { name: "Skyemec Tuyên Quang", phone: "0456 789 012" },
  { name: "Skyemec Bắc Ninh", phone: "0567 890 123" },
  { name: "Skyemec Hà Tĩnh", phone: "0678 901 234" },
];

const Contact = () => (
  <div className="Ct-contact-container">
    <h2>Liên hệ các cơ sở bệnh viện Skyemec</h2>
    <ul>
      {hospitalContacts.map((item, idx) => (
        <li key={idx}>
          <strong>{item.name}:</strong> <a href={`tel:${item.phone.replace(/\s/g, "")}`}>{item.phone}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Contact;