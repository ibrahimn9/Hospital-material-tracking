import React, { useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import api from "../services/demande";
import rapportService from "../services/rapport";
import images from "../constants/images";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";

const UserDemandeTable = ({ demandes }) => {
  const { userData } = useStateContext();
  const [newDemande, setNewDemande] = useState({
    type: "",
    desc: "",
    idCompte: "",
  });

  const { id } = useParams();

  const types = ["Ordinateur", "Imprimante", "Autre"];

  const { refetchDemandes, setRefetchDemandes } = useStateContext();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this demande?")) {
      try {
        await api.deleteOne(id);
        alert("Demande deleted successfully");
        setRefetchDemandes(!refetchDemandes);
      } catch (error) {
        alert("Failed to delete demande");
      }
    }
  };

  useEffect(() => {
    setNewDemande({ ...newDemande, idCompte: userData?.id });
  }, [userData?.id]);

  const [rapports, setRapports] = useState([]);

  const fetchRapp = async () => {
    const res = await rapportService.getAll();
    setRapports(res.data);
  };

  useEffect(() => {
    fetchRapp();
  }, []);

  const handleAdd = async () => {
    try {
      await api.createOne(newDemande);
      setRefetchDemandes(!refetchDemandes);
      setNewDemande({
        type: "",
        desc: "",
        idCompte: "",
      });
    } catch (error) {
      console.error("Failed to add material", error);
    }
  };

  const [ajouteOpen, setAjouteOpen] = useState(false);

  const handleGeneratePDF = (technicien, context, date) => {
    const doc = new jsPDF();

    // Set font size for header and title
    doc.setFontSize(10);

    // Add logo at the top center
    const imgWidth = 20; // Logo width in mm
    const imgHeight = 18; // Logo height in mm
    const pageWidth = doc.internal.pageSize.getWidth(); // Get page width for center alignment
    const imgX = (pageWidth - imgWidth) / 2; // Center the image

    // Add header text
    doc.text(
      "ETABLISSEMENT PUBLIC DE SANTE DE PROXIMITE DE MAGHNIA\nSOUS-DIRECTION DU SYSTEME D'INFORMATION HOSPITALIER",
      10,
      10
    );

    doc.addImage(images.epsp, "PNG", imgX, 20, imgWidth, imgHeight);

    // Add the title in the center
    doc.setFontSize(18);

    doc.text("Rapport du technicien de maintenance", pageWidth / 2, 60, {
      align: "center",
    });

    // Add technician and context details
    doc.setFontSize(12);
    doc.text(`Technicien ayant traité: ${technicien}`, 10, 80);
    doc.text(`Contexte du rapport:`, 10, 90);
    doc.setFontSize(10);
    doc.text(context, 10, 100, { maxWidth: 180 }); // Wrap text within a max width

    const pageHeight = doc.internal.pageSize.getHeight(); // Get page height for bottom positioning
    doc.setFontSize(10);
    doc.text(`Date: ${date}`, pageWidth - 40, pageHeight - 10);

    // Save the PDF
    doc.save("rapport.pdf");
  };



  return (
    <div>
      {!ajouteOpen && (
        <button
          onClick={() => setAjouteOpen(true)}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Ajouter une Demande
        </button>
      )}
      {ajouteOpen && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Ajouter une Demande</h3>
          <div className="mt-2">
            <select
              value={newDemande.type}
              onChange={(e) =>
                setNewDemande({ ...newDemande, type: e.target.value })
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
            <input
              type="text"
              placeholder="Description"
              value={newDemande.desc}
              onChange={(e) =>
                setNewDemande({ ...newDemande, desc: e.target.value })
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
              <th className="w-1/6 p-2 poppins-medium">Demande</th>
              <th className="w-1/6 p-2 poppins-medium">Type</th>
              <th className="w-1/6 p-2 poppins-medium">Date</th>
              <th className="w-1/6 p-2 poppins-medium">Etat</th>
              <th className="w-1/6 p-2 poppins-medium">Rapport</th>
              <th className="w-1/6 p-2 poppins-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes?.map((demande, index) => (
              <tr
                key={index}
                className={`border-b border-lightGray ${
                  demande.decision === "traité" ? "bg-green-100" : "bg-white"
                }`}
              >
                <td className="w-1/6 text-center p-4 poppins-regular ">
                  {demande?.id}
                </td>
                <td className="w-1/6 text-center p-4 poppins-regular">
                  {demande.type}
                </td>
                <td className="w-1/6 text-center p-4 poppins-regular">
                  {new Date(demande.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="w-1/6 text-center p-4 poppins-regular">
                  {demande.decision || "En Attente"}
                </td>
                <td className="w-1/6 text-center p-4">
                  {rapports.find((rapp) => rapp.idDemande === demande.id) ? (
                    <button
                      onClick={() =>
                        handleGeneratePDF(
                          `${
                            rapports.find(
                              (rapp) => rapp.idDemande === demande?.id
                            ).Compte.Personne.nom
                          } ${
                            rapports.find(
                              (rapp) => rapp.idDemande === demande?.id
                            ).Compte.Personne.prenom
                          }`,
                          rapports.find(
                            (rapp) => rapp.idDemande === demande?.id
                          ).context,
                          new Date(
                            rapports.find(
                              (rapp) => rapp.idDemande === demande.id
                            ).date
                          ).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        )
                      }
                      className="px-2 py-1 bg-blue-500 text-white rounded-md"
                    >
                      Imprimer le rapport
                    </button>
                  ) : (
                    "Pas disponible"
                  )}
                </td>
                <td className="w-1/6 text-center p-2">
                  <div className="w-full flex justify-center">
                    <div className="border border-darkGray rounded-lg flex gap-2 items-center justify-center w-[30px] h-[28px] text-center">
                      <button onClick={() => handleDelete(demande.id)}>
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

export default UserDemandeTable;
