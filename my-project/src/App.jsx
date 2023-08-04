import { useState, useEffect } from 'react'

import './App.css'

import React from 'react'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';



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

 

  useEffect(() => {
		getMovieRequest();
	}, [searchValue]);


  useEffect(() => {
    const movieFavs = JSON.parse(localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavs) {
      setFavourites(movieFavs);
    }
    // this means it only runs when there's a favourite found

  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items))
  }

  const addFavouriteMovie = (movie) =>{
    const newFavourite = [...favourites, movie]
    setFavourites(newFavourite)


    saveToLocalStorage(newFavourite)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList)
  };

  return (
    <div className='m-6 movie_app'>
      <div>
        <MovieListHeading heading="Movies"/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>

      <div className='flex'>
        <MovieList 
            movies={movies} 
            favouriteComponent={AddToFavourites}
            handleFavouritesClick={addFavouriteMovie}
        />
      </div>

      <div className='flex align-middle mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>

      <div className=''>
				<MovieList 
            movies={favourites} 
            favouriteComponent={RemoveFavourites}
            handleFavouritesClick={removeFavouriteMovie}
        />

			</div>

    </div>
  )
}

export default App
