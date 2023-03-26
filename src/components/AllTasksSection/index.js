import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { TaskListItem } from "../../components/TaskListItem";

const cx = classNames.bind(styles);

export const AllTasksSection = React.forwardRef((props, ref) => {
  const { taskList } = props;

  return (
    <div className={cx(styles.tasksSection)}>
      <p className={cx(styles.childName)}>{taskList[0]?.childName}</p>
      <div>
        {taskList.map((item, index) => (
          <TaskListItem
            taskName={item.title}
            dueAt={item.timePeriod}
            taskId={item._id}
            childName={item.childName}
            childId={item.childId}
            completed={item.completed}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});
