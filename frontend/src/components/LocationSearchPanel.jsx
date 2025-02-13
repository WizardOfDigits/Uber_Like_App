import React from "react";
function LocationSearchPanel(props) {
  const locations = [
    "45B, Near Piazza della Repubblica, Rome, Italy",
    "88C, Near Shibuya Crossing, Tokyo, Japan",
    "12A, Near Hyde Park, London, UK",
    "67D, Near Bondi Beach, Sydney, Australia",
    "34B, Near Central Park, New York City, USA",
    "19C, Near La Rambla, Barcelona, Spain",
    "25A, Near The Eiffel Tower, Paris, France",
    "43D, Near Marina Bay Sands, Singapore",
    "30B, Near Table Mountain, Cape Town, South Africa",
    "15C, Near Red Square, Moscow, Russia",
  ];
  return (
    <div>
      {/* this is just a sample data  */}
      {locations.map(function (elem, idx) {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{elem}</h4>
          </div>
        );
      })}
    </div>
  );
}
export default LocationSearchPanel;
