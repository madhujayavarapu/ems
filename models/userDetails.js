const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/database');

var UserDetailsSchema = mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        index: true
    },
    address: {
        type: Object
    },
    phone:{
        type: Number,
        required: true
    }
})

const UserDetails = module.exports = mongoose.model('UserDetails',UserDetailsSchema);

module.exports.addUserDetails = function(newUserDetails, callback){
   newUserDetails.save(callback);
}

module.exports.getUserDetailsById = function(id, callback){
    UserDetails.findById(id, callback);
}

module.exports.getUserDetailsByUsername = function(username, callback){
    const query = {username: username};
    UserDetails.findOne(query, callback);
}