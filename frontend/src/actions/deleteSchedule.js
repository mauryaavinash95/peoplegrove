import { DELETE_SCHEDULE } from './types';
import { backendURL } from '../config';

export const deleteSchedule = (token, id) => async dispatch => {
    if (token) {
        let route = backendURL + id;
        let options = {
            method: "DELETE",
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
                        type: DELETE_SCHEDULE,
                        payload: id
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