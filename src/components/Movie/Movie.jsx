import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './movie.scss';

class Movie extends Component {
  render() {
    return (
      <Row>
        <Col>
          <h3 className='movie-title'>
            {/* <Link to={'/film/' + this.filmId}>
              Här kommer film namn var som länkar till movie info
            </Link> */}
          </h3>
        </Col>
        <Col lg='4'>
          {/* <img src={this.image[1]} /> */}
        </Col>
        <Col lg='8'>
          <p>Visningar för en film kommer här</p>
        </Col>
      </Row>
    );
  }
}

export default Movie;
