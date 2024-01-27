const router = require('express').Router();

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



module.exports = router;