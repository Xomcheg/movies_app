import React from "react";
import './search-returned-no-results.css';

const SearchReturnedNoResults = (props) => {
    return (
        <h2 className="search-returned-no-results">
            По вашему запросу 	&#34;<span className="search-returned-no-results__movie">{props.searchMovie}</span>	&#34; не было найдено результата
        </h2>
    )
}

export default SearchReturnedNoResults;