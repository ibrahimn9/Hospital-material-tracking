import React, { useEffect, useState, useRef } from "react";
import {
  UserSideBar,
  NavBar,
  BarChart,
  MaterialStats,
  MaterialItem,
} from "../../components";
import materialService from "../../services/material";

import { useStateContext } from "../../context/StateContext";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const UserMaterial = () => {
  const { selectedItem, setSelectedItem, userData, setUserData } =
    useStateContext();
  const { refetchMaterial, setRefetchMaterial } = useStateContext();

  useEffect(() => {
    setSelectedItem(1);
  }, []);

  // fetch materials

  const [materials, setMaterials] = useState([]);

  const fetchAll = async () => {
    const res = await materialService.getAll();
    setMaterials(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, [refetchMaterial]);



  const { id } = useParams();

  return (
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <UserSideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl poppins-bold text-primary mb-8">
            Mes Matériaux
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ml-2">
            {materials
              ?.filter((material) => material.respID == id)
              .map((material, index) => (
                <MaterialItem key={index} material={material} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMaterial;
