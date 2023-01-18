import React, { useState } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

const cx = classNames.bind(styles);

const Dropdown = ({ options }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select
        value={selectedOption}
        onChange={handleChange}
        className={cx(styles.dropdown)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

//need to center text of the select element
