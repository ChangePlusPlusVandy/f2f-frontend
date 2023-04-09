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
          >
            {title}
          </p>
          <CheckBox value={checked} onChange={handleChecked} />
        </div>
        {/* <img
                src={upcomingIcon}
                className={cx(styles.upcomingIcon)}
                ref={imageEle}
            /> */}
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
          {time}
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
        <p
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
          })}
          onClick={() =>
            navigate(ROUTES.TASK_DETAILS, { state: { taskId, completed } })
          }
        >
          {priority}
        </p>
      </div>
    </>
  );
};
