import React, { useEffect, useState, useRef } from "react";
import { SideBar, NavBar, BarChart, MaterialStats } from "../../components";
import { BsPcDisplay } from "react-icons/bs";
import { RiPrinterFill } from "react-icons/ri";
import { IoTv } from "react-icons/io5";
import { HiServerStack } from "react-icons/hi2";

import { useStateContext } from "../../context/StateContext";

import materialService from "../../services/material";

const Home = () => {
  const { selectedItem, setSelectedItem, userData, setUserData } =
    useStateContext();

  useEffect(() => {
    setSelectedItem(0);
  }, []);

  // fetch materials

  const [materials, setMaterials] = useState([]);

  const fetchAll = async () => {
    const res = await materialService.getAll();
    setMaterials(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  

  return (
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <SideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-primary mb-8">Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white max-h-[130px] p-6 rounded-lg shadow-md flex items-center justify-around">
              <div>
                <h2 className="text-lg poppins-semibold text-darkGray mb-1">
                  Total des Ordinateurs
                </h2>
                <p className="text-3xl text-[#6833ff] font-bold">
                  {materials.filter((mat) => mat.type === "Ordinateur")?.length}
                </p>
              </div>
              <div className="p-2 border-[2px] border-[#6833ff] rounded-md mt-1">
                <BsPcDisplay className="text-[38px] text-[#6833ff]" />
              </div>
            </div>
            <div className="bg-white max-h-[130px] p-6 rounded-lg shadow-md flex items-center justify-around">
              <div>
                <h2 className="text-lg poppins-semibold text-darkGray mb-1">
                  Total des Imprimantes
                </h2>
                <p className="text-3xl text-[#6833ff] font-bold">
                  {materials.filter((mat) => mat.type === "Imprimante")?.length}
                </p>
              </div>
              <div className="p-2 border-[2px] border-[#6833ff] rounded-md mt-1">
                <RiPrinterFill className="text-[38px] text-[#6833ff]" />
              </div>
            </div>
            <div className="bg-white max-h-[130px] p-6 rounded-lg shadow-md flex items-center justify-around">
              <div>
                <h2 className="text-lg poppins-semibold text-darkGray mb-1">
                  TV
                </h2>
                <p className="text-3xl text-[#6833ff] font-bold">
                  {materials.filter((mat) => mat.type === "TV")?.length}
                </p>
              </div>
              <div className="p-2 border-[2px] border-[#6833ff] rounded-md mt-1">
                <IoTv className="text-[38px] text-[#6833ff]" />
              </div>
            </div>
            <div className="bg-white max-h-[130px] p-6 rounded-lg shadow-md flex items-center justify-around">
              <div>
                <h2 className="text-lg poppins-semibold text-darkGray mb-1">
                  Autre
                </h2>
                <p className="text-3xl text-[#6833ff] font-bold">
                  {materials.filter((mat) => mat.type === "Autre")?.length}
                </p>
              </div>
              <div className="p-2 border-[2px] border-[#6833ff] rounded-md mt-1">
                <HiServerStack className="text-[38px] text-[#6833ff]" />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 grid grid-cols-1 sm:grid-cols-4 gap-6 w-full mt-8">
          <BarChart materials={materials} />
          <div className="bg-white p-4 rounded-lg shadow-md h-[300px] sm:h-auto relative">
            <p className="text-primary font-semibold">
              Matériels en état Actif
            </p>
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
              <MaterialStats materials={materials} />
            </div>
            <div className="absolute top-[80%] left-1/2 translate-x-[-50%] flex w-full justify-around ">
              <div>
                <div>
                  <span className="w-[8px] h-[8px] bg-[#30b37e] rounded-full inline-block mr-1" />{" "}
                  <span className="text-gray font-medium">Actif</span>
                </div>
                <p className="text-gray font-medium text-center">
                  {(
                    (materials.filter((mat) => mat.State.stateName === "actif")
                      .length *
                      100) /
                    materials.length
                  ).toFixed(2)}{" "}
                  %
                </p>
              </div>
              <div>
                <div>
                  <span className="w-[8px] h-[8px] bg-[#d9f5ea] rounded-full inline-block mr-1" />{" "}
                  <span className="text-gray font-medium">E / M</span>
                </div>
                <p className="text-gray font-medium text-center">
                  {(100 -
                    (
                      (materials.filter(
                        (mat) => mat.State.stateName === "actif"
                      ).length *
                        100) /
                      materials.length
                    )).toFixed(2)}{" "}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
