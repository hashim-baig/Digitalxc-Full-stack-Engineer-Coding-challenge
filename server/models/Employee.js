// server/models/Employee.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);