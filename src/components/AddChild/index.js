import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./index.module.css";
import { useWindowSize } from "../../lib/hooks";
import {
  AUTH_INPUT_LABELS,
  SCHOOL_DISTRICT,
  DISABILITY,
  WINDOW_TYPE,
  STATUS_CODE,
} from "../../lib/constants";
import { AuthInputBlock } from "../../components/AuthInputBlock";
import { AuthSelectBlock } from "../../components/AuthSelectBlock";
import { AuthButton } from "../AuthButton";

const cx = classNames.bind(styles);

export function AddChild(props) {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;

  const [child, setChild] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [leavePage, setLeavePage] = useState(false);

  useEffect(() => {
    if (leavePage) {
      if (submitted) {
        props.setChildren([...props.currChildren, child]);
      }
      props.setAddChild(false);
    }
  }, [leavePage]);

  const checkValidBirthday = () => {
    const birthday = child.birthDate;

    // Regular expression for MM-DD-YYYY format
    const regex = /^\d{2}-\d{2}-\d{4}$/;

    // Check if the input matches the regular expression
    if (!regex.test(birthday)) {
      return false;
    }

    // Check if the date is valid
    const parts = birthday.split("-");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // JavaScript Date object will automatically handle leap year
    const date = new Date(year, month - 1, day);
    const isValid =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    return isValid;
  };

  const onSubmit = async () => {
    if (!child.firstName) props.toast("Please provide your child's name");
    else if (!child.birthDate)
      props.toast("Please provide your child's birthdate");
    else if (!checkValidBirthday(child.birthDate))
      props.toast("Please enter the birthday in the correct format");
    else if (!child.schoolDistrict)
      props.toast("Please provide your child's school district");
    else if (!child.disabilities)
      props.toast("Please provide your child's disability");
    else {
      setSubmitted(true);
      setLeavePage(true);
    }
  };

  return (
    <div className={cx(styles.content)}>
      <div className={cx(styles.popup)}>
        <div classname={cx(styles.close_wrapper)}>
          <div className={cx(styles.close)}>
            <AuthButton
              label={"X"}
              onClick={() => setLeavePage(true)}
              style={{
                borderRadius: "30%",
                height: "auto",
                width: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
          </div>{" "}
        </div>
        <h1 className={cx(styles.title)}>Add a Child</h1>
        <AuthInputBlock
          label={AUTH_INPUT_LABELS.FIRST_NAME}
          containerClassName={cx(styles.inputBlock)}
          value={child.firstName}
          isMobile={isMobile}
          onChange={(value) => setChild({ ...child, firstName: value })}
        />
        <AuthInputBlock
          label={AUTH_INPUT_LABELS.BIRTH_DATE}
          containerClassName={cx(styles.inputBlock)}
          value={child.birthDate}
          placeholder={"MM-DD-YYYY"}
          isMobile={isMobile}
          onChange={(value) => setChild({ ...child, birthDate: value })}
        />
        <AuthSelectBlock
          label={AUTH_INPUT_LABELS.SCHOOL_DISTRICT}
          containerClassName={cx(styles.selectBlock)}
          options={SCHOOL_DISTRICT}
          value={child.schoolDistrict}
          isClearable={true}
          isMulti={false}
          isMobile={isMobile}
          onChange={(value) =>
            setChild({ ...child, schoolDistrict: value.label })
          }
        />
        <AuthSelectBlock
          label={AUTH_INPUT_LABELS.DISABILITY}
          containerClassName={cx(styles.selectBlock)}
          options={DISABILITY}
          placeholder={"Select Disabilities..."}
          isClearable={true}
          isMulti={true}
          isMobile={isMobile}
          onChange={(value) => setChild({ ...child, disabilities: value })}
        />
        <AuthButton
          className={cx(styles.register)}
          label={AUTH_INPUT_LABELS.ADD_CHILD}
          // pass child object back to sign up page
          onClick={onSubmit}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}
