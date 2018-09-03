const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config.json')

module.exports.signup = ({ username, name, email, password, timezone }) =>
    new Promise(async (resolve, reject) => {
        let token = jwt.sign({ username, email, name }, jwtSecret);
        try {
            let userCreationResponse = await global.db.sql.User.create({
                username,
                name,
                email,
                password,
                timezone,
                token
            })
            let { id } = userCreationResponse.dataValues;
            return resolve({ username, id, email, name, token, timezone });
        } catch (err) {
            global.log.error(err);
            if (err.message == "Validation error")
                return reject({ statusCode: 409, message: "Username or Email already exists" });
            return reject({ statusCode: 400, message: err.message });
        }
    })


module.exports.signin = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            let userFindResponse = await global.db.sql.User.find({
                where: {
                    email,
                    password
                }
            });
            if (!userFindResponse) {
                throw new Error("No such user found");
            }
            let { username, id, token, name, timezone } = userFindResponse;
            return resolve({ username, id, email, name, token, timezone });
        } catch (err) {
            global.log.error(err);
            return reject({ statusCode: 400, message: err.message });
        }
    })


module.exports.search = (username) =>
    new Promise(async (resolve, reject) => {
        try {
            let userFindResponse = await global.db.sql.User.findAll({
                where: {
                    username: {
                        $like: '%' + username + '%'
                    }
                },
                attributes: ["id", "name", "username", "email", "timezone"]
            });
            return resolve(userFindResponse);
        } catch (err) {
            global.log.error(err);
            return reject({ statusCode: 400, message: err.message });
        }
    })


module.exports.checkIfExists = ({ username }) =>
    new Promise(async (resolve, reject) => {
        try {
            let where = {};
            let userFindResponse = await global.db.sql.User.find({
                where: {
                    username
                }
            });
            if (!userFindResponse) {
                throw new Error(`No such user found : ${username}`);
            }
            let { name, timezone } = userFindResponse;
            username = userFindResponse.username, email = userFindResponse.email;
            return resolve({ username, email, name, timezone });
        } catch (err) {
            global.log.error(err);
            return reject({ statusCode: 400, message: err.message });
        }
    })