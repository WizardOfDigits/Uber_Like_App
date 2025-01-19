import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { DriverDataContext } from "../../../context/DriverContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DriverSignup() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Vehicle state
  const [vehicleType, setVehicleType] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");

  const { setDriver } = useContext(DriverDataContext);

  // Form validation
  const validateForm = () => {
    if (!email || !password || !firstName || !lastName) {
      setError("Please fill in all personal details");
      return false;
    }
    if (!vehicleType || !vehiclePlate || !vehicleColor || !vehicleCapacity) {
      setError("Please fill in all vehicle details");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  // Clear form fields
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleType("");
    setVehiclePlate("");
    setVehicleColor("");
    setVehicleCapacity("");
    setError(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!validateForm()) return;

    try {
      setLoading(true);

      const driverData = {
        fullName: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
        email: email.trim().toLowerCase(),
        password: password,
        vehicle: {
          vehicleType: vehicleType.trim(),
          plate: vehiclePlate.trim().toUpperCase(),
          color: vehicleColor.trim(),
          capacity: parseInt(vehicleCapacity),
        },
      };

      console.log("Sending registration data:", driverData);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/driver/register`,
        driverData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        const data = response.data;
        setDriver(data.driver);
        localStorage.setItem("token", data.token);
        clearForm();
        navigate("/driver-home");
      }
    } catch (error) {
      console.error("Registration error:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Logo"
        />
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-5 mb-6">
            <input
              required
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 text-lg placeholder:text-base rounded px-4 py-2 border"
            />
            <input
              required
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#eeeeee] w-1/2 text-base placeholder:text-sm rounded px-4 py-2 border"
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
            placeholder="password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] mb-6 text-lg placeholder:text-base rounded px-4 py-2 border w-full"
          />

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-5 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className="flex gap-5 mb-7">
            <input
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="number"
              min="1"
              max="8"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="motorbike">Motorbike</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-[#111] text-white font-semibold mb-3 text-lg rounded px-4 py-2 w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Account..." : "Create Driver Account"}
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/driver-login" className="text-green-700">
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

export default DriverSignup;
