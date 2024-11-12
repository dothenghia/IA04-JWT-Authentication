import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './stores/useAuthStore';

import Layout from "./pages/Layout";
import PrivateRoute from "./components/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  const user = useAuthStore(state => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={user ? <Navigate to="/home" replace /> : <LoginPage />} />
          <Route path="login" element={user ? <Navigate to="/home" replace /> : <LoginPage />} />

          <Route path="register" element={user ? <Navigate to="/home" replace /> : <SignupPage />} />

          <Route path="home" element={<PrivateRoute><HomePage /></PrivateRoute>} />

          <Route path="profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
