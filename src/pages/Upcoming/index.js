import styles from "./index.module.css";
import classNames from "classnames/bind";
import { UpcomingComponent } from "../../components/UpcomingComponent";
import { useWindowSize } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { WINDOW_TYPE } from "../../lib/constants";
import { getChildrenTasksArray } from "../../lib/services";

const cx = classNames.bind(styles);

// Upcoming events
export const Upcoming = ({ toast }) => {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const [taskArray, setTaskArray] = useState([]);
  //TODO: get information using cache
  const childrenId = ["63e5c4936d51fdbbbedb5503"];

  useEffect(() => {
    getChildrenTasksArray(childrenId, true, taskArray, setTaskArray);
  }, []);

  const deduplicatedList = taskArray.flat().filter((obj, index, self) => {
    return index === self.findIndex((o) => o._id === obj._id);
  });

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
