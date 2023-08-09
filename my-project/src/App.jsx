import { useState, useEffect } from 'react'

import './App.css'

import React from 'react'
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import Hamburger from '/icon-hamburger.svg'



const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("")
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d10c8a44`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

 useEffect(()=>{
  setTimeout(()=>
  setIsLoading(false), 6000)
 })

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
    <div className=' movie_app'>
      {isLoading && <div className='loading '>
                <h1 className='flicker'>watcham <span className='tm'>&#8482;</span></h1>
        </div>}
        {/* so that the loading page dispalys only loading */}
      {!isLoading && 
        <div className='nav'>
      <div className='flex '>
        <h1 className='brand mr-auto pb-6 px-4'>watcham</h1>
        <div className='pt-4 px-4'>
          {/* <MovieListHeading heading="Movies"/> */}
          {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/> */}
          {window.innerWidth < 675 && <img src={Hamburger}/>}
        </div>
        {/* {window.innerWidth < 675 && <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>} */}
      </div>
      
      {/* new stop */}
      <div className='my-16 px-6'>
        <MovieListHeading heading="Movies"/>
        {/* testing up */}
        <div className='flex '>
          <MovieList 
              movies={movies} 
              favouriteComponent={AddToFavourites}
              handleFavouritesClick={addFavouriteMovie}
          />
        </div>
      </div>

      <div className='flex align-middle mt-4 mb-4 px-6'>
				<MovieListHeading heading='Favourites' />
			</div>

      <div className='px-6'>
				<MovieList 
            movies={favourites} 
            favouriteComponent={RemoveFavourites}
            handleFavouritesClick={removeFavouriteMovie}
        />

			</div>
      </div>}
{/* end of the is loading logic */}
    </div>
  )
}

export default App
