import React, { Component } from 'react';
import Startpage from './components/Startpage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Header />
        <Route exact path='/' component={Startpage} />
      </Router>
      </div>
    );
  }
}

export default App;
