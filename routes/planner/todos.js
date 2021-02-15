module.exports = function (router, ensureAuth) {
    
    // Import Model
    const Todo = require("../../models/planner/Todo");

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
            const todo = await Todo.create(req.body);
            res.json(todo);
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    Get specific Todo
    // @route   GET /planner/todo/:todoId
    router.get('/todo/:todoId', ensureAuth, async (req, res) => {
        try {
            const todo = await Todo.findById(req.params.todoId);

            if (!todo) {
                return res.json('404 Error');
            }

            if (todo.user != req.user.id) {
                res.json('404 Error');
            } else {
                res.json(todo);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    DELETE Todo
    // @route   DELETE /planner/todo/:todoId
    router.delete('/todo/:todoId', ensureAuth, async (req, res) => {
        try {
            let todo = await Todo.findById(req.params.todoId);
            
            if (!todo) {
                return res.json('404 Error');
            }
            
            if (todo.user != req.user.id) {
                return res.json('500 Error');
            } else {
                todo = await Todo.remove(
                    { _id: req.params.todoId }
                );
                return res.json(todo);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });

    // @desc    UPDATE Todo
    // @route   PUT /planner/todo/todoId
    router.patch('/todo/:todoId', ensureAuth, async (req, res) => {
        try {
            let todo = await Todo.findById(req.params.todoId);
            
            if (!todo) {
                return res.json('404 Error');
            }

            if (todo.user != req.user.id) {
                return res.json('404 Error');
            } else {
                todo = await Todo.updateOne(
                    { _id: req.params.todoId },
                    { $set: { name: req.body.name, text: req.body.text, datetime: req.body.datetime, completed: req.body.completed } }
                );
                return res.json(todo);
            }
        } catch (error) {
            res.json({ message: error });
        }
    });
}