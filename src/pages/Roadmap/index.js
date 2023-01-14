import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import { useAuth } from "../../lib/AuthContext";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";
import { ReactComponent as Calender } from "../../svg/roadmapCalender.svg";
import { ReactComponent as Box } from "../../svg/roadmapBox.svg";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

export const Roadmap = () => {
  const navigate = useNavigate();
  const [numTasks, setNumTasks] = useState(8);
  const [numAllTasks, setNumAllTasks] = useState(23);

  //just for mvp
  const [hpList, sethpList] = useState(["Medicaid Waitlist"]);
  const [elseList, setElseList] = useState([
    "Register for Autism Symposium",
    "Intensive IEP support & training",
  ]);
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

  useEffect(() => {
    fetch("/taskData")
      .then((response) => response.json())
      .then((data) => {
        setNumTasks = data.numTasks;
        setNumAllTasks = data.numAllTasks;
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{ overflow: "scroll", overscrollBehavior: "none", height: "92vh" }}
    >
      <div style={{ textAlign: "center" }}>
        <p className={cx(styles.header)}>Road Map</p>
        <p className={cx(styles.header, "small")}>
          Below are all the tasks needed to be completed
        </p>
      </div>
      <div onClick={() => navigate(ROUTES.UPCOMING_TASKS)} className={cx(styles.tasks_div)}>
          <div style={{ display: "flex", margin: "10px" }}>
            <div style={{ display: "inline-block" }}>
              <div style={{ display: "flex" }}>
                <Calender className={cx(styles.icon)} />
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    margin: "10px",
                  }}
                >
                  <p className={cx(styles.taskDesc)}>Upcoming</p>
                </div>
              </div>
              <p className={cx(styles.header, "small")}>
                Everything in the next three months
              </p>
            </div>
            <p className={cx(styles.taskNum)}>{numTasks}</p>
          </div>
      </div>

      <div onClick={() => navigate(ROUTES.ALL_TASKS)} className={cx(styles.tasks_div, "all")}>
        <div style={{ display: "flex", margin: "10px" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "flex" }}>
              <Box className={cx(styles.icon)} />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  margin: "10px",
                }}
              >
                <p className={cx(styles.taskDesc)}>All&nbsp;Tasks</p>
              </div>
            </div>
            <p className={cx(styles.header, "small")}>Everything on the list</p>
          </div>
          <p className={cx(styles.taskNum)}>{numAllTasks}</p>
        </div>
      </div>

      {/* just for mvp */}
      <div className={cx(styles.todo_div)}>
        <h1 className={cx(styles.radar)}>On Your Radar</h1>
        <h2 className={cx(styles.priority)}>High Priority</h2>
        {hpElements}
        <h2 className={cx(styles.priority, "else")}>Everything Else</h2>
        {elseElements}
      </div>

      <NavBar />
    </div>
  );
};

//should i make each box into a compenent (lot of redundant code)
