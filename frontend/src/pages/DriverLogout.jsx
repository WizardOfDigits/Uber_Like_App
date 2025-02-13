import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function DriverLogout() {
  const token = localStorage.getItem("driver-token");
  const navigate = useNavigate();
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/v1/drivers/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem("driver-token");
        navigate("/dirver-login");
      }
    });
  return <div>driver</div>;
}
export default DriverLogout;
