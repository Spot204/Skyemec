import React, { useState } from "react";
import Header from "./user_fontend/components/Header";
import Body from "./user_fontend/components/Body";
import Body_Search_doctor from "./user_fontend/components/Body_Search_doctor";
import Footer from "./user_fontend/components/Footer";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <>
      <Header setCurrentPage={setCurrentPage} />
      {currentPage === "home" && <Body setCurrentPage={setCurrentPage} />}
      {currentPage === "home" ? (
        <Body />
      ) : (
        <Body_Search_doctor
          activeComponent={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage !== "home" &&
        currentPage !== "oder_doctor" &&
        currentPage !== "search_doctor" && <div>Page not found</div>}
      <Footer />
    </>
  );
};

export default App;
