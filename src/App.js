import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
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
class User extends REST { }
class Login extends REST { }

class App extends Component {
  constructor() {
    super();
    this.setUser.bind(this);
    this.state = {
      movies: [],
      showtimes: [],
      user: {}
    }
    this.setUser = this.setUser.bind(this);
    this.getMoviesAndShowtimes();
  }

  async getMoviesAndShowtimes() {
    this.setState({
      movies: await Movie.find(),
      showtimes: await Showtime.find()
    });
  }

  async setUser(username) {
    let user = await Login.find();
    this.setState({
      user: user
    });
  }

  /*async getUsers() {
    this.setState({
      users: await User.find()
    });
    console.log(this.state.users);
  } */

  render() {
    return (
      <Router>
        <div className="App">
          <Header user={this.state.user} />
          <Route exact path='/' component={Startpage} />
          <Route exact path='/login' render={() => <LoginPage setUser={this.setUser} />} />
          <Route exact path='/showtime' render={() => <CurrentShowsPage movies={this.state.movies} showtimes={this.state.showtimes} />} />
          <Route exact path='/film/id' component={MovieInfo} />
          <Route exact path='/my-bookings' component={MyBookings} />
        </div>
      </Router>
    );
  }
}

export default App;
