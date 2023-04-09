import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { useState, useEffect } from "react";
import { getChildrenTasksArray } from "../../lib/services";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const cx = classNames.bind(styles);

export const PointsDisplay = React.forwardRef((props, ref) => {
  const { childrenId } = props;
  const [goal, setGoal] = useState(100);
  const [points, setPoints] = useState(71);

  return (
    <div className={cx(styles.pointsBlock)}>
      <div className={cx(styles.text_div)}>
        <p className={cx(styles.points)}>{goal - points}</p>
        <p className={cx(styles.points, "text")}>
          &nbsp;points away from your weekly goal
        </p>
      </div>
      <div className={cx(styles.progress_circle)}>
        <CircularProgressbarWithChildren
          value={(100 * points) / goal}
          strokeWidth={16}
          styles={buildStyles({
            pathColor: "#E3D150",
            trailColor: "#F9F6DC",
          })}
        >
          <div className={cx(styles.progress_circle_text)}>{points}</div>
          <div className={cx(styles.progress_circle_text)}>Points</div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
});
