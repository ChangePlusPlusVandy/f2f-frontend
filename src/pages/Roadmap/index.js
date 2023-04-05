import React, { useState, useEffect, useRef, createContext } from "react";
import classNames from "classnames/bind";
import Papa from "papaparse";
import { useAuth } from "../../lib/AuthContext";
import styles from "./index.module.css";
import { ROUTES, PRIORITY_LEVEL } from "../../lib/constants";
import { getChildrenTasksArray } from "../../lib/services";
import { ReactComponent as Calender } from "../../svg/roadmapCalender.svg";
import { ReactComponent as Box } from "../../svg/roadmapBox.svg";
import { useNavigate } from "react-router-dom";
import {
  importCSVToJSON,
  formGetRequest,
  getAgeGivenBirthday,
} from "../../lib/utils";
import { AuthButton } from "../../components/AuthButton";

const cx = classNames.bind(styles);

export const Roadmap = ({ toast }) => {
  const navigate = useNavigate();
  const [numTasks, setNumTasks] = useState(0);
  const [numAllTasks, setNumAllTasks] = useState(0);
  const uploadRef = useRef();
  const [importFile, setImportFile] = useState(null);
  const [hpList, sethpList] = useState([]);
  const [elseList, setElseList] = useState([]);
  //TODO: get the information from cache
  const childrenId = ["63e5c4936d51fdbbbedb5503"];

  const getStats = (childrenId) => {
    childrenId.forEach((childId) => {
      // get child's name and disabilities
      const childUrl = "/children/" + childId;
      fetch(process.env.REACT_APP_HOST_URL + childUrl)
        .then((response) => response.json())
        .then((childrenData) => {
          const childName = childrenData.firstName;
          const age = getAgeGivenBirthday(childrenData.birthDate);
          const completedTasks = childrenData.completedTasks;
          const params = {
            disabilities: JSON.stringify(childrenData.disabilities),
            age: JSON.stringify(age),
            //TODO: fix the data for upcoming vs priority
            priority: JSON.stringify(2),
          };

          // get tasks based on children's attributes
          const url = formGetRequest("/tasks/getStats/", params);
          fetch(process.env.REACT_APP_HOST_URL + url)
            .then((response) => response.json())
            .then((data) => {
              setNumTasks(data.numUpcoming);
              setNumAllTasks(data.numAll);
            })
            .catch((error) => console.log(error));
        });
    });
  };

  useEffect(() => {
    getStats(childrenId);
    getChildrenTasksArray(childrenId, true, hpList, sethpList);
    getChildrenTasksArray(childrenId, false, elseList, setElseList);
  }, []);

  // set the import csv file
  useEffect(() => {
    if (importFile) {
      Papa.parse(importFile, {
        complete: (res) => {
          const { data } = res;
          const inputObj = importCSVToJSON(data);
          if (inputObj === "error") {
            toast("Please provide a valid csv file");
            setImportFile(null);
            return;
          }
          const url = "/tasks/loadTaskCSV";
          fetch(process.env.REACT_APP_HOST_URL + url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputObj),
          })
            .then((response) => console.log(response.json()))
            .catch((error) => {
              console.error(error);
            });

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

  const onExport = async () => {
    fetch("http://localhost:3001/users/exportCSV")
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => {
        const blob = new Blob([arrayBuffer], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => console.error(error));
  };

  const hpElements = hpList.flat().map((thing, index) => (
    <p className={styles.list} key={index}>
      {index + 1 + ". " + thing.title}
    </p>
  ));
  const elseElements = elseList.flat().map((thing, index) => (
    <p className={styles.list} key={index}>
      {index + 1 + ". " + thing.title}
    </p>
  ));

  return (
    <div
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "80vh",
      }}>
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
      <div>
        <AuthButton
          className={cx(styles.csvButton)}
          label="Export Task CSV"
          onClick={onExport}
          isMobile={true}
        />
      </div>

      <div
        onClick={() => navigate(ROUTES.UPCOMING_TASKS)}
        className={cx(styles.tasks_div)}>
        <div style={{ display: "flex", margin: "10px" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "flex" }}>
              <Calender className={cx(styles.icon)} />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  margin: "10px",
                }}>
                <p className={cx(styles.taskDesc)}>Upcoming</p>
              </div>
            </div>
            <p className={cx(styles.header, "small")}>
              All tasks with priority level 2
            </p>
          </div>
          <p className={cx(styles.taskNum)}>{numTasks}</p>
        </div>
      </div>

      <div
        onClick={() => navigate(ROUTES.ALL_TASKS)}
        className={cx(styles.tasks_div, "all")}>
        <div style={{ display: "flex", margin: "10px" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "flex" }}>
              <Box className={cx(styles.icon)} />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  margin: "10px",
                }}>
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
        <h2 className={cx(styles.priority, "else")}>All Tasks</h2>
        {elseElements}
      </div>
    </div>
  );
};

//Make each box into a compenent (lot of redundant code)** (move to components folder)
