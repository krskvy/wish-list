import React from 'react';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';
import './WishImage.scss'

const WishImage: React.FC<{image: string, remove: () => void}> = ({image, remove}) => {
  return (<div className='wish-image__container'>
            <img 	src={image}
                  className="wish-image" 
                  alt="Wish image" />
            <IconButton aria-label="delete"	
                    className='wish-image__remove' 
                    onClick={remove}
                    size='small'
                    color="error">
              <CloseRoundedIcon />
            </IconButton>
          </div>
        );
}

export default WishImage;