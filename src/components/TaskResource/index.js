import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";
import A from "../../images/A.png";

const cx = classNames.bind(styles);

function ResourceCard(props) {
  const { resource } = props;
  return (
    <a href={resource}>
      <div className={cx(styles.card_content)}>
        <div className={cx(styles.card_info)}>
          <h3 className={cx(styles.card_title)}>{resource}</h3>
          {/* <p className={cx(styles.card_desc)}>{resource}</p> */}
        </div>
        <div className={cx(styles.card_img)}>
          <img src={A} alt="" />
        </div>
      </div>
    </a>
  );
}

export default ResourceCard;
