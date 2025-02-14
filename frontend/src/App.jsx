import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserLogout from "./pages/UserLogout";
import UserSignup from "./pages/UserSignup";
import DriverLogin from "./pages/DriverLogin";
import DriverSignup from "./pages/DriverSignup";
import DriverHome from "./pages/DriverHome";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import DriverProtectWrapper from "./pages/DriverProtectWrapper";
import Riding from "./pages/Riding";
import DriverRiding from "./pages/DriverRiding";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/driver-riding" element={<DriverRiding />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/driver-home"
          element={
            <DriverProtectWrapper>
              <DriverHome />
            </DriverProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
