import React from 'react';
import { Col, Table, Container } from 'reactstrap';
import REST from '../../REST';
class Booking extends REST {};
class Login extends REST {
  async delete() {
    this._id = 1;
    return super.delete();
  }
}
class MyBookings extends React.Component {
  constructor(props){
    super(props);
   this.bookings =[];
  }
   
  async componentDidMount(){
    let user = await Login.find();
    if(!user._id) {return;}
    console.log('user', user)
    let bookings = await Booking.find(`.find({userId: "${user._id}"}).populate('showTimeDetails').exec()`)
    console.log('bookings', bookings);
    this.bookings = bookings.map(booking => 
      <tr key={booking._id}>
        <th scope="row">1</th>
        <td>{booking.bookingNum}</td>
        <td>{booking.showTimeDetails.film}</td>
        <td>{booking.showTimeDetails.date}</td>
        <td>{booking.showTimeDetails.time}</td>
        <td>{booking.seats}</td>
        <td>{booking.totalPrice}</td>
      </tr>
    );

  }

  render() { 

    return( 
      <Container>
        <Col>
          <h1 className="text-light mt-4"> Aktuella Bokningar </h1>
          <Table dark>
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
              {this.bookings}
            </tbody>
          </Table>
        </Col>
      </Container>
    );
  }

}

export default MyBookings;