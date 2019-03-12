import React from 'react';
import HistoryBookings from '../HistoryBookings/index';
import CurrentBookings from '../CurrentBookings/index';
import { Row, Col } from 'reactstrap';


class MyBookings extends React.Component {
    constructor(props){
      super(props);
      this.getUser()
    }

 


    //  async getBookings(history) {
    //     let user = await Login.find();
    //      this.bookings = await Booking.find(
    //        `.find({userId: "${user._id}"}).populate('showTimeDetails').exec()`
    //      );

    render() {
    return(
      <Row>
           <Col md="6" sm="12"><HistoryBookings/></Col> 
           <Col md="6" sm="12"><CurrentBookings /></Col>
       </Row>);
  } 
};

export default MyBookings;