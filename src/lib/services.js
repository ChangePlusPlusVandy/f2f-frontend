/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */
import { STATUS_CODE } from "./constants";

<<<<<<< HEAD
const mongoCheck = (email) => {
  console.log("before fetch");
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

const salesForceCheck = (email) => {
  return new Promise((resolve, reject) => {
    //make localhost call a constant
    fetch(`http://localhost:3001/verification/checkSF/?email=${email}`, {
      method: "GET",
=======
import { STATUS_CODE } from "./constants";
import { formGetRequest } from "./utils";

export const signUp = (inputs) => {
  return new Promise((resolve, reject) => {
    fetch(process.env.REACT_APP_HOST_URL + "/users", {
      method: "POST",
>>>>>>> 6ea72d4148c553185f8931ce25d1f515aa67fa06
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
};

<<<<<<< HEAD
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

export const signUp = (inputs) => {
  // need to fix process.env later
  // fetch(process.env.HOST_URL + '/users', {
  return mongoCheck(inputs.email).then((res) => {
    console.log(res);
    if (res.status === "Found") {
      console.log("here");
      return { message: "toLogin" };
    } else {
      return salesForceCheck(inputs.email).then((res) => {
        console.log(res)
        if (res === STATUS_CODE.SUCESS) {
          return { message: "sendVerification" };
        } else {
          return { message: "sendSFForm" };
        }
      });
    }
  });
};

export const checkEvent = (inputs) => {
  return new Promise((resolve, reject) => {
    // need to fix process.env later
    fetch("http://localhost:3001/tasks/checkEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
=======
export const getChildrenByIdBatch = (childrenId) => {
  const url = formGetRequest("/children/getChildrenByIdBatch/", {
    id: JSON.stringify(childrenId),
>>>>>>> 6ea72d4148c553185f8931ce25d1f515aa67fa06
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
