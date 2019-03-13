import React from 'react';
import './Seat.scss';

const Seat = ({ row, seatNum }) => {
  let booked;
  let toBeBooked;

  return (
    <div
      className="seat ${this.toBeBooked ? 'active' : ''} ${this.booked ? 'alreadyBooked' : ''}"
      data-row={row}
      data-seat={seatNum}
    />
  );
};

export default Seat;
