import React, { Component } from 'react';
import '../styles/CountdownFields.css'

export default class CountdownFields extends Component {
  render() {
    const { leftMin, rightMin, leftSec, rightSec, onChange: getTime } = this.props;
    return (
      <div className="container">
        <div className="timeContainer">
          <input 
            type="text" 
            maxLength="1" 
            name="leftMin" 
            onChange={ getTime }
            value={ leftMin }
            placeholder="0"
          />
          <input 
            type="text" 
            maxLength="1" 
            name="rightMin" 
            onChange={ getTime }
            value={ rightMin }
            placeholder="0"
          />
        </div>
        <span className="doubleDots">:</span>
        <div className="timeContainer">
          <input 
            type="text" 
            maxLength="1"
            name="leftSec" 
            onChange={ getTime }
            value={ leftSec }
            placeholder="0"
            />
          <input 
            type="text" 
            maxLength="1" 
            name="rightSec" 
            onChange={ getTime }
            value={ rightSec }
            placeholder="0"
            />
        </div>
    </div>
    )
  }
}
