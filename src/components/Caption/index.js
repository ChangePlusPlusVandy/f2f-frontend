import { useWindowSize } from "../../lib/hooks";
import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { WINDOW_TYPE } from "../../lib/constants";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

// The caption of each home page
export const Caption = (props) => {
  const { mainTitle, subTitle, className, style } = props;

  const { type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;

  return (
    <div
      className={cx(styles.caption, className, {
        [styles.mobile]: isMobile,
      })}
      style={style}
    >
      <div
        className={cx(styles.mainTitle, {
          [styles.mobile]: isMobile,
        })}
      >
        {mainTitle}
      </div>
      <div
        className={cx(styles.subTitle, {
          [styles.mobile]: isMobile,
        })}
      >
        {subTitle}
      </div>
    </div>
  );
};

Caption.propTypes = {
  mainTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
};
