// import { mongo } from 'mongoose';

// const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../config/database');

const UserDetails = require('./userDetails');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: Number,
        require: true,
        default: 3,
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId
    },
    userDetailsId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

const User = module.exports = mongoose.model('User',UserSchema);

module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.setEntityIdOfUser = function(userId, entityId, callback){
    var query = {_id: mongoose.Types.ObjectId(userId)};
    User.findOneAndUpdate(query,{$set: {entityId: entityId}}, callback);
}

module.exports.comparePassword = function(usrPassword, hash, callback){
    bcrypt.compare(usrPassword, hash, function(err, isMatch) {
      if(err) throw err;
      callback(null,isMatch);
    });
}

module.exports.getUsersByRole = function(role,callback){
    var query = {role: { $exists: true, $in: [role] }}
    User.find(query,callback)
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.setUserRoleToEmployee = function(userId, updatedRole, callback){
    var query = {_id: mongoose.Types.ObjectId(userId)}
    User.findOneAndUpdate(query,{$set:{role: updatedRole}}, callback);
}