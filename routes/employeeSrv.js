const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Employee = require("../models/employee");
const User = require('../models/users');
const roles = require('../config/roles');

router.get('/getAllEmployees', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    let role = 5;
    User.getUsersByRole(role, (err, users) => {
        if(err)
            return res.json({success: false, msg:"Something went wrong"});
        if(!users){
            return res.json({success: true, msg:"No employees in db"});
        }else{
            return res.json({
                success: true,
                users: users
            })
        }
    })
    // res.json({success: true, msg: "not yet implemented"});
})

router.post('/addEmployee', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    let newEmployee = new Employee({
        companyId: req.body.companyId,
        branch: req.body.branch,
        emp_name: req.body.emp_name,
        designation: req.body.designation,
        package:req.body.package,
        userId: req.body.userId
    });

    User.getUserById(req.body.userId, (error, user) => {
        if(error)
            return res.json({success: false, msg: "Something went wrong"});
        if(!user){
            return res.json({success:false,msg:"Enter a valid user id"});
        }else{
            if(user.role == 3 || user.role == 2){
                let updatedRole = user.role == 3 ? roles.employee : roles.company_admin;
                Employee.addNewEmployee(newEmployee, (err, employee) => {
                    if(err)
                        return res.json({success: false, msg: "Duplicate Employee"});
                    if(!employee){
                        return res.json({success: false, msg: "Failed to Add employee"});
                    }else{
                        User.setUserRoleToEmployee(req.body.userId, updatedRole, (err2, result) => {
                            if(err2)
                                return res.json({success: false, msg: "Something went wrong"});
                            if(result){
                                return res.json({success: true, msg: "Employeed added Successfully"});
                            }else{
                                return res.json({success: true, msg: "Something went wrong"});
                            }
                        })   
                    }
                })
            }else{
                return res.json({success:false,msg:"Not an Unemployeed user"})
            }
        }
    })
})

router.post('/empUnderACompany', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    let companyId = req.body.companyId;
    Employee.getEmpUnderACompany(companyId, (err, emps) => {
        if(err){
            res.json({success: false, msg: "Something went wrong"});
        }
        if(!emps){
            res.json({success:false, msg: "No Employees in this company"});
        }else{
            res.json({
                success: true,
                employees: emps
            })
        }
    })
})

router.post('/deleteEmp', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    let empId = req.body.employeeId;
    let userId = req.body.userId;
    User.getUserById(userId, (error, user) => {
        if(error)
            return res.json({success: false, msg: "Something went wrong"});
        if(!user){
            return res.json({success:false,msg:"Enter a valid user id"});
        }else{
            if(user.role == 5){
                Employee.deleteEmp(empId, (err, employee) => {
                    if(err)
                        return res.json({success: false, msg: "Duplicate Employee"});
                    if(!employee){
                        return res.json({success: false, msg: "Failed to delete"});
                    }else{
                        User.setUserRoleToEmployee(userId, roles.user, (err2, result) => {
                            if(err2)
                                return res.json({success: false, msg: "Something went wrong"});
                            if(result){
                                return res.json({success: true, msg: "Employeed deleted Successfully"});
                            }else{
                                return res.json({success: true, msg: "Something went wrong"});
                            }
                        })   
                    }
                })
            }else{
                return res.json({success:false,msg:"Not an Unemployeed user"})
            }
        }
    })
})

module.exports = router;