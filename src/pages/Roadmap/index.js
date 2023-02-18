import React, { useState, useEffect, useRef, createContext } from "react";
import classNames from "classnames/bind";
import Papa from "papaparse";
import { useAuth } from "../../lib/AuthContext";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";
import { ReactComponent as Calender } from "../../svg/roadmapCalender.svg";
import { ReactComponent as Box } from "../../svg/roadmapBox.svg";
import { useNavigate } from "react-router-dom";
import { importCSVToJSON } from "../../lib/utils";
import { AuthButton } from "../../components/AuthButton";

const cx = classNames.bind(styles);

export const Roadmap = () => {
  const navigate = useNavigate();
  const [numTasks, setNumTasks] = useState(8);
  const [numAllTasks, setNumAllTasks] = useState(23);
  const uploadRef = useRef();
  const [importFile, setImportFile] = useState(null);

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
        setNumTasks(data.numTasks);
        setNumAllTasks(data.numAllTasks);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (importFile) {
      Papa.parse(importFile, {
        complete: (res) => {
          const { data } = res;
          const inputObj = importCSVToJSON(data);
          if (inputObj === "error") {
            // toast("Please provide a valid csv file");
            setImportFile(null);
            return;
          }
          const url = "/loadTaskCSV";
          console.log(inputObj[0]);
          fetch(process.env.REACT_APP_HOST_URL + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputObj),
          }).then((response) => console.log(response.json()));

          setImportFile(null);
        },
        error: (err) => setImportFile(null),
      });
      if (uploadRef?.current?.value) uploadRef.current.value = "";
    }
  }, [importFile]);

  const onImport = () => {
    uploadRef.current.click();
  };

  return (
    <div
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "80vh",
      }}
    >
      {/* <div style={{ textAlign: "center" }}>
        <p className={cx(styles.header)}>Road Map</p>
        <p className={cx(styles.header, "small")}>
          Below are all the tasks needed to be completed
        </p>
      </div> */}

      <div>
        <AuthButton
          className={cx(styles.csvButton)}
          label="Import Task CSV"
          onClick={onImport}
          isMobile={true}
        />
        <input
          type="file"
          accept=".csv"
          ref={uploadRef}
          style={{ display: "none" }}
          onChange={(e) => setImportFile(e.target.files[0])}
        />
      </div>

      <div
        onClick={() => navigate(ROUTES.UPCOMING_TASKS)}
        className={cx(styles.tasks_div)}
      >
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

      <div
        onClick={() => navigate(ROUTES.ALL_TASKS)}
        className={cx(styles.tasks_div, "all")}
      >
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
    </div>
  );
};

//Make each box into a compenent (lot of redundant code)** (move to components folder)
