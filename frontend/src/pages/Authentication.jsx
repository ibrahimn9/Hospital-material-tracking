import React, { useState } from "react";
import images from "../constants/images";
import { useNavigate } from "react-router-dom";
import auth from "../services/auth";
import Cookies from "js-cookie";
import { useStateContext } from "../context/StateContext";

const Authentication = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState();

  const { userData, setUserData } = useStateContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg();
    try {
      const response = await auth.login({ username, password });
      Cookies.set("access_token", response.data.token, { expires: 7 });
      setUserData(response.data.data.user);
      navigate(
        `/${response.data.data.user.type}/${response.data.data.user.id}`
      );
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      }
    }
  };

  return (
    <div className="h-screen w-full auth-bg flex justify-center items-center">
      <div className="h-auto w-[95%] md:w-[70%] lg:w-[42%] flex flex-col items-center mt-[-100px]">
        <img src={images.logo} alt="logo" width={"180px"} />
        {errorMsg && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mt-10 w-[80%]"
            role="alert"
          >
            <span className="block sm:inline text-sm">{errorMsg}</span>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className={`${errorMsg ? "mt-2" : "mt-14"} w-[80%]`}
        >
          <div>
            <p className="poppins-regular text-darkGray">nom d'utilisateur</p>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre identifiant"
              className="px-4 py-3 mt-1 rounded-md shadow-sm border border-darkGray focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <div className="mt-8">
            <p className="poppins-regular text-darkGray">mot de passe</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              className="px-4 py-3 mt-1 rounded-md shadow-sm border border-darkGray focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>
          <button
            type="submit"
            className="py-3 w-full rounded-md bg-primary text-white font-semibold mt-10 hover:opacity-[0.8] transition-[0.3s]"
          >
            se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
