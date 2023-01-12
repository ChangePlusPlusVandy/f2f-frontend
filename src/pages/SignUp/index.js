import styles from './index.module.css';
import classNames from 'classnames/bind';
import { AUTH_INPUT_LABELS, STATUS_CODE } from '../../lib/constants';
import { AuthInputBlock } from '../../components/AuthInputBlock';
import { AuthButton } from '../../components/AuthButton';
import { useState } from 'react';
// import { signUp } from '../../lib/services';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

//{email, password, firstname, lastname, schooldistrict, zipcode, phonenumber}
// Register page for authentication
export const SignUp = ({ toast }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [schoolDistrict, setSchoolDistrict] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const onRegister = () => {
        if(!email) toast('Please provide your email');
        else if(!password) toast('Please provide your password');
        else if(password.length < 8) toast('Password length must be at least 8');
        else if(password !== repeatPassword) toast('Passwords mismatch');
        else if(!firstName) toast('Please provide your first name');
        else if(!lastName) toast('Please provide your last name');
        else if(!schoolDistrict) toast('Please provide your children\'s school district');
        else if(!zipCode) toast('Please provide your zip code');
        else if(!phoneNumber) toast('Please provide your phone number');
        else {
            //send response to backend and create a record
            // register({email, password, firstName, lastName, schoolDistrict, zipCode, phoneNumber})
            //     .then(res => {
            //         const { status } = res;
            //         if(status === STATUS_CODE.SUCESS) navigate('/');
            //     })
            //     .catch(err => toast('Internal error'));
        }
    }

    return <>
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.EMAIL}
            containerClassName={cx(styles.inputBlock)}
            value={email}
            onChange={setEmail}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.PASSWORD}
            containerClassName={cx(styles.inputBlock)}
            value={password}
            onChange={setPassword}
            hide={true}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.CONFIRM_PASSWORD}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setRepeatPassword}
            hide={true}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.FIRST_NAME}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setFirstName}
            hide={true}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.LAST_NAME}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setLastName}
            hide={true}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.SCHOOL_DISTRICT}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setSchoolDistrict}
            hide={true}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.ZIP_CODE}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setZipCode}
            hide={true}
        />
        <AuthInputBlock
            label={AUTH_INPUT_LABELS.PHONE_NUMBER}
            containerClassName={cx(styles.inputBlock)}
            value={repeatPassword}
            onChange={setPhoneNumber}
            hide={true}
        />
        <AuthButton
            className={cx(styles.register)}
            label={AUTH_INPUT_LABELS.REGISTER}
            onClick={onRegister}
        />
    </>
}