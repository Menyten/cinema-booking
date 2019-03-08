import React, { Component } from 'react';
import NavBar from '../NavBar';


class Header extends Component {
  constructor(props){
    super(props);

  }
  render() {

    const {users} = this.props
    console.log(users)

    return (
      <header className="App-header">
        <NavBar users={users} />
      </header>
    );
  }
}

export default Header;
