import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HomeLayout } from "./pages/HomeLayout";
import { AppContextProvider } from "./lib/AppContext";

// Routes
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Upcoming } from "./pages/Upcoming";
import { ForgotPassword } from "./pages/ForgetPassword";
import { Roadmap } from "./pages/Roadmap";
import { Community } from "./pages/Community";
import { TaskDetails } from "./pages/TaskDetails";
import { AllTasks } from "./pages/AllTasks";

const App = () => {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
        />
        <Routes>
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/" element={<HomeLayout />}>
            <Route path="sign-up" element={<SignUp toast={toast} />} />
            <Route path="upcoming" element={<Upcoming toast={toast} />} />
            <Route path="tasks" element={<AllTasks toast={toast} />} />
            <Route
              path="task-details"
              element={<TaskDetails toast={toast} />}
            />
            <Route path="roadmap" element={<Roadmap toast={toast} />} />
          </Route>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="community" element={<Community />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
};

export default App;
