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
          return <Row key={index+342786}>
              <Col key={index+10}>
                <Row key={index+67326}>
                  <Col key={index} className="text-toplist">{index + 1}</Col>
                  <Col key={index+100} className="text-toplist">{movie.movie}</Col>
                  <Col key={index+1000} className="text-toplist">{movie.count}</Col>
                </Row>
              </Col>
            </Row>;
        })}{' '}
      </Container>;

  }
}

export default MovieTopList;
