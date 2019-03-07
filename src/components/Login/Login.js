import React from 'react';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './loginstyle.scss'
import REST from './../../REST';

class Login extends REST {}

export default class LoginPage extends React.Component {
  constructor(props){
    super(props);
    this.loggedIn = false;
    this.createAccount = false;
    this.state = {email: '', password: ''}

    this.login = this.login.bind(this);
  }

  emailValidation(e){
    this.setState({email:  e.target.value})
  }

  passwordValidation(e){
    this.setState({password:  e.target.value})
  }

  async login(e) {
    e.preventDefault();
    let login = new Login({
      email: this.state.email,
      password: this.state.password,
    });
    let result = await login.save();
    if (result.error) {
      alert(result.error);
      return;
    }

    REST.setUser('true');
    this.props.history.push('/my-bookings');

    /*App.app.checkIfLoggedIn();
    this.loggedIn = true;
  
    
    Router.goto('/mybookings'); */
  } 


  render() {
    return (
      <Container>
        <Form className="Container">
          <h3 className="frontParagraph mt-3">Logga in</h3>
          <Row form>
            <Col md={6}>
              <FormGroup className="mt-3">
                <Label className="emailColor">Email</Label>
                <Input onChange={this.emailValidation.bind(this)} type="email"
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
                <Input onChange={this.passwordValidation.bind(this)} 
                  type="password"
                  className="form-control password"
                  name="password" id="examplePassword"
                  placeholder="..." />
              </FormGroup>
            </Col>
            <Col md={6} />
          </Row>
          <Button onClick={this.login} className="submit-btn individualButton" type="button"> Logga in </Button>
          <Button className="register-btn individualButton ml-1"> Registrera </Button>
        </Form>
      </Container>

    );
  }
}

/*

class Login extends Component {
  constructor(props) {
    super(props);

    this.addEvents({
      'click .submit-btn': 'login',

      'click .register-btn': 'register'
    })
    this.loggedIn = false;
    this.createAccount = false;
  }
  static get baseRoute() {
    return 'login/';
  }

  

 mount() {
  this.createAccount = false;
  this.render();
}

async delete() {
  this._id = 1;
  await super.delete();

  Router.goto('/');
  location.reload()


}

async register() {
  let user = new User({
    email: $('.email').val(),
    password: $('.password').val()
  });
  let validateEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let validatePasswordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (validateEmailRegEx.test(user.email)) {
    if (validatePasswordRegEx.test(user.password) === false) {
      $(this.baseEl).find('#registerModalPassword').modal({ show: true });
      return;
    }
    await user.save();
    $('.email').val('')
    $('.password').val('')
    this.createAccount = true;
    this.render();
    return;
  } else {
    $(this.baseEl).find('#registerModalEmail').modal({ show: true });
  }
}

async login() {
  let login = new Login({
    email: $('.email').val(),
    password: $('.password').val()
  });
  let result = await login.save();
  if (result.error) {
    alert(result.error);
    return;
  }
  App.app.checkIfLoggedIn();
  this.loggedIn = true;

  
  Router.goto('/mybookings');
}
}

*/