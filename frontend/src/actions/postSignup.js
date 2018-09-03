import { SIGNUP, ERROR } from './types';
import { backendURL } from '../config';

export const postSignup = (username, name, email, password, timezone) => async dispatch => {
    console.log("In postSignup: ");
    let route = backendURL + "signup";
    let data = {
        username, name, email, password, timezone
    }
    let options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }
    console.log("Sending off: ", route, options);
    return fetch(route, options)
        .then(res => res.json())
        .then(data => {
            console.log("data in actions :: ", data);
            return dispatch({
                type: SIGNUP,
                payload: data
            })
        })
        .catch(err => {
            console.log("Error while fetching data:: ", err);
            return dispatch({
                type: ERROR,
                payload: err
            })
        })
}