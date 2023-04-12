import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { useState, useEffect } from "react";
import { getAgeGivenBirthday, formGetRequest } from "../../lib/utils";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const cx = classNames.bind(styles);

export const PointsDisplay = React.forwardRef((props, ref) => {
  const { childId } = props;
  const [goal, setGoal] = useState(100);
  const [points, setPoints] = useState(0);
  const [childName, setChildName] = useState("");

  useEffect(() => {
    // get child's name and disabilities
    const childUrl = "/children/" + childId;
    fetch(process.env.REACT_APP_HOST_URL + childUrl)
      .then((response) => response.json())
      .then((childrenData) => {
        const childName = childrenData.firstName;
        setChildName(childName);
        const age = getAgeGivenBirthday(childrenData.birthDate);
        const completedTasks = childrenData.completedTasks;
        setPoints(completedTasks.length);
        const params = {
          disabilities: JSON.stringify(childrenData.disabilities),
          age: JSON.stringify(age),
        };

        // get tasks based on children's attributes
        const url = formGetRequest("/tasks/byAttributes/", params);
        fetch(process.env.REACT_APP_HOST_URL + url)
          .then((response) => response.json())
          .then((taskData) => {
            setGoal(taskData.length);
          })
          .catch((error) => console.log(error));
      });
  }, []);

  return (
    <div className={cx(styles.pointsBlock)}>
      <div className={cx(styles.text_div)}>
        <p className={cx(styles.name)}>{childName}</p>
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
