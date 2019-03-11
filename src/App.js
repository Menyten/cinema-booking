import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
import Startpage from './components/Startpage';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import MyBookings from './components/MyBookings';
import CurrentShowsPage from './components/CurrentShowsPage';
import MovieInfo from './components/MovieInfo';
import Showing from './components/Showing';
import NavBar from './components/NavBar';
import REST from './REST'

class Movie extends REST { }
class Showtime extends REST { }
class User extends REST { }
class Login extends REST {
  async delete() {
    this._id = 1;
    return super.delete();
  }
 }

class App extends Component {
  constructor(props) {
    super(props);
    window.AppInstance = this;
    this.setUser();
    this.logout.bind(this);
    this.setUser.bind(this);
    this.state = {
      movies: [],
      showtimes: [],
      user: {}
    }
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
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
    NavBar.WrappedComponent.lastInstance.setState({
      loggedIn: user.email?true:false
    });
  }

  async logout() {
    let logout = new Login();
    await logout.delete();
    let user = await Login.find();
    NavBar.WrappedComponent.lastInstance.setState({
      loggedIn: user.email = false
    });
    
  }

  render() {
    return <Router>
        <div className="App">
          <Header user={this.state.user} logout={this.logout} />
          <Route exact path='/' component={Startpage} />
          <Route exact path='/login' render={() => <LoginPage setUser={this.setUser} />} />
          <Route exact path='/my-bookings' render={() => <MyBookings historyBooking={this.state.historyBooking} currentBooking={this.state.currentBooking}/>} />
          <Route exact path="/showtime" render={() => <CurrentShowsPage movies={this.state.movies} showtimes={this.state.showtimes} />} />
          {this.state.showtimes.map(showtime => (
            <Route
              exact
              path={`/showing/${showtime._id}`}
              render={() => <Showing showtime={showtime} />}
              key={showtime._id}
            />
          ))}
          <Route exact path='/film/id' component={MovieInfo} />
          {this.state.movies.map(movie => (
            <Route exact path={`/film/${movie._id}`} render={() => <MovieInfo movie={movie} />} key={movie._id} />
            ))}
        </div>
      </Router>;
  }
}

export default App;
