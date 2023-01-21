import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useWindowSize } from '../../lib/hooks';
import PropTypes from 'prop-types';
import React from 'react';
const cx = classNames.bind(styles);

export const UpcomingComponent = (props) => {
    const {
        title,
        time,
        content,
    } = props;

    // TODO: randomize color

    return <>
        <div 
            className={cx(styles.upcomingWrapper)} 
        >
            <p className={cx(styles.title)}>{title}</p>
            {/* <img
                src={upcomingIcon}
                className={cx(styles.upcomingIcon)}
                ref={imageEle}
            /> */}
            <p className={cx(styles.time)}>{time}</p>
            <p className={cx(styles.content)}>{content}</p>
        </div>
    </>
};
