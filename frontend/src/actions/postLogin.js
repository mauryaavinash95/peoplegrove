import { LOGIN, ERROR } from './types';
import { backendURL } from '../config';
import { setCredentials } from './credentials';

export const postLogin = (email, password) => async dispatch => {
    let route = backendURL + "signin";
    let options = {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    }
    return fetch(route, options)
        .then(res => res.json())
        .then(data => {
            // console.log("Data is: ", data);
            if (data.code === 200) {
                setCredentials(data.result);
                return dispatch({
                    type: LOGIN,
                    payload: data.result
                })
            } else {
                throw new Error(data.result);
            }
        })
        .catch(err => {
            console.log("Error while fetching data:: ", err);
            return dispatch({
                type: ERROR,
                payload: err
            })
        })
}