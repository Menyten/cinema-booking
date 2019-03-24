import './auditorium.scss';
import Seat from '../Seat';
import React, { Component } from 'react';

class Auditorium extends Component {

  render() {
    const { auditorium, seatLayout, seatClick, individualSeats } = this.props;
    return (
      <div>
        <h5>{auditorium[0].name}</h5>
        {seatLayout.map((row, index) => (
          <div key={index}>
            {row.map(seat => (
              <Seat
                row={seat.row}
                booked={seat.booked}
                seatNum={seat.seatNum}
                key={seat.seatNum}
                toBeBooked={seat.toBeBooked}
                seatClick={seatClick}
                individualSeats={individualSeats}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
};

export default Auditorium;