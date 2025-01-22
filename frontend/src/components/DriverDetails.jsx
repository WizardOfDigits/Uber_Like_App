import React from "react";

function DriverDetails() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F879%2F186%2Flarge_2x%2Fuser-icon-on-transparent-background-free-png.png&f=1&nofb=1&ipt=450dd32cf28a73ae9b2fa3aabfd5920d70c16d83724db47603f080caf06a4600&ipo=images"
            alt="userImage"
            className="h-10 w-10 rounded-full object-cover"
          />
          <h4 className="text-lg font-medium">Testing Name</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">NRS.200.00</h4>
          <p className="text-sm">Earned</p>
        </div>
      </div>

      {/* This section displays a summary of user metrics in a visually appealing, card-like layout. */}
      <div className="flex justify-center items-start gap-4 p-5 bg-gray-100 rounded-xl mt-8">
        <div className="text-center">
          <i className="text-3xl mb-2 font-extralight ri-time-line"></i>
          <h5 className="text-lg font-medium">10.0</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-extralight ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">5.0</h5>
          <p className="text-sm text-gray-600">Total Distance</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-extralight ri-article-line"></i>
          <h5 className="text-lg font-medium">20</h5>
          <p className="text-sm text-gray-600">Total Rides</p>
        </div>
      </div>
    </div>
  );
}

export default DriverDetails;
