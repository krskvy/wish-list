import React from 'react';
import { Card, IconButton } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './WishListItem.css';

const WishListItem: React.FC<{value: string, remove: () => void}> = ({value, remove}) => {
	return (
		<Card className="wishlist-item"	variant="outlined">
			<span className="wishlist-item__text">{ value }</span>
			<div className="wishlist-item__btns">
				<IconButton aria-label="delete" onClick={remove} color="error">
					<DeleteOutlineRoundedIcon />
				</IconButton>
			</div>
		</Card>
	);
}

export default WishListItem;