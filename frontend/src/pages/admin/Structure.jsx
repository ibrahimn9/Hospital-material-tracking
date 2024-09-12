import React, { useEffect, useState } from "react";
import {
  SideBar,
  NavBar,
  BarChart,
  MaterialStats,
  MaterialTable,
  UserTable,
  StructureTable,
  ServiceTable,
  BureauTable,
  SalleTable,
} from "../../components";
import { BsPcDisplay } from "react-icons/bs";
import { RiPrinterFill } from "react-icons/ri";
import { IoTv } from "react-icons/io5";
import { HiServerStack } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import materialService from "../../services/material";
import userService from "../../services/compte";
import structureService from "../../services/structure";
import serviceService from "../../services/service";
import bureauService from "../../services/bureau";
import salleService from "../../services/salle";

import { useStateContext } from "../../context/StateContext";

const Structure = () => {
  const { selectedItem, setSelectedItem } = useStateContext();
  const { refetchUsers, setRefetchUsers } = useStateContext();
  const { refetchStructures, setRefetchStructures } = useStateContext();
  const { refetchServices, setRefetchServices } = useStateContext();
  const { refetchBureaux, setRefetchBureaux } = useStateContext();
  const { refetchSalles, setRefetchSalles } = useStateContext();

  useEffect(() => {
    setSelectedItem(3);
  }, []);

  const [navState, setNavState] = useState("Structure");

  const nav = ["Structure", "Service", "Bureau", "Salle"];

  // fetch structures

  const [structures, setStructures] = useState([]);

  const fetchAll = async () => {
    const res = await structureService.getAll();
    setStructures(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, [refetchStructures]);

  // fetch services

  const [services, setServices] = useState([]);

  const fetchAllSer = async () => {
    const res = await serviceService.getAll();
    setServices(res.data);
  };

  useEffect(() => {
    fetchAllSer();
  }, [refetchServices]);

  // fetch bureaux

  const [bureaux, setBureaux] = useState([]);

  const fetchAllBur = async () => {
    const res = await bureauService.getAll();
    setBureaux(res.data);
  };

  useEffect(() => {
    fetchAllBur();
  }, [refetchBureaux]);

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
          <div className="flex w-full items-center justify-around border-b-[2px] border-gray-300 mb-4">
            {nav.map((n, index) => (
              <div
                key={index}
                onClick={() => setNavState(n)}
                className={`poppins-medium cursor-pointer ${
                  navState === n
                    ? "border-b-[3px] pb-1 border-primary text-primary"
                    : ""
                }`}
              >
                {n}
              </div>
            ))}
          </div>
          {navState === "Structure" && (
            <StructureTable structures={structures} />
          )}
          {navState === "Service" && (
            <ServiceTable services={services} structures={structures} />
          )}
          {navState === "Bureau" && (
            <BureauTable services={services} bureaux={bureaux} />
          )}
          {navState === "Salle" && (
            <SalleTable salles={salles} bureaux={bureaux} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Structure;
