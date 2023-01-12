import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";

const Modules = () => {
  return (
    <div>
      <p>This is the Module page.</p>
      <div className={styles.tab_div}>
        <Link to="/">
          <button className={styles.button}>Home</button>
        </Link>
        <button className={styles.button}>Modules</button>
        <Link to="/profile">
          <button className={styles.button}>Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default Modules;
