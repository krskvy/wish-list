import React from 'react';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import WishListItem from './WishListItem';
import { removeWish } from '../store/slices/wishlistStore';

const WishList: React.FC = () => {
	const dispatch = useDispatch();
	const allWishes = useSelector((state: RootState) => state.wishList.allWishes);

	return (
		<Stack
			className="wishlist"
			spacing={2}>
				{allWishes.map((item: any, index: number) => (
					<WishListItem
						value={item.text}
						key={index}
						remove={()=>dispatch(removeWish(index))}/>
      	))}
		</Stack>
	);
}

export default WishList;