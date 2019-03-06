import React, { Component } from 'react';
import { Row, Col, Container ,Button , Img } from 'reactstrap';

class MovieInfo extends Component {
    render () {
        return (
            
            <Container className="movieinfo-div">

                
                    <Row className="Container">
                        <Row>
                            <Col md='8'>
                                <Col className="birdbox-title">
                                    <h2>Movie Title</h2>
                                </Col>

                            <Col md='4'>
                                <p> Filmen image kommer här</p>
                                {/* <img src="${this.movie.image[0]}" /> */}

                            </Col>
                                
                                <div><span className="key description">Movie Description</span></div>
                                <div className="div-info"><span className="key">Produktionsår:</span><span className="info">productionYear</span></div>
                                <div className="div-info"><span className="key">Filmdistributör:</span><span className="info">distributor</span></div>
                                <div className="div-info"><span className="key">Originalspråk:</span><span className="info">language</span></div>
                                <div className="div-info"><span className="key">Undertext:</span><span className="info">subtitles</span></div>
                                <div className="div-info"><span className="key">Regi:</span><span className="info">director</span></div>
                                <div className="div-info"><span className="key">Skådespelare:</span><span className="info">actors</span></div>
                                
                                <div className="Buttons-div">
                                    <Button>Se trailer</Button>
                                    {/* <a href="/showtime" className="Button">Boka Biljetter</a> */}
                                </div>
                            </Col>
                            
                        </Row>
                    </Row>
               
            </Container>
           

        );
    }
}
 
export default MovieInfo;