import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './LoginForm.scss'
import { TextField, Button } from '@mui/material';
import { alertStatusType } from '../types';
import AlertMessage from './AlertMessage';
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../store/slices/authSlice";
import { RootState, useAppDispatch } from "../store/store";

const ALERT_STATUS: Record<string, alertStatusType> = {
 success: {
	severity: 'success',
	message: 'Login Successful!'
 },
 invalid: {
	severity: 'error',
	message: 'Wrong username or password.'
 }
}

const LoginForm: React.FC = () => {
	const dispatch = useAppDispatch();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
  const [isSentRequest, setIsSentRequest] = useState<boolean>(false);
	const [alertStatus, setAlertStatus] = useState<alertStatusType>({severity: 'error', message: ''});
  const loginStatus = useSelector((state: RootState) => state.auth.status);
	const navigate = useNavigate();

	const processLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
    dispatch(loginUser({ username, password}));
    setIsSentRequest(true);
	}

  useEffect(() => {  
    if (loginStatus === "failed") {
      setAlertStatus(ALERT_STATUS.invalid);
      setIsSentRequest(false);
      return;
    }
  
    if (loginStatus === 'idle') {
      setAlertStatus(ALERT_STATUS.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [loginStatus, navigate]);

	return (
		<form className='login-form' onSubmit={processLogin}>
			<TextField
				className='login-form__input'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				label="Email"
				required/>
			<TextField
				className='login-form__input'
				value={password}
				label='Password'
				onChange={(e) => setPassword(e.target.value)}
        type="password"
				required/>
      {["idle", "failed"].includes(loginStatus) ? <AlertMessage {...alertStatus}/> : ''}
			<Button
        disabled={isSentRequest}
				variant="outlined"
				type="submit"
				className='login-form__btn'>
				Login
			</Button>
		</form>
	);
}

export default LoginForm;