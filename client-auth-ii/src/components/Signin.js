import React from 'react';
import axios from 'axios';

class Signin extends React.Component {
    state = {
        username: '',
        password: '',
    }

    handleInputChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;
        console.log('endpoint', endpoint);

        axios
            .post(endpoint, this.state)
            .then(res => {
                console.log(res);
                localStorage.setItem('jwt', res.data.token);
                this.props.history.push('/users');
            })
            .catch(err => console.log(err));
    };
    
    render() {
        return (
            <>
                <h2>Please enter your username and password</h2>
                <form onSubmit={this.handleSubmit} >
                    <input placeholder="username" name="username" value={this.state.username} type="text" onChange={this.handleInputChange} />
                    <input placeholder="password" name="password" value={this.state.password} type="password" onChange={this.handleInputChange} />
                    <button type="submit">Login</button>
                </form>
            </>
        );
    };
};

export default Signin;