const router = require('express').Router();
const Case = require('../models/case.modal');
const Doctor = require('../models/doctor.modal');

require('dotenv').config();

router.post('/newcase', async (req, res) => {
    const { pId, specialization, problemDescription, doctor, symptoms } = req.body;
    const newCase = new Case({
        pId,
        specialization,
        problemDescription,
        doctor,
        symptoms
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

module.exports = router;