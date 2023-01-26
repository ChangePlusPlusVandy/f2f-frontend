import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../lib/constants";
import React from 'react';
const cx = classNames.bind(styles);

export const UpcomingComponent = (props) => {
    const navigate = useNavigate();

    const {
        id,
        title,
        time,
        content,
        isMobile
    } = props;

    const [color, setColor] = useState("#0198BA26");

    useEffect(() => {
        // randomize color for the display block 
        const colors = ['#0198BA26', '#E3D15033', '#8B567478'];
        setColor(colors[Math.floor(Math.random() * colors.length)]);
      }, []);

    return <>
        <div 
            className={cx(styles.upcomingWrapper)} 
            style={{
                backgroundColor: color,
              }}
            onClick={() => navigate(ROUTES.TASK_DETAILS, {state: {id}})}
        >
            <p className={cx(styles.title, {
                [styles.mobile]: isMobile
            })}>{title}</p>
            {/* <img
                src={upcomingIcon}
                className={cx(styles.upcomingIcon)}
                ref={imageEle}
            /> */}
            <p className={cx(styles.time, {
                [styles.mobile]: isMobile
            })}>{time}</p>
            <p className={cx(styles.content, {
                [styles.mobile]: isMobile
            })}>{content}</p>
        </div>
    </>
};
