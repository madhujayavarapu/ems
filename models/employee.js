const mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    emp_name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    package: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        unique: true
    }
})

var Employee = module.exports = mongoose.model("Employee", EmployeeSchema);

module.exports.addNewEmployee = function(newEmployee,callback){
    newEmployee.save(newEmployee,callback);
}

module.exports.deleteEmp = function(empId, callback){
    Employee.findByIdAndRemove(empId,callback);
}

module.exports.getEmpUnderACompany = function(id,callback){
    var query = {companyId: mongoose.Types.ObjectId(id)}
    Employee.find(query,callback);
}

module.exports.getEmployeeDetails = function(id, callback){
    var query = {userId: mongoose.Types.ObjectId(id)};
    Employee.findOne(query, callback);
}

// module.exports.getEmpCountOfCompanies = function(){

// }