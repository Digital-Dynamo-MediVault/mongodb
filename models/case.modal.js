const mongoose = require('mongoose');
const caseSchema = new mongoose.Schema({
    pId: { type: Number, required: true },
    specialization: { type: String, required: true },
    problemDescription: { type: String, required: true },
    doctor: { type: String, required: true },
    symptoms: { type: String, required: true },
    extra: { type: [String] }

});


const Case = mongoose.model('case', caseSchema);

module.exports = Case;