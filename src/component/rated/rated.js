import React, { Component } from 'react'

import MoviesList from '../search/movies-list'
import ErrorIndicator from '../error-indicator'

export default class Rated extends Component {
  UNSAFE_componentWillMount() {
    const { getRatingMovie } = this.props
    getRatingMovie()
  }

  render() {
    const { ratingMovieData, searchMovieRatingPage, ratingMoviesCounter, ratingMovieCurrentPage, sessionId } =
      this.props

    const error = <ErrorIndicator message="Rating Movie Data Not Uploaded" />
    const movies = (
      <MoviesList
        moviesData={ratingMovieData}
        moviesCounter={ratingMoviesCounter}
        searchMoviePage={searchMovieRatingPage}
        currentPage={ratingMovieCurrentPage}
        sessionId={sessionId}
        noDataMessage="Вы не проголосовали ни за один фильм"
      />
    )

    const data = ratingMovieData === 'ratingMovieDataNotUploaded' ? error : movies
    // if (ratingMovieData === 'ratingMovieDataNotUploaded') {
    //   data = error
    // } else {
    //   data = movies
    // }

    return data
  }
}
