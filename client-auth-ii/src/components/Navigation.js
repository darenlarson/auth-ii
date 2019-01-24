import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../resources/logo.png';

const HeaderWrapper = styled.div`
    background: #000000;
    display: flex;
    align-items: center;
    nav {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
`;
const LogoWrapper = styled.div`
    width: 200px;
    img {
        width: 100%;
    }
`;
const StyledLink = styled(NavLink)`
    color: white;
    border: 1px solid white;
    padding: 5px;
    font-size: 20px;
    text-decoration: none;
    margin: 0 10px;
    font-family: system-ui;
    width: 125px;
    text-align: center;
    :hover {
        background: white;
        color: black;
    }
`;
const SCButton = styled.button`
    color: white;
    border: none;
    background: none;
    border: 1px solid white;
    font-size: 20px;
    margin: 0 10px;
    width: 125px;
    text-align: center;
    :hover {
        cursor: pointer;
        background: white;
        color: black;
    }
`;
const ImgLink = styled(NavLink)`

`;

class Navigation extends React.Component {

    signout = event => {
        event.preventDefault();
        localStorage.removeItem('jwt')
        this.props.history.push('/');
      }

    render() {
        return (
            <HeaderWrapper>
                <LogoWrapper>
                    <ImgLink to="/"><img src={logo} alt="logo"/></ImgLink>
                </LogoWrapper>
                <nav>
                    <StyledLink to="/signin">Log in</StyledLink>
                    <StyledLink to="signup">Register</StyledLink>
                    <StyledLink to="users">Users</StyledLink>
                    <SCButton onClick={this.signout}>Log out</SCButton>
                </nav>
            </HeaderWrapper>
        )
    }
}

export default Navigation;