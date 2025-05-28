import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./user_fontend/components/Header";
import Body from "./user_fontend/components/Body";
import Body_Search_doctor from "./user_fontend/components/Body_Search_doctor";
import Footer from "./user_fontend/components/Footer";
import Login from "./login/components/Login";
import DrSchedule from "./doctor_frontend/components/DrSchedule";
import DrProfile from "./doctor_frontend/components/DrProfile";
import Department from "./user_fontend/components/Department";
import Search_doctor from "./user_fontend/components/Search_doctor";
import Oder_doctor from "./user_fontend/components/Oder_Doctor";
import PatientProfile from "./doctor_frontend/components/PatientProfile";

const App = () => {
  //const [currentPage, setCurrentPage] = useState("home");

  const [topText, setTopText] = useState("DANH SÁCH BÁC SĨ - CHUYÊN GIA");
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <>
              <Body />
              <Footer />
            </>
          }
        />
        <Route
          path="/search_doctor"
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
          path="/oder_doctor"
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
          path="/emergency"
          element={
            <>
              <Body_Search_doctor topText="Cấp cứu" setTopText={setTopText} />
              <Department text="cap_cuu" />
              <Footer />
            </>
          }
        />
        <Route
          path="/khoa"
          element={
            <>
              {" "}
              <Body_Search_doctor
                topText="Chuyên khoa"
                setTopText={setTopText}
              />
              <DepartmentList />
              <Footer />
            </>
          }
        />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
