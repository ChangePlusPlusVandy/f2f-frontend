import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

// Select field for authentication
export const AuthSelectBlock = React.forwardRef((props, ref) => {
    const {
        label,
        containerClassName,
        containerStyle,
        value,
        onChange
    } = props;
    
    return <div
        className={cx(styles.selectBlock, containerClassName)}
        style={containerStyle}
    >
        <p
            className={cx(styles.label)}
        >
            {label || ""}
        </p>
        <Select 
            className={cx(styles.select)}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        />
    </div>
});

AuthSelectBlock.propTypes = {
    label: PropTypes.string.isRequired,
    containerClassName: PropTypes.string,
    containerStyle: PropTypes.objectOf(PropTypes.string),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, // (value: String) => void
    hide: PropTypes.bool
}