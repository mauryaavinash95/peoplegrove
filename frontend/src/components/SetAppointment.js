import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userSearch } from '../actions/userSearch';
import { withRouter } from 'react-router-dom';
import AutoComplete from 'material-ui/AutoComplete';
import { fetchSchedule } from '../actions/fetchSchedule';
import { setAppointment } from '../actions/setAppointment';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import '../styles/setAppointment.css';

const style = {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    textAlign: 'left',
    display: 'inline-block',
};

class SetAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    handleUpdateInput = (searchText) => {
        this.setState({ searchText: searchText });
        this.props.userSearch(this.state.searchText);
    }

    searchSubmit(username) {
        this.props.fetchSchedule(username);
    }

    renderAll() {
        let dateWiseSchedule = {};
        for (let i = 0; i < 5; i++) {
            dateWiseSchedule[moment().subtract(i, 'days').format("YYYY-MM-DD")] = [];
        }

        this.props.userAppointment.userSchedule.forEach(schedule => {
            if (dateWiseSchedule[schedule.date])
                dateWiseSchedule[schedule.date].push(schedule);
            else
                dateWiseSchedule[schedule.date] = [schedule]
        });
        let dateKeys = Object.keys(dateWiseSchedule);
        return dateKeys.length ? dateKeys.map(date => this.renderDay(date, dateWiseSchedule[date])) : "Sorry, no reservations found :("
    }

    showTime(time) {
        if (time === 12) {
            return "12 PM";
        }
        else if (time) {
            return (time % 12 + " " + (time / 12 ? "AM" : "PM"));
        }
        else {
            return ("12 AM");
        }
    }

    setSchedule(date, time) {
        let ans = window.confirm(`Are you sure to book appointment with ${this.props.userAppointment.userData.username} on ${date} at ${this.showTime(time)}`)
        console.log("Answer is: ", ans);
        if (ans) {
            let token = null;
            if (this.props.credentials.authenticated) {
                token = this.props.credentials.credentials.token
            }
            console.log("Setting appointment using token:: ", token);
            this.props.setAppointment({
                host: this.props.userAppointment.userData.username, date, time, details: "details", system: "mozilla", token
            })
        }
    }

    renderDay(date, schedule) {
        let returnArr = [];
        let times = schedule.map(s => s.time);
        let jsx, disabled = false;
        for (let time = 0; time < 24; time++) {
            disabled = false;
            if (times.includes(time))
                disabled = true;
            jsx = (
                <div key={`div_${time}`} >
                    <RaisedButton
                        primary={true}
                        style={{ width: "90%" }}
                        disabled={disabled}
                        key={`raisedButton_${time}`}
                        onClick={this.setSchedule.bind(this, date, time)}
                    >
                        {this.showTime(time)}
                    </RaisedButton>
                </div>
            );
            returnArr.push(jsx);
        }
        return (
            <div key={`dateDiv_${date}`}>
                <div className="date">{moment(date, "YYYY-MM-DD").format("Do MMMM YYYY")}</div>
                <div className="timeButtons">
                    {returnArr}
                </div>
            </div>
        );
    }

    renderUserData() {
        if (this.props.userAppointment) {
            return (
                <div>
                    <Paper style={style} zDepth={1} key={`paper_appointment`}>
                        <div>
                            <label>Username</label>: {this.props.userAppointment.userData.username}
                        </div>
                        <div>
                            <label>Name</label>: {this.props.userAppointment.userData.name}
                        </div>
                        <div>
                            <label>Timezone</label>: {this.props.userAppointment.userData.timezone}
                        </div>
                    </Paper>
                    {this.renderAll()}
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="title">
                    <AutoComplete
                        hintText="Enter username"
                        dataSource={this.props.users.map(u => {
                            if (
                                !this.props.credentials.authenticated
                                || (this.props.credentials.credentials.username !== u.username)
                            )
                                return u.username;
                            else 
                                return undefined;
                        })}
                        onUpdateInput={this.handleUpdateInput.bind(this)}
                        fullWidth={true}
                        value={this.state.searchText}
                        onNewRequest={this.searchSubmit.bind(this)}
                    />
                </div>
                {this.renderUserData()}
                {this.props.appointmentStatus ? alert("Appointment Successful") : undefined}
            </div>
        )
    }
}


SetAppointment.propTypes = {
    userSearch: PropTypes.func.isRequired,
    fetchSchedule: PropTypes.func.isRequired,
    setAppointment: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return ({
        users: state.appointment.users,
        credentials: state.login,
        appointmentStatus: state.appointment.appointmentStatus,
        userAppointment: state.appointment.userAppointment
    })
}

export default withRouter(connect(mapStateToProps, { userSearch, fetchSchedule, setAppointment })(SetAppointment));
