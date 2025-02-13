import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const logoRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
      userData,
    );
    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/home");
    }
    setEmail("");
    setPassword("");
  };

  // GSAP Animations
  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" },
    );

    gsap.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center relative px-6 text-center"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1519608487953-e999c86e7455)`,
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Logo */}
      <img
        ref={logoRef}
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
        className="w-24 absolute top-6 left-6 z-10"
      />

      {/* Login Form */}
      <div
        ref={formRef}
        className="relative z-10 text-white max-w-md w-full bg-white bg-opacity-90 rounded-xl p-8 shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-black mb-8">Welcome Back!</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-6">
            <label
              className="block text-black text-lg font-medium mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 text-black rounded-lg px-4 py-3 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              type="email"
              id="email"
              placeholder="email@example.com"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-black text-lg font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 text-black rounded-lg px-4 py-3 w-full text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              type="password"
              id="password"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-6 rounded-full w-full hover:bg-gray-950 transition ease-in-out duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="mt-8 space-y-4">
          <div className="flex flex-col space-y-4 items-center">
            <Link
              to="/signup"
              className="w-full max-w-xs bg-green-600 text-white font-semibold py-3 px-6 rounded-full 
                 text-center hover:bg-green-700 hover:shadow-md 
                 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
            >
              <i className="fas fa-user-plus"></i>
              Create User Account
            </Link>
            <div className="text-gray-500 text-sm">OR</div>

            <Link
              to="/driver-login"
              className="w-full max-w-xs bg-white text-black font-semibold py-3 px-6 rounded-full 
               text-center border-2 border-black hover:bg-gray-50 hover:border-gray-700 
               transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
            >
              <i className="fas fa-car text-lg"></i>
              Sign in as Driver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
