import styles from "./index.module.css";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { CheckBox } from "../CheckBox";
import { checkEvent, uncheckEvent } from "../../lib/services";
import { COLORS_ARR } from "../../lib/constants";
import React from "react";
const cx = classNames.bind(styles);

export const UpcomingComponent = (props) => {
  const navigate = useNavigate();
  const {
    taskId,
    title,
    time,
    content,
    completed,
    priority,
    childId,
    childName,
    isMobile,
  } = props;
  const [checked, setChecked] = useState(completed);
  const [color, setColor] = useState("#0198BA26");

  useEffect(() => {
    // randomize color for the display block
    setColor(COLORS_ARR[Math.floor(Math.random() * COLORS_ARR.length)]);
  }, []);

  const handleChecked = () => {
    if (checked) uncheckEvent(childId, taskId);
    else checkEvent(childId, taskId);
    setChecked(!checked);
  };

  return (
    <>
      <div
        className={cx(styles.upcomingWrapper)}
        style={{
          backgroundColor: color,
          padding: "4vh",
        }}
      >
        <div
          className={cx(styles.header, {
            [styles.mobile]: isMobile,
          })}
        >
          <p
            className={cx(styles.title, {
              [styles.mobile]: isMobile,
            })}
            onClick={() =>
              navigate(ROUTES.TASK_DETAILS, {
                state: { taskId, completed, childId },
              })
            }
          >
            {title + " - " + childName}
          </p>
          <CheckBox value={checked} onChange={handleChecked} />
        </div>
        <p
          className={cx(styles.time, {
            [styles.mobile]: isMobile,
          })}
          onClick={() =>
            navigate(ROUTES.TASK_DETAILS, {
              state: { taskId, completed, childId },
            })
          }
        >
          {time + ", priority level: " + priority}
        </p>
        <p
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
          })}
          onClick={() =>
            navigate(ROUTES.TASK_DETAILS, { state: { taskId, completed } })
          }
        >
          {content}
        </p>
      </div>
    </>
  );
};
