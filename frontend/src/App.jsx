import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Home,
  UserLogin,
  UserSignup,
  UserLogout,
  UserProtectWrapper,
  DriverHome,
  DriverLogin,
  DriverSignup,
  DriverLogout,
  DriverProtectWrapper,
} from "./pages/index.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        {/* User routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
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
