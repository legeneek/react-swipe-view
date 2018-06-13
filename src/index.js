import React, { Component } from 'react';

let startX, startY, moveDelta, moveStartT

class SwipeView extends Component {
  constructor (props) {
    super(props)
    this.containerRef = React.createRef()
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.isSwipe = 0
  }
  componentDidMount () {
    this.containerRef.current.style.transform = `translate3d(${-1 * this.props.cur * this.props.tabWidth}px, 0, 0)`
  }
  componentDidUpdate () {
    this.animateView(this.props.cur)
  }
  handleTouchStart (e) {
    this.containerRef.current.style.transition = ''
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      moveStartT = Date.now()
      startX = touch.pageX
      startY = touch.pageY
      moveDelta = 0
    }
  }
  handleTouchMove (e) {
    const touch = e.touches[0]
    const deltaX = touch.pageX - startX
    const deltaY = touch.pageY - startY
    moveDelta = deltaX

    this.containerRef.current.style.transition = ''
    if (this.isSwipe === 0) {
      this.isSwipe = Math.abs(deltaX) > Math.abs(deltaY) ? 1 : -1
      this.props.onSwipe(this.isSwipe === 1)
    }

    if (this.isSwipe === 1) {
      if ((deltaX > 0 && this.props.cur === 0) || (deltaX < 0 && this.props.cur === this.props.num - 1)) {
        return
      }
      this.containerRef.current.style.transform = `translate3d(${-1 * this.props.cur * this.props.tabWidth + deltaX}px, 0, 0)`
    }
  }
  handleTouchEnd () {
    const gapT = Date.now() - moveStartT
    let cur = this.props.cur
    if (this.isSwipe === 1) {
      if (gapT < this.props.fastSwipeTime || Math.abs(moveDelta) >= this.props.tabWidth / 2) {
        cur = moveDelta > 0 ? Math.max(this.props.cur - 1, 0) : Math.min(this.props.cur  + 1, this.props.num - 1)
        this.props.tabChange(cur)
      }
      this.animateView(cur)
    }
    this.isSwipe = 0
    this.props.onSwipe(false)
  }
  animateView (cur) {
    this.containerRef.current.style.transition = 'all 0.3s linear'
    this.containerRef.current.style.transform = `translate3d(${-1 * cur * this.props.tabWidth}px, 0, 0)`
  }
  render () {
    const containerStyle = Object.assign({
      width: `${this.props.num * this.props.tabWidth}px`,
      display: 'flex'
    }, this.props.containerStyle)
    const tabViewStyle = {
      width: '100%',
      overflowX: 'hidden'
    }
    return (
      <div style={tabViewStyle} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchMove}
           onTouchEnd={this.handleTouchEnd}>
        <div ref={this.containerRef} style={containerStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

SwipeView.defaultProps = {
  fastSwipeTime: 300,
  containerStyle: {},
  tabChange: function() {},
  onSwipe: function() {}
}

export default SwipeView
