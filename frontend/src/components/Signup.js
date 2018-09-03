import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import history from '../router/history';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { postSignup } from '../actions/postSignup';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import '../styles/signup.css';
const timezones = require('../timezones.json');


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            username: '',
            name: '',
            timezone: "Select Timezone",
            buttonDisabled: false,
            SignupButtonText: "Sign Up",
            error: ""
        }
    }

    changeUsername(e) {
        this.setState({
            username: e.target.value.toString().toLowerCase()
        })
    }

    changeName(e) {
        this.setState({
            name: e.target.value.toString()
        })
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

    changeTimezone(event, index, value) {
        this.setState({
            timezone: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let { username, name, email, password, timezone } = this.state
        if ((username) && (email.length) && (password.length > 6) && (timezone !== "Select Timezone")) {
            this.props.postSignup(username, name, email, password, timezone);
            this.setState({ SignupButtonText: "Signing up...", buttonDisabled: true });
        } else {
            console.log("Please fill out all the fields!");
            this.setState({ error: "Please fill out all the fields" });
        }
    }

    render() {
        return (
            <div>
                <div tabIndex="0">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="textBox">
                            <TextField
                                hintText="Username"
                                fullWidth={true}
                                autoFocus
                                onChange={this.changeUsername.bind(this)}
                                value={this.state.username}
                            />
                        </div>
                        <div className="textBox">
                            <TextField
                                hintText="Full Name"
                                fullWidth={true}
                                autoFocus
                                onChange={this.changeName.bind(this)}
                                value={this.state.name}
                            />
                        </div>
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
                                hintText="Password (Greater than 6 characters)"
                                type="password"
                                fullWidth={true}
                                onChange={this.changePassword.bind(this)}
                                value={this.state.password}
                            />
                        </div>

                        <div className="textBox">
                            <DropDownMenu
                                autoWidth={false}
                                style={{ width: "100%" }}
                                value={this.state.timezone}
                                onChange={this.changeTimezone.bind(this)}
                            >
                                {timezones.map(t => (<MenuItem value={t} key={`timezone_${t}`} primaryText={t} />))}
                            </DropDownMenu>
                        </div>

                        <div style={{ color: "red" }}>
                            {this.state.error}
                        </div>
                        <div className="textBox">
                            <RaisedButton
                                type="submit"
                                label={this.state.SignupButtonText}
                                fullWidth={true}
                                primary={true}
                                onClick={this.handleSubmit.bind(this)}
                                disabled={this.state.buttonDisabled}
                            />
                        </div>
                        <div className="textBox">
                            <RaisedButton
                                label="Login"
                                fullWidth={true}
                                onClick={() => { history.push("/") }}
                                disabled={this.state.buttonDisabled}
                            />
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


Signup.propTypes = {
    postSignup: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    console.log("State:: ", state);
    return ({
        credentials: state.credentials
    })
}

export default withRouter(connect(mapStateToProps, { postSignup })(Signup));

