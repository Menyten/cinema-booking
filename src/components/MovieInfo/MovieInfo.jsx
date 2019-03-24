import React, { Component } from 'react';
import { Row, Col, Container, Button } from 'reactstrap';
import { Modal, ModalBody, ModalFooter }from 'reactstrap';


import './movieinfo.scss';

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.movieRating = [];
    this.toggle = this.toggle.bind(this);
    
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
       
      <Container className="movieinfo-div">

        <Container className="movieinfo-container">
          <Row>
            <Col md='6' className="div-movie">
              <Row className="birdbox-title">
                <h2>{this.props.movie.title}</h2>
              </Row>
              <h5 className="margin-fix">{this.props.movie.length} min | {this.props.movie.genre}</h5>
              <Row className="div-info"><span className="key description">{this.props.movie.description}</span></Row>
              <Row className="div-info"><span className="key">Produktionsår:</span><span className="info"> {this.props.movie.productionYear}</span></Row>
              <Row className="div-info"><span className="key">Filmdistributör:</span><span className="info"> {this.props.movie.distributor}</span></Row>
              <Row className="div-info"><span className="key">Filmdistributör:</span><span className="info"> {this.props.movie.distributor}</span></Row>
              <Row className="div-info"><span className="key">Originalspråk:</span><span className="info"> {this.props.movie.language}</span></Row>
              <Row className="div-info"><span className="key">Undertext:</span><span className="info"> {this.props.movie.subtitles}</span></Row>
              <Row className="div-info"><span className="key">Regi:</span><span className="info"> {this.props.movie.director}</span></Row>
              <Row className="div-info"><span className="key">Skådespelare:</span><span className="info"> {this.props.movie.actors.join(',')}</span></Row>
              <Row className="div-info"><span className="key">Produktionsland:</span><span className="info">
                {this.props.movie.productionCountries.join(',')}</span>
              </Row>
              <Col className="buttons-div">
                <Button onClick={this.toggle}>Se trailer</Button>
                <a href="/showtime" className="button">Boka Biljetter</a>
              </Col>
            </Col>

            <Col md='6' className="img-col" alt="">
              <img src={this.props.movie.image[0]} alt='Movie'/>
              <Col className="desc">
                <p>{this.props.movie.reviews[0].quote} - <i>{this.props.movie.reviews[0].source}</i> </p>
                 <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star not-checked"></span>
              </Col>
            </Col>
      </Row>

          {this.state.modal ? <Modal isOpen={this.state.modal} toggle={this.toggle} className="buttons-div">
            <ModalBody>
              <p><embed src={`https://www.youtube.com/embed/${this.props.movie.youtubeTrailers}`} allowfullscreen="true" width="425" height="344" /></p>
            </ModalBody>
            <ModalFooter>
              <Button type="button" onClick={this.toggle}>Close</Button>
            </ModalFooter>
          </Modal> : ''}
        </Container>

      </Container> 
  );
  }
}

export default MovieInfo;