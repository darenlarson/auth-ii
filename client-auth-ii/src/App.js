import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Navigation from './components/Navigation.js';
import Homepage from './components/Homepage.js';
import Users from './components/Users.js';
import Signin from './components/Signin.js';
import Signup from './components/Signup.js';

class App extends Component {

  render() {
    return (
      <div>
        <Route path="/" component={Navigation} />
        <Route exact path="/" component={Homepage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/users" component={Users} />
      </div>
    );
  }
}

export default App;
