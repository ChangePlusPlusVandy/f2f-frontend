import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./pages/AuthLayout";
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
      <Route path='/' element={<AuthLayout/>}>
          {/* <Route index element={<LogIn toast={toast}/>}/> */}
          <Route path='sign-up' element={<SignUp toast={toast}/>}/>
          {/* <Route path='resetPassword' element={<ResetPassword toast={toast}/>}/> */}
        </Route>
        {/* <PrivateRoute exact path="/" component={Home} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  // </AuthProvider>
  );
};

export default App;
