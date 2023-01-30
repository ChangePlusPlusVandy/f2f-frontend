import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";
import { useWindowSize } from "../../lib/hooks";
import { WINDOW_TYPE } from "../../lib/constants";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const cx = classNames.bind(styles);

export const Home = () => {
  const { width, type } = useWindowSize();

  const isMobile = type === WINDOW_TYPE.MOBILE;

  const [lastName, setLastName] = useState("Adam's");
  const [goal, setGoal] = useState(100);
  const [points, setPoints] = useState(71);
  const [hpList, sethpList] = useState(["Medicaid Waitlist"]);
  const [elseList, setElseList] = useState([
    "Register for Autism Symposium",
    "Intensive IEP support & training",
  ]);

  useEffect(() => {
    fetch("/userData")
      .then((response) => response.json())
      .then((data) => {
        setLastName(data.lastName);
        setGoal(data.goal);
        setPoints(data.points);
        sethpList(data.hpList);
        setElseList(data.elseList);
      })
      .catch((error) => console.log(error));
  }, []);

  const hpElements = hpList.map((thing, index) => (
    <p className={styles.list} key={index}>
      {index + 1 + ". " + thing}
    </p>
  ));
  const elseElements = elseList.map((thing, index) => (
    <p className={styles.list} key={index}>
      {index + 1 + ". " + thing}
    </p>
  ));

  return (
    <div style={{overflow: "scroll", overscrollBehavior: "none", height: "92vh"}}>
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
        <div className={cx(styles.text_div)}>
          <p className={cx(styles.points)}>{goal - points}</p>
          <p className={cx(styles.points, "text")}>
            &nbsp;points away from your weekly goal
          </p>
        </div>
        <div className={cx(styles.progress_circle)}>
          <CircularProgressbarWithChildren
            value={(100 * points) / goal}
            strokeWidth={16}
            styles={buildStyles({
              pathColor: "#E3D150",
              trailColor: "#F9F6DC",
            })}
          >
            <div className={cx(styles.progress_circle_text)}>{points}</div>
            <div className={cx(styles.progress_circle_text)}>Points</div>
          </CircularProgressbarWithChildren>
        </div>
        <div className={cx(styles.todo_div)}>
          <h1 className={cx(styles.radar)}>On Your Radar</h1>
          <h2 className={cx(styles.priority)}>High Priority</h2>
          {hpElements}
          <h2 className={cx(styles.priority, "else")}>Everything Else</h2>
          {elseElements}
          <div className={cx(styles.link_div)}>
            <a href={ROUTES.ROADMAP} className={cx(styles.link)}>
              See in Roadmap
            </a>
          </div>
        </div>
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
