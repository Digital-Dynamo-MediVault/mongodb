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



module.exports = router;