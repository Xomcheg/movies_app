import React, { Component } from "react";
import MoviesList from "../movies-list";
import SearchBox from "../search-box";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import './app.css';


export default class  App extends Component {

    constructor() {
        console.log('APP constructor');
        super();
        this.state = {
            moviesData: [],
            moviesGenres: {},
            pageCounter: '',
            currentPage: '1',
            searchMovie: 'return',
            moviesCounter: '',
            loading: true,
            error: false

        };

        this.SwapiService = new SwapiService();

        this.getMovieName = (data) => {
            this.setState({
                searchMovie: data
            });
        };

        this.searchMovieList = () => {
            this.SwapiService.getResource(`search/movie?api_key=d019d5a6023ae30666fb845af41ca028&query=${this.state.searchMovie}&language=en-US&page=${this.state.currentPage}&include_adult=false`)
                .then((body) => {
                    this.setState({
                        moviesData: body.results,
                        pageCounter:  body.total_pages,
                        moviesCounter: body.total_results,
                        loading: false
                    })
                })  
        }

        this.searchMoviePage = (page) => {
            console.log('page', page)
            this.setState({
                currentPage: page 
            }) 
        }
    }

    
    componentDidMount() {
        this.getRandomMovies();
        this.getAllGanres();
    }

    onError(err){
        console.log("Ошибка", err);
        this.setState({
            error: true,
            loading: false
        });
    }

    getAllGanres() {
        this.SwapiService.getResource('genre/movie/list?api_key=d019d5a6023ae30666fb845af41ca028')
        .then((genres)=>{
            this.setState({
                moviesGenres: genres.genres.reduce(function(map, obj) {
                    map[obj.id] = obj.name;
                    return map;
                }, {})
            })
        })
    }

    getRandomMovies () {
        this.SwapiService.getResource('search/movie?api_key=d019d5a6023ae30666fb845af41ca028&query=return&language=en-US&page=1&include_adult=false&page=1')
        .then((movies) => {
            this.setState({
                moviesData: movies.results,
                pageCounter:  movies.total_pages,
                moviesCounter: movies.total_results,
                loading: false
            });
        })
        .catch((err) => {
            console.log("Ошибка", err)
            this.onError(err);
        });
    }



    componentDidUpdate(prevProps, prevState) {
        if(prevState.searchMovie !== this.state.searchMovie || prevState.currentPage !== this.state.currentPage) {
            if (prevState.searchMovie !== this.state.searchMovie) {
                this.setState({
                    currentPage: '1'
                });
            }
            this.searchMovieList(); 
            this.setState({
                loading: true,
            });
            
        }
    }


    render () {
        console.log('appState', this.state)
        const {loading, error,moviesData: moviesDataArr} = this.state;
   
        const hasData = !(error || loading);
 

        let moviesData = <MoviesList    moviesData = {this.state.moviesData}
                                        moviesGenres = {this.state.moviesGenres} 
                                        moviesCounter = {this.state.moviesCounter}
                                        searchMoviePage = {this.searchMoviePage}
                                        currentPage = {this.state.currentPage}
                                        searchMovie = {this.state.searchMovie}
                                        />
                                   
        console.log('moviesData', moviesData)
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorIndicator />: null;
        const moviesList = hasData ? moviesData : null;
        


        return(
            <div className="container">
                <SearchBox getMovieName = {this.getMovieName} stateSearchMovie = {this.state.searchMovie}/>
                {spinner}
                {errorMessage}
                {moviesList}
                
            </div>
        )
    }
}

