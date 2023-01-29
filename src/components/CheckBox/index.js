import { useWindowSize } from "../../lib/hooks";
import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { WINDOW_TYPE } from "../../lib/constants";
const cx = classNames.bind(styles);

// The caption of each home page
export const CheckBox = (props) => {
  const { value, onChange } = props;

  const { type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;

  return (
    <input
      className={cx(styles.checkBox)}
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
  );
};
