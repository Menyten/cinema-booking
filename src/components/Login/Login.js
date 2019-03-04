import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './loginstyle.scss'

export default class Login extends React.Component {
  render() {
    return (
      <Form className="Container">
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label className="emailColor">Email</Label>
              <Input type="email"
              className="form-control"
              name="email"
              id="exampleEmail"
              placeholder="with a placeholder" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label className="passwordColor">Password</Label>
              <Input type="password" className="form-control password" name="password" id="examplePassword" placeholder="password placeholder" />
            </FormGroup>
          </Col>
        </Row>
             <Button className="submit-btn individualButton"> Logga in </Button>
             <Button className="register-btn individualButton"> Registrera </Button>
      </Form>
  
    );
  }
}