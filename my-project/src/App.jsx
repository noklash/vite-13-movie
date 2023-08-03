import { useState, useEffect } from 'react'

import './App.css'

import React from 'react'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';



const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [favourites, setFavourites] = useState([])


  const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d10c8a44`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

  const addFavouriteMovie = (movie) =>{
    const newFavourite = [...favourites, movie]
    setFavourites(newFavourite)
  }

  useEffect(() => {
		getMovieRequest();
	}, [searchValue]);


  return (
    <div className='m-6 movie_app'>
      <div>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>

      <div className='flex'>
        <MovieList 
            movies={movies} 
            FavouriteComponent={AddToFavourites}
            handleFavouritesClick={addFavouriteMovie}
        />
      </div>

      <div className='flex align-middle mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>

      <div className=''>
				<MovieList movies={favourites} favouriteComponent={AddToFavourites} />
			</div>

    </div>
  )
}

export default App
