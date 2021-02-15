const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlannerSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        unique: true
    }
});

const Planner = mongoose.model('Planner', PlannerSchema);
module.exports = Planner;