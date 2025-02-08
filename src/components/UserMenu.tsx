import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Menu, MenuItem, Divider, IconButton } from '@mui/material';
import { useAppDispatch } from "../store/store";  // Import the typed dispatch
import { logoutUser } from "../store/slices/authSlice";
import { clearWishlist } from '../store/slices/wishlistSlice';
import { Link } from 'react-router-dom';

const UserMenu: React.FC = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logoutUser());
    dispatch(clearWishlist());
  }

	return (
		<div className="user-menu">
			<IconButton
					id="basic-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}>
				<AccountCircleOutlinedIcon color="primary" fontSize="large"/>
			</IconButton>
			<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile">Profile</Link>
        </MenuItem>
				<Divider/>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
		</div>
	);
}

export default UserMenu;