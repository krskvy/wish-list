import React from 'react';
import { Card, Button } from '@mui/material';
import './WishListItem.css';

const WishListItem: React.FC<{value: string, remove: ()=>{}}> = ({value, remove}) => {
	return (
		<Card className="wishlist-item"	variant="outlined">
			<span className="wishlist-item__text">{ value }</span>
			<div className="wishlist-item__btns">
				<Button onClick={remove} variant="outlined" color="error">
					Delete
				</Button>
			</div>
		</Card>
	);
}

export default WishListItem;