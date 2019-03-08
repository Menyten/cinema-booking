import React, { Component } from 'react';
import NavBar from '../NavBar';


class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props
    return (
      <header className="App-header">
        {console.log('this.props.user', this.props.user)}
        <NavBar user={user} />
      </header>
    );
  }
}

export default Header;
