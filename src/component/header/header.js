import React, { Component } from 'react'
import './header.css'

export default class Header extends Component {
  constructor() {
    super()
    this.state = {
      activeHeaderBtn: 'search',
      active: '',
      btn: ['Search', 'Rated'],
    }

    this.onToggleHeaderBtn = (e) => {
      if (e.target.nodeName === 'BUTTON') {
        this.setState({
          activeHeaderBtn: e.target.textContent.toLowerCase(),
        })
        this.props.checkHeaderBtnActive(e.target.textContent.toLowerCase())
      }
    }
  }

  render() {
    console.log('HeaderProps', this.props)
    const { btn, activeHeaderBtn } = this.state
    const buttons = btn.map((item) => {
      let activeClass = 'header__btn'
      if (item.toLowerCase() === activeHeaderBtn) {
        activeClass += ' header__btn--active'
      }
      return <button className={activeClass}>{item}</button>
    })
    return (
      <div className="header">
        <div className="header__wrapper" onClick={this.onToggleHeaderBtn}>
          {buttons}
        </div>
      </div>
    )
  }
}
