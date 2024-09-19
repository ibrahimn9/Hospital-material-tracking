import React, { useEffect, useState } from "react";
import { UserSideBar, NavBar } from "../../components";
import { useStateContext } from "../../context/StateContext";
import demandeService from "../../services/demande";
import rapportService from "../../services/rapport";
import jsPDF from "jspdf";
import images from "../../constants/images";

const TechDemande = () => {
  const { setSelectedItem, refetchDemandes, setRefetchDemandes, userData } =
    useStateContext();

  useEffect(() => {
    setSelectedItem(2);
  }, []);

  const [demandes, setDemandes] = useState([]);
  const [selectedDecision, setSelectedDecision] = useState({});
  const [rapportContext, setRapportContext] = useState({});

  const fetchAll = async () => {
    const res = await demandeService.getAll();
    const sortedDemandes = res.data.sort((a, b) => {
      if (
        (a.decision === "attente" || a.decision === null) &&
        b.decision === "traité"
      )
        return -1;
      if (
        a.decision === "traité" &&
        (b.decision === "attente" || b.decision === null)
      )
        return 1;
      return 0;
    });
    setDemandes(sortedDemandes);
  };

  useEffect(() => {
    fetchAll();
  }, [refetchDemandes]);

  const [rapports, setRapports] = useState([]);

  const fetchRapp = async () => {
    const res = await rapportService.getAll();
    setRapports(res.data);
  };

  useEffect(() => {
    fetchRapp();
  }, []);

  const handleRapportSubmit = async (demande) => {
    try {
      await rapportService.createOne({
        idDemande: demande.id,
        idCompte: userData.id,
        context: rapportContext[demande.id],
      });

      await demandeService.updateOne(demande.id, {
        ...demande,
        decision: selectedDecision[demande.id],
      });

      setRefetchDemandes(!refetchDemandes);
      alert("Rapport created successfully");
    } catch (error) {
      console.error("Error creating rapport", error);
    }
  };

  const handleRapportContextChange = (id, context) => {
    setRapportContext((prevState) => ({
      ...prevState,
      [id]: context,
    }));
  };

  const handleDecisionChange = (id, decision) => {
    setSelectedDecision((prevState) => ({
      ...prevState,
      [id]: decision,
    }));
  };

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
    <div className="relative pb-10 bg-[#f5f5f5] w-full overflow-hidden min-h-screen">
      <UserSideBar />
      <div className="relative sm:ml-[200px] md:ml-[320px]">
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl poppins-bold text-primary mb-8">
            Gestion de demandes
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demandes.map((demande, index) => (
              <div
                key={index}
                className={`bg-white shadow-lg rounded-lg p-6 relative flex flex-col justify-between ${
                  demande.decision === "traité" ? "bg-[#ddf8dacc]" : "bg-white"
                }`}
                style={{
                  backgroundColor: demande.decision === "traité" && "#ddf8dacc",
                }}
              >
                <div>
                  <h2 className="text-lg font-bold text-primary mb-2">
                    Demande ID: {demande.id}
                  </h2>
                  <p className="text-md font-medium text-gray-700 mb-2">
                    Type: {demande.type}
                  </p>
                  <p className="text-md text-gray-600 mb-4">
                    Description: {demande.desc}
                  </p>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      État de la demande:
                    </label>
                    {demande.decision === "traité" ? (
                      <p className="poppins-medium">
                        traité Par{" "}
                        {`${
                          rapports.find(
                            (rapp) => rapp?.idDemande === demande?.id
                          )?.Compte?.Personne?.nom
                        } ${
                          rapports.find(
                            (rapp) => rapp.idDemande === demande?.id
                          )?.Compte?.Personne?.prenom
                        }`}
                      </p>
                    ) : (
                      <select
                        value={selectedDecision[demande.id] || "attente"}
                        onChange={(e) =>
                          handleDecisionChange(demande.id, e.target.value)
                        }
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="attente">En attente</option>
                        <option value="traité">Traité</option>
                      </select>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      Contexte du rapport:
                    </label>
                    {demande.decision === "traité" ? (
                      <div className="poppins-regular">
                        {rapports
                          .find((rapp) => rapp.idDemande === demande.id)
                          ?.context.slice(0, 30)}
                      </div>
                    ) : (
                      <textarea
                        value={
                          rapportContext[demande.id] ||
                          rapports.find((rapp) => rapp.idDemande === demande.id)
                            ?.context ||
                          ""
                        }
                        onChange={(e) =>
                          handleRapportContextChange(demande.id, e.target.value)
                        }
                        placeholder="Entrer le contexte du rapport"
                        className="border p-2 rounded-md w-full h-24"
                      />
                    )}
                  </div>
                </div>
                <div>
                  {demande.decision === "traité" ? (
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
                      className="bg-lightGray text-white p-2 rounded-md w-full"
                    >
                      Imprimer le rapport
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRapportSubmit(demande)}
                      className="bg-blue-500 text-white p-2 rounded-md w-full"
                    >
                      Soumettre le rapport
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechDemande;
