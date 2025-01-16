import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Login } from './pages/auth/login/Login';
import './output.css';
import "@fontsource/montserrat";
import { Register } from './pages/auth/register/Register';
import { ProtectedRoutes } from './pages/protected/protected-routes/ProtectedRoutes';
import { Home } from './pages/home/Home';
import { AuthProtected } from './pages/protected/auth/AuthProtected';
import { Chat2 } from './pages/main/chat/Chat2';

function App() {
  return (
    <>
      <div className="h-screen w-screen">
        <Router>
          <Routes>
            <Route element={<AuthProtected />}>
              <Route path='/auth/login' element={<Login />} />
              <Route path='/auth/register' element={<Register />} />
            </Route>
            <Route element={<ProtectedRoutes />}>
              <Route path='/' element={<Home />} />
              <Route path='/chat' element={<Chat2 />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
