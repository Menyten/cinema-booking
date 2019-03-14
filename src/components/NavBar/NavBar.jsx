import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Popover,
  PopoverBody
} from 'reactstrap';
import './navbar.scss';

class NavBar extends Component {

  static lastInstance;
  constructor(props) {
    super(props);
    window.NavBarInstance = this;
    NavBar.lastInstance = this;
    this.logoutRoute = this.logoutRoute.bind(this);
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

  logoutRoute() {
    this.props.history.push('/');
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
              <NavItem>
                <NavLink to='/movie-toplist' className='nav-link headlines'>Topplista</NavLink>
                </NavItem>
              {this.state.loggedIn ? <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleUser}>
                <DropdownToggle caret>
                  {this.props.user.email}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header><Button onClick={(event) => { this.props.logout(); this.logoutRoute();}}>Logga Ut</Button></DropdownItem>
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

export default withRouter(NavBar);

/*

async logout() {
    let logout = new Login();
    await logout.delete();
    App.app.checkIfLoggedIn();
  }

*/