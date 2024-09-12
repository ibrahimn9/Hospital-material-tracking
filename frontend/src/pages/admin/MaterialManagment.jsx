import React, { useEffect, useState } from "react";
import {
  SideBar,
  NavBar,
  BarChart,
  MaterialStats,
  MaterialTable,
} from "../../components";
import { BsPcDisplay } from "react-icons/bs";
import { RiPrinterFill } from "react-icons/ri";
import { IoTv } from "react-icons/io5";
import { HiServerStack } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import materialService from "../../services/material";
import salleService from "../../services/salle";

import { useStateContext } from "../../context/StateContext";

const MaterialManagment = () => {
  const { selectedItem, setSelectedItem } = useStateContext();
  const { refetchMaterial, setRefetchMaterial } = useStateContext();
  const { refetchSalles, setRefetchSalles } = useStateContext();

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

  // fetch salles

  const [salles, setSalles] = useState([]);

  const fetchAllSall = async () => {
    const res = await salleService.getAll();
    setSalles(res.data);
  };

  useEffect(() => {
    fetchAllSall();
  }, [refetchSalles]);

  return (
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <SideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl poppins-bold text-primary mb-8">
            Gestion des Matériaux
          </h1>
          <MaterialTable materials={materials} salles={salles} />
        </div>
      </div>
    </div>
  );
};

export default MaterialManagment;
