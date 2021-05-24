import React, { Component } from 'react';
import { CircleProgress } from 'react-gradient-progress'

export default class Timer extends Component {
  render() {
    const { minutes, seconds, status, percentage = 100 } = this.props;
    if(status === 'code') {
      return (
        <div className="goBack">
          <span >Let's Code!</span>
        </div>
      )
    }
    return (
      <div className="timer">
        <CircleProgress 
          percentage={ percentage }
          primaryColor={['#F15238','#F15238']}
          width={250}
          strokeWidth={8}
          fontSize={0}
          className="progress"
        />
      <div className="numbers">
        <span>{ minutes }</span>
        <span>:</span>
        <span>{ seconds }</span>
      </div>
      </div>
    )
  }
}
