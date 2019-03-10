import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import REST from '../../REST';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Popover,
  PopoverBody
} from 'reactstrap';
import './navbar.scss';

class Login extends REST { 
  static get baseRoute() {
    return 'login/';
  }

  async delete() {
    this._id = 1;
    // we set an id here, because the REST class
    // will complain if we try to call delete on an object without _id
    // - and we use delete to logout (see test.js)
 
    return super.delete();
  }
}

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggleUser = this.toggleUser.bind(this);
    this.state = {
      isOpen: false
    };

    this.toggleUserInfo = this.toggleUserInfo.bind(this);
    this.state = {
      popoverOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };

    setInterval(() => {
      this.setState({ loggedIn: REST.getUser() })
    }, 1000)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleUser() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleUserInfo() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  async logout() {
    let logout = new Login();
    await logout.delete();
  }

  render() {
    return (
      <div>
        <Navbar className='nav-design' light expand="lg">
          <NavbarBrand href="/"></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mx-auto" navbar>
              <NavItem>
                <NavLink to='/' className='nav-link headlines'>Start</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to={this.state.loggedIn ? '/my-bookings' : '/login'} className='nav-link headlines'>{this.state.loggedIn ? 'Mina bokningar' : 'Logga In'}</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to='/showtime' className='nav-link headlines'>Boka Biljetter</NavLink>
              </NavItem>
              {this.state.loggedIn ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleUser}>
                <DropdownToggle caret>
                  {this.props.user.email}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header><Button onClick={this.logout}>Logga Ut</Button></DropdownItem>
                </DropdownMenu>
              </Dropdown> : <div className="loggedInDiv">Inte inloggad<i className="fas fa-info-circle icon-BC" id="Popover1" type="button">
                <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1" toggle={this.toggleUserInfo}>
                  <PopoverBody>OBS! Tänk på att om du inte är inloggad kommer du inte kunna se din bokningshistorik, registrera dig gärna för att kunna se detta samt att du kan ta del av exklusiva erbjudanden! </PopoverBody>
                </Popover></i></div>}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;

/*

async logout() {
    let logout = new Login();
    await logout.delete();
    App.app.checkIfLoggedIn();
  }

*/