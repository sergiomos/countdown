import React, { Component } from 'react';
import { BsFillPauseFill, BsFillPlayFill, BsFillSquareFill } from 'react-icons/bs'

export default class ActionsButtons extends Component {
  render() {
    const { onClick: handleClick, status, onClickStop } = this.props;
    return (
      <div className="actionsButtons">
          <button 
            onClick={ handleClick }
            className="playPause"
          >
            { status !== 'started' ? <BsFillPlayFill /> : <BsFillPauseFill />}
            
          </button>
          { status !== 'stopped' &&
            <button 
                onClick={ () => onClickStop('stopped') }
                className="stop"
            >
              <BsFillSquareFill/>
            </button>
          }  
        </div>
    )
  }
}