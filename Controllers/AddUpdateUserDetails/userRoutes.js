const express = require('express');
const routing = express.Router();

const addUpdateUserDetails =  require('./action');

routing.patch('/save-add-update-user-details', addUpdateUserDetails.registrationWithUserDetails);
routing.patch('/login-using-user-details', addUpdateUserDetails.loginUsingUserDetails);

module.exports = routing;