import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Button for authentication
export const AuthButton = (props) => {
    const {
        className,
        style,
        label,
        onClick,
    } = props;
    return <div
        className={cx(styles.button, className)}
        style={style}
        onClick={onClick}
    >
        {label}
    </div>;
}

AuthButton.protoTypes = {
    classNames: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func // (event) => void
}