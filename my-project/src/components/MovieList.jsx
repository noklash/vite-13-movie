import React from 'react'

const MovieList = ({movies, FavouriteComponent, handleFavouritesClick}) => {
  return (
    <div className='flex'>
        {movies.map((movie, index) => (
            <div className='flex m-3 movie-container' key={movies.indexOf(movie)}>
                <img src={movie.Poster} alt='movie' />
                <div 
                    className='overlay flex justify-center align-middle'
                    onClick={() => handleFavouritesClick(movie)}
                >
                    <FavouriteComponent />
                </div>
            </div>
        ))}
    </div>
  )
}

export default MovieList