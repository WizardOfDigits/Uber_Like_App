import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../../context/UserContext";
import axios from "axios";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/login`,
      user,
    );
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
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
            Ready to ride with us?{" "}
            <Link to="/signup" className="text-green-700">
              Sign up as User
            </Link>
          </p>
        </form>
      </div>
      <div>
        <Link
          to="/driver-login"
          className="bg-[#0C70EC] flex items-center justify-center text-white font-semibold mb-5 text-lg rounded px-4 py-2 w-full"
        >
          Sign in as Driver
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
