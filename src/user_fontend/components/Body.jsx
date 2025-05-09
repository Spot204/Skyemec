import "../styles/Body.css";
import slider1 from "../assets/slider1.png";
import slider2 from "../assets/slider2.png";
import slider3 from "../assets/slider3.jpg";
import slider4 from "../assets/slider4.png";
import doctor1 from "../assets/doctor1.png";
import image1 from "../assets/small1.jpg";
import image2 from "../assets/small2.jpg";
import image3 from "../assets/small3.jpg";
import image4 from "../assets/small4.jpg";
// import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons/faHeartPulse";
import { faStethoscope } from "@fortawesome/free-solid-svg-icons";
import { faShieldHeart } from "@fortawesome/free-solid-svg-icons";

const sliders = [slider1, slider2, slider3, slider4];
const images = [image1, image2, image3, image4];

const Body = () => {
  const settings = {
    dots: true, // Hiển thị chấm chỉ báo
    infinite: true, // Lặp lại vô tận
    speed: 600, // Tốc độ trượt mượt hơn
    slidesToShow: 1, // Chỉ hiển thị 1 ảnh mỗi lần
    slidesToScroll: 1, // Khi trượt, chỉ cuộn từng ảnh một
    swipe: true, // Hỗ trợ kéo trượt bằng chuột
    arrows: false, // Hiển thị nút ❮ ❯ để điều hướng
    autoplay: true, // Kích hoạt chế độ tự động trượt
    autoplaySpeed: 3000, // Mỗi 3 giây sẽ tự động chuyển ảnh
  };
  const settings_local = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <body className="Body-container">
      <div className="Body-top">
        <Slider {...settings}>
          {sliders.map((img, index) => (
            <div key={index}>
              <img src={img} alt={`Slide ${index}`} className="slider-image" />
            </div>
          ))}
        </Slider>
        <div className="Body-top-connect">
          <span className="Body-top-connect-text">
            Chăm sóc bằng tài năng, ý đức và sự thấu cảm
          </span>
          <button className="Body-top-connect-button">Xem thêm</button>
        </div>
        <div className="Body-top-extension">
          <div className="Body-top-item" id="contact">
            <FontAwesomeIcon
              className="Body-top-extension-icon"
              icon={faPhone}
            />
            <div className="Body-top-item-text">
              <h3 className="Body-top-item-text-top">Gọi tổng đài</h3>
              <span className="Body-top-item-text-down">
                Tư vấn và giải đáp các vấn đề của các bạn
              </span>
            </div>
          </div>
          <div className="Body-top-item" id="schedule">
            <FontAwesomeIcon
              className="Body-top-extension-icon"
              icon={faCalendar}
            />
            <div className="Body-top-item-text">
              <h3 className="Body-top-item-text-top">Đặt lịch Hẹn</h3>
              <span className="Body-top-item-text-down">
                Đặt lịch hẹn nhanh chóng, tiện lợi
              </span>
            </div>
          </div>
          <div className="Body-top-item" id="search-doctor">
            <FontAwesomeIcon
              className="Body-top-extension-icon"
              icon={faUserDoctor}
            />
            <div className="Body-top-item-text">
              <h3 className="Body-top-item-text-top">Tìm bác sĩ</h3>
              <span className="Body-top-item-text-down">
                Tìm kiếm thông tin chuyên gia ý tế Skyemec nhanh chóng
              </span>
            </div>
          </div>
        </div>
      </div>
      <h1 id="Body-middle-header">Tại sao nên chọn Skyemec ?</h1>
      <div className="Body-middle">
        <img src={doctor1} alt="" className="Body-middle-doctor" />
        <div className="Body-middle-information">
          <div className="Body-middle-infor-item">
            <FontAwesomeIcon className="Body-infor-icon" icon={faStethoscope} />
            <h3 className="Body-middle-infor-item-top">Chuyên gia hàng đầu</h3>
            <label className="Body-middle-infor-item-bottom">
              Vinmec quy tụ đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng có
              trình độ chuyên môn cao, tay nghề giỏi, tận tâm và chuyên nghiệp.
              Luôn đặt người bệnh làm trung tâm, Vinmec cam kết đem đến dịch vụ
              chăm sóc sức khỏe tốt cho khách hàng.
            </label>
          </div>
          <div className="Body-middle-infor-item">
            <FontAwesomeIcon className="Body-infor-icon" icon={faHeartPulse} />
            <h3 className="Body-middle-infor-item-top">Công nghệ tiên tiến</h3>
            <label className="Body-middle-infor-item-bottom">
              Hệ thống Y tế Vinmec được quản lý và vận hành dưới sự giám sát của
              những nhà quản lý y tế giàu kinh nghiệm, cùng với sự hỗ trợ của
              phương tiện kỹ thuật hiện đại, nhằm đảm bảo cung cấp dịch vụ chăm
              sóc sức khỏe toàn diện và hiệu quả.
            </label>
          </div>
          <div className="Body-middle-infor-item">
            <FontAwesomeIcon className="Body-infor-icon" icon={faShieldHeart} />
            <h3 className="Body-middle-infor-item-top">Chất lượng quốc tế</h3>
            <label className="Body-middle-infor-item-bottom">
              Vinmec cung cấp cơ sở vật chất hạng nhất và dịch vụ 5 sao bằng
              cách sử dụng các công nghệ tiên tiến được quản lý bởi các bác sĩ
              lâm sàng lành nghề để đảm bảo dịch vụ chăm sóc sức khỏe toàn diện
              và hiệu quả cao.
            </label>
          </div>
          <div className="Body-middle-infor-item">
            <FontAwesomeIcon className="Body-infor-icon" icon={faStethoscope} />
            <h3 className="Body-middle-infor-item-top">Nghiên cứu & Đổi mới</h3>
            <label className="Body-middle-infor-item-bottom">
              Vinmec liên tục thúc đẩy y học hàn lâm dựa trên nghiên cứu có
              phương pháp và sự phát triển y tế được chia sẻ từ quan hệ đối tác
              toàn cầu với các hệ thống chăm sóc sức khỏe hàng đầu thế giới nhằm
              cung cấp các phương pháp điều trị mang tính cách mạng và sáng tạo
              cho tiêu chuẩn chăm sóc bệnh nhân tốt nhất.
            </label>
          </div>
        </div>
      </div>
      <div className="space"></div>
      <div className="Body-bottom">
        <div className="Body-bottom-images">
          <Slider {...settings_local}>
            {images.map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Slide ${index}`}
                  className="Body-bottom-slider-image"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="Body-bottom-about-Skyemec">
          <div className="Body-bottom-about-Skyemec-infor">
            <h1 className="Body-bottom-header">
              Hệ thống phòng khám và trung tâm của chúng tôi
            </h1>
            <label className="Body-bottom-label">
              Vinmec là Hệ thống Y tế tư nhân duy nhất tại Việt Nam hoạt động
              không vì mục tiêu lợi nhuận, có 2 bệnh viện đạt chứng chỉ tiêu
              chuẩn JCI - Tiêu chuẩn về an toàn người bệnh và chất lượng bệnh
              viện khắt khe nhất thế giới, cùng các chứng chỉ quốc tế trong từng
              lĩnh vực chuyên môn uy tín.
            </label>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Body;
