import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useState } from 'react';
const cx = classNames.bind(styles);

// Select field for authentication
export const AuthSelectBlock = React.forwardRef((props, ref) => {
    const {
        label,
        containerClassName,
        height = 25,
        options,
        onChange,
        placeholder,
        isClearable,
        isMulti
    } = props;

    const [selected, setSelected] = useState();
    
// styles for react-select
const filterSelectStyles = {
    container: (provided) => ({
        ...provided,
        width: "100%",
        height: '20px',
        lineHeight: '20px',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '10px',
        border: '1px solid rgba(221, 223, 226, 1)',
    }),
    option: (provided) => ({
        ...provided,
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '13.3px',
        letterSpacing: '0.6px',
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '13.3px',
        color: 'rgba(186, 188, 193, 1)',
        lineHeight: '25px'
    }),
};
    return <div
        className={cx(styles.selectBlock, containerClassName)}
    >
    <p
        className={cx(styles.label)}
    >
        {label || ""}
    </p>
    <Select
        value={selected}
        onChange={(options) => {
            setSelected(options);
            onChange(options);
        }}
        getOptionValue={option=>option.label}
        options={options}
        styles={filterSelectStyles}
        menuPortalTarget={document.body}
        isClearable={isClearable}
        isMulti={isMulti}
        placeholder={placeholder}
    />
</div>
});

AuthSelectBlock.propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    options: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired, 
    placeholder: PropTypes.string,
    isClearable: PropTypes.bool
}