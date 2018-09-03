
const router = require('express').Router();
const expressJoi = require('express-joi-validator');
const validator = require('./validator');
const handler = require('./handler');

// User Signup
router.post('/signup', expressJoi(validator.signup), handler.signup);

// User signin
router.post('/signin', expressJoi(validator.signin), handler.signin);

// User search
router.get('/search', expressJoi(validator.searchUser), handler.searchUser);

// Set appointment
router.post('/setschedule', expressJoi(validator.setSchedule), handler.setSchedule);

// Get appointment availablity of a given user
router.get('/getschedule/:username([^]+$)', expressJoi(validator.getUserSchedule), handler.getUserSchedule);

// Get appointment schedule of loggedin user.
router.get('/', expressJoi(validator.getSchedule), handler.getSchedule);

// Delete appointment of a given user using scheduleid
router.delete('/:id([0-9]+$)', expressJoi(validator.deleteByScheduleId), handler.deleteByScheduleId);

module.exports = { router }