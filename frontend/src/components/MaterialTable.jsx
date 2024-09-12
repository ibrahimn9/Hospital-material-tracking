import React, { useState, useRef, useEffect } from "react";
import images from "../constants/images";
import { IoSearchOutline } from "react-icons/io5";
import { RxReset } from "react-icons/rx";
import Cookies from "js-cookie";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
import { useStateContext } from "../context/StateContext";
import api from "../services/material";

import userService from "../services/compte";

const MaterialTable = ({ materials, salles }) => {
  const [editMaterial, setEditMaterial] = useState(null);
  const [newMaterial, setNewMaterial] = useState({
    type: "",
    materialName: "",
    model: "",
    desc: "",
    stateID: 1,
    respID: 2,
    salleID: 1,
  });
  const states = [
    { id: 1, name: "actif" },
    { id: 2, name: "endommagé" },
    { id: 3, name: "maintenance" },
  ];
  const types = ["Ordinateur", "Imprimante", "Autre"];

  const editSectionRef = useRef(null);

  const { refetchMaterial, setRefetchMaterial } = useStateContext();

  const selectedPic = (type) => {
    if (type === "Ordinateur") return "laptop";
    else if (type === "Imprimante") return "printer";
    else if (type === "TV") return "tv";
    else return "server";
  };

  const selectedColor = (state) => {
    if (state === "actif") return "#2E86FB";
    else if (state === "endommagé") return "#FF6F6F";
    else return "#FFD700";
  };

  const handleEdit = (material) => {
    setEditMaterial(material);
    editSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        await api.deleteOne(id);
        alert("Material deleted successfully");
        setRefetchMaterial(!refetchMaterial);
      } catch (error) {
        alert("Failed to delete material");
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.createOne(newMaterial);
      setRefetchMaterial(!refetchMaterial);
      setNewMaterial({
        type: "",
        materialName: "",
        model: "",
        desc: "",
        stateID: 1,
        respID: 2,
        salleID: 1,
      });
    } catch (error) {
      console.error("Failed to add material", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateOne(editMaterial.materialID, editMaterial);
      alert("Material updated successfully");
      setEditMaterial(null); // Close the edit form
      setRefetchMaterial(!refetchMaterial); // Trigger a data refresh
    } catch (error) {
      alert("Failed to update material");
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  const [users, setUsers] = useState([]);

  const fetchAll = async () => {
    const res = await userService.getAll();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div>
      {/* Add Material Form */}
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter Matériel
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Ajouter un nouveau matériel</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom du matériel"
              value={newMaterial.materialName}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, materialName: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              placeholder="Modèle"
              value={newMaterial.model}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, model: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />

            <select
              value={newMaterial.type}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, type: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir le type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={newMaterial.respID}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, respID: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir le responsable</option>
              {users.map((user, index) => (
                <option key={index} value={user.userId}>
                  {user.username}
                </option>
              ))}
            </select>
            <select
              value={newMaterial.salleID}
              onChange={(e) =>
                setNewMaterial({ ...newMaterial, salleID: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir la salle</option>
              {salles.map((salle, index) => (
                <option key={index} value={salle.salleID}>
                  {salle.salleName}
                </option>
              ))}
            </select>
            <select
              value={newMaterial.stateID}
              onChange={(e) =>
                setNewMaterial({
                  ...newMaterial,
                  stateID: parseInt(e.target.value),
                })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
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
      {editMaterial && (
        <div ref={editSectionRef} className="mt-4">
          <h3 className="text-lg font-semibold">Modifier le matériel</h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom du matériel"
              value={editMaterial.materialName}
              onChange={(e) =>
                setEditMaterial({
                  ...editMaterial,
                  materialName: e.target.value,
                })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              placeholder="Modèle"
              value={editMaterial.model}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, model: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <select
              value={editMaterial.respID}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, respID: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir le responsable</option>
              {users.map((user, index) => (
                <option key={index} value={user.userId}>
                  {user.username}
                </option>
              ))}
            </select>
            <select
              value={editMaterial.type}
              onChange={(e) =>
                setEditMaterial({ ...editMaterial, type: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              <option value="">Choisir le type</option>
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              value={editMaterial.stateID}
              onChange={(e) =>
                setEditMaterial({
                  ...editMaterial,
                  stateID: parseInt(e.target.value),
                })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Modifier
            </button>
            <button
              onClick={() => setEditMaterial(null)}
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
              <th className="w-1/5 p-2 poppins-medium">Matériel</th>
              <th className="w-1/5 p-2 poppins-medium">Modèle</th>
              <th className="w-1/5 p-2 poppins-medium">Type</th>
              <th className="w-1/5 p-2 poppins-medium">État</th>
              <th className="w-1/5 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials?.map((mat, index) => (
              <tr key={index} className="border-b border-lightGray">
                <td className="flex justify-start items-center gap-3 p-4">
                  <img
                    src={images[selectedPic(mat.type)]}
                    className="w-[55px] h-[55px]"
                    alt="material"
                  />
                  <p className="poppins-regular">{mat.materialName}</p>
                </td>
                <td className="w-1/5 text-center p-4 poppins-regular">
                  {mat.model}
                </td>
                <td className="w-1/5 text-center p-4 poppins-regular">
                  {mat.type}
                </td>
                <td className="w-1/5 text-center p-4">
                  <p className="poppins-regular flex items-center gap-2 justify-center">
                    <span
                      className="w-2 h-2 rounded-full mt-[1px]"
                      style={{
                        backgroundColor: selectedColor(mat.State.stateName),
                      }}
                    />
                    {mat.State.stateName}
                  </p>
                </td>
                <td className="w-1/5 text-center p-4">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[70px] h-[28px] text-center">
                      <button onClick={() => handleEdit(mat)}>
                        <img
                          src={images.edit}
                          className="w-[16px] aspect-square"
                          alt="edit-btn"
                        />
                      </button>
                      <div className="bg-[#D5D5D5] h-[28px] w-[1px]" />
                      <button onClick={() => handleDelete(mat.materialID)}>
                        <img
                          src={images.deletebtn}
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

export default MaterialTable;
