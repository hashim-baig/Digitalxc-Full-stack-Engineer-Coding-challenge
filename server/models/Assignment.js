const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  secretChild: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);