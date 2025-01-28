import React, { useState } from 'react';
import './LoginForm.scss'
import { TextField, Button } from '@mui/material';
import { authService } from "../services/authService";
import { alertStatusType } from '../types';
import AlertMessage from './AlertMessage';
import { useNavigate } from 'react-router-dom';

const STATUS: Record<string, alertStatusType> = {
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
	const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
	const [isSentRequest, setIsSentRequest] = useState<boolean>(false);
	const [loginStatus, setLoginStatus] = useState<alertStatusType>({severity: 'error', message: ''});
	const navigate = useNavigate();

	const showAlertMessage = ({severity, message}: alertStatusType) => {
		return <AlertMessage {...{severity, message}}/>;
	}

	const processLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSentRequest(true);

		const success = authService.login({username, password});
		if (!success) {
			authService.setCurrentUser({username, password});
			setLoginStatus(STATUS.invalid);
		}

		setLoginStatus(STATUS.success);
		setTimeout(()=>{
			navigate('/');
		}, 2000);
	}

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
			<Button
				variant="outlined"
				type="submit"
				className='login-form__btn'>
				Login
			</Button>
			{isSentRequest ? showAlertMessage(loginStatus) : ''}
		</form>
	);
}

export default LoginForm;