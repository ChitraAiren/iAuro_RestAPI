const express = require('express');
const router = express.Router();

const crypto = require('crypto');
var key = "password";
var algo = "aes256";

const jwt = require('jsonwebtoken');
jwtKey = "jwt";

const { Employees_Auth } = require('../models/employees_auth');

// Register Employee

router.post('/api/employees/register', (req,res) =>{
    var cipher = crypto.createCipher(algo,key);
    var encrypted = cipher.update(req.body.password,'utf-8','hex')
    + cipher.final('hex');
    console.log(encrypted);
    const emp = new Employees_Auth({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: encrypted
    });
    emp.save((err,data) =>{
        if(err) throw err;
        jwt.sign({data}, jwtKey,{expiresIn:'300s'},(err,token) =>{
            res.status(200).json({token})
        })
        // res.status(200).json({code: 200, Message: 'Employee Registered Successfully', 
        // regEmployee: data});
    });
});

//Employee Login
router.post('/api/employees/login', (req,res)=> {
    Employees_Auth.findOne({email: req.body.email}).then((data) =>{
        var decipher = crypto.createDecipher(algo,key);
        var decrypted = decipher.update(data.password, 'hex', 'utf-8')+
        decipher.final('utf-8');
        console.log(decrypted)
        if(decrypted==req.body.password)
        {
            jwt.sign({data},jwtKey,{expiresIn:'300s'},(err,token)=>{
                res.status(200).json({token, message: "Login Successful!!"})
            })
        }
        // res.status(200).json(data)
    });
});

//Get All Employees
router.get('/api/employees',verifyToken, (req, res) => {
    Employees_Auth.find({}, (err, data) => {
        if(!err){
            res.send(data);
        }else {
            console.log(err);
        }
    });
});

//Middleware
function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        console.log(bearer[1]);
        req.token=bearer[1]
        jwt.verify(req.token, jwtKey,(err,authData)=>{
            if(err) throw err;
            next();
        });
    }
    else{
        res.send({message: "Token undefined"})
    }
}

// //Save Employee
// router.post('/api/employees/add', (req, res) => {
//     const emp = new Employees({
//         name: req.body.name,
//         age: req.body.age
//     });
//     emp.save((err, data) =>{
//         res.status(200).json({code:200, message: 'Employee added successfully',
//         addEmployee: data});
//     });
// });


// //Get Single Employee
// router.get('/api/employees/:id', (req,res) =>{
//     Employees.findById(req.params.id, (err, data) => {
//         if(!err){
//             res.send(data);
//         } else {
//             console.log(err);
//         }
//     });
// });


// //Update Employee
// router.put('/api/employees/edit/:id',(req,res)=>{
//     const emp = {
//         name: req.body.name,
//         age: req.body.age
//     };
//     Employees.findByIdAndUpdate(req.params.id, { $set:emp },{ new:true },(err,data)=> {
//         if(!err){
//             res.status(200).json({ code:200, message: 'Employee Updated Successfully', 
//             updateEmployee: data})
//         } else {
//             console.log(err);
//         }
//     });
// });


// //Delete Employee
// router.delete('/api/employees/:id', (req,res) => {
//     Employees.findByIdAndRemove(req.params.id, (err, data) =>{
//         if(!err){
//             res.status(200).json({code:200, message:'Employee Deleted Successfully', 
//             deletedEmployee: data});
//         } else {
//             console.log(err);
//         }
//     });
// })

module.exports = router;