const router = require('express').Router();

let nodemailer = require('nodemailer')
require('dotenv').config();

const UserAccount = require('../models/patient.model');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'realmadrid83527@gmail.com',
        pass: 'vfcxgfbeddekykaz'
    }
});
router.post('/addpatient', async (req, res) => {
    try {
        const { name, age, gender, email, addressp, bloodGroup, guardian, guardianp, } = req.body;
        const generatePatientId = () => {

            const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
            const patientId = `${randomNumber}`;
            return patientId;
        };
        // Create a new user
        const newUser = new UserAccount({
            pId: generatePatientId(),
            name,
            age,
            gender,
            email,
            addressp,
            bloodGroup,
            guardian,
            guardianp,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send email to the user
        const mailOptions = {
            from: 'your-email@gmail.com', // Replace with your Gmail email address
            to: savedUser.email,
            subject: 'Welcome to Our MediVault',
            text: `Thank you for registering with us! Click the following link to activate your account: https://medivault-web.vercel.app/activate?email=${savedUser.email}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                // console.error('Error sending email:', error);
                res.status(500).json({ message: 'Error sending email' });
            } else {
                // console.log('Email sent:', info.response);
                res.status(200).json({ message: 'User added successfully and email sent' });
            }
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});
router.post('/activate', async (req, res) => {
    const { password, metamaskAddress, email } = req.body;
    try {
        const user = await UserAccount.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = password;
        user.metamaskAddress = metamaskAddress;
        await user.save();
        res.status(200).json({ message: 'User activated successfully', user: user });
    }
    catch (error) {
        console.error('Error activating user:', error);
        res.status(500).json({ message: 'Error activating user' });
    }
})


module.exports = router;