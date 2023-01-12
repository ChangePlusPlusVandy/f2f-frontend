import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";

// Routes
import { Home } from "./pages/Home";
import { ForgotPassword } from "./pages/ForgetPassword";

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
