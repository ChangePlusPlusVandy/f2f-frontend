import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "../../lib/constants";
import { CheckBox } from "../CheckBox";

const cx = classNames.bind(styles);

export const TaskListItem = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { taskName, dueAt, taskId, childrenId } = props;

  const handleChecked = ({}) => {
    setChecked(!checked);
    // send response to backend and set a task checked
    // checkEvent(
    //   {
    //     //give user id and task id
    //   }
    //     .then((res) => {
    //       const { status } = res;
    //     })
    //     .catch((err) => toast("Internal error"))
    // );
  };

  return (
    <div
      onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { id: taskId } })}
      className={cx(styles.tasks_div)}
    >
      <p className={cx(styles.taskName)}>{taskName}</p>
      <p className={cx(styles.taskDate)}>{dueAt}</p>
      <CheckBox value={checked} onChange={handleChecked} />
    </div>
  );
});
