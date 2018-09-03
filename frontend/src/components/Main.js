import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { stateCredentials } from '../actions/credentials';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import history from '../router/history';
import { withRouter } from 'react-router-dom';
import '../styles/main.css';

// const unAuthPaths = ["/", "/getschedule"];
const authPaths = ["/home"];

class Main extends Component {

    checkAuthStatus(authenticated) {
        this.props.stateCredentials();
        if (!authenticated && authPaths.includes(history.location.pathname)) {
            history.push("/");
        } else if (authenticated) {
            if (history.location.pathname === '/signup' || history.location.pathname === '/') {
                history.push("/home");
            }
        }
    }
    componentWillMount() {
        this.checkAuthStatus(false);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.login.authenticated !== this.props.login.authenticated) {
            this.checkAuthStatus(newProps.login.authenticated);
        }
    }

    render() {
        return (
            <MuiThemeProvider >
                <div className="container">
                    <Header title="Plan Guru" />
                    <div className="contentContainer">
                        <div className="children">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}



Main.propTypes = {
    stateCredentials: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return ({
        login: state.login
    })
}

export default withRouter(connect(mapStateToProps, { stateCredentials })(Main));

