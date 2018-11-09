const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const Employee = require('../models/employee');
const UserDetails = require('../models/userDetails');
const dbConfig = require('../config/database');
const roles = require('../config/roles');

router.get('/unempList', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    let role = 3;
    User.getUsersByRole(role, (err, users) => {
        if(err){
            return res.json({success:false,msg:"No list"})
        }
        if(!users){
            return res.json({success:true,msg:"no unemployed"});
        }else{
            return res.json({success: true, users: users})
        }
    })
})

router.post('/register',(req, res, next) => {
    var newUserDetails = new UserDetails({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        address: req.body.address,
        phone: req.body.phone
    });
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        userDetailsId: ''
    });

    UserDetails.addUserDetails(newUserDetails, (err, result) => {
        if(err){
            res.json({success: false,msg:"Something went wrong"});
        }
        newUser.userDetailsId = result._id;
        User.addUser(newUser,(err2, response) => {
            if(err2){
                res.json({success: false,msg:"Something went wrong"});
            }
            res.json({success: true,msg:"Registered Successfully"});
        })
    })
})

function formatUser(user, emp){
    let userDetails = {
        id: user._id,
        userDetailsId: user.userDetailsId,
        username: user.username,
        role: user.role
    };
    if(emp){
        userDetails.companyId = emp.companyId;
        userDetails.empId = emp._id;
        return userDetails;
    }
    return userDetails;
}

router.post('/login',(req,res,next) => {
    let username = req.body.username;
    let password = req.body.password;

    User.getUserByUsername(username,(err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: "User Not Found"});
        }else{
            User.comparePassword(password, user.password, (err2, isMatch) => {
                if(err2) throw err2;
                if(!isMatch){
                    return res.json({success: false,msg:"Password doesn't match"});
                }else{
                    const token = jwt.sign(user.toJSON(), dbConfig.secret, {
                        expiresIn: 3600 // expires in 1 hour
                    })
                    if(user.role == roles.employee || user.role == roles.company_admin){
                        Employee.getEmployeeDetails(user._id, (emp_err, emp) => {
                            if(emp_err){
                                return res.json({success: false,msg:"Something went wrong"}); 
                            }else if(!emp){
                                return res.json({success: false,msg:"Employee not found"});
                            }else{
                                res.json({
                                    success: true,
                                    token: 'JWT '+token,
                                    user: formatUser(user, emp)
                                })
                            }
                        })
                    }else{
                        
                        res.json({
                            success: true,
                            token: 'JWT '+token,
                            user: formatUser(user, false)
                        });
                    }
                }
            })
        }
    });
})

router.post('/userDetails', (req,res,next) => {
    let userId = req.body.userId;

    User.getUserById(userId, (err, user) => {
        if(err){
            throw err;
        }
        if(!!user){
            res.json({
                success: true,
                user: formatUser(user, false)
            })
        }else{
            res.json({success: false, msg: "User not found"});
        }
    })
})

module.exports = router;