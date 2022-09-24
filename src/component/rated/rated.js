import React, { Component } from 'react'

import { ErrorIndicator } from '../error-indicator'
import { MoviesList } from '../search/movies-list'
import { Spinner } from '../spinner'

export class Rated extends Component {
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

    const errorDisplay = ratingMovieData === 'ratingMovieDataNotUploaded' ? error : null
    const spinner = loading ? <Spinner /> : null
    const hasData = !(errorDisplay || spinner)
    const data = hasData ? movies : null

    return (
      <>
        {errorDisplay}
        {spinner}
        {data}
      </>
    )
  }
}
