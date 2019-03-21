import React, { Component } from 'react';
import './Seat.scss';

class Seat extends Component {
  constructor(props) {
    super(props);

    // this.toggleChosen = this.toggleChosen.bind(this);
    // this.click = this.click.bind(this);
  }

  /* toggleChosen() {
    !this.state.toBeBooked ? this.setState({ toBeBooked: true }) : this.setState({ toBeBooked: false });
  } */

  /* click(e) {
    this.toggleChosen();
    this.props.seatClick(e);
  } */


  render() {
    const { row, seatNum, toBeBooked, booked } = this.props;
    return (
      <div
        className={`seat ${toBeBooked ? 'active' : ''} ${booked ? 'alreadyBooked' : ''}`}
        data-row={row}
        data-seat={seatNum}
        onClick={(e) =>   this.props.individualSeats ? this.props.seatClick(e) : '' }
      />
    );
  }

};

export default Seat;
