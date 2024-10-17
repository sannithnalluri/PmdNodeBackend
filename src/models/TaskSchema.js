const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName: {type: 'string', required: true},
    deadline:{type: "string", required: true},
    deadlineTime:{type:'String', required: true},
    projectId:{type: 'string', required:true},
    projectName:{type:'string',required:true},
    assignee:{type: 'string', required:true},
    assigneeId:{type: 'string', required:true},
    priority:{type:'string',required:true},

});


const TaskModel =  mongoose.model('TaskModel', TaskSchema);


module.exports = TaskModel;