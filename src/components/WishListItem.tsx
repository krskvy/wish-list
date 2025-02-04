import React from 'react';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Card, IconButton } from '@mui/material';
import './WishListItem.scss';

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const WishListItem: React.FC<{value: string, id: string, remove: () => void}> = ({value, id, remove}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });
	
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<Card ref={setNodeRef} 
					style={style}
					className={`wishlist-item ${isDragging ? "wishlist-item--dragging" : ""}`}
					variant="outlined">
			<div className="wishlist-item__dnd-indicator" {...attributes} {...listeners}>
				<DragIndicatorIcon/>
			</div>
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