const mongoose = require('mongoose');
const caseSchema = new mongoose.Schema({
    pId: { type: Number, required: true },
    cId: { type: Number, required: true },
    specialization: { type: String, required: true },
    problemDescription: { type: String, required: true },
    doctor: { type: String, required: true },
    symptoms: { type: String, required: true },
    extraSymptom: { type: [String] },
    attended: { type: Boolean, default: false },
    prescription: { type: String }

});


const Case = mongoose.model('case', caseSchema);

module.exports = Case;