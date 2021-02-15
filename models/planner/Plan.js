const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    time: {
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

const Plan = mongoose.model('Plan', PlanSchema);
module.exports = Plan;