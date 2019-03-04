import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

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

          
        </Row>
      </Container>
    )
  }

}

/*

      


    <div class="col-sm-12 mb-1 col-md-4">
      <h4 class="personTicketSize">Pensionär (75kr)</h4>
      <button type="button" class="btn btn remove-retired remove-one selectButton selectButton1">-</button>
      <span class="retired">${this.countRetired}</span>
      <button type="button" class="btn btn add-retired add-one selectButton selectButton2">+</button>
    </div>
    <button class="bookButton" ${this.bookButton ? '' : 'disabled="disabled"' }>Slutför bokning</button>
    <button class="individualSeats individualButton">Välj separata stolar</button>
  </div>
  <div class="row mt-4 MQ">
    <div class="col-md-3 col-sm-4"></div>
    <div class="col-md-6 col-sm-4 screen">
      <div class="row screentext">
        <div class="shadow-left"></div>
        <div class="shadow-right"></div>
        <div class="center-screen">
          <div class="audi-left"></div>
          <div class="audi-right"></div>
          <div class="audi-screen">Bioduk</div>
        </div>
      </div>
    </div>
    <div class="col-md-3 col-sm-4">
    </div>
  </div>
  <div class="row mt-5 text-center">
    <div class="col-12">${this.auditorium}</div>
  </div>
</div>

*/