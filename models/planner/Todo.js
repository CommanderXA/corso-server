const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    datetime: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;