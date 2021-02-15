const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const NoteGroup = mongoose.model('NoteGroup', NoteGroupSchema);
module.exports = NoteGroup;