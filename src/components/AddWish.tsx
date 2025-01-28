import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addWish } from '../store/slices/wishlistStore';

const AddWish: React.FC = () => {
	const [inputValue, setInputValue]: [string, any] = useState("");
  const dispatch = useDispatch();

	const addWishtoList = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addWish({text: inputValue}));
	}

	return (
		<form className="add-wish" onSubmit={addWishtoList}>
			<TextField
				className='add-wish__input'
				value={inputValue}
				variant="standard"
				label="Enter your wish here"
				onChange={(e) => setInputValue(e.target.value)}
				required/>
			<Button
				variant="outlined"
				type="submit"
				className='add-wish__btn'>
				Add Wish
			</Button>
		</form>
	);
}

export default AddWish;