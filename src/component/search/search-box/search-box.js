import React, { Component } from 'react'
import _ from 'lodash'
import './search-box.css'

export class SearchBox extends Component {
  constructor() {
    super()
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
      this.setState({
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
