import { Routes, Route, Navigate } from "react-router-dom";
import DrProfile from "./components/DrProfile";
import Footer from "../user_fontend/components/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="doctor/drprofile/:id"
          element={
            <>
              <DrProfile /> <Footer />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
