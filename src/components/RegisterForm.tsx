import React, { useState } from 'react';
import './RegisterForm.scss'
import { TextField, Button } from '@mui/material';
import { authService } from "../services/authService";
import AlertMessage from './AlertMessage';
import { alertStatusType } from '../types';
import { useNavigate } from 'react-router-dom';


const STATUS: Record<string, alertStatusType> = {
 passwordDoNotMatch: {
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
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [repeatPassword, setRepeatPassword] = useState<string>('');
	const [isSentRequest, setIsSentRequest] = useState<boolean>(false);
	const [registerStatus, setRegisterStatus] = useState<alertStatusType>({severity: 'error', message: ''});
	const navigate = useNavigate();

	const sanitizePswd = (password: string): string => {
		return password.trim();
	}

	const showAlertMessage = ({severity, message}: alertStatusType) => {
		return <AlertMessage {...{severity, message}}/>;
	}

	const processRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsSentRequest(true);

		if (sanitizePswd(password) !== sanitizePswd(repeatPassword)) {
			setRegisterStatus(STATUS.passwordDoNotMatch);
			return;
		}

		const success = authService.register({username, password: sanitizePswd(password)});
		if (!success) {
			setRegisterStatus(STATUS.invalid);
			return;
		}

		setRegisterStatus(STATUS.success);
		authService.setCurrentUser({username, password: sanitizePswd(password)});
		setTimeout(()=>{
			navigate('/');
		}, 2000);
	}

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

			{isSentRequest ? showAlertMessage(registerStatus) : ''}

			<Button
				variant="outlined"
				type="submit"
				className='register-form__btn'>
				Register
			</Button>
		</form>
	);
}

export default RegisterForm;