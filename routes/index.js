const express = require('express');
const router = express.Router();

const { Employees } = require('../models/employees');

//Get All Employees
router.get('/api/employees', (req, res) => {
    Employees.find({}, (err, data) => {
        if(!err){
            res.send(data);
        }else {
            console.log(err);
        }
    });
});

//Save Employee
router.post('/api/employees/add', (req, res) => {
    const emp = new Employees({
        name: req.body.name,
        age: req.body.age
    });
    emp.save((err, data) =>{
        res.status(200).json({code:200, message: 'Employee added successfully',
        addEmployee: data});
    });
});


//Get Single Employee
router.get('/api/employees/:id', (req,res) =>{
    Employees.findById(req.params.id, (err, data) => {
        if(!err){
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


//Update Employee
router.put('/api/employees/edit/:id',(req,res)=>{
    const emp = {
        name: req.body.name,
        age: req.body.age
    };
    Employees.findByIdAndUpdate(req.params.id, { $set:emp },{ new:true },(err,data)=> {
        if(!err){
            res.status(200).json({ code:200, message: 'Employee Updated Successfully', 
            updateEmployee: data})
        } else {
            console.log(err);
        }
    });
});


//Delete Employee
router.delete('/api/employees/:id', (req,res) => {
    Employees.findByIdAndRemove(req.params.id, (err, data) =>{
        if(!err){
            res.status(200).json({code:200, message:'Employee Deleted Successfully', 
            deletedEmployee: data});
        } else {
            console.log(err);
        }
    });
})

module.exports = router;