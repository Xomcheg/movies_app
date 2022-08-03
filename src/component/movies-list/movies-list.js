import React, { Component } from "react";
import Movie from "../movie";
import SearchReturnedNoResults from "../search-returned-no-results/search-returned-no-results";
import { Pagination } from 'antd';

import './movies-list.css';

export default class MoviesList extends Component {
    constructor() {
        console.log("MoviesList constructor");
        super();

        this.state = {
            currentPage: '1'
        }
        this.getCurrentPage = (page, pageSize) => {
            console.log('page, pageSize', page, pageSize);
            this.setState({
                currentPage: page
            });

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.currentPage !== this.state.currentPage) {
            this.props.searchMoviePage(this.state.currentPage);
        }

    }

     render () {
        console.log('movieList', this.state)
        const {moviesData, moviesGenres, currentPage, moviesCounter, searchMovie } = this.props;
        const movies = moviesData.map((item) => {
            const id = item.id;
            return (
                <Movie key = {id} data={item} genres = {moviesGenres}/>
            )
        });

        const searchReturnedNoResults = moviesData.length === 0 ? <SearchReturnedNoResults searchMovie = {searchMovie}/>: null;
        return (
                <section className="movies">                 
                    {movies}
                    {searchReturnedNoResults}
                    <div className="movies__pagination">
                    <Pagination size="small" defaultCurrent={currentPage} total={moviesCounter} 
                                showSizeChanger = {false}
                                defaultPageSize= {20}
                                onChange ={ this.getCurrentPage}
                                />
                    </div>

                </section>
          
          
        )
    }
   
}



