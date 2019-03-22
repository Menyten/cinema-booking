import React from "react";
import { Container, Table, Row, Col } from "reactstrap";
import REST from "../../REST";
class Booking extends REST {}
class Login extends REST {
  async delete() {
    this._id = 1;
    return super.delete();
  }
}
class MyBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: "",
      bookingHistory: [],
      currentBookings: [],
      booking: []
    };
  }

  componentDidMount() {
    this.getBookings();
  }

  async getBookings() {
    let user = await Login.find();
    if (!user._id) {
      return;
    }
    let bookings = await Booking.find(
      `.find({userId: "${user._id}"}).populate('showTimeDetails').exec()`
    );
    this.setState({ booking: "HRELLO" });

    function convertDate(booking) {
      let s = booking.showTimeDetails.date;
     
      let date = s.split("/")[0];
      let month = parseInt(s.split("/")[1]);
      let year = new Date().getFullYear();
      let time = booking.showTimeDetails.time;
      return new Date(year + " " + month + " " + date + " " + time);
    }

    // this.currentBookings = bookings.filter(booking => convertDate(booking) > new Date());
    // this.bookingHistory = bookings.filter(booking => convertDate(booking) < new Date());

    this.setState({
      currentBookings: bookings.filter(booking => {
        let date = convertDate(booking);
        return date > new Date();
      })
    });

    this.setState({
      bookingHistory: bookings.filter(booking => {
        let date = convertDate(booking);
        return date < new Date();
      })
    });
  }

  createTable(bookings) {
    return (
      <Table dark responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Bokningsnummer</th>
            <th>Film</th>
            <th>Datum</th>
            <th>Tid</th>
            <th>Säten</th>
            <th>Totalpris</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => {
            return (
              <tr key={booking._id}>
                <th scope="row">{this.rowNum}</th>
                <td>{booking.bookingNum}</td>
                <td>{booking.showTimeDetails.film}</td>
                <td>{booking.showTimeDetails.date}</td>
                <td>{booking.showTimeDetails.time}</td>
                <td>{booking.seats.join(",")}</td>
                <td>{booking.totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  render() {
    return (
      <Container>

        <Row>
          <Col>
            <h2 className="text-light mt-4"> Aktuella Bokningar </h2>
            {this.createTable(this.state.currentBookings)}
          </Col>
        </Row>

        <Row>
          <Col>
            <h2 className="text-light mt-4">Bokningshistorik</h2>
            {this.createTable(this.state.bookingHistory)}
          </Col>
        </Row>

      </Container>
    );
  }
}

export default MyBookings;
