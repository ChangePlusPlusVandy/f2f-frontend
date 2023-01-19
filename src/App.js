import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout } from "./pages/AuthLayout";
// import { AuthProvider } from "./lib/AuthContext";
// Routes
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgetPassword";
import { Roadmap } from "./pages/Roadmap";
import { Community } from "./pages/Community";
import { TaskDetails } from "./pages/TaskDetails";
import { AllTasks } from "./pages/AllTasks";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="sign-up" element={<SignUp toast={toast} />} />
        </Route>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="home" element={<Home />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="community" element={<Community />} />
        <Route path="login" element={<Login />} />
        <Route path="task-details" element={<TaskDetails />} />
        <Route path="tasks" element={<AllTasks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
