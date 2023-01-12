import React from "react";
import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";

// Routes
import Home from "./pages/Home/index";
import Login from "./pages/Login/index";
import Register from "./pages/Register/index";
import Profile from "./pages/Profile/index";
import ForgotPassword from "./pages/ForgetPassword/index";

const Router = () => {
  // use PrivateRoute for protected routes
  return (
    <AuthProvider>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
      </Switch>
    </AuthProvider>
  );
};

export default Router;
