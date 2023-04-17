import styles from "./index.module.css";
import classNames from "classnames/bind";
import { UpcomingComponent } from "../../components/UpcomingComponent";
import { useWindowSize } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { WINDOW_TYPE, TIMEOUT } from "../../lib/constants";
import { getChildrenTasksArray } from "../../lib/services";
import { separateWebsiteLink } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

// Upcoming events
export const Upcoming = ({ toast }) => {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const [taskArray, setTaskArray] = useState([]);
  //TODO: get information using cache
  const childrenId = [
    "63e5c4936d51fdbbbedb5503",
    "643b22b6ee8225a6684ac159",
    "643b22b6ee8225a6684ac15b",
  ];
  const [timer, setTimer] = useState();

  const navigate = useNavigate();

  useEffect(async () => {
    const { taskArray } = await getChildrenTasksArray(childrenId, true);
    setTaskArray(taskArray);
  }, []);

  const deduplicatedList = taskArray.flat().filter((obj, index, self) => {
    return index === self.findIndex((o) => o._id === obj._id);
  });

  useEffect(() => {
    setTimer(
      setTimeout(() => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userID");
        navigate("/login");
      }, TIMEOUT)
    );
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return (
    <>
      <div className={cx(styles.upcomingWrapper)}>
        {deduplicatedList.map((task) => (
          <UpcomingComponent
            key={task._id}
            taskId={task._id}
            title={task.title}
            time={task.timePeriod}
            content={separateWebsiteLink(task.details).otherStrings}
            completed={task.completed}
            priority={task.priority}
            childId={task.childId}
            childName={task.childName}
            isMobile={isMobile}
          />
        ))}
      </div>
    </>
  );
};
