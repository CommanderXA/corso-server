const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlannerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
}, { timestamps: true });

const Planner = mongoose.model('Planner', PlannerSchema);
module.exports = Planner;