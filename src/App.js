import React, { Component } from 'react';
import Startpage from './components/Startpage';
import './App.scss';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/Header';
import MyBookings from './components/MyBookings';
import CurrentShowsPage from './components/CurrentShowsPage';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
        <MyBookings />
        <Route exact path='/' component={Startpage} />
        <Route exact path='/showtime' component={CurrentShowsPage} />
      </div>
      </Router>
    );
  }
}

export default App;
