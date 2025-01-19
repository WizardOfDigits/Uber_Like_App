import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      newUser,
    );
    if (response.status === 201) {
      const data = response.data;
      navigate("/login");
    }
    setFirstName("");
    setLastName("");
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
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-5 mb-6">
            <input
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2  text-lg placeholder:text-base rounded px-4 py-2 border"
            />
            <input
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2  text-base placeholder:text-sm rounded px-4 py-2 border"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] mb-6 text-lg placeholder:text-base rounded px-4 py-2 border w-full"
          />

          <h3 className="text-lg font-medium mb-2">What's your password</h3>
          <input
            required
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 text-lg placeholder:text-base rounded px-4 py-2 border w-full"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-3 text-lg rounded px-4 py-2 w-full"
          >
            Create account
          </button>
          <p className="text-center">
            Already have and account{" "}
            <Link to="/login" className="text-green-700">
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By proceeding you agree to our Terms and Conditions and confirm you
          have read our Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default UserSignup;
