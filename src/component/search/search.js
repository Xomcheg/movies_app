import React from 'react'

import Spinner from '../spinner'

import SearchBox from './search-box'
import MoviesList from './movies-list'

function Search(props) {
  const {
    loading,
    error,
    moviesData,
    moviesCounter,
    searchMoviePage,
    currentPage,
    searchMovie,
    sessionId,
    getMovieName,
    overwriteMoviesDataWithNewRating,
    refreshMovieRating,
  } = props

  const hasData = !(error || loading)

  console.log('searchMovie', searchMovie)
  const moviesAll = (
    <MoviesList
      moviesData={moviesData}
      moviesCounter={moviesCounter}
      searchMoviePage={searchMoviePage}
      currentPage={currentPage}
      searchMovie={searchMovie}
      sessionId={sessionId}
      overwriteMoviesDataWithNewRating={overwriteMoviesDataWithNewRating}
      refreshMovieRating={refreshMovieRating}
      noDataMessage="По вашему запросу ничего не найдено"
    />
  )

  const spinner = loading ? <Spinner /> : null
  // const errorMessage = error ? <ErrorIndicator />: null;
  const moviesList = hasData ? moviesAll : null

  return (
    <>
      <SearchBox getMovieName={getMovieName} stateSearchMovie={searchMovie} searchMovie={searchMovie} />
      {spinner}
      {moviesList}
    </>
  )
}

export default Search
