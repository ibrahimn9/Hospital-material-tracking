import React, { useState, useRef } from "react";
import api from "../services/structure";
import { useStateContext } from "../context/StateContext";
import images from "../constants/images";

const StructureTable = ({ structures }) => {
  const [editStructure, setEditStructure] = useState(null);
  const [newStructure, setNewStructure] = useState({
    structureName: "",
  });

  const editSectionRef = useRef(null);

  const handleEdit = (structure) => {
    setEditStructure(structure);
    editSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { refetchStructures, setRefetchStructures } = useStateContext();

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette structure ?")
    ) {
      try {
        await api.deleteOne(id);
        alert("Structure supprimée avec succès");
        setRefetchStructures(!refetchStructures);
      } catch (error) {
        alert("Échec de la suppression de la structure");
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.createOne(newStructure);
      setNewStructure({ structureName: "" });
      setRefetchStructures(!refetchStructures);
    } catch (error) {
      console.error("Échec de l'ajout de la structure", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateOne(editStructure.structureID, editStructure);
      alert("Structure mise à jour avec succès");
      setEditStructure(null); // Close the edit form
      setRefetchStructures(!refetchStructures);
    } catch (error) {
      alert("Échec de la mise à jour de la structure");
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  return (
    <div>
      {/* Add Structure Form */}
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter Structure
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Ajouter une nouvelle structure
          </h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom de la structure"
              value={newStructure.structureName}
              onChange={(e) =>
                setNewStructure({ structureName: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
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
              <th className="w-4/5 p-2 poppins-medium">Nom de la structure</th>
              <th className="w-1/5 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {structures?.map((structure, index) => (
              <tr key={index} className="border-b border-lightGray">
                <td className="w-4/5 text-center p-4 poppins-regular">
                  {structure.structureName}
                </td>
                <td className="w-1/5 text-center p-2">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[30px] h-[28px] text-center">
                      <button
                        onClick={() => handleDelete(structure.structureID)}
                      >
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

export default StructureTable;
