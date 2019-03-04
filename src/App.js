import React, { Component } from 'react';
import Header from './components/Header';
import CurrentShowsPage from './components/CurrentShowsPage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <CurrentShowsPage />
      </div>
    );
  }
}

export default App;
