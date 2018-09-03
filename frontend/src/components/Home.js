import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserSchedule } from '../actions/fetchUserSchedule';
import { withRouter } from 'react-router-dom';
import Schedule from './Schedule';
import '../styles/home.css';

class Home extends Component {

    componentWillMount() {
        this.props.fetchUserSchedule(this.props.credentials.token);
    }

    render() {
        return (
            <div>
                <div className="userData">
                    <div className="detailContainer name">
                        Hi, {this.props.credentials.name}!
                    </div>
                    <div className="detailContainer timezone">
                        <i>{this.props.credentials.timezone}</i>
                    </div>
                </div>
                <div className="title pageTitle">
                    <h4>Reservations</h4>
                    <a href="/setappointment" className="set-schedule"> Schedule Appointment </a >
                </div>
                <Schedule />
            </div>
        )
    }
}


Home.propTypes = {
    fetchUserSchedule: PropTypes.func.isRequired,
    credentials: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return ({
        schedules: state.schedule.schedules,
        userData: state.schedule.userData,
        credentials: state.login.credentials
    })
}

export default withRouter(connect(mapStateToProps, { fetchUserSchedule })(Home));
