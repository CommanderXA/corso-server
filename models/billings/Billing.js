const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BillingSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String
    },
    amount: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BillingGroup'
    }
}, { timestamps: true });

const Billing = mongoose.model('Billing', BillingSchema);
module.exports = Billing;