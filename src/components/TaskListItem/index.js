import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants";

const cx = classNames.bind(styles);

export const TaskListItem = React.forwardRef((props, ref) => {
    const navigate = useNavigate();

    const {
        name,
        dueDate,
        dueTime,
        id,
    } = props;

    return (
      <div onClick={() => navigate(ROUTES.TASK_DETAILS)} className={cx(styles.tasks_div)}>
          <p className={cx(styles.taskName)}>{name}</p>
          <p className={cx(styles.taskDate)}>{dueDate}, {dueTime}</p>
      </div>
    );
});