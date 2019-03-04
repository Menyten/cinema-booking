import React, { Component } from 'react';
import Movie from '../Movie';
import './currentshowspage.scss';

class CurrentShowsPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    const { movies } = this.props;
    return (
      movies.map(movie => (
        <Movie movieInfo={movie} key={movie.id}/>
      ))
    );
  }
}

export default CurrentShowsPage;
