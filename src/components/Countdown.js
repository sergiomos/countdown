import React, { Component } from 'react';
import '../styles/Countdown.css'
import ActionsButtons from './ActionsButtons';
import CountdownFields from './CountdownFields';
import NotificationDenied from './NotificationDenied';
import Timer from './Timer';
import NotificationSound from '../audios/notification.mp3'

export default class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftMin: "",
      rightMin: "",
      leftSec: "",
      rightSec: "",
      status: "stopped"
    };
  };

  componentDidMount() {
    this.requestNotification();
  };

  componentDidUpdate() {
    const { time, status } = this.state;
    if(!time && status === 'started') {
      setTimeout(() => {
        this.stopTimer('code');
      }, 500);
      if(Notification.permission === 'granted') {
        this.sendNotification('Hora de codar! 💻');
      }
    }

  };

  handleClick = async () => {
    const { status } = this.state;
    switch(status) {
      case "started":
        this.pauseTimer();
        break;
      default:
        await this.setTime();
        await this.startTimer();
        break;
    }
  };

  handleChange = (event) => {
    const { target } = event;
    this.getTime(event);
    if (target.nextSibling && target.value) {
      target.nextSibling.focus();
    } else if (target.parentNode.nextSibling && target.value) {
      target.parentNode.nextSibling.nextSibling.firstChild.focus()
    }

  };

  sendNotification = (message) => {
    const audio = new Audio(NotificationSound);
    new Notification(message);
    audio.play();
  };

  requestNotification = () => {
    Notification.requestPermission();
  };

  startTimer = () => {
    const { time } = this.state

    if(time) {
      const timer = setInterval(() => {
        let { time, totalTime } = this.state;
        const timePercentage = (time * 100 )/ totalTime;
        time -= 1
        const minutes = parseInt(time / 60)
        const seconds = (time - minutes * 60)
        this.setState({
          time,
          minutes: minutes < 10 ? `0${minutes}` : minutes,
          seconds: seconds < 10 ? `0${seconds}` : seconds,
          timePercentage,
        })
      }, 1000);
      this.setState({
        timerID: timer,
        status: 'started',
      })
    }
    
  };

  pauseTimer = () => {
    this.setState({ status: 'paused' }, () => {
      const { timerID } = this.state
      clearInterval(timerID)
    })
  }

  stopTimer = (status) => {
    this.setState({ status, }, () => {
      const { timerID } = this.state
      clearInterval(timerID)
    })
  };

  addTime = () => {
    this.setState((prevState) =>  ({
      time: prevState.time + 60,
      totalTime: prevState.totalTime + 60
    }))
  };

  setTime = () => {
    const {status} = this.state;

    if(status === 'stopped') {
      const {leftMin = "0", rightMin = "0", leftSec = "0", rightSec = "0"} = this.state;

      let time = (Number(leftMin) * 10 + Number(rightMin)) * 60 + (Number(leftSec) * 10 + Number(rightSec))
      const minutes = parseInt(time / 60)
      const seconds = (time - minutes * 60)
  
      this.setState({
        time,
        totalTime: time,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      })
    }
  };

  getTime = ({ target: { name, value } }) => {
    this.setState({
      [name]: String(value)
    });
  };

  render() {
    const { permission } = Notification;
    const {leftMin, rightMin, leftSec, rightSec, minutes, seconds, status, timePercentage} = this.state;

    return (
      <div className="countdown-container">
        { status === 'stopped'? 
          <CountdownFields 
          leftMin={leftMin}
          rightMin={rightMin}
          leftSec={leftSec} 
          rightSec={rightSec}
          onChange={this.handleChange}
          />
          :
          < Timer 
            minutes={ minutes }
            seconds={ seconds }
            status={ status }
            percentage={ timePercentage }
            onClick={ this.addTime }
          />
        }
        
        <ActionsButtons
          onClick={ this.handleClick }
          onClickStop={ this.stopTimer }
          status={ status }
        />

        { permission !== 'granted' && <NotificationDenied />}
         
         
      </div>
    )
}
};
