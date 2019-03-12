import React from 'react';
import HistoryBookings from '../HistoryBookings/index';
import CurrentBookings from '../CurrentBookings/index';
import REST from '../../REST';
import { Row, Col } from 'reactstrap';


class User extends REST {}

class MyBookings extends React.Component {
    constructor(props){
      super(props);
      this.getUser()
    }

    async getUser() {
      //let users = await User.find();
       let users = await User.find();
      console.log(users);
    }


    // async getBookings(history) {
    //     let user = await Login.find();
    //     this.bookings = await Booking.find(
    //       `.find({userId: "${user._id}"}).populate('showTimeDetails').exec()`
    //     );

    render() {
    return(
      <Row>
           <Col md="6" sm="12"><HistoryBookings/></Col> 
           <Col md="6" sm="12"><CurrentBookings /></Col>
       </Row>);
  } 
};

export default MyBookings;