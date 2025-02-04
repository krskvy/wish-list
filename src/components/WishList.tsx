import React from 'react';
import { Stack } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import WishListItem from './WishListItem';
import { removeWish, updateWishList } from '../store/slices/wishlistSlice';
import { Wish } from '../types';

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";


const WishList: React.FC = () => {
	const dispatch = useDispatch();
	const allWishes = useSelector((state: RootState) => state.wishList.allWishes);
	const currentUser = useSelector((state: RootState) => state.auth.user);

	const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

	const handleDragEnd = (event: any) => {
		const { active, over } = event;

		if (!over || active.id === over.id) return;

		const oldIndex = allWishes.findIndex((wish) => wish.id === active.id);
		const newIndex = allWishes.findIndex((wish) => wish.id === over.id);
		const newOrder = arrayMove(allWishes, oldIndex, newIndex);
		if (currentUser?.id){
			dispatch(updateWishList({ userId: currentUser?.id, wishes: newOrder }));
		}
	};

	const removeItem = (wishId: string) => {
		if(currentUser?.id) {
			dispatch(removeWish({userId: currentUser.id, wishId}))
		}
	}
	
	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
			<SortableContext items={allWishes} strategy={verticalListSortingStrategy}>
				<Stack
					className="wishlist"
					spacing={2}>
						{Object.values(allWishes).flat().map((item: Wish, index: number) => (
							<WishListItem
								value={item.text}
								key={item.id}
								id={item.id}
								remove={()=> removeItem(item.id)}/>
						))}
				</Stack>
			</SortableContext>
		</DndContext>
	);
}

export default WishList;