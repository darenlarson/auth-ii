import React, { Component } from 'react';
import './App.css';

import Users from './components/Users.js';
import Signin from './components/Signin.js';
import Signup from './components/Signup.js';

class App extends Component {
  render() {
    return (
      <div>
        <Signin />
        <Signup />
        <Users />
      </div>
    );
  }
}

export default App;
