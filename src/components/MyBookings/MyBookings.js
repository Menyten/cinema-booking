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
       let users = await User.find(`.find({Email:"siko"})`);
      console.log(users);
    }

    render() {
    return(
      <Row>
           <Col md="6"><HistoryBookings/></Col> 
           <Col md="6"><CurrentBookings /></Col>
       </Row>);
  } 
};

export default MyBookings;