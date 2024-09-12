import React, { useState, useRef } from "react";
import api from "../services/service";
import images from "../constants/images";
import { useStateContext } from "../context/StateContext";

const ServiceTable = ({ services, structures }) => {
  const [editService, setEditService] = useState(null);
  const [newService, setNewService] = useState({
    serviceName: "",
    structureID: "",
  });

  const editSectionRef = useRef(null);

  const { refetchServices, setRefetchServices } = useStateContext();

  const handleEdit = (service) => {
    setEditService(service);
    editSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
      try {
        await api.deleteOne(id);
        alert("Service supprimé avec succès");
        setRefetchServices(!refetchServices);
      } catch (error) {
        alert("Échec de la suppression du service");
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.createOne(newService);
      setNewService({ serviceName: "", structureID: "" });
      setRefetchServices(!refetchServices);
    } catch (error) {
      console.error("Échec de l'ajout du service", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateOne(editService.servID, editService);
      alert("Service mis à jour avec succès");
      setEditService(null); // Close the edit form
      setRefetchServices(!refetchServices);
    } catch (error) {
      alert("Échec de la mise à jour du service");
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  return (
    <div>
      {/* Add Service Form */}
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter Service
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Ajouter un nouveau service</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom du service"
              value={newService.serviceName}
              onChange={(e) =>
                setNewService({ ...newService, serviceName: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <select
              value={newService.structureID}
              onChange={(e) =>
                setNewService({ ...newService, structureID: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir la structure</option>
              {structures.map((structure, index) => (
                <option key={index} value={structure.structureID}>
                  {structure.structureName}
                </option>
              ))}
            </select>
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Ajouter
            </button>
            <button
              onClick={() => setAjouteOpen(false)}
              className="bg-gray-500 text-white p-2 rounded-md ml-2"
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto shadow-md mt-4">
        <table className="w-full min-w-[700px] table-fixed border-collapse shadow-lg rounded-md overflow-hidden bg-[#fff]">
          <thead>
            <tr className="border-b border-lightGray">
              <th className="w-4/5 p-2 poppins-medium">Nom du service</th>
              <th className="w-1/5 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service, index) => (
              <tr key={index} className="border-b border-lightGray">
                <td className="w-4/5 text-center p-4 poppins-regular">
                  {service.serviceName}
                </td>
                <td className="w-1/5 text-center p-2">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[30px] h-[28px] text-center">
                      <button onClick={() => handleDelete(service.servID)}>
                        <img
                          src={images.deletebtn} // Replace with your delete icon path
                          className="w-[16px] aspect-square"
                          alt="delete-btn"
                        />
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
