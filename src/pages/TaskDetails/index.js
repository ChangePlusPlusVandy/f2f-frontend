import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import ResourceCard from "../../components/TaskResource";
import clipboardImage from "../../images/Clipboard.png";
import { useContext } from "react";
import { AppContext } from "../../lib/AppContext";
import { checkEvent, uncheckEvent } from "../../lib/services";
import { separateWebsiteLink } from "../../lib/utils";
import { CheckBox } from "../../components/CheckBox";

const cx = classNames.bind(styles);

export const TaskDetails = () => {
  const location = useLocation();
  const taskId = location.state?.taskId;
  const completed = location.state?.completed;
  const childId = location.state?.childId;

  const { setTaskTitle, setTaskDetail } = useContext(AppContext);

  const [resources, setResources] = useState([]);
  const [checked, setChecked] = useState(completed);

  useEffect(() => {
    const url = "/tasks/" + taskId;
    fetch(process.env.REACT_APP_HOST_URL + url)
      .then((response) => response.json())
      .then((data) => {
        setTaskTitle(data.title);
        const details = data.details;
        const links = separateWebsiteLink(details);
        setResources(links.links);
        setTaskDetail(links.otherStrings);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChecked = ({}) => {
    if (checked) uncheckEvent(childId, taskId);
    else checkEvent(childId, taskId);
    setChecked(!checked);
  };

  return (
    <div className={cx(styles.content)}>
      <div className={cx(styles.info)}>
        <div className={cx(styles.info, "status")}>
          <p> Status: </p>
          <CheckBox value={checked} onChange={handleChecked} />
        </div>
        <div className={cx(styles.image)}>
          <img src={clipboardImage} alt="" />
        </div>
      </div>
      {resources.length !== 0 && (
        <div className={cx(styles.resources)}>
          <div className={cx(styles.resources, "title")}>
            <p>Resources:</p>
          </div>
          <div className={cx(styles.resources, "content")}>
            {resources.map((resource) => {
              return <ResourceCard key={resource} resource={resource} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// need to import image/svg from backend
// for page and each resource card
