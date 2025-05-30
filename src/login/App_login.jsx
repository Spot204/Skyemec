import Login from "../login/components/Login"
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
