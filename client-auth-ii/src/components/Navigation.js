import React from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {

    signout = event => {
        event.preventDefault();
        localStorage.removeItem('jwt')
        this.props.history.push('/');
      }

    render() {
        return (
            <nav>
              <NavLink to="/signin">Log in</NavLink>
              <NavLink to="signup">Register</NavLink>
              <button onClick={this.signout}>Log out</button>
            </nav>
        )
    }
}

export default Navigation;