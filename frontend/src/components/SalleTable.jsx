import React, { useState, useRef } from "react";
import api from "../services/salle";
import images from "../constants/images";
import { useStateContext } from "../context/StateContext";

const SalleTable = ({ salles, bureaux }) => {
  const [editSalle, setEditSalle] = useState(null);
  const [newSalle, setNewSalle] = useState({
    salleName: "",
    bureauID: "",
  });

  const editSectionRef = useRef(null);

  const handleEdit = (salle) => {
    setEditSalle(salle);
    editSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { refetchSalles, setRefetchSalles } = useStateContext();

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette salle ?")) {
      try {
        await api.deleteOne(id);
        alert("Salle supprimée avec succès");
        setRefetchSalles(!refetchSalles);
      } catch (error) {
        alert("Échec de la suppression de la salle");
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.createOne(newSalle);
      setNewSalle({ salleName: "", bureauID: "" });
      setRefetchSalles(!refetchSalles);
    } catch (error) {
      console.error("Échec de l'ajout de la salle", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateOne(editSalle.salleID, editSalle);
      alert("Salle mise à jour avec succès");
      setEditSalle(null); // Close the edit form
      // Refresh the data here if needed
    } catch (error) {
      alert("Échec de la mise à jour de la salle");
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  return (
    <div>
      {/* Add Salle Form */}
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter Salle
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Ajouter une nouvelle salle</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom de la salle"
              value={newSalle.salleName}
              onChange={(e) =>
                setNewSalle({ ...newSalle, salleName: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <select
              value={newSalle.bureauID}
              onChange={(e) =>
                setNewSalle({ ...newSalle, bureauID: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir le Bureau</option>
              {bureaux.map((bureau, index) => (
                <option key={index} value={bureau.bureauID}>
                  {bureau.bureauName}
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
              <th className="w-4/5 p-2 poppins-medium">Nom de la salle</th>
              <th className="w-1/5 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {salles?.map((salle, index) => (
              <tr key={index} className="border-b border-lightGray">
                <td className="w-4/5 text-center p-4 poppins-regular">
                  {salle.salleName}
                </td>
                <td className="w-1/5 text-center p-2">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[30px] h-[28px] text-center">
                      <button onClick={() => handleDelete(salle.salleID)}>
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

export default SalleTable;
