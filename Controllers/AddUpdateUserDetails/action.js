const axios = require ('axios');
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
require('dotenv').config();

const users = [];

module.exports.registrationWithUserDetails = async (req, res) => {
    try {
        var errorObject = {};
        errorObject["inFuntion"] = "registrationWithUserDetails";
        errorObject["inputParameters"] = {
            ...req.body
        };
        errorObject["errorBody"] = "";
        errorObject["timestamp"] = "";

        let { name, userName, userEmail, userPassword } = { ...req.body };

        console.log("Name:", name);
        console.log("userName:", userName);
        console.log("userEmail:", userEmail);
        console.log("userPassword:", userPassword);

        const hashedPassword = await bcrypt.hash(userPassword, 10);
        users.push({
            id: Date.now().toString(),
            name: name,
            username : userName,
            email : userEmail,
            password: hashedPassword,
        })
        console.log("users:",users);

        res.status(200).json({
            data: "Request has been saved successfully"
        })

    } catch (error) {
        console.error("Error in registrationWithUserDetails:", error);
        res.status(500).json({
            error: {
                msg: "Error in registrationWithUserDetails"
            }
        });
    }
};

module.exports.loginUsingUserDetails = async (req, res) => {
    try {

        var errorObject = {};
        errorObject["inFuntion"] = "registrationWithUserDetails";
        errorObject["inputParameters"] = {
            ...req.body
        };
        errorObject["errorBody"] = "";
        errorObject["timestamp"] = "";

        let { userEmail, userPassword } = { ...req.body };

        const user = users.find(user => user.email === userEmail)
        if (user == null) {
            return res.status(400).send('Cannot find user')
        }
        const userMatching = await bcrypt.compare(userPassword, user.password); // Compare with user's password

        if (userMatching) {
           return res.status(200).json({
            data: "User has been found"
        });
        } else {
           return res.status(400).json({
            data: "Not allowed"
        });
        }

    } catch (error) {
        console.error("Error in loginUsingUserDetails:", error);
        return res.status(500).json({
            error: {
                msg: "Error in loginUsingUserDetails"
            }
        });
    }
}

module.exports.checkUserLoggedIn = async(req, res) => {
    try {
        var errorObject = {};
        errorObject["inFuntion"] = "registrationWithUserDetails";
        errorObject["errorBody"] = "";
        errorObject["timestamp"] = "";

        console.log("Session:", req.session);
    } catch (error) {
        console.error("Error in checkUserLoggedIn", error);
    }
}