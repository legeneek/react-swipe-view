import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SwipeView extends Component {
  constructor (props) {
    super(props)
    this.containerRef = React.createRef()
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.isSwipe = 0
    this.startX = 0
    this.startY = 0
    this.moveDelta = 0
    this.moveStartT = 0
    this.disableNodeList = null
  }
  componentDidMount () {
    this.containerRef.current.style.transform = `translate3d(${-1 * this.props.cur * this.props.tabWidth}px, 0, 0)`
    if(this.props.disableTouch) {
      this.disableNodeList = this.containerRef.current.querySelectorAll(this.props.disableTouch.join(','))
    }
  }
  componentDidUpdate () {
    this.animateView(this.props.cur)
  }
  handleTouchStart (e) {
    if(this.isDisableTouch(e.target)) return

    this.containerRef.current.style.transition = ''
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      this.moveStartT = Date.now()
      this.startX = touch.pageX
      this.startY = touch.pageY
      this.moveDelta = 0
    }
  }
  handleTouchMove (e) {
    if(this.isDisableTouch(e.target)) return

    const touch = e.touches[0]
    const deltaX = touch.pageX - this.startX
    const deltaY = touch.pageY - this.startY
    this.moveDelta = deltaX

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
  handleTouchEnd (e) {
    if(this.isDisableTouch(e.target)) return

    const gapT = Date.now() - this.moveStartT
    let cur = this.props.cur
    if (this.isSwipe === 1) {
      if (gapT < this.props.fastSwipeTime || Math.abs(this.moveDelta) >= this.props.tabWidth / 2) {
        cur = this.moveDelta > 0 ? Math.max(this.props.cur - 1, 0) : Math.min(this.props.cur  + 1, this.props.num - 1)
        this.props.tabChange(cur)
      }
      this.animateView(cur)
    }
    this.isSwipe = 0
    this.props.onSwipe(false)
  }
  animateView (cur) {
    this.containerRef.current.style.transition = `all ${this.props.animation.duration || 0.3}s ${this.props.animation.timing || 'linear'} ${this.props.animation.delay || 0}s`
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
  isDisableTouch (target) {
    if (!this.disableNodeList) {
      return false
    }
    
    return Array.prototype.indexOf.call(this.disableNodeList, target) !== -1
  }
}

SwipeView.propTypes = {
  num: PropTypes.number.isRequired,
  tabWidth: PropTypes.number.isRequired,
  cur: PropTypes.number,
  fastSwipeTime: PropTypes.number,
  tabChange: PropTypes.func,
  onSwipe: PropTypes.func,
  containerStyle: PropTypes.object,
  animation: PropTypes.shape({
    duration: PropTypes.number,
    timing: PropTypes.string,
    delay: PropTypes.number
  }),
  disableTouch: PropTypes.arrayOf(PropTypes.string)
}

SwipeView.defaultProps = {
  cur: 0,
  fastSwipeTime: 300,
  containerStyle: {},
  tabChange: function() {},
  onSwipe: function() {},
  animation: {
    duration: 0.3,
    timing: 'linear',
    delay: 0
  },
  disableTouch: []
}

export default SwipeView
