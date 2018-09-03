import { USER_SEARCH, FETCH_APPOINTMENT_SCHEDULE, SET_APPOINTMENT_SCHEDULE } from '../actions/types';

const initialState = {
    users: [],
    appointmentStatus: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_SEARCH: {
            return {
                ...state, users: action.payload, appointmentStatus: false
            }
        }
        case FETCH_APPOINTMENT_SCHEDULE: {
            return {
                ...state, userAppointment: action.payload, appointmentStatus: false
            }
        }
        case SET_APPOINTMENT_SCHEDULE: {
            let newUserAppointment = state.userAppointment;
            newUserAppointment.userSchedule = [...state.userAppointment.userSchedule, action.payload]
            return {
                ...state, appointmentStatus: true, userAppointment: newUserAppointment

            }
        }
        default: return state;
    }
}