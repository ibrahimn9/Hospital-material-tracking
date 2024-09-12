import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [userData, setUserData] = useState();
  const [refetchMaterial, setRefetchMaterial] = useState(false);
  const [refetchUsers, setRefetchUsers] = useState(false);
  const [refetchStructures, setRefetchStructures] = useState(false);
  const [refetchServices, setRefetchServices] = useState(false);
  const [refetchBureaux, setRefetchBureaux] = useState(false);
  const [refetchSalles, setRefetchSalles] = useState(false);
  const [refetchDemandes, setRefetchDemandes] = useState(false);

  return (
    <Context.Provider
      value={{
        selectedItem,
        setSelectedItem,
        userData,
        setUserData,
        refetchMaterial,
        setRefetchMaterial,
        refetchUsers,
        setRefetchUsers,
        refetchStructures,
        setRefetchStructures,
        refetchServices,
        setRefetchServices,
        refetchBureaux,
        setRefetchBureaux,
        refetchSalles,
        setRefetchSalles,
        refetchDemandes,
        setRefetchDemandes,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
