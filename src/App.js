import React, { Component } from 'react';
import LoginPage from './components/LoginPage';
import Startpage from './components/Startpage';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header';
import CurrentShowsPage from './components/CurrentShowsPage';
import MovieInfo from './components/MovieInfo';
import Showing from './components/Showing';
import NavBar from './components/NavBar';
import MyBookings from './components/MyBookings';
// import CurrentBookings from './components/CurrentBookings';
import REST from './REST'
import AdminPage from './components/AdminPage';
import { Container, Row, Col } from 'reactstrap';

class Movie extends REST { }
class Showtime extends REST { }
class Auditorium extends REST { }
class User extends REST { }
class Booking extends REST {}
class Login extends REST {
  async delete() {
    this._id = 1;
    return super.delete();
  }
}

class App extends Component {
  constructor() {
    super();
    window.AppInstance = this;
    this.state = {
      movies: [],
      showtimes: [],
      user: {},
      auditoriums: [],
      userAdmin: {}
    }
    this.setUser()
    window.AppInstance = this;
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.getMoviesShowtimesAuditoriumAndUser();
  }

  async getMoviesShowtimesAuditoriumAndUser() {
    this.setState({
      movies: await Movie.find(),
      showtimes: await Showtime.find(),
      auditoriums: await Auditorium.find(),
      users: await User.find(),      
     
    });
  }

  async setUser(username) {
    let user = await Login.find();
    this.setState({
      user: user
    }); 
    NavBar.WrappedComponent.lastInstance.setState({
      loggedIn: user.email ? true:false
      
    });
    this.setState({
      userAdmin: user
    })
    
  }

  async logout() {
    let logout = new Login();
    await logout.delete();
    let user = await Login.find();
    NavBar.WrappedComponent.lastInstance.setState({
      loggedIn: user.email = false
    });
    
  }


  filterAuditoriums(showtime) {
    let auditorium = this.state.auditoriums.filter(auditorium => auditorium._id === showtime.auditorium);
    return auditorium[0] || {};
  };


  render() {
    return <Router>
        <div className="App">
          <Header user={this.state.user} logout={this.logout} />
          <Route exact path='/' component={Startpage} />
          <Route exact path='/login' render={() => <LoginPage setUser={this.setUser} allUsers={this.state.userAdmin} />} />
          <Route exact path='/AdminPage' render={() => <AdminPage />} />
          <Route exact path='/my-bookings' render={() => <MyBookings />} />
          <Route exact path="/showtime" render={() => <CurrentShowsPage movies={this.state.movies} showtimes={this.state.showtimes} />} />
          
          {this.state.showtimes.map(showtime => (
            <Route
              exact
              path={`/showing/${showtime._id}`}
              render={() => <Showing showtime={showtime} auditorium={this.filterAuditoriums(showtime)} />}
              key={showtime._id}
            />
          ))
        }
        <Route exact path='/film/id' component={MovieInfo} />
        {
          this.state.movies.map(movie => (
            <Route exact path={`/film/${movie._id}`} render={() => <MovieInfo movie={movie} />} key={movie._id} />
          ))
        }
      </div >
    </Router >;
  }
}

export default App;
