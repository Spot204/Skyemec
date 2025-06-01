import "../styles/DrMedicine.css";
import topimage from "../assets/Docimage1.jpg";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const DrMedicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5050/api/medicines")
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtered = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  const mid = Math.ceil(filtered.length / 2);
  const col1 = filtered.slice(0, mid);
  const col2 = filtered.slice(mid);

  return (
    <div className="drmed-cover">
      <div className="drmed-top-text">
        <a>DANH MỤC THUỐC</a>
      </div>
      <img className="drmed-top-img" src={topimage} alt="topimage" />
      <span
        onClick={() => navigate("/doctor/drhome")}
        className="drmed-navigator"
      >
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span className="drmed-navigator-2">
        {"  "}
        Danh mục thuốc
      </span>
      <div className="drmed-container">
        <span>
          <FontAwesomeIcon icon={faSearch} className="drmed-search-icon" />
          <input
            className="drmed-search-bar"
            type="text"
            placeholder="Tìm thuốc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />{" "}
        </span>

        <div className="drmed-list" style={{ display: "flex", gap: "32px" }}>
          <ul className="drmed-list-ul">
            {col1.map((medicine, idx) => (
              <li
                key={medicine._id}
                className="drmed-list-item"
                onClick={() => navigate(`/doctor/medicines/${medicine._id}`)}
              >
                {medicine.name}
                {idx !== col1.length - 1 && <div className="drmed-line"></div>}
              </li>
            ))}
          </ul>

          <ul className="drmed-list-ul">
            {col2.map((medicine, idx) => (
              <li
                key={medicine._id}
                className="drmed-list-item"
                onClick={() => navigate(`/doctor/medicines/${medicine._id}`)}
              >
                {medicine.name}
                {idx !== col2.length - 1 && <div className="drmed-line"></div>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DrMedicine;
