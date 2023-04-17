import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { useState, useEffect } from "react";
import { getChildrenTasksArray } from "../../lib/services";
import { Loader } from "../../pages/LoadScreen";

const cx = classNames.bind(styles);

export const OnYourRadar = React.forwardRef((props, ref) => {
  const { childrenId, isMobile } = props;
  const [hpList, sethpList] = useState([]);
  const [elseList, setElseList] = useState([]);

  useEffect(async () => {
    const { taskArray } = await getChildrenTasksArray(childrenId, true);
    sethpList(taskArray);
  }, []);

  useEffect(async () => {
    const { taskArray } = await getChildrenTasksArray(childrenId, false);
    setElseList(taskArray);
  }, []);

  const hpElements = hpList.flat().map((thing, index) => (
    <p className={styles.list} key={index}>
      {index + 1 + ". " + thing.title}
    </p>
  ));
  const elseElements = elseList.flat().map((thing, index) => (
    <p className={styles.list} key={index}>
      {index + 1 + ". " + thing.title}
    </p>
  ));

  if (hpElements.length === 0 || elseElements.length === 0) {
    return <Loader />;
  }

  return (
    <div
      className={cx(styles.todo_div, {
        [styles.mobile]: isMobile,
      })}
    >
      <h1
        className={cx(styles.radar, {
          [styles.mobile]: isMobile,
        })}
      >
        On Your Radar
      </h1>
      <div
        className={cx(styles.priorityParent, {
          [styles.mobile]: isMobile,
        })}
      >
        <div
          className={cx(styles.priorityBlock, {
            [styles.mobile]: isMobile,
          })}
        >
          <h2
            className={cx(styles.priority, {
              [styles.mobile]: isMobile,
            })}
          >
            High Priority
          </h2>
          <p
            className={cx(styles.list, {
              [styles.mobile]: isMobile,
            })}
          >
            {hpElements}
          </p>
        </div>
        <div
          className={cx(styles.priorityBlock, {
            [styles.mobile]: isMobile,
          })}
        >
          <h2
            className={cx(styles.priority, "else", {
              [styles.mobile]: isMobile,
            })}
          >
            All Tasks
          </h2>
          <p
            className={cx(styles.list, {
              [styles.mobile]: isMobile,
            })}
          >
            {elseElements}
          </p>
        </div>
      </div>
    </div>
  );
});
