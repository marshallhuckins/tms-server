const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    dueDate: { type: Date },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    projectId: { type: Number, required: true }
});

module.exports = mongoose.model('Task', taskSchema);
