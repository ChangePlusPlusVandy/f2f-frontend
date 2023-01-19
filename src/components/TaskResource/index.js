import classNames from "classnames";
import React from "react";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

function ResourceCard(props) {
  return (
    <div className={cx(styles.card_content)}>
      <div className={cx(styles.card_info)}>
        <h3 className={cx(styles.card_title)}>{props.resource.title}</h3>
        <p className={cx(styles.card_desc)}>{props.resource.desc}</p>
      </div>
      <div className={cx(styles.card_img)}>
        <img src={props.resource.img} alt="" />
      </div>
    </div>
  );
}

export default ResourceCard;
