import React from "react";

function VehiclePanel(props) {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a vehicle </h3>

      {/* Car option */}
      <div
        className="w-full flex items-center justify-between p-3 border-2 active:border-black  rounded-xl mb-2"
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
      >
        <img
          className="h-10"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="carVehicleIcon"
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo
            <span>
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="font-medium text-base">2 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">NRS.300.00</h2>
      </div>

      {/* motorbike */}
      <div
        className="w-full flex items-center justify-between p-3 border-2 active:border-black rounded-xl mb-2"
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
      >
        <img
          className="h-10"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt="motorbikeVehicleIcon"
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="font-medium text-base">2 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable moto rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">NRS.100.00</h2>
      </div>

      {/* bullcart */}
      <div
        className="w-full flex items-center justify-between p-3 border-2 active:border-black rounded-xl mb-2"
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
      >
        <img
          className="h-10"
          src="https://www.shutterstock.com/image-vector/old-conservative-empty-bullock-cart-600nw-1574208688.jpg"
          alt="bullcartVehicleIcon"
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Bullcart
            <span>
              <i className="ri-user-fill"></i>8
            </span>
          </h4>
          <h5 className="font-medium text-base">2 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable oldfashion rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">NRS.30.00</h2>
      </div>
    </div>
  );
}

export default VehiclePanel;
