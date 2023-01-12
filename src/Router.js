import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import PrivateRoute from "./pages/PrivateRoute";

// Routes
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgetPassword";
import { HomeLayout } from "./pages/HomeLayout";

const Router = () => {
  // use PrivateRoute for protected routes
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <PrivateRoute exact path="/" component={Home} /> */}
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route path='/home' component={<HomeLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
