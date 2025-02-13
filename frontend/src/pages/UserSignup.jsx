import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/register`,
      newUser,
    );
    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-6 text-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1519608487953-e999c86e7455)`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      <div className="relative z-10 text-white max-w-md w-full bg-white bg-opacity-90 rounded-xl p-8 shadow-2xl">
        <img
          className="w-16 mb-10 mx-auto"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium text-black mb-2">
            What's your name?
          </h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-2 w-1/2 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="First name"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-gray-200 rounded-lg px-4 py-2 w-1/2 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className="text-lg font-medium text-black mb-2">
            What's your email?
          </h3>
          <input
            required
            className="bg-gray-200 mb-6 rounded-lg px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className="text-lg font-medium text-black mb-2">
            Enter Password
          </h3>
          <input
            required
            className="bg-gray-200 mb-6 rounded-lg px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-6 rounded-full w-full hover:bg-gray-950 transition ease-in-out duration-300 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 flex justify-center text-black gap-2">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </p>

        <div className="mt-6 text-[10px] leading-tight text-center">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
