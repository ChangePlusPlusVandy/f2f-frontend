import styles from "./index.module.css";
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import { CheckBox } from "../CheckBox";
import { checkEvent } from "../../lib/services";
import React from "react";
const cx = classNames.bind(styles);

export const UpcomingComponent = (props) => {
  const navigate = useNavigate();
  const { id, title, time, content, childrenId, isMobile } = props;
  const [checked, setChecked] = useState(false);
  const [color, setColor] = useState("#0198BA26");

  useEffect(() => {
    // randomize color for the display block
    const colors = ["#0198BA26", "#E3D15033", "#8B567478"];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  }, []);

  const handleChecked = () => {
    setChecked(!checked);
    // send response to backend and set a task checked
    const url = "/children/";
    fetch(process.env.REACT_APP_HOST_URL + url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(inputObj),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div
        className={cx(styles.upcomingWrapper)}
        style={{
          backgroundColor: color,
        }}
      >
        <div
          className={cx(styles.header, {
            [styles.mobile]: isMobile,
          })}
        >
          <p
            className={cx(styles.title, {
              [styles.mobile]: isMobile,
            })}
          >
            {title}
          </p>
          <CheckBox value={checked} onChange={handleChecked} />
        </div>
        {/* <img
                src={upcomingIcon}
                className={cx(styles.upcomingIcon)}
                ref={imageEle}
            /> */}
        <p
          className={cx(styles.time, {
            [styles.mobile]: isMobile,
          })}
          onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { id } })}
        >
          {time}
        </p>
        <p
          className={cx(styles.content, {
            [styles.mobile]: isMobile,
          })}
          onClick={() => navigate(ROUTES.TASK_DETAILS, { state: { id } })}
        >
          {content}
        </p>
      </div>
    </>
  );
};
