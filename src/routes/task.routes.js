const express = require('express');
const router = express.Router();
// const { promisify } = require('util');

const Task = require('../models/task');

// List all Tasks
router.get('/', async (req, res) => {

    try {
        const tasks = await Task.find();
        console.log(tasks);
        res.json(tasks);
    } catch (error) {
        console.error(error);
    }

});

// List just one Task
router.get('/:id', async (req, res) => {

    try {
        const task = await Task.findById(req.params.id);
        res.json(task);
    } catch (error) {
        res.json(error);
    }
   
});

// Creating a new Task
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const newTask = new Task({
        title, 
        description
    });
    const result = await newTask.save();
    res.json({status: 'Task saved'});
});

// Update Tasks
router.put('/:id', async (req, res) => {
    const { title, description } = req.body;
    const newTask = {
        title,
        description
    };
    try {
        const result = await Task.findByIdAndUpdate(req.params.id, newTask, {useFindAndModify: false});
        res.json({status: 'Task Updated'});
    } catch (error) {
        res.json(`Error on Modify: ${error}`);
    }
    
});

// Deleting Tasks
router.delete('/:id', async (req, res) => {

    try {
        const result = await Task.findByIdAndRemove(req.params.id);
        console.log(result);
        res.json({status: 'Deleted'});
    } catch (error) {
        res.json({status: error});
    }
    
});

module.exports = router;

