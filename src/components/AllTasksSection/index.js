import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { TaskListItem } from "../../components/TaskListItem";
import { useState, useEffect } from "react";
import { COLORS_ARR } from "../../lib/constants";

const cx = classNames.bind(styles);

export const AllTasksSection = React.forwardRef((props, ref) => {
  const { taskList, isMobile } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [color, setColor] = useState("#0198BA26");

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // randomize color for the display block
    setColor(COLORS_ARR[Math.floor(Math.random() * COLORS_ARR.length)]);
  }, []);

  return (
    <div
      className={cx(styles.entireSection)}
      style={{
        backgroundColor: color,
      }}
    >
      <p
        onClick={toggleExpansion}
        className={cx(styles.childName, {
          [styles.mobile]: isMobile,
        })}
      >
        {taskList[0]?.childName}
      </p>
      <div className={cx(styles.tasksSection)}>
        {isExpanded &&
          taskList.map((item, index) => (
            <TaskListItem
              taskName={item.title}
              dueAt={item.timePeriod}
              taskId={item._id}
              childId={item.childId}
              completed={item.completed}
              key={index}
              isMobile={isMobile}
            />
          ))}
      </div>
    </div>
  );
});
