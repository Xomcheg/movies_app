import React, { Component } from 'react'

import SwapiService from '../../services/swapi-service'
import Header from '../header'
import Search from '../search'
import Rated from '../rated'
import ErrorIndicator from '../error-indicator'
import { GenresProvider } from '../genres-context'

import './app.css'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      moviesData: [],
      moviesGenres: {},
      currentPage: '1',
      // searchMovie: 'return',
      searchMovie: '',
      moviesCounter: '',
      loading: true,
      error: false,
      sessionId: '',
      activeHeaderBtn: 'search',
      moviesDataRatingArr: {},

      // Rating Movie Data----------------------------
      ratingMovieData: [],
      ratingMoviesCounter: '',
      ratingMovieCurrentPage: '1', // сюда записывам страницу из вкладки Rated по номеру которой кликнул пользователь
    }

    this.SwapiService = new SwapiService()

    this.getMovieName = (data) => {
      this.setState({
        searchMovie: data,
      })
    }

    // Function for rating movie----------------------------------------------------------------------------------------------------

    // Получаю номер страницы из вкладки rated когда кликнули по определенной странице с фильмами, если страниц больше 1
    // записываю ее в state ratingMovieCurrentPage
    this.searchMovieRatingPage = (page) => {
      this.setState({
        ratingMovieCurrentPage: page,
      })
    }
    //----------------------------------------------------------------------------------------------------------------------

    // При клике по вкладке RAted получаю список фильмов еоторым проставили рейтинг-------------------------
    // записываю в стэйт ratingMovieData массив фильмов data.results
    //  записываю в  ratingMoviesCounter общее количество фильмов data.total_results
    this.getRatingMovie = () => {
      this.setState({
        loading: true,
      })
      const { sessionId, ratingMovieCurrentPage } = this.state
      this.SwapiService.getGuestSessionRatedMovie(sessionId, ratingMovieCurrentPage)
        .then((data) => {
          this.setState({
            ratingMovieData: data.results,
            ratingMoviesCounter: data.total_results,
            loading: false,
          })
        })
        .catch((err) => {
          console.log('Error', err)
          this.setState({
            ratingMovieData: 'ratingMovieDataNotUploaded',
          })
        })
    }
    //---------------------------------------------------------------------------------------------------------

    // Ищу массив фильмов с рейтингом со страницы по которой кликнул пользователь
    // необходимо передать sessionId и страницу из которой необходимо загрузить массив фильмов ratingMovieCurrentPage
    this.searchMovieRatedList = () => {
      const { sessionId, ratingMovieCurrentPage } = this.state
      this.SwapiService.getGuestSessionRatedMovie(sessionId, ratingMovieCurrentPage).then((body) => {
        this.setState({
          ratingMovieData: body.results,
          loading: false,
        })
      })
    }

    // Function for rating movie------------------------------------------------------------------------------------

    this.searchMovieList = (state = this.state) => {
      const { moviesDataRatingArr } = this.state
      let searchRequest = state.searchMovie
      if (searchRequest.length === 0) {
        searchRequest = 'return'
      }
      this.SwapiService.getResource(
        // `search/movie?api_key=d019d5a6023ae30666fb845af41ca028&query=${state.searchMovie}&language=en-US&page=${state.currentPage}&include_adult=false`
        `search/movie?api_key=a2fbb8a8510cd68f6c08fbbdeffcb92d&query=${searchRequest}&language=en-US&page=${state.currentPage}&include_adult=false`
      )
        .then((body) => {
          const moviesWithRating = this.refreshMoviesRatingSub(body.results, moviesDataRatingArr)
          this.setState({
            moviesData: moviesWithRating,
            // pageCounter: body.total_pages,
            moviesCounter: body.total_results,
            loading: false,
          })
        })
        .catch((err) => {
          console.log('Ошибка', err)
          this.onError(err)
        })
    }
    // Записываем в текущий стэйт - currentPage номер страницы по которой кликнул пользователь
    // функцию передаем в качестве пропса компоненту Search затем ее вызываем в компоненте
    // movie-list, который отслеживает событийе клика по номеру страницы, затем этот номер страницы передаем
    // обратно movie-list и при помощи pagination он отображает необходимый номер страницы
    this.searchMoviePage = (page) => {
      this.setState({
        currentPage: page,
      })
    }

    // this.checkHeaderBtnActive = (btn) => {
    //   this.setState({
    //     activeHeaderBtn: btn,
    //   })
    // }

    // Функция которая записывает id фильма и его рейтинг в localstorage, срабатывает при клике по рейтингу
    // в компоненте movie

    this.overwriteMoviesDataWithNewRating = (id, rating) => {
      const { moviesDataRatingArr } = this.state
      const newMoviesDataRatingArr = { ...moviesDataRatingArr }
      newMoviesDataRatingArr[id] = rating
      this.setState({
        moviesDataRatingArr: newMoviesDataRatingArr,
      })

      const { activeHeaderBtn } = this.state
      const { moviesData } = this.state
      const newMoviesData = moviesData.map((it) => {
        const newItem = it
        if (newItem.id === id) {
          newItem.rating = rating
        }
        return newItem
      })
      this.setState({
        moviesData: newMoviesData,
      })

      if (activeHeaderBtn === 'rated') {
        const { ratingMovieData } = this.state
        const newRatingMovieData = ratingMovieData.map((it) => {
          const newItem = it
          if (newItem.id === id) {
            newItem.rating = rating
          }
          return newItem
        })
        this.setState({
          ratingMovieData: newRatingMovieData,
        })
      }
    }
    //----------------------------------------------------

    // Необходимо каждый раз проверять когда пользователь кликнул по рейтингу, по номеру страницы,
    // ввел в поиск название фильма, что есть ли в полученном массиве фильмов те фильмы которым пользователь ставил оценкуб
    // затем перебираем его и сравниваем с map-объектом в который записываем id фильма и рейтинг этого фильма
    // если есть совпадение то перезаписываем рейтинг на тот который поставили, затем обновляем массив фильмов в statte
    this.refreshMovieRating = () => {
      const { moviesData, moviesDataRatingArr } = this.state
      const refreshMuviesData = this.refreshMoviesRatingSub(moviesData, moviesDataRatingArr)
      this.setState({
        moviesData: refreshMuviesData,
      })
    }

    this.checkHeaderBtnActive = (btn) => {
      this.setState({
        activeHeaderBtn: btn,
        // loading: true,
      })
    }

    this.refreshMoviesRatingSub = (moviesData_, moviesDataRatingArr_) => {
      const refreshMuviesData = moviesData_.map((movie) => {
        const newMovie = movie
        newMovie.rating = moviesDataRatingArr_[movie.id] ? moviesDataRatingArr_[movie.id] : 0
        return newMovie
      })
      return refreshMuviesData
    }
  }

  componentDidMount() {
    this.getRandomMovies()
    this.getAllGanres()
    this.getGuestSession()
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchMovie, currentPage, ratingMovieCurrentPage } = this.state
    if (
      prevState.searchMovie !== searchMovie ||
      prevState.currentPage !== currentPage ||
      prevState.ratingMovieCurrentPage !== ratingMovieCurrentPage
    ) {
      if (prevState.searchMovie !== searchMovie) {
        this.setState({
          currentPage: '1',
        })
      }
      this.searchMovieList()
      this.setState({
        loading: true,
      })
    }

    // Проверяю, если текущий номер страницы вкладки Rated не равен предыдущему номеру
    // то вызываю функцию searchMovieRatedList которая вернет массив фильмов с нужной страницы
    if (prevState.ratingMovieCurrentPage !== ratingMovieCurrentPage) {
      this.searchMovieRatedList()
      this.setState({
        loading: true,
      })
    }
    // if (prevState.activeHeaderBtn !== activeHeaderBtn) {
    //   if (activeHeaderBtn === 'search') {
    //     this.setState({
    //       searchMovie: 'return',
    //     })
    //   }
    // }
  }

  onError(err) {
    console.log('Error', err)
    this.setState({
      error: true,
      loading: false,
    })
  }

  getRandomMovies() {
    this.SwapiService.getResource(
      'search/movie?api_key=a2fbb8a8510cd68f6c08fbbdeffcb92d&query=return&language=en-US&page=1&include_adult=false&page=1'
      // 'search/movie?api_key=d019d5a6023ae30666fb845af41ca028&query=return&language=en-US&page=1&include_adult=false&page=1'
    )
      .then((movies) => {
        this.setState({
          moviesData: movies.results,
          moviesCounter: movies.total_results,
          loading: false,
        })
      })
      .catch((err) => {
        console.log('Ошибка', err)
        this.onError(err)
      })
  }

  getAllGanres() {
    this.SwapiService.getResource('genre/movie/list?api_key=a2fbb8a8510cd68f6c08fbbdeffcb92d')
      // this.SwapiService.getResource('genre/movie/list?api_key=d019d5a6023ae30666fb845af41ca028')
      .then((genres) => {
        this.setState({
          moviesGenres: genres.genres.reduce((map, obj) => {
            const newMap = map
            newMap[obj.id] = obj.name
            return newMap
          }, {}),
        })
      })
      .catch((err) => {
        console.log('Error', err)
        this.setState({
          moviesGenres: 'DataNotUploaded',
        })
      })
  }

  //  Получаем гостевой ID по которому будем отправлять данные о фильме и проставленном ему рейтинге под этим
  // гостевым ID
  getGuestSession() {
    this.SwapiService.createGuestSession('authentication/guest_session/new?api_key=a2fbb8a8510cd68f6c08fbbdeffcb92d')
      // this.SwapiService.createGuestSession('authentication/guest_session/new?api_key=d019d5a6023ae30666fb845af41ca028')
      .then((body) => {
        this.setState({
          sessionId: body.guest_session_id,
          moviesDataRatingArr: {},
        })
      })
      .catch((err) => {
        console.log('Guest session id not received', err)
      })
  }
  //--------------------------------------------------------------------------------

  render() {
    const {
      activeHeaderBtn,
      moviesData,
      ratingMoviesCounter,
      moviesCounter,
      ratingMovieCurrentPage,
      currentPage,
      searchMovie,
      ratingMovieData,
      sessionId,
      loading,
      error,
      moviesGenres,
    } = this.state

    const searchBox = (
      <GenresProvider value={moviesGenres}>
        <Search
          moviesData={moviesData}
          moviesCounter={moviesCounter}
          searchMoviePage={this.searchMoviePage}
          currentPage={currentPage}
          searchMovie={searchMovie}
          sessionId={sessionId}
          loading={loading}
          error={error}
          getMovieName={this.getMovieName}
          getRatingMovie={this.getRatingMovie}
          overwriteMoviesDataWithNewRating={this.overwriteMoviesDataWithNewRating}
          refreshMovieRating={this.refreshMovieRating}
        />
      </GenresProvider>
    )

    const ratedBox = (
      <GenresProvider value={moviesGenres}>
        <Rated
          loading={loading}
          getRatingMovie={this.getRatingMovie}
          ratingMovieData={ratingMovieData}
          ratingMoviesCounter={ratingMoviesCounter}
          searchMovieRatingPage={this.searchMovieRatingPage}
          ratingMovieCurrentPage={ratingMovieCurrentPage}
          searchMovie={searchMovie}
          sessionId={sessionId}
          refreshMovieRating={this.refreshMovieRating}
          overwriteMoviesDataWithNewRating={this.overwriteMoviesDataWithNewRating}
        />
      </GenresProvider>
    )

    const search = activeHeaderBtn === 'search' ? searchBox : null
    const errorMessage = error ? <ErrorIndicator message="Что-то пошло не так" /> : null
    const rated = activeHeaderBtn === 'rated' ? ratedBox : null

    return (
      <div className="container">
        <Header
          checkHeaderBtnActive={this.checkHeaderBtnActive}
          refreshMovieRating={this.refreshMovieRating}
          test="test"
        />
        {search}
        {errorMessage}
        {rated}
      </div>
    )
  }
}
