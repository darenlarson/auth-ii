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
        axios
            .post(endpoint, this.state)
            .then(res => {
                axios
                    .post(endpoint, { username: this.state.username, password: this.state.password })
                    .then(res => {
                        localStorage.setItem('jwt', res.data.token);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <form onSubmit={this.handleSubmit} >
                <input name="username" value={this.state.username} type="text" onChange={this.handleInputChange} />
                <input name="password" value={this.state.password} type="password" onChange={this.handleInputChange} />
                <input name="department" value={this.state.department} type="text" onChange={this.handleInputChange} />
                <button type="submit">Sign Up!</button>
            </form>
        );
    };
};

export default Signup;