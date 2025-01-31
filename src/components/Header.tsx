import React from 'react';
import './Header.scss'
import { Link } from 'react-router-dom';
import { Grid2 } from '@mui/material';
import UserMenu from './UserMenu';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	return (
		<Grid2 className="header" container spacing={2}>
			<Grid2 className="header-container" size={12}>
				<nav className='header__nav'>
					<ul>
						<li><Link className="header__nav--link" to="/">Dashboard</Link></li>
					</ul>
				</nav>
				{!isAuthenticated? <nav className="header__auth-menu"><ul>
						<li><Link className="header__nav--link" to="/login">Login</Link></li>
						<li><Link className="header__nav--link" to="/register">Register</Link></li>
					</ul></nav> :
						<UserMenu/> }
			</Grid2>
		</Grid2>
	);
}

export default Header;