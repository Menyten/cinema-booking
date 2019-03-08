import React, { Component } from 'react';
import NavBar from '../NavBar';


class Header extends Component {
  constructor(props){
    super(props);

  }
  render() {


    let userInfo = this.props.users;
    console.log(userInfo)
    console.log(this.props.users)

    
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
