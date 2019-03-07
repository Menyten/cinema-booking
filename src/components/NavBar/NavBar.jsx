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
  DropdownItem } from 'reactstrap';
import './navbar.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };

    setInterval( () => {
      this.setState({loggedIn: REST.getUser()})
    }, 1000)
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;
