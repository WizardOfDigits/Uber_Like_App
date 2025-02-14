import React from "react";

function LocationSearchPanel({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) {
  // Handle all data types safely
  const getSuggestions = () => {
    if (!suggestions) return [];
    if (Array.isArray(suggestions)) return suggestions;
    if (typeof suggestions === "object") return Object.values(suggestions);
    return [suggestions];
  };

  const safeSuggestions = getSuggestions();

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup" && setPickup) {
      setPickup(suggestion);
    } else if (activeField === "destination" && setDestination) {
      setDestination(suggestion);
    }
  };

  return (
    <div>
      {safeSuggestions.length > 0 ? (
        safeSuggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 hover:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">
              {elem?.address || elem?.toString() || "Unnamed Location"}
            </h4>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No suggestions available</p>
      )}
    </div>
  );
}

export default LocationSearchPanel;
