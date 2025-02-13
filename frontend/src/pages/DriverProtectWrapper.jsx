import React, { useContext, useEffect, useState } from "react";
import { DriverDataContext } from "../context/DriverContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DriverProtectWrapper({ children }) {
  const navigate = useNavigate();
  const { driver, setDriver } = useContext(DriverDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/driver-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/v1/drivers/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDriver(response.data.driver);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Auth Error:", err.response?.data || err.message);
        localStorage.removeItem("token");
        navigate("/driver-login");
      });
  }, [navigate, setDriver]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default DriverProtectWrapper;
