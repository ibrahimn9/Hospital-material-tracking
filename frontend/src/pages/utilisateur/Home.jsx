import React, { useEffect, useState, useRef } from "react";
import { UserSideBar, NavBar, BarChart, MaterialStats } from "../../components";

import { useStateContext } from "../../context/StateContext";

import Cookies from "js-cookie";

import auth from "../../services/auth";

const Home = () => {
  const { selectedItem, setSelectedItem, userData, setUserData } =
    useStateContext();

  useEffect(() => {
    setSelectedItem(0);
  }, []);

  const token = Cookies.get("access_token");

  return (
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <UserSideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4"></div>
      </div>
    </div>
  );
};

export default Home;
