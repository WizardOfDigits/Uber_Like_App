import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import DriverDetails from "../../components/DriverDetails";
import RidePopup from "../../components/RidePopup";
import ConfirmRidePopup from "../../components/ConfirmRidePopup.jsx";
import { SocketContext } from "../../context/SocketContext.jsx";
import { DriverDataContext } from "../../context/DriverContext.jsx";

function DriverHome() {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [ConfirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { driver } = useContext(DriverDataContext);

  useEffect(() => {
    socket.emit("join", {
      userId: driver._id,
      userType: "driver",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-driver", {
            userId: driver._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  socket.on("new-ride", (data) => {
    console.log("new-ride", data);
    // setConfirmRidePopupPanel(true)
  });

  // popup animation
  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (ConfirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0%)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePopupPanel]);

  return (
    <div className="h-screen">
      <div className="fixed top-0 flex items-center justify-between w-screen p-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-16"
        />
        <Link
          to="/driver-login"
          className="h-10 w-10 bg-white rounded-full flex items-center justify-center"
        >
          <i className="ri-logout-circle-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.wired.com%2Fphotos%2F59269cd37034dc5f91bec0f1%2Fmaster%2Fpass%2FGoogleMapTA.jpg&f=1&nofb=1&ipt=fb141eb91d172811edf4cddc79c241f36ce4875aa2f29433b1abb99810209b3e&ipo=images"
        />
      </div>

      {/* show driver */}
      <div className="h-2/5 p-6">
        <DriverDetails />
      </div>
      <div>
        {/* popup */}
        <div
          ref={ridePopupPanelRef}
          className="bg-white w-full fixed z-10 bottom-0 px-3 py-12 translate-y-full"
        >
          <RidePopup
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          />
        </div>

        <div
          ref={confirmRidePopupPanelRef}
          className="bg-white w-full fixed z-10 bottom-0 h-screen px-3 py-12 translate-y-full"
        >
          <ConfirmRidePopup
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>
      </div>
    </div>
  );
}

export default DriverHome;
