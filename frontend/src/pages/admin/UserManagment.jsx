import React, { useEffect, useState } from "react";
import {
  SideBar,
  NavBar,
  BarChart,
  MaterialStats,
  MaterialTable,
  UserTable,
} from "../../components";
import { BsPcDisplay } from "react-icons/bs";
import { RiPrinterFill } from "react-icons/ri";
import { IoTv } from "react-icons/io5";
import { HiServerStack } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import materialService from "../../services/material";
import userService from "../../services/compte";

import { useStateContext } from "../../context/StateContext";

const UserManagment = () => {
  const { selectedItem, setSelectedItem } = useStateContext();
  const { refetchUsers, setRefetchUsers } = useStateContext();

  useEffect(() => {
    setSelectedItem(2);
  }, []);

  // fetch materials

  const [users, setUsers] = useState([]);

  const fetchAll = async () => {
    const res = await userService.getAll();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, [refetchUsers]);

  return (
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <SideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl poppins-bold text-primary mb-8">
            Gestion des Utilisateurs
          </h1>
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default UserManagment;
