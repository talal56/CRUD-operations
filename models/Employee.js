const mongoose = require('mongoose')
const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    joiningDate:{
        type: Date,
        required: true,
    },
})

module.exports = mongoose.model('Employee',employeeSchema)