const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NoteGroup'
    }
}, { timestamps: true });

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;