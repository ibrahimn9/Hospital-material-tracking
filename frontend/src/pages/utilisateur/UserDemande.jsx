import React, { useEffect, useState, useRef } from "react";
import {
  UserSideBar,
  NavBar,
  BarChart,
  MaterialStats,
  UserDemandeTable,
} from "../../components";

import { useStateContext } from "../../context/StateContext";

import demandeService from "../../services/demande";

const UserDemande = () => {
  const {
    selectedItem,
    setSelectedItem,
    userData,
    setUserData,
    refetchDemandes,
    setRefetchDemandes,
  } = useStateContext();

  useEffect(() => {
    setSelectedItem(2);
  }, []);

  // fetch demandes

  const [demandes, setDemandes] = useState([]);

  const fetchAll = async () => {
    const res = await demandeService.getAll();
    const sortedDemandes = res.data.sort((a, b) => {
      if (a.decision === "attente" && b.decision === "traité") return -1;
      if (a.decision === "traité" && b.decision === "attente") return 1;
      return 0;
    });
    setDemandes(sortedDemandes);
  };

  useEffect(() => {
    fetchAll();
  }, [refetchDemandes]);

  return (
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <UserSideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl poppins-bold text-primary mb-8">
            Gestion de demandes
          </h1>
          <UserDemandeTable
            demandes={demandes?.filter(
              (demande) => demande.idCompte == userData?.id
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDemande;
