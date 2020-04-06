const mongoose = require('mongoose');
const { Schema } = mongoose;

// Tasks Schema
const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true}
});

// Creating the Task's model
module.exports = mongoose.model('Task', TaskSchema);