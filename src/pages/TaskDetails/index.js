import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { ReactComponent as BackArrow } from "../../svg/Vector.svg";
import { ReactComponent as Clipboard } from "../../svg/Clipboard.svg";
import { ReactComponent as Archer } from "../../svg/A.svg";

const cx = classNames.bind(styles);

function ResourceCard(props) {
  return (
    <div className={cx(styles.card_content)}>
      <div className={cx(styles.card_info)}>
        <h3 className={cx(styles.card_title)}>{props.title}</h3>
        <p className={cx(styles.card_desc)}>{props.desc}</p>
      </div>
      <div className={cx(styles.card_img)}>{props.icon}</div>
    </div>
  );
}

export const TaskDetails = () => {
  const [taskName, setTaskName] = useState("Medicaid Waitlist");
  const [description, setDescription] = useState(
    "Call 700-432-3456 and ask to be put on the Medicaid and associated waitlists."
  );
  const [status, setStatus] = useState(false);
  const [Image, setImage] = useState(Clipboard);
  const [resource, setResources] = useState([
    {
      title: "Medicaid Waitlist 101",
      desc: "Archer Consulting: Provides eligibility requirements, service companions, etc.",
      img: <Archer />,
    },
  ]);

  useEffect(() => {
    fetch("/resources")
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

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

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
          <Image />
        </div>
      </div>
      <div className={cx(styles.resources)}>
        <div className={cx(styles.resources, "title")}>
          <p>Resources:</p>
        </div>

        <div className={cx(styles.resources, "content")}>
          {resource.map((res) => {
            return (
              <ResourceCard
                key={res.title}
                title={res.title}
                desc={res.desc}
                icon={res.img}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// need to import image/svg from backend
// for page and each resource card
