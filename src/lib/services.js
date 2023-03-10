/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */

import { STATUS_CODE } from "./constants";
import { formGetRequest } from "./utils";

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
