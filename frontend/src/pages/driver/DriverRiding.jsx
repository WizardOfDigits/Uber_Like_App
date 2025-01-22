import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../../components/FinishRide.jsx";

function DiverRiding() {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(10%)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen relative">
      <div className="fixed top-0 flex items-center justify-between w-screen p-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          className="w-16"
        />
        <Link
          to="/driver-home"
          className="h-10 w-10 bg-white rounded-full flex items-center justify-center"
        >
          <i className="ri-logout-circle-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.wired.com%2Fphotos%2F59269cd37034dc5f91bec0f1%2Fmaster%2Fpass%2FGoogleMapTA.jpg&f=1&nofb=1&ipt=fb141eb91d172811edf4cddc79c241f36ce4875aa2f29433b1abb99810209b3e&ipo=images"
        />
      </div>
      <div
        className="h-1/5 p-6 pt-10 flex items-center justify-between relative bg-yellow-400"
        onClick={() => {
          setFinishRidePanel(true);
        }}
      >
        <h5 className=" text-center w-[90%] absolute top-0 " onClick={() => {}}>
          <i className="text-3xl text-black ri-arrow-up-wide-line"></i>
        </h5>

        <h4 className="text-xl font-semibold">1 KM Away</h4>
        <button className=" bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="bg-white w-full fixed z-10 bottom-0 h-screen px-3 py-12 translate-y-full"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
}

export default DiverRiding;
