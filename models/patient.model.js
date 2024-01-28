const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    pId: { type: Number, required: true },
    name: { type: String, required: true },
    password: { type: String },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, default: '0000-0000-0000' },
    phone: { type: Number, required: true },
    addressp: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    guardian: { type: String, required: true },
    guardianp: { type: Number, required: true },
    metamaskAddress: { type: String },
    report: { type: [String] }
});


const UserAccount = mongoose.model('patient', patientSchema);

module.exports = UserAccount;