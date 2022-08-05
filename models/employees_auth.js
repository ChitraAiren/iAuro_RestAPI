const mongoose = require('mongoose');



//Employees Schema

const Employees_Auth = mongoose.model('Employees_Auth', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = { Employees_Auth }