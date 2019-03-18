import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './movie.scss';

class Movie extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { movieInfo: { title, image, _id }, showtimes } = this.props;
    return (
      <Row className='movie mt-5'>
        <Col xs='12'>
          <Link to={`/film/${_id}`} >
            <h3 className='movie-title'>
              {title}
            </h3>
          </ Link>
        </Col>
        <Col xs='12' lg='4'>
          <img className='img-fluid' src={require(`../../../public${image[1]}`)} />
        </Col>
        <Col className='mt-3 mt-sm-3 mt-md-0' xs='12' lg='8'>
          {showtimes.filter(showtime => showtime.film.toLowerCase().includes(title.toLowerCase())).map(showtime => (
            <Link to={`/showing/${showtime._id}`} key={showtime._id} ><p className='mr-3' >{showtime.date}</p></Link>
          ))}
        </Col>
      </Row>
    );
  }
}

export default Movie;
