import styles from "./index.module.css";
import classNames from "classnames/bind";
import { UpcomingComponent } from "../../components/UpcomingComponent";
import { useWindowSize } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { WINDOW_TYPE, TIMEOUT } from "../../lib/constants";
import { getChildrenTasksArray } from "../../lib/services";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

// Upcoming events
export const Upcoming = ({ toast }) => {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const [taskArray, setTaskArray] = useState([]);
  //TODO: get information using cache
  const childrenId = JSON.parse(localStorage.getItem("children"));
  const [timer, setTimer] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getChildrenTasksArray(childrenId, true, taskArray, setTaskArray);
  }, []);

  const deduplicatedList = taskArray.flat().filter((obj, index, self) => {
    return index === self.findIndex((o) => o._id === obj._id);
  });

  useEffect(() => {
    console.log(localStorage);
    setTimer(
      setTimeout(() => {
        localStorage.clear();
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
            content={task.details}
            completed={task.completed}
            priority={task.priority}
            childId={task.childId}
            isMobile={isMobile}
          />
        ))}
      </div>
    </>
  );
};
