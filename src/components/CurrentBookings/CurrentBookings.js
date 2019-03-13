import React from 'react';
import { Container, Col, Table } from 'reactstrap';

const CurrentBookings = (props) => {
    return (
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
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          </Container>)
};

export default CurrentBookings;