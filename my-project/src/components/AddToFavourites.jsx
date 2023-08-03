import React from 'react'
import FilledHeart from '/filledHeart.png';
import EmptyHeart from '/emptyHeart.png';
import EmptyHeartWhite from '/emptyHeartWhite.png';

const AddToFavourites = () => {
  return (
    <>

        <span className='mr-2'>Add to Favourites</span>
			<img src={EmptyHeartWhite}/>
    </>
  )
}

export default AddToFavourites