import React, { Component } from 'react';
import Countdown from './components/Countdown'
import Header from './components/Header'
import './styles/GlobalStyle.css'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Countdown />
      </div>
    )
  }
};

export default App;
