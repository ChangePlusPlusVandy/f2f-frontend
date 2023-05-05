/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */

import { PRIORITY_LEVEL, STATUS_CODE } from "./constants";
import { formGetRequest, getAgeGivenBirthday } from "./utils";
import { toast } from "react-toastify";

export const signUp = (inputs) => {
  return new Promise((resolve, reject) => {
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
 * @return {Array} taskArray the nested 2D array of tasks belonging to each child
 */

export const getChildrenTasksArray = async (childrenId, priority) => {
  let taskArray = [];
  const childPromises = childrenId.map(async (childId) => {
    // get child's name and disabilities
    const childUrl = "/children/" + childId;
    const response = await fetch(process.env.REACT_APP_HOST_URL + childUrl);
    const childData = await response.json();
    const childName = childData.firstName;
    const completedTasks = childData.completedTasks;
    const age = getAgeGivenBirthday(childData.birthDate);
    const params = {
      disabilities: JSON.stringify(childData.disabilities),
      age: JSON.stringify(age),
    };
    if (priority) {
      params.priority = JSON.stringify(2);
    }

    // get tasks based on children's attributes
    const url = formGetRequest("/tasks/byAttributes/", params);
    const taskResponse = await fetch(process.env.REACT_APP_HOST_URL + url);
    const taskData = await taskResponse.json();
    const namedTasks = taskData.map((item) => {
      return {
        ...item,
        childName: childName,
        childId: childId,
        completed: completedTasks.includes(item._id),
      };
    });
    taskArray.push(namedTasks);
  });

  await Promise.all(childPromises); // wait for all child promises to complete

  return { taskArray };
};

export const logoutTimer = () => {
  setTimeout(() => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userID");
    return;
  }, 15000);
};
