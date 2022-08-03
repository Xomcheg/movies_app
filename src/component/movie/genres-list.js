import React from "react";
import './genres-list.css'


const GenresList =({genreIds, genres}) => {
    //  console.log(genres)
    // console.log('GenresList', props)
    const genreData = genreIds.map( (id) => {
        return  <div className="movie__genres-item">{genres[id]}</div>  
    })

    return (
        <>
            {genreData}
        </>
    )
}

export default GenresList;