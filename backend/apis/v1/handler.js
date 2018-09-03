const user = require('../../models/user');
const schedule = require('../../models/schedule');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/config.json')

module.exports.signup = async (req, res, next) => {
    let data = req.body;
    data.password = jwt.sign(data.password, jwtSecret);
    try {
        let modelResponse = await user.signup(data);
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}

module.exports.signin = async (req, res, next) => {
    let data = req.body;
    data.password = jwt.sign(data.password, jwtSecret);
    try {
        let modelResponse = await user.signin(data);
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}

module.exports.searchUser = async (req, res, next) => {
    let { username } = req.query;
    try {
        let modelResponse = await user.search(username);
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}

module.exports.getSchedule = async (req, res, next) => {
    let { token } = req.headers;
    try {
        let modelResponse = await schedule.getSchedule({ token });
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}


module.exports.getUserSchedule = async (req, res, next) => {
    let { username } = req.params;
    try {
        let modelResponse = await schedule.getSchedule({ username });
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}

module.exports.setSchedule = async (req, res, next) => {
    let { token } = req.headers;
    let data = req.body;
    data.token = token;
    try {
        let modelResponse = await schedule.setSchedule(data);
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}

module.exports.deleteByScheduleId = async (req, res, next) => {
    let { token } = req.headers;
    let { id: scheduleId } = req.params;
    try {
        let modelResponse = await schedule.deleteByScheduleId({ token, scheduleId });
        res.locals.result = modelResponse;
        next();
    } catch (err) {
        global.log.error(err);
        next({ statusCode: err.statusCode || 400, message: err.message });
    }
}
