import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<SignupPage />} />
          <Route path="home" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          <Route path="profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
