import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BackArrow } from "../../components/BackArrow";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import Clipboard from "../../images/Clipboard.png";
import A from "../../images/A.png";
import ResourceCard from "../../components/TaskResource";
import { useContext } from "react";
import { AppContext } from "../../lib/AppContext";

const cx = classNames.bind(styles);

export const TaskDetails = () => {
  // const [taskName, setTaskName] = useState();
  // const [description, setDescription] = useState();
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(Clipboard);
  const [resource, setResources] = useState([]);
  const location = useLocation();
  const taskId = location.state?.id;
  const { taskTitle, setTaskTitle, taskDetail, setTaskDetail } =
    useContext(AppContext);

  useEffect(() => {
    const url = "/tasks/" + taskId;
    fetch(process.env.REACT_APP_HOST_URL + url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTaskTitle(data.title);
        setTaskDetail(data.details);
        // setTaskName(data.title);
        // setDescription(data.details);
        // setStatus(data.status);
        // setImage(data.img);
        // setResources(data.resources);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={cx(styles.content)}>
      {/* <header className={cx(styles.header)}>
        <div className={cx(styles.header, "title")}>
          <h1>{taskName}</h1>
        </div>
      </header> */}
      <div className={cx(styles.info)}>
        {/* <div className={cx(styles.info, "desc")}>
          <p>{description}</p>
        </div> */}

        <div className={cx(styles.info, "status")}>
          <p>Status: {status ? "Complete" : "Incomplete"}</p>
        </div>

        <div className={cx(styles.image)}>
          <img src={image} alt="" />
        </div>
      </div>
      <div className={cx(styles.resources)}>
        <div className={cx(styles.resources, "title")}>
          <p>Resources:</p>
        </div>

        <div className={cx(styles.resources, "content")}>
          {resource.map((res) => {
            return <ResourceCard key={res.title} resource={res} />;
          })}
        </div>
      </div>
    </div>
  );
};

// need to import image/svg from backend
// for page and each resource card
