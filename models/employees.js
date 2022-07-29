const mongoose = require('mongoose');



//Employees Schema

const Employees = mongoose.model('Employees', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
});


module.exports = { Employees }