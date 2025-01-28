import React from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Header from './Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App: React.FC = () => {
  return (
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<DashboardPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
      </div>
  );
}

export default App;
