const Joi = require('joi');

module.exports.signup = {
    body: Joi.object({
        username: Joi.string().required().trim(),
        name: Joi.string().required().trim(),
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
        timezone: Joi.string().required().trim()
    }).required()
};

module.exports.signin = {
    body: Joi.object({
        email: Joi.string().required().trim(),
        password: Joi.string().required().trim(),
    }).required()
}

module.exports.getSchedule = {
    header: Joi.object({
        token: Joi.string().required().trim(),
    }).unknown()
}

module.exports.setSchedule = {
    header: Joi.object({
        token: Joi.string().trim(),
    }),
    body: Joi.object({
        host: Joi.string().required(),
        date: Joi.date().required(),
        time: Joi.number().required().min(0).max(23),
        details: Joi.string().required().trim(),
        system: Joi.string().required().trim(),
    }).required()
}

module.exports.getUserSchedule = {
    params: Joi.object({
        username: Joi.string().required().trim(),
    }).required()
}

module.exports.searchUser = {
    query: Joi.object({
        username: Joi.string().required().trim(),
    }).required()
}

module.exports.deleteScheduleById = {
    header: Joi.object({
        token: Joi.string().required().trim(),
    }).unknown(),
    params: Joi.object({
        id: Joi.number().required()
    }).required()
}
