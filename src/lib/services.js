/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */

import { PRIORITY_LEVEL, STATUS_CODE } from "./constants";
import { formGetRequest, getAgeGivenBirthday } from "./utils";
import { toast } from "react-toastify";

export const mongoCheck = (email) => {
  console.log("email " + email);
  return new Promise((resolve, reject) => {
    //make localhost call a constant
    fetch(`http://localhost:3001/verification/checkMongo/?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};
export const sendVerificationEmail = (email) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/verification/sendEmail/?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const signUpChildren = (inputs) => {
  return new Promise((resolve, reject) => {
    fetch(process.env.REACT_APP_HOST_URL + "/children", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const signUp = (inputs) => {
  console.log("user call to backend");
  console.log(inputs);
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(inputs));
    console.log(inputs);
    fetch(process.env.REACT_APP_HOST_URL + "/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

export const getChildrenByIdBatch = (childrenId) => {
  const url = formGetRequest("/children/getChildrenByIdBatch/", {
    id: JSON.stringify(childrenId),
  });
  fetch(process.env.REACT_APP_HOST_URL + url)
    .then((response) => response.json())
    .then((children) => {
      return { status: STATUS_CODE.SUCESS, data: children };
    })
    .catch((err) => {
      console.log(err);
      return { status: STATUS_CODE.ERROR };
    });
};

/**
 * Check an event as completed
 * @param {String} childId the child that finished the task
 * @param {String} taskId the task that is completed by the child
 */
export const checkEvent = (childId, taskId) => {
  const url = "/children/" + childId + "/completedTask";
  fetch(process.env.REACT_APP_HOST_URL + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId: taskId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Completed a task successfully");
    })
    .catch((error) => {
      toast("Internal Error");
      console.error(error);
    });
};

/**
 * Uncheck an event as not completed
 * @param {String} childId the child that the task belongs to
 * @param {String} taskId the task that is marked as noncompleted
 */
export const uncheckEvent = (childId, taskId) => {
  const url = "/children/" + childId + "/completedTask";
  fetch(process.env.REACT_APP_HOST_URL + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ taskId: taskId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Undo a task successfully");
    })
    .catch((error) => {
      toast("Internal Error");
      console.error(error);
    });
};

/**
 * @param {Array} childrenId an array of children Id's
 * @param {boolean} priority the priority level queried for Upcoming tasks
 * @param {Array} taskArray the task array to be set: a 2D array where each child possesses their respective
 * tasks based on age and disabilities
 * @param {Function} setTaskArray the function to set task array
 */
export const getChildrenTasksArray = (
  childrenId,
  priority,
  taskArray,
  setTaskArray
) => {
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
        };
        if (priority) {
          params.priority = JSON.stringify(2);
        }

        console.log("help")
        console.log("/tasks/byAttributes/", params)

        // get tasks based on children's attributes
        const url = formGetRequest("/tasks/byAttributes/", params);
        fetch(process.env.REACT_APP_HOST_URL + url)
          .then((response) => response.json())
          .then((taskData) => {
            const namedTasks = taskData.map((item) => {
              return {
                ...item,
                childName: childName,
                childId: childId,
                completed: completedTasks.includes(item._id),
              };
            });
            const newTaskArray = [...taskArray, namedTasks];
            setTaskArray(newTaskArray);
          })
          .catch((error) => console.log(error));
      });
  });
};

export const logoutTimer = () => {
  setTimeout(() => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID");
    return;
  }, 15000);
};
