import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Movie from '../Movie';
import './currentshowspage.scss';

class CurrentShowsPage extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  render() {
    const { movies, showtimes } = this.props;
    return (
      <Container>
        {movies.map(movie => (<Movie movieInfo={movie} showtimes={showtimes} key={movie.id} />))}
      </Container>
    )
  }
}

export default CurrentShowsPage;
