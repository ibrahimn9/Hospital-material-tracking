import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import images from "../constants/images";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context/StateContext";
import { HiMenuAlt2 } from "react-icons/hi";

const NavBar = () => {
  const navigate = useNavigate();
  const { userData } = useStateContext();

  return (
    <nav className="sticky bg-white border-b border-gray4 bg-opacity-98 top-[0] z-10">
      <div className="px-2 md:px-6">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <p className="text-darkGray poppins-medium text-sm">Bienvenue,</p>
          </div>
          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* User profile */}
            <IoMdNotificationsOutline className="text-[25px] text-[#404040] cursor-pointer" />
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
                id="user-menu"
                aria-label="User menu"
                aria-haspopup="true"
              >
                <div className="h-10 w-10 rounded-full bg-lightGray flex justify-center items-center">
                  {userData?.id}
                </div>
                <div className="px-4 py-2 text-sm text-gray-700 text-left">
                  <p className="font-semibold">
                    {userData?.username.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {userData?.type}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
