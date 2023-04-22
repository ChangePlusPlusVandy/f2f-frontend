import React, { useState, useEffect, useRef, createContext } from "react";
import classNames from "classnames/bind";
import Papa from "papaparse";
import { useAuth } from "../../lib/AuthContext";
import styles from "./index.module.css";
import { ROUTES, PRIORITY_LEVEL, TIMEOUT } from "../../lib/constants";
import { ReactComponent as Calender } from "../../svg/roadmapCalender.svg";
import { ReactComponent as Box } from "../../svg/roadmapBox.svg";
import { useNavigate } from "react-router-dom";
import {
  importCSVToJSON,
  formGetRequest,
  getAgeGivenBirthday,
} from "../../lib/utils";
import { AuthButton } from "../../components/AuthButton";
import { useWindowSize } from "../../lib/hooks";
import { WINDOW_TYPE } from "../../lib/constants";
import Loader from "../LoadScreen";

const cx = classNames.bind(styles);

export const Roadmap = ({ toast }) => {
  const { width, type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [numTasks, setNumTasks] = useState(0);
  const [numAllTasks, setNumAllTasks] = useState(0);
  const uploadRef = useRef();
  const [importFile, setImportFile] = useState(null);
  const childrenId = JSON.parse(localStorage.getItem("children"));
  const [timer, setTimer] = useState();

  const getStats = async (childrenId) => {
    let childrenStatsData = { numUpcoming: 0, numAll: 0 };
    const childPromises = childrenId.map(async (childId) => {
      // get child's name and disabilities
      const childUrl = "/children/" + childId;
      const response = await fetch(process.env.REACT_APP_HOST_URL + childUrl);
      const childData = await response.json();
      const age = getAgeGivenBirthday(childData.birthDate);
      const params = {
        disabilities: JSON.stringify(childData.disabilities),
        age: JSON.stringify(age),
        //TODO: fix the data for upcoming vs priority
        priority: JSON.stringify(PRIORITY_LEVEL.PRIORITY_LEVEL),
      };

      // get tasks based on children's attributes
      const url = formGetRequest("/tasks/getStats/", params);
      console.log(url);
      const statsResponse = await fetch(process.env.REACT_APP_HOST_URL + url);
      const statsData = await statsResponse.json();
      childrenStatsData.numUpcoming += statsData.numUpcoming;
      childrenStatsData.numAll += statsData.numAll;
    });

    await Promise.all(childPromises); // wait for all child promises to complete
    return childrenStatsData;
  };

  useEffect(async () => {
    const { numUpcoming, numAll } = await getStats(childrenId);
    setNumAllTasks(numAll);
    setNumTasks(numUpcoming);
    setLoaded(true);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, TIMEOUT)
    );
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
            .then((response) => response.json())
            .then((data) => toast("Successfully uploaded the csv!"))
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
    const exportUrl = "/users/exportCSV";
    fetch(process.env.REACT_APP_HOST_URL + exportUrl)
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

  if (!loaded) return <Loader />;

  return (
    <div
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "80vh",
      }}
    >
      <div>
        <AuthButton
          className={cx(styles.csvButton)}
          label="Import Task CSV"
          onClick={onImport}
          isMobile={isMobile}
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
          isMobile={isMobile}
        />
      </div>

      <div
        onClick={() => navigate(ROUTES.UPCOMING_TASKS)}
        className={cx(styles.tasks_div, {
          [styles.mobile]: isMobile,
        })}
      >
        <div style={{ display: "flex", margin: "10px" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "flex" }}>
              <Calender
                className={cx(styles.icon, {
                  [styles.mobile]: isMobile,
                })}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  margin: "10px",
                }}
              >
                <p
                  className={cx(styles.taskDesc, {
                    [styles.mobile]: isMobile,
                  })}
                >
                  High&nbsp;Priority
                </p>
              </div>
            </div>
            <p
              className={cx(styles.header, "small", {
                [styles.mobile]: isMobile,
              })}
            >
              All tasks with priority level higher than 2
            </p>
          </div>
          <p
            className={cx(styles.taskNum, {
              [styles.mobile]: isMobile,
            })}
          >
            {numTasks}
          </p>
        </div>
      </div>

      <div
        onClick={() => navigate(ROUTES.ALL_TASKS)}
        className={cx(styles.tasks_div, "all", {
          [styles.mobile]: isMobile,
        })}
      >
        <div style={{ display: "flex", margin: "10px" }}>
          <div style={{ display: "inline-block" }}>
            <div style={{ display: "flex" }}>
              <Box
                className={cx(styles.icon, {
                  [styles.mobile]: isMobile,
                })}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  margin: "10px",
                }}
              >
                <p
                  className={cx(styles.taskDesc, {
                    [styles.mobile]: isMobile,
                  })}
                >
                  All&nbsp;Tasks
                </p>
              </div>
            </div>
            <p
              className={cx(styles.header, "small", {
                [styles.mobile]: isMobile,
              })}
            >
              Everything on the list
            </p>
          </div>
          <p
            className={cx(styles.taskNum, {
              [styles.mobile]: isMobile,
            })}
          >
            {numAllTasks}
          </p>
        </div>
      </div>
    </div>
  );
};
