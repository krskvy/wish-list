import  React, { useEffect } from 'react';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import Header from './Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { loadWishlist } from "../store/slices/wishlistSlice";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  
  useEffect(() => {
    if (currentUser) {
      dispatch(loadWishlist(currentUser.id));
    }
  }, [currentUser, dispatch]);


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
