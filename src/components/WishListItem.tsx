import React from 'react';
import { Card, IconButton } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import './WishListItem.scss';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const WishListItem: React.FC<{value: string, id: string, remove: () => void}> = ({value, id, remove}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
	
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		cursor: "grab",
		
	};

	return (
		<Card ref={setNodeRef} {...attributes} {...listeners} style={style} className="wishlist-item"	variant="outlined">
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