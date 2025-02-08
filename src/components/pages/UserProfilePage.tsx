import React from 'react';
import { Grid2 } from '@mui/material';
import ProfileForm from '../ProfileForm';

const UserProfilePage: React.FC = () => {
	return (
		<Grid2 container spacing={2} className="page-content">
			<Grid2 size={12}>
        <ProfileForm/>
			</Grid2>
    </Grid2>
	);
}

export default UserProfilePage;