import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.from(".form-container", { opacity: 0, y: 50, duration: 1 });
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/users/login`,
        { email, password },
      );
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      alert("Login failed. Check your credentials.");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div className="form-container">
        <img
          className="w-16 mb-10"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
          alt="User Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            className="bg-gray-200 mb-7 rounded-lg px-4 py-2 border w-full text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="password"
          />
          <button
            className="bg-black text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
            onMouseEnter={(e) =>
              gsap.to(e.target, { scale: 1.05, duration: 0.2 })
            }
            onMouseLeave={(e) => gsap.to(e.target, { scale: 1, duration: 0.2 })}
          >
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/driver-login"
          className="bg-green-600 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg"
        >
          Sign in as Driver
        </Link>
      </div>
    </div>
  );
}

export default UserLogin;
