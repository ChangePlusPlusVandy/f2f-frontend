import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./lib/AuthContext";

// Routes
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgetPassword";

const App = () => {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route path="sign-up" element={<SignUp />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  // </AuthProvider>
  );
};

export default App;
