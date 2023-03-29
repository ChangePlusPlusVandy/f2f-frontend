import React from "react";
import { sendVerificationEmail } from "../../lib/services";
import { AuthInputBlock } from "../../components/AuthInputBlock";
import { AuthButton } from "../../components/AuthButton";
import { useEffect, useState } from "react";
import { WINDOW_TYPE, ROUTES } from "../../lib/constants";
import { useWindowSize } from "../../lib/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { signUp } from "../../lib/services";
import classNames from "classnames";
import styles from "./index.module.css";

const cx = classNames.bind(styles);

export function EmailVerification() {
  const isMobile = useWindowSize().type === WINDOW_TYPE.MOBILE;
  const location = useLocation();
  const navigate = useNavigate();
  const inputs = location.state;

  const [verificationCode, setVerificationCode] = useState(-1);
  const [inputCode, setInputCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    sendVerificationEmail(inputs.email).then((res) => {
      setVerificationCode(res);
    });
  }, []);

  function checkCode() {
    if (inputCode === verificationCode) {
      signUp(inputs)
        .then((res) => {
          navigate(ROUTES.LOGIN);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("Incorrect Code");
    }
  }

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.content)}>
        <div className={cx(styles.header)}>Confirm Email</div>
        <div>
          <AuthInputBlock
            label="Enter 6-digit Verification Code"
            value={inputCode}
            onChange={setInputCode}
            isMobile={isMobile}
          />
        </div>

        {error && <div className={cx(styles.error)}>{error}</div>}
        <div className={cx(styles.button)}>
          <AuthButton label="Verify" onClick={checkCode} isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}
