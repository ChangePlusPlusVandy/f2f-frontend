import React, { useState, useEffect, createContext } from "react";
import classNames from "classnames/bind";
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import styles from "./index.module.css";
import backArrow from "../../images/Vector.png";

const cx = classNames.bind(styles);

export const BackArrow = ({page}) => {
    const navigate = useNavigate();
    const goBack = () => {
		navigate(-1);
	}

    return <div className={cx(styles.back_arrow)} onClick={goBack}>
    <img src={backArrow} alt="" />
  </div>

}