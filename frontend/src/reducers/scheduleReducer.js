import { FETCH_SCHEDULE, DELETE_SCHEDULE, USER_SEARCH } from '../actions/types';

const initialState = {
    schedules: [],
    userData: {},
    users: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_SCHEDULE:
            return {
                ...state, schedules: action.payload.userSchedule, userData: action.payload.userData
            }
        case DELETE_SCHEDULE:
            return {
                ...state,
                schedules: state.schedules.filter(s => s.id !== action.payload)
            };
        case USER_SEARCH: {
            return {
                ...state, users: action.payload
            }
        }
        default: return state;
    }
}