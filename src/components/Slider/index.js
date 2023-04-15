import React from "react";
import styles from "./index.module.css";
import classNames from "classnames/bind";
import { PointsDisplay } from "../PointsDisplay";
import ReactSlidy from "react-slidy";
import "react-slidy/lib/styles.css";
import { getRandomColor } from "../../lib/utils";

const cx = classNames.bind(styles);

// build a page slider component
export const Slider = (props) => {
  const { childrenStats } = props;

  return (
    <ReactSlidy infiniteLoop>
      {childrenStats.map((childStats) => (
        <PointsDisplay
          key={childStats.childId}
          childId={childStats.childId}
          childName={childStats.childName}
          points={childStats.points}
          goal={childStats.goal}
        />
      ))}
    </ReactSlidy>
  );
};
