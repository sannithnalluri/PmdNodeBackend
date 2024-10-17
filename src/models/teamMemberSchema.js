const mongoose = require('mongoose');
const Project = require('../models/projectSchema'); // Ensure this path is correct

// TeamMember Schema
const teamMembersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, default: 'Present' },
  projectId:{type:String},
  teamId:{type:String},
  email:{type:String},
  phone:{type:String},
  Study:{type:String}
});

// Create TeamMember model
const TeamMember = mongoose.model('TeamMember', teamMembersSchema);

module.exports = TeamMember;
