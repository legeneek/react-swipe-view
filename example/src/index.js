import React, { Component } from 'react';
import { render } from 'react-dom';
import SwipeView from '../../src';
import TabNav from './tabnav'
import './app.css'

const navHeight = 40

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      curTab: 0
    }
    this.tabs = [
      {
        name: 'tab-1'
      },
      {
        name: 'tab-2'
      },
      {
        name: 'tab-3'
      }
    ]
    this.tabChange = this.tabChange.bind(this)
  }
  tabChange (index) {
    this.setState({curTab: index})
  }
  render() {
    const tabWidth = window.innerWidth
    const tabHeight = window.innerHeight - navHeight
    const viewStyle = {
      width: tabWidth,
      height: tabHeight,
      backgroundColor: '#f0f8ff'
    }
    const views = this.tabs.map(function(tab, i) {
      const text = `view-${i+1}`
      return (
        <div style={viewStyle} key={i}>{text}</div>
      )
    })

    return (
      <div className="App">
        <TabNav tabs={this.tabs} cur={this.state.curTab} tabChange={this.tabChange}/>
        <SwipeView containerStyle={{backgroundColor: 'red'}} cur={this.state.curTab} num={this.tabs.length} tabWidth={tabWidth} tabChange={this.tabChange} animation={{duration: 0.5}}>
          {views}
        </SwipeView>
      </div>
    )
  }
}

render(<App />, document.getElementById("root"));
