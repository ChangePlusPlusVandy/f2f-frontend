import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { NavBar } from "../NavBar";
import { useWindowSize } from "../../lib/hooks";
import { WINDOW_TYPE } from "../../lib/constants";
import { OnYourRadar } from "../../components/OnYourRadar";
import { Slider } from "../../components/Slider";
import ProgressBar from "@ramonak/react-progress-bar";
import { formGetRequest, getAgeGivenBirthday } from "../../lib/utils";
import { AuthButton } from "../../components/AuthButton";
import { useNavigate } from "react-router-dom";
import { TIMEOUT } from "../../lib/constants";

const cx = classNames.bind(styles);

export const Home = () => {
  const { width, type } = useWindowSize();
  const isMobile = type === WINDOW_TYPE.MOBILE;
  // TODO: use Cache to store the user
  const [lastName, setLastName] = useState("");
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalGoal, setTotalGoal] = useState(0);
  const [childrenStats, setChildrenStats] = useState([]);
  // TODO: cache
  const childrenId = [
    "63e5c4936d51fdbbbedb5503",
    "63e5c4296d51fdbbbedb5500",
    "63e5c4176d51fdbbbedb54fd",
    "63e5c40a6d51fdbbbedb54fa",
  ];
  const [timer, setTimer] = useState();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getChildrenPointsStats = async () => {
    let totalPoints = 0;
    let totalGoal = 0;
    let childrenStats = [];
    const childPromises = childrenId.map(async (childId) => {
      // get child's name and disabilities
      const childUrl = "/children/" + childId;
      const response = await fetch(process.env.REACT_APP_HOST_URL + childUrl);
      const childData = await response.json();
      const childName = childData.firstName;
      const age = getAgeGivenBirthday(childData.birthDate);
      totalPoints += childData.completedTasks.length;
      const params = {
        disabilities: JSON.stringify(childData.disabilities),
        age: JSON.stringify(age),
      };

      // get tasks based on children's attributes
      const url = formGetRequest("/tasks/byAttributes/", params);
      const taskResponse = await fetch(process.env.REACT_APP_HOST_URL + url);
      const taskData = await taskResponse.json();
      totalGoal += taskData.length;
      const childStats = {
        childId,
        childName,
        points: childData.completedTasks.length,
        goal: taskData.length,
      };
      childrenStats.push(childStats);
    });

    await Promise.all(childPromises); // wait for all child promises to complete

    return { totalPoints, totalGoal, childrenStats };
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  useEffect(async () => {
    const { totalPoints, totalGoal, childrenStats } =
      await getChildrenPointsStats();
    setTotalPoints(totalPoints);
    setTotalGoal(totalGoal);
    setChildrenStats(childrenStats);
    console.log(localStorage);
    setTimer(
      setTimeout(() => {
        localStorage.clear();
        navigate("/login");
      }, TIMEOUT)
    );
  }, []);

  if (childrenStats.length !== childrenId.length) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        overflow: "scroll",
        overscrollBehavior: "none",
        height: "92vh",
      }}>
      <div
        className={cx(styles.container, {
          [styles.mobile]: isMobile,
        })}>
        <div
          className={cx(styles.text_div, "first", {
            [styles.mobile]: isMobile,
          })}>
          <p
            className={cx(styles.welcome, {
              [styles.mobile]: isMobile,
            })}>
            Welcome&nbsp;
          </p>
          <p
            className={cx(styles.welcome, "family", {
              [styles.mobile]: isMobile,
            })}>
            {lastName} Family!
          </p>
        </div>
        <div className={cx(styles.text_div, "second")}>
          <p
            className={cx(styles.cruising, {
              [styles.mobile]: isMobile,
            })}>
            You're&nbsp;
          </p>
          <p
            className={cx(styles.cruising, "color", {
              [styles.mobile]: isMobile,
            })}>
            Cruising it!
          </p>
        </div>
        <ProgressBar
          completed={Math.round((totalPoints / totalGoal) * 100)}
          height="4vh"
          width="95%"
          margin="1.5vh"
          bgColor="#569DAA"
          isLabelVisible={false}
          animateOnRender={true}
        />
        <Slider childrenStats={childrenStats} isMobile={isMobile} />
        <OnYourRadar childrenId={childrenId} isMobile={isMobile} />
        <AuthButton
          label="Logout"
          onClick={() => logout()}
          isMobile={isMobile}
        />
        <NavBar />
      </div>
    </div>
  );
};
