import React from 'react';
import { Grid2 } from '@mui/material';
import RegisterForm from '../RegisterForm';

const RegisterPage: React.FC = () => {
	return (
		<Grid2 container spacing={2} className="page-content">
			<Grid2 size={12}>
				<RegisterForm/>
			</Grid2>
    </Grid2>
	);
}

export default RegisterPage;