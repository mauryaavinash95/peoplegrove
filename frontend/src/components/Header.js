import React from 'react';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import history from '../router/history';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import { logout } from '../actions/credentials';
import '../styles/header.css';

class Header extends React.Component {

    handleLogout() {
        console.log("Trying to logout");
        this.props.logout();
        history.push("/");
    }

    render() {
        return (
            <div className="titleBar">
                <AppBar
                    title={<span>Plan Guru</span>}
                    showMenuIconButton={false}
                    iconElementRight={
                        <div>
                            {
                                this.props.authenticated ?
                                    <div style={{ padding: "0.6rem" }} onClick={this.handleLogout.bind(this)} data-toggle="tooltip" title="Logout">
                                        <LogoutIcon />
                                    </div>
                                    :
                                    undefined
                            }
                        </div>
                    }
                    style={{
                        display: "flex",
                        maxWidth: "30rem",
                        margin: "auto",
                    }}
                />
            </div>
        )
    }
}

Header.propTypes = {
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return ({ authenticated: state.login.authenticated })
}

export default withRouter(connect(mapStateToProps, { logout })(Header));