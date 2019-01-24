import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        department: '',
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;
        const loginEndpoint = `${process.env.REACT_APP_API_URL}/api/login`;

        axios
            .post(endpoint, this.state)
            .then(res => {
                axios
                    .post(loginEndpoint, { username: this.state.username, password: this.state.password })
                    .then(res => {
                        localStorage.setItem('jwt', res.data.token);
                        this.props.history.push('/users');
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <div>
                <h2>Create a username and password</h2>
                <form onSubmit={this.handleSubmit} >
                    <input placeholder="username" name="username" value={this.state.username} type="text" onChange={this.handleInputChange} />
                    <input placeholder="password" name="password" value={this.state.password} type="password" onChange={this.handleInputChange} />
                    <input placeholder="department" name="department" value={this.state.department} type="text" onChange={this.handleInputChange} />
                    <button type="submit">Sign Up!</button>
                </form>
            </div>
        );
    };
};

export default Signup;