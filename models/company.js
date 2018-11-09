const mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        index: true
    },
    branches: {
        type: Array
    },
    establishedDate: {
        type: Date,
        required: true
    },
    awards: {
        type: Array
    }
})

var RequestCompaniesSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        index: true
    },
    branches: {
        type: Array
    },
    establishedDate: {
        type: Date,
        required: true
    },
    awards: {
        type: Array
    },
    founder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    
})

var Company = module.exports = mongoose.model('Company',CompanySchema);

module.exports.addCompany = function(newCompany, callback){
    newCompany.save(callback);
}

module.exports.addBranch = function(companyId,branch,callback){
    var query = {
        _id:mongoose.Types.ObjectId(companyId),
        branches: { $exists: true, $nin: [branch] }
    };
    Company.findOneAndUpdate(query, {$push:{"branches":branch}}, callback)
}

module.exports.findCompanyByName = function(name, callback){
    var query = {companyName:name};
    Company.findOne(query,callback);
}

module.exports.getAllCompanies = function(callback){
    Company.find(callback);
}

module.exports.getBranchesUnderACompany = function(companyId, callback){
    Company.findById(companyId,callback);
}