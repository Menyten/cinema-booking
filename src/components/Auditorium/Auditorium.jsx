import { Container, Row, Col } from 'reactstrap';
import './auditorium.scss';
import React from 'react';
import Seat from '../Seat'

const Auditorium = ({ auditorium, seatClick }) => {

  const createSeatLayout = () => {
    let seats = [];
    let seatsBySeatNumber = {};
    let rowIndex = 0;
    let row = 1;
    let seatNum = 1;

    for (let numberOfSeatsInTheRow of auditorium[0].seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = <Seat row={row} seatNum={seatNum} seatClick={seatClick} key={seatNum} />
        console.log('seat', seat)
        seatsInRow.push(seat);
        seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      seats.push(<div key={row}>{seatsInRow}</div>);
      /**
      *
      * Sort the seat numbers in a row from high to low 
      * NOTE! NOT WORKI
      */
      /* seats[rowIndex].sort((a, b) => b.seatNum - a.seatNum); */
      rowIndex++;
      row++;
    }
    console.log(seats);
    return seats;
  }

  return (
    <div>
      <h5>{auditorium[0].name}</h5>
      {createSeatLayout()}
    </div>
  )
};

export default Auditorium;