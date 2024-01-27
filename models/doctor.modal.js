const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({

    dId: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, default: '0000-0000-0000' },
    phone: { type: Number, required: true },
    exprience: { type: Number, required: true },
    specialization: { type: String, required: true },
    metamaskAddress: { type: String },
    password: { type: String },
});


const UserAccount = mongoose.model('doctor', doctorSchema);

module.exports = UserAccount;