import React, { useState, useEffect, useRef } from "react";
import "../styles/Dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
const Dropdown = ({ options, label, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Hàm kiểm tra click bên ngoài
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

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => {
      let newSelected;
      if (prev.includes(option)) {
        newSelected = prev.filter((o) => o !== option);
      } else {
        newSelected = [...prev, option];
      }
      return newSelected;
    });
  };

  // Gọi onChange mỗi khi selectedOptions thay đổi
  useEffect(() => {
    if (onChange) onChange(selectedOptions);
  }, [selectedOptions, onChange]);

  return (
    <div className="Bodysd-dropdown-container" ref={dropdownRef}>
      <button
        className="Bodysd-dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {isOpen ? (
          <>
            <div className="Bodysd-select">
              {label}
              <p />
              <FontAwesomeIcon
                icon={faAngleUp}
                className="Bodysd-select-icon"
              />
            </div>
          </>
        ) : (
          <>
            <div className="Bodysd-select">
              {label}
              <p />
              <FontAwesomeIcon
                icon={faAngleDown}
                className="Bodysd-select-icon"
              />
            </div>
          </>
        )}
      </button>
      {isOpen && (
        <div className="Bodysd-dropdown-menu">
          {options.map((option, index) => (
            <label key={index} className="Bodysd-dropdown-item">
              <input
                type="checkbox"
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
