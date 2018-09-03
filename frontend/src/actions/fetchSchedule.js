import { FETCH_APPOINTMENT_SCHEDULE } from './types';
import { backendURL } from '../config';

export const fetchSchedule = (username) => async dispatch => {
    if (username) {
        let route = backendURL + "/getschedule/" + username;
        let options = {
            method: "GET",
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }
        return fetch(route, options)
            .then(res => res.json())
            .then(data => {
                // console.log("Data is: ", data);
                if (data.code === 200) {
                    return dispatch({
                        type: FETCH_APPOINTMENT_SCHEDULE,
                        payload: data.result
                    })
                } else {
                    throw new Error(data.result);
                }
            })
            .catch(err => {
                console.log("Error while fetching data:: ", err);
            })
    }
}