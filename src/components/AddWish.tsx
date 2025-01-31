import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addWish } from '../store/slices/wishlistSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store/store';

const AddWish: React.FC = () => {
	const [inputValue, setInputValue]: [string, any] = useState("");
	const currentUser = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

	const addWishtoList = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if(currentUser?.id) {
			dispatch(addWish({userId: currentUser.id, wish: {id: uuidv4(), text: inputValue}}));
		}
	}

	const addWishForm = () => {
		return (<form className="add-wish" onSubmit={addWishtoList}>
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
		</form>)
	}

	return !currentUser?.id ? <span>Please login or register!</span>: addWishForm();
}

export default AddWish;