import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import { useAuth } from "../../lib/AuthContext";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";

export const Community = () => {
  return (
    <div>
      <h1>Community page!</h1>
      <NavBar />
    </div>
  );
};
