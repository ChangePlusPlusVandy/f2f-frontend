import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Input field for authentication
export const AuthInputBlock = (props) => {
    const {
        label,
        containerClassName,
        containerStyle,
        value,
        onChange
    } = props;
    
    return <div
        className={cx(styles.inputBlock, containerClassName)}
        style={containerStyle}
    >
        <p
            className={cx(styles.label)}
        >
            {label || ""}
        </p>
        <input 
            className={cx(styles.input)}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
};

AuthInputBlock.propTypes = {
    label: PropTypes.string.isRequired,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.objectOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, // (value: String) => void
    hide: PropTypes.bool
}