import localforage from 'localforage';
import { LOGIN, LOGOUT } from '../actions/types';

export const setCredentials = (data) => localforage.setItem('credentials', data);

export const getCredentials = (key = null) => key ? localforage.getItem('credentials').key : localforage.getItem('credentials');

export const stateCredentials = () => async dispatch => {
    let credentials = await getCredentials();
    if (credentials) {
        return dispatch({
            type: LOGIN,
            payload: credentials
        })
    }
}

export const logout = () => async dispatch => {
    await localforage.clear()
    return dispatch({
        type: LOGOUT
    })
}