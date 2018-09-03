import { FETCH_SCHEDULE, ERROR } from './types';
import { backendURL } from '../config';

export const fetchUserSchedule = (token) => async dispatch => {
    if (token) {
        let route = backendURL;
        let options = {
            method: "GET",
            headers: new Headers({
                'Content-type': 'application/json',
                'token': token
            })
        }
        return fetch(route, options)
            .then(res => res.json())
            .then(data => {
                // console.log("Data is: ", data);
                if (data.code === 200) {
                    return dispatch({
                        type: FETCH_SCHEDULE,
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
}