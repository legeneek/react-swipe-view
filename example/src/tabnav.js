import React, { Component } from 'react'
import './tabnav.css'

class TabNav extends Component {
  render () {
    const me = this
    const displayNavs = this.props.tabs.map(function(tab, i) {
      const tabClass = `tab-nav ${i === me.props.cur ? 'active': ''}`
      return <div className={tabClass} key={i} onClick={() => {me.props.tabChange(i)}}>{tab.name}</div>
    })
    return (
      <div className="navs">
        {displayNavs}
      </div>
    )
  }
}

export default TabNav
