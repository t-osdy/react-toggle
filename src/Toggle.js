import React, { Component, PropTypes } from 'react'
import './App.css'
import { Motion, spring } from "react-motion"

const colors = {
  red: '#FF1744',
  green: '#00E676',
  active: 'white',
  background: 'rgba(0,0,0,0.2)'
}

class Toggle extends Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    value: false
  }

  render() {
    const style = {
      display: 'inline-block',
      position: 'relative',
      textAline: 'initial',
      vertivalAlign: 'middle',
      cursor: 'pointer',
      margin: '0.25em',
      WebkitTapHighlightColor: "rgba(0,0,0,0)",
      ...this.props.style
    }

    const height = 18
    const width = 33
    const border = 1.5
    const circlePosition = this.props.value ? width - height/2 : height/2

    return (
      <svg height="1em" {...this.props} style={style} viewBox={`0 0 ${width} ${height}`}>
        <rect
          x="0" y="0"
          width={width} height={height}
          rx={height/2} ry={height/2}
          fill={colors.background}
        />
        <Motion style={{cx: spring(circlePosition, {stiffness: 600, damping: 5})}}>
          {({cx}) => 
            <circle
              cx={cx}
              cy={height/2}
              r={height/2-border}
              fill={colors.active}
            />
          }
        </Motion>
      </svg>
    )
  }
}

export class Render extends Component {
  constructor(){
    super()

    this.state = {
      active: false
    }
  }

  handleToggle(){
    this.setState({active: !this.state.active})
  }

  render(){
    const flexStyle = {
      boxSizing: 'border-box',
      display: 'flex',
      flexBasis: 'auto',
      flexWrap: 'nowrap',
      flex: '1 1 auto',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center'
    }

    const style = {
      container: {
        ...flexStyle,
        fontFamily: 'Nunito, sans-serif',
        height: '100vh',
        fontSize: '10vw',
        background: this.state.active ? colors.green : colors.red
      },
      on: {
        color: this.state.active ? colors.active : colors.background
      },
      off: {
        color: this.state.active ? colors.background : colors.active
      }
    }

    return (
      <div style={style.container}>
        <p style={style.on}>On</p>
          <Toggle 
            style={style.toggle} 
            value={this.state.active} 
            onClick={this.handleToggle.bind(this)} 
          />
        <p style={style.off}>Off</p>
      </div>
    )
  }
}



