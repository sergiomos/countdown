import React, { Component } from 'react';
import { BsFillPauseFill, BsFillPlayFill, BsFillSquareFill } from 'react-icons/bs'

export default class ActionsButtons extends Component {
  renderPlayPouseButton = (status, handleClick) => (
    <button 
      onClick={ handleClick }
      className="playPause"
    >
      { status !== 'started' ? <BsFillPlayFill /> : <BsFillPauseFill />}
      
    </button>
  )

  renderStopButton = (onClickStop) => (
    <button 
    onClick={ () => onClickStop('stopped') }
    className="stop"
    >
      <BsFillSquareFill/>
    </button>
  )

  render() {
    const { onClick: handleClick, status, onClickStop } = this.props;
    return (
      <div className="actionsButtons">
          {status !== 'code' && this.renderPlayPouseButton(status, handleClick)}
          { status !== 'stopped' && this.renderStopButton(onClickStop) }  
        </div>
    )
  }
}