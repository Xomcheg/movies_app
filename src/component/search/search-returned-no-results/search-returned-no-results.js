import React from 'react'
import './search-returned-no-results.css'

function SearchReturnedNoResults({ message }) {
  return <h2 className="search-returned-no-results">{message}</h2>
}

export { SearchReturnedNoResults }
