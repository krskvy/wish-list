import React from 'react';
import { Grid2 } from '@mui/material';
import LoginForm from './../LoginForm';

const LoginPage: React.FC = () => {
	return (
		<Grid2 container spacing={2} className="page-content">
			<Grid2 size={12}>
				<LoginForm/>
			</Grid2>
    </Grid2>
	);
}

export default LoginPage;