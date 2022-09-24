import React, { Component } from 'react'
import { Pagination } from 'antd'

import { Movie } from '../movie'
import { SearchReturnedNoResults } from '../search-returned-no-results/search-returned-no-results'

import './movies-list.css'

export class MoviesList extends Component {
  constructor() {
    super()

    // после клика по номеру страницы, срабатывает событие onChange, вызывается функция  getCurrentPage
    // она передает в стэйт app страницу по которой кликнули currentPage, что бы потом отрисовать элементы
    // с необходимой страницы
    this.getCurrentPage = (page) => {
      const { searchMoviePage } = this.props
      searchMoviePage(page)
    }
  }

  render() {
    const {
      moviesData,
      noDataMessage,
      currentPage,
      moviesCounter,
      sessionId,
      overwriteMoviesDataWithNewRating,
      refreshMovieRating,
    } = this.props

    const movies = moviesData.map((item) => {
      const { id } = item
      return (
        <Movie
          key={id}
          data={item}
          sessionId={sessionId}
          overwriteMoviesDataWithNewRating={overwriteMoviesDataWithNewRating}
          refreshMovieRating={refreshMovieRating}
        />
      )
    })

    const searchReturnedNoResults = moviesData.length === 0 ? <SearchReturnedNoResults message={noDataMessage} /> : null

    return (
      <section className="movies">
        {movies}
        {searchReturnedNoResults}
        <div className="movies__pagination">
          <Pagination
            size="small"
            defaultCurrent={currentPage}
            total={moviesCounter}
            showSizeChanger={false}
            defaultPageSize={20}
            onChange={this.getCurrentPage}
          />
        </div>
      </section>
    )
  }
}
