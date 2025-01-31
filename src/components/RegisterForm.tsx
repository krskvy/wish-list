import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './RegisterForm.scss'
import { TextField, Button } from '@mui/material';
import AlertMessage from './AlertMessage';
import { alertStatusType } from '../types';
import { useNavigate } from 'react-router-dom';
import { registerUser, logoutUser } from "../store/slices/authSlice";
import { RootState, useAppDispatch } from "../store/store";
import { v4 as uuidv4 } from 'uuid';


const ALERT_STATUS: Record<string, alertStatusType> = {
 passwordsDoNotMatch: {
	severity: 'error',
	message: 'Passwords do not match'
 },
 success: {
	severity: 'success',
	message: 'Registered Successfuly!'
 },
 invalid: {
	severity: 'error',
	message: 'User already exists.'
 }
}

const RegisterForm: React.FC = () => {
	const dispatch = useAppDispatch();
	
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const [isSentRequest, setIsSentRequest] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);
	const [alertStatus, setAlertStatus] = useState<alertStatusType>({severity: 'error', message: ''});
	const navigate = useNavigate();
  const registrationStatus = useSelector((state: RootState) => state.auth.status);

	const sanitizePswd = (password: string): string => {
		return password.trim();
	}

	const processRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSentRequest(true);

    if (sanitizePswd(password) !== sanitizePswd(repeatPassword)) {
			setAlertStatus(ALERT_STATUS.passwordsDoNotMatch);
      setIsSentRequest(false);
      setIsShowAlert(true);
			return;
		}

    dispatch(registerUser({id: uuidv4(), username, password: sanitizePswd(password)}));
	}

  useEffect(() => {
    console.log("Registration Status: ", registrationStatus);

    if (registrationStatus === 'failed') {
      setAlertStatus(ALERT_STATUS.invalid);
      setIsSentRequest(false);
      setIsShowAlert(true);
      return;
    }
    
    if (registrationStatus === 'registered') {
      setAlertStatus(ALERT_STATUS.success);
      setIsShowAlert(true);
      setTimeout(()=>{
        dispatch(logoutUser());
        navigate('/');
      }, 2000);
    }
  }, [registrationStatus, navigate, dispatch]);

	return (
		<form className='register-form' onSubmit={processRegister}>
			<TextField
				className='register-form__input'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				label="Email"
				required/>
			<TextField
				className='register-form__input'
				value={password}
				label='Password'
				onChange={(e) => setPassword(e.target.value)}
        type="password"
				required/>
			<TextField
				className='register-form__input'
				value={repeatPassword}
				label='Repeat password'
				onChange={(e) => setRepeatPassword(e.target.value)}
        type="password"
				required/>
      {isShowAlert ? <AlertMessage {...alertStatus}/> : ''}
			<Button
        disabled={isSentRequest}
				variant="outlined"
				type="submit"
				className='register-form__btn'>
				Register
			</Button>
		</form>
	);
}

export default RegisterForm;