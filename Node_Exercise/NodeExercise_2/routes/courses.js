const { Course } = require('../models/course');
const express = require('express');
const  Joi = require('joi');
const router = express.Router();

router.get('/', async (req, res) => {
    throw new Error('Could not get the courses');
    const course = await Course.find().sort('name');
    res.send(course);
});

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = new Course({
        name: req.body.name,
        author: req.body.author,
    });

    await course.save();

    res.send(course);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = await Course.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        author: req.body.author,
    },
    { new: true });

    await course.save();

    res.send(course);
});

router.delete('/:id', async (req, res) => {
    const result = await Course.findOneAndDelete( req.body.id );

    res.send(result);
});

const validateCourse = (name) => {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        author: Joi.string().min(3).max(50).required()
    };

    return Joi.validate(name, schema);
}

module.exports = router;