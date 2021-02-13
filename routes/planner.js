const express = require("express");
const { ensureAuth } = require("../middleware/auth");
const router = express.Router();
const Todo = require("../models/Todo");
const verify = require("./verifyToken");

router.get('/', (req, res) => {
    res.send('Planner');
});

// @desc    Get Todos
// @route   GET /planner/todo
router.get('/todo', ensureAuth, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: 'desc' });
        res.json(todos);
    } catch (error) {
        res.json({ message: error });
    }
});

// @desc    Save Todo
// @route   GET /planner/todo
router.post('/todo', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        const savedTodo = await Todo.create(req.body);
        res.json(savedTodo);
    } catch (error) {
        res.json({ message: error });
    }
});

// @desc    Get specific Todo
// @route   GET /planner/todo/todoId
router.get('/todo/:todoId', ensureAuth, async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.todoId);
        res.json(todo);
    } catch (error) {
        res.json({ message: error });
    }
});

// Delete Todo
router.delete('/todo/:todoId', ensureAuth, async (req, res) => {
    try {
        const removedTodo = await Todo.remove({ _id: req.params.todoId });
        res.json(removedTodo);
    } catch (error) {
        res.json({ message: error });
    }
})

// Update Todo
router.patch('/todo/:todoId', ensureAuth, async (req, res) => {
    try {
        const updatedTodo = await Todo.updateOne(
            { _id: req.params.todoId },
            { $set: { name: req.body.name, text: req.body.text, done: req.body.done } }
        );
        res.json(updatedTodo);
    } catch (error) {
        res.json({ message: error });
    }
})

router.get('/meetings', ensureAuth, (req, res) => {
    res.send('Meetings');
});

router.get('/plan', ensureAuth, (req, res) => {
    res.send('Plan');
});

module.exports = router;