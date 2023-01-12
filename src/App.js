import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";

// Routes
import { Home } from "./pages/Home";
import { ForgotPassword } from "./pages/ForgetPassword";
import { Roadmap } from "./pages/Roadmap";
import { Community } from "./pages/Community";

const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="home" element={<Home />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
