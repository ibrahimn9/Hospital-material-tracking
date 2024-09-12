import React from "react";
import images from "../constants/images";

const MaterialItem = ({ material }) => {
  const selectedPic = (type) => {
    if (type === "Ordinateur") return "laptop";
    else if (type === "Imprimante") return "printer";
    else if (type === "TV") return "tv";
    else return "server";
  };

  const selectedColor = (state) => {
    if (state === "actif") return "#2E86FB";
    else if (state === "endommagé") return "#FF6F6F";
    else return "#FFD700";
  };
  return (
    <div className="bg-white shadow-md rounded-md flex flex-col items-center overflow-hidden">
      <img
        src={images[selectedPic(material.type)]}
        className="w-[180px] h-[180px]"
      />
      <div className="w-full bg-gray-200 flex justify-between items-center p-2">
        <p className="poppins-medium">{material.materialName}</p>
        <div
          className="px-2 py-1 rounded-md poppins-regular text-sm text-white"
          style={{ backgroundColor: selectedColor(material.State.stateName) }}
        >
          {material.State.stateName}
        </div>
      </div>
    </div>
  );
};

export default MaterialItem;
