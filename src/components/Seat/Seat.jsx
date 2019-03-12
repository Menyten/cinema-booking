import React from 'react';
import './Seat.scss';

const Seat = ({ row, seatNum, seatClick }) => {
  let booked = false;
  let toBeBooked = false;

  return (
    <div
      className="seat ${this.toBeBooked ? 'active' : ''} ${this.booked ? 'alreadyBooked' : ''}"
      data-row={row}
      data-seat={seatNum}
      onClick={seatClick}
    />
  );
};

export default Seat;
