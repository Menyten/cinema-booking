import React from 'react';
import './Seat.scss';

const Seat = (props) => {
  let row;
  let seatNum;
  let booked;
  let toBeBooked;

  return (
    <div
      className="seat ${this.toBeBooked ? 'active' : ''} ${this.booked ? 'alreadyBooked' : ''}"
      data-row="${this.row}"
      data-seat="${this.seatNum}"
    />
  );
};

export default Seat;
