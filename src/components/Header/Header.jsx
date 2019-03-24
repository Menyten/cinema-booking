import React, { Component } from 'react';
import NavBar from '../NavBar';


class Header extends Component {

  render() {

    let { user } = this.props
    let logout = this.props.logout
    let allUsers = this.props.allUsers

    return (
      <header className="App-header">
        <NavBar user={user} logout={logout} allUsers={allUsers} />
      </header>
    );
  }
}

export default Header;
