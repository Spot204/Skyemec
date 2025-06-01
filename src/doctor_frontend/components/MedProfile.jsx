import "../styles/MedProfile.css";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MedProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/medicines/${id}`)
      .then((res) => setMedicine(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!medicine) return <div>Đang tải dữ liệu...</div>;

  return (
    <div className="medprofile-cover">
      <span
        onClick={() => navigate("/doctor/drhome")}
        className="medprofile-navigator"
      >
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span
        onClick={() => navigate("/doctor/medicines")}
        className="medprofile-navigator-2"
      >
        Danh mục thuốc <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span className="medprofile-navigator-3">
        {"  "}
        {medicine.name}
      </span>

      <div className="medpro-container">
        <div className="medicine">
          <div className="medpro-col1">
            <div className="med-name">
              <h1>{medicine.name}</h1>
              <div className="medname-line"></div>
            </div>
          </div>
          <div className="medpro-general">
            <h2>Dạng bào chế - biệt dược</h2>
            <ul>
              {medicine.dosage_forms.map((form, idx) => (
                <li key={idx}>{form}</li>
              ))}
            </ul>
            <div className="medprofile-line"></div>
            <h2>Nhóm thuốc – Tác dụng</h2>
            <p>{medicine.group}</p>
            <div className="medprofile-line"></div>
            <h2>Chỉ định</h2>
            <ul>
              {medicine.indications.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="medprofile-line"></div>
            <h2>Chống chỉ định</h2>
            <ul>
              {medicine.contraindications.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="medprofile-line"></div>
            <h2>Thận trọng khi</h2>
            <ul>
              {medicine.precautions.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <div className="medprofile-line"></div>
            <h2>Liều và cách dùng</h2>
            <b style={{ fontStyle: "italic" }}>Người lớn:</b>
            <ul>
              {medicine.dosage_and_administration?.adults?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
            <b style={{ fontStyle: "italic" }}>Trẻ em:</b>
            <ul>
              {medicine.dosage_and_administration?.children?.map(
                (item, idx) => (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>
            <b style={{ fontStyle: "italic" }}>Cách dùng:</b>
            <ul>
              {medicine.dosage_and_administration?.instructions?.map(
                (item, idx) => (
                  <li key={idx}>{item}</li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="med-info">
          <h2>Tác dụng không mong muốn</h2>
          <b style={{ fontStyle: "italic" }}>Thường gặp:</b>
          <ul>
            {medicine.side_effects?.common?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <b style={{ fontStyle: "italic" }}>Ít gặp:</b>
          <ul>
            {medicine.side_effects?.less_common?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <b style={{ fontStyle: "italic" }}>Hiếm gặp:</b>
          <ul>
            {medicine.side_effects?.rare?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="medprofile-line"></div>
          <h2>Chú ý khi sử dụng</h2>
          <ul>
            {medicine.notes?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <div className="medprofile-line"></div>
          <h2>Tài liệu tham khảo</h2>
          <ul>
            {medicine.references?.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MedProfile;
