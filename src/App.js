import React, { Component } from 'react';
import Login from './components/Login';
import Startpage from './components/Startpage';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import MyBookings from './components/MyBookings';
import CurrentShowsPage from './components/CurrentShowsPage';
import MovieInfo from './components/MovieInfo';
import REST from './REST'

class Movie extends REST { }

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    }
    this.getMovies();
  }

  async getMovies() {
    this.setState({ movies: await Movie.find() });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Startpage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/showtime'>
            <CurrentShowsPage movies={this.state.movies}/>
          </Route>
          <Route exact path='/film/id' component={MovieInfo} />
        </div>
      </Router>
    );
  }
}

export default App;
