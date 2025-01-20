import React from "react";

const locations = [
  "123 Sunshine Avenue, Green Valley, NY 10101",
  "456 Ocean Drive, Sunset Beach, CA 90210",
  "789 Maple Street, Downtown, Chicago, IL 60611",
  "321 Pine Lane, City Center, Seattle, WA 98101",
  "987 Elm Street, Downtown, New York, NY 10001",
];

function LocationSearchPanel(props) {
  return (
    <div>
      {locations.map((location, index) => (
        <div
          key={index} // Unique key for each location
          className="flex items-center justify-start gap-4 my-2 border-2 border-gray-50 active:border-black p-3 rounded-xl"
          onClick={() => {
            props.setVehiclePanel(true);
            props.setPanelOpen(false);
          }}
          style={{ userSelect: "none" }} // Disable text selection
        >
          <h2 className="bg-[#f1f1f1] h-8 w-8 flex items-center justify-center rounded-full">
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className="font-medium">{location}</h4>
        </div>
      ))}
    </div>
  );
}

export default LocationSearchPanel;
