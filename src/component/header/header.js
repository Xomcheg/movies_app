import React, { Component } from 'react'
import './header.css'

export class Header extends Component {
  constructor() {
    super()
    this.state = {
      activeHeaderBtn: 'search',
      btn: ['Search', 'Rated'],
    }

    this.onToggleHeaderBtn = (e) => {
      const { checkHeaderBtnActive } = this.props
      this.setState({
        activeHeaderBtn: e.target.textContent.toLowerCase(),
      })
      checkHeaderBtnActive(e.target.textContent.toLowerCase())
    }
  }

  render() {
    const { btn, activeHeaderBtn } = this.state
    const buttons = btn.map((item) => {
      let activeClass = 'header__btn'
      if (item.toLowerCase() === activeHeaderBtn) {
        activeClass += ' header__btn--active'
      }
      return (
        <button type="button" className={activeClass} onClick={this.onToggleHeaderBtn}>
          {item}
        </button>
      )
    })
    return (
      <div className="header">
        <div className="header__wrapper">{buttons}</div>
      </div>
    )
  }
}
