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
      // let movie
      // if (target.value.length === 0) {
      //   movie = 'return'
      // } else {
      //   movie = target.value
      // }
      this.setState({
        // label: movie,
        label: target.value,
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
    const { label } = this.state
    return (
      <input
        className="serch-box"
        type="text"
        placeholder={label === '' ? 'Type to search...' : label}
        onChange={_.debounce(this.searchMovie, 500)}
      />
    )
  }
}
