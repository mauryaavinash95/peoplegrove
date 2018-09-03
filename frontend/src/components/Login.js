import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import history from '../router/history';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { postLogin } from '../actions/postLogin';
import '../styles/login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            buttonDisabled: false,
            loginButtonText: "Login"
        }
    }

    changeEmail(e) {
        this.setState({
            email: e.target.value.toString().toLowerCase()
        })
    }

    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.postLogin(this.state.email, this.state.password);
        this.setState({ loginButtonText: "Logging in...", buttonDisabled: true });
    }

    render() {
        return (
            <div>
                <div tabIndex="0">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="textBox">
                            <TextField
                                hintText="Email ID"
                                fullWidth={true}
                                autoFocus
                                onChange={this.changeEmail.bind(this)}
                                value={this.state.email}
                            />
                        </div>
                        <div className="textBox">
                            <TextField
                                hintText="Password"
                                type="password"
                                fullWidth={true}
                                onChange={this.changePassword.bind(this)}
                                value={this.state.password}
                            />
                        </div>
                        <div style={{ color: "red" }}>
                            {this.state.error}
                        </div>
                        <div className="textBox">
                            <RaisedButton
                                type="submit"
                                label={this.state.loginButtonText}
                                fullWidth={true}
                                primary={true}
                                onClick={this.handleSubmit.bind(this)}
                                disabled={this.state.buttonDisabled}
                            />
                        </div>
                        <div className="textBox">
                            <RaisedButton
                                label="Sign up"
                                fullWidth={true}
                                onClick={() => { history.push("/signup") }}
                                disabled={this.state.buttonDisabled}
                            />
                        </div>

                        <div className="textBox">
                            <a href="/setappointment"> Schedule Appointment as Anonymous</a>
                        </div>

                        <div style={{ margin: "auto", textAlign: "center" }}>
                            {
                                this.state.buttonDisabled ?
                                    <RefreshIndicator
                                        size={40}
                                        left={10}
                                        top={0}
                                        status="loading"
                                        style={{ display: 'inline-block', position: 'relative', textAlign: "center" }}
                                    />
                                    :
                                    undefined
                            }
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


Login.propTypes = {
    postLogin: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return ({
        credentials: state.credentials
    })
}

export default withRouter(connect(mapStateToProps, { postLogin })(Login));

