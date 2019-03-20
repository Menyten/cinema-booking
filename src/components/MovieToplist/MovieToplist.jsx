import React, { Component } from 'react';
import REST from './REST.js';
import { Row, Col, Container, Button} from 'reactstrap';
import './movietoplist.scss'

class Booking extends REST {}

class MovieTopList extends Component {
  constructor(props) {
    super(props);
    this.getToplist();
    this.toplist = [];
    this.state = {
      toplist: []
    }
  }

  async getToplist() {
    let bookings = await Booking.find(
      `.find().populate('showTimeDetails').exec()`
    );
    console.log(bookings);
    let movieCount = {};
    for (let booking of bookings) {
      if (booking.showTimeDetails == null) {
        console.log(booking);
        continue;
      }
      let title = booking.showTimeDetails.film;
      if (!movieCount[title]) {
        movieCount[title] = {
          movie: title,
          count: 0,
          id: booking.showTimeDetails._id
        };
      }
      movieCount[title].count = movieCount[title].count + booking.seats.length;
    }

    for (let title in movieCount) {
      this.toplist.push(movieCount[title]);
    }

    this.toplist.sort((a, b) => {
      return b.count - a.count;
    });

    this.setState({
      toplist: this.toplist
    })
    }


  render() {
    if(this.state.toplist.length === 0){
      return <div />
    }
    return <Container className="container-toplist">
        {this.toplist.map((movie, index) => {
          console.log(movie);
          return <Row>
              <Col>
                <Row>
                  <Col key={index} className="text-toplist">{index + 1}</Col>
                  <Col className="text-toplist">{movie.movie}</Col>
                  <Col className="text-toplist">{movie.count}</Col>
                </Row>
              </Col>
            </Row>;
        })}{' '}
      </Container>;

  }
}

export default MovieTopList;
