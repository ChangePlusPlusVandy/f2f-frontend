import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { ROUTES } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { TaskListItem } from "../../components/TaskListItem";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const navigate = useNavigate();
  const [taskArray, setTaskArray] = useState([
    {
      name: "task1",
      dueDate: "10/20/2024",
      dueTime: "5:00 pm",
      id: "asdfdas",
    },
    {
      name: "task1",
      dueDate: "10/20/2024",
      dueTime: "5:00 pm",
      id: "asdcasdf",
    },
  ]);

  const taskElements = taskArray.map((item, index) => (
    <TaskListItem
      name={item.name}
      dueDate={item.dueDate}
      dueTime={item.dueTime}
      id={item.id}
      key={index}
    />
  ));

  useEffect(() => {
    fetch("/allTasks")
      .then((response) => response.json())
      .then((data) => {
        setTaskArray(data.taskArray);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div
      style={{ overflow: "scroll", overscrollBehavior: "none", height: "92vh" }}
    >
      <div style={{ textAlign: "center" }}>
        <p className={cx(styles.header)}>All Tasks</p>
        <p className={cx(styles.header, "small")}>
          Everything you need to do for your child
        </p>
      </div>
      {taskElements}
      <NavBar />
    </div>
  );
};

//first two headers may go on separate lines
//check this for other code
//add search bar implementation**