/**
 * @swagger
 * components:
 *   schemas:
 *     Courses:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         name:
 *           type: string
 *           description: The title of the course
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: 1
 *         name: course1
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const express = require('express');
const router = express.Router();
const Joi = require('joi');

const courses = [
    {id: 1, name: 'course1' },
    {id: 2, name: 'course2' },
    {id: 3, name: 'course3' }
];

router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found');
    res.send(course);
});

router.post('/', (req, res) => {
    const schema = Joi.object({ name: Joi.string().min(3).required()});            
    const validation = schema.validate(req.body); 
    if (validation.error) {
        return res.status(400).send(result.error.details[0].message);        
    }
    console.log(validation);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found');
        
    const schema = Joi.object({ name: Joi.string().min(3).required()});            
    const validation = schema.validate(req.body); 
    if (validation.error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    res.send(course)
});

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given Id was not found');
   
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
});

module.exports = router;