import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { AllTasksSection } from "../../components/AllTasksSection";
import ReactSearchBox from "react-search-box";
import { formGetRequest, getAgeGivenBirthday } from "../../lib/utils";

const cx = classNames.bind(styles);

export const AllTasks = () => {
  const [allTaskArray, setAllTaskArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
          const completedTasks = childrenData.completedTasks;

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
                  completed: completedTasks.includes(item._id),
                };
              });
              const newTaskArray = [...allTaskArray, namedTasks];
              setAllTaskArray(newTaskArray);
            })
            .catch((error) => console.log(error));
        });
    });
  }, []);

  // handler for search box
  const handleSearch = (text) => {
    console.log(searchQuery);
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
