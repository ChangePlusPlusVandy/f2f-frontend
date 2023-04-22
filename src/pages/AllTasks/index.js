import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { AllTasksSection } from "../../components/AllTasksSection";
import ReactSearchBox from "react-search-box";
import { getChildrenTasksArray } from "../../lib/services";
import { useNavigate } from "react-router-dom";
import { TIMEOUT, WINDOW_TYPE } from "../../lib/constants";
import { useWindowSize } from "../../lib/hooks";
import Loader from "../LoadScreen";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const { width, type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;
  const [loaded, setLoaded] = useState(false);
  const [allTaskArray, setAllTaskArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const childrenId = JSON.parse(localStorage.getItem("children"));
  const [timer, setTimer] = useState();

  const navigate = useNavigate();

  useEffect(async () => {
    const { taskArray } = await getChildrenTasksArray(childrenId, false);
    setAllTaskArray(taskArray);
    setLoaded(true);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  // handler for search box
  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredSections = allTaskArray.map((taskList, index) =>
    taskList.filter((task) => {
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    })
  );

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, TIMEOUT)
    );
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  if (!loaded) return <Loader />;

  return (
    <div
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "92vh",
      }}
    >
      <ReactSearchBox
        placeholder="Search"
        onChange={handleSearch}
        inputHeight={isMobile ? "10vw" : "3vw"}
        inputFontSize={isMobile ? "5vw" : "1.5vw"}
      />
      <div
        style={{
          overflow: "scroll",
          overscrollBehavior: "none",
        }}
      >
        {filteredSections.map((childTasks, childTasksIndex) => (
          <AllTasksSection
            taskList={childTasks}
            isMobile={isMobile}
            key={childTasksIndex}
          />
        ))}
      </div>
    </div>
  );
};
