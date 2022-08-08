import React, { Component } from 'react'
import _ from 'lodash'
import './search-box.css'

export default class SearchBox extends Component {
  constructor() {
    super()
    this.state = {
      label: 'return',
    }

    this.searchMovie = (e) => {
      const { target } = e
      let movie
      if (target.value.length === 0) {
        movie = 'return'
      } else {
        movie = target.value
      }
      this.setState({
        label: movie,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stateSearchMovie !== this.state.label) {
      this.props.getMovieName(this.state.label)
    }
  }

  render() {
    return (
      <input
        className="serch-box"
        type="text"
        placeholder="Type to search..."
        onChange={_.debounce(this.searchMovie, 300)}
      />
    )
  }
}
