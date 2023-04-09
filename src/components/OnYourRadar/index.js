import styles from "./index.module.css";
import classNames from "classnames/bind";
import React from "react";
import { useState, useEffect } from "react";
import { getChildrenTasksArray } from "../../lib/services";

const cx = classNames.bind(styles);

export const OnYourRadar = React.forwardRef((props, ref) => {
  const { childrenId } = props;
  const [hpList, sethpList] = useState([]);
  const [elseList, setElseList] = useState([]);

  useEffect(() => {
    getChildrenTasksArray(childrenId, true, hpList, sethpList);
    getChildrenTasksArray(childrenId, false, elseList, setElseList);
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

  return (
    <div className={cx(styles.todo_div)}>
      <h1 className={cx(styles.radar)}>On Your Radar</h1>
      <h2 className={cx(styles.priority)}>High Priority</h2>
      <p className={cx(styles.list)}>{hpElements}</p>
      <h2 className={cx(styles.priority, "else")}>All Tasks</h2>
      <p className={cx(styles.list)}>{elseElements}</p>
    </div>
  );
});
