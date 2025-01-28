import React from 'react';
import { Menu, MenuItem, Divider, Button } from '@mui/material';
import { authService } from '../services/authService';

const UserMenu: React.FC = () => {

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
		authService.logout();
  };

	return (
		<div className="user-menu">
			<Button
					id="basic-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}>
				User
			</Button>
			<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
				<Divider/>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
		</div>
	);
}

export default UserMenu;