
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
import { useState, useEffect } from "react";
import { signUp, signUpChildren } from "../../lib/services";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "../../lib/hooks";
import { AddChild } from "../../components/AddChild";
const cx = classNames.bind(styles);

//CHANGE THE BOXES FOR EMPTY CHILD
// WHERE IS OUR VERIFICATION
// ADD CHECKS FOR CHILD INFORMATION/HAS ALL CHILD INFORMATION
// DELETE CHILD/EDIT CHILD/VIEW CHILD

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
  const [children, setChildren] = useState([]);

  const [addChildPopUp, setAddChildPopUp] = useState(false);
  const [childIDArray, setChildIDArray] = useState([]);
  const [registered, setRegistered] = useState(false);

  const [test, setTest] = useState("gabe");

  async function addChildren() {
    await children.forEach(async (child) => {
      try {
        let disArray = []
        for (let i = 0; i < child.disabilities.length; i++) {
          disArray.push(child.disabilities[i].label);
        }
        let fn = child.firstName
        let bd = child.birthDate
        let sd = child.schoolDistrict
        const result = await signUpChildren({
          firstName: fn,
          birthDate: bd,
          disabilities: disArray,
          schoolDistrict: sd
        })
        console.log("returned child id")
        console.log(result);
        setChildIDArray([...childIDArray, result]);
      } catch (error) {
        console.log(error);
      }
    })
  }

  useEffect(() => {
    if(childIDArray.length == children.length && registered) {
      console.log(childIDArray)
      signUp({
        email,
        password,
        firstName,
        lastName,
        zipCode,
        phoneNumber,
        children: childIDArray
      })
        .then((res) => {
          const { status } = res;
          if (status === STATUS_CODE.SUCESS) navigate("/login");
        })
        .catch((err) => toast("Internal error"));
    }
  }, [childIDArray])
  

  const onRegister = async () => {
    if (!email) toast("Please provide your email");
    else if (!password) toast("Please provide your password");
    else if (password.length < 8) toast("Password length must be at least 8");
    else if (password !== repeatPassword) toast("Passwords mismatch");
    else if (!firstName) toast("Please provide your first name");
    else if (!lastName) toast("Please provide your last name");
    else if (!zipCode) toast("Please provide your zip code");
    else if (!phoneNumber) toast("Please provide your phone number");
    else {
      // send response to backend and create a record
      addChildren();
      setRegistered(true);
    }
  };


  function renderChildren() {
    const inputs = [];
    if (children.length >= 1) {


      for (let j = 0; j < children.length / 3; j++) {
        const array = [];
        for (let i = j * 3; i < children.length && i < j * 3 + 3; i++) {
          const child = children[i];
          array.push(
            <div key={i} style={{
              backgroundColor: '#dbf0f5',
              borderRadius: '5px',
              padding: '20px',
              margin: '10px',
              fontSize: '30px',
              fontFamily: 'Poppins'
            }}>
              <p style={{ color: 'black', fontWeight: 'bold', margin: '0 10px' }}>{child.firstName}</p>
            </div>
          );
        }
        inputs.push(
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {array[0]}
            {array.length >= 1 && array[1]}
            {array.length >= 2 && array[2]}
          </div>
        )
      }
    }
    return inputs;
  }

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
      {renderChildren()}
      <AuthButton
        className={cx(styles.inputBlock)}
        label={"Add a Child"}
        onClick={() => setAddChildPopUp(true)}
        isMobile={isMobile}
      />
      {addChildPopUp &&
        <AddChild setAddChild={setAddChildPopUp} setChildren={setChildren} currChildren={children} toast={toast} />
      }

      <AuthButton
        className={cx(styles.register)}
        label={AUTH_INPUT_LABELS.SIGN_UP}
        onClick={onRegister}
        isMobile={isMobile}
      />
    </>
  );
};



