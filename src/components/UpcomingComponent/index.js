import styles from "./index.module.css";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { CheckBox } from "../CheckBox";
import { checkEvent, uncheckEvent } from "../../lib/services";
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
    const colors = ["#0198BA26", "#E3D15033", "#8B567478"];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const handleChecked = () => {
    console.log(childId);
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
          onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { taskId } })}
        >
          {time}
        </p>
        <p
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
          })}
          onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { taskId } })}
        >
          {content}
        </p>
        <p
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
          })}
          onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { taskId } })}
        >
          {priority}
        </p>
      </div>
    </>
  );
};
