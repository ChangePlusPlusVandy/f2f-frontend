import React from "react";
import { useNavigate } from "react-router-dom";
import SquareLoader from "react-spinners/SquareLoader";
import logo from "../../images/F2F-logo.png";
import "./index.css";

export const Loader = () => {
  const navigate = useNavigate();

  return (
    <div className="loader">
      <div>
        <img className="logo" src={logo} alt="" />
      </div>
      <div>
        <SquareLoader
          color="#0198BA"
          // loading={loading}
          size={50}
          speedMultiplier={1}
        />
      </div>
    </div>
  );
};

export default Loader;
