const router = require('express').Router();
const Case = require('../models/case.modal');
const Doctor = require('../models/doctor.modal');
const Patient = require('../models/patient.model');

require('dotenv').config();

router.post('/newcase', async (req, res) => {
    const generateCaseId = () => {

        const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
        const patientId = `${randomNumber}`;
        return patientId;
    };
    const { pId, specialization, problemDescription, doctor, symptoms, prescription } = req.body;

    const newCase = new Case({
        cId: generateCaseId(),
        pId,
        specialization,
        problemDescription,
        doctor,
        symptoms,
        prescription
    })
    await newCase.save();
    res.status(200).json({
        message: "Case Added Successfully",
        data: newCase
    })
})
router.post('/doctor', async (req, res) => {
    const { specialization } = req.body;
    const doctor = await Doctor.find({ specialization: specialization });
    res.status(200).json({
        message: "Doctor Found",
        data: doctor
    })
})

router.post('/addextrasymptom', async (req, res) => {
    const { symptom, pId } = req.body;

    try {
        // Find the case by pId
        const existingCase = await Case.findOne({ pId: pId });

        if (!existingCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        existingCase.extraSymptom.push(symptom);

        await existingCase.save();

        res.status(200).json({ message: 'New string added to extra array', data: existingCase });
    } catch (error) {
        console.error('Error adding new string to extra array:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/patient/:doctorId', async (req, res) => {
    const { doctorId } = req.params;

    try {
        const cases = await Case.find({ doctor: doctorId, attended: false });

        const patientPIds = cases.map(caseData => caseData.pId);

        const patients = await Patient.find({ pId: { $in: patientPIds } });

        const result = cases.map(caseData => {
            const patientData = patients.find(patient => patient.pId === caseData.pId);
            return { ...caseData.toObject(), patientData };
        });

        res.status(200).json({ data: result });
    } catch (error) {
        console.error('Error fetching cases:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;