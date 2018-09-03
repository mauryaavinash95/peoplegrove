import { SET_APPOINTMENT_SCHEDULE, ERROR } from './types';
import { backendURL } from '../config';

export const setAppointment = ({ host, date, time, details = "details", system = "system", token }) => async dispatch => {
    if (host && date) {
        let route = backendURL + "/setschedule";
        let headers = {
            'Content-Type': 'application/json',
        }
        if (token) {
            headers.token = token
        }
        let options = {
            method: "POST",
            body: JSON.stringify({ host, date, time, details, system }),
            headers: new Headers(headers),
        }

        return fetch(route, options)
            .then(res => res.json())
            .then(data => {
                // console.log("Data is: ", data);
                if (data.code === 200) {
                    return dispatch({
                        type: SET_APPOINTMENT_SCHEDULE,
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