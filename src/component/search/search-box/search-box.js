import React, { Component } from 'react'
import _ from 'lodash'
import './search-box.css'

export default class SearchBox extends Component {
  constructor() {
    super()
    console.log('constructor for search box')
    this.state = {
      label: '',
    }

    this.getStartLabel = () => {
      const { stateSearchMovie } = this.props
      this.setState({
        label: stateSearchMovie,
      })
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

  UNSAFE_componentWillMount() {
    this.getStartLabel()
  }

  componentDidUpdate(prevProps) {
    const { label } = this.state
    const { getMovieName } = this.props
    if (prevProps.stateSearchMovie !== label) {
      getMovieName(label)
    }
  }

  render() {
    return (
      <input
        className="serch-box"
        type="text"
        placeholder="Type to search..."
        onChange={_.debounce(this.searchMovie, 500)}
      />
    )
  }
}
