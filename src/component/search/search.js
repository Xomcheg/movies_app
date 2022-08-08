import React, { Component } from 'react'

import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'

import SearchBox from './search-box'
import MoviesList from './movies-list'

export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      moviesDataNew: [],
    }
  }

  render() {
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
    } = this.props

    const hasData = !(error || loading)

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
        <SearchBox getMovieName={getMovieName} stateSearchMovie={searchMovie} />
        {spinner}
        {/* {errorMessage} */}
        {moviesList}
      </>
    )
  }
}
