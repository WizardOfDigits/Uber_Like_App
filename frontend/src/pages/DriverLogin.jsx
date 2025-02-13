import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DriverDataContext } from "../context/DriverContext";

function Driverlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { driver, setDriver } = React.useContext(DriverDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const driver = { email, password };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/drivers/login`,
        driver,
      );

      if (response.status === 200) {
        const data = response.data;
        setDriver(data.driver);
        localStorage.setItem("token", data.token);
        navigate("/driver-home");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        console.error("Login Failed:", error.response.data);
        alert(
          error.response.data.message || "Login failed. Check credentials.",
        );
      } else {
        // Network or other errors
        console.error("Error:", error.message);
        alert("Something went wrong. Please try again.");
      }
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            type="password"
            placeholder="password"
          />

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?{" "}
          <Link to="/driver-signup" className="text-blue-600">
            Register as a Driver
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}
export default Driverlogin;
