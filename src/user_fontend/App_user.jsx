import React from "react";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Body from "./components/Body";
import Body_Search_doctor from "./components/Body_Search_doctor";
import Footer from "./components/Footer";
import DepartmentList from "./components/DepartmentList";
import Department from "./components/Department";
import Department_body from "./components/Department_body";
import Search_doctor from "./components/Search_doctor";
import Oder_doctor from "./components/Oder_doctor";
import CustomerService from "./components/CustomerService";

const App = () => {
  //const [currentPage, setCurrentPage] = useState("home");
  const headers = ["Giới thiệu Skyemec, Tầm nhìn & Sứ mệnh", "Giá trị cốt lõi"];

  const notes = [
    "Skyemec là hệ thống y tế không vì lợi nhuận do Tập đoàn Vingroup đầu tư phát triển, với tầm nhìn trở thành một hệ thống y tế hàn lâm vươn tầm quốc tế thông qua những nghiên cứu đột phá, nhằm mang lại chất lượng điều trị xuất sắc và dịch vụ chăm sóc hoàn hảo.",
    "Skyemec cam kết phát triển hệ thống y tế hàn lâm vươn tầm quốc tế thông qua những nghiên cứu đột phá, nhằm mang lại chất lượng điều trị xuất sắc và dịch vụ chăm sóc hoàn hảo. ",
    "hăm sóc bằng Tài năng, Y đức và Sự thấu cảm. ",
    "Không ngừng sáng tạo và đổi mới nhằm mang lại các giải pháp tốt nhất cho người bệnh.",
    "Chịu trách nhiệm cao nhất với bệnh nhân và người nhà của họ về y đức, kỹ năng, tri thức và các tiêu chuẩn chuyên môn tại Vinmec.",
    "Cam kết chỉ làm những điều tốt nhất cho bệnh nhân, mang lại độ tin cậy cao nhất cho cộng đồng.",
  ];

  const images = ["/src/assets/image90.png", "/src/assets/image91.jpg"];
  const [topText, setTopText] = useState("DANH SÁCH BÁC SĨ - CHUYÊN GIA");
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="/" element={<Navigate to="home" replace />} />
        {/* Khi user nhấn đăng nhập, điều hướng sang app doctor, không render login ở đây */}
        <Route
          path="home"
          element={
            <>
              <Body />
              <Footer />
            </>
          }
        />
        <Route
          path="search_doctor"
          element={
            <>
              <Body_Search_doctor
                topText={"DANH SÁCH BÁC SĨ - CHUYÊN GIA"}
                setTopText={setTopText}
              />
              <Search_doctor />
              <Footer />
            </>
          }
        />
        <Route
          path="oder_doctor"
          element={
            <>
              <Body_Search_doctor
                topText="ĐẶT LỊCH KHÁM BỆNH"
                setTopText={setTopText}
              />
              <Oder_doctor />
              <Footer />
            </>
          }
        />
        <Route
          path="emergency"
          element={
            <>
              <Body_Search_doctor topText="Cấp cứu" setTopText={setTopText} />
              <Department text="cap_cuu" />
              <Footer />
            </>
          }
        />
        <Route
          path="cardiology"
          element={
            <>
              <Body_Search_doctor
                topText="Trung tâm Tim mạch"
                setTopText={setTopText}
              />
              <Department text="tim_mach" />
              <Footer />
            </>
          }
        />
        <Route
          path="orthopedics"
          element={
            <>
              <Body_Search_doctor
                topText="Chấn thương chỉnh hình - Y học thể thao"
                setTopText={setTopText}
              />
              <Department text="chan_thuong_chinh_hinh" />
              <Footer />
            </>
          }
        />
        <Route
          path="kids"
          element={
            <>
              <Body_Search_doctor
                topText="Trung tâm Nhi"
                setTopText={setTopText}
              />
              <Department text="nhi" />
              <Footer />
            </>
          }
        />
        <Route
          path="oncology"
          element={
            <>
              <Body_Search_doctor
                topText="Trung tâm Ung bướu"
                setTopText={setTopText}
              />
              <Department text="ung_buou" />
              <Footer />
            </>
          }
        />
        <Route
          path="khoa"
          element={
            <>
              <Body_Search_doctor
                topText="Chuyên khoa"
                setTopText={setTopText}
              />
              <DepartmentList />
              <Footer />
            </>
          }
        />
        <Route
          path="information"
          element={
            <>
              <Body_Search_doctor
                topText="Giới thiệu về Skyemec"
                setTopText={setTopText}
              />
              <Department_body
                headers={headers}
                notes={notes}
                images={images}
              />
              <Footer />
            </>
          }
        />
        <Route path="customer_service" element={<CustomerService />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </>
  );
};

export default App;
