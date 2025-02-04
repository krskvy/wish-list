import React from 'react';
import { RootState } from '../store/store';
import { useSelector, useDispatch } from 'react-redux';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { addWishImage, removeWishImage } from '../store/slices/wishlistSlice';
import { selectWishById } from '../store/selectors/selectors';
import { selectUserId } from '../store/selectors/selectors';
import { Card, IconButton } from '@mui/material';
import './WishListItem.scss';
import WishImage from './WishImage';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const WishListItem: React.FC<{wishId: string, removeWish: () => void}> = ({wishId, removeWish}) => {
	const dispatch = useDispatch();
	const userId = useSelector((state: RootState) => selectUserId(state));
	const wish = useSelector((state: RootState) => selectWishById(state, wishId));

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: wishId });
	
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (userId){
					dispatch(addWishImage({ userId, wishId, image: reader.result as string}));
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const removeImage = () => {
		if (userId){
			dispatch(removeWishImage({ userId, wishId}));
		}
	}

	return (
		<Card ref={setNodeRef} 
					style={style}
					className={`wishlist-item ${isDragging ? "wishlist-item--dragging" : ""}`}
					variant="outlined">
			<div className="wishlist-item__main">
				<div className="wishlist-item__dnd-indicator" {...attributes} {...listeners}>
					<DragIndicatorIcon/>
				</div>
				<span className="wishlist-item__text">{ wish?.text }</span>
				<div className="wishlist-item__btns">
					<IconButton color="primary"> 
						<AddPhotoAlternateOutlinedIcon />
						<input 	type="file" 
										accept="image/*" 
										className='wishlist-item__add-image'
										onChange={handleImageChange} />
					</IconButton>
					<IconButton aria-label="delete"	
											className='wishlist-item__delete' 
											onClick={removeWish}
											color="error">
						<DeleteOutlineRoundedIcon />
					</IconButton>
				</div>
			</div>
			{wish?.image && <WishImage image={wish.image} remove={() => removeImage()}/>}
		</Card>
	);
}

export default WishListItem;