import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import GenresList from "./genres-list";

import './movie.css'

export default class Movie extends Component{

    render() {
        const {title, overview, poster_path, release_date, genre_ids } = this.props.data;
        let substr = overview.substring(0, 204);
        if (substr.length == 204) {
            let index = substr.lastIndexOf(" ");
            substr = substr.substring(0, index) + " ...";
        }
     
        return(
            <div className = 'movie'>
                <div className='movie__poster'>
                    <img src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="poster" />
                </div>
                <div className='movie__info'>
                    <div className='movie__title'>
                        {title}
                    </div>
                    <div className='movie__release-date'>
                        { release_date }
                    </div>
                    <div className='movie__genres'>
                        <GenresList genres = {this.props.genres} genreIds= {genre_ids }/>
                    </div>
                    <div className='overview'>
                        {substr}
                    </div>
                </div>
            </div>
        )
    }
  
}
