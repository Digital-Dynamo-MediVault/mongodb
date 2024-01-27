const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, default: '0000-0000-0000' },
    exprience: { type: Number, required: true },
    specialization: { type: String, required: true },
    metamaskAddress: { type: String, required: true },
});


const UserAccount = mongoose.model('doctor', doctorSchema);

module.exports = UserAccount;