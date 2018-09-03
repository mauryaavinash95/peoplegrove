import { LOGIN, LOGOUT, ERROR, SIGNUP } from '../actions/types';

const initialState = {
    credentials: {},
    error: '',
    authenticated: false,
    signup: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state, credentials: action.payload, authenticated: true
            }
        }
        case SIGNUP: {
            return {
                ...state, credentials: action.payload, authenticated: true
            }
        }
        case LOGOUT: {
            return { authenticated: false }
        }
        case ERROR: {
            return {
                ...state, error: action.payload, authenticated: false
            }
        }
        default: return state;
    }
}