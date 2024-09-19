import React from "react";
import { MdAssignmentAdd } from "react-icons/md";
import images from "../constants/images";
import { useNavigate } from "react-router-dom";

import { TiHome } from "react-icons/ti";
import { HiServer } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { BsDoorOpenFill } from "react-icons/bs";
import { PiTreeStructureFill } from "react-icons/pi";
import { BiCurrentLocation } from "react-icons/bi";
import { FaUserShield } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useStateContext } from "../context/StateContext";

import Cookies from "js-cookie";

const UserSideBar = () => {
  const { selectedItem, setSelectedItem, userData } = useStateContext();

  const logOut = () => {
    Cookies.set("access_token", "");
    navigate(`/reactapp/dist/auth`);
  };

  const sideBarItems = [
    {
      name: "Accueil",
      icon: <TiHome />,
      route: `/${userData?.type}/${userData?.id}`,
    },
    {
      name: "Gestion des Matériaux",
      icon: <HiServer />,
      route: `/${userData?.type}/${userData?.id}/materials`,
    },
    {
      name: "Gestion de demandes",
      icon: <MdAssignmentAdd />,
      route: `/${userData?.type}/${userData?.id}/demandes`,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="hidden sm:flex fixed left-0 top-0 h-screen  z-[100] bg-white p-4 sm:w-[200px] md:w-[320px] border-r border-gray4 flex-col items-center shadow-xl">
      <img
        src={images.logo}
        onClick={() => navigate(`/reactapp/dist/${userData?.type}/${userData?.id}`)}
        className="h-[50px] w-auto cursor-pointer"
        alt="logo"
      />
      <div className="mt-[5vh] overflow-y-auto w-full">
        {sideBarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedItem(index);
              navigate(`/reactapp/dist${item.route}`);
            }}
            className={`py-2 sm:px-2 md:px-8 flex items-center rounded-md gap-12 text-md cursor-pointer transition-colors duration-300 font-medium  ${
              selectedItem === index ? "bg-primary text-white" : "text-gray-500"
            } mb-5 hover:bg-primary hover:text-white`}
          >
            <div className="text-[22px]">{item.icon}</div>
            <p className="poppins-medium ">{item.name}</p>
          </div>
        ))}
        <div
          onClick={() => logOut()}
          className="py-2 w-[45px] sm:px-2 md:px-8 mt-10 flex items-center rounded-md gap-3 text-md cursor-pointer transition-colors duration-300 font-medium text-gray-500"
        >
          <div className="text-[22px]">
            <IoLogOut />
          </div>
          <p className="poppins-medium ">Déconnexion</p>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
