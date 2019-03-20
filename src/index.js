import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App />, document.getElementById('root'));

/*var i=0, interval = setInterval(function(){
  i++; 
  if(i>150){
    clearInterval(interval)
  }
  console.log('window.AppInstance.state.user', window.AppInstance.state.user)
  console.log('window.NavBarInstance.state.loggedIn', window.NavBarInstance.state.loggedIn)
},5) */