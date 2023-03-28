import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES } from "../../lib/constants";
import { CheckBox } from "../CheckBox";
import { checkEvent, uncheckEvent } from "../../lib/services";

const cx = classNames.bind(styles);

export const TaskListItem = React.forwardRef((props, ref) => {
  const { taskName, dueAt, taskId, childName, childId, completed } = props;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(completed);

  const handleChecked = ({}) => {
    if (checked) uncheckEvent(childId, taskId);
    else checkEvent(childId, taskId);
    setChecked(!checked);
  };

  return (
    <div className={cx(styles.tasks_div)}>
      <div
        onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { id: taskId } })}
      >
        <p className={cx(styles.taskName)}>{taskName}</p>
        <p className={cx(styles.taskDate)}>{dueAt}</p>
        <p className={cx(styles.childName)}>{childName}</p>
      </div>
      <CheckBox value={checked} onChange={handleChecked} />
    </div>
  );
});
