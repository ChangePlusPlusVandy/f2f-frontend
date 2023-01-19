import styles from './index.module.css';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { useWindowSize } from '../../lib/hooks';
import PropTypes from 'prop-types';
import React from 'react';
const cx = classNames.bind(styles);

export const UpcomingComponent = React.forwardRef((props, ref) => {
    return <>
        <div 
            className={cx(styles.upcomingWrapper)} 
            // onClick={(event) => {
            //     event.stopPropagation();
            //     event.nativeEvent.stopImmediatePropagation();
            // }}
        > Upcoming component
            {/* <img
                src={upcomingIcon}
                className={cx(styles.upcomingIcon)}
                onClick={onClickIcon}
                ref={imageEle}
            /> */}
        </div>
    </>
});
