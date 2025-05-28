import "../styles/DrProfile.css";
import dr1 from "../assets/dr-pho-hoang-dang-mich.PNG";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topimage from "../assets/Docimage1.jpg";
import { useNavigate } from "react-router-dom";

const DrProfile = () => {
  const navigate = useNavigate();

  return (
    <div className="drprofile-cover">
      <div className="drprofile-top-text">
        <h155>THÔNG TIN BÁC SĨ</h155>
      </div>
      <img className="drprofile-top-image" src={topimage} alt="doctor" />
      <span onClick={() => navigate("/home")} className="drprofile-navigator">
        Trang chủ <FontAwesomeIcon icon={faAngleRight} /> {"  "}
      </span>
      <span
        onClick={() => navigate("/search_doctor")}
        className="drprofile-navigator-2"
      >
        Tìm bác sĩ <FontAwesomeIcon icon={faAngleRight} />
      </span>
      <span className="drprofile-navigator-3">
        {"  "}
        Cố vấn chuyên môn Phó Hoàng Đăng Mịch
      </span>
      <div className="drpro-container">
        <div className="doctor">
          <div className="drpro-col1">
            <div className="drpro-img">
              <img src={dr1} alt="Ảnh 1" />
            </div>
            <div className="dr-role">
              <h3>Giáo sư, Phó giáo sư, Tiến sĩ, Cố vấn chuyên môn</h3>
              <h1>Cố vấn chuyên môn Phó Hoàng Đăng Mịch</h1>
              <button>Đăng ký khám</button>
            </div>
          </div>
          <div className="drpro-general">
            <h2>Giới thiệu</h2>
            <p>
              PGS.TS. Cố vấn chuyên môn Hoàng Đăng Mịch đã có hơn 32 năm kinh
              nghiệm trong lĩnh vực Nội tiết.
            </p>
            <p>
              Năm 2010, ông vinh dự được phòng hàm Phó giáo sư và là Ủy viên ban
              chấp hành Hội Nội tiết và Đái tháo đường Việt Nam, đồng thời, ông
              cũng là Chủ tịch Hội Nội tiết và Đái tháo đường Hải Phòng.
            </p>
            <p>
              Hiện tại, PGS.TS. Cố vấn chuyên môn Hoàng Đăng Mịch đang giữ chức
              vụ là cố vấn chuyên môn khối Nội tại khoa Khám bệnh và Nội khoa -
              Bệnh viện Đa khoa Quốc tế Vinmec Hạ Long.
            </p>
          </div>
          <h3 className="dr-tong_quan">Tổng quan</h3>
          <div className="line"></div>
          <p>Tác phong diện mạo</p>
          <div className="line"></div>
          <p>Thái độ giao tiếp</p>
          <div className="line"></div>
          <p>Chuyên môn</p>
          <div className="line"></div>
          <h3 className="dr-tong_quan">Chi tiết lượt đánh giá</h3>
          <p>5*</p>
          <p>4*</p>
          <p>3*</p>
          <p>2*</p>
          <p>1*</p>

          <h3 className="dr-tong_quan">Nhận xét về bác sĩ</h3>
        </div>

        <div className="dr-info">
          <h2>Chuyên môn</h2>
          <p>Cố vấn chuyên môn khối Nội</p>
          <div className="line"></div>

          <h2>Nơi làm việc</h2>
          <p>Khoa khám bệnh & Nội khoa - Bệnh viện Đa khoa Vinmec Hạ Long</p>
          <div className="line"></div>

          <h2>Dịch vụ</h2>
          <p>• Nội tiết - Đái Tháo Đường - Rối loạn chuyển hóa</p>
          <p>
            • Hội chứng thận hư, viêm cầu thận cấp tính và mạn tính, các bệnh
            thận khác; bệnh viêm gan virus B và viêm gan virus C, bệnh gan do
            rượu; bệnh viêm loét dạ dày tá tràng, bệnh Lupus ban đỏ hệ thống và
            các bệnh tự miễn khác
          </p>
          <div className="line"></div>

          <h2>Quá trình đào tạo</h2>
          <p>1977 - 1983: Bác sĩ đa khoa - Học viện Quân y</p>
          <p>1991 - 1993: Bác sĩ chuyên khoa I - Trường Đại học Y Hà Nội</p>
          <p>1997 - 2003: Tiến sĩ Học viện Quân y</p>
          <p>2010: Học hàm Phó giáo sư</p>
          <div className="line"></div>

          <h2>Kinh nghiệm làm việc</h2>
          <p>Giám đốc - Bệnh viện Việt Tiệp Hải Phòng</p>
          <p>Phó giám đốc chuyên môn - Bệnh viện Việt Tiệp - Hải Phòng</p>
          <p>
            Giám đốc Trung tâm Can thiệp tim và mạch máu - Bệnh viện Việt Tiệp -
            Hải Phòng
          </p>
          <p>Trưởng khoa Quốc tế - Bệnh viện Việt Tiệp - Hải Phòng</p>
          <p>
            Trưởng khoa Thận - Nội tiết - Đái tháo đường - Bệnh viện Việt Tiệp -
            Hải Phòng
          </p>
          <p>
            Hiện nay: Cố vấn Chuyên môn khối Nội, khoa Khám bệnh & Nội khoa,
            Bệnh viện Đa khoa Quốc tế Vinmec Hạ Long
          </p>
          <div className="line"></div>

          <h2>Thành viên của các tổ chức</h2>
          <p>Ủy viên ban chấp hành Hội Nội tiết và Đái tháo đường Việt Nam</p>
          <p>Chủ tịch Hội Nội tiết và Đái tháo đường Hải Phòng</p>
          <div className="line"></div>

          <h2>Sách, báo và công trình nghiên cứu</h2>
          <p>Trên 40 công trình nghiên cứu và báo cáo chuyên ngành</p>
        </div>
      </div>
    </div>
  );
};

export default DrProfile;
