import React, { useState, useRef } from "react";
import images from "../constants/images";
import { useStateContext } from "../context/StateContext";
import api from "../services/compte";

const UserTable = ({ users }) => {
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    username: "",
    password: "",
    typeName: "utilisateur", // Default type
  });

  const types = ["admin", "technicien", "utilisateur"];

  const editSectionRef = useRef(null);
  const { refetchUsers, setRefetchUsers } = useStateContext();

  const handleEdit = (user) => {
    setEditUser(user);
    editSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      try {
        await api.deleteOne(id);
        alert("Utilisateur supprimé avec succès");
        setRefetchUsers(!refetchUsers);
      } catch (error) {
        alert("Échec de la suppression de l'utilisateur");
      }
    }
  };

  const handleAdd = async () => {
    try {
      await api.createOne(newUser);
      setRefetchUsers(!refetchUsers);
      setNewUser({
        nom: "",
        prenom: "",
        date_naissance: "",
        username: "",
        password: "",
        typeName: "utilisateur",
      });
    } catch (error) {
      console.error("Échec de l'ajout de l'utilisateur", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.updateOne(editUser.userId, editUser);
      alert("Utilisateur mis à jour avec succès");
      setEditUser(null); // Close the edit form
      setRefetchUsers(!refetchUsers); // Trigger a data refresh
    } catch (error) {
      alert("Échec de la mise à jour de l'utilisateur");
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  return (
    <div>
      {/* Add User Form */}
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter Utilisateur
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Ajouter un nouvel utilisateur
          </h3>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nom"
              value={newUser.nom}
              onChange={(e) => setNewUser({ ...newUser, nom: e.target.value })}
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              placeholder="Prénom"
              value={newUser.prenom}
              onChange={(e) =>
                setNewUser({ ...newUser, prenom: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="date"
              value={newUser.date_naissance}
              onChange={(e) =>
                setNewUser({ ...newUser, date_naissance: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            />
            <select
              value={newUser.typeName}
              onChange={(e) =>
                setNewUser({ ...newUser, typeName: e.target.value })
              }
              className="border p-2 rounded-md w-full mb-2"
            >
              {types.map((type, index) => (
                <option key={index} value={type}>
                  {type}
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
              <th className="w-1/5 p-2 poppins-medium">Username</th>
              <th className="w-1/5 p-2 poppins-medium">Nom</th>
              <th className="w-1/5 p-2 poppins-medium">Prenom</th>
              <th className="w-1/5 p-2 poppins-medium">Date naissance</th>
              <th className="w-1/5 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className="border-b border-lightGray">
                <td className="w-1/5 text-center p-4 poppins-regular">
                  {user.username}
                </td>
                <td className="w-1/5 text-center p-4 poppins-regular">
                  {user.Personne.nom}
                </td>
                <td className="w-1/5 text-center p-4 poppins-regular">
                  {user.Personne.prenom}
                </td>
                <td className="w-1/5 text-center p-4 poppins-regular">
                  {user.Personne.date_naissance}
                </td>
                <td className="w-1/5 text-center p-2">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[30px] h-[28px] text-center">
                      <button onClick={() => handleDelete(user.userId)}>
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

export default UserTable;
