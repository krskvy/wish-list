import React, { useState } from 'react';
import './AddWish.scss'
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addWish } from '../store/slices/wishlistSlice';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store/store';
import { selectUserId } from '../store/selectors/selectors';

const AddWish: React.FC = () => {
	const [inputValue, setInputValue]: [string, any] = useState("");
	const userId = useSelector((state: RootState) => selectUserId(state));
  const dispatch = useDispatch();

	const addWishtoList = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setInputValue('');
		if(userId) {
			dispatch(addWish({userId, wish: {id: uuidv4(), text: inputValue}}));
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

	return !userId ? <span>Please login or register!</span>: addWishForm();
}

export default AddWish;