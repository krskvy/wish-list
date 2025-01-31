import React from 'react';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import WishListItem from './WishListItem';
import { removeWish } from '../store/slices/wishlistSlice';
import { Wish } from '../types';


const WishList: React.FC = () => {
	const dispatch = useDispatch();
	const allWishes = useSelector((state: RootState) => state.wishList.allWishes);
	const currentUser = useSelector((state: RootState) => state.auth.user);

	const removeItem = (wishId: string) => {
		if(currentUser?.id) {
			dispatch(removeWish({userId: currentUser.id, wishId}))
		}
	}
	
	return (
		<Stack
			className="wishlist"
			spacing={2}>
				{Object.values(allWishes).flat().map((item: Wish, index: number) => (
					<WishListItem
						value={item.text}
						key={item.id}
						remove={()=> removeItem(item.id)}/>
      	))}
		</Stack>
	);
}

export default WishList;