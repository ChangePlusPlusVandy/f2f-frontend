import React, { useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";
import Arrow from "../../images/DownArrow.png";

const cx = classNames.bind(styles);

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className={cx(styles.content)}>
      <div className={cx(styles.dropdown_wrapper)}>
        <select
          value={selectedOption}
          onChange={handleChange}
          className={cx(styles.dropdown)}
          style={{ width: "auto", textAlign: "center" }}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={cx(styles.arrow)}>
        <img src={Arrow} alt="" />
      </div>
    </div>
  );
};

export default Dropdown;

//need to center text of the select element
