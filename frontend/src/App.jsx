import { Routes, Route } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import {
  LandingPage,
  Home,
  UserLogin,
  UserSignup,
  UserLogout,
  UserProtectWrapper,
  Riding,
  DriverHome,
  DriverLogin,
  DriverSignup,
  DriverLogout,
  DriverProtectWrapper,
} from "./pages/index.js";

import DriverRiding from "./pages/driver/DriverRiding.jsx";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* User routes */}
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/driver-riding" element={<DriverRiding />} />

        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        {/* Driver routes */}
        <Route
          path="/driver-home"
          element={
            <DriverProtectWrapper>
              <DriverHome />
            </DriverProtectWrapper>
          }
        />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/driver-signup" element={<DriverSignup />} />
        <Route
          path="/driver/logout"
          element={
            <DriverProtectWrapper>
              <DriverLogout />
            </DriverProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
