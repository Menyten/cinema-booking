import React from 'react';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './loginstyle.scss'

export default class Login extends React.Component {
  render() {
    return (
      <Container>
        <Form className="Container">
          <h3 className="frontParagraph mt-3">Logga in</h3>
          <Row form>
            <Col md={6}>
              <FormGroup className="mt-3">
                <Label className="emailColor">Email</Label>
                <Input type="email"
                  className="form-control"
                  name="email"
                  id="exampleEmail"
                  placeholder="..." />
              </FormGroup>
            </Col>
            <Col md={6} />
          </Row>
          <Row form>
            <Col md={6}>
              <FormGroup className="mt-3">
                <Label className="passwordColor">Password</Label>
                <Input type="password"
                  className="form-control password"
                  name="password" id="examplePassword"
                  placeholder="..." />
              </FormGroup>
            </Col>
            <Col md={6} />
          </Row>
          <Button className="submit-btn individualButton"> Logga in </Button>
          <Button className="register-btn individualButton ml-1"> Registrera </Button>
        </Form>
      </Container>

    );
  }
}
