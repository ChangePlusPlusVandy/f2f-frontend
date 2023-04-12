import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { useWindowSize } from "../../lib/hooks";
import { WINDOW_TYPE } from "../../lib/constants";
import { OnYourRadar } from "../../components/OnYourRadar";
import { PointsDisplay } from "../../components/PointsDisplay";
import "react-circular-progressbar/dist/styles.css";

const cx = classNames.bind(styles);

export const Home = () => {
  const { width, type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;
  // TODO: use Cache to store the user
  const [lastName, setLastName] = useState("Adam's");
  // TODO: cache
  const childrenId = ["63e5c4936d51fdbbbedb5503"];

  return (
    <div
      style={{ overflow: "scroll", overscrollBehavior: "none", height: "92vh" }}
    >
      <div
        className={cx(styles.container, {
          [styles.mobile]: isMobile,
        })}
      >
        <div className={cx(styles.text_div, "first")}>
          <p className={cx(styles.welcome)}>Welcome&nbsp;</p>
          <p className={cx(styles.welcome, "family")}>{lastName} Family!</p>
        </div>
        <div className={cx(styles.text_div, "second")}>
          <p className={cx(styles.cruising)}>You're&nbsp;</p>
          <p className={cx(styles.cruising, "color")}>Cruising it!</p>
        </div>
        <PointsDisplay childrenId={childrenId} />
        <OnYourRadar childrenId={childrenId} />
        <NavBar />
      </div>
    </div>
  );
};

//issues:
//what happens when todo list becomes larger than the screen
//or family last name is too long
//fix navbar for computer screen (looks bad on screen anyways)
//spacing can be tweaked
