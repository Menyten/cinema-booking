import React, { Component } from 'react';
import NavBar from '../NavBar';


class Header extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    const { user } = this.props
    const logout = this.props.logout

    return (
      <header className="App-header">
        <NavBar user={user} logout={logout} />
      </header>
    );
  }
}

export default Header;
