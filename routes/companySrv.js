const express = require("express");
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Company = require('../models/company');

function formatCompaniesList(companies){
    let finalList = [];
    for(var i=0;i<companies.length;i++){
        let obj = {
            id: companies[i]._id,
            companyName: companies[i].companyName,
            branches: companies[i].branches
        };
        finalList.push(obj);
    }
    return finalList;
}

/*
deleteCompany
*/

router.post('/getBranchesUnderACompany', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    var companyId = req.body.companyId;
    Company.getBranchesUnderACompany(companyId, (err, company) => {
        if(err){
            res.json({success: false,msg: "something went wrong"});
        }
        if(!company){
            return res.json({success: true, msg: "No Company found"});
        }else{
            return res.json({
                success: true,
                data: {
                    "id": company._id,
                    "branches": company.branches
                }
            })
        }
    })
})

router.post('/addBranch', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    const branch = req.body.branch;
    // const name = req.body.companyName;
    const id = req.body.companyId;

    Company.addBranch(id, branch, (err2, result) => {
        if(err2) throw err2;
        if(result == null){
            return res.json({success: false, msg:"No company found with name (or) branch already exists"});
        }else{
            return res.json({success: true, company: result});
        } 
    })
})

router.post('/addCompany', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    const name = req.body.companyName;
    Company.findCompanyByName(name,(err, company) => {
        if(err) throw err;
        if(!company){
            let newCompany = new Company({
                companyName: name,
                establishedDate: new Date(req.body.establishedDate),
                branches: req.body.branches,
                awards: req.body.awards
            })
            Company.addCompany(newCompany, (error, company) => {
                if(err) throw err;
                res.json({success:true,company:company});
            })
        }else{
            res.json({success: true,msg:"company already exists"});
        }
    })
})

router.post('/deleteCompany', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    res.send("delte company need to implement");
})

router.get('/getCompaniesList', passport.authenticate('jwt',{session: false}), (req, res, next) => {
    Company.getAllCompanies((err, companies) => {
        if(err) throw err;
        if(!companies){
            return res.json({success:true,msg:"No Companies in db"});
        }else{
            return res.json({
                success: true,
                companies:formatCompaniesList(companies) 
            });
        }
    })
})

module.exports = router;