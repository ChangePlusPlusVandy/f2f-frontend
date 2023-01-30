/*
 * Each function corresponds to an API
 * Refer to API file for details of each API
 */

export const signUp = (inputs) => {
  return new Promise((resolve, reject) => {
    // need to fix process.env later
    // fetch(process.env.HOST_URL + '/users', {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
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
  });
};
