import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import PFP from "../../images/PFP.png";

const cx = classNames.bind(styles);

function ProfilePicture() {
  return (
    <div className={cx(styles.content)}>
      <img src={PFP} alt="" />
    </div>
  );
}

export default ProfilePicture;
