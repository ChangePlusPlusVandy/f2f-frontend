import styles from "./index.module.css";
import classNames from "classnames/bind";
import { UpcomingComponent } from "../../components/UpcomingComponent";
import { useWindowSize } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WINDOW_TYPE, STATUS_CODE, PRIORITY_LEVEL } from "../../lib/constants";
import { formGetRequest } from "../../lib/utils";

const cx = classNames.bind(styles);

// Upcoming events
export const Upcoming = ({ toast }) => {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const [taskArray, setTaskArray] = useState([]);
  //TODO: get information using cache
  const disabilities = ["ADHD", "disability2"];
  const age = "Adult";

  useEffect(() => {
    const url = formGetRequest("/tasks/byAttributes/", {
      disabilities: JSON.stringify(disabilities),
      age: JSON.stringify(age),
      priority: JSON.stringify(PRIORITY_LEVEL.PRIORITY_LEVEL),
    });
    fetch(process.env.REACT_APP_HOST_URL + url)
      .then((response) => response.json())
      .then((data) => {
        setTaskArray(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const upcomingList = taskArray.map((task) => {
    return (
      <UpcomingComponent
        key={task._id}
        id={task._id}
        title={task.title}
        time={task.timePeriod}
        content={task.details}
        isMobile={isMobile}
      />
    );
  });
  return (
    <>
      <div className={cx(styles.upcomingWrapper)}>{upcomingList}</div>
    </>
  );
};
