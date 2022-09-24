import React from 'react'
import './genres-list.css'

function GenresList({ genreIds, genres }) {
  let genresData
  if (genres === 'DataNotUploaded') {
    genresData = <div className="movie__genres-item"> Data Not Uploaded</div>
  } else {
    genresData = genreIds.map((id) => <div className="movie__genres-item">{genres[id]}</div>)
  }

  return genresData
}

export { GenresList }
