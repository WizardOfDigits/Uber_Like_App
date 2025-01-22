import React from "react";
import { Link } from "react-router-dom";

function FinishRide(props) {
  return (
    <div className="">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish This Ride</h3>

      {/* Shows user details whose driver has accepted the ride */}
      <div className="flex items-center justify-between mt-3 p-4 border-2 border-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F879%2F186%2Flarge_2x%2Fuser-icon-on-transparent-background-free-png.png&f=1&nofb=1&ipt=450dd32cf28a73ae9b2fa3aabfd5920d70c16d83724db47603f080caf06a4600&ipo=images"
            alt="userImage"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h2 className="text-lg font-medium">Testing User</h2>
        </div>
        <h5 className="text-lg font-semibold">5.0 km</h5>
      </div>

      {/* shows user location details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                123 Sunshine Avenue, Green Valley, NY 10101
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                456 Ocean Drive, Sunset Beach, CA 90210
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">NRS.200.00</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <Link
            to="/driver-home"
            className="w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </Link>
          <p className="text-xs mt-8 p-3 text-red-500">
            click on finish ride button if you have completed the payment
          </p>
        </div>
      </div>
    </div>
  );
}

export default FinishRide;
