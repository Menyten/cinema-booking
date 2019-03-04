import React, { Component } from 'react';
import Startpage from './components/Startpage';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Header from './components/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <Header />
        <Route exact path='/' component={Startpage} />
      </div>
      </Router>
    );
  }
}

export default App;
