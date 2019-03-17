import React, { Component } from 'react';
import './Seat.scss';

class Seat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      booked: false,
      toBeBooked: false,
      row: this.props.row,
      seatNum: this.props.seatNum
    }
    this.toggleChosen = this.toggleChosen.bind(this);
    this.click = this.click.bind(this);
  }

  toggleChosen() {
    !this.state.toBeBooked ? this.setState({ toBeBooked: true }) : this.setState({ toBeBooked: false });
  }

  click(e) {
    this.toggleChosen();
    this.props.seatClick(e);
  }

  render() {
    const { row, seatNum } = this.props;
    return (
      <div
        className={`seat ${this.state.toBeBooked ? 'active' : ''}`}
        data-row={row}
        data-seat={seatNum}
        onClick={this.click}
      />
    );
  }

};

export default Seat;
