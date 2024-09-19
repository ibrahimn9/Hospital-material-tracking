import React from "react";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "./pages";
import AdminHome from "./pages/admin/Home";
import { MaterialManagment, UserManagment, Structure } from "./pages/admin";
import UserHome from "./pages/utilisateur/Home";
import { UserMaterial, UserDemande } from "./pages/utilisateur";
import TechHome from "./pages/technicien/Home";
import { TechMaterial, TechDemande } from "./pages/technicien";
import Cookies from "js-cookie";
import auth from "./services/auth";
import { useStateContext } from "./context/StateContext";

const App = () => {
  const token = Cookies.get("access_token");

  const { userData, setUserData } = useStateContext();

  const verify = async () => {
    const res = await auth.verifyToken({ token });
    setUserData(res.data);
  };

  useEffect(() => {
    if (token && !userData?.id) verify();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/reactapp/dist" element={<Authentication />} />

        <Route path="/reactapp/dist/admin/:id" element={<AdminHome />} />
        <Route
          path="/reactapp/dist/admin/:id/material-management"
          element={<MaterialManagment />}
        />
        <Route
          path="/reactapp/dist/admin/:id/user-management"
          element={<UserManagment />}
        />
        <Route
          path="/reactapp/dist/admin/:id/room-department-management"
          element={<Structure />}
        />

        <Route path="/reactapp/dist/utilisateur/:id" element={<UserHome />} />
        <Route
          path="/reactapp/dist/utilisateur/:id/materials"
          element={<UserMaterial />}
        />
        <Route
          path="/reactapp/dist/utilisateur/:id/demandes"
          element={<UserDemande />}
        />

        <Route path="/reactapp/dist/technicien/:id" element={<TechHome />} />
        <Route
          path="/reactapp/dist/technicien/:id/materials"
          element={<UserMaterial />}
        />
        <Route
          path="/reactapp/dist/technicien/:id/demandes"
          element={<TechDemande />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
