import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // If the user is logged in, render the component. Otherwise, redirect to login.
  return (
    <Route 
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          navigate ('/login')
        );
      }}
    ></Route>
  );
}
