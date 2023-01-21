import React from "react";
import styles from "./index.module.css";
import classNames from "classnames";

const cx = classNames.bind(styles);

function ProfilePicture(props) {
  return (
    <div className={cx(styles.content)}>
      <img src={props.image} alt="" />
    </div>
  );
}

export default ProfilePicture;
