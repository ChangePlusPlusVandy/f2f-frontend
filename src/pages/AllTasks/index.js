import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { AllTasksSection } from "../../components/AllTasksSection";
import ReactSearchBox from "react-search-box";
import { formGetRequest, getAgeGivenBirthday } from "../../lib/utils";
import { getChildrenTasksArray } from "../../lib/services";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const [allTaskArray, setAllTaskArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  //TODO: get information using cache
  const childrenId = ["63e5c4936d51fdbbbedb5503"];

  useEffect(() => {
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
        inputHeight="10vw"
        inputFontSize="5vw"
      />
      <div
        style={{
          overflow: "scroll",
          overscrollBehavior: "none",
          height: "66vh",
        }}
      >
        {filteredSections.map((childTasks, childTasksIndex) => (
          <AllTasksSection taskList={childTasks} key={childTasksIndex} />
        ))}
      </div>
    </div>
  );
};

//first two headers may go on separate lines
//check this for other code
//add search bar implementation**
