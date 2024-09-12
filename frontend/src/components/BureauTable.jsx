import React, { useState, useRef } from "react";
import api from "../services/bureau";
import images from "../constants/images";
import { useStateContext } from "../context/StateContext";

const BureauTable = ({ bureaux, services }) => {
  const [editBureau, setEditBureau] = useState(null);
  const [newBureau, setNewBureau] = useState({
    bureauName: "",
    servID: "",
  });

  const editSectionRef = useRef(null);

  const handleEdit = (bureau) => {
    setEditBureau(bureau);
    editSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { refetchBureaux, setRefetchBureaux } = useStateContext();

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce bureau ?")) {
      try {
        await api.deleteOne(id);
        alert("Bureau supprimé avec succès");
        setRefetchBureaux(!refetchBureaux);
      } catch (error) {
        alert("Échec de la suppression du bureau");
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.createOne(newBureau);
      setNewBureau({ bureauName: "", servID: "" });
      setRefetchBureaux(!refetchBureaux);
    } catch (error) {
      console.error("Échec de l'ajout du bureau", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateOne(editBureau.bureauID, editBureau);
      alert("Bureau mis à jour avec succès");
      setEditBureau(null); // Close the edit form
      setRefetchBureaux(!refetchBureaux);
    } catch (error) {
      alert("Échec de la mise à jour du bureau");
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  return (
    <div>
      {/* Add Bureau Form */}
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter Bureau
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Ajouter un nouveau bureau</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom du bureau"
              value={newBureau.bureauName}
              onChange={(e) =>
                setNewBureau({ ...newBureau, bureauName: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <select
              value={newBureau.servID}
              onChange={(e) =>
                setNewBureau({ ...newBureau, servID: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir le service</option>
              {services.map((service, index) => (
                <option key={index} value={service.servID}>
                  {service.serviceName}
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
              <th className="w-4/5 p-2 poppins-medium">Nom du bureau</th>
              <th className="w-1/5 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bureaux?.map((bureau, index) => (
              <tr key={index} className="border-b border-lightGray">
                <td className="w-4/5 text-center p-4 poppins-regular">
                  {bureau.bureauName}
                </td>
                <td className="w-1/5 text-center p-2">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[30px] h-[28px] text-center">
                      <button onClick={() => handleDelete(bureau.bureauID)}>
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

export default BureauTable;
