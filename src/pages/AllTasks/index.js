import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { TaskListItem } from "../../components/TaskListItem";
import { BackArrow } from "../../components/BackArrow";
import ReactSearchBox from "react-search-box";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const navigate = useNavigate();
  const [taskArray, setTaskArray] = useState([]);
  const [taskElements, setTaskElements] = useState();

  useEffect(() => {
    //TODO: modify this to adjust to user
    const url = "/tasks";
    fetch(process.env.REACT_APP_HOST_URL + url)
      .then((response) => response.json())
      .then((data) => {
        setTaskArray(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setTaskElements(
      taskArray.map((item, index) => (
        <TaskListItem
          name={item.title}
          dueAt={item.timePeriod}
          id={item._id}
          key={index}
        />
      ))
    );
  }, [taskArray]);

  const inputHandler = (text) => {
    let searchText = text.toLowerCase();
    const filteredData = taskArray.filter((task) => {
      return task.title.toLowerCase().includes(searchText);
    });
    setTaskElements(
      filteredData.map((item, index) => (
        <TaskListItem
          name={item.title}
          dueAt={item.timePeriod}
          id={item._id}
          key={index}
        />
      ))
    );
  };

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
        onChange={inputHandler}
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
        {taskElements}
      </div>
    </div>
  );
};

//first two headers may go on separate lines
//check this for other code
//add search bar implementation**
