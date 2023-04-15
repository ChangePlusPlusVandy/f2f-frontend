import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const cx = classNames.bind(styles);

export const PointsDisplay = React.forwardRef((props, ref) => {
  const { childName, points, goal } = props;

  return (
    <div className={cx(styles.pointsBlock)}>
      <div className={cx(styles.text_div)}>
        <p className={cx(styles.name)}>{childName}</p>
        <p className={cx(styles.points)}>{goal - points}</p>
        <p className={cx(styles.points, "text")}>
          &nbsp;points away from weekly goal
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
