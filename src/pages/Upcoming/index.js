import styles from "./index.module.css";
import classNames from "classnames/bind";
import { UpcomingComponent } from "../../components/UpcomingComponent";
import { useWindowSize } from "../../lib/hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WINDOW_TYPE, STATUS_CODE } from "../../lib/constants";
import { NavBar } from "../NavBar";
const cx = classNames.bind(styles);

// Upcoming events
export const Upcoming = ({ toast }) => {
  const navigate = useNavigate();
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const [taskArray, setTaskArray] = useState([
    {
      id: 1,
      title: "task1",
      time: "10/20/2024 5:00 pm",
      content:
        "Call 700-432-3456 and ask to be put on the Medicaid and associated waitlists. ",
    },
    {
      id: 2,
      title: "task2",
      time: "10/20/2024 5:00 pm",
      content:
        "Schedule your annual IEP Meeting to make sure your student’s needs are met. ",
    },
    {
      id: 3,
      title: "task3",
      time: "10/20/2024 5:00 pm",
      content:
        "Write your child’s letter of intent to ensure your child’s support if you were to ever be ... ",
    },
  ]);

  // useEffect(() => {
  //     fetch("/upcomingTasks")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setTaskArray(data.taskArray);
  //       })
  //       .catch((error) => console.log(error));
  //   }, []);

  const upcomingList = taskArray.map((task) => {
    return (
      <UpcomingComponent
        key={task.id}
        id={task.id}
        title={task.title}
        time={task.time}
        content={task.content}
        isMobile={isMobile}
      />
    );
  });
  return (
    <>
      <div
        className={cx(styles.upcomingWrapper)}
        style={{
          overflow: "auto",
          overscrollBehavior: "none",
          // height: "92vh",
        }}
      >
        {upcomingList}
      </div>
    </>
  );
};
