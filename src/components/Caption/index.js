import { useWindowSize } from '../../lib/hooks';
import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import { WINDOW_TYPE } from '../../lib/constants';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// The caption of each home page
export const Caption = (props) => {
    const {
        text,
        className,
        style,
    } = props;

    const { type } =  useWindowSize();
    const isMobile = type === WINDOW_TYPE.MOBILE;
    
    return <div
        className={cx(styles.caption, className, {
            [styles.mobile]: isMobile
        })}
        style={style}
    >
        {text}
    </div>
};

Caption.propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
}