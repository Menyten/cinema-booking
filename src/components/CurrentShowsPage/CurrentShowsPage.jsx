import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Movie from '../Movie';
import './currentshowspage.scss';

class CurrentShowsPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { movies, showtimes } = this.props;
    return (
      <Container>
         {/* {(!this.props.movie || !this.props.movie.title) ? <h1> Ingen film med detta id </h1> : */}
          {/* movies.map(movie => (<Movie movieInfo={movie} showtimes={showtimes} key={movie.id} />))}  */}
          {movies.map(movie => (<Movie movieInfo={movie} showtimes={showtimes} key={movie.id} />))}
      </Container>
    )
  }
}

export default CurrentShowsPage;
