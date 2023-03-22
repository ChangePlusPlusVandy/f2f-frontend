import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { getChildrenByIdBatch } from "../../lib/services";
import { useNavigate } from "react-router-dom";
import { TaskListItem } from "../../components/TaskListItem";
import { BackArrow } from "../../components/BackArrow";
import ReactSearchBox from "react-search-box";
import { formGetRequest, getAgeGivenBirthday } from "../../lib/utils";
import { PRIORITY_LEVEL } from "../../lib/constants";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const navigate = useNavigate();
  const [taskArray, setTaskArray] = useState([]);
  const [taskElements, setTaskElements] = useState();
  //TODO: get information using cache
  const childrenId = ["63e5c4936d51fdbbbedb5503"];

  useEffect(() => {
    childrenId.forEach((id) => {
      // get child's name and disabilities
      const childUrl = "/children/" + id;
      fetch(process.env.REACT_APP_HOST_URL + childUrl)
        .then((response) => response.json())
        .then((childrenData) => {
          const childName = childrenData.firstName;
          const disabilities = childrenData.disabilities;
          const age = getAgeGivenBirthday(childrenData.birthDate);

          // get tasks based on children's attributes
          const url = formGetRequest("/tasks/byAttributes/", {
            disabilities: JSON.stringify(disabilities),
            age: JSON.stringify(age),
          });
          fetch(process.env.REACT_APP_HOST_URL + url)
            .then((response) => response.json())
            .then((taskData) => {
              const namedTasks = taskData.map((item) => {
                return {
                  ...item,
                  childName: childName,
                  childId: id,
                };
              });
              setTaskArray(namedTasks);
            })
            .catch((error) => console.log(error));
        });
    });
  }, []);

  useEffect(() => {
    setTaskElements(
      taskArray.map((item, index) => (
        <TaskListItem
          taskName={item.title}
          dueAt={item.timePeriod}
          taskId={item._id}
          childName={item.childName}
          childId={item.childId}
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
          taskName={item.title}
          dueAt={item.timePeriod}
          taskId={item._id}
          childName={item.childName}
          childId={item.childId}
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
