class Auditorium extends Component {
  constructor(props) {
    super(props);
    this.addEvents({
      'click .seat': 'seatClick'
    });
    this.seats = [];
    this.seatsBySeatNumber = {};
    this.chosenSeats = [];
    let row = 1;
    let seatNum = 1;
    for (let numberOfSeatsInTheRow of this.seatsPerRow) {
      let seatsInRow = [];
      while (seatsInRow.length < numberOfSeatsInTheRow) {
        let seat = new Seat({ row, seatNum });
        seatsInRow.push(seat);
        this.seatsBySeatNumber[seatNum] = seat;
        seatNum++;
      }
      this.seats.push(seatsInRow);
      row++;
    }
  }

  seatClick(e) {
    console.log(e.target);
    let seat = this.seatsBySeatNumber[$(e.target).attr('data-seat')];
    seat.booked = seat.booked ? false : true;
    this.chosenSeats.push(e.target.dataset.seat)
    console.log(this.chosenSeats);
    seat.render();
  }
}
