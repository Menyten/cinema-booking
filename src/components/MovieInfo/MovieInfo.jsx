import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class MovieInfo extends Component {
	render() {
		return (

			<Row>
				<Col lg='4'>
					<p> Movie image </p>
					{/* <img src={this.image[1]} /> */}
				</Col>
				<Col lg='8'>
					<p> Information om filmen osv kommer här </p>
				</Col>
			</Row>
		);
	}
}

export default MovieInfo;