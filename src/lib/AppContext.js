import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetail, setTaskDetail] = useState("");

  return (
    <AppContext.Provider
      value={{ taskTitle, setTaskTitle, taskDetail, setTaskDetail }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
