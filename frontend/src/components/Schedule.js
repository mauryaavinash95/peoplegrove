import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteSchedule } from '../actions/deleteSchedule';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import '../styles/schedule.css';

const style = {
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
    textAlign: 'left',
    display: 'inline-block',
};

class Schedule extends Component {
    renderAll() {
        let dateWiseSchedule = {};
        this.props.schedules.forEach(schedule => {
            if (dateWiseSchedule[schedule.date])
                dateWiseSchedule[schedule.date].push(schedule);
            else
                dateWiseSchedule[schedule.date] = [schedule]
        });
        let dateKeys = Object.keys(dateWiseSchedule);
        return dateKeys.length ?
            dateKeys.map(date => this.renderDay(date, dateWiseSchedule[date])) :
            (
                <div className="no-reservations">
                    Sorry, no reservations found :(
                </div>
            )

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

    deleteSchedule(id) {
        let ans = window.confirm("Are you sure you want to delete this reservation?");
        if (ans) {
            this.props.deleteSchedule(this.props.credentials.token, id);
        }
    }

    renderDay(date, schedule) {
        let returnArr = schedule.map(s =>
            (<Paper style={style} zDepth={1} key={`paper_${s.id}`}>
                <div className="scheduleCard">
                    <div className="scheduleDetails">
                        <div className="scheduleTime">
                            {this.showTime(s.time)}
                        </div>
                        <i>Booked by {s.guest || "Anonymous"}</i> </div>
                    <div
                        className="deleteCard"
                        onClick={this.deleteSchedule.bind(this, s.id)}
                    >
                        &times;
                    </div>
                </div>
            </Paper>)
        )
        return (
            <div key={`dateDiv_${date}`}>
                <Paper style={style} zDepth={1} key={`paper_${date}`}>
                    <div className="date">{moment(date, "YYYY-MM-DD").format("Do MMMM YYYY")}</div>
                    {returnArr}
                </Paper>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderAll()}
            </div>
        )
    }
}

Schedule.propTypes = {
    deleteSchedule: PropTypes.func.isRequired
}


const mapStateToProps = state => {
    return ({
        schedules: state.schedule.schedules,
        userData: state.schedule.userData,
        credentials: state.login.credentials
    })
}

export default withRouter(connect(mapStateToProps, { deleteSchedule })(Schedule));
