const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MeetingSchema = new Schema({
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
    planner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Planner'
    }
}, { timestamps: true });

const Meeting = mongoose.model('Meeting', MeetingSchema);
module.exports = Meeting;