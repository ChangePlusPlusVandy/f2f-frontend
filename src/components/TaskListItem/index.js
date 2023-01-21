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
        dueAt,
        id,
    } = props;

    console.log(id);

    return (
      <div onClick={() => navigate(ROUTES.TASK_DETAILS, {state: {id: id}})} className={cx(styles.tasks_div)}>
          <p className={cx(styles.taskName)}>{name}</p>
          <p className={cx(styles.taskDate)}>{dueAt}</p>
      </div>
    );
});