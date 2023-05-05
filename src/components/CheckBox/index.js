import { useWindowSize } from "../../lib/hooks";
import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { WINDOW_TYPE } from "../../lib/constants";
const cx = classNames.bind(styles);

// The caption of each home page
export const CheckBox = (props) => {
  const { value, onChange, isMobile } = props;

  return (
    <input
      className={cx(styles.checkBox, {
        [styles.mobile]: isMobile,
      })}
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
  );
};
