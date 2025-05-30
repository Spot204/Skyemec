import { useState, useEffect, useRef } from "react";
import "../styles/Dropdown1.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

// Sửa: nhận thêm value và onChange từ props để đồng bộ state với component cha
const Dropdown1 = ({ options, label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    if (onChange) onChange(option); // Gọi callback để cập nhật state ở component cha
    setIsOpen(false); // Đóng dropdown sau khi chọn
  };

  return (
    <div className="Bodysd-oder-dropdown-container" ref={dropdownRef}>
      <div className="Bodysd-oder-select" onClick={() => setIsOpen(!isOpen)}>
        {value || label} {/* Hiển thị giá trị đã chọn từ props */}
        <FontAwesomeIcon
          icon={faAngleDown}
          className="Bodysd-oder-select-icon"
        />
      </div>
      {isOpen && (
        <div className="Bodysd-oder-dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="Bodysd-oder-dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown1;
