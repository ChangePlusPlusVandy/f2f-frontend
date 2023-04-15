import React from "react";
import styles from "./index.module.css";
import classNames from "classnames/bind";
import { PointsDisplay } from "../PointsDisplay";
import ReactSlidy from "react-slidy";
import "react-slidy/lib/styles.css";

const cx = classNames.bind(styles);

// build a page slider component
export const Slider = (props) => {
  const { childrenId } = props;

  return (
    <ReactSlidy infiniteLoop>
      {childrenId.map((childId) => (
        <PointsDisplay childId={childId} />
      ))}
    </ReactSlidy>
  );
};
