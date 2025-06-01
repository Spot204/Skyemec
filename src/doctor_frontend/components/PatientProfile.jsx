import "../styles/PatientProfile.css";
import patient1 from "../assets/empty-ava.jpg";
import patient2 from "../assets/empty-ava-1.jpg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PatientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [addingField, setAddingField] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/patients/${id}`)
      .then((res) => {
        setPatient(res.data);
        setForm(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!patient) return <div>Đang tải dữ liệu...</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Xử lý xác nhận sửa thông tin
  const handleEdit = () => {
    if (window.confirm("Bạn muốn sửa thông tin bệnh nhân?")) {
      setEditMode(true);
    }
  };

  // Xử lý xác nhận lưu thông tin
  const handleSave = async () => {
    if (
      window.confirm(
        `Bạn sẽ không thể hoàn tác. Bạn có chắc chắn muốn lưu thông tin của bệnh nhân ${patient.name}?`
      )
    ) {
      try {
        await axios.put(`http://localhost:5050/api/patients/${id}`, form);
        setPatient(form);
        setEditMode(false);
        setAddingField(null);
        alert("Cập nhật thành công!");
      } catch (err) {
        alert("Cập nhật thất bại!");
      }
    }
  };

  // Thêm thông tin cho trường chưa có
  const handleAddField = (field) => {
    setAddingField(field);
    setEditMode(false);
  };

  // Lưu thông tin mới cho trường chưa có
  const handleSaveField = async (field) => {
    if (
      window.confirm(
        `Bạn chắc chắn muốn sửa thông tin của bệnh nhân ${patient.name}?`
      )
    ) {
      try {
        const updated = { ...patient, [field]: form[field] };
        await axios.put(`http://localhost:5050/api/patients/${id}`, updated);
        setPatient(updated);
        setAddingField(null);
        alert("Cập nhật thành công!");
      } catch (err) {
        alert("Cập nhật thất bại!");
      }
    }
  };

  // Helper để render input hoặc text cho từng trường
  const renderField = (label, field, type = "text") => {
    if (editMode || addingField === field) {
      return (
        <p className="patient-edit-p">
          {label}:{" "}
          <input
            className="patient-edit-input"
            name={field}
            type={type}
            value={form[field] || ""}
            onChange={handleChange}
          />
        </p>
      );
    }
    if (!patient[field]) {
      return (
        <p className="patient-edit-p">
          {label}:{" "}
          <button
            className="patient-edit-button"
            onClick={() => handleAddField(field)}
          >
            Thêm thông tin
          </button>
          {addingField === field && (
            <>
              <input
                className="patient-edit-input"
                name={field}
                type={type}
                value={form[field] || ""}
                onChange={handleChange}
                style={{ marginLeft: 8 }}
              />
              <button
                className="patient-edit-button"
                style={{ marginLeft: 8 }}
                onClick={() => handleSaveField(field)}
              >
                Lưu
              </button>
            </>
          )}
        </p>
      );
    }
    return (
      <p className="patient-edit-p">
        {label}: {patient[field]}
      </p>
    );
  };

  const renderArrayField = (label, field) => {
    if (editMode || addingField === field) {
      return (
        <p className="patient-edit-p">
          {label}:{" "}
          <textarea
            className="patient-edit-textarea"
            name={field}
            value={Array.isArray(form[field]) ? form[field].join("\n") : ""}
            onChange={(e) =>
              setForm({
                ...form,
                [field]: e.target.value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter((item) => item),
              })
            }
            rows={3}
            placeholder="Mỗi dòng là một mục"
          />
        </p>
      );
    }
    if (!patient[field] || patient[field].length === 0) {
      return (
        <p className="patient-edit-p">
          {label}:{" "}
          <button
            className="patient-edit-button"
            onClick={() => handleAddField(field)}
          >
            Thêm thông tin
          </button>
          {addingField === field && (
            <>
              <textarea
                className="patient-edit-textarea"
                name={field}
                value={Array.isArray(form[field]) ? form[field].join("\n") : ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [field]: e.target.value
                      .split("\n")
                      .map((item) => item.trim())
                      .filter((item) => item),
                  })
                }
                rows={3}
                placeholder="Mỗi dòng là một mục"
                style={{ marginLeft: 8 }}
              />
              <button
                className="patient-edit-button"
                style={{ marginLeft: 8 }}
                onClick={() => handleSaveField(field)}
              >
                Lưu
              </button>
            </>
          )}
        </p>
      );
    }
    return (
      <div>
        {patient[field].map((item, idx) => (
          <p key={idx}>• {item}</p>
        ))}
      </div>
    );
  };

  let relatives = [];
  if (Array.isArray(patient.relatives)) {
    relatives = patient.relatives;
  } else if (patient.relatives && typeof patient.relatives === "object") {
    relatives = [patient.relatives];
  }

  return (
    <div className="papro-cover">
      <div className="papro-top-text">
        <a>THÔNG TIN BỆNH NHÂN</a>
      </div>
      <img className="papro-top-img" src={topimage} alt="patient" />
      <span
        onClick={() => navigate("/doctor/drhome")}
        className="papro-navigator"
      >
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span
        onClick={() => navigate("/doctor/patientlist")}
        className="papro-navigator-2"
      >
        Hồ sơ bệnh án <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span className="papro-navigator-3">
        {"  "}
        Bệnh nhân {patient.name}
      </span>
      <div className="main-papro-container">
        <div className="patient">
          <div className="papro-col1">
            <div className="papro-img">
              <img
                src={patient.gender === "Nữ" ? patient2 : patient1}
                alt="Ảnh bệnh nhân"
              />
            </div>
            <div className="papro-info">
              <h6>Bệnh nhân</h6>
              {editMode ? (
                <input
                  className="patient-edit-input"
                  name="name"
                  value={form.name || ""}
                  onChange={handleChange}
                />
              ) : (
                <h4>{patient.name}</h4>
              )}
              {!editMode && (
                <button className="edit-patient-info" onClick={handleEdit}>
                  Sửa thông tin
                </button>
              )}
              {editMode && (
                <button
                  className="patient-edit-button"
                  style={{ marginLeft: 8 }}
                  onClick={handleSave}
                >
                  Lưu
                </button>
              )}
              {editMode && (
                <button
                  className="patient-edit-button-cancel"
                  style={{ marginLeft: 8 }}
                  onClick={() => {
                    setEditMode(false);
                    setForm(patient);
                  }}
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
          <div className="papro-general">
            <h5>Thông tin cơ bản</h5>
            {renderField("Số điện thoại", "phone")}
            {renderField("Ngày sinh", "birthDate")}
            {renderField("CMND/CCCD", "idNumber")}
            {renderField("Giới tính", "gender")}
            {renderField("Dân tộc", "ethnicity")}
            {renderField("Địa chỉ thường trú", "address")}
            {renderField("Số thẻ BHYT", "insuranceNumber")}
            {renderField("Ngày khám", "examinationDate")}
            {renderField(
              "Nơi đăng kí khám chữa bệnh ban đầu",
              "registeredHospital"
            )}
            {renderField("Nghề nghiệp", "job")}
          </div>
          <div className="papro-line"></div>
          <h5>Thông tin người thân</h5>
          {relatives.length > 0 ? (
            relatives.map((r, idx) => (
              <div key={idx} style={{ marginBottom: 12 }}>
                <p className="patient-edit-p">
                  Họ tên:{" "}
                  {editMode ? (
                    <input
                      className="patient-edit-input"
                      value={form.relatives[idx]?.name || ""}
                      onChange={(e) => {
                        const newArr = [...form.relatives];
                        newArr[idx] = { ...newArr[idx], name: e.target.value };
                        setForm({ ...form, relatives: newArr });
                      }}
                    />
                  ) : (
                    r.name
                  )}
                </p>
                <p className="patient-edit-p">
                  Số điện thoại:{" "}
                  {editMode ? (
                    <input
                      className="patient-edit-input"
                      value={form.relatives[idx]?.phone || ""}
                      onChange={(e) => {
                        const newArr = [...form.relatives];
                        newArr[idx] = { ...newArr[idx], phone: e.target.value };
                        setForm({ ...form, relatives: newArr });
                      }}
                    />
                  ) : (
                    r.phone
                  )}
                </p>
                <p className="patient-edit-p">
                  Quan hệ:{" "}
                  {editMode ? (
                    <input
                      className="patient-edit-input"
                      value={form.relatives[idx]?.relation || ""}
                      onChange={(e) => {
                        const newArr = [...form.relatives];
                        newArr[idx] = {
                          ...newArr[idx],
                          relation: e.target.value,
                        };
                        setForm({ ...form, relatives: newArr });
                      }}
                    />
                  ) : (
                    r.relation
                  )}
                </p>
                <p className="patient-edit-p">
                  Địa chỉ:{" "}
                  {editMode ? (
                    <input
                      className="patient-edit-input"
                      value={form.relatives[idx]?.address || ""}
                      onChange={(e) => {
                        const newArr = [...form.relatives];
                        newArr[idx] = {
                          ...newArr[idx],
                          address: e.target.value,
                        };
                        setForm({ ...form, relatives: newArr });
                      }}
                    />
                  ) : (
                    r.address
                  )}
                </p>
              </div>
            ))
          ) : addingField === "relatives" ? (
            <div style={{ marginBottom: 12 }}>
              <p className="patient-edit-p">
                Họ tên:{" "}
                <input
                  className="patient-edit-input"
                  value={form.relatives?.[0]?.name || ""}
                  onChange={(e) => {
                    const newArr = [
                      { ...form.relatives?.[0], name: e.target.value },
                    ];
                    setForm({ ...form, relatives: newArr });
                  }}
                />
              </p>
              <p className="patient-edit-p">
                Số điện thoại:{" "}
                <input
                  className="patient-edit-input"
                  value={form.relatives?.[0]?.phone || ""}
                  onChange={(e) => {
                    const newArr = [
                      { ...form.relatives?.[0], phone: e.target.value },
                    ];
                    setForm({ ...form, relatives: newArr });
                  }}
                />
              </p>
              <p className="patient-edit-p">
                Quan hệ:{" "}
                <input
                  className="patient-edit-input"
                  value={form.relatives?.[0]?.relation || ""}
                  onChange={(e) => {
                    const newArr = [
                      { ...form.relatives?.[0], relation: e.target.value },
                    ];
                    setForm({ ...form, relatives: newArr });
                  }}
                />
              </p>
              <p className="patient-edit-p">
                Địa chỉ:{" "}
                <input
                  className="patient-edit-input"
                  value={form.relatives?.[0]?.address || ""}
                  onChange={(e) => {
                    const newArr = [
                      { ...form.relatives?.[0], address: e.target.value },
                    ];
                    setForm({ ...form, relatives: newArr });
                  }}
                />
              </p>
              <button
                className="patient-edit-button"
                style={{ marginRight: 8 }}
                onClick={() => handleSaveField("relatives")}
              >
                Lưu
              </button>
              <button onClick={() => setAddingField(null)}>Hủy</button>
            </div>
          ) : (
            <button
              className="patient-edit-button"
              onClick={() => handleAddField("relatives")}
            >
              Thêm thông tin người thân
            </button>
          )}
        </div>

        <div className="papro-info">
          <h5>Tiền sử bệnh lý</h5>
          {renderArrayField("Tiền sử bệnh lý", "medicalHistory")}
          <div className="papro-line"></div>

          <h5>Lý do đến khám</h5>
          {renderArrayField("Lý do đến khám", "examinationReasons")}
          <div className="papro-line"></div>

          <h5>Liệu trình chữa trị</h5>
          {renderArrayField("Liệu trình chữa trị", "treatmentPlan")}
          <div className="papro-line"></div>

          <h5>Tình trạng hiện tại</h5>
          {renderArrayField("Tình trạng hiện tại", "currentStatus")}
          <div className="papro-line"></div>

          <h5>Xét nghiệm đã thực hiện</h5>
          {renderArrayField("Xét nghiệm đã thực hiện", "tests")}
          <div className="papro-line"></div>

          <h5>Nhật ký theo dõi</h5>
          {renderArrayField("Nhật ký theo dõi", "diary")}
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
