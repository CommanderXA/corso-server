const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingGroupSchema = new Schema({
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

const BillingGroup = mongoose.model('BillingGroup', BillingGroupSchema);
module.exports = BillingGroup;