//import React, { useState } from "react";
import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./user_fontend/components/Header";
import Body from "./user_fontend/components/Body";
import Body_Search_doctor from "./user_fontend/components/Body_Search_doctor";
import Footer from "./user_fontend/components/Footer";
import Login from "./login/components/Body";
import Schedule from "./doctor_frontend/components/DrSchedule";
import Department from "./user_fontend/components/Department";
import Search_doctor from "./user_fontend/components/Search_doctor";
import Oder_doctor from "./user_fontend/components/Oder_Doctor";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const [topText, setTopText] = useState("DANH SÁCH BÁC SĨ - CHUYÊN GIA");
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/home" element={<Body />} />
        <Route
          path="/search_doctor"
          element={
            <>
              <Body_Search_doctor
                topText={"DANH SÁCH BÁC SĨ - CHUYÊN GIA"}
                setTopText={setTopText}
              />
              <Search_doctor />
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
            </>
          }
        />
        <Route
          path="/emergency"
          element={
            <>
              <Body_Search_doctor topText="Cấp cứu" setTopText={setTopText} />
              <Department text="cap_cuu" />
            </>
          }
        /> */}
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
