import styles from "./index.module.css";
import classNames from "classnames/bind";
import {
  AUTH_INPUT_LABELS,
  SCHOOL_DISTRICT,
  DISABILITY,
  WINDOW_TYPE,
  STATUS_CODE,
} from "../../lib/constants";
import { AuthInputBlock } from "../../components/AuthInputBlock";
import { AuthSelectBlock } from "../../components/AuthSelectBlock";
import { AuthButton } from "../../components/AuthButton";
import { useEffect, useState } from "react";
import { signUp, sendVerificationEmail } from "../../lib/services";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../lib/hooks";
const cx = classNames.bind(styles);

// Register page for authentication
export const SignUp = ({ toast }) => {
  const navigate = useNavigate();
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [schoolDistrict, setSchoolDistrict] = useState("");
  const [disability, setDisability] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verifCode, setVerifCode] = useState(-1);

  useEffect(() => {
    console.log(verifCode);
    //navigate or make visibl
  }, [verifCode]);

  const onRegister = () => {
    if (!email) toast("Please provide your email");
    else if (!password) toast("Please provide your password");
    else if (password.length < 8) toast("Password length must be at least 8");
    else if (password !== repeatPassword) toast("Passwords mismatch");
    else if (!firstName) toast("Please provide your first name");
    else if (!lastName) toast("Please provide your last name");
    else if (!schoolDistrict)
      toast("Please provide your children's school district");
    else if (!disability) toast("Please provide your children's disabilities");
    else if (!zipCode) toast("Please provide your zip code");
    else if (!phoneNumber) toast("Please provide your phone number");
    else {
      // send response to backend and create a record
      signUp({
        email,
        password,
        firstName,
        lastName,
        schoolDistrict,
        zipCode,
        phoneNumber,
      })
        .then((res) => {
          console.log(res);
          let message = res.message;
          //make constants later
          console.log(message);
          if (message === "toLogin") {
            console.log("1");
            navigate("/login");
          }
          if (message === "sendVerification") {
            sendVerificationEmail(email).then((code) => {
              setVerifCode(code);
            });
            //if input code === code , we continue
          }
          if (message === "sendSFForm") {
            console.log("3");
            // navigate("/createUser")
          }
        })
        .catch((err) => toast("Internal error"));
    }
  };

  return (
    <>
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.EMAIL}
        containerClassName={cx(styles.inputBlock)}
        value={email}
        onChange={setEmail}
        isMobile={isMobile}
      />
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.PASSWORD}
        containerClassName={cx(styles.inputBlock)}
        value={password}
        onChange={setPassword}
        isMobile={isMobile}
      />
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.CONFIRM_PASSWORD}
        containerClassName={cx(styles.inputBlock)}
        value={repeatPassword}
        onChange={setRepeatPassword}
        isMobile={isMobile}
      />
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.FIRST_NAME}
        containerClassName={cx(styles.inputBlock)}
        value={firstName}
        onChange={setFirstName}
        isMobile={isMobile}
      />
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.LAST_NAME}
        containerClassName={cx(styles.inputBlock)}
        value={lastName}
        onChange={setLastName}
        isMobile={isMobile}
      />
      <AuthSelectBlock
        label={AUTH_INPUT_LABELS.SCHOOL_DISTRICT}
        containerClassName={cx(styles.selectBlock)}
        options={SCHOOL_DISTRICT}
        onChange={setSchoolDistrict}
        placeholder={"Select School District..."}
        isClearable={true}
        isMulti={false}
        isMobile={isMobile}
      />
      <AuthSelectBlock
        label={AUTH_INPUT_LABELS.DISABILITY}
        containerClassName={cx(styles.selectBlock)}
        options={DISABILITY}
        onChange={setDisability}
        placeholder={"Select Disabilities..."}
        isClearable={true}
        isMulti={true}
        isMobile={isMobile}
      />
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.ZIP_CODE}
        containerClassName={cx(styles.inputBlock)}
        value={zipCode}
        onChange={setZipCode}
        isMobile={isMobile}
      />
      <AuthInputBlock
        label={AUTH_INPUT_LABELS.PHONE_NUMBER}
        containerClassName={cx(styles.inputBlock)}
        value={phoneNumber}
        onChange={setPhoneNumber}
        isMobile={isMobile}
      />
      <AuthButton
        className={cx(styles.register)}
        label={AUTH_INPUT_LABELS.SIGN_UP}
        onClick={onRegister}
        isMobile={isMobile}
      />
    </>
  );
};
