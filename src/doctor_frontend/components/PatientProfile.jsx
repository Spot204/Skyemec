import "../styles/PatientProfile.css";
import patient1 from "../assets/empty-ava.jpg";
import patient2 from "../assets/empty-ava-1.jpg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
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

  const handleEdit = () => {
    if (window.confirm("Bạn muốn sửa thông tin bệnh nhân?")) {
      setEditMode(true);
    }
  };

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

  const handleAddField = (field) => {
    setAddingField(field);
    setEditMode(false);
  };

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
          {addingField === field && (
            <span>
              <button
                className="patient-save-add-info-button"
                onClick={() => handleSaveField(field)}
              >
                Lưu
              </button>
              <button
                className="patient-save-add-info-button-cancel"
                onClick={() => setAddingField(null)}
              >
                Hủy
              </button>
            </span>
          )}
        </p>
      );
    }
    if (!patient[field]) {
      return (
        <p className="patient-edit-p">
          {label}:{" "}
          <button
            className="patient-add-info-button"
            onClick={() => handleAddField(field)}
          >
            +
          </button>
        </p>
      );
    }
    return (
      <p className="patient-edit-p">
        {label}: {patient[field]}
      </p>
    );
  };

  function AutoResizeTextarea({ value, onChange, name, placeholder }) {
    const textareaRef = useRef(null);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }, [value]);

    return (
      <textarea
        ref={textareaRef}
        className="patient-edit-textarea"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ minHeight: 60, overflow: "hidden" }}
      />
    );
  }

  const renderArrayField = (label, field) => {
    if (editMode || addingField === field) {
      const value =
        typeof form[field] === "string"
          ? form[field]
          : Array.isArray(form[field])
          ? form[field].join("\n")
          : "";

      return (
        <p className="patient-edit-p">
          <AutoResizeTextarea
            name={field}
            value={value}
            onChange={(e) =>
              setForm({
                ...form,
                [field]: e.target.value,
              })
            }
            placeholder="Mỗi dòng là một mục"
          />
          {addingField === field && (
            <span>
              <button
                className="patient-save-add-info-button"
                onClick={() => handleSaveField(field)}
              >
                Lưu
              </button>
              <button
                className="patient-save-add-info-button-cancel"
                onClick={() => setAddingField(null)}
              >
                Hủy
              </button>
            </span>
          )}
        </p>
      );
    }

    if (!patient[field] || patient[field].length === 0) {
      return (
        <p className="patient-edit-p">
          {label}:{" "}
          <button
            className="patient-add-info-button"
            onClick={() => handleAddField(field)}
          >
            +
          </button>
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
                <>
                  <button className="edit-patient-info" onClick={handleEdit}>
                    Sửa thông tin
                  </button>
                  <button
                    className="patient-delete-button"
                    style={{ marginLeft: 8 }}
                    onClick={async () => {
                      if (window.confirm("Bạn chắc chắc muốn xóa hồ sơ này?")) {
                        try {
                          await axios.delete(
                            `http://localhost:5050/api/patients/${id}`
                          );
                          alert("Đã xóa hồ sơ thành công!");
                          navigate("/doctor/patientlist");
                        } catch (err) {
                          alert("Xóa hồ sơ thất bại!");
                        }
                      }
                    }}
                  >
                    Xóa hồ sơ
                  </button>
                </>
              )}
              {editMode && (
                <button
                  className="patient-save-edit-button"
                  onClick={handleSave}
                >
                  Lưu
                </button>
              )}
              {editMode && (
                <button
                  className="patient-edit-button-cancel"
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
                      value={form.relatives?.[idx]?.name || ""}
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
                      value={form.relatives?.[idx]?.phone || ""}
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
                      value={form.relatives?.[idx]?.relation || ""}
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
                      value={form.relatives?.[idx]?.address || ""}
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
                className="patient-save-edit-button"
                style={{ marginRight: 8 }}
                onClick={() => handleSaveField("relatives")}
              >
                Lưu
              </button>
              <button
                className="patient-edit-button-cancel"
                onClick={() => setAddingField(null)}
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              className="patient-save-edit-button"
              onClick={() => handleAddField("relatives")}
            >
              Thêm người thân
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
