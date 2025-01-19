import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DriverDataContext } from "../../../context/DriverContext.jsx";
import axios from "axios";

function DriverLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { driver, setDriver } = useContext(DriverDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const driver = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/driver/login`,
      driver,
    );
    if (response.status === 200) {
      const data = response.data;
      setDriver(data.driver);
      localStorage.setItem("token", data.token);
      navigate("/driver-home");
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
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
            type="email"
            placeholder="example@email.com"
            className="bg-[#eeeeee] mb-7 text-lg placeholder:text-base rounded px-4 py-2 border w-full"
          />

          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
            className="bg-[#eeeeee] mb-7 text-lg placeholder:text-base rounded px-4 py-2 border w-full"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 text-lg rounded px-4 py-2 w-full"
          >
            Login
          </button>
          <p className="text-center">
            Ready to drive with us?{" "}
            <Link to="/driver-signup" className="text-green-700">
              Register now as Ride Partner!
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#13FFFF] flex items-center justify-center text-black font-semibold mb-5 text-lg rounded px-4 py-2 w-full"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default DriverLogin;
