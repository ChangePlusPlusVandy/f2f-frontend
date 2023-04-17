import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { AllTasksSection } from "../../components/AllTasksSection";
import ReactSearchBox from "react-search-box";
import { getChildrenTasksArray } from "../../lib/services";
import { useNavigate } from "react-router-dom";
import { TIMEOUT, WINDOW_TYPE } from "../../lib/constants";
import { useWindowSize } from "../../lib/hooks";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const { width, type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;

  const [allTaskArray, setAllTaskArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //TODO: get information using cache
  const childrenId = JSON.parse(localStorage.getItem("children"));
  const [timer, setTimer] = useState();

  console.log(childrenId)

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  useEffect(() => {
    console.log("here")
    console.log(allTaskArray)
    getChildrenTasksArray(childrenId, false, allTaskArray, setAllTaskArray);
  }, []);

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
    console.log(localStorage);
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

  return (
    <div
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "92vh",
      }}>
      <ReactSearchBox
        placeholder="Search"
        onChange={handleSearch}
        inputHeight={isMobile ? "10vw" : "5vw"}
        inputFontSize={isMobile ? "5vw" : "2vw"}
      />
      <div
        style={{
          overflow: "scroll",
          overscrollBehavior: "none",
          height: "66vh",
        }}>
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
