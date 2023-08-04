import React from 'react'
// import AddToFavourites from './AddToFavourites'

const MovieList = ({movies, favouriteComponent:FavouriteComponent, handleFavouritesClick}) => {
    // const FavouriteComponenti = FavouriteComponent
  return (
    <div className='flex'>
        {movies.map((movie) => (
            <div className='flex m-3 movie-container' key={movies.indexOf(movie)}>
                <img src={movie.Poster} alt='movie' />
                <div 
                    className='overlay flex justify-center align-middle'
                    onClick={() => handleFavouritesClick(movie)}
                >
                    <FavouriteComponent/>
                    
                </div>
            </div>
        ))}
    </div>
  )
}

export default MovieList