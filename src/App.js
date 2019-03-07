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
class Showtime extends REST { }

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      showtimes: [],
    }
    this.getMoviesAndShowtimes();
  }

  async getMoviesAndShowtimes() {
    this.setState({
      movies: await Movie.find(),
      showtimes: await Showtime.find()
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path='/' component={Startpage} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/showtime' render={() => <CurrentShowsPage movies={this.state.movies} showtimes={this.state.showtimes} />} />
          <Route exact path='/film/id' component={MovieInfo} />
          {this.state.movies.map(movie => (
            <Route exact path={`/film/${movie._id}`} render={() => <MovieInfo movie={movie} />} key={movie._id} />
            ))}
            
        </div>
      </Router>
    );
  }
}

export default App;
