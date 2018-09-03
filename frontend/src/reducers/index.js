import { combineReducers } from 'redux';
import scheduleReducer from './scheduleReducer';
import loginReducer from './loginReducer';
import setAppointmentReducer from './setAppointmentReducer';

export default combineReducers({
    schedule: scheduleReducer,
    login: loginReducer,
    appointment: setAppointmentReducer
})