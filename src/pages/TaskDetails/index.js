import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { ReactComponent as BackArrow } from "../../svg/Vector.svg";
import Clipboard from "../../images/Clipboard.png";
import A from "../../images/A.png";
import ResourceCard from "../../components/TaskResource";
import { ROUTES } from "../../lib/constants";

const cx = classNames.bind(styles);

export const TaskDetails = () => {
  const [taskName, setTaskName] = useState("Medicaid Waitlist");
  const [description, setDescription] = useState(
    "Call 700-432-3456 and ask to be put on the Medicaid and associated waitlists."
  );
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState(Clipboard);
  const [resource, setResources] = useState([
    {
      title: "Medicaid Waitlist 101",
      desc: "Archer Consulting: Provides eligibility requirements, service companions, etc.",
      img: A,
    },
  ]);

  const navigate = useNavigate();
  const loc = useLocation();
  const goBack = () => {
    navigate(ROUTES.ALL_TASKS);
  };

  console.log(loc.state.id);

  useEffect(() => {
    fetch("/resources") //add task id (loc.state.id)
      .then((response) => response.json())
      .then((data) => {
        setTaskName(data.name);
        setDescription(data.desc);
        setStatus(data.status);
        setImage(data.svg);
        setResources(data.resources);
      })
      .catch((error) => console.log(error));
  }, []);

  

  return (
    <div className={cx(styles.content)}>
      <header className={cx(styles.header)}>
        <div className={cx(styles.back_arrow)} onClick={goBack}>
          <BackArrow />
        </div>
        <div className={cx(styles.header, "title")}>
          <h1>{taskName}</h1>
        </div>
      </header>
      <div className={cx(styles.info)}>
        <div className={cx(styles.info, "desc")}>
          <p>{description}</p>
        </div>

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
