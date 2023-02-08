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
  const [taskArray, setTaskArray] = useState([
    {
      name: "Medicaid Waitlist",
      dueAt: "10/20/2024 5:00pm",
      id: "asdfdas",
    },
    {
      name: "Survey",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Government Form",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Cool Tasks",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Crazy Tasks",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "More Tasks",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Gabe",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Gabriel",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Gabe Dong",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Gabe D",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Abe D",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
    {
      name: "Rohan",
      dueAt: "10/20/2024 5:00 pm",
      id: "asdcasdf",
    },
  ]);
  const [taskElements, setTaskElements] = useState();

  useEffect(() => {
    fetch("/allTasks")
      .then((response) => response.json())
      .then((data) => {
        setTaskArray(data.taskArray);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setTaskElements(
      taskArray.map((item, index) => (
        <TaskListItem
          name={item.name}
          dueAt={item.dueAt}
          id={item.id}
          key={index}
        />
      ))
    );
  }, []);

  let inputHandler = (text) => {
    let searchText = text.toLowerCase();
    const filteredData = taskArray.filter((task) => {
      return task.name.toLowerCase().startsWith(searchText);
    });
    setTaskElements(
      filteredData.map((item, index) => (
        <TaskListItem
          name={item.name}
          dueAt={item.dueAt}
          id={item.id}
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
