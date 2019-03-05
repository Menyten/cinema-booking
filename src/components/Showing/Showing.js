import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Auditorium from '../Auditorium';

export default class Showing extends Component {
  render() {
    return (
      <Container>
        <Row className="mt-5">
          <h2 className="col-sm-12 cinemaDiv">
            {this.showing === undefined ? '' : this.showing.film}
          </h2>
          <p className="col-sm-12 cinemaDiv text-center">
            Datum: {this.showing === undefined ? '' : this.showing.date}
          </p>
          <p className="col-sm-12 cinemaDiv text-center">
            Tid: {this.showing === undefined ? '' : this.showing.time}
          </p>
        </Row>
        <Row className="pt-3 mt-4 text-center cinemaDiv">
          <h2 className="col-12 pickTicketSize">Välj antal biljetter</h2>
          <Col sm="12" md="4" className="mb-1">
            <h4 className="personTicketSize">Vuxna (85kr)</h4>
            <Button type="button" className="btn btn remove-adult remove-one selectButton selectButton1">-</Button>
            <span className="adult">{this.countAdult}</span>
            <Button type="button" className="btn btn add-adult add-one selectButton selectButton2">+</Button>
          </Col>
          <Col sm="12" md="4" className="mb-1">
            <h4 className="personTicketSize">Barn (65kr)</h4>
            <Button type="button" className="btn btn remove-kid remove-one selectButton selectButton1">-</Button>
            <span className="kid">{this.countKid}</span>
            <Button type="button" classname="btn btn add-kid add-one selectButton selectButton2">+</Button>
          </Col>
          <Col sm="12" md="4" className="mb-1">
            <h4 className="personTicketSize">Pensionär (75kr)</h4>
            <Button type="button" className="btn btn remove-retired remove-one selectButton selectButton1">-</Button>
            <span className="retired">{this.countRetired}</span>
            <Button type="button" className="btn btn add-retired add-one selectButton selectButton2">+</Button>
          </Col>
          <Button className="bookButton" {this.bookButton ? '' : 'disabled="disabled"'}>Slutför bokning</Button>
          <Button className="individualSeats individualButton">Välj separata stolar</Button>
        </Row>
        <Row className="mt-4 MQ">
          <Col md="3" sm="4" />
          <Col md="6" sm="4" className="screen">
            <div className="row screentext">
              <div className="shadow-left"></div>
              <div className="shadow-right"></div>
              <div className="center-screen">
                <div class="audi-left"></div>
                <div class="audi-right"></div>
                <div class="audi-screen">Bioduk</div>
              </div>
            </div>
          </Col>
          <Col md="3" sm="4" />
        </Row>
        <Row className="mt-5 text-center">
          <Col xs="12"><Auditorium /></Col>
        </Row>
      </Container>
    )
  }

}
