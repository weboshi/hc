import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Navbar, NavDropdown, Nav} from 'react-bootstrap';
import { LOGIN } from '../../Redux/actions/index'
import { connect } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import './navbar.css'

const mapStateToProps = (state) => {
    return { user: state.user};
  };

  const mapDispatchToProps = dispatch => {
    return {
      LOGIN: userInfo => dispatch(LOGIN(userInfo))
    };
  };


class NavigationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
        };
        this.logOut = this.logOut.bind(this)
    }

    componentWillMount(){
       if ( localStorage.getItem('auth') === null) {
            this.setState({
                loggedIn: false
            })
            console.log("Not Authenticated")
        }
        else {
            const userInfo = JSON.parse(localStorage.getItem('auth'))
            this.props.LOGIN(userInfo)
            this.setState({
                loggedIn: true
            })
            console.log("Authenticated")
        }
    }

    logOut() {
        localStorage.removeItem('auth')
        this.props.history.push('/login')
        window.location.reload(true);

    }

    render() {
        if (this.state.loggedIn === false) {
            return (
                <div className="navbar-container">
                    <Navbar bg="primary" variant="dark" className="justify-content-around">
                        <Navbar.Brand href="/">
                            <span>CoinMarketCap Top 100 Currencies</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    </Navbar>
                </div>
        )
    }
        else {
        const email = this.props.user.email
        const username = this.props.user.username
        return (
            <div className="navbar-container">
                <Navbar bg="primary" variant="dark" expand="lg" className="justify-content-around">
                    <Navbar.Brand href="/">
                        <span>CoinMarketCap Top 100 Currencies</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                </Navbar>
            </div>
         )
        }
    }
}

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(withRouter(NavigationBar));



