const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.json');
const moment = require('moment');
const user = require('./user');

module.exports.getSchedule = ({ token, username }) =>
    new Promise(async (resolve, reject) => {
        try {
            let host = username;
            if (token)
                host = jwt.verify(token, jwtSecret).username;
            let userData = await user.checkIfExists({ username: host });
            let userSchedule = await global.db.sql.Schedule.findAll({
                where: {
                    host
                },
                order: [
                    ['date', 'DESC'],
                    ['time', 'ASC']
                ]
            });
            let response = {}
            response.userData = userData;
            response.userSchedule = userSchedule;
            return resolve(response);
        } catch (err) {
            global.log.error(err);
            return reject({ statusCode: 400, message: err.message });
        }
    })

module.exports.setSchedule = ({ host, date, time, details, system, token }) =>
    new Promise(async (resolve, reject) => {
        try {
            if (!token) {
                guest = null;
            } else {
                guest = jwt.verify(token, jwtSecret).username;
            }
            date = moment(date).format("YYYY-MM-DD");
            await user.checkIfExists({ username: host });
            let scheduleResponse = await global.db.sql.Schedule.create({ guest, host, date, time, details, system })
            let { id } = scheduleResponse;
            return resolve({ id, guest, host, date, time, details, system });
        } catch (err) {
            global.log.error(err);
            if (err.message == "Validation error")
                return reject({ statusCode: 409, message: "This schedule slot is already booked." });
            return reject({ statusCode: 400, message: err.message });
        }
    })


module.exports.deleteByScheduleId = ({ token, scheduleId }) =>
    new Promise(async (resolve, reject) => {
        try {
            let { username } = jwt.verify(token, jwtSecret);
            let userScheduleResponse = await global.db.sql.Schedule.destroy({
                where: {
                    host: username,
                    id: scheduleId
                }
            });
            if (!userScheduleResponse)
                throw new Error("No such scheduleId for the given user.");
            return resolve("Schedule Deleted Successfully");
        } catch (err) {
            global.log.error(err);
            return reject({ statusCode: 400, message: err.message });
        }
    })