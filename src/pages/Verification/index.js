import React from "react";
import { sendVerificationEmail } from "../../lib/services";
import { AuthInputBlock } from "../../components/AuthInputBlock";
import { AuthButton } from "../../components/AuthButton";
import { useEffect, useState } from "react";
import {
    WINDOW_TYPE,
    ROUTES
  } from "../../lib/constants";
import { useWindowSize } from "../../lib/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { signUp } from "../../lib/services";


export function EmailVerification() {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const location = useLocation();
  const navigate = useNavigate();
  const inputs = location.state;

  const [verificationCode, setVerificationCode] = useState(-1);
  const [inputCode, setInputCode] = useState("")

  useEffect(() => {
    sendVerificationEmail(inputs.email).then((res) => {
        console.log("check sent code")
        console.log(inputs)
        
      setVerificationCode(res);
      console.log(verificationCode)
    });
  }, []);

  function checkCode() {
    if (inputCode === verificationCode)  {
        console.log(inputs)
        signUp(inputs).then((res) => {
            navigate(ROUTES.LOGIN)
        }).catch ((err) => {
            console.log(err)
        })
    }
  }
  
  return(
    <div>
        <AuthInputBlock
        label = "Enter 6-digit Verification Code"
        value = {inputCode}
        onChange={setInputCode}
        isMobile={isMobile}
        />
        <AuthButton 
        label="Verify"
        onClick={checkCode}
        isMobile={isMobile}/>
    </div>
  )
}
