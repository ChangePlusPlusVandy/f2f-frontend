import styles from './index.module.css';
import classNames from 'classnames/bind';
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useState } from 'react';
const cx = classNames.bind(styles);

// Select field for authentication
export const AuthSelectBlock = (props) => {
    const {
        label,
        containerClassName,
        options,
        onChange,
        placeholder,
        isClearable,
        isMulti,
        isMobile
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
        fontFamily: "Poppins",
        borderRadius: '10px',
        border: '1px solid rgba(221, 223, 226, 1)',
    }),
    option: (provided) => ({
        ...provided,
        fontFamily: 'Poppins',
        fontSize: '13.3px',
        letterSpacing: '0.6px',
    }),
    placeholder: (provided) => ({
        ...provided,
        fontFamily: 'Poppins',
        fontSize: '13.3px',
        color: '#818181',
        lineHeight: '25px'
    }),
};

const mobileFilterSelectStyles = {
    container: (provided) => ({
        ...provided,
        width: "100%",
        height: '13vw',
        lineHeight: '8vw',
    }),
    control: (provided) => ({
        ...provided,
        borderRadius: '2vw',
        border: '1px solid rgba(221, 223, 226, 1)',
        minHeight: '13vw',
        height: '13vw',
        fontSize: '4vw',
        fontFamily: 'Poppins',
    }),
    option: (provided) => ({
        ...provided,
        fontFamily: 'Poppins',
        fontSize: '4vw',
        letterSpacing: '0.6px',
    }),
    placeholder: (provided) => ({
        ...provided,
        fontFamily: 'Poppins',
        fontSize: '4vw',
        color: '#818181',
        lineHeight: '3vw'
    }),
};

    return <div
        className={cx(styles.selectBlock, containerClassName, {
            [styles.mobile]: isMobile
        })}
    >
    <p
        className={cx(styles.label, {
            [styles.mobile]: isMobile
        })}
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
        styles={isMobile? mobileFilterSelectStyles: filterSelectStyles}
        menuPortalTarget={document.body}
        isClearable={isClearable}
        isMulti={isMulti}
        placeholder={placeholder}
    />
</div>
};

AuthSelectBlock.propTypes = {
    className: PropTypes.string,
    height: PropTypes.number,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired, 
    placeholder: PropTypes.string,
    isClearable: PropTypes.bool,
    isMulti: PropTypes.bool
}