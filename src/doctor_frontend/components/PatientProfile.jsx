import "../styles/PatientProfile.css";
import patient1 from "../assets/empty-ava.jpg";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate } from "react-router-dom";

const PatientProfile = () => {
  const navigate = useNavigate();

  return (
    // bổ sung onClick
    <div className="papro-cover">
      <div className="papro-top-text">
        <h455>THÔNG TIN BỆNH NHÂN</h455>
      </div>
      <img className="papro-top-image" src={topimage} alt="patient" />
      <span onClick={() => navigate("")} className="papro-navigator">
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span onClick={() => navigate("")} className="papro-navigator-2">
        Tìm bác sĩ <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span className="papro-navigator-3">
        {"  "}
        Bệnh nhân Nguyễn Văn A
      </span>
      <div className="main-papro-container">
        <div className="patient">
          <div className="papro-col1">
            <div className="papro-img">
              <img src={patient1} alt="Ảnh 1" />
            </div>
            <div className="papro-info">
              <h3>Bệnh nhân</h3>
              <h4>Nguyễn Văn A</h4>
              <button>Sửa thông tin</button>
            </div>
          </div>
          <div className="papro-general">
            <h5>Thông tin cơ bản</h5>
            <p>Số điện thoại: 0123456789</p>
            <p>Ngày sinh: 01/01/1969</p>
            <p>CMND/CCCD: 123456789</p>
            <p>Giới tính: Nam</p>
            <p>Dân tộc: Kinh</p>
            <p>Địa chỉ thường trú: Quận Thanh Xuân, TP. Hà Nội</p>
            <p>Số thẻ BHYT: 428184728</p>
            <p>Ngày khám: 20/05/2025</p>
            <p>
              Nơi đăng kí khám chữa bệnh ban đầu: Bệnh viện Đại học Y Hà Nội
            </p>
            <p>Nghề nghiệp: Công nhân</p>
          </div>
          <div className="line"></div>
          <h5>Thông tin người thân</h5>
          <p>Họ tên: Nguyễn Văn B</p>
          <p>Số điện thoại: 0123456788</p>
          <p>Quan hệ với bệnh nhân: Anh trai</p>
          <p>Địa chỉ thường trú: Quận Thanh Xuân, TP. Hà Nội</p>
        </div>

        <div className="papro-info">
          <h5>Tiền sử bệnh lý</h5>
          <p>• Bệnh tiểu đường loại 2 (chẩn đoán 5 năm trước)</p>
          <p>• Cao huyết áp </p>
          <p>• Tiền sử đau dạ dày</p>
          <div className="line"></div>

          <h5>Lý do đến khám</h5>
          <p>• Đau ngực dữ dội, khó thở, vã mồ hôi </p>
          <p>• Triệu chứng xuất hiện khoảng 3 giờ trước khi nhập viện</p>
          <p>• Tiền sử tăng huyết áp, có yếu tố nguy cơ bệnh tim mạch</p>
          <div className="line"></div>

          <h5>Liệu trình chữa trị</h5>
          <p>• Nhập viện cấp cứu, thực hiện xét nghiệm nhanh</p>
          <p>• Chẩn đoán: Hội chứng mạch vành cấp</p>
          <p>• Điều trị bằng thuốc chống đông máu và giãn mạch</p>
          <p>• Theo dõi sát ECG và huyết áp</p>
          <div className="line"></div>

          <h5>Tình trạng hiện tại</h5>
          <p>• Đã qua cơn nguy hiểm, nhưng vẫn cần theo dõi sát sao</p>
          <p>• Huyết áp: 140/90 mmHg</p>
          <p>• Mạch: 85 lần/phút</p>
          <p>• Đang sử dụng oxy hỗ trợ</p>
          <div className="line"></div>

          <h5>Xét nghiệm đã thực hiện</h5>
          <p>• Điện tâm đồ (ECG): Xuất hiện dấu hiệu nhồi máu cơ tim</p>
          <p>• Xét nghiệm men tim: Tăng cao (Troponin I: 0.5 ng/ml)</p>
          <p>• Siêu âm tim: Rối loạn vận động vùng tim</p>
          <p>• Xét nghiệm máu: Đường huyết 7.8 mmol/L, cholesterol cao</p>
          <div className="line"></div>

          <h5>Nhật ký theo dõi</h5>
          <p>
            • Ngày 1: Bệnh nhân nhập viện cấp cứu, thực hiện xét nghiệm và chẩn
            đoán. Được chỉ định thuốc chống đông máu và giãn mạch.
          </p>
          <p>
            • Ngày 2: Tình trạng ổn định hơn, giảm đau ngực, vẫn cần theo dõi
            huyết áp và ECG.
          </p>
          <p>
            • Ngày 3: Dự kiến thực hiện chụp mạch vành để đánh giá mức độ tổn
            thương.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
