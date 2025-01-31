const mongoose = require('mongoose')

// Define the schema for an individual task
const taskItemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false,
    }
})

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    clasification: {
        type: String,
        required: true,
        trim: true,
        enum: ['Normal', 'Muy importante']
    },
    list: [taskItemSchema],
    observation: {
        type: String,
        trim: true,
    }
})

module.exports = mongoose.model('Task', taskSchema)