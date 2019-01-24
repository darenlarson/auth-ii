import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    state = {
        users: []
    }

    async componentDidMount() {
        const endpoint = `${process.env.REACT_APP_API_URL}/api/users`;

        try {
            const token = localStorage.getItem('jwt');
            const requestOptions = {
                headers: {
                    authorization: token
                }
            };
            const response = await axios.get(endpoint, requestOptions);
            console.log(response);

			this.setState({ users: response.data.users });
        } catch (error) {
            console.log('we ran into an issue getting the users');
        };
    }

    render() {
        return (
            <div>
                <h2>List of Users</h2>
                <ul>
                    {this.state.users.map(user => (
                        <li key={user.id}>{user.username}, {user.department}</li>
                    ))}
                </ul>
            </div>
        );
    };
};

export default Users;