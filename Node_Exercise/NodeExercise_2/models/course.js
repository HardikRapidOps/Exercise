const mongoose = require('mongoose');

const Course = mongoose.model('Course', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:50
    },
    author: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:50
    }
}));

exports.Course = Course;