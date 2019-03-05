import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './movie.scss';
import MovieInfo from '../MovieInfo/MovieInfo';

class Movie extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { movieInfo: { title, image }, showtimes } = this.props;
    return (
      <Row className='movie mt-5'>
        <Col xs='12'>
          <h3 className='movie-title'>
            {title}
          </h3>
        </Col>
        <Col xs='12' lg='4'>
          <img className='img-fluid' src={require(`../../../public${image[1]}`)} />
        </Col>
        <Col xs='12' lg='8'>
          {showtimes.filter(showtime => showtime.film.toLowerCase().includes(title.toLowerCase())).map(showtime => (
            <p key={showtime._id}>{showtime.date}</p>
          ))}
        </Col>
      </Row>
    );
  }
}

export default Movie;
