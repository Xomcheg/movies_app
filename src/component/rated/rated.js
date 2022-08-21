import React, { Component } from 'react'

import MoviesList from '../search/movies-list'
import ErrorIndicator from '../error-indicator'
import Spinner from '../spinner'

export default class Rated extends Component {
  UNSAFE_componentWillMount() {
    const { getRatingMovie } = this.props
    getRatingMovie()
  }

  render() {
    const {
      ratingMovieData,
      searchMovieRatingPage,
      ratingMoviesCounter,
      ratingMovieCurrentPage,
      sessionId,
      refreshMovieRating,
      overwriteMoviesDataWithNewRating,
      loading,
    } = this.props

    const error = <ErrorIndicator message="Rating Movie Data Not Uploaded" />
    const movies = (
      <MoviesList
        moviesData={ratingMovieData}
        moviesCounter={ratingMoviesCounter}
        searchMoviePage={searchMovieRatingPage}
        currentPage={ratingMovieCurrentPage}
        sessionId={sessionId}
        noDataMessage="Вы не проголосовали ни за один фильм"
        refreshMovieRating={refreshMovieRating}
        overwriteMoviesDataWithNewRating={overwriteMoviesDataWithNewRating}
      />
    )

    console.log(loading)

    const errorDisplay = ratingMovieData === 'ratingMovieDataNotUploaded' ? error : null
    // const data = ratingMovieData === 'ratingMovieDataNotUploaded' ? error : movies
    const spinner = loading ? <Spinner /> : null
    const hasData = !(errorDisplay || spinner)
    const data = hasData ? movies : null

    // if (ratingMovieData === 'ratingMovieDataNotUploaded') {
    //   data = error
    // } else {
    //   data = movies
    // }

    return (
      <>
        {errorDisplay}
        {spinner}
        {data}
      </>
    )
  }
}
