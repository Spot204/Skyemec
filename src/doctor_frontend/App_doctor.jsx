import { Routes, Route, Navigate } from "react-router-dom";
import DrProfile from "./components/DrProfile";
import DrSchedule from "./components/DrSchedule";
import PatientList from "./components/PatientList";
import PatientProfile from "./components/PatientProfile";
import DrHome from "./components/DrHome";
import DrMedicine from "./components/DrMedicine";
import DrHeader from "./components/DrHeader";
import DrFooter from "../user_fontend/components/Footer";
import MedProfile from "./components/MedProfile";
import Footer from "../user_fontend/components/Footer";

const DrApp = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="drhome" replace />} />
        <Route path="/" element={<Navigate to="drhome" replace />} />
        <Route
          path="drhome"
          element={
            <>
              <DrHeader />
              <DrHome />
              <DrFooter />
            </>
          }
        />
        <Route
          path="drschedule"
          element={
            <>
              <DrHeader />
              <DrSchedule />
              <DrFooter />
            </>
          }
        />
        <Route
          path="patientlist"
          element={
            <>
              <DrHeader />
              <PatientList />
              <DrFooter />
            </>
          }
        />
        <Route
          path="patientlist/:id"
          element={
            <>
              <DrHeader />
              <PatientProfile />
              <DrFooter />
            </>
          }
        />
        <Route
          path="medicines"
          element={
            <>
              <DrHeader />
              <DrMedicine />
              <DrFooter />
            </>
          }
        />
        <Route
          path="medicines/:id"
          element={
            <>
              <DrHeader />
              <MedProfile />
              <DrFooter />
            </>
          }
        />
      </Routes>
    </>
  );
};
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

export default DrApp;
