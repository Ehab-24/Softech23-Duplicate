import React from "react";
import {TfiClose} from "react-icons/tfi"

const Updates = ({click}) => {
  return (
    <div
    className="text-black bg-bgClr text-lg sm:flex hidden h-[60px] items-center justify-center w-full "
    >
      <h2 className="font-semibold text-pink-500 mr-2">Pixel Palace:</h2><h3 className="text-white">Pakistan's 1st gaming B2C Store</h3>
      <TfiClose onClick={click} className="ml-5 text-sm cursor-pointer"/>
    </div>
  );
};

export default Updates;
