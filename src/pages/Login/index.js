import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { ReactComponent as ReactLogo } from "../../svg/F2F-logo.svg";
import styles from "./index.module.css";
import { ROUTES } from "../../lib/constants";
import { STATUS_CODE } from "../../lib/constants";

const cx = classNames.bind(styles);

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const userID = checkIfLoggedIn();
    console.log(userID);
    if (userID) {
      navigate("/home");
    }

    // Check if there is a rememberMeToken in the localStorage
    const rememberMeToken = JSON.parse(localStorage.getItem("rememberMeToken"));
    if (rememberMeToken) {
      setRememberMe(true);
      setEmail(rememberMeToken.email);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch(process.env.REACT_APP_HOST_URL + "/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        if (res.message === STATUS_CODE.SUCESS) {
          localStorage.setItem("userID", res.id);
          localStorage.setItem("jwtToken", res.token);
          fetch(process.env.REACT_APP_HOST_URL + "/users/getChildren")
            .then((response) => {
              response.json();
            })
            .then((data) => {
              localStorage.setItem("children", data);
            });
          setIsLoggedIn(true);
        } else {
          setError(res.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
    if (rememberMe) {
      localStorage.setItem(
        "rememberMeToken",
        JSON.stringify({ email, token: "some-token" })
      );
    } else {
      localStorage.removeItem("rememberMeToken");
    }
    setIsLoading(false);
  };

  const checkIfLoggedIn = () => {
    // console.log(localStorage.getItem("jwtToken"));
    const rememberMeToken = localStorage.getItem("jwtToken");
    console.log(rememberMeToken);
    if (rememberMeToken) {
      // User is logged in
      return rememberMeToken;
    } else {
      // User is not logged in
      return null;
    }
  };

  return (
    <div className={cx(styles.content)}>
      <div className={cx(styles.image)}>
        <ReactLogo className={(cx(styles.image), "logo")} />
      </div>
      <div className={cx(styles.header)}>
        <h1 className={cx(styles.header, "title")}>Login</h1>
        <text className={cx(styles.header, "description")}>
          Please sign in to continue
        </text>
      </div>
      <form className={cx(styles.login_form)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className={cx(styles.error)}>{error}</div>}

        <div className={cx(styles.form_extras)}>
          <input
            type="checkbox"
            id="rem"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rem">Remember Me</label>
          <text className={cx(styles.form_extras, "desc")}>
            <Link
              to="/forgot-password"
              style={{ textDecoration: "none", color: "rgb(2, 152, 186)" }}>
              <b>Forgot Password</b>
            </Link>
          </text>
        </div>

        <input
          disabled={isLoading}
          type="submit"
          onClick={handleSubmit}
          value="Log in"
        />
      </form>
      <div className={cx(styles.signup)}>
        <text className={cx(styles.signup, "desc")}>
          Don't have an account?&nbsp;
          <Link
            to={ROUTES.SIGN_UP}
            style={{ textDecoration: "none", color: "rgb(2, 152, 186)" }}>
            <b>Sign up</b>
          </Link>
        </text>
      </div>
    </div>
  );
};
