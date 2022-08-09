import React, { Component } from 'react'
import { Rate } from 'antd'
import { format } from 'date-fns'

import SwapiService from '../../../services/swapi-service'
import { GenresConsumer } from '../../genres-context'

import GenresList from './genres-list'
import './movie.css'

export default class Movie extends Component {
  constructor() {
    super()
    this.state = {
      rating: '',
      id: '',
    }

    // При проставлении рейтинга срабатывает событи компонента Rate onChange, вызывается функция setRating
    // которая отправляет POST запрос и передает Id гостевой сессии, id фильма и значение проставленного рейтинга
    // теперь необходимо передать значение рейтинга в APP что бы записать его в localStorage и передавать этот рейтинг
    // фильмам в компоненты search и rated
    this.setRating = (value) => {
      const { data, sessionId, overwriteMoviesDataWithNewRating, refreshMovieRating } = this.props
      const { id: newId } = data
      this.swapiService.postRating(sessionId, newId, value)
      this.setState({
        rating: value,
        id: newId,
      })
      overwriteMoviesDataWithNewRating(newId, value)
      refreshMovieRating()
    }
    this.swapiService = new SwapiService()
  }

  componentDidUpdate(prevProps, prevState) {
    const { refreshMovieRating } = this.props
    const { rating, id } = this.state
    if (prevState.rating !== rating || prevState.id !== id) {
      refreshMovieRating()
    }
  }

  render() {
    const { data } = this.props
    const {
      title,
      overview,
      poster_path: posterPath,
      release_date: releaseDate,
      vote_average: voteAverage,
      genre_ids: genreIds,
      rating,
    } = data

    let substr = overview.substring(0, 204)
    if (substr.length === 204) {
      const index = substr.lastIndexOf(' ')
      substr = `${substr.substring(0, index)} ...`
    }

    let colorRating = 'movie__rating'
    if (voteAverage < 3) {
      colorRating += ' movies__color-very-low'
    } else if (voteAverage >= 3 && voteAverage < 5) {
      colorRating += ' movies__color-low'
    } else if (voteAverage >= 5 && voteAverage < 7) {
      colorRating += ' movies__color-hight'
    } else if (voteAverage >= 7) {
      colorRating += ' movies__color-very-hight'
    }

    const releasseDateFormat = releaseDate ? format(new Date(releaseDate), 'PP') : 'No date'

    return (
      <div className="movie">
        <div className="movie__poster">
          <img src={`https://image.tmdb.org/t/p/original${posterPath}`} alt="poster" />
        </div>
        <div className="movie__info">
          <div className="movie__title">{title}</div>
          <div className={colorRating}>
            {voteAverage.toFixed(1)}
            {/* {Math.floor(vote_average *10)/10} */}
          </div>
          <div className="movie__release-date">{releasseDateFormat}</div>
          {/* <div className="movie__release-date">{releaseDate}</div> */}
          <div className="movie__genres">
            <GenresConsumer>
              {(moviesGenres) => <GenresList genres={moviesGenres} genreIds={genreIds} />}
            </GenresConsumer>
          </div>
          <div className="movie__overview">{substr}</div>
          <div className="movie__stars">
            <Rate
              onChange={this.setRating}
              allowClear={false}
              count={10}
              value={rating}
              allowHalf
              style={{ fontSize: 15 }}
            />
          </div>
        </div>
      </div>
    )
  }
}
