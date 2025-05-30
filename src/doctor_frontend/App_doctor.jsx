import { Routes, Route, Navigate } from "react-router-dom";
import DrProfile from "./components/DrProfile";

const App=() => {
    return (
        <>
        <Routes>
            <Route path="drprofile" element={<DrProfile/>}/>
        </Routes>
        </>
    );
    }

export default App;