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
      this.swapiService.postRating(this.props.sessionId, this.props.data.id, value)
      this.setState({
        rating: value,
        id: this.props.data.id,
      })
      this.props.overwriteMoviesDataWithNewRating(this.props.data.id, value)
      this.props.refreshMovieRating()
    }
    this.swapiService = new SwapiService()
  }

  componentDidUpdate(prevProps, prevState) {
    const { rating, id } = this.state
    if (prevState.rating !== rating || prevState.id !== id) {
      this.props.refreshMovieRating()
    }
  }

  render() {
    const { title, overview, poster_path, release_date, vote_average, genre_ids, rating } = this.props.data

    let substr = overview.substring(0, 204)
    if (substr.length == 204) {
      const index = substr.lastIndexOf(' ')
      substr = `${substr.substring(0, index)} ...`
    }

    let colorRating = 'movie__rating'
    if (vote_average < 3) {
      colorRating += ' movies__color-very-low'
    } else if (vote_average >= 3 && vote_average < 5) {
      colorRating += ' movies__color-low'
    } else if (vote_average >= 5 && vote_average < 7) {
      colorRating += ' movies__color-hight'
    } else if (vote_average >= 7) {
      colorRating += ' movies__color-very-hight'
    }

    return (
      <div className="movie">
        <div className="movie__poster">
          <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="poster" />
        </div>
        <div className="movie__info">
          <div className="movie__title">{title}</div>
          <div className={colorRating}>
            {vote_average.toFixed(1)}
            {/* {Math.floor(vote_average *10)/10} */}
          </div>
          <div className="movie__release-date">{format(new Date(release_date), 'PP')}</div>
          <div className="movie__genres">
            <GenresConsumer>
              {(moviesGenres) => <GenresList genres={moviesGenres} genreIds={genre_ids} />}
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
