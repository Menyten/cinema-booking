import React, { Component } from 'react';
import Header from './components/Header';
import MyBookings from './components/MyBookings';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MyBookings />
      </div>
    );
  }
}

export default App;
