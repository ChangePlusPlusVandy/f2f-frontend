import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import { useAuth } from "../../lib/AuthContext";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const cx = classNames.bind(styles);

export const Home = () => {
  const [fact, setFact] = useState("");
  const { currentUser } = useAuth();

  // for the request to our backend API. I suggest using ReactQuery. The normal fetch() method is
  // amazing, but it gets tedious when dealing with caching, retries, and so on. ReactQuery takes
  // care of that for us.

  useEffect(() => {
    const fetchFact = async () => {
      console.log("called");
      try {
        const token = await currentUser.getIdToken();

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await fetch("http://localhost:8080/data", payloadHeader);
        setFact(await res.text());
      } catch (err) {
        console.log(err);
      }
    };

    fetchFact();
  }, [currentUser]);

  const lastName = "Adam's";
  const goal = 100;
  const points = 71;
  const hpList = ["Medicaid Waitlist"];
  const elseList = [
    "Register for Autism Symposium",
    "Intensive IEP support & training",
  ];

  const hpElements = hpList.map((thing, index) => (
    <p className={styles.list} key = {index}>{index + 1 + ". " + thing}</p>
  ));
  const elseElements = elseList.map((thing, index) => (
    <p className={styles.list} key = {index}>{index + 1 + ". " + thing}</p>
  ));

  return (
    <div style={{overflow:"scroll", overscrollBehavior: "none", height: "92vh"}}>
      <div className={cx(styles.text_div, "first")}>
        <p className={cx(styles.welcome)}>Welcome&nbsp;</p>
        <p className={cx(styles.welcome, "family")}>
          {lastName} Family!
        </p>
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
        <CircularProgressbarWithChildren value={(100 * points) / goal} strokeWidth={16} styles={buildStyles({
          pathColor: "#E3D150",
          trailColor: "#F9F6DC",
        })}>
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
  );
};

//issues:
//what happens when todo list becomes larger than the screen
//or family last name is too long
//fix navbar for computer screen (looks bad on screen anyways)
//spacing can be tweaked