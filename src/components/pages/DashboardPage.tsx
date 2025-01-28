import React from 'react';
import { Grid2 } from '@mui/material';
import AddWish from '../AddWish';
import WishList from '../WishList'

const DashboardPage: React.FC = () => {
	return (
		<Grid2 container spacing={2} className="page-content">
			<Grid2 size={12}>
				<AddWish/>
			</Grid2>
			<Grid2 size={12}>
				<WishList/>
			</Grid2>
    </Grid2>
	);
}

export default DashboardPage;